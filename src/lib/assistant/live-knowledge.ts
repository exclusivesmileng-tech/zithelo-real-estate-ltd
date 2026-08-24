/**
 * Live half of the assistant's knowledge base, read from Sanity.
 *
 * The curated half (`knowledge.ts`) holds facts that live in code — the lease
 * model, programmes, legal framing. This half holds everything the team edits in
 * the Studio: project specs, published insight articles, services and contact
 * details. Without it the assistant slowly goes stale as the CMS moves on.
 *
 * Two constraints shape the design:
 *  - Deterministic rendering. The prompt cache is a prefix match, so the string
 *    must be byte-identical between requests. Every list is explicitly ordered
 *    and the fetch is cached, so the text only changes on revalidation.
 *  - Never fatal. If Sanity is unreachable the assistant falls back to the
 *    curated knowledge alone rather than failing the conversation.
 */

import { groq } from "next-sanity";
import { client, urlFor } from "@/sanity/client";
import { SITE_URL } from "@/lib/assistant/config";

/** How long the rendered CMS content is reused. Also the cache-warm interval. */
export const KB_REVALIDATE_SECONDS = 3600;

const LIVE_KB_QUERY = groq`{
  "projects": *[_type == "project"] | order(order asc) {
    title, "slug": slug.current, badge, type, status, location, year, units,
    leaseTerm, leaseNote, shortDesc, features, highlights,
    stats[] { label, value }
  },
  "insights": *[_type == "insight" && defined(slug.current)] | order(date desc) [0...25] {
    title, "slug": slug.current, category, date, excerpt
  },
  "services": *[_type == "service"] | order(order asc) {
    title, description, points
  },
  "whyReasons": *[_type == "whyReason"] | order(order asc) {
    title, description, details
  },
  "settings": *[_type == "siteSettings"][0] {
    address, email, phone, partnershipEmail,
    aboutVision, aboutMission, aboutPhilosophy
  }
}`;

interface LiveProject {
  title: string;
  slug?: string;
  badge?: string;
  type?: string;
  status?: string;
  location?: string;
  year?: string;
  units?: string;
  leaseTerm?: string;
  leaseNote?: string;
  shortDesc?: string;
  features?: string[];
  highlights?: string[];
  stats?: { label: string; value: string }[];
}

interface LiveInsight {
  title: string;
  slug: string;
  category?: string;
  date?: string;
  excerpt?: string;
}

interface LiveService {
  title: string;
  description?: string;
  points?: string[];
}

interface LiveWhyReason {
  title: string;
  description?: string;
  details?: string;
}

interface LiveSettings {
  address?: string;
  email?: string;
  phone?: string;
  partnershipEmail?: string;
  aboutVision?: string;
  aboutMission?: string;
  aboutPhilosophy?: string;
}

interface LiveContent {
  projects?: LiveProject[];
  insights?: LiveInsight[];
  services?: LiveService[];
  whyReasons?: LiveWhyReason[];
  settings?: LiveSettings;
}

/** Collapses CMS prose to one clean line — excerpts contain emoji and newlines. */
function oneLine(text: string, max = 400): string {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max).trimEnd()}…` : flat;
}

function renderProjects(projects: LiveProject[]): string {
  const blocks = projects.map((p) => {
    const lines: string[] = [`### ${p.title}`];

    // `stats` often repeats a top-level field (location, units, lease term) with
    // different wording. Emitting both wastes prompt space and reads as noise,
    // so keep the first occurrence of each label and each value.
    const seenLabels = new Set<string>();
    const seenValues = new Set<string>();
    const addFact = (label: string, value?: string | null) => {
      if (!label || !value) return;
      const l = label.trim().toLowerCase();
      const v = value.trim().toLowerCase();
      if (seenLabels.has(l) || seenValues.has(v)) return;
      seenLabels.add(l);
      seenValues.add(v);
      lines.push(`- ${label}: ${value}`);
    };

    addFact("Type", p.type);
    addFact("Status", p.status);
    addFact("Location", p.location);
    addFact("Units", p.units);
    addFact("Build period", p.year);
    addFact("Lease term", p.leaseTerm);
    addFact("Lease dates", p.leaseNote);
    for (const s of p.stats ?? []) addFact(s?.label, s?.value);
    if (p.shortDesc) lines.push(`- Summary: ${oneLine(p.shortDesc)}`);
    if (p.features?.length) lines.push(`- Features: ${p.features.join("; ")}`);
    if (p.highlights?.length) lines.push(`- Highlights: ${p.highlights.join("; ")}`);
    if (p.slug) lines.push(`- Page: ${SITE_URL}/projects/${p.slug}`);
    return lines.join("\n");
  });

  return `## Current developments (live from the CMS — authoritative over the summary above)\n\n${blocks.join(
    "\n\n"
  )}`;
}

