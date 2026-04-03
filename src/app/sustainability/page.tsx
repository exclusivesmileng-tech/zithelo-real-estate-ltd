import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SustainabilityHeroVector from "@/components/heroes/SustainabilityHeroVector";
import Link from "next/link";
import { ArrowRight, Check, Zap, Droplets, Wind, BrainCircuit, Heart, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "Sustainable Development | Zithelo Real Estate",
  description:
    "Zithelo builds future-ready, LEED-aligned developments integrating solar energy, intelligent water systems, responsible materials, and smart building technologies across Africa.",
  alternates: { canonical: "/sustainability" },
  openGraph: {
    title: "Sustainable Development | Zithelo Real Estate",
    description:
      "Clean energy. Smart systems. Responsible materials. Discover how Zithelo redefines sustainable urban development in Africa.",
  },
};

const pillars = [
  {
    icon: Zap,
    number: "01",
    title: "Clean Energy & Low-Carbon Infrastructure",
    body: "Zithelo is actively integrating solar power solutions across its developments to reduce reliance on combustion-based energy sources.",
    points: [
      "Transition from fuel-dependent systems to clean, renewable energy",
      "Lower operational costs and improved energy resilience",
      "Reduced carbon footprint across all assets",
    ],
    tag: "Solar Ready",
  },
  {
    icon: Droplets,
    number: "02",
    title: "Intelligent Water Systems",
    body: "We design with water efficiency at the core of every project — from site selection through to specification.",
    points: [
      "Rainwater harvesting and reuse systems",
      "Water-efficient fixtures and infrastructure",
      "Sustainable drainage solutions tailored to each environment",
    ],
    tag: "60% Less Wastage",
  },
  {
    icon: Wind,
    number: "03",
    title: "Responsible Material Strategy",
    body: "Our material selection prioritises durability, sustainability, and efficiency at every stage of the build process.",
    points: [
      "Locally sourced and environmentally responsible materials",
      "Reduced construction waste through optimised planning",
      "Long-life materials that minimise lifecycle costs",
    ],
    tag: "Ethically Sourced",
  },
  {
    icon: Heart,
    number: "04",
    title: "Wellness-Centred Environments",
    body: "Zithelo developments are designed to enhance health, comfort, and productivity for every occupant.",
    points: [
      "Optimised natural lighting and ventilation",
      "Improved indoor air quality",
      "Spaces tailored for healthcare, residential, and commercial excellence",
    ],
    tag: "Human-Centred",
  },
  {
    icon: BrainCircuit,
    number: "05",
    title: "Smart, Future-Ready Assets",
    body: "We build with tomorrow in mind — integrating technology that keeps assets competitive, compliant, and valuable over time.",
    points: [
      "Integration of smart building technologies for monitoring and efficiency",
      "Alignment with global sustainability benchmarks such as LEED",
      "Assets designed to remain compliant, competitive, and valuable over time",
    ],
    tag: "IoT Monitoring",
  },
];

const badges = ["LEED Aligned", "Low Carbon", "Solar Ready", "Water Smart", "Future-Ready", "Wellness Certified"];

