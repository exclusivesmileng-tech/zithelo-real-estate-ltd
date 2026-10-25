/**
 * Zithelo Airtable Setup — creates the "Property Leads" table
 * ─────────────────────────────────────────────────────────────────────────────
 * Creates the table the property lead form, nurture emails and cron write to,
 * with every column and dropdown option. If the table already exists, adds
 * only the columns that are missing.
 *
 * Usage:
 *   AIRTABLE_API_KEY=<token> AIRTABLE_BASE_ID=<appXXXX> node scripts/setup-airtable.mjs
 *
 * The token needs these scopes: schema.bases:read, schema.bases:write
 * (airtable.com/create/tokens), with access to the Zithelo base.
 * Re-running is safe.
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Load .env.local for anything not already set
try {
  const __dir = dirname(fileURLToPath(import.meta.url));
  const lines = readFileSync(resolve(__dir, "../.env.local"), "utf8").split("\n");
  for (const line of lines) {
    const [key, ...rest] = line.split("=");
    const value = rest.join("=").trim();
    if (key && value && !process.env[key.trim()]) process.env[key.trim()] = value;
  }
} catch {
  /* no .env.local */
}

const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
if (!API_KEY || !BASE_ID) {
  console.error("Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID (see usage at the top of this file).");
  process.exit(1);
}

const TABLE = "Property Leads";

const choices = (...names) => ({ choices: names.map((name) => ({ name })) });
const dateTime = {
  dateFormat: { name: "iso" },
  timeFormat: { name: "24hour" },
  timeZone: "Africa/Lagos",
};
const text = (name) => ({ name, type: "singleLineText" });

// Keep in sync with src/lib/leads.ts. The first field is the primary field.
const FIELDS = [
  text("Name"),
  { name: "Phone", type: "phoneNumber" },
  { name: "Email", type: "email" },
  { name: "Project", type: "singleSelect", options: choices("Signature Homes 1", "Andoyi House") },
  {
    name: "Lead Stage",
    type: "singleSelect",
    options: choices(
      "New enquiry", "Contacted", "Qualified Buyer", "Viewing Ready", "Viewing Scheduled",
      "Negotiation / Decision", "Won", "Lost", "Nurture"
    ),
  },
  {
    name: "Enquiry Type",
    type: "singleSelect",
    options: choices("Personal/family purchase", "Investment", "Realtor/agent", "Other"),
  },
  {
    name: "Budget",
    type: "singleSelect",
    options: choices("Below ₦100 million", "₦100 million–₦400 million", "Above ₦400 million"),
  },
  {
    name: "Timeline",
    type: "singleSelect",
    options: choices("Immediately", "Within 3 months", "3–6 months", "Researching"),
  },
  {
    name: "Payment Preference",
    type: "singleSelect",
    options: choices("Outright", "Instalments if available", "Undecided"),
  },
  {
    name: "Viewing Readiness",
    type: "singleSelect",
    options: choices("Ready to book inspection", "Needs details first", "Not ready"),
  },
  { name: "Requested Visit Date", type: "date", options: { dateFormat: { name: "iso" } } },
  { name: "Source", type: "singleSelect", options: choices("Website", "Manual", "Meta Lead Ad", "Import") },
  { name: "Submitted At", type: "dateTime", options: dateTime },
  { name: "Enrolled At", type: "dateTime", options: dateTime },
  { name: "Sequence Step", type: "number", options: { precision: 0 } },
  { name: "Last Email At", type: "dateTime", options: dateTime },
  { name: "Pitch Sent At", type: "dateTime", options: dateTime },
  { name: "Unsubscribed", type: "checkbox", options: { icon: "check", color: "redBright" } },
  text("UTM Source"),
  text("UTM Medium"),
  text("UTM Campaign"),
  text("UTM Content"),
  text("UTM Term"),
  text("FBCLID"),
  text("Landing Page"),
  { name: "Notes", type: "multilineText" },
];

async function api(path, init = {}) {
  const res = await fetch(`https://api.airtable.com/v0/meta/bases/${BASE_ID}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${init.method ?? "GET"} ${path} → ${res.status} ${JSON.stringify(body)}`);
  return body;
}

const { tables } = await api("/tables");
const existing = tables.find((t) => t.name === TABLE);

if (!existing) {
  await api("/tables", { method: "POST", body: JSON.stringify({ name: TABLE, fields: FIELDS }) });
  console.log(`✓ Created "${TABLE}" with ${FIELDS.length} columns.`);
} else {
  const have = new Set(existing.fields.map((f) => f.name));
  const missing = FIELDS.filter((f) => !have.has(f.name));
  for (const field of missing) {
    await api(`/tables/${existing.id}/fields`, { method: "POST", body: JSON.stringify(field) });
    console.log(`  + ${field.name}`);
  }
  console.log(
    missing.length
      ? `✓ Added ${missing.length} missing column(s) to "${TABLE}".`
      : `✓ "${TABLE}" already has every column.`
  );
}
