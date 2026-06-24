import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SavedPropertiesProvider } from "@/contexts/SavedPropertiesContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SavedDrawer from "@/components/SavedDrawer";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";
import GoogleAnalyticsLoader from "@/components/GoogleAnalyticsLoader";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

export const viewport: Viewport = {
  themeColor: "#c9a84c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zithelo Real Estate Limited | Premium Urban Development in Africa",
    template: "%s | Zithelo Real Estate",
  },
  description:
    "Zithelo builds premium, fibre-ready urban developments across Africa's fastest-growing cities. Invest with verified title, 25-year lease security, and full management support.",
  keywords: [
    "real estate Nigeria",
    "Lagos property investment",
    "diaspora investor Nigeria",
    "25 year lease property",
    "smart apartments Lagos",
    "Andoyi House",
    "Signature Homes Lagos",
    "real estate investment Africa",
    "off-plan property Nigeria",
    "Zithelo homes",
    "Zithelo Real Estate",
    "premium apartments Lagos",
    "buy property Lagos",
    "fibre-ready apartments Nigeria",
    "real estate developer Lagos",
    "Africa real estate investment",
    "Yaba Lagos apartments",
    "Victoria Island real estate",
    "Nigerian property developer",
    "short-let investment Lagos",
  ],
  authors: [
    { name: "Zithelo Real Estate Limited", url: SITE_URL },
    { name: "Harzotech Nig Ltd", url: "https://harzotech.com.ng" },
  ],
  creator: "Harzotech Nig Ltd",
  publisher: "Zithelo Real Estate Limited",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
    shortcut: "/images/favicon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Zithelo",
  },
  openGraph: {
    siteName: "Zithelo Real Estate Limited",
    title: "Zithelo Real Estate | Premium Urban Development in Africa",
    description:
      "Premium, fibre-ready real estate investment opportunities in Africa's fastest-growing cities. Verified title. 25-year lease. Diaspora-trusted.",
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    images: [
      {
        url: "/images/andoyi/2.png",
        width: 1200,
        height: 630,
        alt: "Andoyi House — Premium Smart Apartments by Zithelo, Yaba Lagos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zithelohomes",
    creator: "@zithelohomes",
    title: "Zithelo Real Estate | Premium Urban Development in Africa",
    description:
      "Premium, fibre-ready real estate investment in Africa's fastest-growing cities.",
    images: ["/images/andoyi/2.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  // These render as <meta> tags — invisible to visitors, readable by crawlers
  other: {
    "msapplication-TileColor": "#c9a84c",
    "site-built-by": "Harzotech Nig Ltd — harzotech.com.ng",
    "site-developer": "Azeez Agbona O. (agbonaazeez)",
  },
};

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

// Organization — Zithelo Real Estate (site-wide authority signal)
const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "Zithelo Real Estate Limited",
  alternateName: ["Zithelo", "Zithelo Homes", "Zithelo Real Estate"],
  url: SITE_URL,
  logo: `${SITE_URL}/images/zithelo-logo-colored.png`,
  image: `${SITE_URL}/images/andoyi/2.png`,
  description:
    "Pan-African urban development company building premium, fibre-ready real estate for modern professionals and diaspora investors. Operating in Nigeria with a 25-year lease model and verified title on every unit.",
  foundingDate: "2023",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Victoria Island",
    addressLocality: "Lagos",
    addressRegion: "Lagos State",
    addressCountry: "NG",
    postalCode: "101241",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 6.4281,
    longitude: 3.4219,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+234-911-022-2323",
      contactType: "customer service",
      availableLanguage: ["English"],
      areaServed: ["NG", "GB", "US", "CA"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      url: `${SITE_URL}/contact`,
      availableLanguage: ["English"],
    },
  ],
  priceRange: "₦₦₦₦",
  currenciesAccepted: "NGN, USD, GBP",
  paymentAccepted: "Bank Transfer, Online Payment",
  areaServed: [
    { "@type": "Country", name: "Nigeria" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United States" },
  ],
  sameAs: [
    "https://instagram.com/zithelohomes",
    "https://www.linkedin.com/company/zithelo-real-estate",
    "https://x.com/zithelohomes",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Zithelo Real Estate Investment Opportunities",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Andoyi House — Studio Apartments, Yaba Lagos",
        description:
          "88 premium studio smart apartments in Yaba, Lagos. Fibre-ready, off-plan investment with verified title and 25-year lease security.",
        url: `${SITE_URL}/projects/andoyi-house`,
      },
      {
        "@type": "Offer",
        name: "Signature Homes — Premium Residential Lagos",
        description:
          "Premium residential development by Zithelo Real Estate in Lagos, Nigeria.",
        url: `${SITE_URL}/projects/signature-homes`,
      },
    ],
  },
};

