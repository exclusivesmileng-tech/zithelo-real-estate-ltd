import { createHmac, timingSafeEqual } from "crypto";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

function secret() {
  return process.env.UNSUBSCRIBE_SECRET ?? process.env.CRON_SECRET ?? "";
}

function sign(recordId: string) {
  return createHmac("sha256", secret()).update(recordId).digest("hex").slice(0, 32);
}

export function unsubscribeUrl(recordId: string) {
  if (!secret()) return undefined;
  return `${SITE_URL}/api/unsubscribe?id=${encodeURIComponent(recordId)}&t=${sign(recordId)}`;
}

export function verifyUnsubscribe(recordId: string, token: string) {
  if (!secret() || !/^rec[A-Za-z0-9]+$/.test(recordId)) return false;
  const expected = Buffer.from(sign(recordId));
  const given = Buffer.from(token);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
