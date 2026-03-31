import { NextRequest, NextResponse } from "next/server";
import { sendTeamEmail, emailTemplate } from "@/lib/mailer";
import { airtableInsert, TABLE_NAMES } from "@/lib/airtable";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    await Promise.allSettled([
      airtableInsert(TABLE_NAMES.leadMagnet, {
        Email: email,
        Source: "Exit Intent Popup",
        "Submitted At": new Date().toISOString(),
      }),
      sendTeamEmail(
        `Lead Magnet Signup — ${email}`,
        emailTemplate("Investment Guide Request", [
          ["Email", email],
          ["Source", "Exit Intent Popup"],
          ["Submitted At", new Date().toLocaleString()],
        ])
      ),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/lead-magnet]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
