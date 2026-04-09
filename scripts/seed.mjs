/**
 * Zithelo CMS Seed Script
 * ─────────────────────────────────────────────────────────────────────────────
 * Pushes all hardcoded site content into Sanity so every page fetches from CMS.
 *
 * Usage:
 *   SANITY_API_TOKEN=<your-editor-token> node scripts/seed.mjs
 *
 * Get a token at: manage.sanity.io → project 16qij170 → API → Tokens
 * Set permission: Editor (or Administrator)
 *
 * Re-running is safe — uses createOrReplace(), so it's idempotent.
 * NOTE: Media (team photos, project images) must be uploaded via the Studio UI.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Load .env.local if SANITY_API_TOKEN is not already set
if (!process.env.SANITY_API_TOKEN) {
  try {
    const __dir = dirname(fileURLToPath(import.meta.url));
    const envPath = resolve(__dir, "../.env.local");
    const lines = readFileSync(envPath, "utf8").split("\n");
    for (const line of lines) {
      const [key, ...rest] = line.split("=");
      if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
    }
  } catch { /* .env.local not found — rely on shell env */ }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "16qij170",
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   ?? "production",
  apiVersion: "2024-01-01",
  token:      process.env.SANITY_API_TOKEN,
  useCdn:     false,
});

if (!process.env.SANITY_API_TOKEN) {
  console.error("❌  SANITY_API_TOKEN is not set.\n   Run: SANITY_API_TOKEN=<token> node scripts/seed.mjs");
  process.exit(1);
}

