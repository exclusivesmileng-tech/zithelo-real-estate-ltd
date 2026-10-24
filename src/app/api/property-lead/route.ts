import { NextRequest, NextResponse } from "next/server";
import { sendTeamEmail, sendLeadEmail, emailTemplate } from "@/lib/mailer";
import { airtableInsert, airtableList, airtableUpdate, formulaString, TABLE_NAMES } from "@/lib/airtable";
import {
  BUDGETS, ENQUIRY_TYPES, PAYMENT_PREFERENCES, TIMELINES, VIEWING_READINESS,
  SIGNATURE_HOMES, WEBSITE_SOURCE, initialStage,
} from "@/lib/leads";
import { SEQUENCE, renderEmail } from "@/lib/nurture/signatureHomes";
import { unsubscribeUrl } from "@/lib/nurture/unsubscribe";

export const runtime = "nodejs";

function str(v: unknown, max: number) {
  return typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined;
}

function option(v: unknown, allowed: readonly string[]) {
  return typeof v === "string" && allowed.includes(v) ? v : undefined;
}

/**
 * Per-property lead qualification form. Writes to the Property Leads table,
 * notifies the team, and — for Signature Homes 1 — sends Email 1 of the nurture
 * sequence immediately (the cron at /api/cron/lead-nurture sends the rest).
 */
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
  const now = new Date().toISOString();
  const answers = {
    Name: name,
    Phone: phone,
    Email: email,
    Project: projectName,
    "Enquiry Type": option(body.enquiryType, ENQUIRY_TYPES),
    Budget: option(body.budget, BUDGETS),
    Timeline: option(body.timeline, TIMELINES),
    "Payment Preference": option(body.paymentPreference, PAYMENT_PREFERENCES),
    "Viewing Readiness": viewingReadiness,
  };

  const teamEmail = sendTeamEmail(
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
      ["Lead Stage", initialStage(viewingReadiness)],
    ])
  ).catch((err) => console.error("[/api/property-lead] team email", err));

  try {
    // Same person enquiring again about the same project: refresh their answers
    // rather than creating a duplicate lead or restarting their email sequence.
    const existing = await airtableList(
      TABLE_NAMES.propertyLeads,
      `AND(LOWER({Email}) = ${formulaString(email)}, {Project} = ${formulaString(projectName)})`
    );

    if (existing[0]) {
      await airtableUpdate(TABLE_NAMES.propertyLeads, existing[0].id, answers);
    } else {
      const hasSequence = projectName === SIGNATURE_HOMES;
      const recordId = await airtableInsert(TABLE_NAMES.propertyLeads, {
        ...answers,
        "Lead Stage": initialStage(viewingReadiness),
        Source: WEBSITE_SOURCE,
        "Submitted At": now,
        "Enrolled At": hasSequence ? now : undefined,
        "Sequence Step": hasSequence ? 0 : undefined,
      });

      if (hasSequence && recordId) {
        await sendLeadEmail(email, renderEmail(SEQUENCE[0], name, unsubscribeUrl(recordId)));
        await airtableUpdate(TABLE_NAMES.propertyLeads, recordId, {
          "Sequence Step": 1,
          "Last Email At": new Date().toISOString(),
        });
      }
    }
  } catch (err) {
    // The team email above still carries the lead, so don't fail the visitor.
    console.error("[/api/property-lead]", err);
  }

  await teamEmail;
  return NextResponse.json({ ok: true });
}
