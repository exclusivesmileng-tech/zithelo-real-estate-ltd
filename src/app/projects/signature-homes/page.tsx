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
    "@type": "ApartmentComplex",
    name: "Signature Homes Lagos",
    description:
      "Premium, fibre-ready residence development in Lagos by Zithelo. Verified title, structured returns, and full management support.",
    url: `${SITE_URL}/projects/signature-homes`,
    image: `${SITE_URL}/images/signature/zsh1.jpg.jpeg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    numberOfRooms: project?.units ?? undefined,
    yearBuilt: project?.year ?? undefined,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Fibre-ready broadband" },
      { "@type": "LocationFeatureSpecification", name: "Premium finishes" },
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
      <SignatureContent project={project} />
    </>
  );
}