function renderInsights(insights: LiveInsight[]): string {
  const items = insights.map((a) => {
    const bits = [a.category, a.date].filter(Boolean).join(", ");
    const meta = bits ? ` (${bits})` : "";
    const excerpt = a.excerpt ? ` — ${oneLine(a.excerpt, 240)}` : "";
    return `- "${a.title}"${meta}${excerpt}\n  ${SITE_URL}/insights/${a.slug}`;
  });

  return [
    "## Published insight articles",
    "",
    "Recommend one of these by name when it genuinely answers what the visitor asked.",
    "Summarise only from the excerpt shown — you have not read the full article.",
    "",
    items.join("\n"),
  ].join("\n");
}

function renderServices(services: LiveService[]): string {
  const items = services.map((s) => {
    const desc = s.description ? ` ${oneLine(s.description)}` : "";
    const points = s.points?.length ? ` Covers: ${s.points.join("; ")}.` : "";
    return `- **${s.title}**:${desc}${points}`;
  });
  return `## Services (live from the CMS)\n\n${items.join("\n")}`;
}

function renderWhy(reasons: LiveWhyReason[]): string {
  const items = reasons.map((r) => {
    const body = [r.description, r.details].filter(Boolean).join(" ");
    return `- **${r.title}**: ${oneLine(body)}`;
  });
  return `## Why Zithelo (live from the CMS)\n\n${items.join("\n")}`;
}

function renderSettings(s: LiveSettings): string {
  const lines: string[] = [];
  if (s.email) lines.push(`- General email: ${s.email}`);
  if (s.partnershipEmail) lines.push(`- Partnership email: ${s.partnershipEmail}`);
  if (s.phone) lines.push(`- Phone / WhatsApp: ${s.phone}`);
  if (s.address) lines.push(`- Office: ${s.address}`);
  if (s.aboutVision) lines.push(`- Vision: ${s.aboutVision}`);
  if (s.aboutMission) lines.push(`- Mission: ${s.aboutMission}`);
  if (s.aboutPhilosophy) lines.push(`- Philosophy: ${s.aboutPhilosophy}`);

  if (!lines.length) return "";
  return `## Current contact details (live from the CMS — use these if they differ from the summary above)\n\n${lines.join(
    "\n"
  )}`;
}

const PROJECT_CARD_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    title, "slug": slug.current, badge, type, location, shortDesc, heroImage,
    stats[] { label, value }
  }
`;

export interface ProjectCard {
  title: string;
  slug: string;
  image: string | null;
  badge?: string;
  type?: string;
  location?: string;
  shortDesc?: string;
  stats: { label: string; value: string }[];
}

/**
 * Fetches the visual-card data for one development, for the assistant's
 * `show_project_card` tool. Uses the same cache window as the rest of the live
 * knowledge base, so calling it doesn't cost an extra round trip in practice.
 * Returns null (never throws) if the slug doesn't exist or Sanity is down —
 * the tool falls back to a plain-text answer in that case.
 */
export async function getProjectCard(slug: string): Promise<ProjectCard | null> {
  try {
    const data = await client.fetch<{
      title: string;
      slug: string;
      badge?: string;
      type?: string;
      location?: string;
      shortDesc?: string;
      heroImage?: unknown;
      stats?: { label: string; value: string }[];
    } | null>(
      PROJECT_CARD_QUERY,
      { slug },
      { next: { revalidate: KB_REVALIDATE_SECONDS, tags: ["assistant-kb"] } }
    );

    if (!data) return null;

    return {
      title: data.title,
      slug: data.slug,
      image: data.heroImage ? urlFor(data.heroImage).width(640).height(480).fit("crop").url() : null,
      badge: data.badge,
      type: data.type,
      location: data.location,
      shortDesc: data.shortDesc,
      stats: (data.stats ?? []).filter((s) => s?.label && s?.value).slice(0, 3),
    };
  } catch (err) {
    console.error("[assistant] Sanity project card fetch failed", err);
    return null;
  }
}

/**
 * Fetches and renders the CMS half of the knowledge base.
 * Returns an empty string if Sanity is unreachable or empty.
 */
export async function renderLiveKnowledge(): Promise<string> {
  let data: LiveContent | null = null;

  try {
    data = await client.fetch<LiveContent>(
      LIVE_KB_QUERY,
      {},
      { next: { revalidate: KB_REVALIDATE_SECONDS, tags: ["assistant-kb"] } }
    );
  } catch (err) {
    console.error("[assistant] Sanity knowledge fetch failed", err);
    return "";
  }

  if (!data) return "";

  const sections = [
    data.projects?.length ? renderProjects(data.projects) : "",
    data.insights?.length ? renderInsights(data.insights) : "",
    data.services?.length ? renderServices(data.services) : "",
    data.whyReasons?.length ? renderWhy(data.whyReasons) : "",
    data.settings ? renderSettings(data.settings) : "",
  ].filter(Boolean);

  return sections.join("\n\n");
}
