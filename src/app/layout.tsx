import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SavedPropertiesProvider } from "@/contexts/SavedPropertiesContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SavedDrawer from "@/components/SavedDrawer";
import DeveloperCredit from "@/components/DeveloperCredit";
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
  ],
  authors: [{ name: "Zithelo Real Estate Limited" }],
  creator: "Zithelo Real Estate Limited",
  publisher: "Zithelo Real Estate Limited",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
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
};

// JSON-LD: Organization schema (site-wide)
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zithelo Real Estate Limited",
  url: SITE_URL,
  logo: `${SITE_URL}/images/zithelo-logo-colored.png`,
  description:
    "Pan-African urban development company building premium, fibre-ready real estate for modern professionals and diaspora investors.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Victoria Island",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+234-911-022-2323",
    contactType: "customer service",
    availableLanguage: "English",
  },
  sameAs: [
    "https://instagram.com/zithelohomes",
    "https://www.linkedin.com/company/zithelo-real-estate",
    "https://x.com/zithelohomes",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zithelo Real Estate",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/insights?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        {/* Global JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <ThemeProvider>
          <SavedPropertiesProvider>
            <Navbar />
            <main className="flex-1 pb-16 lg:pb-0">{children}</main>
            <Footer />
            <FloatingActions />
            <ExitIntentPopup />
            <SavedDrawer />
            <DeveloperCredit />
            <CookieConsentBanner />
            <ServiceWorkerRegistrar />
            <GoogleAnalyticsLoader />
          </SavedPropertiesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
