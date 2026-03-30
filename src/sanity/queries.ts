import { groq } from "next-sanity";

// ─── Projects ────────────────────────────────────────────────────────────────

export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc) {
    _id, title, slug, type, status, location, year, units, shortDesc, heroImage, order
  }
`;

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id, title, slug, type, status, location, year, units,
    leaseTerm, leaseNote, shortDesc,
    heroImage, heroVideo,
    gallery[],
    videoClips[] { label, src, thumb },
    highlights[],
    stats[] { label, value }
  }
`;

// ─── Insights ────────────────────────────────────────────────────────────────

export const ALL_INSIGHTS_QUERY = groq`
  *[_type == "insight"] | order(date desc) {
    _id, title, slug, category, date, excerpt, coverImage
  }
`;

export const INSIGHT_BY_SLUG_QUERY = groq`
  *[_type == "insight" && slug.current == $slug][0] {
    _id, title, slug, category, date, excerpt, coverImage, body
  }
`;

// ─── Team ────────────────────────────────────────────────────────────────────

export const ALL_TEAM_QUERY = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id, name, role, category, bio, photo, order
  }
`;

export const TEAM_BY_CATEGORY_QUERY = groq`
  *[_type == "teamMember" && category == $category] | order(order asc) {
    _id, name, role, category, bio, photo, order
  }
`;

// ─── Services ────────────────────────────────────────────────────────────────

export const ALL_SERVICES_QUERY = groq`
  *[_type == "service"] | order(order asc) {
    _id, title, iconName, description, points
  }
`;

// ─── Why Zithelo ─────────────────────────────────────────────────────────────

export const ALL_WHY_REASONS_QUERY = groq`
  *[_type == "whyReason"] | order(order asc) {
    _id, number, title, description, details
  }
`;

// ─── Africa Vision regions ───────────────────────────────────────────────────

export const ALL_REGIONS_QUERY = groq`
  *[_type == "region"] | order(order asc) {
    _id, name, countries, status, description
  }
`;

// ─── Site settings ───────────────────────────────────────────────────────────

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    address, email, phone, partnershipEmail,
    aboutIntro1, aboutIntro2,
    aboutVision, aboutMission, aboutPhilosophy
  }
`;
