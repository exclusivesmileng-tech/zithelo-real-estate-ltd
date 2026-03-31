import type { Metadata } from "next";
import { client, urlFor } from "@/sanity/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Projects | Premium Developments in Lagos",
  description:
    "Explore Zithelo's active developments — Andoyi House in Yaba and Signature Homes Lagos. Smart, fibre-ready apartments with verified title and 25-year lease security.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Zithelo Real Estate",
    description:
      "Smart, fibre-ready apartments with verified title and 25-year lease. Explore Andoyi House and Signature Homes.",
    images: [{ url: "/images/andoyi/2.png", width: 1200, height: 630, alt: "Andoyi House, Yaba Lagos" }],
  },
};
import type { SanityProject } from "@/sanity/types";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/PageHero";
import ProjectsHeroVector from "@/components/ProjectsHeroVector";
import { MapPin, ArrowRight } from "lucide-react";

interface Listing {
  href: string; img: string; status: string; type: string;
  title: string; location: string; year: string; units: string; desc: string;
  interiorPreviews?: string[];
}

const FALLBACK_LISTINGS: Listing[] = [
  {
    href: "/projects/andoyi-house",
    img: "/images/andoyi/2.png",
    status: "Under Construction",
    type: "Smart Studio Apartments",
    title: "Andoyi House",
    location: "Yaba, Lagos",
    year: "2025\u20132027",
    units: "88 Units",
    desc: "Modern studio apartments in the heart of Lagos\u2019 tech corridor \u2014 fully fibre-ready and structured for strong rental returns.",
    interiorPreviews: [
      "/images/andoyi/interior1.jpeg",
      "/images/andoyi/interior2.jpeg",
      "/images/andoyi/interior3.jpeg",
    ],
  },
  {
    href: "/projects/signature-homes",
    img: "/images/signature/zsh1.jpg.jpeg",
    status: "Under Construction",
    type: "Semi-Detached Duplexes",
    title: "Zithelo Signature Homes 1",
    location: "Ikeja, Lagos",
    year: "2025\u20132027",
    units: "",
    desc: "Spacious semi-detached duplexes off Toyin Street, Ikeja \u2014 designed for diaspora returnees and quality-focused professionals.",
  },
];

export const revalidate = 60;

export default async function ProjectsPage() {
  const data: SanityProject[] | null = await client
    .fetch(ALL_PROJECTS_QUERY)
    .catch(() => null);

  const listings: Listing[] = data?.length
    ? data.map((p) => ({
        href: `/projects/${p.slug?.current ?? ""}`,
        img: p.heroImage ? urlFor(p.heroImage).width(800).url() : "/images/andoyi/2.png",
        status: p.status ?? "Active",
        type: p.type ?? "",
        title: p.title,
        location: p.location ?? "",
        year: p.year ?? "",
        units: p.units ?? "",
        desc: p.shortDesc ?? "",
      }))
    : FALLBACK_LISTINGS;

  return (
    <>
      <PageHero
        title="Our Projects"
        subtitle="Premium urban developments designed for modern professionals and investors."
        image="/images/andoyi/2.png"
        breadcrumb="Portfolio"
        vector={<ProjectsHeroVector />}
      />

      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto">

          <AnimatedSection>
            <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-body font-semibold mb-2">Portfolio</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-16">
              All Developments
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {listings.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.15}>
                <Link href={p.href} className="group block">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-sm aspect-[4/3]">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Status */}
                    <div className="absolute top-4 left-4">
                      <span className="gold-gradient px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase font-body font-semibold text-primary-foreground rounded-sm">
                        {p.status}
                      </span>
                    </div>

                    {/* Hover CTA */}
                    <div className="absolute bottom-6 right-6 flex items-center gap-2 text-white text-xs tracking-[0.15em] uppercase font-body font-semibold translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      View Project <ArrowRight size={13} />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="mt-5 pb-1">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-body font-semibold">{p.type}</p>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-1 group-hover:text-primary transition-colors duration-300">
                      {p.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground font-body">
                      <span className="flex items-center gap-1"><MapPin size={12} className="text-primary" />{p.location}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span>{p.year}</span>
                      {p.units && <><span className="w-1 h-1 rounded-full bg-border" /><span>{p.units}</span></>}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">{p.desc}</p>

                    {p.interiorPreviews && p.interiorPreviews.length > 0 && (
                      <div className="mt-5 pt-5 border-t border-border/50">
                        <p className="text-[10px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-3">Interior Preview</p>
                        <div className="flex gap-2">
                          <div className="flex-1 h-[76px] overflow-hidden rounded-sm relative group/p">
                            <img src={p.interiorPreviews[0]} alt="Interior" className="w-full h-full object-cover group-hover/p:scale-110 transition-transform duration-500" />
                          </div>
                          {p.interiorPreviews.slice(1).map((src, idx) => (
                            <div key={idx} className="w-[76px] h-[76px] overflow-hidden rounded-sm flex-shrink-0 relative group/p">
                              <img src={src} alt={`Interior ${idx + 2}`} className="w-full h-full object-cover group-hover/p:scale-110 transition-transform duration-500" />
                            </div>
                          ))}
                          <div className="flex flex-col items-center justify-center px-2 text-center">
                            <span className="text-[10px] tracking-[0.15em] uppercase text-primary font-body font-semibold leading-tight">+2<br />more</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
