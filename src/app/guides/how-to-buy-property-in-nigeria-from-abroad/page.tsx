import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Buy Property in Nigeria From Abroad | Complete Guide 2026",
  description:
    "Step-by-step guide for diaspora investors buying Nigerian property from the UK, US, or Canada. Covers legal requirements, title types, payments in GBP/USD, documentation, and choosing a developer.",
  keywords: [
    "how to buy property in Nigeria from UK",
    "diaspora property investment Nigeria",
    "buy Nigerian property from abroad",
    "invest in Nigeria real estate from USA",
    "Nigerian property purchase guide",
    "how to invest in Lagos real estate",
  ],
  alternates: { canonical: "/guides/how-to-buy-property-in-nigeria-from-abroad" },
  openGraph: {
    title: "How to Buy Property in Nigeria From Abroad — Complete 2026 Guide",
    description:
      "The definitive step-by-step guide for Nigerians abroad buying Lagos real estate — legal process, title types, payment in GBP/USD, and what to verify before signing.",
    images: [{ url: "/images/andoyi/2.png", width: 1200, height: 630, alt: "How to Buy Property in Nigeria From Abroad" }],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

const STEPS = [
  {
    step: 1,
    name: "Define Your Investment Goals and Budget",
    text: "Before searching for property, be clear on: Are you buying for passive rental income, capital appreciation, or personal use? What is your total budget in GBP, USD, or NGN? Do you want off-plan (cheaper, higher upside) or completed (ready-to-rent immediately)? What is your investment timeline — 3, 5, or 10+ years? A clear investment brief prevents costly mistakes later. Use the Zithelo ROI Calculator to model different scenarios before committing.",
    items: [
      "Define income goal vs capital growth priority",
      "Set a clear budget range",
      "Choose between off-plan and completed property",
      "Decide on your preferred location (Yaba, Lekki, Victoria Island, Ikeja)",
    ],
  },
  {
    step: 2,
    name: "Research and Shortlist Developers",
    text: "The developer you choose is the single most important decision in a Nigerian property purchase. Many properties in Nigeria are sold by agents, not developers — buyers who deal directly with developers have stronger legal protection. Evaluate developers on: registered company status (CAC), land title verification (C of O), track record of delivery, investor references, and whether they offer professional property management. Always verify the developer's registration number with the Corporate Affairs Commission (CAC) online at search.cac.gov.ng.",
    items: [
      "Verify developer CAC registration number",
      "Confirm they hold title (C of O) on the land",
      "Request investor references from previous projects",
      "Check whether they offer property management",
      "Verify REDAN membership if possible",
    ],
  },
  {
    step: 3,
    name: "Verify the Land Title",
    text: "Title verification is the most critical legal step. Nigerian law recognises several types of title: Certificate of Occupancy (C of O) — the strongest, state-issued, 99-year occupancy right. Deed of Assignment — transfers ownership between parties (must be accompanied by Governor's Consent). Right of Occupancy (R of O) — issued by local government, weaker than C of O. Governors Consent — required to make any property transfer legally binding. Only buy on C of O land. Request a copy of the title document and verify it at the relevant state Land Registry. Engage a Nigerian lawyer to conduct due diligence — expect to pay ₦50,000–₦200,000 for this service.",
    items: [
      "Request copy of land title document",
      "Verify at state Land Registry",
      "Confirm Certificate of Occupancy (not just R of O)",
      "Engage a Nigerian lawyer for due diligence",
      "Confirm no encumbrances or disputes on the title",
    ],
  },
  {
    step: 4,
    name: "Engage a Nigerian Property Lawyer",
    text: "You must have independent legal representation in any Nigerian property transaction. Your lawyer will: review the investment agreement, verify the land title, check for planning permissions, draft or review the Deed of Assignment, handle Governor's Consent application, and ensure the transaction is properly stamped and registered. Do not use the developer's in-house lawyer — always engage your own. Ask other diaspora investors for referrals, or search the Nigerian Bar Association directory.",
    items: [
      "Engage an independent Nigerian property lawyer",
      "Brief the lawyer on the development details",
      "Have the lawyer review all documents before signing",
      "Budget for legal fees: typically 5–10% of property value",
    ],
  },
  {
    step: 5,
    name: "Review the Investment Agreement",
    text: "The investment agreement (also called the Sale and Purchase Agreement or Off-plan Agreement) is the binding legal contract. Key terms to verify: exact payment schedule tied to construction milestones, completion and handover date (with penalties for delays), what happens if the developer defaults, your rights to inspect progress, management fees and rental income terms, and transfer of title terms upon payment completion. Never sign under pressure. You are entitled to request revisions to any clause.",
    items: [
      "Read the full agreement — do not skip any clause",
      "Confirm payment schedule is milestone-linked",
      "Check penalty clauses for developer delays",
      "Verify your inspection rights during construction",
      "Confirm management terms and rental income process",
      "Ensure title transfer terms are explicit",
    ],
  },
  {
    step: 6,
    name: "Complete Payment — International Wire Transfer",
    text: "As a diaspora investor, you will pay via international wire transfer (SWIFT) from your UK, US, or Canadian bank account to the developer's designated corporate account. Always: transfer to the developer's registered company account only — never to a personal account. Request a written acknowledgement for every payment. Retain all SWIFT confirmation receipts. Confirm the exact exchange rate and any bank fees in advance. Some developers (including Zithelo) lock exchange rates at signing, protecting you from Naira fluctuation.",
    items: [
      "Transfer only to the developer's registered company account",
      "Request written payment acknowledgement within 48 hours",
      "Retain all SWIFT receipts and bank statements",
      "Confirm whether the exchange rate is locked at signing",
      "Ask about bank fees on both ends of the transfer",
    ],
  },
  {
    step: 7,
    name: "Monitor Construction Progress",
    text: "For off-plan investments, construction monitoring is your right as an investor. Reputable developers like Zithelo provide regular construction updates — photos, video walkthroughs, milestone reports, and third-party inspection access. Request update frequency in your agreement: monthly photo reports are the minimum standard. If a developer goes quiet during construction, that is a red flag requiring immediate legal escalation through your Nigerian lawyer.",
    items: [
      "Confirm update frequency in the agreement",
      "Request monthly photo/video reports",
      "Reserve the right to visit and inspect in person",
      "Escalate through your lawyer if updates stop",
    ],
  },
  {
    step: 8,
    name: "Take Handover and Complete Documentation",
    text: "At handover: conduct a thorough inspection of the unit before signing the handover certificate. Document any snags (defects) in writing and ensure the developer commits to a snagging timeline. Collect all completion documents: your Deed of Assignment, proof of Governor's Consent application (or completion), any service charge agreement, property management agreement, and keys. Ensure your lawyer registers the Deed of Assignment at the Land Registry to complete the title transfer.",
    items: [
      "Conduct and document a full snag inspection",
      "Do not sign handover certificate with unresolved defects",
      "Collect Deed of Assignment and all title documents",
      "Confirm Governor's Consent status",
      "Register the Deed at the Land Registry",
      "Sign the property management agreement",
    ],
  },
  {
    step: 9,
    name: "Set Up Rental Management and Income Repatriation",
    text: "Once your property is handed over, work with your property manager (or Zithelo's management team) to: furnish and prepare the unit for tenants, set the rental rate based on current market data, establish tenant screening criteria, set up a Nigerian bank account for rental income collection, and arrange regular remittance to your UK/US/Canadian account via SWIFT. Many diaspora investors elect to accumulate Naira rental income in a domiciliary account and repatriate quarterly or semi-annually to manage FX timing.",
    items: [
      "Prepare and furnish the unit to rental-ready standard",
      "Open a Nigerian bank account for income collection",
      "Confirm rental strategy (short-let vs long-let)",
      "Set up management reporting frequency",
      "Arrange quarterly or semi-annual income repatriation",
    ],
  },
];

const guideSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${SITE_URL}/guides/how-to-buy-property-in-nigeria-from-abroad`,
  name: "How to Buy Property in Nigeria From Abroad — Complete Guide 2026",
  description:
    "Step-by-step guide for diaspora investors and Nigerians abroad to buy property in Nigeria from the UK, US, or Canada. Covers legal requirements, title verification, payments in GBP/USD, documentation, and choosing a reputable developer.",
  url: `${SITE_URL}/guides/how-to-buy-property-in-nigeria-from-abroad`,
  image: { "@type": "ImageObject", url: `${SITE_URL}/images/andoyi/2.png` },
  author: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  datePublished: "2026-06-01",
  inLanguage: "en-NG",
  step: STEPS.map((s) => ({
    "@type": "HowToStep",
    position: s.step,
    name: s.name,
    text: s.text,
    itemListElement: s.items.map((item) => ({
      "@type": "HowToDirection",
      text: item,
    })),
  })),
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
      { "@type": "ListItem", position: 3, name: "How to Buy Property in Nigeria From Abroad", item: `${SITE_URL}/guides/how-to-buy-property-in-nigeria-from-abroad` },
    ],
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", "h3"],
  },
};

export default function HowToBuyGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema) }}
      />
      <PageHero
        title="How to Buy Property in"
        titleAccent="Nigeria From Abroad"
        subtitle="The definitive 2026 guide for diaspora investors — 9 steps from initial research to rental income."
        image="/images/about-hero.jpg"
        breadcrumb="Guides"
      />

      <section className="section-padding">
        <div className="max-w-[860px] mx-auto">

          {/* Intro */}
          <AnimatedSection>
            <div className="border-l-4 border-primary pl-6 mb-14">
              <p className="font-body text-base leading-relaxed text-muted-foreground">
                Buying property in Nigeria from abroad is achievable and increasingly common — but it requires careful navigation of Nigerian property law, title verification, and developer due diligence. This guide covers every step from research to rental income, written specifically for Nigerians and Africans based in the UK, United States, Canada, and Europe.
              </p>
              <p className="font-body text-sm leading-relaxed text-muted-foreground mt-4">
                <strong className="text-foreground">Reading time:</strong> 15 minutes &nbsp;·&nbsp; <strong className="text-foreground">Updated:</strong> June 2026
              </p>
            </div>
          </AnimatedSection>

          {/* Table of contents */}
          <AnimatedSection>
            <div className="bg-card border border-border rounded-sm p-6 mb-14">
              <p className="font-display text-xs tracking-[0.18em] uppercase text-primary font-bold mb-4">Contents</p>
              <ol className="space-y-2">
                {STEPS.map((s) => (
                  <li key={s.step}>
                    <a
                      href={`#step-${s.step}`}
                      className="flex items-center gap-3 text-sm font-body text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <span className="font-display font-bold text-primary/50 text-xs w-5 shrink-0">{s.step < 10 ? `0${s.step}` : s.step}</span>
                      {s.name}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </AnimatedSection>

          {/* Steps */}
          {STEPS.map((s, i) => (
            <AnimatedSection key={s.step} delay={i * 0.04}>
              <div id={`step-${s.step}`} className="mb-14 scroll-mt-24">
                <div className="flex items-start gap-5 mb-5">
                  <div className="w-10 h-10 gold-gradient rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-display font-black text-sm text-primary-foreground">{s.step}</span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground leading-snug pt-2">{s.name}</h2>
                </div>
                <div className="ml-15 pl-0 md:pl-15">
                  <p className="font-body text-sm leading-relaxed text-muted-foreground mb-5">{s.text}</p>
                  <div className="bg-card border border-border rounded-sm p-5">
                    <p className="text-[10px] tracking-[0.18em] uppercase text-primary font-body font-bold mb-3">Checklist</p>
                    <ul className="space-y-2">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="w-4 h-4 rounded-sm gold-gradient flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={9} className="text-primary-foreground" />
                          </div>
                          <span className="text-sm font-body text-muted-foreground leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}

          {/* Key risks callout */}
          <AnimatedSection>
            <div className="bg-[hsl(var(--charcoal))] rounded-sm p-8 mb-14 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="relative z-10">
                <p className="text-[11px] tracking-[0.22em] uppercase text-primary font-body font-bold mb-4">Key Risks to Avoid</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Buying from an agent without verifying the developer's land title",
                    "Paying to a personal account rather than the developer's registered company account",
                    "Skipping independent legal due diligence to save on lawyer fees",
                    "Accepting an R of O title instead of a Certificate of Occupancy",
                    "Not securing Governor's Consent on your Deed of Assignment",
                    "Choosing a developer with no property management capability",
                  ].map((risk) => (
                    <div key={risk} className="flex items-start gap-3">
                      <span className="text-red-400 text-xs mt-0.5 shrink-0">✕</span>
                      <p className="text-sm font-body text-white/60 leading-snug">{risk}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Why Zithelo CTA */}
          <AnimatedSection>
            <div className="border border-border rounded-sm p-8">
              <p className="text-[11px] tracking-[0.22em] uppercase text-primary font-body font-bold mb-3">Ready to Invest?</p>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Zithelo Makes Every Step Simple for Diaspora Investors
              </h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground mb-6">
                Verified C of O title. Registered legal agreements. Multi-currency payment (NGN, GBP, USD). Full property management. Regular construction reports. No travel required. Zithelo has served investors from the UK, US, and Canada through every step of this guide.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/diaspora-investor"
                  className="group inline-flex items-center gap-2 gold-gradient text-primary-foreground px-6 py-3 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-sm hover:opacity-90 transition-opacity"
                >
                  Diaspora Investor Programme <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/faq"
                  className="group inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-sm hover:border-primary/40 transition-colors"
                >
                  Read FAQ <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
