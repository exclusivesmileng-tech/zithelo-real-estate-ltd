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
          urlFor(img).width(1200).url()
        ) ?? [],
        videoClips: raw.videoClips?.map((c) => ({
          label: c.label,
          src: c.src,
          thumbUrl: c.thumb ? urlFor(c.thumb).width(400).url() : "/images/andoyi/2.png",
        })) ?? [],
        stats: raw.stats,
        highlights: raw.highlights,
      }
    : null;

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: "Andoyi House",
    description:
      "Premium, fibre-ready smart apartment complex in Yaba, Lagos. Verified title, 25-year lease security, and full management support.",
    url: `${SITE_URL}/projects/andoyi-house`,
    image: `${SITE_URL}/images/andoyi/2.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Yaba",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    numberOfRooms: project?.units ?? undefined,
    yearBuilt: project?.year ?? undefined,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Fibre-ready broadband" },
      { "@type": "LocationFeatureSpecification", name: "Smart home infrastructure" },
      { "@type": "LocationFeatureSpecification", name: "Full property management" },
    ],
    offers: {
      "@type": "Offer",
      seller: { "@type": "Organization", name: "Zithelo Real Estate Limited", url: SITE_URL },
      eligibleRegion: { "@type": "Place", name: "Worldwide" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <AndoyiContent project={project} />
    </>
  );
}
