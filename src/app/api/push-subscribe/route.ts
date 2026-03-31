import { NextRequest, NextResponse } from "next/server";
import { airtableInsert } from "@/lib/airtable";

// Store push subscriptions in Airtable
export async function POST(req: NextRequest) {
  try {
    const sub = await req.json();
    if (!sub?.endpoint) {
      return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
    }

    await airtableInsert("Push Subscriptions", {
      Endpoint: sub.endpoint,
      "Auth Key": sub.keys?.auth ?? "",
      "P256dh Key": sub.keys?.p256dh ?? "",
      "Subscribed At": new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/push-subscribe POST]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Remove subscription
export async function DELETE(req: NextRequest) {
  try {
    const { endpoint } = await req.json();
    if (!endpoint) {
      return NextResponse.json({ error: "Missing endpoint" }, { status: 400 });
    }
    // Note: Airtable deletion requires finding the record ID first.
    // For now we log the unsubscribe — you can add a "Status" field instead.
    console.log("[Push] Unsubscribed:", endpoint.slice(0, 60));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/push-subscribe DELETE]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
