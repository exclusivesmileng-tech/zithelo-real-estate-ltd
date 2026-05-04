import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers — allow everything except CMS/API/offline
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/", "/offline/"],
      },
      // AI crawlers — explicitly allowed for AI SEO indexing
      {
        userAgent: "GPTBot",
        allow: ["/", "/llms.txt", "/humans.txt"],
        disallow: ["/studio/", "/api/", "/offline/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/llms.txt", "/humans.txt"],
        disallow: ["/studio/", "/api/", "/offline/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/llms.txt", "/humans.txt"],
        disallow: ["/studio/", "/api/", "/offline/"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/llms.txt", "/humans.txt"],
        disallow: ["/studio/", "/api/", "/offline/"],
      },
      {
        userAgent: "Amazonbot",
        allow: ["/", "/llms.txt"],
        disallow: ["/studio/", "/api/", "/offline/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
