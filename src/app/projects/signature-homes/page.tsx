import { client, urlFor } from "@/sanity/client";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/queries";
import type { SanityProject } from "@/sanity/types";
import SignatureContent from "./SignatureContent";

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

  return <SignatureContent project={project} />;
}