// WebSite — links site to developer for authority association
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Zithelo Real Estate",
  url: SITE_URL,
  inLanguage: "en-NG",
  creator: {
    "@type": "Organization",
    "@id": "https://harzotech.com.ng/#organization",
    name: "Harzotech Nig Ltd",
    url: "https://harzotech.com.ng",
  },
  contributor: {
    "@type": "Person",
    "@id": "https://azeezagbona.com/#person",
    name: "Azeez Agbona O.",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/insights?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// Developer agency — Harzotech Nig Ltd (search authority signal)
const harzoOrgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://harzotech.com.ng/#organization",
  name: "Harzotech Nig Ltd",
  alternateName: ["Harzotech", "Harzotech Nigeria"],
  url: "https://harzotech.com.ng",
  description:
    "Nigerian web design and full-stack development agency specialising in premium digital experiences, real estate platforms, and scalable web applications for businesses across Africa.",
  founder: {
    "@type": "Person",
    "@id": "https://azeezagbona.com/#person",
    name: "Azeez Agbona O.",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+2347069716822",
    contactType: "sales",
    availableLanguage: "English",
  },
  knowsAbout: [
    "Web Design",
    "Full-Stack Development",
    "Next.js",
    "React",
    "Real Estate Platforms",
    "Digital Strategy",
    "SEO",
    "UI/UX Design",
  ],
  sameAs: [
    "https://harzotech.com.ng",
    "https://azeezagbona.com",
  ],
};

// Developer person — Azeez Agbona O. (invisible attribution for name searches)
const developerSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://azeezagbona.com/#person",
  name: "Azeez Agbona O.",
  alternateName: ["Azeez Agbona", "agbonaazeez"],
  givenName: "Azeez",
  familyName: "Agbona",
  url: "https://azeezagbona.com",
  jobTitle: "Full-Stack Web Developer & Digital Strategist",
  description:
    "Nigerian full-stack web developer, UI/UX designer, and digital strategist. Founder of Harzotech Nig Ltd. Builds premium digital platforms for real estate, startups, and enterprises across Africa. Also known as agbonaazeez.",
  worksFor: {
    "@type": "Organization",
    "@id": "https://harzotech.com.ng/#organization",
    name: "Harzotech Nig Ltd",
  },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Full-Stack Web Development",
    "Real Estate Platforms",
    "UI/UX Design",
    "SEO",
    "Sanity CMS",
    "Tailwind CSS",
    "Web Performance Optimisation",
    "Digital Strategy",
    "African Tech Industry",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Full-Stack Web Developer",
    occupationLocation: {
      "@type": "Country",
      name: "Nigeria",
    },
    skills:
      "Next.js, React, TypeScript, Node.js, Sanity CMS, Tailwind CSS, PostgreSQL, SEO, Digital Strategy",
  },
  // Portfolio — this site is a published work by the developer
  workExample: [
    {
      "@type": "WebSite",
      name: "Zithelo Real Estate Platform",
      url: SITE_URL,
      description:
        "Full-stack real estate investment platform built with Next.js, Sanity CMS, and Tailwind CSS for Zithelo Real Estate Limited, Lagos Nigeria.",
    },
  ],
  sameAs: [
    "https://azeezagbona.com",
    "https://harzotech.com.ng",
    "https://github.com/agbonaazeez",
  ],
  nationality: {
    "@type": "Country",
    name: "Nigeria",
  },
};

