import { NextRequest } from "next/server";
import { captureLead, type LeadInput } from "@/lib/assistant/tools";
import { rateLimited, clientIp } from "@/lib/assistant/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface LeadFormPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  country?: unknown;
  enquiry_type?: unknown;
  project_interest?: unknown;
  budget?: unknown;
  timeline?: unknown;
  summary?: unknown;
  page?: unknown;
  transcript?: unknown;
}

function str(v: unknown, max: number): string | undefined {
  return typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined;
}

/**
 * Submits the inline lead form the assistant's `request_lead_form` tool shows
 * in chat. Deliberately a plain JSON request/response, not part of the
 * streaming chat route — this is a structured form post, not a model turn, so
 * it doesn't need the model in the loop at all.
 */
export async function POST(req: NextRequest) {
  if (rateLimited(clientIp(req))) {
    return Response.json(
      { ok: false, message: "Too many requests — please try again shortly." },
      { status: 429 }
    );
  }

  let body: LeadFormPayload;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const name = str(body.name, 200);
  const email = str(body.email, 200);
  const phone = str(body.phone, 60);

  if (!name || (!email && !phone)) {
    return Response.json(
      {
        ok: false,
        message: "Please add your name and either an email address or a phone number.",
      },
      { status: 400 }
    );
  }

  const input: LeadInput = {
    name,
    email,
    phone,
    country: str(body.country, 100),
    enquiry_type: str(body.enquiry_type, 100) ?? "General enquiry",
    project_interest: str(body.project_interest, 100),
    budget: str(body.budget, 100),
    timeline: str(body.timeline, 100),
    summary: str(body.summary, 1000) ?? "Submitted the on-site AI assistant contact form.",
  };

  const result = await captureLead(input, {
    page: str(body.page, 200),
    transcript: str(body.transcript, 90_000) ?? "",
  });

  return Response.json(result, { status: result.ok ? 200 : 502 });
}
