/**
 * Tools the Zithelo assistant can call.
 *
 * Currently one: capture_lead. It runs the same fan-out as the site's contact
 * forms — an Airtable row plus a team email — so chat leads land in exactly the
 * places the team already watches.
 */

import type Anthropic from "@anthropic-ai/sdk";
import { sendTeamEmail, emailTemplate } from "@/lib/mailer";
import { airtableInsert, TABLE_NAMES } from "@/lib/airtable";

export const ENQUIRY_TYPES = [
  "Investment enquiry",
  "Pricing request",
  "Site visit",
  "Callback request",
  "Diaspora investment",
  "Partnership",
  "Referral",
  "General enquiry",
] as const;

export const PROJECTS = [
  "Andoyi House",
  "Signature Homes",
  "Both",
  "Undecided",
] as const;

export const ASSISTANT_TOOLS: Anthropic.Tool[] = [
  {
    name: "capture_lead",
    description:
      "Record an interested visitor as a lead and notify the Zithelo investment team. " +
      "Call this only after the visitor has agreed to be contacted and has given you " +
      "an email address or a phone number. Use only details the visitor actually " +
      "provided — never invent, infer or placeholder a name, email or phone number. " +
      "Call it at most once per conversation unless the visitor corrects their details.",
    input_schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The visitor's name, exactly as they gave it.",
        },
        email: {
          type: "string",
          description: "Email address, if the visitor gave one.",
        },
        phone: {
          type: "string",
          description:
            "Phone or WhatsApp number including country code, if the visitor gave one.",
        },
        country: {
          type: "string",
          description: "Country the visitor is based in, if mentioned.",
        },
        enquiry_type: {
          type: "string",
          enum: ENQUIRY_TYPES as unknown as string[],
          description: "What the visitor is asking the team for.",
        },
        project_interest: {
          type: "string",
          enum: PROJECTS as unknown as string[],
          description: "Which development the visitor is interested in.",
        },
        budget: {
          type: "string",
          description:
            "Budget or investment amount, in the visitor's own words and currency, if mentioned.",
        },
        timeline: {
          type: "string",
          description:
            "When they are looking to invest, in their own words, if mentioned.",
        },
        summary: {
          type: "string",
          description:
            "One or two sentences for the team: what this visitor asked about and what they need next.",
        },
      },
      required: ["enquiry_type", "summary"],
      additionalProperties: false,
    },
  },
];

export interface LeadInput {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  enquiry_type: string;
  project_interest?: string;
  budget?: string;
  timeline?: string;
  summary: string;
}

/** Result string handed back to the model as the tool_result. */
export async function captureLead(
  input: LeadInput,
  meta: { page?: string; transcript: string }
): Promise<string> {
  if (!input.email && !input.phone) {
    return "Not saved: a lead needs at least an email address or a phone number. Ask the visitor for one before trying again.";
  }

  const submittedAt = new Date().toISOString();

  const results = await Promise.allSettled([
    airtableInsert(TABLE_NAMES.assistant, {
      Name: input.name,
      Email: input.email,
      Phone: input.phone,
      Country: input.country,
      "Enquiry Type": input.enquiry_type,
      Project: input.project_interest,
      Budget: input.budget,
      Timeline: input.timeline,
      Summary: input.summary,
      Page: meta.page,
      Source: "AI Assistant",
      Transcript: meta.transcript.slice(0, 90_000),
      "Submitted At": submittedAt,
    }),
    sendTeamEmail(
      `New AI Assistant Lead — ${input.enquiry_type}${input.name ? ` from ${input.name}` : ""}`,
      emailTemplate("New AI Assistant Lead", [
        ["Name", input.name],
        ["Email", input.email],
        ["Phone", input.phone],
        ["Country", input.country],
        ["Enquiry Type", input.enquiry_type],
        ["Project", input.project_interest],
        ["Budget", input.budget],
        ["Timeline", input.timeline],
        ["Summary", input.summary],
        ["Captured on page", meta.page],
        ["Source", "AI Assistant chat"],
      ])
    ),
  ]);

  // Log every failed channel — a wrong Airtable table name or a bad SMTP
  // credential is otherwise invisible while the other channel keeps working.
  const failures = results.filter(
    (r): r is PromiseRejectedResult => r.status === "rejected"
  );
  for (const f of failures) {
    console.error("[assistant/capture_lead]", f.reason);
  }

  // The lead still counts as captured if either channel got through — the team
  // sees it. Only a total failure is worth telling the visitor about.
  if (failures.length === results.length) {
    return "Could not reach the team's systems just now. Apologise, and give the visitor invest@zithelorealestate.com and +234 9110 222 323 so they can reach the team directly.";
  }

  return "Lead saved and the investment team has been notified. Confirm to the visitor that someone will be in touch within one business day.";
}
