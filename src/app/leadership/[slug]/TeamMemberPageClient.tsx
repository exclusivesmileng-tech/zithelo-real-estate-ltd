"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Globe, Users } from "lucide-react";

// Brand SVGs not in lucide-react 1.x
const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.74-8.867L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import { TEAM } from "@/lib/team-data";
import AnimatedSection from "@/components/AnimatedSection";

/* ─── Animated vector placeholder when no headshot is available ─── */
function PersonPlaceholderVector() {
  const GOLD = "hsl(43,81%,61%)";
  return (
    <motion.div
      className="absolute right-0 top-0 w-full md:w-[48%] lg:w-[44%] h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
    >
      {/* Same gradient fades as the photo panel */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0906] via-[#0a0906]/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0906] via-transparent to-[#0a0906]/30 z-10 pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center p-8">
        <svg
          viewBox="0 0 400 560"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ maxWidth: 380, maxHeight: 550 }}
        >
          <defs>
            <radialGradient id="ppv-headGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.12" />
              <stop offset="100%" stopColor="white" stopOpacity="0.02" />
            </radialGradient>
            <radialGradient id="ppv-bgGlow" cx="50%" cy="38%" r="58%">
              <stop offset="0%" stopColor={GOLD} stopOpacity="0.1" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Subtle warm glow at figure centre */}
          <ellipse cx="200" cy="265" rx="200" ry="230" fill="url(#ppv-bgGlow)" />

          {/* Outer slow-rotating ring */}
          <motion.circle
            cx="200" cy="265" r="228"
            stroke={GOLD} strokeWidth="0.5" strokeDasharray="5 22"
            style={{ transformOrigin: "200px 265px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            opacity={0.14}
          />
          {/* Mid counter-ring */}
          <motion.circle
            cx="200" cy="265" r="178"
            stroke={GOLD} strokeWidth="0.4" strokeDasharray="3 20"
            style={{ transformOrigin: "200px 265px" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            opacity={0.11}
          />
          {/* Inner orbit */}
          <motion.circle
            cx="200" cy="265" r="120"
            stroke={GOLD} strokeWidth="0.7" strokeDasharray="7 13"
            style={{ transformOrigin: "200px 265px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
            opacity={0.22}
          />

          {/* Cross-hair lines */}
          <motion.line
            x1="22" y1="265" x2="378" y2="265"
            stroke={GOLD} strokeWidth="0.35"
            animate={{ opacity: [0.06, 0.14, 0.06] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.line
            x1="200" y1="28" x2="200" y2="492"
            stroke={GOLD} strokeWidth="0.35"
            animate={{ opacity: [0.06, 0.14, 0.06] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />

          {/* ── FIGURE ── */}

          {/* Head — background glow */}
          <motion.circle
            cx="200" cy="155" r="80"
            fill="url(#ppv-headGlow)"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
            style={{ transformOrigin: "200px 155px" }}
          />
          {/* Head — main circle, slowly breathing */}
          <motion.circle
            cx="200" cy="155" r="64"
            stroke="rgba(255,255,255,0.22)" strokeWidth="1.5"
            fill="rgba(255,255,255,0.04)"
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: [1, 1.018, 1], opacity: 1 }}
            transition={{
              scale: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
              opacity: { duration: 1, delay: 0.7 },
            }}
            style={{ transformOrigin: "200px 155px" }}
          />
          {/* Head — inner rotating dashed ring */}
          <motion.circle
            cx="200" cy="155" r="50"
            stroke={GOLD} strokeWidth="0.5" strokeDasharray="4 16" fill="none"
            style={{ transformOrigin: "200px 155px" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            opacity={0.28}
          />

          {/* Neck */}
          <motion.line
            x1="200" y1="219" x2="200" y2="250"
            stroke="rgba(255,255,255,0.14)" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          />
          {/* Shoulders — inner arc (white, drawn-on) */}
          <motion.path
            d="M 60,400 C 66,322 130,254 200,252 C 270,254 334,322 340,400"
            stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 1.2, ease: "easeOut" }}
          />
          {/* Shoulders — outer gold arc */}
          <motion.path
            d="M 40,424 C 46,338 116,254 200,252 C 284,254 354,338 360,424"
            stroke={GOLD} strokeWidth="0.5" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 1.8, delay: 1.5, ease: "easeOut" }}
          />
          {/* Centre spine */}
          <motion.line
            x1="200" y1="252" x2="200" y2="460"
            stroke="rgba(255,255,255,0.07)" strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
          />

          {/* ── Viewfinder corner marks ── */}
          <path d="M 24,44 L 24,20 L 50,20" stroke={GOLD} strokeWidth="1" opacity="0.3" fill="none" />
          <path d="M 350,20 L 376,20 L 376,44" stroke={GOLD} strokeWidth="1" opacity="0.3" fill="none" />
          <path d="M 24,492 L 24,516 L 50,516" stroke={GOLD} strokeWidth="1" opacity="0.3" fill="none" />
          <path d="M 350,516 L 376,516 L 376,492" stroke={GOLD} strokeWidth="1" opacity="0.3" fill="none" />

          {/* ── Floating particles ── */}
          {(
            [
              [92, 208, 1.5, 0,   4.2],
              [308, 202, 1.5, 0.6, 3.8],
              [135, 322, 2,   1.1, 5.0],
              [265, 318, 2,   0.4, 4.5],
              [70,  392, 1.5, 0.9, 4.8],
              [330, 388, 1.5, 1.4, 4.2],
              [156, 435, 1.5, 0.7, 5.2],
              [244, 432, 1.5, 1.0, 3.9],
            ] as [number, number, number, number, number][]
          ).map(([cx, cy, r, delay, dur], i) => (
            <motion.circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill={GOLD}
              animate={{ opacity: [0, 0.55, 0], y: [-5, 0, -5] }}
              transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </svg>
      </div>
    </motion.div>
  );
}

export default function TeamMemberPageClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const member = TEAM.find((m) => m.slug === slug);
  if (!member) notFound();

  const backHref = member.category === "Board" ? "/leadership/board" : "/leadership/management";
  const backLabel = member.category === "Board" ? "Board & Governance" : "Management Team";

  return (
    <>
      {/* ═══════════════════════════════════════
          HERO — split layout with headshot
      ═══════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0a0906]">

        {/* ── Animated SVG geometry background ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large rotating ring — top right */}
          <motion.svg
            className="absolute -top-40 -right-40 w-[700px] h-[700px] opacity-[0.055]"
            viewBox="0 0 700 700"
            fill="none"
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="350" cy="350" r="320" stroke="hsl(43 81% 61%)" strokeWidth="1" strokeDasharray="8 16" />
            <circle cx="350" cy="350" r="260" stroke="hsl(43 81% 61%)" strokeWidth="0.5" />
            <circle cx="350" cy="350" r="180" stroke="hsl(43 81% 61%)" strokeWidth="1" strokeDasharray="4 20" />
          </motion.svg>

          {/* Counter-rotating ring — bottom left */}
          <motion.svg
            className="absolute -bottom-56 -left-28 w-[520px] h-[520px] opacity-[0.04]"
            viewBox="0 0 520 520"
            fill="none"
            animate={{ rotate: -360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="260" cy="260" r="240" stroke="hsl(43 81% 61%)" strokeWidth="1" strokeDasharray="6 18" />
            <circle cx="260" cy="260" r="160" stroke="hsl(43 81% 61%)" strokeWidth="0.5" />
          </motion.svg>

          {/* Slow-drifting diagonal lines */}
          <motion.svg
            className="absolute inset-0 w-full h-full opacity-[0.025]"
            viewBox="0 0 1400 900"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          >
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1={-100 + i * 130}
                y1="0"
                x2={300 + i * 130}
                y2="900"
                stroke="hsl(43 81% 61%)"
                strokeWidth="0.75"
              />
            ))}
          </motion.svg>

          {/* Fine grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(43 81% 61%) 1px, transparent 1px), linear-gradient(90deg, hsl(43 81% 61%) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />

          {/* Radial gold glow — right */}
          <div
            className="absolute top-0 right-0 w-[55vw] h-full opacity-[0.07] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 80% 30%, hsl(43 81% 61%), transparent 65%)" }}
          />
          {/* Radial glow — bottom left */}
          <div
            className="absolute bottom-0 left-0 w-[40vw] h-[60%] opacity-[0.05] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 20% 80%, hsl(43 81% 61%), transparent 65%)" }}
          />
        </div>

        {/* ── Headshot panel — right half ── */}
        {member.photo ? (
          <div className="absolute right-0 top-0 w-full md:w-[48%] lg:w-[44%] h-full">
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover object-top"
            />
            {/* Fade into dark left */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0906] via-[#0a0906]/60 to-transparent" />
            {/* Fade into dark bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0906] via-transparent to-[#0a0906]/40" />
          </div>
        ) : (
          <PersonPlaceholderVector />
        )}

        {/* ── Left content ── */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pb-28 pt-32">

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-sm tracking-[0.12em] uppercase font-body font-semibold text-white/40 hover:text-primary transition-colors duration-200 mb-14"
            >
              <ArrowLeft size={12} />
              {backLabel}
            </Link>
          </motion.div>

          <div className="max-w-[600px]">
            {/* Category pill */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-sm tracking-[0.12em] uppercase text-primary font-body font-semibold mb-6 inline-flex items-center gap-3"
            >
              <span className="w-6 h-px bg-primary" />
              {member.category === "Board" ? "Board & Governance" : "Management Team"}
              <span className="w-6 h-px bg-primary" />
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-4"
            >
              {member.name}
            </motion.h1>

            {/* Gold rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
              className="h-[2px] w-20 gold-gradient mb-5"
            />

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-sm md:text-base tracking-[0.1em] uppercase text-primary/70 font-body font-semibold mb-8"
            >
              {member.role}
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base md:text-lg text-white/55 font-body leading-relaxed mb-10 max-w-[480px]"
            >
              {member.tagline}
            </motion.p>

            {/* Social media icons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex items-center gap-3"
            >
              <a
                href="#"
                aria-label="LinkedIn"
                className="group w-10 h-10 flex items-center justify-center border border-white/15 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
              >
                <span className="text-white/40 group-hover:text-primary transition-colors duration-300">
                  <LinkedInIcon />
                </span>
              </a>
              <a
                href="#"
                aria-label="Twitter / X"
                className="group w-10 h-10 flex items-center justify-center border border-white/15 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
              >
                <span className="text-white/40 group-hover:text-primary transition-colors duration-300">
                  <XIcon />
                </span>
              </a>
              <a
                href="#"
                aria-label="Website"
                className="group w-10 h-10 flex items-center justify-center border border-white/15 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
              >
                <Globe size={14} className="text-white/40 group-hover:text-primary transition-colors duration-300" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Diagonal gold separator */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none" style={{ height: "80px" }}>
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="diagGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(40,85%,45%)" stopOpacity="0.9" />
                <stop offset="40%" stopColor="hsl(45,78%,70%)" stopOpacity="1" />
                <stop offset="70%" stopColor="hsl(43,81%,61%)" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(40,85%,45%)" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {/* Background fill below the diagonal */}
            <polygon
              points="0,80 1440,80 1440,28 0,72"
              fill="hsl(var(--background))"
            />
            {/* Gold diagonal line */}
            <line x1="0" y1="72" x2="1440" y2="28" stroke="url(#diagGold)" strokeWidth="2" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BODY — Bio + Credentials
      ═══════════════════════════════════════ */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto">

          {/* ── Pull-quote tagline ── */}
          <AnimatedSection>
            <div className="relative mb-20 pl-8 border-l-[3px] border-primary max-w-3xl">
              {/* Decorative open-quote mark */}
              <span
                aria-hidden="true"
                className="absolute -top-6 -left-2 font-display text-[7rem] leading-none text-primary/10 select-none pointer-events-none"
              >
                &ldquo;
              </span>
              <p className="font-display text-2xl md:text-3xl lg:text-[2rem] font-semibold text-foreground leading-[1.5] italic">
                {member.tagline}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">

            {/* ── Bio — 3/5 ── */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <p className="text-sm tracking-[0.12em] uppercase text-primary font-body font-semibold mb-8 inline-flex items-center gap-3">
                  <span className="w-6 h-px bg-primary" />
                  Full Biography
                </p>
                <p className="font-body text-lg md:text-xl text-foreground leading-[1.9] [&>*]:mb-6">
                  {member.bio}
                </p>
              </AnimatedSection>
            </div>

            {/* ── Sidebar — 2/5 ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Credentials */}
              {member.credentials && member.credentials.length > 0 && (
                <AnimatedSection delay={0.15}>
                  <div className="relative overflow-hidden bg-[#0a0906] p-8 md:p-10">
                    {/* Top gold bar */}
                    <div className="absolute top-0 left-0 w-full h-[3px] gold-gradient" />
                    {/* Corner glow */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/8 blur-[50px] pointer-events-none" />

                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 gold-gradient flex items-center justify-center shrink-0">
                        <Award size={14} className="text-primary-foreground" />
                      </div>
                      <p className="text-sm tracking-[0.12em] uppercase text-primary font-body font-semibold">
                        Credentials &amp; Qualifications
                      </p>
                    </div>

                    <ol className="space-y-5">
                      {member.credentials.map((c, idx) => (
                        <li key={c} className="flex items-start gap-4">
                          {/* Number badge */}
                          <span className="shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center border border-primary/40 text-[10px] font-display font-bold text-primary leading-none">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[15px] font-body text-white/80 leading-snug">
                            {c}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </AnimatedSection>
              )}

              {/* Back to team CTA */}
              <AnimatedSection delay={0.25}>
                <div className="relative overflow-hidden border border-border bg-card p-8 md:p-10 group hover:border-primary/40 transition-colors duration-300">
                  <div className="absolute top-0 left-0 w-full h-[2px] gold-gradient opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center mb-6">
                    <Users size={16} className="text-primary" />
                  </div>

                  <p className="font-display text-xl font-bold text-foreground mb-3">
                    Meet the Full Team
                  </p>
                  <p className="text-base text-muted-foreground font-body leading-relaxed mb-7">
                    Explore the full leadership driving Zithelo&apos;s vision across Africa — from board governance to operational execution.
                  </p>
                  <Link
                    href={backHref}
                    className="group/btn inline-flex items-center gap-3 px-6 py-3 gold-gradient text-primary-foreground font-body font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity duration-300"
                  >
                    View {backLabel}
                    <ArrowLeft size={13} className="rotate-180 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </AnimatedSection>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
