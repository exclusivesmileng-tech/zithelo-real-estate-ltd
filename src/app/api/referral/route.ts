import { NextRequest, NextResponse } from "next/server";
import { sendTeamEmail, emailTemplate } from "@/lib/mailer";
import { airtableInsert, TABLE_NAMES } from "@/lib/airtable";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { referrerName, referrerEmail, referrerRole, refereeName, refereeEmail, refereePhone, project, notes } = data;

    if (!referrerName || !referrerEmail || !refereeName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await Promise.allSettled([
      airtableInsert(TABLE_NAMES.referral, {
        "Referrer Name": referrerName,
        "Referrer Email": referrerEmail,
        "Referrer Role": referrerRole,
        "Referee Name": refereeName,
        "Referee Email": refereeEmail,
        "Referee Phone": refereePhone,
        Project: project,
        Notes: notes,
        "Submitted At": new Date().toISOString(),
      }),
      sendTeamEmail(
        `New Referral — ${refereeName} referred by ${referrerName}`,
        emailTemplate("New Referral Submission", [
          ["Referred by", referrerName],
          ["Referrer Email", referrerEmail],
          ["Referrer Role", referrerRole],
          ["Referee Name", refereeName],
          ["Referee Email", refereeEmail],
          ["Referee Phone", refereePhone],
          ["Project Interest", project],
          ["Notes", notes],
        ])
      ),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/referral]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
