"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Play, ArrowLeft, ArrowRight, CheckCircle2, ZoomIn } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ImageLightbox from "@/components/ImageLightbox";
import StickyCTABar from "@/components/StickyCTABar";
import AvailabilityCounter from "@/components/AvailabilityCounter";

// ─── Fallback data (used when Sanity doc not yet populated) ──────────────────

const INTERIOR_IMAGES = [
  "/images/andoyi/interior1.jpeg",
  "/images/andoyi/interior2.jpeg",
  "/images/andoyi/interior3.jpeg",
  "/images/andoyi/interior4.jpeg",
  "/images/andoyi/interior5.jpeg",
];

const DEFAULT_CLIPS = [
  { src: "/videos/drone.mp4",  thumbUrl: "/images/andoyi/5.png",           label: "Drone — Aerial View" },
  { src: "/videos/hero1.mp4",  thumbUrl: "/images/andoyi/2.png",           label: "Overview"             },
  { src: "/videos/hero2.mp4",  thumbUrl: "/images/andoyi/3.png",           label: "Exterior"             },
  { src: "/videos/hero3.mp4",  thumbUrl: "/images/andoyi/4.png",           label: "Walkthrough"          },
  { src: "/videos/hero4.mp4",  thumbUrl: "/images/andoyi/2.png",           label: "Site & Surrounds"     },
  { src: "/videos/int1.mp4",   thumbUrl: "/images/andoyi/interior1.jpeg",  label: "Bedroom — Angle 1"   },
  { src: "/videos/int2.mp4",   thumbUrl: "/images/andoyi/interior2.jpeg",  label: "Bedroom — Angle 2"   },
];
const DEFAULT_STATS = [
  { label: "Total Units", value: "88" },
  { label: "Lease Term", value: "25 Years" },
  { label: "Completion", value: "Apr 2027" },
  { label: "Lease End", value: "Mar 2052" },
];
const DEFAULT_HIGHLIGHTS = [
  "Fibre optic broadband in every unit",
  "Optimised for short-let & long-term rental",
  "25-year structured lease with income rights",
  "Resale flexibility included",
  "Located in Lagos' tech & innovation hub",
  "Contemporary design with premium finishes",
];
const DEFAULT_GALLERY = ["/images/andoyi/2.png", "/images/andoyi/3.png", "/images/andoyi/4.png"];

// ─── Props ───────────────────────────────────────────────────────────────────

interface Clip { src: string; thumbUrl: string; label: string; }
interface Stat { label: string; value: string; }

export interface AndoyiProjectData {
  title?: string;
  type?: string;
  location?: string;
  year?: string;
  units?: string;
  status?: string;
  shortDesc?: string;
  leaseNote?: string;
  heroVideoUrl?: string;
  galleryUrls?: string[];
  videoClips?: Clip[];
  stats?: Stat[];
  highlights?: string[];
}

interface Props { project: AndoyiProjectData | null; }

// ─── Component ───────────────────────────────────────────────────────────────

