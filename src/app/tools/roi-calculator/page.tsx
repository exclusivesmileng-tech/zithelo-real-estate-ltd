import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Lagos Property ROI Calculator | Zithelo Real Estate",
  description:
    "Calculate your projected returns from Lagos real estate investment. Model rental yield, capital appreciation, CAGR, and break-even year for Andoyi House and Signature Homes.",
  alternates: { canonical: "/tools/roi-calculator" },
  openGraph: {
    title: "Lagos Property ROI Calculator | Zithelo Real Estate",
    description:
      "Free tool: project your rental income, capital value, and total return from investing in premium Lagos real estate with Zithelo.",
    images: [{ url: "/images/andoyi/2.png", width: 1200, height: 630, alt: "Zithelo ROI Calculator" }],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${SITE_URL}/tools/roi-calculator`,
  name: "Lagos Property ROI Calculator — Zithelo Real Estate",
  url: `${SITE_URL}/tools/roi-calculator`,
  description:
    "Free interactive tool to project rental yield, capital appreciation, total return, CAGR, and break-even year for Zithelo property investments in Lagos, Nigeria.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: "ROI Calculator", item: `${SITE_URL}/tools/roi-calculator` },
    ],
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2"],
  },
};

const METRICS = [
  { figure: "8%",    label: "Target Gross Yield",     sub: "Andoyi House, Yaba" },
  { figure: "6.5%",  label: "Target Gross Yield",     sub: "Signature Homes, Ikeja" },
  { figure: "5–7%",  label: "Annual Appreciation",    sub: "Lagos market average" },
  { figure: "100%",  label: "Management Included",    sub: "No landlord work" },
];

export default function ROICalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <PageHero
        title="Lagos Property"
        titleAccent="ROI Calculator"
        subtitle="Project your rental income, capital growth, and total return from a Zithelo investment — model any amount, horizon, and strategy."
        image="/images/about-hero.jpg"
        breadcrumb="Tools"
      />

      {/* Stat bar */}
      <section className="bg-[hsl(var(--charcoal))] py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {METRICS.map((m) => (
              <div key={m.label + m.sub} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-black gold-gradient-text">{m.figure}</p>
                <p className="mt-1 text-sm font-display font-bold text-white">{m.label}</p>
                <p className="mt-0.5 text-[11px] text-white/45 font-body">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <InvestmentCalculator />

      {/* How it works */}
      <section className="section-padding bg-card">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-4">How It Works</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
              Understanding Your <span className="gold-gradient-text">Projections</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Gross Rental Yield",
                body: "Annual rental income as a percentage of purchase price. Andoyi House targets 8% based on Yaba short-let market rates. Gross yield does not account for management fees or maintenance.",
              },
              {
                num: "02",
                title: "Capital Appreciation",
                body: "The increase in property value over time. Lagos residential property has historically appreciated 5–12% per annum depending on location and market conditions. The calculator uses conservative baseline assumptions.",
              },
              {
                num: "03",
                title: "CAGR",
                body: "Compound Annual Growth Rate — the annualised return on your total investment including both rental income and capital growth. CAGR is the most accurate single-number measure of an investment's performance over time.",
              },
              {
                num: "04",
                title: "Break-Even Year",
                body: "The year at which your cumulative rental income equals your initial investment. After break-even, all rental income is net profit on top of the appreciated capital value you still own.",
              },
            ].map((item) => (
              <AnimatedSection key={item.num}>
                <div className="border border-border rounded-sm p-6 h-full">
                  <span className="font-display text-3xl font-black gold-gradient-text">{item.num}</span>
                  <h3 className="font-display text-lg font-bold text-foreground mt-3 mb-3">{item.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer + CTA */}
      <section className="section-padding">
        <div className="max-w-[860px] mx-auto">
          <AnimatedSection>
            <div className="border border-border rounded-sm p-6 mb-10">
              <p className="text-xs font-body text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Disclaimer:</strong> All projections in this calculator are illustrative estimates based on structured yield and appreciation assumptions. They do not constitute financial advice. Past performance is not a guarantee of future results. Actual returns will vary based on market conditions, occupancy rates, and individual investment terms. Consult a qualified financial adviser before making any investment decision.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-center">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 gold-gradient text-primary-foreground px-8 py-4 font-display font-bold text-sm tracking-[0.12em] uppercase rounded-sm hover:opacity-90 transition-opacity"
              >
                View Projects <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 font-display font-bold text-sm tracking-[0.12em] uppercase rounded-sm hover:border-primary/40 transition-colors"
              >
                Speak to an Adviser <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
