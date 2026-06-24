import type { Metadata } from "next";
import { client, urlFor } from "@/sanity/client";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/queries";
import type { SanityProject } from "@/sanity/types";
import SignatureContent from "./SignatureContent";

export const metadata: Metadata = {
  title: "Signature Homes Lagos | Premium Residences by Zithelo",
  description:
    "Signature Homes Lagos is Zithelo's flagship premium residence development. Fibre-ready, managed apartments with verified title and structured investment returns.",
  alternates: { canonical: "/projects/signature-homes" },
  openGraph: {
    title: "Signature Homes Lagos | Zithelo Real Estate",
    description:
      "Premium, fibre-ready residences in Lagos. Verified title. Structured returns. Managed for you.",
    images: [{ url: "/images/signature/zsh1.jpg.jpeg", width: 1200, height: 630, alt: "Signature Homes Lagos" }],
  },
};

export const revalidate = 60;

export default async function SignatureHomesPage() {
  const raw: SanityProject | null = await client
    .fetch(PROJECT_BY_SLUG_QUERY, { slug: "signature-homes" })
    .catch(() => null);

  const project = raw
    ? {
        title: raw.title,
        type: raw.type,
        location: raw.location,
        year: raw.year,
        units: raw.units,
        status: raw.status,
        shortDesc: raw.shortDesc,
        galleryUrls: raw.gallery?.map((img) =>
          urlFor(img).width(1200).url()
        ) ?? [],
        stats: raw.stats,
        highlights: raw.highlights,
      }
    : null;

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    "@id": `${SITE_URL}/projects/signature-homes#property`,
    name: "Zithelo Signature Homes 1",
    alternateName: ["Signature Homes Lagos", "Zithelo Signature Homes Ikeja"],
    description:
      "Zithelo Signature Homes 1 — premium semi-detached duplexes off Toyin Street, Ikeja, Lagos. Designed for diaspora returnees and quality-focused professionals. Fibre-ready infrastructure, verified title, structured returns, and full property management support.",
    url: `${SITE_URL}/projects/signature-homes`,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/signature/zsh1.jpg.jpeg`,
      caption: "Zithelo Signature Homes 1 — Premium Duplexes, Ikeja, Lagos",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Off Toyin Street",
      addressLocality: "Ikeja",
      addressRegion: "Lagos State",
      addressCountry: "NG",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Fibre-ready broadband infrastructure", value: true },
      { "@type": "LocationFeatureSpecification", name: "Premium finishes and fittings", value: true },
      { "@type": "LocationFeatureSpecification", name: "Full property management service", value: true },
      { "@type": "LocationFeatureSpecification", name: "Verified title documentation", value: true },
      { "@type": "LocationFeatureSpecification", name: "Structured investor returns", value: true },
      { "@type": "LocationFeatureSpecification", name: "Diaspora-friendly investment process", value: true },
    ],
    containedInPlace: {
      "@type": "Place",
      name: "Ikeja, Lagos",
      description: "Ikeja is Lagos State capital and a major commercial and residential hub, with excellent infrastructure, transport links, and proximity to Murtala Muhammed International Airport.",
    },
    offers: {
      "@type": "Offer",
      name: "Signature Homes 1 — Premium Duplex Investment",
      description: "Off-plan semi-detached duplex investment in Ikeja, Lagos. Verified title, structured returns, full management. Payments accepted in NGN, USD, and GBP.",
      seller: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Zithelo Real Estate Limited",
        url: SITE_URL,
      },
      eligibleRegion: [
        { "@type": "Country", name: "Nigeria" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
      ],
      priceCurrency: ["NGN", "USD", "GBP"],
      availability: "https://schema.org/InStock",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
        { "@type": "ListItem", position: 3, name: "Signature Homes", item: `${SITE_URL}/projects/signature-homes` },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <SignatureContent project={project} />
    </>
  );
}
