import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FAQ_CATEGORIES } from "@/lib/assistant/faq-data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Zithelo Real Estate",
  description:
    "Answers to every question about investing with Zithelo — the 25-year lease model, Andoyi House, diaspora investment, payment plans, property title, and more.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Zithelo Real Estate",
    description:
      "Everything you need to know about Zithelo — 25-year lease, diaspora investing, off-plan, payment plans, and Nigerian property title explained.",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";


const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/faq`,
  name: "Zithelo Real Estate — Frequently Asked Questions",
  url: `${SITE_URL}/faq`,
  mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
    cat.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/faq` },
    ],
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".faq-question"],
  },
};

export default function FAQPage() {
  const totalQuestions = FAQ_CATEGORIES.reduce((n, c) => n + c.items.length, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        title="Frequently Asked"
        titleAccent="Questions"
        subtitle={`Everything you need to know about investing with Zithelo — ${totalQuestions} answers across every topic.`}
        image="/images/about-hero.jpg"
        breadcrumb="FAQ"
      />

      <section className="section-padding">
        <div className="max-w-[860px] mx-auto">

          {/* Jump links */}
          <AnimatedSection>
            <div className="flex flex-wrap gap-2 mb-16 pb-10 border-b border-border">
              {FAQ_CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="text-xs font-body font-semibold px-4 py-2 border border-border rounded-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors duration-200"
                >
                  {cat.title}
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* FAQ Categories */}
          {FAQ_CATEGORIES.map((cat, ci) => (
            <AnimatedSection key={cat.id} delay={ci * 0.05}>
              <div id={cat.id} className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-border" />
                  <h2 className="font-display text-xs tracking-[0.22em] uppercase text-primary font-bold whitespace-nowrap">
                    {cat.title}
                  </h2>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="space-y-0">
                  {cat.items.map((item, ii) => (
                    <details
                      key={ii}
                      className="group border-b border-border last:border-b-0"
                      open={ci === 0 && ii === 0}
                    >
                      <summary className="faq-question flex items-start justify-between gap-4 py-5 cursor-pointer list-none font-display font-bold text-base text-foreground hover:text-primary transition-colors duration-200 select-none">
                        <span className="leading-snug">{item.q}</span>
                        <span className="shrink-0 mt-0.5 w-5 h-5 rounded-sm border border-border flex items-center justify-center text-muted-foreground group-open:border-primary/40 group-open:text-primary transition-colors duration-200">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform duration-200 group-open:rotate-180">
                            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </summary>
                      <div className="pb-6 pr-10">
                        <p className="font-body text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}

          {/* CTA */}
          <AnimatedSection>
            <div className="bg-[hsl(var(--charcoal))] rounded-sm p-10 text-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
              />
              <div className="relative z-10">
                <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-3">Still Have Questions?</p>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  Talk to the Zithelo Team
                </h3>
                <p className="text-white/55 font-body text-sm mb-8 max-w-md mx-auto">
                  Our investment team is available Monday–Friday, 9am–6pm WAT. Email us at{" "}
                  <span className="text-primary">invest@zithelorealestate.com</span> or book a call.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 gold-gradient text-primary-foreground px-8 py-3.5 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-sm hover:opacity-90 transition-opacity"
                  >
                    Book a Consultation <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/investor-quiz"
                    className="group inline-flex items-center gap-2 border border-white/20 text-white px-8 py-3.5 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-sm hover:border-primary/40 transition-colors duration-200"
                  >
                    Take Investor Quiz <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
