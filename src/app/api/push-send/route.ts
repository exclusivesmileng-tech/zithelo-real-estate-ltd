import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";

/**
 * Send a push notification to all stored subscribers.
 *
 * POST /api/push-send
 * Body: { title, body, url?, image?, tag?, secret }
 *
 * Requires PUSH_SEND_SECRET env var to prevent unauthorised use.
 */
export async function POST(req: NextRequest) {
  try {
    const vapidPublic = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    const vapidPrivate = process.env.VAPID_PRIVATE_KEY;
    const vapidEmail = process.env.VAPID_EMAIL ?? "mailto:info@zithelorealestate.com";

    if (!vapidPublic || !vapidPrivate) {
      return NextResponse.json({ error: "VAPID keys not configured" }, { status: 500 });
    }

    // Initialise lazily inside the handler so module load never throws
    webpush.setVapidDetails(vapidEmail, vapidPublic, vapidPrivate);
    const { title, body, url, image, tag, secret } = await req.json();

    // Simple secret guard — set PUSH_SEND_SECRET in .env.local
    if (secret !== process.env.PUSH_SEND_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!title || !body) {
      return NextResponse.json({ error: "title and body are required" }, { status: 400 });
    }

    // Fetch all subscriptions from Airtable
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
      return NextResponse.json({ error: "Airtable not configured" }, { status: 500 });
    }

    const atRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/Push%20Subscriptions?maxRecords=1000`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );

    const { records = [] } = await atRes.json();

    const payload = JSON.stringify({ title, body, url: url ?? "/", image, tag });

    let sent = 0, failed = 0;

    await Promise.allSettled(
      records.map(async (record: { fields: Record<string, string> }) => {
        const { Endpoint, "Auth Key": auth, "P256dh Key": p256dh } = record.fields;
        if (!Endpoint || !auth || !p256dh) return;

        try {
          await webpush.sendNotification(
            { endpoint: Endpoint, keys: { auth, p256dh } },
            payload
          );
          sent++;
        } catch {
          failed++;
        }
      })
    );

    return NextResponse.json({ ok: true, sent, failed });
  } catch (err) {
    console.error("[/api/push-send]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
