// TypeScript types for Sanity document data (plain resolved shapes, no raw refs)

export interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  badge?: string;
  heroSubtitle?: string;
  type?: string;
  status?: string;
  location?: string;
  year?: string;
  units?: string;
  leaseTerm?: string;
  leaseNote?: string;
  shortDesc?: string;
  features?: string[];
  heroImage?: unknown;
  heroVideo?: string;
  gallery?: unknown[];
  videoClips?: { label: string; src: string; thumb?: unknown }[];
  highlights?: string[];
  stats?: { label: string; value: string }[];
  order?: number;
}

export interface SanityInsight {
  _id: string;
  title: string;
  slug?: { current: string };
  category?: string;
  date?: string;
  excerpt?: string;
  coverImage?: unknown;
  body?: unknown[];
}

export interface SanityTeamMember {
  _id: string;
  name: string;
  slug?: { current: string };
  role?: string;
  category?: "Board" | "Management";
  photo?: unknown;
  tagline?: string;
  bio?: string;
  credentials?: string[];
  featured?: boolean;
  order?: number;
}

export interface SanityService {
  _id: string;
  title: string;
  iconName?: string;
  description?: string;
  points?: string[];
  order?: number;
}

export interface SanityWhyReason {
  _id: string;
  number?: string;
  title: string;
  description?: string;
  details?: string;
  order?: number;
}

export interface SanityRegion {
  _id: string;
  name: string;
  countries?: string;
  status?: string;
  description?: string;
  order?: number;
}

export interface SanitySiteSettings {
  address?: string;
  email?: string;
  phone?: string;
  partnershipEmail?: string;
  aboutIntro1?: string;
  aboutIntro2?: string;
  aboutVision?: string;
  aboutMission?: string;
  aboutPhilosophy?: string;
  contactNextSteps?: { step: string; title: string; body: string }[];
}

// ─── Page singleton types ─────────────────────────────────────────────────────

export interface SanityWhyCard {
  num: string;
  title: string;
  desc: string;
  detail: string;
}

export interface SanityHomePage {
  heroEyebrow?: string;
  heroLine1?: string;
  heroLine2?: string;
  heroSubtext?: string;
  marqueeItems?: string[];
  whyCards?: SanityWhyCard[];
  whoWeAreP1?: string;
  whoWeAreP2?: string;
  investHeadline1?: string;
  investHeadline2?: string;
  investSubtext?: string;
}

export interface SanityPillar {
  iconName: string;
  label: string;
  title: string;
  text: string;
  detail: string;
}

export interface SanityPrinciple {
  key: string;
  label: string;
  title: string;
  text: string;
  focus: string;
}

export interface SanityAboutPage {
  introHeadline?: string;
  introP1?: string;
  chips?: string[];
  whatWeBuild?: string;
  whoWeBuildFor?: string;
  howWeWin?: string;
  foundationPillars?: SanityPillar[];
  keyMetrics?: { value: string; label: string }[];
  operatingModelPoints?: string[];
  principles?: SanityPrinciple[];
}

export interface SanityPartnerItem {
  iconName: string;
  accent: string;
  title: string;
  description: string;
  points: string[];
  cta: string;
  ctaHref: string;
}

export interface SanityHowItWorksStep {
  step: string;
  title: string;
  body: string;
}

export interface SanityPartnershipPage {
  partnerTypes?: SanityPartnerItem[];
  investorTypes?: SanityPartnerItem[];
  howItWorks?: SanityHowItWorksStep[];
}

