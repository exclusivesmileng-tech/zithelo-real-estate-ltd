import type { Metadata } from "next";
import { TEAM } from "@/lib/team-data";
import TeamMemberPageClient from "./TeamMemberPageClient";

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

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <TeamMemberPageClient params={params} />;
}
