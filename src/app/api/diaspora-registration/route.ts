import { NextRequest, NextResponse } from "next/server";
import { sendTeamEmail, emailTemplate } from "@/lib/mailer";
import { airtableInsert, TABLE_NAMES } from "@/lib/airtable";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, referral, country, nigerianState, ageRange, budget, propertyType, timeline } = data;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await Promise.allSettled([
      airtableInsert(TABLE_NAMES.diaspora, {
        Name: name,
        Email: email,
        Phone: phone,
        "Country of Residence": country,
        "Nigerian State": nigerianState,
        "Age Range": ageRange,
        "Investment Budget": budget,
        "Property Type": propertyType,
        Timeline: timeline,
        "How They Heard": referral,
        "Submitted At": new Date().toISOString(),
      }),
      sendTeamEmail(
        `New Diaspora Investor Registration — ${name} from ${country}`,
        emailTemplate("New Diaspora Investor Registration", [
          ["Name", name],
          ["Email", email],
          ["Phone", phone],
          ["Country", country],
          ["Nigerian State", nigerianState],
          ["Age Range", ageRange],
          ["Budget", budget],
          ["Property Type", propertyType],
          ["Timeline", timeline],
          ["Referral", referral],
        ])
      ),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/diaspora-registration]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
