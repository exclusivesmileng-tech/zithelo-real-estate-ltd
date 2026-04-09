"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, Shield, AlertCircle, Users, Globe, Lock, ArrowRight, FileText, RefreshCw } from "lucide-react";
import PageHero from "@/components/PageHero";
import TermsHeroVector from "@/components/heroes/TermsHeroVector";

const SECTIONS = [
  {
    id: "platform-role",
    num: "01",
    icon: FileText,
    title: "Platform Role",
    body: "Zithelo Homes operates as a property listing and development platform. Unless explicitly stated, Zithelo does not act as a licensed broker, financial advisor, or legal representative. Users should seek independent professional advice before making investment or property decisions.",
  },
  {
    id: "user-obligations",
    num: "02",
    icon: Users,
    title: "User Obligations",
    body: "By using our platform, you agree to:",
    bullets: [
      "Provide accurate, complete, and truthful information",
      "Not misuse the platform for unlawful or fraudulent purposes",
      "Not submit false, misleading, or defamatory content",
      "Comply with all applicable local and international laws",
    ],
  },
  {
    id: "property-disclaimer",
    num: "03",
    icon: AlertCircle,
    title: "Property Information Disclaimer",
    body: "All property listings, project descriptions, pricing, and availability are subject to change without notice. Information is provided for informational purposes only and does not constitute a binding offer or guarantee of accuracy.",
  },
  {
    id: "investment-disclaimer",
    num: "04",
    icon: AlertCircle,
    title: "Investment Disclaimer",
    body: "Zithelo Homes does not guarantee returns, rental income, capital appreciation, or investment performance. All real estate investments carry risk. Past performance is not indicative of future results. Users are required to conduct independent due diligence and seek qualified financial advice.",
  },
  {
    id: "no-reliance",
    num: "05",
    icon: Shield,
    title: "No Reliance",
    body: "Users agree not to rely solely on information presented on this platform for financial, legal, or property decisions. All material should be treated as indicative only. Zithelo Homes accepts no liability for decisions made based solely on platform content.",
  },
  {
    id: "limitation-of-liability",
    num: "06",
    icon: Lock,
    title: "Limitation of Liability",
    body: "To the fullest extent permitted by law, Zithelo Homes shall not be liable for any direct, indirect, incidental, special, or consequential losses, damages, or expenses arising from the use of or inability to use the platform or from reliance on platform content.",
  },
  {
    id: "indemnification",
    num: "07",
    icon: Shield,
    title: "Indemnification",
    body: "Users agree to indemnify, defend, and hold harmless Zithelo Homes, its officers, directors, employees, and affiliates against any claims, liabilities, damages, losses, or expenses arising from misuse of the platform or violation of these Terms.",
  },
  {
    id: "third-party-services",
    num: "08",
    icon: Globe,
    title: "Third-Party Services",
    body: "Zithelo Homes is not responsible for the actions, content, services, or representations of third-party agents, partners, or linked platforms. Users engage with third parties at their own discretion and risk.",
  },
  {
    id: "governing-law",
    num: "09",
    icon: FileText,
    title: "Governing Law",
    body: "These Terms of Service are governed by and construed in accordance with the laws of the State of Georgia, USA, and applicable laws of the Federal Republic of Nigeria. Disputes shall be resolved in accordance with the applicable legal framework in the relevant jurisdiction.",
  },
  {
    id: "updates",
    num: "10",
    icon: RefreshCw,
    title: "Updates to Terms",
    body: "We reserve the right to update, amend, or revise these Terms at any time. Continued use of the platform following notification of changes constitutes acceptance of the revised Terms. Users are encouraged to review this page periodically.",
  },
  {
    id: "contact",
    num: "11",
    icon: Mail,
    title: "Contact Us",
    body: "For questions or concerns regarding these Terms of Service:",
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
            <a href="mailto:info@zithelorealestate.com" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body">
              <Mail size={13} className="text-primary shrink-0" /> info@zithelorealestate.com
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

export default function TermsOfServicePageClient() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ───────────────────────────────────── */}
      <div className="bg-[hsl(var(--charcoal))]">
        <PageHero
          breadcrumb="Legal"
          title="Terms of"
          titleAccent="Service"
          subtitle="These terms govern your access to and use of the Zithelo Homes platform. By using our services you agree to be bound by these terms."
          vector={<TermsHeroVector />}
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
              If you have questions about these terms, our team is happy to clarify.
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
              href="/privacy-policy"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 font-display font-bold text-sm tracking-[0.08em] uppercase hover:bg-muted transition-colors"
            >
              <Shield size={14} /> Privacy Policy
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