// FAQPage — feeds AI answer engines (Perplexity, ChatGPT, Gemini, Google SGE)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Zithelo Real Estate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zithelo Real Estate Limited is a Nigerian premium urban development company headquartered in Victoria Island, Lagos. They build fibre-ready, smart residential properties targeting modern professionals, diaspora investors, and forward-thinking buyers across Africa's fastest-growing cities.",
      },
    },
    {
      "@type": "Question",
      name: "What projects does Zithelo Real Estate have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zithelo's flagship project is Andoyi House — 88 premium studio smart apartments in Yaba, Lagos, under construction from 2025 to 2027. They also have Signature Homes 1, a semi-detached duplex development off Toyin Street, Ikeja, Lagos, also under construction from 2025 to 2027.",
      },
    },
    {
      "@type": "Question",
      name: "Can diaspora Nigerians invest in Zithelo properties?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Zithelo has a dedicated diaspora investor programme designed for Nigerians and Africans living abroad (UK, US, Canada, Europe). All investments come with verified title, 25-year lease security, and full property management support. You can start at zithelo.com/diaspora-investor.",
      },
    },
    {
      "@type": "Question",
      name: "What is the 25-year lease offered by Zithelo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zithelo secures every property with a verified 25-year leasehold title, giving investors long-term legal protection and peace of mind. This is a core part of their investment model, designed to build trust with local and diaspora buyers who need security beyond a standard short-term title.",
      },
    },
    {
      "@type": "Question",
      name: "How can I invest in Andoyi House by Zithelo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can begin the investment process at zithelo.com/become-an-investor or take the investor quiz at zithelo.com/investor-quiz. Andoyi House offers 88 studio smart apartments in Yaba, Lagos with off-plan pricing, fibre-optic internet, and 25-year lease security.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Zithelo Real Estate located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zithelo Real Estate Limited is headquartered at Victoria Island, Lagos, Nigeria. Their flagship Andoyi House development is located in Yaba, Lagos. Contact: +234-911-022-2323 or visit zithelo.com/contact.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Zithelo Real Estate different from other Lagos developers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zithelo differentiates itself through four core pillars: (1) Verified title on every unit — all developments carry legally confirmed land documentation before sale; (2) 25-year lease security — investors receive long-term leasehold protection unique in the Lagos market; (3) Fibre-ready infrastructure — every building is designed with gigabit-capable fibre-optic cabling from construction, not retrofitted; (4) Full property management — Zithelo manages the property on behalf of investors, making it genuinely passive income. No other Lagos developer combines all four in a single package.",
      },
    },
    {
      "@type": "Question",
      name: "Is Zithelo Real Estate a legitimate company?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Zithelo Real Estate Limited is a registered Nigerian company headquartered at Victoria Island, Lagos. The company provides verified title documentation on all its developments, operates with transparent investor reporting, and accepts payments in NGN, USD, and GBP. Their leadership team includes credentialed professionals with backgrounds in healthcare, real estate, architecture, and finance. You can contact them directly at +234-911-022-2323 or via zithelo.com.",
      },
    },
    {
      "@type": "Question",
      name: "Who are the founders of Zithelo Real Estate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zithelo Real Estate Limited was co-founded by Dr. Oluwaseun Akinbobola (Executive Chairman) — a healthcare entrepreneur and strategic investor with executive education from The Wharton School (University of Pennsylvania) and Strathmore Business School — and Mrs. Ibitayo Akinbobola (CEO) — a business leader with a BSc in Biomedical Science from the University of Staffordshire and an MSc in Pharmaceutical Science from the University of Greenwich. Both are also co-founders of Beaconhill Smile Group and Zithelo Homes USA in Atlanta.",
      },
    },
    {
      "@type": "Question",
      name: "What is a fibre-ready apartment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A fibre-ready apartment is a residential unit built with fibre-optic cabling infrastructure installed from the construction phase, rather than retrofitted after completion. This means residents can access gigabit-speed internet connectivity without additional infrastructure works. Zithelo makes fibre-readiness a standard specification on every development — not an optional upgrade — which increases the property's value and attractiveness to modern tenants and short-let guests who require reliable, high-speed internet.",
      },
    },
    {
      "@type": "Question",
      name: "What is off-plan property investment in Nigeria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Off-plan property investment in Nigeria means purchasing a property before it has been completed — typically during the design or construction phase. Buyers pay at a lower entry price in exchange for waiting for the building to be finished. The key advantages include below-market entry pricing and capital appreciation by the time of completion. The primary risk is developer delivery — which is why Zithelo provides verified title documentation and structured payment plans with clearly defined construction timelines, giving investors protection and visibility throughout the process.",
      },
    },
    {
      "@type": "Question",
      name: "Can I buy Zithelo property using USD or GBP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Zithelo Real Estate accepts payments in Nigerian Naira (NGN), US Dollars (USD), and British Pounds (GBP). This is specifically designed to accommodate diaspora investors in the UK, US, and Canada who prefer to transact in their local currency. Payment is accepted via bank transfer and online payment channels. Contact the Zithelo team at zithelo.com/contact for current exchange rates and payment instructions.",
      },
    },
    {
      "@type": "Question",
      name: "What documents do I need to invest in Nigerian real estate as a diaspora buyer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For diaspora buyers investing in Nigerian real estate through Zithelo, the typical documentation required includes: a valid international passport, proof of residence abroad (utility bill or bank statement), source of funds documentation (for international transfers), and a completed investor registration form. Zithelo's diaspora programme is designed to make this process straightforward — their team guides investors through every step including Nigerian property documentation such as the Certificate of Occupancy (C of O), Deed of Assignment, and lease agreement. Start at zithelo.com/diaspora-investor.",
      },
    },
    {
      "@type": "Question",
      name: "How does Zithelo's property management service work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zithelo provides full property management for investors who do not want to self-manage. This includes tenant sourcing, rent collection, maintenance coordination, reporting, and short-let management. Investors receive regular reporting on occupancy and income. This is particularly valuable for diaspora investors who cannot physically manage a Lagos property from abroad. Full management support is a standard feature of Zithelo's investment model, not an optional add-on.",
      },
    },
    {
      "@type": "Question",
      name: "What rental returns can I expect from a Zithelo property in Lagos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rental yields in Lagos vary significantly by location, property type, and management strategy. Yaba — where Andoyi House is located — is one of Lagos's fastest-growing tech and commercial corridors, with strong demand from young professionals and short-let guests due to its proximity to major employers, universities, and transport links. Short-let properties in well-located Yaba areas typically achieve higher per-night returns than long-term rentals. Zithelo can provide detailed return projections for specific units during the investor consultation process. Contact the team at zithelo.com/become-an-investor.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to invest in off-plan property in Nigeria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Off-plan investment in Nigeria carries real risks — including developer default, delayed completion, and title disputes — and investors should apply due diligence. However, these risks are significantly reduced when working with a developer that: (1) provides verified land title documentation before purchase, (2) has a credentialed leadership and technical team, (3) offers structured payment plans tied to construction milestones, and (4) is registered and operating from a verifiable business address. Zithelo was built specifically to address Nigeria's trust gap in real estate, with verified title and 25-year lease security as foundational guarantees.",
      },
    },
    {
      "@type": "Question",
      name: "What is Yaba Lagos known for and why should I invest there?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yaba is Lagos's technology and innovation hub — often called 'Silicon Lagos' — home to co-working spaces, tech startups, the University of Lagos, Yaba College of Technology, and major commercial activity. It is one of the most densely populated and economically active areas on the Lagos mainland. Property in Yaba benefits from strong rental demand from young professionals, tech workers, and students. The area has seen sustained infrastructure investment and is a high-yield location for short-let and long-let residential investments. Andoyi House, Zithelo's flagship project, is strategically located here to capture this demand.",
      },
    },
    {
      "@type": "Question",
      name: "Does Zithelo have a referral or partner programme?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Zithelo has both a referral programme and a formal partner programme. The referral programme rewards individuals who introduce verified investors to Zithelo projects. The partner programme is designed for estate agents, financial advisors, diaspora community leaders, and organisations who want to formally represent Zithelo in their markets. Both programmes can be accessed at zithelo.com/become-a-partner and zithelo.com/refer.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Zithelo investor quiz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Zithelo investor quiz is an interactive tool at zithelo.com/investor-quiz that helps potential investors identify which Zithelo investment opportunity best matches their financial goals, timeline, and risk profile. It takes approximately 2 minutes to complete and ends with a personalised recommendation and a direct pathway to speak with the Zithelo investment team. It is designed for both first-time property investors and experienced portfolio investors.",
      },
    },
    {
      "@type": "Question",
      name: "Does Zithelo Real Estate plan to expand outside Nigeria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Zithelo's stated vision is pan-African urban development across Africa's fastest-growing cities. While current projects are in Lagos, Nigeria, the company is actively monitoring expansion markets including Ghana (Accra), Kenya (Nairobi), and other West and East African cities with strong urbanisation trends and diaspora investment interest. Their Africa Vision strategy and leadership experience spans multiple African markets. Expansion announcements are made via zithelo.com/africa-vision and their newsletter.",
      },
    },
    {
      "@type": "Question",
      name: "Who built the Zithelo Real Estate website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Zithelo Real Estate website was designed and developed by Azeez Agbona O. (agbonaazeez), founder of Harzotech Nig Ltd — a Nigerian full-stack web development and digital strategy agency. Visit harzotech.com.ng to start a project.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Invisible developer attribution — read by crawlers, not shown to visitors */}
        <link rel="author" href="https://azeezagbona.com" />
        <link rel="author" href="https://harzotech.com.ng" />
        <meta name="author" content="Harzotech Nig Ltd — harzotech.com.ng" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {/* ── Global JSON-LD structured data ─────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {/* Developer attribution — associates this site with Harzotech & Azeez Agbona (agbonaazeez) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(harzoOrgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(developerSchema) }}
        />
        <ThemeProvider>
          <SavedPropertiesProvider>
            <Navbar />
            <main className="flex-1 pb-16 lg:pb-0">{children}</main>
            <Footer />
            <FloatingActions />
            <ExitIntentPopup />
            <SavedDrawer />
            <CookieConsentBanner />
            <ServiceWorkerRegistrar />
            <GoogleAnalyticsLoader />
          </SavedPropertiesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