export default function SustainabilityPage() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-[hsl(var(--charcoal))]">
        <PageHero
          breadcrumb="Sustainability"
          title="Sustainable Development,"
          titleAccent="Redefined."
          subtitle="We don't just construct buildings — we develop future-ready assets designed for performance, efficiency, and enduring value."
          image="/images/hero-skyline.jpg"
          vector={<SustainabilityHeroVector />}
        />
      </div>

      {/* ── Philosophy intro ── */}
      <section className="relative overflow-hidden bg-background section-padding">
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ backgroundImage: `repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(212,170,83,0.03) 40px,rgba(212,170,83,0.03) 41px)` }} />

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.28)" }}>
                  <Leaf size={14} className="text-green-500" />
                </div>
                <p className="text-[11px] tracking-[0.3em] uppercase font-body font-semibold text-green-600 dark:text-green-400">Our Philosophy</p>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.06] mb-6">
                Where Clean Energy Meets<br />
                <span className="gold-gradient-text">Intelligent Design.</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-5">
                We believe the future of real estate lies at the intersection of clean energy, smart systems, and human-centred design. Every Zithelo project is intentionally planned to reduce environmental impact while enhancing long-term financial and operational outcomes.
              </p>
              <p className="text-base text-muted-foreground font-body leading-relaxed">
                Sustainability at Zithelo is not an add-on. It is the foundation upon which every decision — from land selection to material specification — is made.
              </p>
            </div>

            {/* Right — dark callout card */}
            <div className="relative rounded-2xl overflow-hidden bg-[hsl(var(--charcoal))] p-8 md:p-10">
              {/* Ambient green glow */}
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)" }} />
              <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)" }} />

              <p className="text-[11px] tracking-[0.3em] uppercase font-body font-semibold text-green-400 mb-6">Our Commitment</p>
              <p className="font-display text-2xl md:text-3xl font-bold text-white leading-[1.2] mb-8">
                &ldquo;Zithelo represents a new standard in development — where sustainability is not an add-on,{" "}
                <span className="text-green-400">but a foundation.</span>&rdquo;
              </p>

              {/* Badge row */}
              <div className="flex flex-wrap gap-2 mb-8">
                {badges.map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-[0.12em] uppercase font-body font-semibold"
                    style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "rgba(74,222,128,0.85)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    {b}
                  </span>
                ))}
              </div>

              {/* Tagline */}
              <p className="text-sm font-body italic text-white/40">
                &ldquo;Building the Future. Sustainably.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5 Pillars ── */}
      <section className="relative overflow-hidden section-padding" style={{ backgroundColor: "#071a0e" }}>
        {/* Green glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[500px]"
            style={{ background: "radial-gradient(ellipse at top left, rgba(34,197,94,0.1) 0%, transparent 60%)" }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px]"
            style={{ background: "radial-gradient(ellipse at bottom right, rgba(34,197,94,0.06) 0%, transparent 60%)" }} />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-[11px] tracking-[0.25em] uppercase font-body font-semibold"
              style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", color: "rgba(74,222,128,0.85)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Five Pillars of Sustainable Development
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.06]">
              How We Build<br />
              <span className="text-green-400">Differently.</span>
            </h2>
          </div>

          {/* Pillar cards */}
          <div className="space-y-5">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.number}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-2xl overflow-hidden border transition-all duration-400 hover:border-green-500/40"
                  style={{ borderColor: "rgba(34,197,94,0.15)", background: "rgba(34,197,94,0.03)" }}
                >
                  {/* Number + icon tab */}
                  <div className="lg:col-span-1 flex lg:flex-col items-center justify-center gap-3 lg:gap-4 p-5 lg:py-10"
                    style={{ background: "rgba(34,197,94,0.07)", borderRight: "1px solid rgba(34,197,94,0.12)" }}>
                    <span className="font-display text-xl font-black leading-none" style={{ color: "rgba(74,222,128,0.25)" }}>
                      {p.number}
                    </span>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)" }}>
                      <Icon size={16} className="text-green-400" />
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="lg:col-span-7 p-7 md:p-9">
                    <div className="flex items-start gap-4 mb-4">
                      <h3 className="font-display text-xl md:text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 leading-snug">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base font-body leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {p.body}
                    </p>
                  </div>

                  {/* Points + tag */}
                  <div className="lg:col-span-4 p-7 md:p-9 flex flex-col justify-between gap-5"
                    style={{ borderLeft: "1px solid rgba(34,197,94,0.1)" }}>
                    <ul className="space-y-4">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)" }}>
                            <Check size={12} className="text-green-400" strokeWidth={3} />
                          </span>
                          <span className="text-base font-body leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <span className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-[0.12em] uppercase font-body font-semibold"
                      style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.22)", color: "rgba(74,222,128,0.75)" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      {p.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-card border-y border-border py-14">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            {[
              { value: "40%",  label: "Energy Savings",   sub: "vs conventional builds" },
              { value: "100%", label: "Solar-Ready",       sub: "across all estates" },
              { value: "LEED", label: "Framework",         sub: "globally aligned" },
              { value: "28M",  label: "Unit Gap in Nigeria", sub: "we're building for it" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl md:text-5xl font-black gold-gradient-text leading-none mb-2">{s.value}</p>
                <p className="font-body text-sm font-semibold text-foreground mb-1">{s.label}</p>
                <p className="font-body text-xs text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-background">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-[11px] tracking-[0.25em] uppercase font-body font-semibold"
            style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.22)", color: "rgba(34,197,94,0.85)" }}>
            <Leaf size={11} className="text-green-600 dark:text-green-400" />
            Where Smart Development Meets Clean Energy
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
            Invest in Buildings That<br />
            <span className="gold-gradient-text">Stand the Test of Time.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body leading-relaxed mb-10 max-w-xl mx-auto">
            By combining clean energy, intelligent design, and disciplined execution, we create projects that deliver superior returns, reduced environmental impact, and long-term relevance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/become-an-investor"
              className="group inline-flex items-center justify-center gap-2 gold-gradient text-primary-foreground px-8 py-4 font-body font-bold text-sm tracking-wide rounded-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
              Invest With Zithelo
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/projects"
              className="group inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 font-body font-semibold text-sm tracking-wide rounded-sm hover:border-primary/40 transition-colors duration-300">
              Browse Our Projects
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
