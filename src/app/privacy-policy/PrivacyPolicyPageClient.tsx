"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, Globe, Lock, Users, FileText, ArrowRight, Shield } from "lucide-react";
import PageHero from "@/components/PageHero";
import PrivacyHeroVector from "@/components/heroes/PrivacyHeroVector";

const SECTIONS = [
  {
    id: "scope",
    num: "01",
    icon: Globe,
    title: "Scope",
    body: "This Privacy Policy applies to all users of the Zithelo Homes platform across jurisdictions including the United States and Nigeria. By accessing or using our platform, you acknowledge that you have read and understood this policy.",
  },
  {
    id: "information-collected",
    num: "02",
    icon: FileText,
    title: "Information Collected",
    body: "We collect personal, transactional, and technical data to deliver and improve our services. This includes:",
    bullets: [
      "Personal identifiers: full name, email address, phone number",
      "Property interests, investment preferences, and enquiry details",
      "Technical data: IP addresses, browser type, device identifiers",
      "Cookies and usage analytics",
    ],
  },
  {
    id: "use-of-information",
    num: "03",
    icon: Users,
    title: "Use of Information",
    body: "Data collected is used strictly for the following purposes:",
    bullets: [
      "Communication, transaction processing, and enquiry management",
      "Service improvements and platform personalisation",
      "Marketing communications and investment opportunity updates",
      "Legal and regulatory compliance",
    ],
  },
  {
    id: "legal-basis",
    num: "04",
    icon: Shield,
    title: "Legal Basis & Compliance",
    body: "We comply with applicable data protection laws including U.S. privacy standards and the Nigeria Data Protection Regulation (NDPR). Data processing is carried out on the basis of consent, contractual necessity, and legitimate interest.",
  },
  {
    id: "data-sharing",
    num: "05",
    icon: ArrowRight,
    title: "Data Sharing",
    body: "Your information may be shared with agents, developers, contractors, and trusted third-party service providers necessary for service delivery. We do not sell your personal data. All third parties are bound by confidentiality obligations.",
  },
  {
    id: "communication-consent",
    num: "06",
    icon: Mail,
    title: "Communication Consent",
    body: "By submitting your information on our platform, you consent to being contacted via phone, SMS, email, and messaging platforms including WhatsApp for service-related and marketing communications. You may opt out at any time.",
  },
  {
    id: "data-security",
    num: "07",
    icon: Lock,
    title: "Data Security",
    body: "We implement industry-standard technical and organisational safeguards including encryption, access controls, and secure data storage. While we take all reasonable precautions, no method of data transmission over the internet can be guaranteed to be 100% secure.",
  },
  {
    id: "user-rights",
    num: "08",
    icon: Users,
    title: "Your Rights",
    body: "You have the right to:",
    bullets: [
      "Access and receive a copy of your personal data",
      "Request correction of inaccurate or outdated information",
      "Request deletion of your data (subject to legal obligations)",
      "Restrict or object to certain processing activities",
    ],
  },
  {
    id: "international-transfers",
    num: "09",
    icon: Globe,
    title: "International Transfers",
    body: "Your data may be transferred to and processed in jurisdictions including the United States and Nigeria. We take appropriate measures to ensure such transfers comply with applicable data protection laws.",
  },
  {
    id: "contact",
    num: "10",
    icon: Mail,
    title: "Contact Us",
    body: "For privacy-related enquiries, requests, or complaints, please reach out to our team.",
    contact: true,
  },
];

type Section = typeof SECTIONS[number];

function SectionCard({ section, index }: { section: Section; index: number }) {
  const Icon = section.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      id={section.id}
      className="group relative bg-card border border-border hover:border-primary/30 rounded-2xl p-6 md:p-8 transition-all duration-300 scroll-mt-28"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top left, rgba(212,170,83,0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0 mt-0.5">
            <Icon size={17} className="text-primary" />
          </div>
          <div>
            <span className="text-[10px] tracking-[0.22em] uppercase font-body font-semibold text-primary/50 block mb-0.5">
              {section.num}
            </span>
            <h3 className="font-display text-lg font-bold text-foreground leading-tight">
              {section.title}
            </h3>
          </div>
        </div>

        <p className="text-muted-foreground font-body text-sm leading-relaxed pl-14">
          {section.body}
        </p>

        {section.bullets && (
          <ul className="mt-3 pl-14 space-y-2">
            {section.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm font-body text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>
        )}

        {section.contact && (
          <div className="mt-4 ml-14 flex flex-col gap-2 pt-4 border-t border-border">
            <a href="mailto:info@zithelo.com" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body">
              <Mail size={13} className="text-primary shrink-0" /> info@zithelo.com
            </a>
            <a href="tel:+2349110222323" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body">
              <Phone size={13} className="text-primary shrink-0" /> +234 9110 222 323
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function PrivacyPolicyPageClient() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ───────────────────────────────────── */}
      <div className="bg-[hsl(var(--charcoal))]">
        <PageHero
          breadcrumb="Legal"
          title="Privacy"
          titleAccent="Policy"
          subtitle="We are committed to protecting your personal data. This policy explains what we collect, how we use it, and your rights as a user of the Zithelo Homes platform."
          vector={<PrivacyHeroVector />}
        />
      </div>

      {/* ── Body ───────────────────────────────────── */}
      <div className="max-w-[1100px] mx-auto px-5 md:px-12 lg:px-16 py-12 md:py-16">
        <div className="flex gap-12 xl:gap-16">

          {/* Sidebar TOC */}
          <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
            <div className="sticky top-28">
              <p className="text-[11px] tracking-[0.25em] uppercase font-body font-semibold text-primary mb-5">
                Contents
              </p>
              <nav className="flex flex-col gap-0.5">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="group flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150"
                  >
                    <span className="text-primary font-bold shrink-0 w-7 text-xs">{s.num}</span>
                    <span className="leading-snug">{s.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {SECTIONS.map((section, i) => (
              <SectionCard key={section.id} section={section} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom strip ───────────────────────────── */}
      <div className="border-t border-border bg-muted/30">
        <div className="max-w-[1100px] mx-auto px-5 md:px-12 lg:px-16 py-12 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-primary font-body font-semibold mb-1">
              Questions?
            </p>
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
              We&apos;re here to help
            </h3>
            <p className="text-muted-foreground font-body text-sm max-w-sm leading-relaxed">
              If you have questions about how we use your data, our team is happy to clarify.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-display font-bold text-sm tracking-[0.08em] uppercase hover:bg-primary/90 transition-colors"
            >
              Contact Us <ArrowRight size={14} />
            </Link>
            <Link
              href="/terms-of-service"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 font-display font-bold text-sm tracking-[0.08em] uppercase hover:bg-muted transition-colors"
            >
              <FileText size={14} /> Terms of Service
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
