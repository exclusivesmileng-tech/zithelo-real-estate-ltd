import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { ALL_INSIGHTS_QUERY, ALL_TEAM_QUERY } from "@/sanity/queries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  { url: `${SITE_URL}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_URL}/projects/andoyi-house`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/projects/signature-homes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/become-an-investor`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/diaspora-investor`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/become-a-partner`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/why-zithelo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${SITE_URL}/africa-vision`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${SITE_URL}/insights`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  { url: `${SITE_URL}/leadership`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_URL}/leadership/board`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_URL}/leadership/management`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_URL}/partnership`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  { url: `${SITE_URL}/refer`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE_URL}/terms-of-service`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE_URL}/legal`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic insight slugs from Sanity
  const insights: { slug?: { current: string }; date?: string }[] = await client
    .fetch(ALL_INSIGHTS_QUERY)
    .catch(() => []);

  const insightRoutes: MetadataRoute.Sitemap = insights
    .filter((a) => a.slug?.current)
    .map((a) => ({
      url: `${SITE_URL}/insights/${a.slug!.current}`,
      lastModified: a.date ? new Date(a.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  // Fetch dynamic leadership profile slugs from Sanity
  const team: { slug?: { current: string } }[] = await client
    .fetch(ALL_TEAM_QUERY)
    .catch(() => []);

  const teamRoutes: MetadataRoute.Sitemap = team
    .filter((m) => m.slug?.current)
    .map((m) => ({
      url: `${SITE_URL}/leadership/${m.slug!.current}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }));

  return [...staticRoutes, ...insightRoutes, ...teamRoutes];
}
