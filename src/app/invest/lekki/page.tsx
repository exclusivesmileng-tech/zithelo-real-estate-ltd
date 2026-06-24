import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Invest in Lekki Lagos | Property Investment Guide 2026 | Zithelo",
  description:
    "Lekki Lagos property investment guide 2026 — rental yields, Lekki Free Trade Zone impact, Deepwater Port catalyst, tenant profile, and full data for investors.",
  alternates: { canonical: "/invest/lekki" },
  openGraph: {
    title: "Invest in Lekki Lagos | Zithelo Real Estate",
    description: "Lekki is Lagos' 10-year growth corridor — Deepwater Port, Free Trade Zone, and eastward city expansion make it a compelling 2026 investment.",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

const lekkiSchema = {
  "@context": "https://schema.org",
  "@type": ["WebPage", "Article"],
  "@id": `${SITE_URL}/invest/lekki`,
  headline: "Invest in Lekki Lagos — Property Investment Guide 2026",
  name: "Lekki Lagos Property Investment Guide 2026",
  url: `${SITE_URL}/invest/lekki`,
  description:
    "Investment guide for Lekki, Lagos — one of Nigeria's fastest-growing real estate corridors. Rental yield data, Lekki Free Trade Zone analysis, Deepwater Port impact, and how to invest from abroad.",
  author: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  datePublished: "2026-06-01",
  inLanguage: "en-NG",
  articleSection: "Lagos Property Investment",
  about: {
    "@type": "Place",
    name: "Lekki, Lagos",
    description: "Lekki is a rapidly growing coastal district of Lagos, extending along the Lekki-Epe Expressway. Home to the Lekki Free Trade Zone, the planned Lekki Deepwater Port, and a growing premium residential and commercial corridor.",
    containedInPlace: {
      "@type": "City",
      name: "Lagos",
      containedInPlace: { "@type": "State", name: "Lagos State", containedInPlace: { "@type": "Country", name: "Nigeria" } },
    },
  },
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2", "h3"] },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Invest", item: `${SITE_URL}/invest` },
      { "@type": "ListItem", position: 3, name: "Lekki", item: `${SITE_URL}/invest/lekki` },
    ],
  },
};

const STATS = [
  { figure: "6–8%",    label: "Gross Rental Yield",       sub: "Long-let, Lekki 2026" },
  { figure: "6–9%",    label: "Annual Appreciation",       sub: "Driven by FTZ growth" },
  { figure: "$50k+",   label: "Entry Price",               sub: "Studio / 1-bed" },
  { figure: "8/10",    label: "Growth Score",              sub: "10-year outlook" },
];

const CATALYSTS = [
  {
    title: "Lekki Free Trade Zone (LFTZ)",
    body: "The 165km² Lekki Free Trade Zone is one of the largest special economic zones in Africa. It houses refineries, manufacturing facilities, and industrial operators — generating sustained demand for executive and mid-range accommodation in Lekki.",
  },
  {
    title: "Lekki Deepwater Port",
    body: "The $1.5 billion Lekki Deepwater Port is one of Nigeria's largest infrastructure investments. When fully operational, it will become West Africa's largest container port, generating thousands of jobs and driving residential demand throughout the corridor.",
  },
  {
    title: "Eastward City Expansion",
    body: "Lagos is expanding eastward along the Lekki-Epe Expressway. As the city grows, areas in Lekki Phase 1 and 2 that are currently 20 minutes from VI will become central. Early investors in this corridor have historically achieved the strongest appreciation.",
  },
  {
    title: "Diaspora Returnee Demand",
    body: "Lekki is the most popular destination for Nigerians returning from the UK, US, and Canada. The neighbourhood offers space (larger plots, gardens) unavailable on Lagos Island, proximity to international schools, and a community of expatriates and returnees.",
  },
];

export default function InvestLekkiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lekkiSchema) }} />
      <PageHero
        title="Invest in Lekki,"
        titleAccent="Lagos"
        subtitle="Lagos' coastal growth corridor — Lekki Free Trade Zone, the Deepwater Port, and eastward city expansion make Lekki the most compelling 10-year Lagos investment."
        image="/images/about-hero.jpg"
        breadcrumb="Invest"
      />

      <section className="bg-[hsl(var(--charcoal))] py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-black gold-gradient-text">{s.figure}</p>
                <p className="mt-1 text-sm font-display font-bold text-white">{s.label}</p>
                <p className="mt-0.5 text-[11px] text-white/45 font-body">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[960px] mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">The Lekki Investment Case</h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-5">
              Lekki is Lagos' most compelling long-term investment corridor. Unlike Yaba (immediate yield) or Victoria Island (prestige and stability), Lekki is fundamentally an infrastructure-driven appreciation story. Three massive catalysts are simultaneously driving demand growth along the Lekki-Epe corridor.
            </p>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-10">
              For investors with a 7–15 year horizon, Lekki properties purchased at today's prices could offer among the strongest total returns of any property market in West Africa.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h3 className="font-display text-xl font-bold text-foreground mb-6">Growth Catalysts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {CATALYSTS.map((c, i) => (
                <div key={c.title} className="border border-border rounded-sm p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 gold-gradient rounded-sm flex items-center justify-center shrink-0">
                      <span className="font-display font-black text-xs text-primary-foreground">{i + 1}</span>
                    </div>
                    <h4 className="font-display font-bold text-base text-foreground">{c.title}</h4>
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">Investment Pros</h3>
                <ul className="space-y-3">
                  {[
                    "Deepwater Port catalyst — generational infrastructure",
                    "LFTZ driving sustained mid-market rental demand",
                    "Diaspora returnee hub — high-quality tenant pool",
                    "Space and lifestyle appeal unavailable on Lagos Island",
                    "International schools and amenities driving premium",
                    "Land values compounding as city expands eastward",
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <Check size={14} className="text-primary shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-muted-foreground leading-snug">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">Market Data (2026)</h3>
                <div className="space-y-3">
                  {[
                    { label: "Gross Long-Let Yield",  value: "6–8%" },
                    { label: "Annual Appreciation",    value: "6–9%" },
                    { label: "Entry Price (Studio)",    value: "₦50M–₦120M" },
                    { label: "Entry Price (2-Bed)",     value: "₦100M–₦250M" },
                    { label: "Primary Tenant",          value: "Families / Returnees" },
                    { label: "Infrastructure Rating",   value: "7/10" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between border-b border-border pb-2">
                      <span className="font-body text-sm text-muted-foreground">{row.label}</span>
                      <span className="font-body font-semibold text-foreground">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-[hsl(var(--charcoal))] rounded-sm p-8">
              <div className="relative z-10">
                <p className="text-[11px] tracking-[0.22em] uppercase text-primary font-body font-bold mb-3">Invest with Zithelo</p>
                <h3 className="font-display text-xl font-bold text-white mb-3">Current Projects Accepting Investment</h3>
                <p className="font-body text-sm text-white/60 mb-6">Verified C of O title. 25-year lease. Multi-currency payment. Full management. Contact us to discuss Lekki pipeline projects.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/projects" className="group inline-flex items-center gap-2 gold-gradient text-primary-foreground px-6 py-3 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-sm hover:opacity-90 transition-opacity">
                    View Projects <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link href="/compare/lagos-investment-areas" className="group inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-sm hover:border-primary/40 transition-colors">
                    Compare All Areas <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
