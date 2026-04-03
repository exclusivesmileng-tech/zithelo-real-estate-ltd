"use client";

import { useState, useEffect, type ElementType } from "react";
import { client } from "@/sanity/client";
import { ABOUT_PAGE_QUERY } from "@/sanity/queries";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/PageHero";
import AboutHeroVector from "@/components/heroes/AboutHeroVector";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Building2, Shield, TrendingUp } from "lucide-react";
import Link from "next/link";

const ICON_MAP: Record<string, ElementType> = { Globe, Building2, Shield, TrendingUp };

const foundationPillars = [
  {
    iconName: "Globe",
    label: "Continental Vision",
    title: "Africa-First Urban Strategy",
    text: "We focus on high-growth cities where housing demand, workforce mobility, and digital infrastructure growth converge.",
    detail: "Lagos today. Pan-Africa next.",
  },
  {
    iconName: "Building2",
    label: "Execution Discipline",
    title: "Prime-Located, High-Utility Assets",
    text: "Every project is built around practical use cases for residents and long-term value creation for investors.",
    detail: "Function-led design decisions.",
  },
  {
    iconName: "Shield",
    label: "Investor Confidence",
    title: "Structured, Transparent Delivery",
    text: "From planning to handover, we prioritize clarity in documentation, project updates, and investment structure.",
    detail: "Built for local and diaspora trust.",
  },
  {
    iconName: "TrendingUp",
    label: "Long-Term Value",
    title: "Income + Capital Growth Focus",
    text: "Our developments are positioned for rental performance and appreciation in resilient urban corridors.",
    detail: "Designed for compounding returns.",
  },
];

const principles = [
  {
    key: "01",
    label: "Vision",
    title: "Build The Leading Pan-African Urban Platform",
    text: "Create the most trusted development and investment platform connecting diaspora capital to premium real estate opportunities in Africa's highest-growth cities.",
    focus: "Market Direction",
  },
  {
    key: "02",
    label: "Mission",
    title: "Execute High-Utility Assets With Precision",
    text: "Deliver structured, high-quality developments that generate long-term value for investors while creating modern, functional spaces for professionals and communities.",
    focus: "Operational Engine",
  },
  {
    key: "03",
    label: "Philosophy",
    title: "Design Every Decision For Enduring Value",
    text: "Build with purpose so every decision, from location to design to infrastructure, compounds value for investors, residents, and the cities we serve.",
    focus: "Decision Standard",
  },
];

const keyMetrics = [
  { value: "2", label: "Active Properties" },
  { value: "2025", label: "Current Delivery Cycle" },
  { value: "25-Year", label: "Structured Lease Model" },
  { value: "2050", label: "Urban Demand Horizon" },
];

const operatingModel = [
  "Acquisition and selection in high-demand urban corridors.",
  "Design and build centered on utility, connectivity, and durability.",
  "Structured investment framework with transparent execution milestones.",
];

