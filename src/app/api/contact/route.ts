import { NextRequest, NextResponse } from "next/server";
import { sendTeamEmail, emailTemplate } from "@/lib/mailer";
import { airtableInsert, TABLE_NAMES } from "@/lib/airtable";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, type, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await Promise.allSettled([
      airtableInsert(TABLE_NAMES.contact, {
        Name: name,
        Email: email,
        Company: company,
        "Enquiry Type": type,
        Message: message,
        "Submitted At": new Date().toISOString(),
      }),
      sendTeamEmail(
        `New Contact Enquiry — ${type ?? "General"} from ${name}`,
        emailTemplate("New Contact Enquiry", [
          ["Name", name],
          ["Email", email],
          ["Company", company],
          ["Type", type],
          ["Message", message],
        ])
      ),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
