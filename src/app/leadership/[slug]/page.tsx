import type { Metadata } from "next";
import { TEAM } from "@/lib/team-data";
import TeamMemberPageClient from "./TeamMemberPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

export function generateStaticParams() {
  return TEAM.filter((m) => m.slug).map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = TEAM.find((m) => m.slug === slug);

  if (!member) return { title: "Team Member Not Found" };

  return {
    title: `${member.name} | ${member.role}`,
    description: member.tagline,
    alternates: { canonical: `/leadership/${slug}` },
    openGraph: {
      title: `${member.name} — ${member.role} | Zithelo`,
      description: member.tagline,
      images: member.photo
        ? [{ url: member.photo, width: 800, height: 800, alt: member.name }]
        : undefined,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = TEAM.find((m) => m.slug === slug);

  const personSchema = member
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${SITE_URL}/leadership/${slug}#person`,
        name: member.name,
        jobTitle: member.role,
        description: member.bio,
        url: `${SITE_URL}/leadership/${slug}`,
        ...(member.photo && {
          image: {
            "@type": "ImageObject",
            url: `${SITE_URL}${member.photo}`,
            caption: `${member.name} — ${member.role}`,
          },
        }),
        worksFor: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "Zithelo Real Estate Limited",
        },
        ...(member.credentials?.length && {
          hasCredential: member.credentials.map((c) => ({
            "@type": "EducationalOccupationalCredential",
            name: c,
          })),
        }),
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Leadership", item: `${SITE_URL}/leadership` },
            { "@type": "ListItem", position: 3, name: member.name, item: `${SITE_URL}/leadership/${slug}` },
          ],
        },
      }
    : null;

  return (
    <>
      {personSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      )}
      <TeamMemberPageClient params={params} />
    </>
  );
}
