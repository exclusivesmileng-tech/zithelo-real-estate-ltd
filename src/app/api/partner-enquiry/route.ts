import { NextRequest, NextResponse } from "next/server";
import { sendTeamEmail, emailTemplate } from "@/lib/mailer";
import { airtableInsert, TABLE_NAMES } from "@/lib/airtable";

export async function POST(req: NextRequest) {
  try {
    const { name, company, email, phone, country, message, type } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await Promise.allSettled([
      airtableInsert(TABLE_NAMES.partnerEnquiry, {
        Name: name,
        Company: company,
        Email: email,
        Phone: phone,
        Country: country,
        "Partnership Type": type,
        Message: message,
        "Submitted At": new Date().toISOString(),
      }),
      sendTeamEmail(
        `New Partner Enquiry — ${type ?? "General"} from ${name}`,
        emailTemplate("New Partner Enquiry", [
          ["Name", name],
          ["Company", company],
          ["Email", email],
          ["Phone", phone],
          ["Country", country],
          ["Partnership Type", type],
          ["Message", message],
        ])
      ),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/partner-enquiry]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
