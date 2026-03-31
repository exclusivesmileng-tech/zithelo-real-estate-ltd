import { NextRequest, NextResponse } from "next/server";
import { sendTeamEmail, emailTemplate } from "@/lib/mailer";
import { airtableInsert, TABLE_NAMES } from "@/lib/airtable";

export async function POST(req: NextRequest) {
  try {
    const { name, email, projectName } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await Promise.allSettled([
      airtableInsert(TABLE_NAMES.brochure, {
        Name: name,
        Email: email,
        Project: projectName,
        "Requested At": new Date().toISOString(),
      }),
      sendTeamEmail(
        `Brochure Request — ${projectName} from ${name}`,
        emailTemplate("New Brochure Request", [
          ["Name", name],
          ["Email", email],
          ["Project", projectName],
          ["Requested At", new Date().toLocaleString()],
        ])
      ),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/brochure-request]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