export default function AndoyiContent({ project }: Props) {
  const clips = project?.videoClips?.length ? project.videoClips : DEFAULT_CLIPS;
  const stats = project?.stats?.length ? project.stats : DEFAULT_STATS;
  const highlights = project?.highlights?.length ? project.highlights : DEFAULT_HIGHLIGHTS;
  const gallery = project?.galleryUrls?.length ? project.galleryUrls : DEFAULT_GALLERY;

  const title = project?.title ?? "Andoyi House";
  const type = project?.type ?? "Smart Studio Apartments";
  const location = project?.location ?? "Yaba, Lagos";
  const year = project?.year ?? "2025–2027";
  const units = project?.units ?? "88 Units";
  const status = project?.status ?? "Under Construction";
  const shortDesc = project?.shortDesc ?? "Designed for professionals, entrepreneurs, and remote workers seeking efficient, connected living within Lagos' innovation ecosystem.";
  const leaseNote = project?.leaseNote ?? "Lease: April 2027 – March 2052";
  const heroVideo = project?.heroVideoUrl ?? "/videos/hero.mp4";

  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  function openLightbox(i: number) { setLightboxIndex(i); setLightboxOpen(true); }
  function lbPrev() { setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length); }
  function lbNext() { setLightboxIndex((i) => (i + 1) % gallery.length); }

  const [intLbOpen, setIntLbOpen] = useState(false);
  const [intLbIdx, setIntLbIdx] = useState(0);
  function openInteriorLb(i: number) { setIntLbIdx(i); setIntLbOpen(true); }
  function intLbPrev() { setIntLbIdx((i) => (i - 1 + INTERIOR_IMAGES.length) % INTERIOR_IMAGES.length); }
  function intLbNext() { setIntLbIdx((i) => (i + 1) % INTERIOR_IMAGES.length); }

  function switchClip(i: number) {
    setActive(i);
    if (videoRef.current) { videoRef.current.load(); videoRef.current.play().catch(() => {}); }
  }

  return (
    <>
      {/* ── VIDEO HERO ───────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
        <motion.div style={{ y: imgY }} className="absolute inset-0">
          <video
            src={heroVideo}
            autoPlay muted loop playsInline preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

        <div className="absolute top-28 left-6 md:left-12 lg:left-24 z-20">
          <Link href="/projects" className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/70 font-body font-semibold hover:text-primary transition-colors duration-200">
            <ArrowLeft size={13} /> All Projects
          </Link>
        </div>

        <motion.div style={{ y: textY, opacity: heroOpacity }} className="relative z-10 w-full section-padding pb-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <span className="gold-gradient inline-block px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-body font-semibold text-primary-foreground rounded-sm mb-5">
                {status}
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight">{title}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-white/70 font-body text-sm">
                <span className="flex items-center gap-1.5"><MapPin size={13} className="text-primary" /> {location}</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>{type}</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>{units}</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>{year}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── VIDEO GALLERY + DETAILS ──────────────────────────────────────── */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-14 items-start">
          <AnimatedSection>
            <div className="relative aspect-video overflow-hidden rounded-sm bg-black">
              <video ref={videoRef} key={clips[active].src} src={clips[active].src} autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover" />
              <span className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary pointer-events-none" />
              <span className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary pointer-events-none" />
              <span className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary pointer-events-none" />
              <span className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary pointer-events-none" />
              <div className="absolute bottom-4 right-4">
                <span className="bg-black/65 backdrop-blur-sm border border-white/20 px-3 py-1 text-[10px] tracking-[0.15em] uppercase text-white/90 font-body font-semibold rounded-sm">
                  {clips[active].label}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {clips.map((c, i) => (
                <button key={i} onClick={() => switchClip(i)} className={`relative aspect-video overflow-hidden rounded-sm border-2 transition-all duration-200 focus:outline-none group ${active === i ? "border-primary" : "border-transparent opacity-50 hover:opacity-90 hover:border-primary/40"}`}>
                  <img src={c.thumbUrl} alt={c.label} className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 flex flex-col items-center justify-center gap-1 transition-colors ${active === i ? "bg-black/25" : "bg-black/55 group-hover:bg-black/35"}`}>
                    {active !== i && <Play size={14} className="text-white" fill="white" />}
                    <span className="text-[9px] tracking-[0.1em] uppercase text-white font-body font-semibold leading-none">{c.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-body font-semibold mb-1">{type}</p>
            <h2 className="font-display text-3xl font-bold text-foreground mt-1">Project Overview</h2>
            <p className="mt-6 text-base text-foreground/80 font-body leading-relaxed">{shortDesc}</p>
            <p className="mt-4 text-base text-foreground/80 font-body leading-relaxed">
              Fully wired with fibre optic internet and optimised for short-let and long-term rental investment. Structured on a 25-year lease model with rental income rights and resale flexibility.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="border border-border bg-card rounded-sm px-4 py-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-body mb-1">{s.label}</p>
                  <p className="font-display text-xl font-bold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs tracking-[0.15em] uppercase text-primary font-body font-semibold">{leaseNote}</p>
            </div>
            <div className="mt-5">
              <AvailabilityCounter total={88} remaining={24} />
            </div>
            <Link href="/contact" className="group mt-8 inline-flex items-center gap-2 px-7 py-3.5 gold-gradient text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-sm hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20">
              Enquire Now <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── HIGHLIGHTS ───────────────────────────────────────────────────── */}
      <section className="section-padding bg-card">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-body font-semibold mb-3">Why Andoyi House</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Built for the<br /><span className="gold-gradient-text">Modern Investor.</span>
            </h2>
            <p className="mt-6 text-base text-foreground/80 font-body leading-relaxed">
              Every detail has been designed to maximise comfort for residents and returns for investors — from fibre infrastructure to structured lease agreements.
            </p>
            <ul className="mt-8 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-foreground/80 font-body">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />{h}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => openInteriorLb(0)}
                className="col-span-2 aspect-[16/9] overflow-hidden rounded-sm cursor-zoom-in group relative border border-transparent hover:border-primary/50 transition-colors duration-300"
              >
                <img src={INTERIOR_IMAGES[0]} alt="Andoyi House Interior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-400" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-11 h-11 rounded-full gold-gradient flex items-center justify-center shadow-lg shadow-primary/30">
                    <ZoomIn size={18} className="text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-black/55 backdrop-blur-sm border border-primary/30 px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-body font-semibold text-primary rounded-sm">Living Area</span>
                </div>
              </div>
              {[INTERIOR_IMAGES[1], INTERIOR_IMAGES[2]].map((src, i) => (
                <div
                  key={i}
                  onClick={() => openInteriorLb(i + 1)}
                  className="aspect-square overflow-hidden rounded-sm cursor-zoom-in group relative border border-transparent hover:border-primary/50 transition-colors duration-300"
                >
                  <img src={src} alt={`Andoyi House Interior ${i + 2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-400" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-11 h-11 rounded-full gold-gradient flex items-center justify-center shadow-lg shadow-primary/30">
                      <ZoomIn size={18} className="text-primary-foreground" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* ── INTERIOR SPACES ──────────────────────────────────────────────── */}
      <section className="section-padding bg-[hsl(var(--charcoal))] overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-body font-semibold mb-3">Interior Gallery</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
                  Step Inside<br />
                  <span className="gold-gradient-text">Andoyi House.</span>
                </h2>
              </div>
              <p className="text-base text-white/50 font-body leading-relaxed max-w-xs md:max-w-sm">
                Premium finishes, natural light, and intelligently designed spaces &mdash; crafted for modern urban living.
              </p>
            </div>
          </AnimatedSection>

          {/* Top: large left + medium right */}
          <div className="grid grid-cols-5 gap-3 mb-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65 }}
              className="col-span-3 aspect-[4/3] overflow-hidden rounded-sm cursor-zoom-in group relative"
              onClick={() => openInteriorLb(0)}
            >
              <img src={INTERIOR_IMAGES[0]} alt="Living Area" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-400" />
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary/80 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center shadow-xl shadow-primary/40">
                  <ZoomIn size={18} className="text-primary-foreground" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}
              className="col-span-2 aspect-[4/3] overflow-hidden rounded-sm cursor-zoom-in group relative"
              onClick={() => openInteriorLb(1)}
            >
              <img src={INTERIOR_IMAGES[1]} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-400" />
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary/80 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center shadow-xl shadow-primary/40">
                  <ZoomIn size={18} className="text-primary-foreground" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom: 3 equal images */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { img: INTERIOR_IMAGES[2], label: "", idx: 2 },
              { img: INTERIOR_IMAGES[3], label: "", idx: 3 },
              { img: INTERIOR_IMAGES[4], label: "", idx: 4 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="aspect-[4/3] overflow-hidden rounded-sm cursor-zoom-in group relative"
                onClick={() => openInteriorLb(item.idx)}
              >
                <img src={item.img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-400" />
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary/80 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-11 h-11 rounded-full gold-gradient flex items-center justify-center shadow-xl shadow-primary/40">
                    <ZoomIn size={18} className="text-primary-foreground" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX — exterior renders ──────────────────────────────────── */}
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
      {/* ── LIGHTBOX — interiors ─────────────────────────────────────────── */}
      <ImageLightbox
        images={INTERIOR_IMAGES}
        index={intLbIdx}
        isOpen={intLbOpen}
        onClose={() => setIntLbOpen(false)}
        onNext={intLbNext}
        onPrev={intLbPrev}
        onSelect={setIntLbIdx}
        title="Andoyi House — Interiors"
      />
      <StickyCTABar projectName="Andoyi House" />
      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-foreground">
        <div className="max-w-[800px] mx-auto text-center">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-body font-semibold mb-4">Invest in Andoyi</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-background leading-tight">Secure Your Unit Today</h2>
            <p className="mt-5 text-base text-background/70 font-body leading-relaxed max-w-xl mx-auto">
              A limited number of units are available. Speak with our team to understand investment structure and returns.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 gold-gradient text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-sm hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20">
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
