import { NextRequest, NextResponse } from "next/server";
import { sendTeamEmail, emailTemplate } from "@/lib/mailer";
import { airtableInsert, TABLE_NAMES } from "@/lib/airtable";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, country, budget, message, type } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await Promise.allSettled([
      airtableInsert(TABLE_NAMES.investorEnquiry, {
        Name: name,
        Email: email,
        Phone: phone,
        Country: country,
        "Investment Type": type,
        "Investment Interest": budget,
        Message: message,
        "Submitted At": new Date().toISOString(),
      }),
      sendTeamEmail(
        `New Investor Enquiry — ${type ?? "General"} from ${name}`,
        emailTemplate("New Investor Enquiry", [
          ["Name", name],
          ["Email", email],
          ["Phone", phone],
          ["Country", country],
          ["Investor Type", type],
          ["Investment Interest", budget],
          ["Message", message],
        ])
      ),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/investor-enquiry]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
