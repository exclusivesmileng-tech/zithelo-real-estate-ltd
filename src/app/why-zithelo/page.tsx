import { client } from "@/sanity/client";
import { ALL_WHY_REASONS_QUERY } from "@/sanity/queries";
import type { SanityWhyReason } from "@/sanity/types";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCard from "@/components/AnimatedCard";
import PageHero from "@/components/PageHero";
import WhyZitheloHeroVector from "@/components/heroes/WhyZitheloHeroVector";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const FALLBACK_REASONS: SanityWhyReason[] = [
  {
    _id: "1", number: "01", title: "Execution Excellence",
    description: "Our track record speaks for itself. Every project we deliver meets the highest standards of quality, safety, and design. We don't cut corners — we set benchmarks.",
    details: "From procurement to handover, our processes are built on international best practices refined for African markets.",
  },
  {
    _id: "2", number: "02", title: "Market Intelligence",
    description: "Deep, data-driven understanding of Africa's real estate markets gives us an edge in identifying opportunities before they become mainstream.",
    details: "Our research team continuously monitors demographic shifts, infrastructure development, and regulatory changes across our target markets.",
  },
  {
    _id: "3", number: "03", title: "Strategic Partnerships",
    description: "We partner with leading financial institutions, development finance organisations, and governments to co-create developments of scale and significance.",
    details: "Our partnerships are built on mutual trust, transparency, and aligned long-term objectives.",
  },
  {
    _id: "4", number: "04", title: "Long-Term Vision",
    description: "We think in decades. Every decision we make — from land acquisition to design — is guided by where African cities will be in 20, 30, 50 years.",
    details: "This generational perspective allows us to create developments that appreciate in value and relevance over time.",
  },
];

const differentiators = [
  "Verified land title on every development",
  "Fibre-optic infrastructure standard",
  "Structured 25-year lease models",
  "Transparent investor reporting",
  "Prime urban location selection",
  "Diaspora-friendly investment process",
];

export const revalidate = 60;

export default async function WhyZitheloPage() {
  const data: SanityWhyReason[] | null = await client.fetch(ALL_WHY_REASONS_QUERY).catch(() => null);
  const reasons = data?.length ? data : FALLBACK_REASONS;

  return (
    <>
      <PageHero
        title="Why Zithelo"
        titleAccent="Built Different."
        subtitle="The case for partnering with Africa's leading urban developer."
        image="/images/hero-skyline.jpg"
        breadcrumb="Why Us"
        vector={<WhyZitheloHeroVector />}
      />

      {/* ── Intro stat bar ── */}
      <section className="bg-[hsl(var(--charcoal))] py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { figure: "2", label: "Active Developments", sub: "Lagos, Nigeria" },
              { figure: "88+", label: "Residential Units", sub: "In current pipeline" },
              { figure: "25yr", label: "Lease Structure", sub: "Long-term income model" },
              { figure: "2027", label: "Delivery Target", sub: "Current active builds" },
            ].map((s, i) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-black gold-gradient-text">{s.figure}</p>
                <p className="mt-1 text-sm font-display font-bold text-white">{s.label}</p>
                <p className="mt-0.5 text-[11px] text-white/45 font-body">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reasons — alternating layout ── */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-4">Our Advantages</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-16">
              The Zithelo <span className="gold-gradient-text">Difference</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-6">
            {reasons.map((item, i) => (
              <AnimatedSection key={item._id} delay={i * 0.08}>
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-sm overflow-hidden border border-border hover:border-primary/30 transition-colors duration-300 group`}>
                  {/* Number tab */}
                  <div className={`lg:col-span-1 flex lg:flex-col items-center justify-center p-6 lg:py-10 ${i % 2 === 0 ? "bg-[hsl(var(--charcoal))]" : "gold-gradient"}`}>
                    <span className={`font-display text-2xl lg:text-3xl font-black ${i % 2 === 0 ? "text-white/20" : "text-primary-foreground/30"} select-none`}>
                      {item.number}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="lg:col-span-7 p-8 md:p-10 bg-card">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground font-body leading-relaxed text-base">{item.description}</p>
                  </div>
                  {/* Details */}
                  <div className="lg:col-span-4 p-8 md:p-10 bg-background border-t lg:border-t-0 lg:border-l border-border flex items-center">
                    <div>
                      <div className="h-[2px] w-8 gold-gradient rounded-full mb-5" />
                      <p className="text-sm text-muted-foreground font-body leading-relaxed italic">{item.details}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Differentiators checklist ── */}
      <section className="section-padding bg-card">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-5">Our Standards</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
              What Every Zithelo<br />
              <span className="gold-gradient-text">Development Includes</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground font-body leading-relaxed">
              These aren't optional extras — they're baseline requirements across every project we deliver.
            </p>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 mt-8 text-sm font-body font-semibold text-foreground hover:text-primary transition-colors duration-300"
            >
              See Our Projects
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {differentiators.map((d, i) => (
                <AnimatedCard
                  key={d}
                  index={i}
                  className="flex items-center gap-3 p-4 bg-background border border-border rounded-sm hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="w-6 h-6 rounded-md gold-gradient flex items-center justify-center shrink-0">
                    <Check size={12} className="text-primary-foreground" />
                  </div>
                  <span className="text-sm font-body text-foreground leading-snug">{d}</span>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding">
        <div className="max-w-[900px] mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              Ready to Partner With<br />
              <span className="gold-gradient-text">Africa's Best?</span>
            </h2>
            <p className="text-lg text-muted-foreground font-body leading-relaxed mb-10 max-w-xl mx-auto">
              Join investors and partners who trust Zithelo to deliver quality, returns, and long-term value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/become-an-investor" className="group inline-flex items-center gap-3 gold-gradient text-primary-foreground px-8 py-4 font-display font-bold text-sm tracking-[0.12em] uppercase rounded-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                Become an Investor <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="group inline-flex items-center gap-3 border border-border text-foreground px-8 py-4 font-display font-bold text-sm tracking-[0.12em] uppercase rounded-sm hover:border-primary/40 transition-colors duration-300">
                Talk to Our Team <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
