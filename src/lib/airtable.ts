/**
 * Thin wrapper around the Airtable REST API.
 * Uses native fetch — no extra package needed.
 *
 * Table names in your Airtable base should match the TABLE_NAMES below.
 * Create them in advance (they can be empty — Airtable will auto-create columns
 * the first time a record is inserted if you enable auto-field-creation,
 * or you can pre-create the fields manually).
 */

const BASE_URL = "https://api.airtable.com/v0";

export const TABLE_NAMES = {
  contact: "Contact Enquiries",
  newsletter: "Newsletter Subscribers",
  brochure: "Brochure Requests",
  siteVisit: "Site Visit Requests",
  diaspora: "Diaspora Registrations",
  referral: "Referrals",
  leadMagnet: "Lead Magnet Signups",
  investorEnquiry: "Investor Enquiries",
  partnerEnquiry: "Partner Enquiries",
  assistant: "AI Assistant Leads",
  assistantConversations: "Assistant Conversations",
} as const;

export async function airtableInsert(
  tableName: string,
  fields: Record<string, string | number | boolean | undefined>
) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) return; // Skip silently if not configured

  // Remove undefined values
  const cleanFields: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined && v !== "") cleanFields[k] = v;
  }

  const res = await fetch(`${BASE_URL}/${baseId}/${encodeURIComponent(tableName)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: cleanFields }),
  });

  // Airtable answers a missing table, an unknown field, or a revoked key with a
  // 4xx and a JSON body. Without this check those failures resolve silently and
  // the submission is lost with no trace — so surface them to the caller.
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `Airtable insert into "${tableName}" failed (${res.status}): ${detail.slice(0, 300)}`
    );
  }
}
