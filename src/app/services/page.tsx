"use client";

import { Building2, TrendingUp, Globe, Users, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SanityService } from "@/sanity/types";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/PageHero";
import ServicesHeroVector from "@/components/heroes/ServicesHeroVector";
import Link from "next/link";
import { useEffect, useState } from "react";

const iconMap: Record<string, React.ElementType> = { Building2, TrendingUp, Globe, Users };

const FALLBACK_SERVICES: SanityService[] = [
  {
    _id: "1",
    iconName: "Building2",
    title: "Real Estate Development",
    description: "From concept to completion, we develop premium residential and commercial properties that set new standards in African real estate. Our developments combine international design standards with deep local understanding.",
    points: ["Luxury residential complexes", "Premium commercial towers", "Gated estate communities", "Smart building integration"],
  },
  {
    _id: "2",
    iconName: "Globe",
    title: "Construction",
    description: "Our construction capabilities span large-scale urban developments, leveraging modern building technologies and sustainable practices to deliver projects on time and to specification.",
    points: ["Large-scale construction", "Sustainable building practices", "Quality assurance systems", "Safety-first methodology"],
  },
  {
    _id: "3",
    iconName: "Users",
    title: "Project Management",
    description: "End-to-end project lifecycle management from feasibility studies through handover. We ensure every project meets its targets for quality, timeline, and budget.",
    points: ["Feasibility analysis", "Design management", "Construction oversight", "Stakeholder coordination"],
  },
  {
    _id: "4",
    iconName: "TrendingUp",
    title: "Investment Partnerships",
    description: "We structure investment vehicles for institutional and private capital seeking exposure to Africa's real estate growth story. Our partnerships are built on transparency and long-term value creation.",
    points: ["Joint venture structures", "Fund management", "Institutional partnerships", "Returns-focused strategy"],
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<SanityService[]>(FALLBACK_SERVICES);
  const [active, setActive] = useState(0);

  useEffect(() => {
    import("@/sanity/client").then(({ client }) =>
      import("@/sanity/queries").then(({ ALL_SERVICES_QUERY }) =>
        client.fetch(ALL_SERVICES_QUERY).then((data: SanityService[]) => {
          if (data?.length) setServices(data);
        }).catch(() => {})
      )
    );
  }, []);

  const current = services[active];
  const Icon = iconMap[current?.iconName ?? ""] ?? Building2;

  return (
    <>
      <PageHero
        title="Our Services"
        titleAccent="End-to-End Capability."
        subtitle="From acquisition to handover — full-spectrum development expertise."
        image="/images/project-mixeduse.jpg"
        breadcrumb="Services"
        vector={<ServicesHeroVector />}
      />

      {/* ── Service selector tabs ── */}
      <section className="section-padding pb-0">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-4">What We Do</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-14">
              Our <span className="gold-gradient-text">Core Services</span>
            </h2>
          </AnimatedSection>

          {/* Tab row */}
          <div className="flex flex-wrap gap-3 mb-0">
            {services.map((svc, i) => {
              const TabIcon = iconMap[svc.iconName ?? ""] ?? Building2;
              return (
                <motion.button
                  key={svc._id}
                  onClick={() => setActive(i)}
                  whileTap={{ scale: 0.97 }}
                  className={`group flex items-center gap-2.5 px-5 py-3 rounded-sm border font-display font-bold text-[11px] tracking-[0.12em] uppercase transition-all duration-300 ${
                    active === i
                      ? "gold-gradient text-primary-foreground border-transparent shadow-lg shadow-primary/25"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-card"
                  }`}
                >
                  <TabIcon size={14} />
                  {svc.title}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Active service detail panel ── */}
      <section className="section-padding pt-0 mt-8">
        <div className="max-w-[1400px] mx-auto">
          <AnimatePresenceWrapper>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-sm overflow-hidden border border-border"
            >
              {/* Left — dark charcoal panel */}
              <div className="lg:col-span-2 relative bg-[hsl(var(--charcoal))] p-10 md:p-14 flex flex-col justify-between overflow-hidden">
                {/* Glow orb */}
                <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none opacity-10"
                  style={{ background: "radial-gradient(circle, hsl(43 81% 61%) 0%, transparent 70%)" }} />
                {/* Dot pattern */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

                <div className="relative z-10">
                  {/* Icon badge */}
                  <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mb-8 shadow-xl shadow-primary/30">
                    <Icon size={28} className="text-primary-foreground" />
                  </div>

                  {/* Number */}
                  <p className="font-display text-6xl font-black text-white/8 leading-none mb-2 select-none">
                    {String(active + 1).padStart(2, "0")}
                  </p>

                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-6">
                    {current.title}
                  </h3>

                  <p className="text-white/65 font-body text-base leading-relaxed">
                    {current.description}
                  </p>
                </div>

                <div className="relative z-10 mt-10">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-sm font-body font-semibold text-primary hover:text-primary/80 transition-colors duration-300"
                  >
                    Enquire About This Service
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right — checklist + visual */}
              <div className="lg:col-span-3 bg-card p-10 md:p-14 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-8">What's Included</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {current.points.map((point, i) => (
                      <motion.div
                        key={point}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.08 }}
                        className="flex items-start gap-4 p-5 bg-background border border-border rounded-sm hover:border-primary/30 hover:shadow-sm transition-all duration-300 group"
                      >
                        <div className="w-7 h-7 rounded-lg gold-gradient flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-primary/20">
                          <Check size={13} className="text-primary-foreground" />
                        </div>
                        <span className="text-sm text-foreground font-body leading-relaxed group-hover:text-foreground transition-colors">
                          {point}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="mt-10 flex items-center gap-3">
                  {services.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`transition-all duration-300 rounded-full ${
                        active === i ? "w-8 h-2 gold-gradient" : "w-2 h-2 bg-border hover:bg-primary/40"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-body">
                    {active + 1} / {services.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresenceWrapper>
        </div>
      </section>

      {/* ── Process steps ── */}
      <section className="section-padding bg-card">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-4">How We Work</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Our <span className="gold-gradient-text">Process</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Site Acquisition", desc: "Identify and secure prime urban land in high-growth corridors through rigorous due diligence." },
              { num: "02", title: "Design & Planning", desc: "Develop utility-led designs that balance investor returns, resident experience, and city context." },
              { num: "03", title: "Build & Execute", desc: "Deliver construction to specification using trusted contractors and continuous quality oversight." },
              { num: "04", title: "Handover & Manage", desc: "Complete handover with full documentation, then provide ongoing asset management support." },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative group"
              >
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary/30 to-transparent z-10 -translate-y-1/2" style={{ width: "calc(100% - 2rem)" }} />
                )}
                <div className="bg-background border border-border rounded-sm p-8 h-full hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-400">
                  <p className="font-display text-4xl font-black gold-gradient-text mb-4">{step.num}</p>
                  <h4 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{step.title}</h4>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection>
            <div className="bg-[hsl(var(--charcoal))] rounded-sm p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none opacity-10"
                style={{ background: "radial-gradient(circle, hsl(43 81% 61%) 0%, transparent 70%)" }} />
              <div className="relative z-10">
                <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-3">Ready to Start?</p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
                  Let's Discuss Your<br />
                  <span className="gold-gradient-text">Development Goals.</span>
                </h3>
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 gold-gradient text-primary-foreground px-8 py-4 font-display font-bold text-sm tracking-[0.12em] uppercase rounded-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                >
                  Get in Touch
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 font-display font-bold text-sm tracking-[0.12em] uppercase rounded-sm hover:bg-white/5 transition-all duration-300"
                >
                  View Projects
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

function AnimatePresenceWrapper({ children }: { children: React.ReactNode }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
