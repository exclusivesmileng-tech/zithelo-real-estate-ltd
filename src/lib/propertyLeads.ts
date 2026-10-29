import type { NextRequest } from "next/server";
import { sendLeadEmail } from "@/lib/mailer";
import { airtableInsert, airtableList, airtableUpdate, formulaString, TABLE_NAMES } from "@/lib/airtable";
import { SIGNATURE_HOMES, WEBSITE_SOURCE, type LeadStage } from "@/lib/leads";
import { sendCapiEvent, type CapiEvent } from "@/lib/metaCapi";
import { SEQUENCE, renderEmail } from "@/lib/nurture/signatureHomes";
import { unsubscribeUrl } from "@/lib/nurture/unsubscribe";

type Fields = Record<string, string | number | boolean | undefined>;

export interface PropertyLead {
  name: string;
  phone?: string;
  email: string;
  projectName: string;
  stage: LeadStage;
  /** Qualification answers, keyed by Airtable column */
  answers?: Fields;
  /** Extra columns that may not exist yet in the base — dropped on rejection */
  optional?: Fields;
}

export interface LeadTracking {
  eventName: CapiEvent["eventName"];
  eventId?: string;
  attribution?: Record<string, unknown>;
}

const ATTRIBUTION_COLUMNS: Record<string, string> = {
  utm_source: "UTM Source",
  utm_medium: "UTM Medium",
  utm_campaign: "UTM Campaign",
  utm_content: "UTM Content",
  utm_term: "UTM Term",
  fbclid: "FBCLID",
  landing_page: "Landing Page",
};

function attributionFields(attribution?: Record<string, unknown>): Fields {
  const out: Fields = {};
  for (const [key, column] of Object.entries(ATTRIBUTION_COLUMNS)) {
    const v = attribution?.[key];
    if (typeof v === "string" && v) out[column] = v.slice(0, 300);
  }
  return out;
}

function str(v: unknown) {
  return typeof v === "string" && v ? v.slice(0, 300) : undefined;
}

/**
 * Insert, retrying with only the core columns if Airtable rejects an optional
 * one (e.g. the UTM columns haven't been added yet) — a lead must never be
 * lost to a missing column.
 */
async function withFallback<T>(core: Fields, optional: Fields, write: (fields: Fields) => Promise<T>) {
  try {
    return await write({ ...core, ...optional });
  } catch (err) {
    if (!Object.keys(optional).length) throw err;
    console.error("[propertyLeads] retrying without optional columns", err);
    return write(core);
  }
}

/**
 * Records a property lead in Airtable (deduped per email + project), starts
 * the Signature Homes nurture sequence for new leads, and reports the
 * conversion to Meta's Conversions API. Never throws — failures are logged,
 * since the caller's team email still carries the lead.
 */
export async function recordPropertyLead(req: NextRequest, lead: PropertyLead, tracking: LeadTracking) {
  const attribution = tracking.attribution ?? {};

  const capi = sendCapiEvent({
    eventName: tracking.eventName,
    eventId: tracking.eventId,
    sourceUrl: req.headers.get("referer") ?? undefined,
    email: lead.email,
    phone: lead.phone,
    name: lead.name,
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
    userAgent: req.headers.get("user-agent") ?? undefined,
    fbp: str(attribution.fbp),
    fbc: str(attribution.fbc),
    fbclid: str(attribution.fbclid),
    customData: { content_name: lead.projectName },
  }).catch((err) => console.error("[propertyLeads] CAPI", err));

  try {
    // Dedupe lookup is best-effort: if the token can't read records, still
    // save the lead rather than lose it.
    const existing = await airtableList(
      TABLE_NAMES.propertyLeads,
      `AND(LOWER({Email}) = ${formulaString(lead.email)}, {Project} = ${formulaString(lead.projectName)})`
    ).catch((err) => {
      console.error("[propertyLeads] dedupe lookup failed — inserting", err);
      return [];
    });

    const core: Fields = {
      Name: lead.name,
      Phone: lead.phone,
      Email: lead.email,
      Project: lead.projectName,
      ...lead.answers,
    };

    if (existing[0]) {
      // Repeat enquiry: refresh answers, and only ever move the stage forward
      // to Viewing Ready — never overwrite progress sales has made.
      const bump = lead.stage === "Viewing Ready" && existing[0].fields["Lead Stage"] === "New enquiry";
      await withFallback(
        { ...core, ...(bump ? { "Lead Stage": "Viewing Ready" } : {}) },
        lead.optional ?? {},
        (fields) => airtableUpdate(TABLE_NAMES.propertyLeads, existing[0].id, fields)
      );
    } else {
      const now = new Date().toISOString();
      const hasSequence = lead.projectName === SIGNATURE_HOMES;
      const recordId = await withFallback(
        {
          ...core,
          "Lead Stage": lead.stage,
          Source: WEBSITE_SOURCE,
          "Submitted At": now,
          "Enrolled At": hasSequence ? now : undefined,
          "Sequence Step": hasSequence ? 0 : undefined,
        },
        { ...attributionFields(attribution), ...lead.optional },
        (fields) => airtableInsert(TABLE_NAMES.propertyLeads, fields)
      );

      if (hasSequence && recordId) {
        await sendLeadEmail(lead.email, renderEmail(SEQUENCE[0], lead.name, unsubscribeUrl(recordId)));
        await airtableUpdate(TABLE_NAMES.propertyLeads, recordId, {
          "Sequence Step": 1,
          "Last Email At": new Date().toISOString(),
        });
      }
    }
  } catch (err) {
    console.error("[propertyLeads]", err);
  }

  await capi;
}

/** Human-readable campaign line for team notification emails. */
export function attributionSummary(attribution?: Record<string, unknown>) {
  const f = attributionFields(attribution);
  const parts = [f["UTM Source"], f["UTM Medium"], f["UTM Campaign"], f["UTM Content"]].filter(Boolean);
  if (parts.length) return parts.join(" / ");
  return f["FBCLID"] ? "Facebook/Instagram ad click" : undefined;
}
