"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Shield, FileText, ChevronRight, Mail, Phone, ArrowRight, Lock, AlertCircle, Users, Globe, RefreshCw } from "lucide-react";

const EFFECTIVE_DATE = "March 31, 2025";

// ─── Privacy Policy sections ───────────────────────────────────────────────
const PRIVACY_SECTIONS = [
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
    id: "privacy-contact",
    num: "10",
    icon: Mail,
    title: "Contact Us",
    body: "For privacy-related enquiries, requests, or complaints, please reach out to our team:",
    contact: true,
  },
];

// ─── Terms of Service sections ─────────────────────────────────────────────
const TERMS_SECTIONS = [
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
    id: "terms-contact",
    num: "11",
    icon: Mail,
    title: "Contact Us",
    body: "For questions or concerns regarding these Terms of Service:",
    contact: true,
  },
];

type Section = {
  id: string;
  num: string;
  icon: React.ElementType;
  title: string;
  body: string;
  bullets?: string[];
  contact?: boolean;
};

function SectionCard({ section, index }: { section: Section; index: number }) {
  const Icon = section.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      id={section.id}
      className="group relative bg-card border border-border hover:border-primary/30 rounded-2xl p-6 md:p-8 transition-all duration-300 scroll-mt-24"
    >
      {/* Subtle gold hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top left, rgba(212,170,83,0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0">
            <Icon size={18} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] tracking-[0.2em] uppercase font-body font-semibold text-primary/60">
                {section.num}
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-foreground leading-tight">
              {section.title}
            </h3>
          </div>
        </div>

        <p className="text-muted-foreground font-body text-sm leading-relaxed mb-3">
          {section.body}
        </p>

        {section.bullets && (
          <ul className="space-y-2 mt-3">
            {section.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm font-body text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>
        )}

        {section.contact && (
          <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-border">
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

function LegalPageInner() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");

  useEffect(() => {
    if (searchParams.get("tab") === "terms") setActiveTab("terms");
  }, [searchParams]);

  const sections = activeTab === "privacy" ? PRIVACY_SECTIONS : TERMS_SECTIONS;

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden border-b border-border">
        {/* Background texture */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `repeating-linear-gradient(-45deg,transparent,transparent 26px,rgba(212,170,83,0.04) 26px,rgba(212,170,83,0.04) 27px)` }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom right, rgba(212,170,83,0.12) 0%, transparent 65%)" }} />

        <div className="relative z-10 max-w-[1100px] mx-auto px-5 md:px-12 lg:px-16 pt-24 md:pt-32 pb-14 md:pb-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-foreground">Legal</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] tracking-[0.3em] uppercase font-body font-semibold text-primary mb-4">
              Legal Documents
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] mb-5">
              Privacy & Terms
            </h1>
            <p className="font-body text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed mb-8">
              Transparency is central to how we operate. These documents govern your use of the Zithelo Homes platform and explain how we handle your data.
            </p>

            {/* Effective date badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full border border-border">
              <RefreshCw size={12} className="text-primary" />
              <span className="text-xs font-body text-muted-foreground">Effective Date: {EFFECTIVE_DATE}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-[1100px] mx-auto px-5 md:px-12 lg:px-16">
          <div className="flex gap-0">
            {([
              { key: "privacy", label: "Privacy Policy", icon: Shield },
              { key: "terms",   label: "Terms of Service", icon: FileText },
            ] as const).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative flex items-center gap-2 px-5 py-4 text-sm font-body font-semibold transition-colors duration-200 ${
                  activeTab === key
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{key === "privacy" ? "Privacy" : "Terms"}</span>
                {activeTab === key && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-[1100px] mx-auto px-5 md:px-12 lg:px-16 py-12 md:py-16">

        {/* Two-column layout on desktop: TOC sidebar + content */}
        <div className="flex gap-12 xl:gap-16">

          {/* ── Table of Contents (desktop sidebar) ── */}
          <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
            <div className="sticky top-24">
              <p className="text-[10px] tracking-[0.25em] uppercase font-body font-semibold text-primary mb-4">
                Contents
              </p>
              <nav className="flex flex-col gap-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex items-center gap-2.5 text-xs font-body text-muted-foreground hover:text-primary transition-colors py-1.5 group"
                  >
                    <span className="text-primary/40 group-hover:text-primary transition-colors font-semibold shrink-0">{s.num}</span>
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                {/* Section header */}
                <div className="mb-8 pb-8 border-b border-border">
                  <div className="flex items-center gap-3 mb-3">
                    {activeTab === "privacy"
                      ? <Shield size={20} className="text-primary" />
                      : <FileText size={20} className="text-primary" />
                    }
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      {activeTab === "privacy" ? "Privacy Policy" : "Terms of Service"}
                    </h2>
                  </div>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-2xl">
                    {activeTab === "privacy"
                      ? "This policy outlines how Zithelo Homes LLC collects, uses, and protects your personal information across our platform and services."
                      : "These terms govern your access to and use of the Zithelo Homes platform. Please read them carefully before proceeding."
                    }
                  </p>
                </div>

                {/* Sections grid */}
                <div className="flex flex-col gap-4">
                  {sections.map((section, i) => (
                    <SectionCard key={section.id} section={section as Section} index={i} />
                  ))}
                </div>

                {/* Switch CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-10 p-6 md:p-8 rounded-2xl border border-border bg-muted/40"
                >
                  <p className="text-sm font-body text-muted-foreground mb-3">
                    {activeTab === "privacy"
                      ? "Also review our Terms of Service to understand how you may use the Zithelo Homes platform."
                      : "Also review our Privacy Policy to understand how your personal data is handled."
                    }
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab(activeTab === "privacy" ? "terms" : "privacy");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 text-sm font-body font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    {activeTab === "privacy" ? "View Terms of Service" : "View Privacy Policy"}
                    <ArrowRight size={14} />
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Bottom CTA strip ── */}
      <div className="border-t border-border bg-muted/30">
        <div className="max-w-[1100px] mx-auto px-5 md:px-12 lg:px-16 py-12 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-primary font-body font-semibold mb-2">
              Questions About Our Policies?
            </p>
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
              We&apos;re here to help
            </h3>
            <p className="text-muted-foreground font-body text-sm max-w-sm leading-relaxed">
              If you have questions about how we use your data or about these terms, our team is happy to clarify.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-display font-bold text-sm tracking-[0.08em] uppercase hover:bg-primary/90 transition-colors rounded-none"
            >
              Contact Us <ArrowRight size={14} />
            </Link>
            <a
              href="mailto:info@zithelorealestate.com"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 font-display font-bold text-sm tracking-[0.08em] uppercase hover:bg-muted transition-colors rounded-none"
            >
              <Mail size={14} /> Email Us
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function LegalPageClient() {
  return (
    <Suspense>
      <LegalPageInner />
    </Suspense>
  );
}
