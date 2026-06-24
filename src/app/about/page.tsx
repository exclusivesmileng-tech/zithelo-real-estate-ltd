import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

export const metadata: Metadata = {
  title: "About | Africa's Premium Urban Development Company",
  description:
    "Zithelo Real Estate is a pan-African urban development company building premium, fibre-ready apartments for modern professionals and diaspora investors. Verified title. 25-year lease.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Zithelo Real Estate | Pan-African Urban Development",
    description:
      "Building premium, fibre-ready real estate across Africa's fastest-growing cities for modern professionals and diaspora investors.",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about`,
  name: "About Zithelo Real Estate Limited",
  url: `${SITE_URL}/about`,
  description:
    "Learn about Zithelo Real Estate Limited — a pan-African urban development company building premium, fibre-ready apartments for modern professionals and diaspora investors across Africa's fastest-growing cities.",
  mainEntity: { "@id": `${SITE_URL}/#organization` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutPageClient />
    </>
  );
}
