"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Check, TrendingUp, Shield, Wifi, Clock, Building2, Globe, Users, MessageSquare, Leaf, Zap, Droplets, Wind, BrainCircuit, MapPin } from "lucide-react";
import { FEATURED_TEAM } from "@/lib/team-data";
import { client, urlFor } from "@/sanity/client";
import { ALL_PROJECTS_QUERY, FEATURED_TEAM_QUERY } from "@/sanity/queries";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import SustainabilityVector from "@/components/SustainabilityVector";
import SaveButton from "@/components/SaveButton";
import SocialProofBar from "@/components/SocialProofBar";
import Testimonials from "@/components/Testimonials";
import WordReveal from "@/components/WordReveal";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";

// ─── Fallback image map keyed by project slug ─────────────────────────────────
const PROJECT_IMG: Record<string, string> = {
  "andoyi-house":    "/images/andoyi/2.png",
  "signature-homes": "/images/signature/zsh1.jpg.jpeg",
};

// ─── Fallback photo map keyed by team member slug ─────────────────────────────
const TEAM_PHOTO: Record<string, string> = {
  "dr-oluwaseun-akinbobola":  "/images/team/Dr. Akinbobola Oluwaseun (Board Executive Chairman).jpg",
  "mrs-ibitayo-akinbobola":   "/images/team/Mrs. Ibitayo Akinbobola (CEO).jpg",
  "arc-odunayo-lawani":       "/images/team/Odunayo Lawani (Board Advisory).jpeg",
  "gabriel-akintayo":         "/images/team/Gabriel Akintayo (Head, Customer Experience).jpeg",
};

// ─── Static project data (used as fallback when Sanity is empty) ──────────────
const FALLBACK_PROJECTS = [
  {
    slug: "andoyi-house",
    img: "/images/andoyi/2.png",
    badge: "Smart Living",
    title: "Andoyi House",
    subtitle: "A Premium, Fibre-Ready Smart Apartment Complex",
    location: "Yaba, Lagos",
    type: "Smart Studio Apartments",
    status: "Under Construction",
    year: "2025 – 2027",
    units: "88 Units",
    desc: "Designed for professionals, entrepreneurs, and remote workers seeking efficient, connected living within Lagos' innovation ecosystem. Fully wired with fibre optic internet and optimised for short-let and long-term rental investment.",
    features: [
      "88 Studio Units",
      "Fibre Optic Internet",
      "25-Year Lease Model",
      "Short-Let Ready",
      "Prime Yaba Location",
      "Structured Returns",
    ],
    href: "/projects/andoyi-house",
  },
  {
    slug: "signature-homes",
    img: "/images/signature/zsh1.jpg.jpeg",
    badge: "Luxury Living",
    title: "Zithelo Signature Homes 1",
    subtitle: "Where Luxury Meets Legacy — 4 Bed Semi-Detached with BQ",
    location: "Ikeja, Lagos",
    type: "Semi-Detached Duplexes",
    status: "Under Construction",
    year: "2025 – 2027",
    units: "",
    desc: "Spacious 4-bedroom semi-detached duplexes with BQ in the heart of Ikeja — steps from Marriott Hotel, Ikeja City Mall, and M.M. International Airport. Contemporary luxury finishes, 24/7 power, CCTV, and walk-in closets throughout.",
    features: [
      "4 Bedrooms + BQ",
      "Walk-in Closets",
      "24/7 Power Supply",
      "CCTV & Gated Security",
      "Private Balconies",
      "Fibre-Ready Infrastructure",
    ],
    href: "/projects/signature-homes",
  },
];

const marqueeItems = [
  "Urban Development",
  "Pan-African Vision",
  "Premium Residences",
  "Diaspora Investment",
  "Fibre-Ready Infrastructure",
  "Smart Apartments",
  "Structured Returns",
  "Lagos · Nairobi · Accra",
  "Global Office · Atlanta, USA",
];

