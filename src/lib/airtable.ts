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
  // Reuses the existing Contact Enquiries table (same one /api/contact writes
  // to) rather than a dedicated table — but that table needs a few extra
  // columns added for chat leads' richer fields: Phone, Country, Project,
  // Budget, Timeline, Summary, Page, Source, Transcript. Airtable rejects any
  // field name that isn't already a column; it won't create one on the fly.
  assistant: "Contact Enquiries",
  assistantConversations: "Assistant Conversations",
  // Per-property lead qualification form + email nurture state. Columns:
  // Name, Phone, Email, Project, Enquiry Type, Budget, Timeline, Payment
  // Preference, Viewing Readiness, Lead Stage (single select), Source,
  // Enrolled At, Sequence Step (number), Last Email At, Pitch Sent At,
  // Unsubscribed (checkbox), Submitted At.
  propertyLeads: "Property Leads",
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
    // typecast lets Airtable add new single-select options (e.g. a Lead Stage)
    // instead of rejecting the record.
    body: JSON.stringify({ fields: cleanFields, typecast: true }),
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

  const record = (await res.json().catch(() => null)) as { id?: string } | null;
  return record?.id;
}

export interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

function credentials() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  return apiKey && baseId ? { apiKey, baseId } : null;
}

/** Escape a value for use inside a single-quoted filterByFormula string. */
export function formulaString(value: string) {
  return `'${value.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
}

/** All records matching `filterByFormula`, following Airtable's pagination. */
export async function airtableList(tableName: string, filterByFormula: string) {
  const creds = credentials();
  if (!creds) return [];

  const records: AirtableRecord[] = [];
  let offset: string | undefined;
  do {
    const params = new URLSearchParams({ filterByFormula, pageSize: "100" });
    if (offset) params.set("offset", offset);
    const res = await fetch(
      `${BASE_URL}/${creds.baseId}/${encodeURIComponent(tableName)}?${params}`,
      { headers: { Authorization: `Bearer ${creds.apiKey}` }, cache: "no-store" }
    );
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(
        `Airtable list of "${tableName}" failed (${res.status}): ${detail.slice(0, 300)}`
      );
    }
    const page = (await res.json()) as { records: AirtableRecord[]; offset?: string };
    records.push(...page.records);
    offset = page.offset;
  } while (offset);

  return records;
}

export async function airtableUpdate(
  tableName: string,
  recordId: string,
  fields: Record<string, string | number | boolean | undefined>
) {
  const creds = credentials();
  if (!creds) return;

  const cleanFields: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined) cleanFields[k] = v;
  }

  const res = await fetch(
    `${BASE_URL}/${creds.baseId}/${encodeURIComponent(tableName)}/${recordId}`,
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${creds.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ fields: cleanFields, typecast: true }),
    }
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `Airtable update in "${tableName}" failed (${res.status}): ${detail.slice(0, 300)}`
    );
  }
}
