import type { Metadata } from "next";
import { client, urlFor } from "@/sanity/client";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/queries";
import type { SanityProject } from "@/sanity/types";
import AndoyiContent from "./AndoyiContent";

export const metadata: Metadata = {
  title: "Andoyi House | Premium Smart Apartments in Yaba, Lagos",
  description:
    "Andoyi House is a premium, fibre-ready smart apartment complex in Yaba, Lagos. Verified title, 25-year lease, full management support. Ideal for diaspora and local investors.",
  alternates: { canonical: "/projects/andoyi-house" },
  openGraph: {
    title: "Andoyi House | Smart Apartments by Zithelo, Yaba Lagos",
    description:
      "Premium smart apartments in Yaba, Lagos. Verified title. 25-year lease. Managed for you.",
    images: [{ url: "/images/andoyi/2.png", width: 1200, height: 630, alt: "Andoyi House — Yaba Lagos" }],
  },
};

export const revalidate = 60;

export default async function AndoyiHousePage() {
  const raw: SanityProject | null = await client
    .fetch(PROJECT_BY_SLUG_QUERY, { slug: "andoyi-house" })
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
        leaseNote: raw.leaseNote,
        heroVideoUrl: raw.heroVideo ?? undefined,
        galleryUrls: raw.gallery?.map((img) =>
          urlFor(img).width(1200).auto("format").quality(75).url()
        ) ?? [],
        videoClips: raw.videoClips?.map((c) => ({
          label: c.label,
          src: c.src,
          thumbUrl: c.thumb ? urlFor(c.thumb).width(400).auto("format").quality(75).url() : "/images/andoyi/thumb-2.jpg",
        })) ?? [],
        stats: raw.stats,
        highlights: raw.highlights,
      }
    : null;

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

  const videoSchemas = project?.videoClips?.length
    ? project.videoClips.map((clip, i) => ({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "@id": `${SITE_URL}/projects/andoyi-house#video-${i + 1}`,
        name: clip.label ?? `Andoyi House — Video ${i + 1}`,
        description: `Video walkthrough of Andoyi House, 88 premium smart studio apartments in Yaba, Lagos. ${clip.label ?? ""}`.trim(),
        thumbnailUrl: clip.thumbUrl,
        contentUrl: clip.src,
        uploadDate: "2024-01-01",
        publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Zithelo Real Estate Limited" },
      }))
    : null;

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "@id": `${SITE_URL}/projects/andoyi-house#property`,
    name: "Andoyi House",
    alternateName: "Andoyi House Yaba Lagos",
    description:
      "88 premium, fibre-ready smart studio apartments in Yaba, Lagos — Africa's technology corridor. Verified Certificate of Occupancy title, 25-year lease security, and full property management support. Ideal for diaspora investors and modern professionals seeking passive income from Lagos real estate.",
    url: `${SITE_URL}/projects/andoyi-house`,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/andoyi/2.png`,
      caption: "Andoyi House — Premium Smart Apartments, Yaba, Lagos",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Yaba",
      addressLocality: "Lagos",
      addressRegion: "Lagos State",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.5095,
      longitude: 3.3711,
    },
    numberOfRooms: 88,
    petsAllowed: false,
    starRating: { "@type": "Rating", ratingValue: 5 },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Fibre-optic broadband infrastructure", value: true },
      { "@type": "LocationFeatureSpecification", name: "Smart home infrastructure", value: true },
      { "@type": "LocationFeatureSpecification", name: "Full property management service", value: true },
      { "@type": "LocationFeatureSpecification", name: "Verified Certificate of Occupancy title", value: true },
      { "@type": "LocationFeatureSpecification", name: "25-year lease security", value: true },
      { "@type": "LocationFeatureSpecification", name: "Off-plan investment pricing", value: true },
      { "@type": "LocationFeatureSpecification", name: "Short-let and long-let rental strategy", value: true },
    ],
    containedInPlace: {
      "@type": "Place",
      name: "Yaba, Lagos — Silicon Lagos",
      description: "Yaba is Lagos's technology and innovation hub, home to major tech companies, universities, and co-working spaces. Known as 'Silicon Lagos'.",
    },
    offers: {
      "@type": "Offer",
      name: "Andoyi House — Off-Plan Studio Apartment Investment",
      description: "Off-plan studio apartment investment with verified title, 25-year lease, and full management. Payments accepted in NGN, USD, and GBP.",
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
        { "@type": "ListItem", position: 3, name: "Andoyi House", item: `${SITE_URL}/projects/andoyi-house` },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      {videoSchemas?.map((vs, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(vs) }}
        />
      ))}
      <AndoyiContent project={project} />
    </>
  );
}
