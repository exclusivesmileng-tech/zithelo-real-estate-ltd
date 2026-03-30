import { Handshake, TrendingUp, Building2, Users, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/PageHero";
import PartnershipHeroVector from "@/components/heroes/PartnershipHeroVector";

// ─── Partner track ────────────────────────────────────────────────────────────

const PARTNER_TYPES = [
  {
    icon: Users,
    title: "Realtor & Agent Partners",
    description:
      "Are you a licensed real estate agent, broker, or consultant? Join our referral and co-agency network to earn competitive commissions introducing qualified buyers, tenants, or investors to Zithelo developments.",
    points: [
      "Competitive commission structure",
      "Co-marketing collateral and training",
      "Dedicated relationship manager",
      "Access to off-plan pricing",
    ],
    cta: "Register as a Realtor",
    ctaHref: "/contact?type=realtor",
    accent: "REALTORS & AGENTS",
  },
  {
    icon: Building2,
    title: "Property Owners & Co-Development",
    description:
      "Own land or an existing asset in a prime urban corridor? We partner with landowners and property holders to co-develop under structured joint venture arrangements — bringing capital, expertise, and execution.",
    points: [
      "Land or asset contribution models",
      "Profit-sharing joint ventures",
      "Full turnkey development execution",
      "Transparent legal and financial structures",
    ],
    cta: "Explore Co-Development",
    ctaHref: "/contact?type=codevelopment",
    accent: "PROPERTY OWNERS",
  },
];

// ─── Investor track ───────────────────────────────────────────────────────────

const INVESTOR_TYPES = [
  {
    icon: TrendingUp,
    title: "Equity Investment — Own a Stake",
    description:
      "Invest directly into a Zithelo development project and earn returns proportional to your equity stake. Suitable for individuals, family offices, and diaspora investors seeking real-asset exposure in Africa's fastest-growing cities.",
    points: [
      "Minimum investment thresholds communicated per project",
      "Quarterly reporting and transparency",
      "Exit via sale, refinancing, or rental yield distribution",
      "Projects across Lagos and expanding markets",
    ],
    cta: "Enquire About Equity Investment",
    ctaHref: "/contact?type=equity",
    accent: "EQUITY INVESTORS",
  },
  {
    icon: Handshake,
    title: "Institutional & Fund Partnerships",
    description:
      "We work with development finance institutions, family offices, and investment funds seeking structured co-investment or joint venture arrangements at scale. Governance-aligned, returns-focused, and built for long-term value.",
    points: [
      "Joint venture and co-investment structures",
      "Institutional due diligence support",
      "Bankable feasibilities and financial models",
      "Alignment with ESG and impact standards",
    ],
    cta: "Start an Institutional Conversation",
    ctaHref: "/contact?type=institutional",
    accent: "INSTITUTIONS & FUNDS",
  },
];

// ─── How it works steps ───────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  { step: "01", title: "Reach Out", body: "Submit your enquiry via our contact form selecting the relevant partnership or investment type." },
  { step: "02", title: "Initial Discussion", body: "Our partnerships team will schedule a call to understand your objectives and present relevant opportunities." },
  { step: "03", title: "Due Diligence", body: "We share project details, financial models, and legal frameworks for your assessment." },
  { step: "04", title: "Structure & Sign", body: "We agree on the right structure — JV, equity stake, commission agreement — and formalise it." },
  { step: "05", title: "Deliver Together", body: "You benefit from Zithelo's execution capability while we build lasting, mutually rewarding relationships." },
];

