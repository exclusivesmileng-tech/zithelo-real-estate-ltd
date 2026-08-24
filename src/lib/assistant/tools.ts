/**
 * Tools the Zithelo assistant can call.
 *
 * - `request_lead_form` — surfaces an inline contact form in the widget rather
 *   than asking for name/email/phone in chat prose. Free-text contact details
 *   are slow to type and easy to mishear (especially over voice input) or
 *   mis-transcribe; a real form field is faster and cannot be misheard. The
 *   tool itself writes nothing — it only tells the widget what to show. The
 *   actual Airtable + email write happens in `captureLead`, called from the
 *   dedicated `/api/assistant/lead` route once the visitor submits the form.
 * - `suggest_replies` — offers 2–4 tappable quick-reply chips for the
 *   visitor's next message, for the many turns that are really a multiple
 *   choice question (which project, which country, yes/no).
 * - `show_project_card` — surfaces a visual card (photo + key facts) for a
 *   development, rather than describing it at length in prose. The card data
 *   itself comes from Sanity via `getProjectCard` in live-knowledge.ts.
 */

import type OpenAI from "openai";
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

/** Slugs matching /projects/[slug] — kept in sync with the Sanity project docs. */
export const PROJECT_SLUGS = ["andoyi-house", "signature-homes"] as const;

export const ASSISTANT_TOOLS: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "request_lead_form",
      description:
        "Show the visitor a short on-screen form to collect their name and email or phone, " +
        "so the Zithelo investment team can follow up. Call this once the visitor has shown " +
        "genuine buying interest and has agreed to be contacted — never before that, and never " +
        "more than once per conversation unless they explicitly ask to fill it in again. Pass " +
        "only what the conversation has actually established; never invent a budget, timeline or " +
        "project. Do not ask the visitor for their name, email or phone number in chat — the form " +
        "collects those directly, which is faster and cannot be mistyped or mistranscribed.",
      parameters: {
        type: "object",
        properties: {
          enquiry_type: {
            type: "string",
            enum: ENQUIRY_TYPES as unknown as string[],
            description: "What the visitor is asking the team for.",
          },
          project_interest: {
            type: "string",
            enum: PROJECTS as unknown as string[],
            description: "Which development the visitor is interested in, if established.",
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
  },
  {
    type: "function",
    function: {
      name: "suggest_replies",
      description:
        "Offer 2 to 4 short tappable reply options for the visitor's next message, whenever the " +
        "natural next step is really a multiple-choice pick rather than free typing — choosing a " +
        "development, confirming yes/no, picking a country or budget band. Each option must be " +
        "phrased as something the visitor would say (e.g. \"Andoyi House\", \"Not right now\"), " +
        "under 5 words. Skip this for genuinely open-ended questions.",
      parameters: {
        type: "object",
        properties: {
          options: {
            type: "array",
            items: { type: "string" },
            minItems: 2,
            maxItems: 4,
            description: "2 to 4 short reply options, each phrased as the visitor's own words.",
          },
        },
        required: ["options"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "show_project_card",
      description:
        "Show a visual card for one development — photo, key facts, and a link to its page — " +
        "when discussing it in enough detail that seeing it would help, not for a passing mention. " +
        "Property buyers decide visually, so prefer this over describing a development at length in " +
        "text. Call at most once per development per conversation.",
      parameters: {
        type: "object",
        properties: {
          project_slug: {
            type: "string",
            enum: PROJECT_SLUGS as unknown as string[],
            description: "Which development to show a card for.",
          },
        },
        required: ["project_slug"],
        additionalProperties: false,
      },
    },
  },
];

export interface LeadFormContext {
  enquiry_type: string;
  project_interest?: string;
  budget?: string;
  timeline?: string;
  summary: string;
}

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

export interface CaptureLeadResult {
  ok: boolean;
  /** Human-readable outcome — shown directly to the visitor by the form. */
  message: string;
}

/** Writes a submitted lead form to Airtable and notifies the team by email. */
export async function captureLead(
  input: LeadInput,
  meta: { page?: string; transcript: string }
): Promise<CaptureLeadResult> {
  if (!input.email && !input.phone) {
    return {
      ok: false,
      message: "Please add an email address or a phone number so the team can reach you.",
    };
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
        ["Source", "AI Assistant chat — lead form"],
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
    return {
      ok: false,
      message:
        "We couldn't save your details just now — please email invest@zithelorealestate.com or call +234 9110 222 323 directly.",
    };
  }

  return {
    ok: true,
    message: "Thanks — the investment team will be in touch within one business day.",
  };
}
