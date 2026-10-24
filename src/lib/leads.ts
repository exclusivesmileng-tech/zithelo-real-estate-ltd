// Shared lead-qualification vocabulary — used by the property lead form, its
// API route, and the nurture cron. Option labels are stored verbatim in Airtable.

export const SIGNATURE_HOMES = "Signature Homes 1";
export const ANDOYI_HOUSE = "Andoyi House";

export const PROJECT_BROCHURES: Record<string, string | undefined> = {
  [SIGNATURE_HOMES]:
    "https://drive.google.com/file/d/1wSphI-kYfdqCg7uVfy1k-yogJ0Z2vpWQ/view?usp=sharing",
};

export const ENQUIRY_TYPES = [
  "Personal/family purchase",
  "Investment",
  "Realtor/agent",
  "Other",
] as const;

export const BUDGETS = [
  "Below ₦100 million",
  "₦100 million–₦400 million",
  "Above ₦400 million",
] as const;

export const TIMELINES = [
  "Immediately",
  "Within 3 months",
  "3–6 months",
  "Researching",
] as const;

export const PAYMENT_PREFERENCES = ["Outright", "Instalments if available", "Undecided"] as const;

export const VIEWING_READINESS = [
  "Ready to book inspection",
  "Needs details first",
  "Not ready",
] as const;

/**
 * Sales pipeline, in order. New website leads start at "New enquiry" (or
 * "Viewing Ready" when they say they're ready to book an inspection); the
 * sales team moves them along in Airtable from there.
 */
export const LEAD_STAGES = [
  "New enquiry", //            Lead captured; awaiting first contact
  "Contacted", //              Sales has attempted or completed contact
  "Qualified Buyer", //        Direct buyer with reasonable budget, interest and timeline
  "Viewing Ready", //          Interested in scheduling a site visit
  "Viewing Scheduled", //      Date and time confirmed
  "Negotiation / Decision", // Discussing terms or deciding whether to proceed
  "Won", //                    Purchased
  "Lost", //                   No longer proceeding
  "Nurture", //                Following up longer-term
] as const;

export type LeadStage = (typeof LEAD_STAGES)[number];

/** Once sales has a viewing booked (or the lead is closed), automated emails stop. */
export const NURTURE_STOP_STAGES: LeadStage[] = [
  "Viewing Scheduled",
  "Negotiation / Decision",
  "Won",
  "Lost",
];

export function initialStage(viewingReadiness?: string): LeadStage {
  return viewingReadiness === "Ready to book inspection" ? "Viewing Ready" : "New enquiry";
}

/** Leads captured by the site's own form; anything else (manual, imports, ads) gets the pitch. */
export const WEBSITE_SOURCE = "Website";
