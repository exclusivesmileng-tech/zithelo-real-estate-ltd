"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Award, ChevronDown } from "lucide-react";
import { TEAM } from "@/lib/team-data";
import PageHero from "@/components/PageHero";
import BoardHeroVector from "@/components/heroes/BoardHeroVector";

const board = TEAM.filter((m) => m.category === "Board");
const ease = [0.25, 0.46, 0.45, 0.94] as const;

function CredentialList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.slice(0, 4).map((c) => (
        <li key={c} className="flex items-start gap-3 font-body text-sm text-muted-foreground">
          <span className="mt-[7px] shrink-0 w-[5px] h-[5px] bg-primary rotate-45 block" />
          {c}
        </li>
      ))}
    </ul>
  );
}

function BioAccordion({ member, index }: { member: typeof board[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease }}
      className="border-t border-border"
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={open}
      >
        <div className="flex items-center gap-5">
          <span className="font-display text-[2rem] font-bold text-primary/15 select-none leading-none w-10 text-right">
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
                    <Award size={12} className="text-primary" />
                    <span className="text-xs tracking-[0.2em] uppercase text-primary font-body font-semibold">Credentials</span>
                  </div>
                  <CredentialList items={member.credentials} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LeadershipBoardPage() {
  const featured = board[0];
  const rest = board.slice(1);

  return (
    <>
      {/* ── HERO ── */}
      <PageHero
        title="Board"
        titleAccent="Governance & Vision."
        subtitle="Governance, strategy, and long-term value creation."
        image="/images/about-hero.jpg"
        breadcrumb="Board"
        vector={<BoardHeroVector />}
      />

      {/* ── INTRO STRIP ── */}
      <section className="bg-card border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-primary font-body font-semibold mb-3 inline-flex items-center gap-3">
              <span className="w-6 h-px bg-primary" />
              Governance Layer
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Board &amp; <span className="gold-gradient-text">Governance</span>
            </h2>
          </div>
          <p className="font-body text-base text-muted-foreground max-w-md leading-relaxed">
            Zithelo&apos;s board brings deep expertise across development, investment, and governance —
            anchored in disciplined execution and long-term value creation.
          </p>
        </div>
      </section>

      {/* ── FEATURED CHAIRMAN ── */}
      <section className="bg-background py-0">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-20"
        >
          <div className="group grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="relative overflow-hidden"
              style={{ aspectRatio: "4 / 5" }}
            >
              {featured.photo ? (
                <img
                  src={featured.photo}
                  alt={featured.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full bg-card flex items-center justify-center">
                  <span className="font-display text-[10rem] font-bold text-primary/10 select-none leading-none">
                    {featured.initials}
                  </span>
                </div>
              )}
              {/* Gold accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] gold-gradient" />
              {/* Index watermark */}
              <span className="absolute bottom-5 right-5 font-display text-[4rem] font-bold text-foreground/[0.05] leading-none select-none">
                01
              </span>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              <p className="text-xs tracking-[0.22em] uppercase text-primary font-body font-semibold mb-6 inline-flex items-center gap-2">
                <span className="w-4 h-px bg-primary" />
                Board Chairman
              </p>
              <Link href={`/leadership/${featured.slug}`}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-foreground leading-[1.05] mb-3 hover:text-primary transition-colors duration-300">
                  {featured.name}
                </h2>
              </Link>
              <p className="text-sm tracking-[0.1em] uppercase text-primary font-body font-semibold mb-8">
                {featured.role}
              </p>
              <div className="h-[2px] w-14 gold-gradient mb-8" />
              <p className="font-body text-lg text-muted-foreground leading-[1.9] mb-10 max-w-[520px]">
                {featured.tagline}
              </p>
              {featured.credentials && featured.credentials.length > 0 && (
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-5">
                    <Award size={12} className="text-primary" />
                    <span className="text-xs tracking-[0.2em] uppercase text-primary font-body font-semibold">Key Credentials</span>
                  </div>
                  <CredentialList items={featured.credentials} />
                </div>
              )}
              <Link
                href={`/leadership/${featured.slug}`}
                className="group/btn inline-flex items-center gap-3 font-body font-semibold text-base text-foreground hover:text-primary transition-colors duration-300"
              >
                <span className="relative">
                  View Full Biography
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary group-hover/btn:w-full transition-all duration-300" />
                </span>
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── 2-UP PORTRAIT CARDS ── */}
      <section className="bg-card border-t border-border py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rest.map((member, i) => (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease }}
                className="group bg-background border border-border overflow-hidden flex flex-col hover:border-primary/40 transition-colors duration-300"
              >
                {/* Photo */}
                <Link
                  href={`/leadership/${member.slug}`}
                  className="relative overflow-hidden block"
                  style={{ aspectRatio: "4 / 3" }}
                >
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="font-display text-[6rem] font-bold text-primary/10 select-none leading-none">
                        {member.initials}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute top-0 left-0 right-0 h-[3px] gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <span className="absolute top-4 left-4 font-display text-xs font-bold text-foreground/20 tracking-widest">
                    0{i + 2}
                  </span>
                </Link>

                {/* Content */}
                <div className="px-8 pt-7 pb-9 flex flex-col flex-1">
                  <Link href={`/leadership/${member.slug}`}>
                    <h3 className="font-display text-2xl font-bold text-foreground leading-[1.1] mb-2 group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                  </Link>
                  <p className="text-sm tracking-[0.1em] uppercase text-primary font-body font-semibold mb-5">
                    {member.role}
                  </p>
                  <div className="h-px bg-border mb-6" />
                  <p className="font-body text-base text-muted-foreground leading-[1.85] mb-8 flex-1">
                    {member.tagline}
                  </p>
                  <Link
                    href={`/leadership/${member.slug}`}
                    className="group/btn inline-flex items-center gap-2 text-sm font-body font-semibold text-foreground hover:text-primary transition-colors duration-300 w-fit"
                  >
                    <span className="relative">
                      View Full Biography
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary group-hover/btn:w-full transition-all duration-300" />
                    </span>
                    <ArrowUpRight size={12} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIOGRAPHY ACCORDION ── */}
      <section className="bg-background border-t border-border py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-xs tracking-[0.25em] uppercase text-primary font-body font-semibold mb-12 inline-flex items-center gap-3">
            <span className="w-6 h-px bg-primary" />
            Full Biographies
          </p>
          {board.map((member, i) => (
            <BioAccordion key={member.slug} member={member} index={i} />
          ))}
          <div className="border-t border-border" />
        </div>
      </section>

      {/* ── NAV TO MANAGEMENT ── */}
      <section className="bg-card border-t border-border px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-primary font-body font-semibold mb-4 inline-flex items-center gap-3">
              <span className="w-6 h-px bg-primary" />
              Also Explore
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Management <span className="gold-gradient-text">Team</span>
            </h3>
            <p className="text-base text-muted-foreground font-body max-w-lg leading-relaxed">
              Meet the operational leaders executing Zithelo&apos;s strategy.
            </p>
          </div>
          <Link
            href="/leadership/management"
            className="group shrink-0 inline-flex items-center gap-3 px-8 py-4 gold-gradient text-primary-foreground font-body font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity duration-300"
          >
            View Management Team
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
