import { NextRequest, NextResponse } from "next/server";
import { sendTeamEmail, emailTemplate } from "@/lib/mailer";
import { airtableInsert, TABLE_NAMES } from "@/lib/airtable";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, date, notes, projectName } = await req.json();

    if (!name || !email || !phone || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await Promise.allSettled([
      airtableInsert(TABLE_NAMES.siteVisit, {
        Name: name,
        Email: email,
        Phone: phone,
        "Visit Date": date,
        Notes: notes,
        Project: projectName,
        "Submitted At": new Date().toISOString(),
      }),
      sendTeamEmail(
        `Site Visit Request — ${projectName} on ${date} from ${name}`,
        emailTemplate("New Site Visit Request", [
          ["Name", name],
          ["Email", email],
          ["Phone", phone],
          ["Project", projectName],
          ["Preferred Date", date],
          ["Notes", notes],
        ])
      ),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/site-visit]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
