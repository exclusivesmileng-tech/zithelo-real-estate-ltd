import { NextRequest, NextResponse } from "next/server";
import { sendTeamEmail, emailTemplate } from "@/lib/mailer";
import { airtableInsert, TABLE_NAMES } from "@/lib/airtable";
import { attributionSummary, recordPropertyLead } from "@/lib/propertyLeads";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, date, notes, projectName, eventId } = body;
    const attribution = typeof body.attribution === "object" && body.attribution ? body.attribution : {};

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
          ["Campaign", attributionSummary(attribution)],
        ])
      ),
      // Visit requests are leads too: put them in the pipeline as Viewing Ready
      // so sales works them from one table and they get the nurture emails.
      projectName
        ? recordPropertyLead(
            req,
            {
              name: String(name).slice(0, 200),
              phone: String(phone).slice(0, 60),
              email: String(email).trim().toLowerCase().slice(0, 200),
              projectName: String(projectName).slice(0, 100),
              stage: "Viewing Ready",
              answers: { "Viewing Readiness": "Ready to book inspection" },
              optional: { "Requested Visit Date": String(date).slice(0, 20) },
            },
            { eventName: "Schedule", eventId: typeof eventId === "string" ? eventId : undefined, attribution }
          )
        : Promise.resolve(),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/site-visit]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