// ─── Helper ───────────────────────────────────────────────────────────────────
async function upsert(doc) {
  try {
    await client.createOrReplace(doc);
    console.log(`✓  ${doc._type} → ${doc._id}`);
  } catch (err) {
    console.error(`✗  ${doc._type} → ${doc._id}:`, err.message);
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// 1. SITE SETTINGS
// ═════════════════════════════════════════════════════════════════════════════
await upsert({
  _id: "siteSettings",
  _type: "siteSettings",
  address: "Victoria Island, Lagos, Nigeria",
  email: "info@zithelorealestate.com",
  phone: "+234 9110 222 323",
  partnershipEmail: "partnerships@zithelo.com",
  aboutIntro1: "Zithelo is an urban development and real estate investment company focused on delivering well-structured, high-quality developments within prime city locations — combining functionality, contemporary design, and long-term investment value.",
  aboutIntro2: "We develop connected spaces for modern professionals, remote workers, and diaspora investors — built with fibre optic infrastructure and structured investment models that generate strong rental income and long-term capital growth.",
  aboutVision: "Build The Leading Pan-African Urban Platform",
  aboutMission: "Execute High-Utility Assets With Precision",
  aboutPhilosophy: "Design Every Decision For Enduring Value",
  contactNextSteps: [
    { _key: "step1", step: "01", title: "Submit your enquiry",       body: "Fill in the form with as much detail as possible so we can route your message to the right team." },
    { _key: "step2", step: "02", title: "We review & respond",       body: "A member of our team will review your enquiry and reach out within 24–48 business hours." },
    { _key: "step3", step: "03", title: "Start the conversation",    body: "We\u2019ll schedule a call or meeting to explore how Zithelo can best serve your goals." },
  ],
});

// ═════════════════════════════════════════════════════════════════════════════
// 2. HOME PAGE
// ═════════════════════════════════════════════════════════════════════════════
await upsert({
  _id: "homePage",
  _type: "homePage",
  heroEyebrow:     "Zithelo Real Estate Limited",
  heroLine1:       "Building Africa\u2019s",
  heroLine2:       "Urban Future",
  heroSubtext:     "Premium connected spaces for modern professionals and diaspora investors across Africa\u2019s fastest-growing cities.",
  marqueeItems: [
    "Urban Development", "Pan-African Vision", "Premium Residences",
    "Diaspora Investment", "Fibre-Ready Infrastructure", "Smart Apartments",
    "Structured Returns", "Lagos \u00b7 Nairobi \u00b7 Accra",
  ],
  whyCards: [
    { _key: "w1", num: "01", title: "Prime Locations Only",       desc: "Every development sits inside Africa\u2019s highest-demand urban corridors \u2014 Yaba, Ikeja, and beyond.",                                                       detail: "Yaba \u00b7 Ikeja \u00b7 Nairobi" },
    { _key: "w2", num: "02", title: "25-Year Structured Lease",   desc: "A transparent, income-generating lease model that earns you rental rights from day one of occupancy.",                                                  detail: "Rental income \u00b7 Resale rights" },
    { _key: "w3", num: "03", title: "Fibre-Ready Infrastructure", desc: "Every unit is wired for the modern professional. Gigabit-ready on day one \u2014 no retrofitting needed.",                                                  detail: "Fibre optic \u00b7 Smart-ready" },
    { _key: "w4", num: "04", title: "Diaspora-Trusted",           desc: "Built for investors who don\u2019t live locally. Full documentation, verified title, and remote-accessible management.", detail: "Verified title \u00b7 Remote access" },
  ],
  whoWeAreP1: "Zithelo is an urban development and real estate investment company focused on delivering well-structured, high-quality developments within prime city locations \u2014 combining functionality, contemporary design, and long-term investment value.",
  whoWeAreP2: "We develop connected spaces for modern professionals, remote workers, and diaspora investors \u2014 built with fibre optic infrastructure and structured investment models that generate strong rental income and long-term capital growth.",
  investHeadline1: "The Zithelo",
  investHeadline2: "25-Year Lease",
  investSubtext:   "Own rental income rights and long-term capital growth without the burden of direct management. A structured, transparent vehicle built for diaspora and professional investors.",
});

// ═════════════════════════════════════════════════════════════════════════════
// 3. ABOUT PAGE
// ═════════════════════════════════════════════════════════════════════════════
await upsert({
  _id: "aboutPage",
  _type: "aboutPage",
  introHeadline: "We Build City-Grade Assets For Africa\u2019s Next Urban Chapter.",
  introP1: "Zithelo is an urban development and real estate investment company focused on prime locations, high-utility design, and structured investment outcomes. We serve modern professionals, remote workers, and diaspora investors who demand quality and clarity.",
  chips: ["Prime Urban Corridors", "Fibre-Ready Infrastructure", "Structured Investment Models"],
  whatWeBuild:   "Connected residential and mixed-use developments in high-demand urban districts.",
  whoWeBuildFor: "Professionals and diaspora investors seeking utility, liquidity potential, and long-term resilience.",
  howWeWin:      "Disciplined site selection, execution rigor, and transparent structures that scale confidence.",
  foundationPillars: [
    { _key: "p1", iconName: "Globe",      label: "Continental Vision",    title: "Africa-First Urban Strategy",           text: "We focus on high-growth cities where housing demand, workforce mobility, and digital infrastructure growth converge.",                                          detail: "Lagos today. Pan-Africa next." },
    { _key: "p2", iconName: "Building2",  label: "Execution Discipline",  title: "Prime-Located, High-Utility Assets",    text: "Every project is built around practical use cases for residents and long-term value creation for investors.",                                               detail: "Function-led design decisions." },
    { _key: "p3", iconName: "Shield",     label: "Investor Confidence",   title: "Structured, Transparent Delivery",      text: "From planning to handover, we prioritize clarity in documentation, project updates, and investment structure.",                                           detail: "Built for local and diaspora trust." },
    { _key: "p4", iconName: "TrendingUp", label: "Long-Term Value",       title: "Income + Capital Growth Focus",         text: "Our developments are positioned for rental performance and appreciation in resilient urban corridors.",                                                    detail: "Designed for compounding returns." },
  ],
  keyMetrics: [
    { _key: "m1", value: "2",       label: "Active Properties" },
    { _key: "m2", value: "2025",    label: "Current Delivery Cycle" },
    { _key: "m3", value: "25-Year", label: "Structured Lease Model" },
    { _key: "m4", value: "2050",    label: "Urban Demand Horizon" },
  ],
  operatingModelPoints: [
    "Acquisition and selection in high-demand urban corridors.",
    "Design and build centered on utility, connectivity, and durability.",
    "Structured investment framework with transparent execution milestones.",
  ],
  principles: [
    { _key: "pr1", key: "01", label: "Vision",      title: "Build The Leading Pan-African Urban Platform", text: "Create the most trusted development and investment platform connecting diaspora capital to premium real estate opportunities in Africa\u2019s highest-growth cities.",                                                           focus: "Market Direction" },
    { _key: "pr2", key: "02", label: "Mission",     title: "Execute High-Utility Assets With Precision",   text: "Deliver structured, high-quality developments that generate long-term value for investors while creating modern, functional spaces for professionals and communities.",                                                         focus: "Operational Engine" },
    { _key: "pr3", key: "03", label: "Philosophy",  title: "Design Every Decision For Enduring Value",     text: "Build with purpose so every decision, from location to design to infrastructure, compounds value for investors, residents, and the cities we serve.",                                                                          focus: "Decision Standard" },
  ],
});

// ═════════════════════════════════════════════════════════════════════════════
// 4. PARTNERSHIP PAGE
// ═════════════════════════════════════════════════════════════════════════════
await upsert({
  _id: "partnershipPage",
  _type: "partnershipPage",
  partnerTypes: [
    {
      _key: "pt1",
      iconName: "Users",
      accent: "REALTORS & AGENTS",
      title: "Realtor & Agent Partners",
      description: "Are you a licensed real estate agent, broker, or consultant? Join our referral and co-agency network to earn competitive commissions introducing qualified buyers, tenants, or investors to Zithelo developments.",
      points: ["Competitive commission structure", "Co-marketing collateral and training", "Dedicated relationship manager", "Access to off-plan pricing"],
      cta: "Register as a Realtor",
      ctaHref: "/contact?type=realtor",
    },
    {
      _key: "pt2",
      iconName: "Building2",
      accent: "PROPERTY OWNERS",
      title: "Property Owners & Co-Development",
      description: "Own land or an existing asset in a prime urban corridor? We partner with landowners and property holders to co-develop under structured joint venture arrangements \u2014 bringing capital, expertise, and execution.",
      points: ["Land or asset contribution models", "Profit-sharing joint ventures", "Full turnkey development execution", "Transparent legal and financial structures"],
      cta: "Explore Co-Development",
      ctaHref: "/contact?type=codevelopment",
    },
  ],
  investorTypes: [
    {
      _key: "it1",
      iconName: "TrendingUp",
      accent: "EQUITY INVESTORS",
      title: "Equity Investment \u2014 Own a Stake",
      description: "Invest directly into a Zithelo development project and earn returns proportional to your equity stake. Suitable for individuals, family offices, and diaspora investors seeking real-asset exposure in Africa\u2019s fastest-growing cities.",
      points: ["Minimum investment thresholds communicated per project", "Quarterly reporting and transparency", "Exit via sale, refinancing, or rental yield distribution", "Projects across Lagos and expanding markets"],
      cta: "Enquire About Equity Investment",
      ctaHref: "/contact?type=equity",
    },
    {
      _key: "it2",
      iconName: "Handshake",
      accent: "INSTITUTIONS & FUNDS",
      title: "Institutional & Fund Partnerships",
      description: "We work with development finance institutions, family offices, and investment funds seeking structured co-investment or joint venture arrangements at scale. Governance-aligned, returns-focused, and built for long-term value.",
      points: ["Joint venture and co-investment structures", "Institutional due diligence support", "Bankable feasibilities and financial models", "Alignment with ESG and impact standards"],
      cta: "Start an Institutional Conversation",
      ctaHref: "/contact?type=institutional",
    },
  ],
  howItWorks: [
    { _key: "h1", step: "01", title: "Reach Out",          body: "Submit your enquiry via our contact form selecting the relevant partnership or investment type." },
    { _key: "h2", step: "02", title: "Initial Discussion", body: "Our partnerships team will schedule a call to understand your objectives and present relevant opportunities." },
    { _key: "h3", step: "03", title: "Due Diligence",      body: "We share project details, financial models, and legal frameworks for your assessment." },
    { _key: "h4", step: "04", title: "Structure & Sign",   body: "We agree on the right structure \u2014 JV, equity stake, commission agreement \u2014 and formalise it." },
    { _key: "h5", step: "05", title: "Deliver Together",   body: "You benefit from Zithelo\u2019s execution capability while we build lasting, mutually rewarding relationships." },
  ],
});

// ═════════════════════════════════════════════════════════════════════════════
// 5. PROJECTS
// ═════════════════════════════════════════════════════════════════════════════
await upsert({
  _id: "project-andoyi-house",
  _type: "project",
  title: "Andoyi House",
  slug: { _type: "slug", current: "andoyi-house" },
  badge: "Smart Living",
  heroSubtitle: "A Premium, Fibre-Ready Smart Apartment Complex",
  type: "Smart Studio Apartments",
  location: "Yaba, Lagos",
  year: "2025 \u2013 2027",
  units: "88 Units",
  status: "Under Construction",
  shortDesc: "Designed for professionals, entrepreneurs, and remote workers seeking efficient, connected living within Lagos\u2019 innovation ecosystem. Fully wired with fibre optic internet and optimised for short-let and long-term rental investment.",
  features: ["88 Studio Units", "Fibre Optic Internet", "25-Year Lease Model", "Short-Let Ready", "Prime Yaba Location", "Structured Returns"],
  leaseTerm: "25 Years",
  leaseNote: "Lease: April 2027 \u2013 March 2052",
  highlights: [
    "Fibre optic broadband in every unit",
    "Optimised for short-let & long-term rental",
    "25-year structured lease with income rights",
    "Resale flexibility included",
    "Located in Lagos\u2019 tech & innovation hub",
    "Contemporary design with premium finishes",
  ],
  stats: [
    { _key: "s1", label: "Total Units",  value: "88" },
    { _key: "s2", label: "Lease Term",   value: "25 Years" },
    { _key: "s3", label: "Completion",   value: "Apr 2027" },
    { _key: "s4", label: "Lease End",    value: "Mar 2052" },
  ],
  order: 1,
});

await upsert({
  _id: "project-signature-homes",
  _type: "project",
  title: "Zithelo Signature Homes 1",
  slug: { _type: "slug", current: "signature-homes" },
  badge: "Luxury Living",
  heroSubtitle: "Where Luxury Meets Legacy \u2014 4 Bed Semi-Detached with BQ",
  type: "Semi-Detached Duplexes",
  location: "Ikeja, Lagos",
  year: "2025 \u2013 2027",
  units: "",
  status: "Under Construction",
  shortDesc: "Spacious 4-bedroom semi-detached duplexes with BQ in the heart of Ikeja \u2014 steps from Marriott Hotel, Ikeja City Mall, and M.M. International Airport. Contemporary luxury finishes, 24/7 power, CCTV, and walk-in closets throughout.",
  features: ["4 Bedrooms + BQ", "Walk-in Closets", "24/7 Power Supply", "CCTV & Gated Security", "Private Balconies", "Fibre-Ready Infrastructure"],
  highlights: [
    "Secure gated environment with CCTV surveillance",
    "4 spacious bedrooms each with walk-in closet",
    "Internet-ready fibre optic infrastructure",
    "Contemporary luxury finishes throughout",
    "Fully fitted modern kitchen",
    "Ample parking space on-site",
    "Private balconies per unit",
    "24/7 power supply",
    "Boy\u2019s Quarters (BQ) included",
    "Off Toyin Street \u2014 prime Ikeja address",
  ],
  stats: [
    { _key: "s1", label: "Property Type", value: "Semi-Detached + BQ" },
    { _key: "s2", label: "Bedrooms",      value: "4 Bedrooms" },
    { _key: "s3", label: "Location",      value: "Ikeja, Lagos" },
    { _key: "s4", label: "Pricing",       value: "Price on Request" },
  ],
  order: 2,
});

// ═════════════════════════════════════════════════════════════════════════════
// 6. TEAM MEMBERS
// ═════════════════════════════════════════════════════════════════════════════
const teamMembers = [
  {
    _id: "team-dr-oluwaseun-akinbobola",
    _type: "teamMember",
    name: "Dr. Oluwaseun Akinbobola",
    slug: { _type: "slug", current: "dr-oluwaseun-akinbobola" },
    role: "Chairman, Zithelo Group",
    category: "Board",
    tagline: "Healthcare entrepreneur and strategic investor providing governance and long-term direction across the Zithelo Group.",
    bio: "Dr. Oluwaseun Akinbobola is a healthcare entrepreneur, business strategist, and investor with a proven track record of building and scaling multi-sector businesses across healthcare, real estate, and consumer markets. As Chairman, he provides strategic direction and governance oversight, ensuring the Group\u2019s growth is anchored in disciplined execution, structured expansion, and long-term value creation. He is the Co-Founder of Beaconhill Smile Group and leads Zithelo Homes USA, a property acquisition and management company based in Atlanta. He has undertaken executive education at the Wharton School and Strathmore Business School, and is an alumnus of the Owner-Manager Programme at Lagos Business School.",
    credentials: ["Wharton School Executive Education", "Strathmore Business School", "Lagos Business School \u2014 Owner-Manager Programme", "Co-Founder, Beaconhill Smile Group", "Founder, Zithelo Homes USA (Atlanta)"],
    featured: true,
    order: 1,
  },
  {
    _id: "team-mrs-ibitayo-akinbobola",
    _type: "teamMember",
    name: "Mrs. Ibitayo Akinbobola",
    slug: { _type: "slug", current: "mrs-ibitayo-akinbobola" },
    role: "Chief Executive Officer",
    category: "Board",
    tagline: "Business leader driving execution across Zithelo\u2019s operations, development portfolio, and commercial strategy.",
    bio: "Mrs. Ibitayo Akinbobola is a healthcare entrepreneur and business leader responsible for driving execution across Zithelo Group\u2019s operations and development portfolio. As CEO, she leads the translation of strategy into results, overseeing operations, product development, sales, and market positioning, with a focus on efficiency, scalability, and commercial viability. She holds a BSc in Biomedical Science from the University of Staffordshire and an MSc in Pharmaceutical Science from the University of Greenwich. She is the Co-Founder of Beaconhill Smile Group and Zithelo Homes USA, and plays a leadership role in Beaconhill Foundation. Her early experience with Peabody Trust in the UK provided foundational exposure to property management systems.",
    credentials: ["BSc Biomedical Science \u2014 University of Staffordshire", "MSc Pharmaceutical Science \u2014 University of Greenwich", "Co-Founder, Beaconhill Smile Group", "Co-Founder, Zithelo Homes USA", "Peabody Trust, UK (Property Management)"],
    featured: true,
    order: 2,
  },
  {
    _id: "team-arc-odunayo-lawani",
    _type: "teamMember",
    name: "Arc. Odunayo Lawani",
    slug: { _type: "slug", current: "arc-odunayo-lawani" },
    role: "Board Advisor \u2014 Technical & Development",
    category: "Board",
    tagline: "Architect and project leader with over two decades of experience delivering complex, high-value developments across Nigeria.",
    bio: "Arc. Odunayo Lawani is an accomplished architect and project leader with over two decades of experience delivering complex construction and development projects across Nigeria. As Board Advisor, he provides independent technical oversight and strategic guidance across the Group\u2019s developments, ensuring alignment with global standards in design, engineering integrity, and project execution. He holds an MBA in Strategy from Heriot-Watt University, alongside Bachelor\u2019s and Master\u2019s degrees in Architecture from the Federal University of Technology, Akure. He is a certified PMP, PMI-RMP, and PMI-PBA.",
    credentials: ["MBA Strategy \u2014 Heriot-Watt University", "BArch & MArch \u2014 FUTA", "PMP \u00b7 PMI-RMP \u00b7 PMI-PBA (Certified)", "MNIOB Member", "Project Director, ArchVision Workgroup Limited"],
    featured: true,
    order: 3,
  },
  {
    _id: "team-ibikunle-iwalewa",
    _type: "teamMember",
    name: "Mr. Ibikunle Iwalewa",
    slug: { _type: "slug", current: "ibikunle-iwalewa" },
    role: "Group Head, Human Resources & Administration",
    category: "Management",
    tagline: "Human capital leader with over three decades of experience building institutional people frameworks across telecoms, banking, and real estate.",
    bio: "Mr. Ibikunle Iwalewa is a highly experienced human capital and corporate services leader with over three decades of professional experience across telecommunications, banking, real estate, and multinational organizations. He leads Human Resources and Administration at Zithelo, responsible for building strong institutional frameworks, aligning people strategy with business objectives, and driving operational efficiency across the Group.",
    credentials: ["MBA Human Resource Management", "BA English Studies", "SHRM Member", "Former: Laplace Technologies, Pentagon Real Estate, City Express Bank"],
    featured: false,
    order: 4,
  },
  {
    _id: "team-filusi-toyin-diya",
    _type: "teamMember",
    name: "Builder Filusi Toyin Diya",
    slug: { _type: "slug", current: "builder-filusi-toyin-diya" },
    role: "Head, Projects",
    category: "Management",
    tagline: "Construction professional and Quantity Surveyor leading project delivery with a focus on execution excellence and cost efficiency.",
    bio: "Builder Filusi Toyin Diya is an accomplished construction professional and Quantity Surveyor with over two decades of experience delivering high-value residential, commercial, and industrial developments across Nigeria. Trained in both Building Technology and Quantity Surveying, he brings technical delivery and cost engineering expertise across the full project lifecycle. At Zithelo, he leads the Projects function with a focus on execution excellence, cost efficiency, and risk-managed delivery.",
    credentials: ["Building Technology (Certified)", "Quantity Surveying (Certified)", "MNIOB Member", "20+ years construction & development delivery"],
    featured: false,
    order: 5,
  },
  {
    _id: "team-gabriel-akintayo",
    _type: "teamMember",
    name: "Mr. Gabriel Akintayo",
    slug: { _type: "slug", current: "gabriel-akintayo" },
    role: "Head, Customer Experience",
    category: "Management",
    tagline: "Customer experience professional overseeing service delivery, client engagement, and satisfaction standards across the Zithelo Group.",
    bio: "Gabriel Akintayo is a customer experience professional with an MBA and a strong track record in service delivery, client engagement, and operational excellence. At Zithelo, he leads the Group\u2019s Customer Experience function, overseeing the design and implementation of systems that enhance client journeys, improve service delivery standards, and drive customer satisfaction across all subsidiaries.",
    credentials: ["MBA", "Customer Experience Management", "Operational Excellence"],
    featured: true,
    order: 6,
  },
];

for (const member of teamMembers) {
  await upsert(member);
}

// ═════════════════════════════════════════════════════════════════════════════
// 7. SERVICES
// ═════════════════════════════════════════════════════════════════════════════
const services = [
  {
    _id: "service-development",
    _type: "service",
    title: "Real Estate Development",
    iconName: "Building2",
    description: "From concept to completion, we develop premium residential and commercial properties that set new standards in African real estate. Our developments combine international design standards with deep local understanding.",
    points: ["Luxury residential complexes", "Premium commercial towers", "Gated estate communities", "Smart building integration"],
    order: 1,
  },
  {
    _id: "service-construction",
    _type: "service",
    title: "Construction",
    iconName: "Globe",
    description: "Our construction capabilities span large-scale urban developments, leveraging modern building technologies and sustainable practices to deliver projects on time and to specification.",
    points: ["Large-scale construction", "Sustainable building practices", "Quality assurance systems", "Safety-first methodology"],
    order: 2,
  },
  {
    _id: "service-project-management",
    _type: "service",
    title: "Project Management",
    iconName: "Users",
    description: "End-to-end project lifecycle management from feasibility studies through handover. We ensure every project meets its targets for quality, timeline, and budget.",
    points: ["Feasibility analysis", "Design management", "Construction oversight", "Stakeholder coordination"],
    order: 3,
  },
  {
    _id: "service-investment",
    _type: "service",
    title: "Investment Partnerships",
    iconName: "TrendingUp",
    description: "We structure investment vehicles for institutional and private capital seeking exposure to Africa\u2019s real estate growth story. Our partnerships are built on transparency and long-term value creation.",
    points: ["Joint venture structures", "Fund management", "Institutional partnerships", "Returns-focused strategy"],
    order: 4,
  },
];

for (const svc of services) {
  await upsert(svc);
}

// ═════════════════════════════════════════════════════════════════════════════
// 8. WHY ZITHELO REASONS
// ═════════════════════════════════════════════════════════════════════════════
const whyReasons = [
  {
    _id: "why-01-execution",
    _type: "whyReason",
    number: "01",
    title: "Execution Excellence",
    description: "Our track record speaks for itself. Every project we deliver meets the highest standards of quality, safety, and design. We don\u2019t cut corners \u2014 we set benchmarks.",
    details: "From procurement to handover, our processes are built on international best practices refined for African markets.",
    order: 1,
  },
  {
    _id: "why-02-intelligence",
    _type: "whyReason",
    number: "02",
    title: "Market Intelligence",
    description: "Deep, data-driven understanding of Africa\u2019s real estate markets gives us an edge in identifying opportunities before they become mainstream.",
    details: "Our research team continuously monitors demographic shifts, infrastructure development, and regulatory changes across our target markets.",
    order: 2,
  },
  {
    _id: "why-03-partnerships",
    _type: "whyReason",
    number: "03",
    title: "Strategic Partnerships",
    description: "We partner with leading financial institutions, development finance organisations, and governments to co-create developments of scale and significance.",
    details: "Our partnerships are built on mutual trust, transparency, and aligned long-term objectives.",
    order: 3,
  },
  {
    _id: "why-04-vision",
    _type: "whyReason",
    number: "04",
    title: "Long-Term Vision",
    description: "We think in decades. Every decision we make \u2014 from land acquisition to design \u2014 is guided by where African cities will be in 20, 30, 50 years.",
    details: "This generational perspective allows us to create developments that appreciate in value and relevance over time.",
    order: 4,
  },
];

for (const reason of whyReasons) {
  await upsert(reason);
}

// ═════════════════════════════════════════════════════════════════════════════
// 9. AFRICA VISION REGIONS
// ═════════════════════════════════════════════════════════════════════════════
const regions = [
  { _id: "region-west-africa",     _type: "region", name: "West Africa",     countries: "Nigeria, Ghana, Senegal",  status: "Active",    description: "Our largest market with developments across Lagos, Accra, and Dakar.", order: 1 },
  { _id: "region-east-africa",     _type: "region", name: "East Africa",     countries: "Kenya, Rwanda, Tanzania",  status: "Active",    description: "Fast-growing markets with significant demand for premium urban spaces.", order: 2 },
  { _id: "region-southern-africa", _type: "region", name: "Southern Africa", countries: "South Africa, Botswana",   status: "Expansion", description: "Strategic entry into established markets with strong institutional frameworks.", order: 3 },
  { _id: "region-north-africa",    _type: "region", name: "North Africa",    countries: "Morocco, Egypt",           status: "Research",  description: "Evaluating opportunities in Africa\u2019s most mature real estate markets.", order: 4 },
];

for (const region of regions) {
  await upsert(region);
}

// ─────────────────────────────────────────────────────────────────────────────
console.log("\n\u2728  Seed complete! Open the Sanity Studio to upload team photos and project images.");
console.log("   Studio URL: https://zithelo.com/studio  (or localhost:3000/studio in dev)\n");
