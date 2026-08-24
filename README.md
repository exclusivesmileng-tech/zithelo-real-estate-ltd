This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
 
## Getting Started

First, run the development server:

```bash
npm run dev
# or 
yarn dev 
# or
pnpm dev
# or
bun dev 
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result...

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## AI Assistant

A knowledge-grounded chat assistant runs site-wide (bottom-right, above the
contact button). It answers visitor questions about Zithelo and captures
qualified leads into the same Airtable + email pipeline the site forms use.

### Setup

Add to `.env.local` (and to the hosting provider's environment):

```bash
ANTHROPIC_API_KEY=sk-ant-...
```

Without it, the assistant's API route returns 503 and the widget shows a
friendly unavailable message — the rest of the site is unaffected.

Lead capture reuses the existing `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `SMTP_*`
and `TEAM_EMAIL` variables — no new credentials. It writes to a table named
**AI Assistant Leads** (`TABLE_NAMES.assistant` in
[`src/lib/airtable.ts`](src/lib/airtable.ts)) with these fields: `Name`, `Email`,
`Phone`, `Country`, `Enquiry Type`, `Project`, `Budget`, `Timeline`, `Summary`,
`Page`, `Source`, `Transcript`, `Submitted At`. Either add that table to the base
or point `TABLE_NAMES.assistant` at an existing one — Airtable rejects an unknown
table name, and unknown *field* names are rejected too unless the base has
typecast/auto-field-creation enabled.

A lead counts as captured if either Airtable or the team email got through; a
failure in either channel is logged with the Airtable status and message.

### How it works

| File | Role |
| --- | --- |
| [`src/lib/assistant/faq-data.ts`](src/lib/assistant/faq-data.ts) | Canonical FAQ — shared by `/faq` and the assistant |
| [`src/lib/assistant/knowledge.ts`](src/lib/assistant/knowledge.ts) | Curated half: company profile + team + FAQ |
| [`src/lib/assistant/live-knowledge.ts`](src/lib/assistant/live-knowledge.ts) | Live half: projects, insights, services, contact details from Sanity |
| [`src/lib/assistant/prompt.ts`](src/lib/assistant/prompt.ts) | System prompt: tone, boundaries, lead-generation behaviour |
| [`src/lib/assistant/tools.ts`](src/lib/assistant/tools.ts) | `capture_lead` tool → Airtable + team email |
| [`src/lib/assistant/conversation-log.ts`](src/lib/assistant/conversation-log.ts) | Per-turn conversation logging |
| [`src/app/api/assistant/route.ts`](src/app/api/assistant/route.ts) | Streaming (SSE) endpoint, tool loop, rate limiting |
| [`src/components/AIAssistant.tsx`](src/components/AIAssistant.tsx) | The chat widget |

### What the assistant knows

The knowledge base has two halves, concatenated per request:

- **Curated** (in code) — company profile, the 25-year lease model, programmes,
  legal framing, leadership, and the full FAQ. Edit `faq-data.ts` (also renders
  on `/faq`), `knowledge.ts`, or `src/lib/team-data.ts`.
- **Live** (from Sanity, revalidated hourly) — every project's specs, features
  and highlights, published insight articles, services, and the contact details
  in `siteSettings`. Edit these in the Studio; no deploy needed.

CMS sections are labelled authoritative in the prompt, so when the Studio and the
curated summary disagree the assistant follows the Studio. If Sanity is
unreachable it silently falls back to the curated half. The assistant answers
only from this knowledge base and hands off to the team rather than guess, so a
fact that is not written down will not be invented.

### Conversation logging

Every exchange writes a row to the **Assistant Conversations** Airtable table:
`Conversation ID`, `Turn`, `Page`, `Question`, `Answer`, `Lead Captured`,
`Needs Review`, `Logged At`. Sort by **Needs Review** to see the questions the
assistant could not answer — that list is the backlog for `faq-data.ts`.

`Needs Review` is a keyword heuristic over the reply, not a classifier; it errs
toward flagging, so expect some false positives. Logging is best-effort and can
never affect a visitor's reply.

The widget also emits GA events — `assistant_opened`,
`assistant_conversation_start`, `assistant_message_sent`,
`assistant_lead_captured` — which only fire after cookie consent, since `gtag`
does not exist before then.

**Cost control:** the ~10k-token knowledge base sits behind a prompt-cache
breakpoint, so repeat turns read it at roughly a tenth of the input price. The
CMS half is cached for an hour (`KB_REVALIDATE_SECONDS`), which keeps the prompt
byte-stable between refreshes — the cache re-warms once per revalidation, so
raising that interval trades freshness for a few more cache misses. The route
runs at `effort: "low"` for snappy replies and rate-limits to 30 requests per IP
per 10 minutes (in-memory — move to Redis if you scale beyond one instance).
