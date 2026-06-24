import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Invest in Yaba Lagos | Property Investment Guide 2026 | Zithelo",
  description:
    "Why Yaba Lagos (Silicon Lagos) is the best property investment in Nigeria 2026. Rental yields, tenant profile, infrastructure, and Zithelo's Andoyi House explained.",
  keywords: [
    "invest in yaba lagos",
    "yaba lagos property investment",
    "yaba real estate",
    "silicon lagos investment",
    "yaba apartments for sale",
    "property investment lagos 2026",
  ],
  alternates: { canonical: "/invest/yaba-lagos" },
  openGraph: {
    title: "Invest in Yaba Lagos — Silicon Lagos Property Guide | Zithelo",
    description: "Yaba offers Lagos's best rental yield and highest growth potential 2025–2030. Zithelo's Andoyi House is the flagship investment.",
    images: [{ url: "/images/andoyi/2.png", width: 1200, height: 630, alt: "Andoyi House — Yaba Lagos Investment" }],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

const yabaSchema = {
  "@context": "https://schema.org",
  "@type": ["WebPage", "Article"],
  "@id": `${SITE_URL}/invest/yaba-lagos`,
  headline: "Invest in Yaba Lagos — The Complete Investment Guide 2026",
  name: "Invest in Yaba Lagos | Property Investment Guide 2026",
  url: `${SITE_URL}/invest/yaba-lagos`,
  description:
    "Why Yaba, Lagos (Silicon Lagos) is the best area to invest in Nigerian real estate in 2026. Rental yield data, tenant profiles, infrastructure, and Zithelo's Andoyi House.",
  author: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  datePublished: "2026-06-01",
  inLanguage: "en-NG",
  articleSection: "Lagos Property Investment",
  about: {
    "@type": "Place",
    name: "Yaba, Lagos",
    alternateName: "Silicon Lagos",
    description: "Yaba is Lagos' technology and innovation district, home to Nigeria's leading tech companies, universities, and co-working spaces. Known internationally as 'Silicon Lagos.'",
    geo: { "@type": "GeoCoordinates", latitude: 6.5095, longitude: 3.3711 },
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
      { "@type": "ListItem", position: 3, name: "Yaba Lagos", item: `${SITE_URL}/invest/yaba-lagos` },
    ],
  },
};

const STATS = [
  { figure: "7–10%",    label: "Gross Rental Yield",       sub: "Short-let, Yaba 2026" },
  { figure: "8–12%",    label: "Annual Price Appreciation", sub: "5-year average" },
  { figure: "$20k+",    label: "Entry Investment",          sub: "Andoyi House off-plan" },
  { figure: "1M+",      label: "Tech Professionals",        sub: "In the Yaba ecosystem" },
];

const COMPANIES = ["Paystack", "Flutterwave", "Andela", "Interswitch", "CcHub", "Jumia", "Konga", "UNILAG", "YABATECH"];

export default function InvestYabaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(yabaSchema) }} />
      <PageHero
        title="Invest in Yaba,"
        titleAccent="Lagos"
        subtitle="Silicon Lagos — Nigeria's technology district offers the best rental yield and growth potential of any Lagos investment area in 2026."
        image="/images/andoyi/2.png"
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
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Why Yaba, Lagos?</h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-5">
              Yaba is Lagos State's technology and innovation hub — informally called <strong className="text-foreground">Silicon Lagos</strong>. The area is home to Nigeria's largest concentration of tech companies, startups, universities, and co-working spaces, creating the strongest and most resilient rental demand of any area in Lagos.
            </p>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-10">
              Unlike Victoria Island or Lekki — where tenants are primarily corporate executives or returning diaspora — Yaba's tenant profile is driven by the technology sector: young professionals aged 25–40 with stable employment, high incomes, and a strong preference for modern, well-connected accommodation close to work.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-card border border-border rounded-sm p-6 mb-12">
              <p className="text-[10px] tracking-[0.18em] uppercase text-primary font-body font-bold mb-4">Major Employers in the Yaba Ecosystem</p>
              <div className="flex flex-wrap gap-2">
                {COMPANIES.map((c) => (
                  <span key={c} className="text-xs font-body font-semibold px-3 py-1.5 bg-muted border border-border rounded-sm text-muted-foreground">{c}</span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">Investment Case</h3>
                <ul className="space-y-3">
                  {[
                    "Highest gross rental yield in Lagos at entry price",
                    "Tech sector creates recession-resistant rental demand",
                    "Young professional tenant profile — low default risk",
                    "Government infrastructure investment ongoing in Yaba",
                    "UNILAG and YABATECH create year-round occupancy",
                    "Limited supply of premium purpose-built rental stock",
                    "Lagos tech ecosystem projected to 2× in 5 years",
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
                    { label: "Gross Short-Let Yield", value: "7–10%" },
                    { label: "Gross Long-Let Yield",  value: "5–7%" },
                    { label: "Annual Appreciation",   value: "8–12%" },
                    { label: "Studio Entry Price",     value: "₦30M–₦80M" },
                    { label: "Short-Let Daily Rate",   value: "₦25,000–₦80,000" },
                    { label: "Average Occupancy",      value: "75–90%" },
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
            <div className="bg-[hsl(var(--charcoal))] rounded-sm p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-[11px] tracking-[0.22em] uppercase text-primary font-body font-bold mb-3">Invest in Yaba with Zithelo</p>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">Andoyi House — 88 Smart Studios</h3>
                  <p className="font-body text-sm text-white/60 leading-relaxed">
                    88 premium, fibre-ready studio apartments in Yaba. Verified C of O title. 25-year lease. Full management. Off-plan investment open from $20,000 USD.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/projects/andoyi-house" className="group inline-flex items-center justify-center gap-2 gold-gradient text-primary-foreground px-6 py-3 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-sm hover:opacity-90 transition-opacity">
                    View Andoyi House <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link href="/tools/roi-calculator" className="group inline-flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-sm hover:border-primary/40 transition-colors">
                    Calculate Returns <ArrowRight size={14} />
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
