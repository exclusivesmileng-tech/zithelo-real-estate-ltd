import { NextRequest } from "next/server";
import { sendLeadEmail } from "@/lib/mailer";
import { airtableList, airtableUpdate, formulaString, TABLE_NAMES } from "@/lib/airtable";
import { NURTURE_STOP_STAGES, SIGNATURE_HOMES, WEBSITE_SOURCE } from "@/lib/leads";
import { PITCH, SEQUENCE, renderEmail } from "@/lib/nurture/signatureHomes";
import { unsubscribeUrl } from "@/lib/nurture/unsubscribe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const DAY_MS = 24 * 60 * 60 * 1000;
// The cron runs once a day at a fixed time, so allow a little slack: a lead
// enrolled at 10:00 is "1 day in" at the next morning's run, not the one after.
const SLACK_MS = 4 * 60 * 60 * 1000;

/**
 * Daily (vercel.json). Sends the next due Signature Homes 1 nurture email to
 * each enrolled lead, and the one-off pitch to leads added from elsewhere
 * (manual entry, imports, ad forms — anything whose Source isn't "Website").
 * Vercel calls this with `Authorization: Bearer $CRON_SECRET`.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const stopStages = NURTURE_STOP_STAGES.map((s) => `{Lead Stage} = ${formulaString(s)}`).join(", ");
  const leads = await airtableList(
    TABLE_NAMES.propertyLeads,
    `AND({Project} = ${formulaString(SIGNATURE_HOMES)}, {Email} != '', NOT({Unsubscribed}), NOT(OR(${stopStages})))`
  );

  const now = Date.now();
  let sequenceSent = 0;
  let pitchSent = 0;
  let failed = 0;

  for (const lead of leads) {
    const f = lead.fields;
    const email = String(f["Email"]);
    const name = String(f["Name"] ?? "");
    const unsub = unsubscribeUrl(lead.id);

    try {
      if (f["Source"] !== WEBSITE_SOURCE) {
        if (f["Pitch Sent At"]) continue;
        await sendLeadEmail(email, renderEmail(PITCH, name, unsub));
        await airtableUpdate(TABLE_NAMES.propertyLeads, lead.id, {
          "Pitch Sent At": new Date().toISOString(),
        });
        pitchSent++;
        continue;
      }

      const step = Number(f["Sequence Step"] ?? 0);
      const enrolledAt = Date.parse(String(f["Enrolled At"] ?? ""));
      const next = SEQUENCE[step];
      if (!next || Number.isNaN(enrolledAt)) continue;
      if (now - enrolledAt < next.day * DAY_MS - SLACK_MS) continue;

      await sendLeadEmail(email, renderEmail(next, name, unsub));
      await airtableUpdate(TABLE_NAMES.propertyLeads, lead.id, {
        "Sequence Step": step + 1,
        "Last Email At": new Date().toISOString(),
      });
      sequenceSent++;
    } catch (err) {
      failed++;
      console.error(`[/api/cron/lead-nurture] ${lead.id}`, err);
    }
  }

  return Response.json({ checked: leads.length, sequenceSent, pitchSent, failed });
}