export default function PartnershipPage() {
  return (
    <>
      <PageHero
        title="Partner & Invest"
        titleAccent="Grow With Zithelo."
        subtitle="Two clear pathways — partner with us as a realtor or property owner, or invest capital in Africa's leading urban developments."
        image="/images/hero-skyline.jpg"
        breadcrumb="Partnership & Investment"
        vector={<PartnershipHeroVector />}
      />

      {/* ── Orientation banner ────────────────────────────────── */}
      <section className="border-b border-border bg-card">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedSection>
            <div className="flex items-start gap-5 p-6 border border-primary/20 rounded-sm bg-background hover:border-primary/40 transition-colors">
              <Users size={28} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-primary font-body font-semibold mb-1">Track 1</p>
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">I want to Partner</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  I am a realtor, agent, property owner, or developer seeking to work alongside Zithelo — through referrals, co-agency, or a joint venture on land or an existing asset.
                </p>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="flex items-start gap-5 p-6 border border-primary/20 rounded-sm bg-background hover:border-primary/40 transition-colors">
              <TrendingUp size={28} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-primary font-body font-semibold mb-1">Track 2</p>
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">I want to Invest</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  I am an individual, diaspora, or institutional investor seeking to deploy capital into Zithelo real estate projects and earn structured returns.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TRACK 1: PARTNER ─────────────────────────────────── */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection>
            <p className="text-sm tracking-[0.2em] uppercase text-primary mb-3 font-body font-semibold">Track 1</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-2">
              Partner With Zithelo
            </h2>
            <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mb-14">
              Whether you bring buyers, land, or assets — we have a structured route for you.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {PARTNER_TYPES.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.title} delay={i * 0.15}>
                  <div className="border border-border rounded-sm p-10 hover:border-primary/30 transition-colors h-full flex flex-col">
                    <p className="text-xs tracking-[0.22em] uppercase text-primary font-body font-semibold mb-4">{item.accent}</p>
                    <Icon size={30} className="text-primary mb-5" />
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground font-body leading-relaxed mb-6">{item.description}</p>
                    <ul className="space-y-2 mb-8 flex-1">
                      {item.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 text-sm text-foreground font-body">
                          <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={item.ctaHref}
                      className="inline-flex items-center gap-2 text-sm font-body font-semibold text-primary hover:gap-3 transition-all"
                    >
                      {item.cta} <ArrowRight size={15} />
                    </Link>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRACK 2: INVEST ──────────────────────────────────── */}
      <section className="section-padding bg-card">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection>
            <p className="text-sm tracking-[0.2em] uppercase text-primary mb-3 font-body font-semibold">Track 2</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-2">
              Invest in Zithelo
            </h2>
            <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mb-14">
              Deploy capital into high-quality urban real estate developments with structured returns and full transparency.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {INVESTOR_TYPES.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.title} delay={i * 0.15}>
                  <div className="border border-border rounded-sm p-10 hover:border-primary/30 transition-colors bg-background h-full flex flex-col">
                    <p className="text-xs tracking-[0.22em] uppercase text-primary font-body font-semibold mb-4">{item.accent}</p>
                    <Icon size={30} className="text-primary mb-5" />
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground font-body leading-relaxed mb-6">{item.description}</p>
                    <ul className="space-y-2 mb-8 flex-1">
                      {item.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 text-sm text-foreground font-body">
                          <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={item.ctaHref}
                      className="inline-flex items-center gap-2 text-sm font-body font-semibold text-primary hover:gap-3 transition-all"
                    >
                      {item.cta} <ArrowRight size={15} />
                    </Link>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection>
            <p className="text-sm tracking-[0.2em] uppercase text-primary mb-3 font-body font-semibold">The Process</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-14">
              How It Works
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {HOW_IT_WORKS.map((s, i) => (
              <AnimatedSection key={s.step} delay={i * 0.1}>
                <div className="relative">
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden lg:block absolute top-7 left-[calc(100%+0.75rem)] w-6 h-px bg-primary/30" />
                  )}
                  <span className="font-display text-4xl font-semibold gold-gradient-text">{s.step}</span>
                  <h4 className="font-display text-lg font-semibold text-foreground mt-3 mb-2">{s.title}</h4>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{s.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ────────────────────────────────────────── */}
      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-[1400px] mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Ready to Have a Real Conversation?
            </h2>
            <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-xl mx-auto mb-10">
              Tell us who you are and what you&apos;re looking to achieve. Our partnerships team responds within 48 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 gold-gradient text-primary-foreground font-body font-semibold rounded-sm hover:opacity-90 transition-opacity text-base"
            >
              Get in Touch <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
