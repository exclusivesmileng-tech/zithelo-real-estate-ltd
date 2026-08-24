/**
 * Conversation logging for the AI assistant.
 *
 * One Airtable row per exchange, append-only, grouped by conversation id. The
 * point is visibility: which questions visitors actually ask, where the
 * assistant runs out of knowledge, and which threads turn into leads. Reading
 * the "Needs Review" rows is the fastest way to know what to add to the FAQ.
 *
 * Logging is best-effort — a failure here must never affect the visitor's reply.
 */

import { airtableInsert, TABLE_NAMES } from "@/lib/airtable";

/**
 * Phrases the assistant uses when the knowledge base doesn't cover something.
 * A keyword heuristic, not a classifier: it is meant to surface rows worth a
 * human glance, so it errs toward flagging. Expect some false positives.
 */
const GAP_PATTERNS = [
  /\bI (?:don't|do not) have\b/i,
  /\bnot something I have\b/i,
  /\bI'm not able to\b/i,
  /\bI can't confirm\b/i,
  /\bisn't information I\b/i,
  /\bhave the (?:investment )?team\b/i,
];

export interface TurnLog {
  conversationId: string;
  turn: number;
  page?: string;
  question: string;
  answer: string;
  /**
   * Whether the lead-capture form was shown this turn. Not the same as a lead
   * actually being captured — that happens in a separate request when the
   * visitor submits the form, which this per-chat-turn log has no view into.
   */
  formShown: boolean;
}

export function looksUnanswered(answer: string): boolean {
  return GAP_PATTERNS.some((re) => re.test(answer));
}

/** Writes one exchange. Never throws. */
export async function logTurn(entry: TurnLog): Promise<void> {
  try {
    await airtableInsert(TABLE_NAMES.assistantConversations, {
      "Conversation ID": entry.conversationId,
      Turn: entry.turn,
      Page: entry.page,
      Question: entry.question.slice(0, 4000),
      Answer: entry.answer.slice(0, 20_000),
      "Form Shown": entry.formShown,
      "Needs Review": looksUnanswered(entry.answer),
      "Logged At": new Date().toISOString(),
    });
  } catch (err) {
    console.error("[assistant/log]", err);
  }
}
