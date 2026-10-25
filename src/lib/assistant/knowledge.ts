/**
 * Zithelo AI assistant — knowledge base.
 *
 * Everything the assistant is allowed to state as fact about the company.
 * Curated company profile + the shared FAQ + the shared team roster, rendered
 * into one stable text document that is cached as a prompt prefix.
 *
 * IMPORTANT: this is the assistant's only source of truth. If a fact is not
 * here, the assistant is instructed to say it does not know and hand off to the
 * team rather than guess. Keep it accurate — never add aspirational claims,
 * guaranteed returns, or prices that are not publicly published.
 */

import { FAQ_CATEGORIES } from "@/lib/assistant/faq-data";
import { TEAM } from "@/lib/team-data";
import { SITE_URL } from "@/lib/assistant/config";
import { renderLiveKnowledge } from "@/lib/assistant/live-knowledge";

export { SITE_URL } from "@/lib/assistant/config";

/** Company profile — facts not already covered by the FAQ. */
const COMPANY_PROFILE = `
## Company

Zithelo Real Estate Limited is a premium property development company building
fibre-ready, professionally managed urban residences in Lagos, Nigeria, with a
pan-African growth ambition. It pioneered the 25-year lease investment model in
Nigeria, aimed at diaspora investors and professionals who want structured
property exposure and passive rental income without landlord responsibilities.

- Group headquarters: Atlanta, Georgia, USA
- Nigerian head office: Victoria Island, Lagos, Nigeria
- Development operations: Lagos, Nigeria
- Investor markets served: Nigeria, United Kingdom, United States, Canada
- Founders: Dr. Oluwaseun Akinbobola (Chairman) and Mrs. Ibitayo Akinbobola (CEO)
- Sister company: Zithelo Homes USA (property acquisition and management, Atlanta)

Every Zithelo development includes: verified land title (Certificate of
Occupancy confirmed before sales open), a registered 25-year leasehold
instrument, fibre-optic broadband infrastructure built into the structure, and
full in-house property management with transparent investor reporting.

## Developments

### Andoyi House — Yaba, Lagos (flagship)
- 88 premium fibre-ready smart studio apartments
- Location: Yaba, Lagos ("Silicon Lagos" — the city's technology district)
- Lease term: 25 years. Target completion: April 2027. Lease end: March 2052.
- Structured to target approximately 8% gross rental yield per annum, with
  roughly 5% projected annual capital appreciation (illustrative, not guaranteed)
- Minimum off-plan investment from about USD 20,000 equivalent
- Short-let and long-let rental strategies both supported and managed by Zithelo
- Page: ${SITE_URL}/projects/andoyi-house

### Zithelo Signature Homes 1 — Ikeja, Lagos
- Premium 4-bedroom semi-detached duplexes with BQ (boys' quarters)
- Location: off Toyin Street, Ikeja, Lagos
- Pricing: on request (higher minimum than Andoyi House given the duplex format)
- Structured to target approximately 6.5% gross yield with roughly 7% projected
  appreciation (illustrative, not guaranteed)
- Audience: diaspora returnees wanting a family home, and premium investors
- Page: ${SITE_URL}/projects/signature-homes
- Brochure (PDF): ${SITE_URL}/brochures/zithelo-signature-homes-ikeja-brochure.pdf

## Services

Land acquisition and due diligence; utility-led design and development;
construction delivery with continuous quality oversight; handover with full
documentation; ongoing asset and property management; institutional and
development-finance partnerships. Full-spectrum, acquisition through handover.

## Programmes investors can join

- Off-plan purchase — buy during construction on milestone-linked payment plans
  (e.g. 30% at signing, 30% at foundation, 20% at decking, 20% at handover)
- Diaspora investor programme — the entire process completed remotely, payment
  in NGN, GBP or USD: ${SITE_URL}/diaspora-investor
- Partnership programme: ${SITE_URL}/become-a-partner
- Referral programme — a bonus when a referred investor completes: ${SITE_URL}/refer
- Investor quiz — 5 questions, recommends the matching project: ${SITE_URL}/investor-quiz
- ROI calculator — model returns by amount and strategy: ${SITE_URL}/tools/roi-calculator

## Contact

- General enquiries: info@zithelorealestate.com
- Investment enquiries: invest@zithelorealestate.com
- Partnerships: partnerships@zithelorealestate.com
- Phone / WhatsApp: +234 9110 222 323
- Nigerian office: Victoria Island, Lagos, Nigeria
- Instagram: @zithelohomes · LinkedIn: linkedin.com/company/zithelo-real-estate
- Typical response time: within one business day

## Useful pages

- Home: ${SITE_URL}
- Projects: ${SITE_URL}/projects
- About: ${SITE_URL}/about
- Why Zithelo: ${SITE_URL}/why-zithelo
- Services: ${SITE_URL}/services
- Leadership: ${SITE_URL}/leadership
- Insights and market articles: ${SITE_URL}/insights
- Buying from abroad guide: ${SITE_URL}/guides/how-to-buy-property-in-nigeria-from-abroad
- Nigerian real estate glossary: ${SITE_URL}/glossary/nigeria-real-estate-terms
- Lagos area comparison: ${SITE_URL}/compare/lagos-investment-areas
- Contact: ${SITE_URL}/contact
- FAQ: ${SITE_URL}/faq
`.trim();

/** Leadership roster, rendered from the shared team data. */
function renderTeam(): string {
  const lines = TEAM.map(
    (m) =>
      `- ${m.name} — ${m.role}. ${m.tagline}${
        m.credentials?.length ? ` Credentials: ${m.credentials.join("; ")}.` : ""
      } Profile: ${SITE_URL}/leadership/${m.slug}`
  );
  return `## Leadership\n\n${lines.join("\n")}`;
}

/** The full FAQ, rendered from the shared FAQ data. */
function renderFaq(): string {
  const sections = FAQ_CATEGORIES.map((cat) => {
    const items = cat.items.map((i) => `Q: ${i.q}\nA: ${i.a}`).join("\n\n");
    return `### ${cat.title}\n\n${items}`;
  });
  return `## Frequently asked questions\n\n${sections.join("\n\n")}`;
}

/**
 * The curated knowledge base — facts that live in code.
 *
 * Built once at module load so the string is byte-identical on every request,
 * which is what lets the prompt cache hit.
 */
export const STATIC_KNOWLEDGE_BASE: string = [
  "# Zithelo Real Estate — company knowledge base",
  COMPANY_PROFILE,
  renderTeam(),
  renderFaq(),
].join("\n\n");

/**
 * The complete knowledge base: curated facts plus current CMS content.
 *
 * The CMS half is appended last and marked authoritative, so when the team edits
 * a project or contact detail in the Studio the assistant follows the edit
 * instead of the older curated summary. Falls back to the curated half alone if
 * Sanity is unreachable.
 */
export async function getKnowledgeBase(): Promise<string> {
  const live = await renderLiveKnowledge();
  return live ? `${STATIC_KNOWLEDGE_BASE}\n\n${live}` : STATIC_KNOWLEDGE_BASE;
}
