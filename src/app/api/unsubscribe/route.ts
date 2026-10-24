import { NextRequest } from "next/server";
import { airtableUpdate, TABLE_NAMES } from "@/lib/airtable";
import { verifyUnsubscribe } from "@/lib/nurture/unsubscribe";

export const runtime = "nodejs";

function page(message: string, status = 200) {
  return new Response(
    `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Zithelo</title></head>
<body style="font-family:Arial,sans-serif;max-width:480px;margin:80px auto;padding:0 16px;color:#1a1a1a;text-align:center;">
<p style="letter-spacing:3px;font-size:11px;font-weight:700;color:#a8872f;">ZITHELO REAL ESTATE</p><p>${message}</p></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") ?? "";
  const token = req.nextUrl.searchParams.get("t") ?? "";
  if (!verifyUnsubscribe(id, token)) return page("This unsubscribe link is invalid or has expired.", 400);

  try {
    await airtableUpdate(TABLE_NAMES.propertyLeads, id, { Unsubscribed: true });
  } catch (err) {
    console.error("[/api/unsubscribe]", err);
    return page("Something went wrong — please reply to the email and we’ll remove you.", 500);
  }
  return page("You’ve been unsubscribed. You won’t receive any more of these emails.");
}
