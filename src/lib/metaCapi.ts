import { createHash } from "crypto";
import { META_PIXEL_ID } from "@/lib/metaPixel";

// Meta Conversions API — reports leads from the server, so campaigns still
// see conversions from visitors who never accept the cookie banner (or block
// the browser pixel). Needs META_CAPI_TOKEN (Events Manager → Settings →
// Conversions API → Generate access token); without it this is a no-op.

const GRAPH_VERSION = "v21.0";

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

/** Digits only, with Nigerian local numbers (0803…) converted to 234803…. */
function normalisePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 11) return `234${digits.slice(1)}`;
  return digits;
}

export interface CapiEvent {
  eventName: "Lead" | "Schedule" | "Contact";
  eventId?: string;
  sourceUrl?: string;
  email?: string;
  phone?: string;
  name?: string;
  ip?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  fbclid?: string;
  customData?: Record<string, string | undefined>;
}

export async function sendCapiEvent(e: CapiEvent) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token || !META_PIXEL_ID) return;

  const now = Math.floor(Date.now() / 1000);
  // Without the _fbc cookie (pixel not loaded yet), Meta accepts one built
  // from the ad click id in the landing URL.
  const fbc = e.fbc ?? (e.fbclid ? `fb.1.${Date.now()}.${e.fbclid}` : undefined);
  const [firstName, ...rest] = (e.name ?? "").trim().toLowerCase().split(/\s+/);

  const userData: Record<string, unknown> = {
    em: e.email ? [sha256(e.email.trim().toLowerCase())] : undefined,
    ph: e.phone ? [sha256(normalisePhone(e.phone))] : undefined,
    fn: firstName ? [sha256(firstName)] : undefined,
    ln: rest.length ? [sha256(rest[rest.length - 1])] : undefined,
    country: [sha256("ng")],
    client_ip_address: e.ip,
    client_user_agent: e.userAgent,
    fbp: e.fbp,
    fbc,
  };

  const body = {
    data: [
      {
        event_name: e.eventName,
        event_time: now,
        event_id: e.eventId,
        action_source: "website",
        event_source_url: e.sourceUrl,
        user_data: Object.fromEntries(Object.entries(userData).filter(([, v]) => v !== undefined)),
        custom_data: e.customData,
      },
    ],
    ...(process.env.META_CAPI_TEST_CODE ? { test_event_code: process.env.META_CAPI_TEST_CODE } : {}),
  };

  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Meta CAPI ${e.eventName} failed (${res.status}): ${detail.slice(0, 300)}`);
  }
}
