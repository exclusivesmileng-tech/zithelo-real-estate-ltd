import { NextRequest, NextResponse } from "next/server";
import { sendTeamEmail, emailTemplate } from "@/lib/mailer";
import {
  BUDGETS, ENQUIRY_TYPES, PAYMENT_PREFERENCES, TIMELINES, VIEWING_READINESS, initialStage,
} from "@/lib/leads";
import { attributionSummary, recordPropertyLead } from "@/lib/propertyLeads";

export const runtime = "nodejs";

function str(v: unknown, max: number) {
  return typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined;
}

function option(v: unknown, allowed: readonly string[]) {
  return typeof v === "string" && allowed.includes(v) ? v : undefined;
}

/** Per-property lead qualification form (see recordPropertyLead for what happens to it). */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = str(body.name, 200);
  const phone = str(body.phone, 60);
  const email = str(body.email, 200)?.toLowerCase();
  const projectName = str(body.projectName, 100);

  if (!name || !phone || !email || !projectName || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const viewingReadiness = option(body.viewingReadiness, VIEWING_READINESS);
  const stage = initialStage(viewingReadiness);
  const attribution = typeof body.attribution === "object" && body.attribution ? (body.attribution as Record<string, unknown>) : {};
  const answers = {
    "Enquiry Type": option(body.enquiryType, ENQUIRY_TYPES),
    Budget: option(body.budget, BUDGETS),
    Timeline: option(body.timeline, TIMELINES),
    "Payment Preference": option(body.paymentPreference, PAYMENT_PREFERENCES),
    "Viewing Readiness": viewingReadiness,
  };

  await Promise.all([
    sendTeamEmail(
      `Property Lead — ${projectName} from ${name}`,
      emailTemplate("New Property Lead", [
        ["Name", name],
        ["Phone / WhatsApp", phone],
        ["Email", email],
        ["Project", projectName],
        ["Enquiry Type", answers["Enquiry Type"]],
        ["Budget", answers.Budget],
        ["Timeline", answers.Timeline],
        ["Payment Preference", answers["Payment Preference"]],
        ["Viewing Readiness", viewingReadiness],
        ["Lead Stage", stage],
        ["Campaign", attributionSummary(attribution)],
      ])
    ).catch((err) => console.error("[/api/property-lead] team email", err)),
    recordPropertyLead(
      req,
      { name, phone, email, projectName, stage, answers },
      { eventName: "Lead", eventId: str(body.eventId, 100), attribution }
    ),
  ]);

  return NextResponse.json({ ok: true });
}