export default function HomePageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // ── CMS-driven state ────────────────────────────────────────────────────────
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [featuredTeam, setFeaturedTeam] = useState(FEATURED_TEAM);

  useEffect(() => {
    // Fetch projects from Sanity
    client.fetch(ALL_PROJECTS_QUERY).then((data: unknown) => {
      if (Array.isArray(data) && data.length > 0) {
        setProjects(
          data.map((p: Record<string, unknown>) => {
            const slug = (p.slug as { current?: string } | undefined)?.current ?? "";
            const heroImage = p.heroImage as Record<string, unknown> | undefined;
            return {
              slug,
              img:      heroImage ? urlFor(heroImage).width(800).url() : (PROJECT_IMG[slug] ?? ""),
              badge:    (p.badge    as string | undefined) ?? "",
              title:    (p.title    as string | undefined) ?? "",
              subtitle: (p.heroSubtitle as string | undefined) ?? "",
              location: (p.location as string | undefined) ?? "",
              type:     (p.type     as string | undefined) ?? "",
              status:   (p.status   as string | undefined) ?? "",
              year:     (p.year     as string | undefined) ?? "",
              units:    (p.units    as string | undefined) ?? "",
              desc:     (p.shortDesc as string | undefined) ?? "",
              features: (p.features as string[] | undefined) ?? [],
              href:     `/projects/${slug}`,
            };
          })
        );
      }
    }).catch(() => {});

    // Fetch featured team from Sanity
    client.fetch(FEATURED_TEAM_QUERY).then((data: unknown) => {
      if (Array.isArray(data) && data.length > 0) {
        setFeaturedTeam(
          data.map((m: Record<string, unknown>) => {
            const slug = (m.slug as { current?: string } | undefined)?.current ?? "";
            const photo = m.photo as Record<string, unknown> | undefined;
            const name  = (m.name as string | undefined) ?? "";
            return {
              slug,
              name,
              initials: name.split(" ").map((w: string) => w[0] ?? "").join("").slice(0, 2),
              role:     (m.role     as string | undefined) ?? "",
              category: ((m.category as string | undefined) ?? "Board") as "Board" | "Management",
              tagline:  (m.tagline  as string | undefined) ?? "",
              bio:      (m.bio      as string | undefined) ?? "",
              photo:    photo ? urlFor(photo).width(600).url() : TEAM_PHOTO[slug],
            };
          })
        );
      }
    }).catch(() => {});
  }, []);

  return (
    <>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[680px] flex items-center overflow-hidden">
        <motion.video
          src="/videos/hero4.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{ y: imgY }}
          className="absolute inset-0 w-full h-[115%] object-cover -top-[7.5%]"
        />
        <div className="absolute inset-0 luxury-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "128px" }}
        />

        <motion.div style={{ y: textY, opacity }} className="relative z-10 w-full px-6 md:px-12 lg:px-24">
          <div className="max-w-[1400px] mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.25em" }}
              transition={{ duration: 1.2, delay: 0.1 }}
              className="text-xs tracking-[0.25em] uppercase text-primary mb-6 font-body font-semibold inline-flex items-center gap-3"
            >
              <span className="w-8 h-px bg-primary" />
              Zithelo Real Estate Limited
              <span className="w-8 h-px bg-primary" />
            </motion.p>

            <h1 className="font-display font-bold text-white leading-[1.05] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]" aria-label="Building Africa's Urban Future">
              <WordReveal text="Building Africa's" className="block" delay={0.25} stagger={0.09} />
              <WordReveal text="Urban Future" className="block gold-gradient-text" delay={0.5} stagger={0.1} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="mt-7 text-lg md:text-xl text-white/75 font-body max-w-2xl mx-auto leading-relaxed"
            >
              Premium connected spaces for modern professionals and diaspora investors across Africa&apos;s fastest-growing cities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex items-center justify-center gap-3 px-4"
            >
              <MagneticButton className="flex-1 md:flex-none">
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 px-6 py-4 md:px-8 gold-gradient text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-2xl md:rounded-sm hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 w-full justify-center"
                >
                  Explore Projects
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
              <MagneticButton className="flex-1 md:flex-none">
                <Link
                  href="/why-zithelo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 md:px-8 border border-white/30 text-white font-body font-semibold text-sm tracking-wide rounded-2xl md:rounded-sm hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm w-full"
                >
                  Why Zithelo
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-sm tracking-[0.12em] uppercase text-white/50 font-body">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
            <ChevronDown size={16} className="text-white/40" />
          </motion.div>
        </motion.div>

        {/* Marquee bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/20 bg-black/50 backdrop-blur-sm overflow-hidden py-3">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-5 text-xs md:text-sm tracking-[0.12em] uppercase text-white/90 font-display font-semibold">
                {item}
                <span className="w-1.5 h-1.5 rounded-full bg-primary/90 shrink-0" />
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE ZITHELO — BOLD DARK PILLARS
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[hsl(var(--charcoal))]">
        {/* Animated gold orb background */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(43 81% 61%) 0%, transparent 65%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(43 81% 61%) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32">

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm tracking-[0.12em] uppercase text-primary mb-4 font-body font-semibold">Why Choose Zithelo</p>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-[1.04]">
                Built Different.<br />
                <span className="gold-gradient-text">Invested Differently.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p className="text-white/60 font-body text-lg leading-relaxed">
                Four reasons thousands of diaspora investors and modern professionals choose Zithelo over every other option in the market.
              </p>
            </motion.div>
          </div>

          {/* 4 bold cards — horizontal scroll on mobile */}
          <div className="-mx-6 md:mx-0">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto md:overflow-visible px-6 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar">
            {[
              {
                num: "01",
                title: "Prime Locations Only",
                desc: "Every development sits inside Africa's highest-demand urban corridors — Yaba, Ikeja, and beyond.",
                detail: "Yaba · Ikeja · Nairobi",
              },
              {
                num: "02",
                title: "25-Year Structured Lease",
                desc: "A transparent, income-generating lease model that earns you rental rights from day one of occupancy.",
                detail: "Rental income · Resale rights",
              },
              {
                num: "03",
                title: "Fibre-Ready Infrastructure",
                desc: "Every unit is wired for the modern professional. Gigabit-ready on day one — no retrofitting needed.",
                detail: "Fibre optic · Smart-ready",
              },
              {
                num: "04",
                title: "Diaspora-Trusted",
                desc: "Built for investors who don't live locally. Full documentation, verified title, and remote-accessible management.",
                detail: "Verified title · Remote access",
              },
            ].map((card, i) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative flex flex-col border border-white/10 rounded-2xl md:rounded-sm p-6 md:p-8 hover:border-primary/60 transition-all duration-500 overflow-hidden cursor-default snap-start shrink-0 w-[80vw] sm:w-[55vw] md:w-auto"
              >
                {/* Hover fill */}
                <div className="absolute inset-0 gold-gradient opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none" />
                {/* Top glow line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Large number */}
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                  className="font-display text-6xl font-black gold-gradient-text leading-none mb-8 select-none"
                >
                  {card.num}
                </motion.span>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                  {card.title}
                </h3>

                {/* Desc */}
                <p className="text-white/55 font-body text-sm leading-relaxed flex-1">
                  {card.desc}
                </p>

                {/* Detail tag */}
                <div className="mt-8 pt-5 border-t border-white/10 group-hover:border-primary/30 transition-colors duration-300">
                  <span className="text-sm tracking-[0.1em] uppercase text-primary font-body font-semibold">
                    {card.detail}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          </div>

          {/* Bottom CTA strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="text-white/50 font-body text-sm italic">
                Invest smart. Build generational wealth.{" "}
                <span className="gold-gradient-text font-semibold not-italic">Grow with Zithelo.</span>
              </p>
              <span className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 rounded-full shrink-0 self-start sm:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
                <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-body font-semibold">HQ · Atlanta, USA</span>
              </span>
            </div>
            <Link
              href="/why-zithelo"
              className="group inline-flex items-center gap-2 px-8 py-4 gold-gradient text-primary-foreground font-body font-bold text-sm tracking-wide rounded-sm hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 shrink-0"
            >
              Why Zithelo
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHO WE ARE
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-card">
        {/* Subtle diagonal texture */}
        <div className="absolute inset-0 pointer-events-none opacity-40"
          style={{ backgroundImage: `repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(212,170,83,0.03) 40px,rgba(212,170,83,0.03) 41px)` }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-28">

          {/* ── Top label row ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-16 md:mb-20"
          >
            <div className="h-px w-10 gold-gradient rounded-full" />
            <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-body font-semibold">Who We Are</p>
          </motion.div>

          {/* ── Two-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* ── Left: image stack ── */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              {/* Main image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-none">
                <img
                  src="/images/about-hero.jpg"
                  alt="Zithelo development"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating stat card — bottom right */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="absolute -bottom-8 -right-4 md:-right-10 bg-background border border-border shadow-2xl shadow-black/15 p-5 md:p-6 w-44 md:w-52"
              >
                <p className="text-[10px] tracking-[0.22em] uppercase text-primary font-body font-semibold mb-2">Pan-African</p>
                <p className="font-display text-2xl md:text-3xl font-bold text-foreground leading-none mb-2">Vision 2030</p>
                <p className="text-[11px] text-muted-foreground font-body leading-relaxed">Africa&apos;s urban population doubles by 2050. We&apos;re building for it.</p>
              </motion.div>

              {/* Gold corner accent top-left */}
              <div className="absolute -top-3 -left-3 w-12 h-12 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[2px] gold-gradient" />
                <div className="absolute top-0 left-0 h-full w-[2px] gold-gradient" />
              </div>
            </motion.div>

            {/* ── Right: content ── */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:pt-4"
            >
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.06] mb-8">
                More Than a Company.<br />
                <span className="gold-gradient-text">A Continental Vision.</span>
              </h2>

              <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-5">
                Zithelo is an urban development and real estate investment company focused on delivering well-structured, high-quality developments within prime city locations — combining functionality, contemporary design, and long-term investment value.
              </p>
              <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-5">
                We develop connected spaces for modern professionals, remote workers, and diaspora investors — built with fibre optic infrastructure and structured investment models that generate strong rental income and long-term capital growth.
              </p>

              {/* Atlanta HQ callout */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-start gap-4 bg-background border border-border rounded-xl p-5 mb-8"
              >
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-1">International Footprint</p>
                  <p className="font-display text-base font-bold text-foreground mb-1.5">Zithelo Homes LLC · Atlanta, USA</p>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    Operating through our US entity, we go beyond traditional property transactions — combining rigorous asset selection, structured acquisition, and professional-grade asset management to deliver end-to-end real estate solutions from origination to long-term portfolio optimisation.
                  </p>
                </div>
              </motion.div>

              {/* Vision / Mission / Philosophy pillars */}
              <div className="mt-12 space-y-0 divide-y divide-border border-y border-border">
                {[
                  { num: "01", label: "Vision",     text: "The leading urban investment platform across Africa's fastest-growing cities." },
                  { num: "02", label: "Mission",    text: "High-quality developments generating long-term value for investors and communities." },
                  { num: "03", label: "Philosophy", text: "Every decision guided by lasting value — for investors, residents, and cities." },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                    className="group flex items-start gap-5 py-5 hover:bg-muted/30 px-2 -mx-2 transition-colors duration-200"
                  >
                    <span className="text-[11px] tracking-[0.15em] font-body font-bold text-primary/50 mt-0.5 shrink-0 w-6">{item.num}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] tracking-[0.2em] uppercase text-primary font-body font-semibold mb-1">{item.label}</p>
                      <p className="text-sm text-muted-foreground font-body leading-relaxed">{item.text}</p>
                    </div>
                    <ArrowRight size={14} className="text-primary/0 group-hover:text-primary/40 shrink-0 mt-0.5 transition-all duration-200 translate-x-0 group-hover:translate-x-1" />
                  </motion.div>
                ))}
              </div>

              {/* CTA row */}
              <div className="mt-10 flex items-center gap-6">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2.5 bg-foreground text-background px-7 py-3.5 font-display font-bold text-sm tracking-[0.1em] uppercase hover:bg-primary transition-colors duration-300"
                >
                  Our Story
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/why-zithelo"
                  className="group inline-flex items-center gap-2 text-sm tracking-[0.12em] uppercase font-body font-semibold text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Why Zithelo
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SUSTAINABILITY
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#071a0e" }}>
        {/* Background laye rs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(34,197,94,0.09) 0%, transparent 65%)" }} />
          <div className="absolute top-0 left-0 w-[500px] h-[420px]"
            style={{ background: "radial-gradient(ellipse at top left, rgba(34,197,94,0.07) 0%, transparent 55%)" }} />
          <div className="absolute bottom-0 right-0 w-[560px] h-[460px]"
            style={{ background: "radial-gradient(ellipse at bottom right, rgba(34,197,94,0.05) 0%, transparent 55%)" }} />
          <div className="absolute inset-0"
            style={{ backgroundImage: `repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(34,197,94,0.018) 40px,rgba(34,197,94,0.018) 41px)` }} />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* ── Left: content ── */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                {/* Pill badge */}
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
                  style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.28)" }}>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                  <p className="text-[11px] tracking-[0.28em] uppercase font-body font-semibold text-green-400">Sustainability Commitment</p>
                </div>

                <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.06] text-white mb-5">
                  Built for Performance.<br />
                  <span className="text-green-400">Designed for Tomorrow.</span>
                </h2>
                <p className="text-white/55 font-body text-base md:text-lg leading-relaxed">
                  We don&apos;t just construct buildings — we develop future-ready assets designed for efficiency, clean energy, and enduring value. Sustainability at Zithelo is not an add-on. It is the foundation.
                </p>
              </motion.div>

              {/* ── Stats row ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-10 grid grid-cols-3 gap-3"
              >
                {[
                  { value: "40%",  label: "Energy Savings",  sub: "vs conventional builds" },
                  { value: "100%", label: "Solar-Ready",     sub: "across all estates" },
                  { value: "LEED", label: "Framework",       sub: "globally aligned" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl p-4 text-center"
                    style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}>
                    <p className="font-display font-black text-2xl text-green-400 leading-none mb-1">{stat.value}</p>
                    <p className="font-body text-[10px] font-bold text-white/75 uppercase tracking-wide">{stat.label}</p>
                    <p className="font-body text-[9px] text-white/35 mt-0.5 leading-snug">{stat.sub}</p>
                  </div>
                ))}
              </motion.div>

              {/* ── Pillar cards — 2×2 grid ── */}
              <div className="mt-7 grid grid-cols-2 gap-3">
                {[
                  { icon: Zap,          title: "Clean Energy",         body: "Solar power integration reducing reliance on combustion-based systems.", tag: "Solar + Grid" },
                  { icon: Droplets,     title: "Water Intelligence",    body: "Rainwater harvesting with water-efficient, sustainable drainage systems.", tag: "60% Less Wastage" },
                  { icon: Wind,         title: "Responsible Materials", body: "Locally sourced, low-waste materials that minimise environmental impact.", tag: "Ethically Sourced" },
                  { icon: BrainCircuit, title: "Smart Systems",         body: "Real-time monitoring technologies aligned with global LEED benchmarks.", tag: "IoT Monitoring" },
                ].map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div
                      key={p.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                      className="group rounded-xl p-4 cursor-default transition-colors duration-300"
                      style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.13)" }}
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 shrink-0"
                        style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}>
                        <Icon size={15} className="text-green-400" />
                      </div>
                      <p className="font-display text-sm font-bold text-white mb-1.5">{p.title}</p>
                      <p className="text-sm font-body leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>{p.body}</p>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-body font-semibold tracking-wide"
                        style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.22)", color: "rgba(74,222,128,0.8)" }}>
                        {p.tag}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* ── LEED tags ── */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-7 flex flex-wrap items-center gap-2"
              >
                {["LEED Aligned", "Low Carbon", "Solar Ready", "Future-Ready"].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-[0.15em] uppercase font-body font-semibold"
                    style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "rgba(74,222,128,0.8)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* ── CTA ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="mt-6"
              >
                <Link
                  href="/sustainability"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-body font-semibold transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.38)",
                    color: "rgba(74,222,128,0.9)",
                  }}
                >
                  <Leaf size={14} />
                  Explore Our Green Standards
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* ── Right: animated SVG ── */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center justify-center"
            >
              <SustainabilityVector />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          OUR FLAGSHIP PROJECTS
      ══════════════════════════════════════════ */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm tracking-[0.12em] uppercase text-primary mb-4 font-body font-semibold">Our Flagship Estates</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                Prime <span className="gold-gradient-text">Investment</span> Opportunities
              </h2>
              <p className="mt-5 text-lg text-muted-foreground font-body max-w-xl mx-auto leading-relaxed">
                Discover our most sought-after developments offering exceptional value, security, and growth potential.
              </p>
            </motion.div>
          </div>

          {/* Cards — horizontal swipe on mobile */}
          <div className="-mx-6 md:mx-0">
          <div className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto md:overflow-visible px-6 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar">
            {projects.map((project, i) => (
              <TiltCard
                key={project.title}
                maxTilt={6}
                className="snap-start shrink-0 w-[85vw] sm:w-[70vw] md:w-auto"
              >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group bg-card border border-border rounded-2xl md:rounded-sm overflow-hidden hover:shadow-2xl hover:shadow-black/10 hover:border-primary/30 transition-all duration-500 h-full"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Badge — gold on charcoal */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 gold-gradient text-primary-foreground text-sm tracking-[0.1em] uppercase font-body font-bold rounded-sm shadow-md">
                      {project.badge}
                    </span>
                  </div>

                  {/* Status + Save button — top right stack */}
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-foreground/90 backdrop-blur-sm text-background dark:text-foreground text-[10px] tracking-[0.15em] uppercase font-body font-semibold rounded-sm">
                      {project.status}
                    </span>
                    <SaveButton slug={project.slug} />
                  </div>

                  {/* Title overlay on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
                    <p className="text-white/70 font-body text-sm mt-1">{project.subtitle}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-7">
                  <p className="text-muted-foreground font-body text-base leading-relaxed">{project.desc}</p>

                  {/* Features grid */}
                  <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
                    {project.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full gold-gradient flex items-center justify-center shrink-0">
                          <Check size={11} className="text-primary-foreground" strokeWidth={3} />
                        </span>
                        <span className="text-sm text-foreground font-body">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={project.href}
                    className="group/btn mt-8 flex items-center justify-center gap-2 w-full py-4 gold-gradient text-primary-foreground font-body font-bold text-sm tracking-[0.12em] uppercase rounded-sm hover:opacity-90 transition-all duration-300 shadow-md shadow-primary/20"
                  >
                    Explore Estate
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
              </TiltCard>
            ))}
          </div>
          </div>

          {/* View all link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase font-body font-semibold text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              View All Projects
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INVEST WITH ZITHELO — SPLIT DARK
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[hsl(var(--charcoal))]">
        {/* subtle gold glow top-right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.07] pointer-events-none"
          style={{ background: "radial-gradient(circle at top right, hsl(43 81% 61%) 0%, transparent 65%)" }} />

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">

          {/* LEFT — stacked image cards (hidden on mobile, shown md+) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden md:flex relative items-center justify-center px-10 py-20 lg:py-28"
          >
            <motion.div
              initial={{ opacity: 0, x: -24, rotate: -4 }}
              whileInView={{ opacity: 1, x: 0, rotate: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute top-[15%] left-[8%] w-[62%] aspect-[4/5] rounded-sm overflow-hidden border-2 border-primary/30 shadow-2xl"
            >
              <img src="/images/andoyi/3.png" alt="Andoyi House interior" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-[68%] aspect-[4/5] rounded-sm overflow-hidden border-2 border-primary/60 shadow-2xl shadow-black/60 ml-[20%] mt-[10%] group"
            >
              <img src="/images/andoyi/2.png" alt="Andoyi House"
                className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-sm tracking-[0.1em] uppercase text-primary font-body font-semibold">Andoyi House</p>
                <p className="text-white font-display font-bold text-lg">Yaba, Lagos</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="absolute top-[12%] right-[6%] gold-gradient rounded-full px-5 py-3 shadow-xl shadow-primary/30 flex items-center gap-2"
            >
              <TrendingUp size={15} className="text-primary-foreground" />
              <span className="font-display font-bold text-primary-foreground text-sm">25-Year Lease</span>
            </motion.div>
          </motion.div>

          {/* RIGHT — content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="px-6 md:px-12 lg:px-16 py-10 md:py-20 lg:py-28"
          >
            <div className="block md:hidden rounded-2xl overflow-hidden aspect-[16/9] mb-8 border border-primary/40">
              <img src="/images/andoyi/2.png" alt="Andoyi House" className="w-full h-full object-cover" />
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2 gold-gradient rounded-full mb-8 shadow-lg shadow-primary/20">
              <span className="text-[11px] tracking-[0.2em] uppercase font-body font-bold text-primary-foreground">
                Structured Investment Model
              </span>
            </div>
            <h2 className="font-display font-bold text-white leading-[1.08] text-4xl md:text-5xl">
              The Zithelo<br />
              <span className="gold-gradient-text">25-Year Lease</span><br />
              Investment Model
            </h2>
            <p className="mt-6 text-white/65 font-body text-lg leading-relaxed">
              Own rental income rights and long-term capital growth without the burden of direct management. A structured, transparent vehicle built for diaspora and professional investors.
            </p>
            <div className="mt-8 space-y-3">
              {[
                { icon: TrendingUp, title: "Rental Income Rights", desc: "— earn from day one of occupancy" },
                { icon: Shield,     title: "Verified Title & Documentation", desc: "— fully legal, fully protected" },
                { icon: Wifi,       title: "Fibre-Ready Infrastructure", desc: "— wired for the modern professional" },
                { icon: Clock,      title: "Resale Flexibility After Term", desc: "— exit on your own timeline" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/8 transition-all duration-300 rounded-sm px-5 py-4"
                >
                  <div className="w-9 h-9 rounded-sm gold-gradient flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-primary-foreground" />
                  </div>
                  <p className="font-body text-sm text-white/90">
                    <span className="font-semibold text-white">{item.title}</span>
                    <span className="text-primary font-semibold"> {item.desc}</span>
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 gold-gradient text-primary-foreground font-body font-bold text-sm tracking-wide rounded-2xl md:rounded-sm hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/30"
              >
                Invest With Us
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/projects"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/25 text-white font-body font-semibold text-sm tracking-wide rounded-2xl md:rounded-sm hover:border-primary/60 hover:bg-white/5 transition-all duration-300"
              >
                Browse Estates
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <Link
              href="/investor-quiz"
              className="group inline-flex items-center gap-1.5 mt-5 text-xs font-body text-white/45 hover:text-primary transition-colors duration-200"
            >
              Not sure which type fits you?
              <span className="font-semibold text-primary/70 group-hover:text-primary transition-colors duration-200">
                Take the investor quiz →
              </span>
            </Link>
            <p className="mt-8 text-sm font-body italic text-white/40">
              Invest smart. Build generational wealth.{" "}
              <span className="gold-gradient-text font-semibold not-italic">Grow with Zithelo.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHAT SETS US APART — GLOBAL DIFFERENTIATORS
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-background">
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* ── Left: differentiators list ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-4">Our Advantage</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-[1.06] mb-12">
                What Sets Us<br />
                <span className="gold-gradient-text">Apart.</span>
              </h2>

              <div className="space-y-7">
                {[
                  { label: "Global Access",              text: "Direct exposure to U.S. real estate through our on-ground presence." },
                  { label: "Institutional Approach",     text: "Data-driven acquisition and risk-managed investment strategy." },
                  { label: "End-to-End Execution",       text: "From sourcing and structuring to management and exit." },
                  { label: "Capital Preservation Focus", text: "Prioritizing downside protection alongside growth." },
                  { label: "Cross-Border Expertise",     text: "Bridging African capital with international opportunities." },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <p className="text-base font-body leading-relaxed">
                      <span className="font-bold text-foreground">{item.label}:</span>{" "}
                      <span className="text-muted-foreground">{item.text}</span>
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Right: positioning + process ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col gap-4"
            >
              {/* Lagos | Global | Atlanta badge */}
              <div className="inline-flex items-stretch self-start rounded-sm overflow-hidden border border-border">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/60">
                  <span className="text-sm leading-none">🇳🇬</span>
                  <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground font-body font-semibold whitespace-nowrap">Lagos</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2.5 bg-primary/10 border-l border-r border-border">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                  </span>
                  <span className="text-[10px] tracking-[0.22em] uppercase text-primary font-body font-semibold">Global</span>
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/60">
                  <span className="text-sm leading-none">🇺🇸</span>
                  <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground font-body font-semibold whitespace-nowrap">Atlanta</span>
                </div>
              </div>

              {/* Positioning card */}
              <div className="relative bg-[hsl(var(--charcoal))] rounded-sm p-8 md:p-10 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient" />
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <div className="relative z-10">
                  <p className="font-display text-2xl md:text-3xl font-bold text-white leading-[1.2] mb-4">
                    We are not brokers.
                  </p>
                  <p className="text-white/65 font-body text-base leading-relaxed">
                    We are real estate investment partners, focused on building resilient portfolios across borders.
                  </p>
                </div>
              </div>

              {/* Investment process — 2×2 grid */}
              <div className="border border-border rounded-sm overflow-hidden grid grid-cols-2">
                {[
                  { step: "01", action: "Identify & Source",   detail: "Lagos · Atlanta" },
                  { step: "02", action: "Structure & Acquire", detail: "Risk-first" },
                  { step: "03", action: "Manage & Optimise",   detail: "Full lifecycle" },
                  { step: "04", action: "Deliver Returns",     detail: "Long-term value" },
                ].map((s, i) => (
                  <div
                    key={s.step}
                    className={`p-5 ${i % 2 === 0 ? "border-r border-border" : ""} ${i < 2 ? "border-b border-border" : ""}`}
                  >
                    <p className="text-[10px] tracking-[0.2em] uppercase text-primary/70 font-body mb-1">{s.step}</p>
                    <p className="font-display text-sm font-bold text-foreground mb-0.5">{s.action}</p>
                    <p className="text-[11px] text-muted-foreground font-body">{s.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Gold section divider ── */}
      <div className="bg-[hsl(var(--charcoal))] flex items-center px-6 md:px-12 lg:px-24 py-5">
        <div
          className="flex-1 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(212,170,83,0.45))" }}
        />
        <div className="flex items-center gap-2.5 px-6">
          <span className="block w-1 h-1 rounded-full bg-[hsl(43,81%,61%)] opacity-50" />
          <span className="block w-[6px] h-[6px] rotate-45 bg-[hsl(43,81%,61%)]" />
          <span className="block w-1 h-1 rounded-full bg-[hsl(43,81%,61%)] opacity-50" />
        </div>
        <div
          className="flex-1 h-px"
          style={{ background: "linear-gradient(to left, transparent, rgba(212,170,83,0.45))" }}
        />
      </div>

      {/* ══════════════════════════════════════════
          INVESTMENT CALCULATOR
      ══════════════════════════════════════════ */}
      <InvestmentCalculator />

      {/* ══════════════════════════════════════════
          WHY NIGERIA / WHY NOW
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-background section-padding">
        {/* Subtle diagonal texture */}
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ backgroundImage: `repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(212,170,83,0.03) 40px,rgba(212,170,83,0.03) 41px)` }} />

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">

            {/* ── LEFT: editorial copy ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 gold-gradient rounded-full" />
                <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-body font-semibold">The Opportunity</p>
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-[1.06] mb-8">
                Why Nigeria.<br />
                <span className="gold-gradient-text">Why Now.</span>
              </h2>

              <div className="space-y-5 mb-10">
                <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed">
                  Nigeria is home to Africa&apos;s largest economy and fastest-growing urban population. Lagos alone adds over 600,000 new residents every year — creating a structural, long-term demand for quality housing that far outpaces supply.
                </p>
                <p className="text-base text-muted-foreground font-body leading-relaxed">
                  For diaspora investors and forward-thinking professionals, this gap is the opportunity. Zithelo is built to capture it — with verified title, structured leases, and developments in the highest-demand corridors.
                </p>
              </div>

              {/* Inline micro-stats row */}
              <div className="flex flex-wrap gap-x-8 gap-y-5 border-t border-border pt-8">
                {[
                  { value: "600K+", label: "new Lagos residents yearly" },
                  { value: "2×",    label: "urban population by 2050" },
                  { value: "28M",   label: "unit housing deficit" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    <p className="font-display text-3xl font-black gold-gradient-text leading-none mb-1">{s.value}</p>
                    <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── RIGHT: dark callout card ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative rounded-2xl overflow-hidden bg-[hsl(var(--charcoal))] p-8 md:p-10 flex flex-col justify-between gap-10"
            >
              {/* Ambient gold glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, hsl(43 81% 61% / 0.12) 0%, transparent 70%)" }} />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, hsl(43 81% 61% / 0.07) 0%, transparent 70%)" }} />

              {/* Pull quote */}
              <div className="relative">
                <span className="font-display text-7xl leading-none text-primary/20 select-none absolute -top-4 -left-2">&ldquo;</span>
                <p className="font-display text-2xl md:text-3xl font-bold text-white leading-[1.2] pt-6">
                  Lagos will be one of the world&apos;s largest cities by 2100 — and premium housing supply is{" "}
                  <span className="gold-gradient-text">critically scarce today.</span>
                </p>
              </div>

              {/* 3 stat rows */}
              <div className="relative space-y-0 divide-y divide-white/8">
                {[
                  { value: "600K+", label: "New residents in Lagos per year",       source: "UN Urbanisation Outlook" },
                  { value: "2×",    label: "Africa's urban pop. doubles by 2050",   source: "World Bank Urban Report" },
                  { value: "28M",   label: "Unit housing deficit across Nigeria",   source: "Nigeria Housing Finance Corp" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                    className="flex items-center gap-5 py-4"
                  >
                    <p className="font-display text-2xl font-black gold-gradient-text shrink-0 w-16">{stat.value}</p>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body font-semibold text-white/85 leading-snug">{stat.label}</p>
                      <p className="text-[10px] tracking-[0.12em] uppercase text-primary/45 font-body mt-0.5">{stat.source}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/diaspora-investor"
                className="relative group inline-flex items-center gap-2.5 px-6 py-3.5 border border-primary/40 text-sm font-body font-semibold text-primary hover:bg-primary/10 transition-all duration-300 self-start"
              >
                Explore the Investment Case
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MEET THE TEAM
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0a0906] px-6 md:px-12 lg:px-24 py-20 md:py-32">
        {/* Noise grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
        {/* Ambient gold glow — top right */}
        <div className="absolute -top-32 -right-32 w-[50vw] h-[50vw] rounded-full bg-primary/6 blur-[140px] pointer-events-none" />
        {/* Ambient gold glow — bottom left */}
        <div className="absolute -bottom-32 -left-16 w-[30vw] h-[30vw] rounded-full bg-primary/4 blur-[100px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-body font-semibold mb-5 inline-flex items-center gap-3">
              <span className="w-8 h-px bg-primary" />
              The People Behind Zithelo
              <span className="w-8 h-px bg-primary" />
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Leadership &amp; <span className="gold-gradient-text">Team</span>
              </h2>
              <Link
                href="/leadership"
                className="group inline-flex items-center gap-2.5 px-6 py-3 border border-primary/40 text-sm font-body font-semibold text-primary hover:bg-primary/10 transition-all duration-300 shrink-0"
              >
                View Full Team
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <p className="mt-5 text-base text-white/45 font-body max-w-2xl leading-relaxed">
              A team of experienced professionals united by a commitment to disciplined execution, quality development, and long-term value creation across Africa.
            </p>
          </motion.div>

          {/* Team cards — horizontal scroll on mobile */}
          <div className="-mx-6 md:mx-0">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 overflow-x-auto md:overflow-visible px-6 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar items-start">
            {featuredTeam.map((member, i) => (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 52 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.13, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`snap-start shrink-0 w-[72vw] sm:w-[44vw] md:w-auto ${(i === 1 || i === 3) ? "lg:mt-10" : ""}`}
              >
                <Link
                  href={`/leadership/${member.slug}`}
                  className="group block relative overflow-hidden bg-[#1a1612]"
                  style={{ aspectRatio: "3 / 4" }}
                >
                  {/* Headshot */}
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent flex items-center justify-center">
                      <span className="font-display text-6xl font-bold text-primary/20">{member.initials}</span>
                    </div>
                  )}

                  {/* Gradient overlay — fades from transparent to near-black at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                  {/* Warm gold shimmer on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/12 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content pinned to bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    {/* Expanding gold rule */}
                    <div className="h-[2px] gold-gradient mb-5 w-8 group-hover:w-14 transition-all duration-500 ease-out" />

                    {/* Category badge */}
                    <span className="inline-block mb-2.5 px-2.5 py-0.5 text-[9px] tracking-[0.25em] uppercase font-body font-semibold text-primary border border-primary/40 bg-black/50 backdrop-blur-sm">
                      {member.category}
                    </span>

                    {/* Name */}
                    <h3 className="font-display text-[1.15rem] font-bold text-white leading-snug">
                      {member.name}
                    </h3>

                    {/* Role */}
                    <p className="text-[10px] tracking-[0.15em] uppercase text-primary/80 font-body font-semibold mt-1">
                      {member.role}
                    </p>

                    {/* Tagline — collapses to 0 height, expands on hover */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                      <div className="overflow-hidden">
                        <p className="text-[13px] text-white/55 font-body leading-relaxed pt-3.5 line-clamp-3">
                          {member.tagline}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-body font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                          View Full Bio <ArrowRight size={11} />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Border frame */}
                  <div className="absolute inset-0 border border-white/5 group-hover:border-primary/35 transition-colors duration-300 pointer-events-none" />
                </Link>
              </motion.div>
            ))}
          </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          EXPLORE OUR SERVICES
      ══════════════════════════════════════════ */}
      {/* <Testimonials /> — hidden until real testimonials are available */}
      <section className="section-padding bg-card">
        <div className="max-w-[1400px] mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Explore Our <span className="gold-gradient-text">Services</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground font-body max-w-lg mx-auto">
              Your trusted partner for premium urban development and real estate investment across Africa.
            </p>
          </motion.div>

          {/* Cards — 2×2 app icon grid on mobile, 4-col on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                icon: Building2,
                title: "Our Projects",
                desc: "Explore our premium residential and mixed-use developments in Africa's prime city locations.",
                href: "/projects",
              },
              {
                icon: TrendingUp,
                title: "Why Invest With Us",
                desc: "Discover our structured 25-year lease model and the proven returns it delivers for investors.",
                href: "/why-zithelo",
              },
              {
                icon: Users,
                title: "About Zithelo",
                desc: "Learn about our mission to build connected, high-quality urban spaces for modern Africa.",
                href: "/about",
              },
              {
                icon: MessageSquare,
                title: "Get In Touch",
                desc: "Ready to invest or partner with us? Contact our team and we'll guide you every step of the way.",
                href: "/contact",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={item.href} className="group flex flex-col h-full bg-background border border-border rounded-2xl md:rounded-sm p-5 md:p-8 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 active:scale-[0.97]">
                  {/* Icon */}
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl gold-gradient flex items-center justify-center mb-4 md:mb-7 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-primary/20">
                    <item.icon size={20} className="text-primary-foreground" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-base md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 md:mb-3 leading-snug">
                    {item.title}
                  </h3>

                  {/* Desc — hidden on small mobile to keep cards compact */}
                  <p className="text-muted-foreground font-body text-sm leading-relaxed flex-1 hidden sm:block">
                    {item.desc}
                  </p>

                  {/* Learn More */}
                  <div className="mt-3 md:mt-6 inline-flex items-center gap-1.5 text-xs md:text-sm font-body font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                    Learn More <ArrowRight size={12} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



    </>
  );
}
