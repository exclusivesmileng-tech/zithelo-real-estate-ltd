// TypeScript types for Sanity document data (plain resolved shapes, no raw refs)

export interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  type?: string;
  status?: string;
  location?: string;
  year?: string;
  units?: string;
  leaseTerm?: string;
  leaseNote?: string;
  shortDesc?: string;
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
  role?: string;
  category?: "Board" | "Management";
  photo?: unknown;
  bio?: string;
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
}
