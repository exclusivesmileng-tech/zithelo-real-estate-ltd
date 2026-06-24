import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Lagos Investment Areas Compared — Yaba vs VI vs Lekki vs Ikeja | Zithelo",
  description:
    "Side-by-side comparison of Lagos' top 4 property investment areas: Yaba, Victoria Island, Lekki, and Ikeja. Price per sqm, rental yield, tenant profile, infrastructure, and growth outlook.",
  alternates: { canonical: "/compare/lagos-investment-areas" },
  openGraph: {
    title: "Lagos Investment Areas Compared | Zithelo Real Estate",
    description: "Yaba vs Victoria Island vs Lekki vs Ikeja — data-driven property investment comparison for Lagos 2026.",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

const AREAS = [
  {
    name: "Yaba",
    label: "Silicon Lagos",
    highlight: true,
    priceMin: 800_000,
    priceMax: 1_500_000,
    grossYield: "7–10%",
    appreciation: "8–12%",
    entryUSD: "$20k–$80k",
    tenantProfile: "Tech professionals, graduates, young creatives",
    infraScore: 7,
    growthScore: 10,
    diasporaFriendly: true,
    pros: [
      "Highest growth potential in Lagos 2025–2030",
      "Strong tech sector demand — Paystack, Flutterwave, Andela",
      "Best gross rental yield percentage at entry price",
      "Walkable, urban, young demographic",
      "Zithelo's Andoyi House is located here",
    ],
    cons: [
      "Traffic congestion on Herbert Macaulay Way",
      "Some areas still transitioning (mixed old/new stock)",
    ],
    zitheloProject: "Andoyi House",
    zitheloHref: "/projects/andoyi-house",
  },
  {
    name: "Victoria Island",
    label: "Business & Diplomatic Hub",
    highlight: false,
    priceMin: 2_000_000,
    priceMax: 5_000_000,
    grossYield: "5–7%",
    appreciation: "5–8%",
    entryUSD: "$80k–$300k+",
    tenantProfile: "Corporate executives, NGOs, embassies, expats",
    infraScore: 9,
    growthScore: 6,
    diasporaFriendly: true,
    pros: [
      "Most established commercial address in Lagos",
      "Strong demand from multinationals and embassies",
      "Premium tenant quality — low default risk",
      "Excellent road and infrastructure access",
    ],
    cons: [
      "Highest entry price in Lagos — low yield percentage",
      "Market already highly priced — limited upside",
      "Traffic saturation is a long-term constraint",
    ],
    zitheloProject: null,
    zitheloHref: "/invest/victoria-island",
  },
  {
    name: "Lekki",
    label: "Coastal Growth Corridor",
    highlight: false,
    priceMin: 1_200_000,
    priceMax: 2_500_000,
    grossYield: "6–8%",
    appreciation: "6–9%",
    entryUSD: "$50k–$150k",
    tenantProfile: "Upper-middle class families, oil sector workers, returnees",
    infraScore: 7,
    growthScore: 8,
    diasporaFriendly: true,
    pros: [
      "Strong price appreciation as city expands eastward",
      "Lekki Free Trade Zone driving long-term demand",
      "Popular with diaspora returnees seeking space",
      "Deepwater Port planned — massive infrastructure catalyst",
    ],
    cons: [
      "Traffic on Lekki-Epe Expressway is severe",
      "Distance from mainland Lagos limits some tenant profiles",
      "Flooding risk in some sub-locations",
    ],
    zitheloProject: null,
    zitheloHref: "/invest/lekki",
  },
  {
    name: "Ikeja",
    label: "State Capital Hub",
    highlight: false,
    priceMin: 900_000,
    priceMax: 2_000_000,
    grossYield: "6–8%",
    appreciation: "5–7%",
    entryUSD: "$30k–$120k",
    tenantProfile: "Professionals, families, airport proximity workers",
    infraScore: 8,
    growthScore: 7,
    diasporaFriendly: true,
    pros: [
      "Lagos State capital — stable institutional demand",
      "International airport proximity — always in demand",
      "Excellent road infrastructure on Toyin/Allen corridors",
      "Zithelo's Signature Homes is located here",
    ],
    cons: [
      "Lower growth ceiling than Yaba or Lekki",
      "GRA areas are prime but tightly held",
    ],
    zitheloProject: "Signature Homes",
    zitheloHref: "/projects/signature-homes",
  },
];

const compareSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${SITE_URL}/compare/lagos-investment-areas`,
  headline: "Lagos Investment Areas Compared — Yaba vs Victoria Island vs Lekki vs Ikeja",
  description:
    "Data-driven comparison of Lagos' top four property investment areas for 2026: Yaba (Silicon Lagos), Victoria Island, Lekki, and Ikeja. Price per sqm, gross yield, growth outlook, and tenant profile.",
  author: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  datePublished: "2026-06-01",
  inLanguage: "en-NG",
  articleSection: "Lagos Real Estate Market",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", "h3"],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE_URL}/compare` },
      { "@type": "ListItem", position: 3, name: "Lagos Investment Areas", item: `${SITE_URL}/compare/lagos-investment-areas` },
    ],
  },
};

