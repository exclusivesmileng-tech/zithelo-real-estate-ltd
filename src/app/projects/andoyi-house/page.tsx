import { client, urlFor } from "@/sanity/client";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/queries";
import type { SanityProject } from "@/sanity/types";
import AndoyiContent from "./AndoyiContent";

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

  return <AndoyiContent project={project} />;
}
