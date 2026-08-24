import { NextRequest } from "next/server";
import OpenAI from "openai";
import { getSystemPrompt, pageContext } from "@/lib/assistant/prompt";
import { ASSISTANT_TOOLS, PROJECT_SLUGS, type LeadFormContext } from "@/lib/assistant/tools";
import { getProjectCard } from "@/lib/assistant/live-knowledge";
import { logTurn } from "@/lib/assistant/conversation-log";
import { rateLimited, clientIp } from "@/lib/assistant/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "gpt-5";
const MAX_TOKENS = 8000;
/** Guards against a tool loop that never converges. */
const MAX_TOOL_ROUNDS = 3;

const MAX_MESSAGES = 40;
const MAX_CHARS_PER_MESSAGE = 4000;
/** Defensive cap — the model is told 2–4, this just bounds a malformed call. */
const MAX_QUICK_REPLIES = 4;

type ChatMessage = OpenAI.Chat.Completions.ChatCompletionMessageParam;
// We only ever declare function-type tools (see tools.ts), so tool calls are
// always this member of the ChatCompletionMessageToolCall union, never the
// custom-tool variant.
type ToolCall = OpenAI.Chat.Completions.ChatCompletionMessageFunctionToolCall;

interface IncomingMessage {
  role: "user" | "assistant";
  content: string;
}

/** Accepts only the plain-text shape the widget sends; drops anything else. */
function sanitiseMessages(raw: unknown): ChatMessage[] {
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

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
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

  // Resolved before streaming starts: it is cached, so this is a no-op read
  // except on the hourly refresh.
  const systemPrompt = await getSystemPrompt();

  // The frozen system prompt goes first so OpenAI's automatic prompt caching
  // (prefixes ≥1024 tokens, no cache_control needed) can match it request to
  // request. Volatile per-visitor context goes last, after the conversation
  // history, so it never sits inside — and invalidate — that cached prefix.
  const working: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...messages,
    { role: "system", content: pageContext(page) },
  ];

  const client = new OpenAI();
  const encoder = new TextEncoder();

  const sse = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      };

      let answerText = "";
      let formShown = false;

      try {
        for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
          const stream = await client.chat.completions.create({
            model: MODEL,
            max_completion_tokens: MAX_TOKENS,
            tools: ASSISTANT_TOOLS,
            messages: working,
            stream: true,
            // This is a chat widget, not a research task, so we still trade
            // reasoning depth for latency — but "minimal" proved too low: a
            // turn that has to answer, link two or three pages correctly,
            // ask a follow-up, AND call suggest_replies for it all at once
            // was dropping the link syntax and the tool call under real
            // traffic. "low" is the cheapest step up from that.
            reasoning_effort: "low",
            verbosity: "low",
          });

          let roundText = "";
          let finishReason: string | null = null;
          const pending = new Map<
            number,
            { id: string; name: string; arguments: string }
          >();

          for await (const chunk of stream) {
            const choice = chunk.choices[0];
            if (!choice) continue;

            if (choice.delta?.content) {
              roundText += choice.delta.content;
              answerText += choice.delta.content;
              send({ type: "text", text: choice.delta.content });
            }

            // Tool-call arguments arrive as incremental string fragments, keyed
            // by index — accumulate until the stream ends, then parse once.
            for (const tc of choice.delta?.tool_calls ?? []) {
              const entry = pending.get(tc.index) ?? { id: "", name: "", arguments: "" };
              if (tc.id) entry.id = tc.id;
              if (tc.function?.name) entry.name += tc.function.name;
              if (tc.function?.arguments) entry.arguments += tc.function.arguments;
              pending.set(tc.index, entry);
            }

            if (choice.finish_reason) finishReason = choice.finish_reason;
          }

          if (finishReason !== "tool_calls" || pending.size === 0) {
            if (finishReason === "content_filter") {
              send({
                type: "text",
                text: "\n\nI'm not able to help with that one. For anything else about Zithelo, I'm happy to help.",
              });
            }
            break;
          }

          const toolCalls: ToolCall[] = [...pending.entries()]
            .sort(([a], [b]) => a - b)
            .map(([, t]) => ({
              id: t.id,
              type: "function" as const,
              function: { name: t.name, arguments: t.arguments },
            }));

          working.push({
            role: "assistant",
            content: roundText || null,
            tool_calls: toolCalls,
          });

          for (const call of toolCalls) {
            if (call.function.name === "request_lead_form") {
              // Writes nothing here — the tool only tells the widget to render
              // a form. The actual Airtable + email write happens in
              // /api/assistant/lead once the visitor submits it themselves.
              try {
                const context = JSON.parse(call.function.arguments) as LeadFormContext;
                send({ type: "lead_form", context });
                formShown = true;
                working.push({
                  role: "tool",
                  tool_call_id: call.id,
                  content:
                    "Form shown to the visitor. Do not ask for their name, email or phone in chat — wait for them to submit it, or move on if they don't.",
                });
              } catch (err) {
                console.error("[/api/assistant] request_lead_form", err);
                working.push({
                  role: "tool",
                  tool_call_id: call.id,
                  content: "Could not show the form. Give the visitor invest@zithelorealestate.com and +234 9110 222 323 instead.",
                });
              }
            } else if (call.function.name === "show_project_card") {
              try {
                const parsed = JSON.parse(call.function.arguments) as {
                  project_slug?: unknown;
                };
                const slug = PROJECT_SLUGS.find((s) => s === parsed.project_slug);
                const card = slug ? await getProjectCard(slug) : null;
                if (card) {
                  send({ type: "project_card", card });
                  working.push({
                    role: "tool",
                    tool_call_id: call.id,
                    content: `Card shown to the visitor for ${card.title}.`,
                  });
                } else {
                  working.push({
                    role: "tool",
                    tool_call_id: call.id,
                    content: "Could not load that card — describe the development in text instead.",
                  });
                }
              } catch (err) {
                console.error("[/api/assistant] show_project_card", err);
                working.push({
                  role: "tool",
                  tool_call_id: call.id,
                  content: "Could not show the card — describe the development in text instead.",
                });
              }
            } else if (call.function.name === "suggest_replies") {
              try {
                const parsed = JSON.parse(call.function.arguments) as { options?: unknown };
                const options = Array.isArray(parsed.options)
                  ? parsed.options
                      .filter((o): o is string => typeof o === "string" && o.trim().length > 0)
                      .map((o) => o.trim().slice(0, 60))
                      .slice(0, MAX_QUICK_REPLIES)
                  : [];
                if (options.length >= 2) send({ type: "quick_replies", options });
                working.push({
                  role: "tool",
                  tool_call_id: call.id,
                  content: "Reply buttons shown to the visitor.",
                });
              } catch (err) {
                console.error("[/api/assistant] suggest_replies", err);
                working.push({
                  role: "tool",
                  tool_call_id: call.id,
                  content: "Could not show reply options — ask the question in plain text instead.",
                });
              }
            } else {
              working.push({
                role: "tool",
                tool_call_id: call.id,
                content: `Unknown tool: ${call.function.name}`,
              });
            }
          }
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
          formShown,
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
