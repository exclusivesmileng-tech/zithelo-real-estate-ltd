"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  MapPin, ArrowLeft, ArrowRight,
  Check, Home, ZoomIn, Play,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ImageLightbox from "@/components/ImageLightbox";
import StickyCTABar from "@/components/StickyCTABar";
import AvailabilityCounter from "@/components/AvailabilityCounter";

// ─── Gallery images — new primary jpegs ─────────────────────────────────────

const ALL_IMAGES = [
  "/images/signature/zsh1.jpg.jpeg",
  "/images/signature/zsh2.jpg.jpeg",
  "/images/signature/zsh3.jpg.jpeg",
  "/images/signature/zsh4.jpg.jpeg",
  "/images/signature/zsh5.jpg.jpeg",
];

const VIDEO_CLIPS = [
  {
    src:      "/videos/signature-homes/zsh1.mp4",
    thumbUrl: "/images/signature/zsh1.jpg.jpeg",
    label:    "Exterior & Entrance",
  },
  {
    src:      "/videos/signature-homes/zsh2.mp4",
    thumbUrl: "/images/signature/zsh2.jpg.jpeg",
    label:    "Build Progress",
  },
];

const DEFAULT_STATS = [
  { label: "Property Type",  value: "Semi-Detached + BQ" },
  { label: "Bedrooms",       value: "4 Bedrooms" },
  { label: "Location",       value: "Ikeja, Lagos" },
  { label: "Pricing",        value: "Price on Request" },
];

const DEFAULT_HIGHLIGHTS = [
  "Secure gated environment with CCTV surveillance",
  "4 spacious bedrooms each with walk-in closet",
  "Internet-ready fibre optic infrastructure",
  "Contemporary luxury finishes throughout",
  "Fully fitted modern kitchen",
  "Ample parking space on-site",
  "Private balconies per unit",
  "24/7 power supply",
  "Boy's Quarters (BQ) included",
  "Off Toyin Street — prime Ikeja address",
];

const NEARBY_LANDMARKS = [
  "Marriott Hotel",
  "Ikeja City Mall",
  "Lagos State Secretariat",
  "M.M. International Airport",
];

// ─── Props ───────────────────────────────────────────────────────────────────

interface Stat { label: string; value: string; }

export interface SignatureProjectData {
  title?: string;
  type?: string;
  location?: string;
  year?: string;
  units?: string;
  status?: string;
  shortDesc?: string;
  galleryUrls?: string[];
  stats?: Stat[];
  highlights?: string[];
}

interface Props { project: SignatureProjectData | null; }

// ─── Component ───────────────────────────────────────────────────────────────

