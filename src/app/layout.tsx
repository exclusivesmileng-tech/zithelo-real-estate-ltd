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
        text: "Zithelo's flagship project is Andoyi House — 88 premium studio smart apartments in Yaba, Lagos, under construction from 2025 to 2027. They also have Signature Homes, another premium residential development in Lagos, Nigeria.",
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
        text: "Zithelo secures every property with a verified 25-year leasehold title, giving investors long-term legal protection and peace of mind. This is a core part of their investment model, designed to build trust with local and diaspora buyers.",
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
        text: "Zithelo Real Estate Limited is headquartered at Victoria Island, Lagos, Nigeria. Their flagship Andoyi House development is located in Yaba, Lagos. Contact: +234-911-022-2323.",
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
