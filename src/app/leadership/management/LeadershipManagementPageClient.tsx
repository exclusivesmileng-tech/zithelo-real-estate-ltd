"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Award, ChevronDown, Briefcase } from "lucide-react";
import { TEAM } from "@/lib/team-data";
import PageHero from "@/components/PageHero";
import ManagementHeroVector from "@/components/heroes/ManagementHeroVector";

const ceo = TEAM.filter((m) => m.role === "Chief Executive Officer");
const mgmt = [...ceo, ...TEAM.filter((m) => m.category === "Management")];
const ease = [0.25, 0.46, 0.45, 0.94] as const;

const OPEN_ROLES = [
  { role: "Head, Finance", desc: "Leading the Group's financial strategy, reporting, and investment structuring functions." },
  { role: "Lead Sales Consultant", desc: "Leading sales strategy and client acquisition across the Group's development portfolio." },
];

function BioAccordion({ member, index }: { member: typeof mgmt[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease }}
      className="border-t border-border"
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={open}
      >
        <div className="flex items-center gap-5">
          <span className="font-display text-[2rem] font-bold text-primary/15 select-none leading-none w-10 text-right shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
              {member.name}
            </p>
            <p className="text-xs tracking-[0.15em] uppercase text-primary font-body font-semibold mt-1">
              {member.role}
            </p>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="bio"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <div className="pb-10 pl-[60px] pr-4 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
              <p className="font-body text-base text-muted-foreground leading-[1.9]">{member.bio}</p>
              {member.credentials && member.credentials.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Award size={13} className="text-primary" />
                    <span className="text-xs tracking-[0.2em] uppercase text-primary font-body font-semibold">Credentials</span>
                  </div>
                  <ul className="space-y-2.5">
                    {member.credentials.map((c) => (
                      <li key={c} className="flex items-start gap-3 font-body text-base text-muted-foreground">
                        <span className="mt-[9px] shrink-0 w-[5px] h-[5px] bg-primary rotate-45 block" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LeadershipManagementPageClient() {
  return (
    <>
      {/* ── HERO ── */}
      <PageHero
        title="Management"
        titleAccent="Built to Execute."
        subtitle="Operational strength and execution across the Group."
        image="/images/about-hero.jpg"
        breadcrumb="Management"
        vector={<ManagementHeroVector />}
      />

      {/* ── INTRO STRIP ── */}
      <section className="bg-card border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-primary font-body font-semibold mb-3 inline-flex items-center gap-3">
              <span className="w-6 h-px bg-primary" />
              Executive Management
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Operations &amp; <span className="gold-gradient-text">Delivery</span>
            </h2>
          </div>
          <p className="font-body text-base text-muted-foreground max-w-md leading-relaxed">
            The people responsible for translating Zithelo&apos;s strategy into results — across projects,
            people, customer experience, and commercial growth.
          </p>
        </div>
      </section>

      {/* ── TEAM CARDS — One per row, alternating photo side ── */}
      <section className="bg-background py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 space-y-4">
          {mgmt.map((m, i) => {
            const isCEO   = i === 0;
            const photoLeft = i % 2 === 0;

            const gridClass = isCEO
              ? "grid grid-cols-1 md:grid-cols-[420px_1fr]"
              : photoLeft
                ? "grid grid-cols-1 md:grid-cols-[360px_1fr]"
                : "grid grid-cols-1 md:grid-cols-[1fr_360px]";

            const photo = (
              <div className="relative overflow-hidden bg-muted min-h-[320px] md:min-h-full">
                <Link href={`/leadership/${m.slug}`} className="absolute inset-0 block" tabIndex={-1} aria-hidden="true">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-display text-[7rem] font-bold text-primary/10 select-none leading-none">{m.initials}</span>
                    </div>
                  )}
                </Link>
                {isCEO   && <div className="absolute top-0 left-0 right-0 h-[3px] gold-gradient pointer-events-none" />}
                {!isCEO  && <div className="absolute top-0 left-0 right-0 h-[3px] gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />}
              </div>
            );

            const content = (
              <div className={`flex flex-col justify-center bg-background ${isCEO ? "px-10 md:px-14 py-14" : "px-8 md:px-12 py-10"}`}>
                <p className="text-[10px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-4 inline-flex items-center gap-2">
                  <span className="w-5 h-px bg-primary" />
                  {isCEO ? "Chief Executive Officer" : "Management Team"}
                </p>
                <Link href={`/leadership/${m.slug}`}>
                  <h2 className={`font-display font-bold text-foreground leading-[1.05] mb-2 group-hover:text-primary transition-colors duration-300 ${isCEO ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"}`}>
                    {m.name}
                  </h2>
                </Link>
                <p className="text-xs tracking-[0.12em] uppercase text-primary/80 font-body font-semibold mb-6">{m.role}</p>
                <div className={`h-[2px] gold-gradient mb-6 ${isCEO ? "w-14" : "w-10"}`} />
                <p className={`font-body text-muted-foreground leading-[1.9] mb-8 max-w-lg ${isCEO ? "text-base" : "text-sm"}`}>
                  {m.tagline}
                </p>
                {m.credentials && m.credentials.length > 0 && (
                  <ul className="flex flex-wrap gap-2 mb-8">
                    {m.credentials.slice(0, isCEO ? 3 : 2).map((c) => (
                      <li key={c} className="px-3 py-1.5 text-xs font-body text-muted-foreground border border-border bg-card leading-snug">{c}</li>
                    ))}
                  </ul>
                )}
                <Link
                  href={`/leadership/${m.slug}`}
                  className="group/btn inline-flex items-center gap-2 font-body font-semibold text-sm text-foreground hover:text-primary transition-colors duration-300 w-fit"
                >
                  <span className="relative">
                    View Full Biography
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary group-hover/btn:w-full transition-all duration-300" />
                  </span>
                  <ArrowUpRight size={13} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </div>
            );

            return (
              <motion.div
                key={m.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className={`group ${gridClass} gap-0 border border-border overflow-hidden hover:border-primary/40 transition-colors duration-300`}
              >
                {photoLeft ? <>{photo}{content}</> : <>{content}{photo}</>}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── BIOGRAPHY ACCORDION ── */}
      <section className="bg-card border-t border-border py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-xs tracking-[0.25em] uppercase text-primary font-body font-semibold mb-12 inline-flex items-center gap-3">
            <span className="w-6 h-px bg-primary" />
            Full Biographies
          </p>
          {mgmt.map((member, i) => (
            <BioAccordion key={member.slug} member={member} index={i} />
          ))}
          <div className="border-t border-border" />
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section className="bg-background border-t border-border py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="mb-12">
            <p className="text-xs tracking-[0.25em] uppercase text-primary font-body font-semibold mb-3 inline-flex items-center gap-3">
              <span className="w-6 h-px bg-primary" />
              Positions Being Recruited
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Upcoming <span className="gold-gradient-text">Roles</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OPEN_ROLES.map((r, i) => (
              <motion.div
                key={r.role}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="border border-dashed border-border bg-card px-8 py-8 flex gap-5 items-start"
              >
                <div className="shrink-0 w-10 h-10 border border-primary/30 flex items-center justify-center mt-0.5">
                  <Briefcase size={14} className="text-primary/60" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-foreground mb-2">{r.role}</p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                  <p className="text-xs tracking-[0.18em] uppercase text-primary/60 font-body font-semibold mt-4">
                    Recruiting Soon
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NAV TO BOARD ── */}
      <section className="bg-card border-t border-border px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-primary font-body font-semibold mb-4 inline-flex items-center gap-3">
              <span className="w-6 h-px bg-primary" />
              Also Explore
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Board &amp; <span className="gold-gradient-text">Governance</span>
            </h3>
            <p className="text-base text-muted-foreground font-body max-w-lg leading-relaxed">
              Meet the board providing strategic oversight and long-term direction.
            </p>
          </div>
          <Link
            href="/leadership/board"
            className="group shrink-0 inline-flex items-center gap-3 px-8 py-4 gold-gradient text-primary-foreground font-body font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity duration-300"
          >
            View Board Members
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