export default function SignatureContent({ project }: Props) {
  const gallery = project?.galleryUrls?.length ? project.galleryUrls : ALL_IMAGES;
  const stats = project?.stats?.length ? project.stats : DEFAULT_STATS;
  const highlights = project?.highlights?.length ? project.highlights : DEFAULT_HIGHLIGHTS;

  const title = project?.title ?? "Zithelo Signature Homes 1";
  const type = project?.type ?? "Semi-Detached Duplexes";
  const location = project?.location ?? "Ikeja, Lagos";
  const year = project?.year ?? "2025–2027";
  const units = project?.units ?? "";
  const status = project?.status ?? "Under Construction";
  const shortDesc =
    project?.shortDesc ??
    "Where Luxury Meets Legacy. Spacious 4-bedroom semi-detached duplexes with BQ, designed for returning professionals and diaspora investors seeking quality, space, and connectivity in the heart of Ikeja.";

  const [heroCycle, setHeroCycle] = useState(0);
  const [activeClip, setActiveClip] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Auto-cycle hero background through first 5 images
  useEffect(() => {
    const t = setInterval(() => setHeroCycle((c) => (c + 1) % Math.min(5, gallery.length)), 5000);
    return () => clearInterval(t);
  }, [gallery.length]);


  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  function openLightbox(i: number) { setLightboxIndex(i); setLightboxOpen(true); }
  function lbPrev() { setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length); }
  function lbNext() { setLightboxIndex((i) => (i + 1) % gallery.length); }

  function switchClip(i: number) {
    setActiveClip(i);
    if (videoRef.current) { videoRef.current.load(); videoRef.current.play().catch(() => {}); }
  }

  // Layout: varied sizing for visual hierarchy across 5 images
  const gridLayout = [
    "col-span-2 row-span-2",  // 0 — large hero
    "col-span-1 row-span-1",  // 1
    "col-span-1 row-span-1",  // 2
    "col-span-1 row-span-1",  // 3
    "col-span-1 row-span-1",  // 4
  ];

  return (
    <>
      {/* ══════════════════════════════════════════
          HERO — auto-cycling image parallax
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[680px] flex items-end overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={heroCycle}
            src={gallery[heroCycle]}
            alt={title}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{ y: imgY }}
            className="absolute inset-0 w-full h-[115%] object-cover -top-[7.5%]"
          />
        </AnimatePresence>

        {/* Overlays — match homepage luxury-overlay pattern */}
        <div className="absolute inset-0 luxury-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

        {/* Back link */}
        <div className="absolute top-28 left-6 md:left-12 lg:left-24 z-20">
          <Link href="/projects" className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/70 font-body font-semibold hover:text-primary transition-colors duration-200">
            <ArrowLeft size={13} /> All Projects
          </Link>
        </div>

        {/* Hero text */}
        <motion.div style={{ y: textY, opacity: heroOpacity }} className="relative z-10 w-full px-6 md:px-12 lg:px-24 pb-28">
          <div className="max-w-[1400px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                animate={{ opacity: 1, letterSpacing: "0.25em" }}
                transition={{ duration: 1.2, delay: 0.1 }}
                className="text-xs tracking-[0.25em] uppercase text-primary mb-5 font-body font-semibold inline-flex items-center gap-3"
              >
                <span className="w-8 h-px bg-primary" /> {status} <span className="w-8 h-px bg-primary" />
              </motion.p>
              <h1 className="font-display font-bold text-white leading-[1.05] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                Zithelo<br />
                <span className="gold-gradient-text">Signature</span><br />
                Homes 1
              </h1>
              <div className="flex flex-wrap items-center gap-5 mt-7 text-white/70 font-body text-sm">
                <span className="flex items-center gap-2"><MapPin size={13} className="text-primary" /> {location}</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>{type}</span>
                {units && <><span className="w-1 h-1 rounded-full bg-white/40" /><span>{units}</span></>}
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>{year}</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 gold-gradient text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-sm hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20">
                  Enquire Now <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <button
                  onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-body font-semibold text-sm tracking-wide rounded-sm hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm"
                >
                  View Gallery
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Image counter */}
        <div className="absolute bottom-6 right-8 z-20 flex items-center gap-2">
          {Array.from({ length: Math.min(5, gallery.length) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroCycle(i)}
              className={`transition-all duration-300 rounded-full ${heroCycle === i ? "w-5 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VIDEO TOUR + PROJECT OVERVIEW
      ══════════════════════════════════════════ */}
      <section className="section-padding overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-14 items-start">
          <AnimatedSection>
            {/* Video player */}
            <div className="relative aspect-video overflow-hidden rounded-sm bg-black">
              <video
                ref={videoRef}
                key={VIDEO_CLIPS[activeClip].src}
                src={VIDEO_CLIPS[activeClip].src}
                autoPlay muted loop playsInline preload="auto"
                className="w-full h-full object-cover"
              />
              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary pointer-events-none" />
              <span className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary pointer-events-none" />
              <span className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary pointer-events-none" />
              <span className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary pointer-events-none" />
              {/* Label badge */}
              <div className="absolute bottom-4 right-4">
                <span className="bg-black/65 backdrop-blur-sm border border-white/20 px-3 py-1 text-[10px] tracking-[0.15em] uppercase text-white/90 font-body font-semibold rounded-sm">
                  {VIDEO_CLIPS[activeClip].label}
                </span>
              </div>
              {/* Clip counter */}
              <div className="absolute top-4 right-4">
                <span className="bg-black/55 backdrop-blur-sm border border-primary/30 px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase text-primary font-body font-semibold rounded-sm">
                  {activeClip + 1} / {VIDEO_CLIPS.length}
                </span>
              </div>
            </div>

            {/* Clip thumbnails */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {VIDEO_CLIPS.map((clip, i) => (
                <button
                  key={i}
                  onClick={() => switchClip(i)}
                  className={`relative aspect-video overflow-hidden rounded-sm border-2 transition-all duration-200 focus:outline-none group ${
                    activeClip === i
                      ? "border-primary shadow-lg shadow-primary/20"
                      : "border-transparent opacity-55 hover:opacity-90 hover:border-primary/40"
                  }`}
                >
                  <img src={clip.thumbUrl} alt={clip.label} className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 flex flex-col items-center justify-center gap-1 transition-colors ${
                    activeClip === i ? "bg-black/20" : "bg-black/55 group-hover:bg-black/35"
                  }`}>
                    {activeClip !== i && <Play size={14} className="text-white" fill="white" />}
                    <span className="text-[9px] tracking-[0.1em] uppercase text-white font-body font-semibold leading-none text-center px-1">{clip.label}</span>
                  </div>
                  {activeClip === i && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                  )}
                </button>
              ))}
              {/* Coming soon slot */}
              <div className="aspect-video rounded-sm border border-dashed border-border flex flex-col items-center justify-center gap-1.5 opacity-40">
                <Play size={12} className="text-primary" />
                <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground font-body font-semibold">More Soon</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Overview text + stats */}
          <AnimatedSection delay={0.2}>
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-body font-semibold mb-1">{type}</p>
            <h2 className="font-display text-3xl font-bold text-foreground mt-1">Project Overview</h2>
            <p className="mt-6 text-base text-foreground/80 font-body leading-relaxed">{shortDesc}</p>
            <p className="mt-4 text-base text-foreground/80 font-body leading-relaxed">
              Every detail has been selected to deliver a premium living experience — from the imported finishing materials to the smart-ready infrastructure and generous spatial planning throughout.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="border border-border bg-card rounded-sm px-4 py-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-body mb-1">{s.label}</p>
                  <p className="font-display text-xl font-bold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>
            {/* Nearby landmarks */}
            <div className="mt-6 border border-border rounded-sm p-5 bg-card">
              <p className="text-[9px] tracking-[0.2em] uppercase text-primary font-body font-semibold mb-3">Nearby Landmarks</p>
              <div className="grid grid-cols-2 gap-2">
                {NEARBY_LANDMARKS.map((lm) => (
                  <div key={lm} className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                    <MapPin size={11} className="text-primary shrink-0" /> {lm}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <AvailabilityCounter total={12} remaining={5} />
            </div>

            {/* Private viewing contact */}
            <div className="mt-5 border border-primary/25 rounded-sm p-5 bg-primary/5">
              <p className="text-[9px] tracking-[0.2em] uppercase text-primary font-body font-semibold mb-2">Private Viewing &amp; Enquiries</p>
              <a href="tel:+2349110222323" className="flex items-center gap-2 text-sm font-body text-foreground hover:text-primary transition-colors mb-1.5">
                <span className="text-primary">📞</span> +234 9110 222 323
              </a>
              <a href="https://instagram.com/zithelohomes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-body text-foreground hover:text-primary transition-colors">
                <span className="text-primary">📸</span> @zithelohomes
              </a>
            </div>

            <Link href="/contact" className="group mt-6 inline-flex items-center gap-2 px-7 py-3.5 gold-gradient text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-sm hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20">
              Enquire Now <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY SIGNATURE HOMES — DARK CHARCOAL
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[hsl(var(--charcoal))]">
        {/* Animated gold orbs */}
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
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="text-[11px] tracking-[0.25em] uppercase text-primary mb-4 font-body font-semibold">Why Signature Homes 1</p>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-[1.04]">
                Built for the<br />
                <span className="gold-gradient-text">Discerning Few.</span>
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
              <p className="text-white/60 font-body text-lg leading-relaxed">
                Signature Homes 1 is designed for those who refuse to compromise — on space, on quality, or on location. Off Toyin Street, Ikeja, at the centre of everything.
              </p>
            </motion.div>
          </div>

          {/* 4 feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: "01", title: "Prime Ikeja Address", desc: "Off Toyin Street — one of Lagos' most prestigious residential and commercial addresses.", detail: "Toyin Street · Ikeja GRA" },
              { num: "02", title: "Superior Construction", desc: "Premium imported finishes, quality fittings, and an attention to detail that sets a new benchmark.", detail: "Premium finishes · Built to last" },
              { num: "03", title: "Fibre-Ready Living", desc: "Every unit is wired for gigabit-speed internet from day one — no retrofitting, no compromises.", detail: "Fibre optic · Smart-ready" },
              { num: "04", title: "Diaspora Designed", desc: "Conceived for returning professionals and diaspora investors who know what quality looks like.", detail: "Remote purchase · Verified title" },
            ].map((card, i) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative flex flex-col border border-white/10 rounded-sm p-8 hover:border-primary/60 transition-all duration-500 overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 gold-gradient opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="font-display text-6xl font-black gold-gradient-text leading-none mb-8 select-none">{card.num}</span>
                <h3 className="font-display text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">{card.title}</h3>
                <p className="text-white/55 font-body text-sm leading-relaxed flex-1">{card.desc}</p>
                <div className="mt-8 pt-5 border-t border-white/10 group-hover:border-primary/30 transition-colors duration-300">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-body font-semibold">{card.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HIGHLIGHTS + STACKED IMAGES
      ══════════════════════════════════════════ */}
      <section className="section-padding bg-card overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — stacked offset image cards */}
          <AnimatedSection>
            <div className="relative h-[420px] sm:h-[480px]">
              {/* Back card */}
              <motion.div
                initial={{ opacity: 0, x: -20, rotate: -4 }}
                whileInView={{ opacity: 1, x: 0, rotate: -4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute top-[4%] left-[2%] w-[54%] h-[82%] rounded-sm overflow-hidden border-2 border-primary/30 shadow-2xl"
              >
                <img src={gallery[3] ?? gallery[0]} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/25" />
              </motion.div>
              {/* Front card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => openLightbox(1)}
                className="absolute bottom-[4%] right-[2%] w-[60%] h-[82%] rounded-sm overflow-hidden border-2 border-primary/60 shadow-2xl shadow-black/30 group cursor-zoom-in"
              >
                <img src={gallery[1] ?? gallery[0]} alt={title} className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-primary font-body font-semibold">Signature Homes 1</p>
                  <p className="text-white font-display font-bold text-lg">Ikeja, Lagos</p>
                </div>
              </motion.div>
              {/* Gold badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="absolute top-[4%] right-[2%] gold-gradient rounded-full px-4 py-2.5 shadow-xl shadow-primary/30 flex items-center gap-2"
              >
                <Home size={13} className="text-primary-foreground" />
                <span className="font-display font-bold text-primary-foreground text-xs">Premium Duplex</span>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Right — highlights */}
          <AnimatedSection delay={0.2}>
            <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-body font-semibold mb-3">What You Get</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Every Detail<br /><span className="gold-gradient-text">Considered.</span>
            </h2>
            <p className="mt-6 text-base text-foreground/80 font-body leading-relaxed">
              From the structural integrity of the build to the smallest interior specification, Signature Homes 1 is crafted to a standard that holds value for generations.
            </p>
            <ul className="mt-8 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-foreground/80 font-body">
                  <span className="w-5 h-5 rounded-full gold-gradient flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} className="text-primary-foreground" strokeWidth={3} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FULL GALLERY — all images
      ══════════════════════════════════════════ */}
      <section id="gallery" className="section-padding overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-body font-semibold mb-3">Photo Gallery</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-12">
              The Estate
            </h2>
          </AnimatedSection>

          {/* Mosaic grid — upgraded */}
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[220px] gap-3">
            {gallery.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => openLightbox(i)}
                className={`${gridLayout[i] ?? "col-span-1 row-span-1"} overflow-hidden rounded-sm cursor-zoom-in group relative border border-transparent hover:border-primary/50 transition-colors duration-300`}
              >
                <img
                  src={src}
                  alt={`${title} ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-400" />
                {/* Gold top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Centre zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-11 h-11 rounded-full gold-gradient flex items-center justify-center shadow-lg shadow-primary/30">
                    <ZoomIn size={18} className="text-primary-foreground" />
                  </div>
                </div>
                {/* Image counter badge */}
                <div className="absolute bottom-2.5 left-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-black/70 backdrop-blur-sm border border-white/20 px-2 py-0.5 text-[9px] tracking-[0.12em] uppercase text-white/90 font-body font-semibold rounded-sm">
                    {i + 1}&nbsp;/&nbsp;{gallery.length}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 text-xs text-muted-foreground font-body text-center tracking-wide"
          >
            {gallery.length} photographs &mdash; click any image to view full screen
          </motion.p>
        </div>
      </section>

      {/* ── LIGHTBOX ─────────────────────────────────────────────────────── */}
      <ImageLightbox
        images={gallery}
        index={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={lbNext}
        onPrev={lbPrev}
        onSelect={setLightboxIndex}
        title={title}
      />

      <StickyCTABar projectName="Signature Homes 1" />

      {/* ══════════════════════════════════════════
          CTA — DARK
      ══════════════════════════════════════════ */}
      <section className="section-padding bg-foreground">
        <div className="max-w-[800px] mx-auto text-center">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-body font-semibold mb-4">Signature Homes 1 · Ikeja</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-background leading-tight">Claim Your Residence</h2>
            <p className="mt-5 text-base text-background/70 font-body leading-relaxed max-w-xl mx-auto">
              A limited number of units are available. Speak with our team about current availability, pricing, and viewing appointments.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 gold-gradient text-primary-foreground font-body font-bold text-sm tracking-wide rounded-sm hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20">
                Get In Touch <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/projects" className="inline-flex items-center gap-2 px-8 py-4 border border-background/30 text-background font-body font-semibold text-sm tracking-wide rounded-sm hover:bg-background/10 transition-all duration-300">
                All Projects
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}