export default function AboutPageClient() {
  const [aboutData, setAboutData] = useState<{
    introHeadline?: string;
    introP1?: string;
    chips?: string[];
    whatWeBuild?: string;
    whoWeBuildFor?: string;
    howWeWin?: string;
    foundationPillars?: { iconName: string; label: string; title: string; text: string; detail: string }[];
    keyMetrics?: { value: string; label: string }[];
    operatingModelPoints?: string[];
    principles?: { key: string; label: string; title: string; text: string; focus: string }[];
  } | null>(null);

  useEffect(() => {
    client.fetch(ABOUT_PAGE_QUERY).then(setAboutData).catch(() => {});
  }, []);

  const activePillars        = aboutData?.foundationPillars    ?? foundationPillars;
  const activePrinciples     = aboutData?.principles           ?? principles;
  const activeMetrics        = aboutData?.keyMetrics           ?? keyMetrics;
  const activeOperatingModel = aboutData?.operatingModelPoints ?? operatingModel;
  const introHeadline        = aboutData?.introHeadline        ?? "We Build City-Grade Assets For Africa\u2019s Next Urban Chapter.";
  const introP1              = aboutData?.introP1              ?? "Zithelo is an urban development and real estate investment company focused on prime locations, high-utility design, and structured investment outcomes. We serve modern professionals, remote workers, and diaspora investors who demand quality and clarity.";
  const activeChips          = aboutData?.chips                ?? ["Prime Urban Corridors", "Fibre-Ready Infrastructure", "Structured Investment Models"];
  const whatWeBuild          = aboutData?.whatWeBuild          ?? "Connected residential and mixed-use developments in high-demand urban districts.";
  const whoWeBuildFor        = aboutData?.whoWeBuildFor        ?? "Professionals and diaspora investors seeking utility, liquidity potential, and long-term resilience.";
  const howWeWin             = aboutData?.howWeWin             ?? "Disciplined site selection, execution rigor, and transparent structures that scale confidence.";

  return (
    <>
      <PageHero
        title="About Zithelo"
        titleAccent="A Continental Vision."
        subtitle="Developing connected urban spaces for modern professionals and global investors."
        image="/images/about-hero.jpg"
        breadcrumb="About Us"
        vector={<AboutHeroVector />}
      />

      <section className="relative overflow-hidden section-padding bg-card">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute -top-24 -right-24 w-[240px] h-[240px] sm:w-[440px] sm:h-[440px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(43 81% 61%) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <AnimatedSection>
            <p className="text-sm tracking-[0.12em] uppercase text-primary mb-4 font-body font-semibold">Who We Are</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-[1.03] max-w-[14ch]">
              {introHeadline}
            </h2>
            <p className="mt-8 text-lg text-muted-foreground font-body leading-relaxed max-w-[56ch]">
              {introP1}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {activeChips.map((chip) => (
                <span
                  key={chip}
                  className="px-4 py-2 text-sm tracking-[0.1em] uppercase font-body font-semibold border border-border text-muted-foreground bg-background rounded-sm"
                >
                  {chip}
                </span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="h-full grid grid-cols-1 gap-4">
              {[
                { title: "What We Build",   text: whatWeBuild },
                { title: "Who We Build For", text: whoWeBuildFor },
                { title: "How We Win",       text: howWeWin },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="relative border border-border rounded-sm p-6 md:p-7 bg-background overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient opacity-80" />
                  <p className="text-sm tracking-[0.1em] uppercase text-primary font-body font-semibold mb-3">
                    {item.title}
                  </p>
                  <p className="text-muted-foreground font-body leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[hsl(var(--charcoal))]">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute -top-28 -left-28 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(43 81% 61%) 0%, transparent 65%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1.8 }}
          className="absolute -bottom-36 -right-36 w-[640px] h-[640px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(43 81% 61%) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-16">
            <AnimatedSection>
              <p className="text-sm tracking-[0.12em] uppercase text-primary mb-4 font-body font-semibold">Our Foundation</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.06]">
                Built For Africa&apos;s
                <br />
                <span className="gold-gradient-text">Urban Decades Ahead</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.12}>
              <p className="text-white/65 font-body text-lg leading-relaxed">
                We operate where demographic growth, infrastructure demand, and investor appetite meet.
                Our model is intentionally built for resilient delivery and repeatable value creation.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {activePillars.map((pillar, i) => {
              const PillarIcon = ICON_MAP[pillar.iconName ?? "Globe"] ?? Globe;
              return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative border border-white/10 rounded-sm p-8 overflow-hidden hover:border-primary/50 transition-all duration-500"
              >
                <div className="absolute inset-0 gold-gradient opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none" />
                <PillarIcon size={20} className="text-primary mb-6" />
                <p className="text-sm tracking-[0.1em] uppercase text-primary font-body font-semibold mb-2">{pillar.label}</p>
                <h3 className="font-display text-2xl font-semibold text-white mb-4">{pillar.title}</h3>
                <p className="text-white/60 font-body leading-relaxed">{pillar.text}</p>
                <p className="mt-6 pt-4 border-t border-white/10 text-sm tracking-[0.1em] uppercase text-primary font-body font-semibold">
                  {pillar.detail}
                </p>
              </motion.div>
              );
            })}
          </div>

          <AnimatedSection delay={0.25}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-9">
              <p className="text-white/50 font-body text-sm italic">
                Structure, quality, and execution speed define our edge.
              </p>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-8 py-4 gold-gradient text-primary-foreground font-body font-bold text-sm tracking-wide rounded-sm hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 shrink-0"
              >
                Explore Projects
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {activeMetrics.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="border border-border rounded-sm p-6 md:p-7 bg-card"
              >
                <p className="font-display text-3xl md:text-4xl font-bold gold-gradient-text">{item.value}</p>
                <p className="mt-3 text-sm tracking-[0.1em] uppercase text-muted-foreground font-body font-semibold">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-sm aspect-[16/11]">
              <img
                src="/images/hero-skyline.jpg"
                alt="Urban skyline"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute left-5 right-5 bottom-5 border border-white/20 bg-black/35 backdrop-blur-sm p-4">
                <p className="text-sm tracking-[0.1em] uppercase text-primary font-body font-semibold">Urban Demand Thesis</p>
                <p className="mt-2 text-white/85 text-sm font-body">
                  We build where employment density, mobility, and digital infrastructure drive sustained absorption.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <p className="text-sm tracking-[0.12em] uppercase text-primary mb-4 font-body font-semibold">Operating Model</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-[1.07] mb-6">
              How We Translate
              <br />
              Strategy Into Assets
            </h2>
            <div className="space-y-4">
              {activeOperatingModel.map((line) => (
                <div key={line} className="flex items-start gap-3">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <p className="text-muted-foreground font-body leading-relaxed">{line}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto mb-10">
          <AnimatedSection>
            <p className="text-sm tracking-[0.12em] uppercase text-primary mb-4 font-body font-semibold">Strategic Core</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-[1.06]">
              Vision, Mission, And Philosophy
              <br />
              As A Unified Operating System
            </h2>
          </AnimatedSection>
        </div>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activePrinciples.map((item, i) => (
            <AnimatedSection key={item.label} delay={i * 0.12}>
              <div className="group relative h-full border border-border rounded-sm p-8 bg-background overflow-hidden hover:border-primary/40 transition-colors duration-400">
                <div className="absolute -top-5 -right-3 font-display text-7xl font-black text-primary/10 select-none">
                  {item.key}
                </div>
                <p className="text-sm tracking-[0.12em] uppercase text-primary mb-3 font-body font-semibold">{item.label}</p>
                <h3 className="font-display text-2xl font-semibold text-foreground leading-tight mb-4">{item.title}</h3>
                <p className="text-muted-foreground font-body leading-relaxed">{item.text}</p>
                <div className="mt-7 pt-4 border-t border-border">
                  <p className="text-sm tracking-[0.1em] uppercase text-primary font-body font-semibold">{item.focus}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="max-w-[1000px] mx-auto text-center">
          <AnimatedSection>
            <p className="text-sm tracking-[0.12em] uppercase text-primary mb-4 font-body font-semibold">Long-Term Outlook</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-[1.08] mb-6">
              Africa&apos;s Urban Population Will
              <br />
              Double By 2050
            </h2>
            <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-[820px] mx-auto">
              This is one of the largest urban expansion cycles in modern history. Zithelo is positioned at
              the center of that demand, delivering infrastructure-backed residential and mixed-use assets
              for the next generation of African cities.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Global Real Estate Platform ── */}
      <section className="relative overflow-hidden section-padding bg-[hsl(var(--charcoal))]">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <AnimatedSection className="mb-14">
            <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-4">Global Footprint</p>
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-10 mb-6">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.06]">
                Global Real Estate<br />
                <span className="gold-gradient-text">Platform.</span>
              </h2>
              <p className="md:pb-1 font-display text-lg md:text-2xl font-semibold text-white/50 leading-tight">
                Institutional Thinking.<br className="hidden md:block" /> Global Execution.
              </p>
            </div>
            <p className="text-white/65 font-body text-base md:text-lg leading-relaxed max-w-[780px]">
              With an expanding international footprint, our group operates through Zithelo Homes LLC,
              headquartered in Atlanta, Georgia, USA — advancing our mission to connect institutional-quality
              thinking with high-growth real estate markets.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {[
              { label: "Global Access",         text: "End-to-end solutions for investors seeking exposure to high-growth US and African real estate markets." },
              { label: "Institutional Approach", text: "We apply institutional-grade thinking and governance to every investment strategy we design." },
              { label: "End-to-End Execution",   text: "From deal origination to ongoing portfolio optimisation, we manage the full investment lifecycle." },
              { label: "Capital Preservation",   text: "Our risk-first ethos ensures that protecting client capital is always the starting point for every decision." },
              { label: "Cross-Border Expertise", text: "Deep knowledge in cross-border capital flows, regulatory structures, and tax-efficient investment frameworks." },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group border border-white/10 rounded-sm p-7 hover:border-primary/40 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 gold-gradient opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none" />
                <p className="text-[10px] tracking-[0.2em] uppercase text-primary font-body font-semibold mb-3">{item.label}</p>
                <p className="text-white/60 font-body text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <AnimatedSection>
            <div className="border border-primary/25 rounded-sm p-6 md:p-8 bg-primary/5">
              <p className="font-display text-xl md:text-2xl font-bold text-white mb-3">
                We are not brokers.{" "}
                <span className="gold-gradient-text">We are real estate investment partners.</span>
              </p>
              <p className="text-white/60 font-body text-sm md:text-base leading-relaxed max-w-[860px]">
                Whether you are a high-net-worth individual, a family office, or an institutional investor,
                we bring the discipline, transparency, and global access needed to allocate capital
                intelligently across borders.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1100px] mx-auto border border-border rounded-sm p-8 md:p-12 bg-background">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-sm tracking-[0.12em] uppercase text-primary mb-3 font-body font-semibold">Work With Zithelo</p>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Build Long-Term Value
                  <br />
                  In Africa&apos;s Growth Cities
                </h3>
              </div>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 gold-gradient text-primary-foreground font-body font-bold text-sm tracking-wide rounded-sm hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 shrink-0"
              >
                Start A Conversation
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
