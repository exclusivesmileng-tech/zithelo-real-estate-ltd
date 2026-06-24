import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Invest in Victoria Island Lagos | Property Guide 2026 | Zithelo",
  description:
    "Victoria Island Lagos property investment guide 2026 — rental yields, tenant profile, price data, pros and cons for investors considering Lagos' premier business district.",
  alternates: { canonical: "/invest/victoria-island" },
  openGraph: {
    title: "Invest in Victoria Island Lagos | Zithelo Real Estate",
    description: "The definitive guide to investing in Victoria Island, Lagos — Nigeria's premier business and diplomatic address.",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

const viSchema = {
  "@context": "https://schema.org",
  "@type": ["WebPage", "Article"],
  "@id": `${SITE_URL}/invest/victoria-island`,
  headline: "Invest in Victoria Island Lagos — Property Investment Guide 2026",
  name: "Victoria Island Lagos Property Investment Guide 2026",
  url: `${SITE_URL}/invest/victoria-island`,
  description:
    "Investment guide for Victoria Island, Lagos — Nigeria's premier business district. Rental yields, tenant profile, price data, and how to invest from abroad.",
  author: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  datePublished: "2026-06-01",
  inLanguage: "en-NG",
  articleSection: "Lagos Property Investment",
  about: {
    "@type": "Place",
    name: "Victoria Island, Lagos",
    description: "Victoria Island is Lagos' premier commercial and diplomatic district, home to multinational companies, embassies, luxury hotels, and Nigeria's most prestigious business addresses.",
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
      { "@type": "ListItem", position: 3, name: "Victoria Island", item: `${SITE_URL}/invest/victoria-island` },
    ],
  },
};

const STATS = [
  { figure: "5–7%",    label: "Gross Rental Yield",       sub: "Long-let, VI 2026" },
  { figure: "5–8%",    label: "Annual Price Appreciation", sub: "5-year average" },
  { figure: "$80k+",   label: "Typical Entry Price",       sub: "Studio apartment" },
  { figure: "9/10",    label: "Infrastructure Score",      sub: "Best in Lagos" },
];

export default function InvestVictoriaIslandPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(viSchema) }} />
      <PageHero
        title="Invest in Victoria"
        titleAccent="Island, Lagos"
        subtitle="Lagos' premier business and diplomatic address — Nigeria's most prestigious investment location with the strongest institutional tenant base."
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
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Why Victoria Island?</h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-5">
              Victoria Island (VI) is Lagos' most prestigious real estate market — home to the headquarters of multinationals, embassies, luxury hotels, and Nigeria's top financial institutions. Property here is considered the most liquid and institutionally safe in Nigeria.
            </p>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-10">
              VI is not a high-yield market — gross yields of 5–7% are typical — but the tenant quality is unmatched. Corporate executives, diplomats, and NGO workers form a low-default, high-income tenant pool that maintains values through economic downturns.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">Investment Case</h3>
                <ul className="space-y-3">
                  {[
                    "Most prestigious commercial address in Lagos",
                    "Institutional-quality tenants — embassies, multinationals",
                    "Most liquid property market in Nigeria",
                    "Premium pricing reflects scarcity of land",
                    "Strong USD-denominated rental demand from expats",
                    "Safe store of value through economic cycles",
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
                    { label: "Gross Long-Let Yield",      value: "5–7%" },
                    { label: "Annual Appreciation",        value: "5–8%" },
                    { label: "Studio Entry Price",          value: "₦120M–₦300M" },
                    { label: "1-Bed Apartment Price",       value: "₦200M–₦500M+" },
                    { label: "Typical Tenant",              value: "Corporate / Embassy" },
                    { label: "Infrastructure Rating",       value: "9/10" },
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
            <div className="border border-border rounded-sm p-6 mb-12">
              <p className="text-[10px] tracking-[0.18em] uppercase text-primary font-body font-bold mb-3">VI vs Yaba — Which Is Better?</p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Victoria Island is a <strong className="text-foreground">safe store of value</strong> with institutional-grade tenants. Yaba is a <strong className="text-foreground">growth play</strong> with higher yield percentage and stronger appreciation potential at a lower entry price. For diaspora investors maximising income return per dollar invested, Yaba (Andoyi House) currently offers better risk-adjusted returns. For ultra-premium capital preservation, VI remains Lagos' premier choice.
              </p>
              <Link href="/compare/lagos-investment-areas" className="inline-flex items-center gap-2 mt-4 text-sm font-body text-primary hover:underline">
                See Full Area Comparison <ArrowRight size={12} />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-[hsl(var(--charcoal))] rounded-sm p-8">
              <div className="relative z-10">
                <p className="text-[11px] tracking-[0.22em] uppercase text-primary font-body font-bold mb-3">Interested in Lagos Investment?</p>
                <h3 className="font-display text-xl font-bold text-white mb-3">Explore Zithelo's Current Projects</h3>
                <p className="font-body text-sm text-white/60 mb-6">All Zithelo projects feature verified C of O title, 25-year lease, multi-currency payment, and full management.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/projects" className="group inline-flex items-center gap-2 gold-gradient text-primary-foreground px-6 py-3 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-sm hover:opacity-90 transition-opacity">
                    View All Projects <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link href="/contact" className="group inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-sm hover:border-primary/40 transition-colors">
                    Speak to an Adviser <ArrowRight size={14} />
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
