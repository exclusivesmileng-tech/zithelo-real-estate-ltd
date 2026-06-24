import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import CopyButton from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Media & Press Kit | Zithelo Real Estate",
  description:
    "Zithelo Real Estate press kit — company overview, logos, founder headshots, key facts, notable quotes, and press contact. For journalists, bloggers, and media partners.",
  alternates: { canonical: "/media" },
  openGraph: {
    title: "Media & Press Kit | Zithelo Real Estate",
    description: "Zithelo Real Estate press resources — company facts, logos, founder bios, and media contact.",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

const mediaSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/media`,
  name: "Zithelo Real Estate — Media & Press Kit",
  url: `${SITE_URL}/media`,
  description:
    "Official press resources for Zithelo Real Estate Limited — company overview, founder bios, logo assets, key facts, media quotes, and press contact information.",
  author: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Media", item: `${SITE_URL}/media` },
    ],
  },
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2"] },
};

const FAST_FACTS = [
  { label: "Company",          value: "Zithelo Real Estate Limited" },
  { label: "Founded",          value: "2023" },
  { label: "Headquarters",     value: "Atlanta, USA" },
  { label: "Operations",       value: "Lagos, Nigeria" },
  { label: "Chairman",         value: "Dr. Oluwaseun Akinbobola" },
  { label: "CEO",              value: "Mrs. Ibitayo Akinbobola" },
  { label: "Current Projects", value: "Andoyi House (Yaba), Signature Homes (Ikeja)" },
  { label: "Units (pipeline)", value: "88+ residential units" },
  { label: "Target Cities",    value: "Lagos, Accra, Nairobi (pipeline)" },
  { label: "Website",          value: "zithelo.com" },
  { label: "Press Contact",    value: "press@zithelorealestate.com" },
];

const QUOTES = [
  {
    quote: "We are building the infrastructure for the next generation of African urban professionals — people who deserve to live in spaces that reflect their ambitions.",
    speaker: "Dr. Oluwaseun Akinbobola",
    title: "Chairman, Zithelo Real Estate Limited",
  },
  {
    quote: "The diaspora is not just an investment audience — they are the future of African cities. Our job is to build the homes that make their return possible.",
    speaker: "Mrs. Ibitayo Akinbobola",
    title: "Chief Executive Officer, Zithelo Real Estate Limited",
  },
];

const BOILERPLATE = `Zithelo Real Estate Limited is a premium urban property developer building fibre-ready, professionally managed residential developments in Africa's fastest-growing cities. Founded by Dr. Oluwaseun Akinbobola (Chairman) and Mrs. Ibitayo Akinbobola (CEO), Zithelo is headquartered in Atlanta, USA, with active developments in Lagos, Nigeria. The company is known for pioneering the 25-year lease investment model in Nigeria — offering diaspora investors and modern professionals a structured, secure route to property ownership and passive income. Current projects include Andoyi House (88 smart studio apartments, Yaba Lagos) and Zithelo Signature Homes 1 (premium duplexes, Ikeja Lagos). www.zithelo.com`;

export default function MediaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mediaSchema) }} />
      <PageHero
        title="Media &"
        titleAccent="Press Kit"
        subtitle="Official resources for journalists, bloggers, and media partners covering Zithelo Real Estate."
        image="/images/about-hero.jpg"
        breadcrumb="Media"
      />

      <section className="section-padding">
        <div className="max-w-[960px] mx-auto">

          {/* Press contact callout */}
          <AnimatedSection>
            <div className="bg-card border border-border rounded-sm p-6 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-primary font-body font-bold mb-1">Press Contact</p>
                <p className="font-display font-bold text-lg text-foreground">press@zithelorealestate.com</p>
                <p className="font-body text-sm text-muted-foreground mt-1">For media enquiries, interview requests, and asset access. Response within one business day.</p>
              </div>
              <a
                href="mailto:press@zithelorealestate.com"
                className="inline-flex items-center gap-2 gold-gradient text-primary-foreground px-6 py-3 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-sm hover:opacity-90 transition-opacity shrink-0"
              >
                Email Press Team <ArrowRight size={14} />
              </a>
            </div>
          </AnimatedSection>

          {/* Company boilerplate */}
          <AnimatedSection>
            <div className="mb-12">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Standard Boilerplate</h2>
              <div className="bg-card border border-border rounded-sm p-6">
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{BOILERPLATE}</p>
                <CopyButton text={BOILERPLATE} />
              </div>
            </div>
          </AnimatedSection>

          {/* Fast facts */}
          <AnimatedSection>
            <div className="mb-12">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Fast Facts</h2>
              <div className="border border-border rounded-sm overflow-hidden">
                {FAST_FACTS.map((f, i) => (
                  <div key={f.label} className={`flex flex-col sm:flex-row sm:items-center gap-1 px-5 py-3.5 ${i % 2 === 0 ? "bg-card" : "bg-background"} border-b border-border last:border-b-0`}>
                    <span className="text-[11px] tracking-[0.12em] uppercase font-body font-semibold text-muted-foreground sm:w-44 shrink-0">{f.label}</span>
                    <span className="font-body text-sm text-foreground">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Founders */}
          <AnimatedSection>
            <div className="mb-12">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">Founders</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: "Dr. Oluwaseun Akinbobola",
                    title: "Chairman",
                    bio: "Dr. Akinbobola is an alumnus of the Wharton School (University of Pennsylvania) and Strathmore Business School. A serial entrepreneur and real estate professional, he founded Zithelo to bring institutional-quality urban development to Africa's fastest-growing cities.",
                    slug: "dr-oluwaseun-akinbobola",
                  },
                  {
                    name: "Mrs. Ibitayo Akinbobola",
                    title: "Chief Executive Officer",
                    bio: "Mrs. Akinbobola holds degrees from Staffordshire University and the University of Greenwich. She leads Zithelo's operations, investor relations, and customer experience with a focus on diaspora investor accessibility and premium property management standards.",
                    slug: "mrs-ibitayo-akinbobola",
                  },
                ].map((f) => (
                  <div key={f.name} className="border border-border rounded-sm p-5">
                    <p className="font-display font-bold text-base text-foreground">{f.name}</p>
                    <p className="text-xs text-primary font-body font-semibold mb-3">{f.title}</p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{f.bio}</p>
                    <Link href={`/leadership/${f.slug}`} className="inline-flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-primary transition-colors">
                      Full profile <ArrowRight size={11} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Quotes */}
          <AnimatedSection>
            <div className="mb-12">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">Approved Quotes</h2>
              <div className="space-y-4">
                {QUOTES.map((q) => (
                  <div key={q.speaker} className="border-l-4 border-primary pl-6 py-2">
                    <p className="font-body text-sm leading-relaxed text-muted-foreground italic mb-3">&ldquo;{q.quote}&rdquo;</p>
                    <p className="font-display font-bold text-sm text-foreground">{q.speaker}</p>
                    <p className="text-xs text-muted-foreground font-body">{q.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Assets */}
          <AnimatedSection>
            <div className="mb-12">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Brand Assets</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Zithelo Logo (PNG)", desc: "White + coloured versions, transparent background", href: "/images/zithelo-logo-colored.png" },
                  { label: "Andoyi House Imagery", desc: "High-resolution project photography", href: "/images/andoyi/2.png" },
                ].map((asset) => (
                  <a
                    key={asset.label}
                    href={asset.href}
                    download
                    className="group flex items-center gap-4 border border-border rounded-sm p-4 hover:border-primary/40 transition-colors duration-200"
                  >
                    <div className="w-9 h-9 border border-border rounded-sm flex items-center justify-center shrink-0 group-hover:border-primary/40 transition-colors">
                      <Download size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="font-body font-semibold text-sm text-foreground">{asset.label}</p>
                      <p className="font-body text-xs text-muted-foreground">{asset.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
              <p className="text-xs font-body text-muted-foreground mt-4">
                For additional brand assets, high-res photography, or video content, email <span className="text-primary">press@zithelorealestate.com</span>.
              </p>
            </div>
          </AnimatedSection>

          {/* Coverage links / notes */}
          <AnimatedSection>
            <div className="bg-[hsl(var(--charcoal))] rounded-sm p-8">
              <p className="text-[11px] tracking-[0.22em] uppercase text-primary font-body font-bold mb-3">Pitch Angles</p>
              <h3 className="font-display text-xl font-bold text-white mb-4">Story Ideas for Journalists</h3>
              <ul className="space-y-3 mb-6">
                {[
                  "The developer pioneering the 25-year lease model in Nigerian real estate",
                  "How the diaspora is reshaping Lagos' property market — and who's building for them",
                  "Silicon Lagos: Why Yaba is Nigeria's hottest real estate investment in 2026",
                  "The Wharton-educated couple building premium homes for Africa's urban professionals",
                  "Is off-plan property in Nigeria safe? What investors need to know in 2026",
                ].map((angle) => (
                  <li key={angle} className="flex items-start gap-3">
                    <span className="text-primary text-sm shrink-0 mt-0.5">→</span>
                    <p className="font-body text-sm text-white/70 leading-snug">{angle}</p>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:press@zithelorealestate.com?subject=Media Enquiry — Zithelo Real Estate"
                className="inline-flex items-center gap-2 gold-gradient text-primary-foreground px-6 py-3 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-sm hover:opacity-90 transition-opacity"
              >
                Contact Press Team <ArrowRight size={14} />
              </a>
            </div>
          </AnimatedSection>

        </div>
      </section>
    </>
  );
}