function ScoreBar({ score, max = 10 }: { score: number; max?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-sm ${i < score ? "gold-gradient" : "bg-border"}`}
          />
        ))}
      </div>
      <span className="text-xs font-body text-muted-foreground">{score}/{max}</span>
    </div>
  );
}

export default function CompareAreasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(compareSchema) }}
      />
      <PageHero
        title="Compare Lagos"
        titleAccent="Investment Areas"
        subtitle="Yaba · Victoria Island · Lekki · Ikeja — a data-driven side-by-side for 2026 investors."
        image="/images/about-hero.jpg"
        breadcrumb="Compare"
      />

      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto">

          <AnimatedSection>
            <div className="border-l-4 border-primary pl-6 mb-14">
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                Lagos is Nigeria's most liquid real estate market — but not all areas offer the same risk-return profile. This comparison uses current market data (mid-2026) to help investors understand the price, yield, and growth characteristics of Lagos's four primary investment destinations.
              </p>
              <p className="text-xs text-muted-foreground font-body mt-2">Data reflects mid-2026 market conditions. Price per sqm in NGN.</p>
            </div>
          </AnimatedSection>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-16">
            {AREAS.map((area, i) => (
              <AnimatedSection key={area.name} delay={i * 0.06}>
                <div className={`border rounded-sm overflow-hidden h-full flex flex-col ${area.highlight ? "border-primary/40 shadow-lg shadow-primary/10" : "border-border"}`}>
                  {area.highlight && (
                    <div className="gold-gradient px-4 py-2">
                      <p className="text-[10px] tracking-[0.18em] uppercase font-body font-bold text-primary-foreground">Zithelo Recommended</p>
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-4">
                      <h2 className="font-display text-xl font-bold text-foreground">{area.name}</h2>
                      <p className="text-xs text-muted-foreground font-body">{area.label}</p>
                    </div>

                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between gap-2 py-2 border-b border-border">
                        <span className="text-xs text-muted-foreground font-body">Entry (USD)</span>
                        <span className="text-xs font-body font-semibold text-foreground">{area.entryUSD}</span>
                      </div>
                      <div className="flex justify-between gap-2 py-2 border-b border-border">
                        <span className="text-xs text-muted-foreground font-body">Gross Yield</span>
                        <span className="text-xs font-body font-semibold text-foreground">{area.grossYield}</span>
                      </div>
                      <div className="flex justify-between gap-2 py-2 border-b border-border">
                        <span className="text-xs text-muted-foreground font-body">Appreciation</span>
                        <span className="text-xs font-body font-semibold text-foreground">{area.appreciation}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-5">
                      <div>
                        <p className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground font-body font-semibold mb-1.5">Infrastructure</p>
                        <ScoreBar score={area.infraScore} />
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground font-body font-semibold mb-1.5">Growth Outlook</p>
                        <ScoreBar score={area.growthScore} />
                      </div>
                    </div>

                    <div className="mb-5">
                      <p className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground font-body font-semibold mb-2">Tenant Profile</p>
                      <p className="text-xs font-body text-muted-foreground leading-snug">{area.tenantProfile}</p>
                    </div>

                    <div className="mb-5">
                      <p className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground font-body font-semibold mb-2">Pros</p>
                      <ul className="space-y-1.5">
                        {area.pros.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-xs font-body text-muted-foreground">
                            <Check size={11} className="text-green-500 shrink-0 mt-0.5" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <p className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground font-body font-semibold mb-2">Cons</p>
                      <ul className="space-y-1.5">
                        {area.cons.map((c) => (
                          <li key={c} className="flex items-start gap-2 text-xs font-body text-muted-foreground">
                            <X size={11} className="text-red-400 shrink-0 mt-0.5" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      {area.zitheloProject ? (
                        <Link
                          href={area.zitheloHref}
                          className="group flex items-center justify-center gap-2 w-full py-3 gold-gradient text-primary-foreground font-body font-bold text-xs tracking-[0.1em] uppercase rounded-sm hover:opacity-90 transition-opacity"
                        >
                          View {area.zitheloProject} <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      ) : (
                        <Link
                          href={area.zitheloHref}
                          className="group flex items-center justify-center gap-2 w-full py-3 border border-border text-muted-foreground font-body font-semibold text-xs tracking-[0.1em] uppercase rounded-sm hover:border-primary/40 hover:text-primary transition-colors"
                        >
                          Area Guide <ArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Bottom data table */}
          <AnimatedSection>
            <h2 className="font-display text-xl font-bold text-foreground mb-6">Quick Reference Table</h2>
            <div className="overflow-x-auto mb-16">
              <table className="w-full border-collapse text-sm font-body">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.16em] uppercase text-muted-foreground font-semibold">Area</th>
                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.16em] uppercase text-muted-foreground font-semibold">Entry Price (USD)</th>
                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.16em] uppercase text-muted-foreground font-semibold">Gross Yield</th>
                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.16em] uppercase text-muted-foreground font-semibold">Appreciation</th>
                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.16em] uppercase text-muted-foreground font-semibold">Growth Score</th>
                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.16em] uppercase text-muted-foreground font-semibold">Zithelo Project</th>
                  </tr>
                </thead>
                <tbody>
                  {AREAS.map((area) => (
                    <tr key={area.name} className={`border-b border-border ${area.highlight ? "bg-primary/5" : ""}`}>
                      <td className="py-3 px-4">
                        <span className="font-bold text-foreground">{area.name}</span>
                        {area.highlight && <span className="ml-2 text-[9px] tracking-[0.12em] uppercase text-primary font-semibold">Recommended</span>}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{area.entryUSD}</td>
                      <td className="py-3 px-4 text-muted-foreground">{area.grossYield}</td>
                      <td className="py-3 px-4 text-muted-foreground">{area.appreciation}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-foreground">{area.growthScore}/10</span>
                      </td>
                      <td className="py-3 px-4">
                        {area.zitheloProject ? (
                          <Link href={area.zitheloHref} className="text-primary font-semibold hover:underline text-xs">
                            {area.zitheloProject}
                          </Link>
                        ) : (
                          <span className="text-muted-foreground text-xs">Coming soon</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>

          {/* Verdict */}
          <AnimatedSection>
            <div className="bg-[hsl(var(--charcoal))] rounded-sm p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[11px] tracking-[0.22em] uppercase text-primary font-body font-bold mb-3">Our Verdict</p>
                  <h3 className="font-display text-xl font-bold text-white mb-4">
                    Yaba Offers the Best Risk-Return for 2026–2030
                  </h3>
                  <p className="font-body text-sm text-white/60 leading-relaxed">
                    For investors prioritising yield and capital growth at a sensible entry price, Yaba is the clear winner. The tech sector concentration, young professional demographic, and ongoing infrastructure investment create sustainable long-term demand. Victoria Island remains a safe store of value. Lekki is a compelling 10-year play. Ikeja offers stability.
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <Link href="/projects/andoyi-house" className="group inline-flex items-center gap-2 gold-gradient text-primary-foreground px-6 py-3 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-sm hover:opacity-90 transition-opacity">
                    View Andoyi House — Yaba <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link href="/tools/roi-calculator" className="group inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-sm hover:border-primary/40 transition-colors">
                    Model Your Returns <ArrowRight size={14} />
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
