import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";

export const metadata: Metadata = {
  title: "Insights | Real Estate Investment Articles & Guides",
  description:
    "Expert insights on real estate investment in Nigeria and Africa — market trends, diaspora guides, project updates, and investment strategy from Zithelo.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights | Zithelo Real Estate",
    description:
      "Market trends, investor guides, and project updates from Zithelo Real Estate.",
  },
};
import { ALL_INSIGHTS_QUERY } from "@/sanity/queries";
import type { SanityInsight } from "@/sanity/types";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCard from "@/components/AnimatedCard";
import PageHero from "@/components/PageHero";
import InsightsHeroVector from "@/components/heroes/InsightsHeroVector";
import { ArrowRight, BookOpen } from "lucide-react";

const FALLBACK_ARTICLES: SanityInsight[] = [
  { _id: "1", title: "Zithelo Breaks Ground on Gateway District in Accra", category: "Project Update",    date: "2026-03-01", excerpt: "The 12-hectare mixed-use development will transform Accra's eastern corridor into a modern urban centre." },
  { _id: "2", title: "Africa's Urban Future: A Development Perspective",   category: "Thought Leadership", date: "2026-02-01", excerpt: "Our CEO shares insights on the opportunities and challenges facing African real estate in the next decade." },
  { _id: "3", title: "Meridian Tower Achieves LEED Gold Certification",    category: "Milestone",          date: "2026-01-01", excerpt: "Nairobi's newest commercial tower sets a new standard for sustainable building in East Africa." },
  { _id: "4", title: "Partnership Announced with African Development Bank", category: "Partnership",        date: "2025-12-01", excerpt: "Strategic collaboration to finance infrastructure-linked residential developments across West Africa." },
  { _id: "5", title: "The Azure Residences: Construction Progress Update",  category: "Project Update",    date: "2025-11-01", excerpt: "Lagos' most anticipated luxury development reaches structural completion milestone ahead of schedule." },
];

const categoryColor: Record<string, string> = {
  "Project Update":    "bg-primary/10 text-primary border-primary/20",
  "Thought Leadership":"bg-[hsl(var(--charcoal))] text-white border-transparent",
  "Milestone":         "gold-gradient text-primary-foreground border-transparent",
  "Partnership":       "bg-muted text-foreground border-border",
};

function formatDate(iso: string): string {
  try { return new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }); }
  catch { return iso; }
}

export const revalidate = 60;

export default async function InsightsPage() {
  const data: SanityInsight[] | null = await client.fetch(ALL_INSIGHTS_QUERY).catch(() => null);
  const articles = data?.length ? data : FALLBACK_ARTICLES;

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      <PageHero
        title="Insights &"
        titleAccent="Business Growth"
        subtitle="News, updates, and thought leadership from Zithelo's development team."
        image="/images/about-hero.jpg"
        breadcrumb="Knowledge Hub"
        vector={<InsightsHeroVector />}
      />

      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto">

          {/* ── Featured article ── */}
          {featured && (
            <AnimatedSection>
              <Link href={featured.slug?.current ? `/insights/${featured.slug.current}` : "#"}>
                <div className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-sm overflow-hidden border border-border hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 mb-16">
                  {/* Left — dark content panel */}
                  <div className="relative bg-[hsl(var(--charcoal))] p-10 md:p-14 flex flex-col justify-between overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                      style={{ backgroundImage: "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
                    <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-10 pointer-events-none"
                      style={{ background: "radial-gradient(circle, hsl(43 81% 61%) 0%, transparent 70%)" }} />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-8">
                        <span className={`text-[9px] tracking-[0.18em] uppercase font-body font-bold px-3 py-1.5 rounded-sm border ${categoryColor[featured.category ?? ""] ?? categoryColor["Partnership"]}`}>
                          {featured.category}
                        </span>
                        <span className="text-[10px] text-white/40 font-body">{formatDate(featured.date ?? "")}</span>
                      </div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-5 group-hover:text-primary transition-colors duration-300">
                        {featured.title}
                      </h2>
                      <p className="text-white/60 font-body text-base leading-relaxed">{featured.excerpt}</p>
                    </div>
                    <div className="relative z-10 mt-10 inline-flex items-center gap-2 text-sm font-body font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                      Read Article <ArrowRight size={14} />
                    </div>
                  </div>
                  {/* Right — gold accent panel */}
                  <div className="gold-gradient flex items-center justify-center p-14 min-h-[240px] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
                      style={{ backgroundImage: "radial-gradient(hsl(17 13% 12%) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    <div className="relative z-10 text-center">
                      <BookOpen size={48} className="text-primary-foreground/40 mx-auto mb-4" />
                      <p className="font-display text-4xl font-black text-primary-foreground/20 select-none">Featured</p>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          )}

          {/* ── Section header ── */}
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-2">Latest</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  All <span className="gold-gradient-text">Insights</span>
                </h2>
              </div>
              <span className="text-sm text-muted-foreground font-body">{articles.length} articles</span>
            </div>
          </AnimatedSection>

          {/* ── Article grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {rest.map((article, i) => (
              <AnimatedCard key={article._id} index={i}>
                <Link href={article.slug?.current ? `/insights/${article.slug.current}` : "#"} className="group block h-full">
                  <div className="h-full bg-card border border-border rounded-sm p-7 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-400 flex flex-col overflow-hidden relative">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category + date */}
                    <div className="flex items-center justify-between mb-5">
                      <span className={`text-[9px] tracking-[0.18em] uppercase font-body font-bold px-2.5 py-1 rounded-sm border ${categoryColor[article.category ?? ""] ?? categoryColor["Partnership"]}`}>
                        {article.category}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-body">{formatDate(article.date ?? "")}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors duration-300 flex-1">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase font-body font-semibold text-muted-foreground group-hover:text-primary transition-colors duration-300">
                      Read More
                      <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </AnimatedCard>
            ))}
          </div>

          {/* ── Divider number row ── */}
          <AnimatedSection>
            <div className="border-t border-border pt-8 flex items-center justify-between">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-body">
                Showing {articles.length} of {articles.length} articles
              </p>
              <div className="flex items-center gap-2">
                {articles.map((_, i) => (
                  <div key={i} className={`rounded-full transition-all ${i === 0 ? "w-6 h-1.5 gold-gradient" : "w-1.5 h-1.5 bg-border"}`} />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Newsletter / stay updated CTA ── */}
      <section className="section-padding bg-card">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection>
            <div className="bg-[hsl(var(--charcoal))] rounded-sm p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, hsl(43 81% 61%) 0%, transparent 70%)" }} />
              <div className="relative z-10">
                <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-3">Stay Informed</p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
                  Get Zithelo Insights<br />
                  <span className="gold-gradient-text">Delivered to You.</span>
                </h3>
                <p className="mt-3 text-white/55 font-body text-sm max-w-sm leading-relaxed">
                  Development updates, investment opportunities, and market intelligence — direct to your inbox.
                </p>
              </div>
              <div className="relative z-10 shrink-0 w-full md:w-auto">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 gold-gradient text-primary-foreground px-8 py-4 font-display font-bold text-sm tracking-[0.12em] uppercase rounded-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 w-full md:w-auto justify-center"
                >
                  Get in Touch
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
