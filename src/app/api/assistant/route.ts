import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getSystemPrompt, pageContext } from "@/lib/assistant/prompt";
import { ASSISTANT_TOOLS, captureLead, type LeadInput } from "@/lib/assistant/tools";
import { logTurn } from "@/lib/assistant/conversation-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-opus-5";
const MAX_TOKENS = 8000;
/** Guards against a tool loop that never converges. */
const MAX_TOOL_ROUNDS = 3;

const MAX_MESSAGES = 40;
const MAX_CHARS_PER_MESSAGE = 4000;

/* ── Rate limiting ─────────────────────────────────────────────────────────
   In-memory and therefore per-instance: it blunts casual abuse and runaway
   cost, but is not a hard guarantee across a multi-instance deployment. Move
   to Redis/Upstash if the site scales past a single serverless instance.     */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}

interface IncomingMessage {
  role: "user" | "assistant";
  content: string;
}

/** Accepts only the plain-text shape the widget sends; drops anything else. */
function sanitiseMessages(raw: unknown): Anthropic.MessageParam[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (m): m is IncomingMessage =>
        !!m &&
        typeof m === "object" &&
        (m as IncomingMessage).role !== undefined &&
        ["user", "assistant"].includes((m as IncomingMessage).role) &&
        typeof (m as IncomingMessage).content === "string" &&
        (m as IncomingMessage).content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_CHARS_PER_MESSAGE),
    }));
}

/** Plain-text transcript attached to a captured lead, for the team to read. */
function transcriptOf(messages: Anthropic.MessageParam[]): string {
  return messages
    .map((m) => {
      const text =
        typeof m.content === "string"
          ? m.content
          : m.content
              .map((b) => (b.type === "text" ? b.text : ""))
              .join(" ")
              .trim();
      return text ? `${m.role === "user" ? "Visitor" : "Assistant"}: ${text}` : "";
    })
    .filter(Boolean)
    .join("\n\n");
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "The assistant is not configured yet." },
      { status: 503 }
    );
  }

  if (rateLimited(clientIp(req))) {
    return Response.json(
      { error: "You've sent a lot of messages — please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: { messages?: unknown; page?: unknown; conversationId?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = sanitiseMessages(body.messages);
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "No message to answer." }, { status: 400 });
  }

  const page = typeof body.page === "string" ? body.page.slice(0, 200) : undefined;
  const transcript = transcriptOf(messages);

  // Groups the logged turns of one chat together. Client-supplied, so treat it
  // as an opaque label rather than anything trustworthy.
  const conversationId =
    typeof body.conversationId === "string" && body.conversationId.length <= 64
      ? body.conversationId
      : "unknown";
  const turnNumber = messages.filter((m) => m.role === "user").length;
  const question =
    typeof messages[messages.length - 1].content === "string"
      ? (messages[messages.length - 1].content as string)
      : "";

  // Volatile per-visitor context goes after the last user message as a
  // mid-conversation system message, so the cached system prefix stays intact.
  const working: Anthropic.MessageParam[] = [
    ...messages,
    { role: "system", content: pageContext(page) } as Anthropic.MessageParam,
  ];

  // Resolved before streaming starts: it is cached, so this is a no-op read
  // except on the hourly refresh.
  const systemPrompt = await getSystemPrompt();

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const sse = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      };

      let answerText = "";
      let leadCaptured = false;

      try {
        for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
          const stream = client.messages.stream({
            model: MODEL,
            max_tokens: MAX_TOKENS,
            // Thinking stays on (disabling it on Opus 5 risks tool calls being
            // written as visible text); low effort keeps the widget snappy.
            thinking: { type: "adaptive" },
            output_config: { effort: "low" },
            cache_control: { type: "ephemeral" },
            system: systemPrompt,
            tools: ASSISTANT_TOOLS,
            messages: working,
          });

          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              answerText += event.delta.text;
              send({ type: "text", text: event.delta.text });
            }
          }

          const final = await stream.finalMessage();

          if (final.stop_reason !== "tool_use") {
            if (final.stop_reason === "refusal") {
              send({
                type: "text",
                text: "\n\nI'm not able to help with that one. For anything else about Zithelo, I'm happy to help.",
              });
            }
            break;
          }

          // Run every tool call, then return all results in one user message.
          const toolUses = final.content.filter(
            (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
          );
          const results: Anthropic.ToolResultBlockParam[] = [];

          for (const call of toolUses) {
            if (call.name === "capture_lead") {
              send({ type: "tool", name: "capture_lead" });
              leadCaptured = true;
              try {
                const result = await captureLead(call.input as LeadInput, {
                  page,
                  transcript,
                });
                results.push({
                  type: "tool_result",
                  tool_use_id: call.id,
                  content: result,
                });
              } catch (err) {
                console.error("[/api/assistant] capture_lead", err);
                results.push({
                  type: "tool_result",
                  tool_use_id: call.id,
                  is_error: true,
                  content:
                    "Saving failed. Give the visitor invest@zithelorealestate.com and +234 9110 222 323 instead.",
                });
              }
            } else {
              results.push({
                type: "tool_result",
                tool_use_id: call.id,
                is_error: true,
                content: `Unknown tool: ${call.name}`,
              });
            }
          }

          working.push({ role: "assistant", content: final.content });
          working.push({ role: "user", content: results });
        }

        send({ type: "done" });

        // Logged before the stream closes so the write can't be dropped when the
        // serverless instance freezes. The visitor already has the full reply,
        // so this delays nothing they can see.
        await logTurn({
          conversationId,
          turn: turnNumber,
          page,
          question,
          answer: answerText,
          leadCaptured,
        });
      } catch (err) {
        console.error("[/api/assistant]", err);
        send({
          type: "error",
          message:
            "Something went wrong on my end. Please try again, or reach the team at invest@zithelorealestate.com.",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(sse, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
