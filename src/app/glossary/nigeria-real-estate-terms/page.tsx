import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Nigeria Real Estate Glossary — 40+ Terms Explained | Zithelo",
  description:
    "The definitive glossary of Nigerian real estate terms — Certificate of Occupancy, Deed of Assignment, off-plan, C of O, Governor's Consent, and 40+ more terms explained clearly.",
  alternates: { canonical: "/glossary/nigeria-real-estate-terms" },
  openGraph: {
    title: "Nigeria Real Estate Glossary | Zithelo Real Estate",
    description: "40+ Nigerian property terms explained — C of O, off-plan, Deed of Assignment, Governor's Consent, and more.",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

const TERMS: { term: string; definition: string; category: string }[] = [
  // Title & Legal
  { term: "Certificate of Occupancy (C of O)", definition: "The highest form of land title available in Nigeria, issued by a state government under the Land Use Act. A C of O grants the holder an exclusive right to occupy and use the land for up to 99 years. It is the most secure title for investment and is required for bank mortgage financing.", category: "Title & Legal" },
  { term: "Right of Occupancy (R of O)", definition: "A land title issued by a Local Government Authority (LGA). It is lower in hierarchy than a Certificate of Occupancy and carries more legal risk for property buyers. Zithelo only builds on C of O land.", category: "Title & Legal" },
  { term: "Deed of Assignment", definition: "A legal document that transfers ownership or an interest in property from one party (the assignor) to another (the assignee). A Deed of Assignment must be accompanied by Governor's Consent to be fully legally binding in Nigeria.", category: "Title & Legal" },
  { term: "Governor's Consent", definition: "Formal written approval from the state Governor for the transfer of a statutory right of occupancy or property interest. Under the Land Use Act, all property transfers must receive Governor's Consent to be legally complete and registerable.", category: "Title & Legal" },
  { term: "Land Use Act", definition: "The Nigerian federal law enacted in 1978 that vests all land in every state of Nigeria in the state Governor. The Act governs land ownership, rights of occupancy, and the approval required for all property transactions in Nigeria.", category: "Title & Legal" },
  { term: "Statutory Right of Occupancy", definition: "A right of occupancy granted by the state Governor for land in urban areas. The maximum term is 99 years. Mortgageable and transferable with Governor's Consent.", category: "Title & Legal" },
  { term: "Customary Right of Occupancy", definition: "A right of occupancy granted by a Local Government Authority for land outside urban areas. Often associated with traditional land holdings and family land.", category: "Title & Legal" },
  { term: "Excision", definition: "The process of formally removing land from government acquisition or forest reserve to make it available for private ownership. Excised land is considered safer for development than unexcised land.", category: "Title & Legal" },
  { term: "Gazette", definition: "An official government publication that lists land that has been formally excised, allocated, or designated. A gazetted property has official government recognition of its boundaries and status.", category: "Title & Legal" },
  { term: "Perfection of Title", definition: "The process of obtaining all necessary government approvals and registrations to make a property transaction fully legally binding. Includes Governor's Consent, stamp duty, and registration at the Land Registry.", category: "Title & Legal" },
  { term: "Encumbrance", definition: "A claim, lien, or restriction on a property that limits the owner's ability to sell or transfer freely. Common encumbrances include mortgages, court orders, and unpaid ground rent.", category: "Title & Legal" },
  { term: "Land Registry", definition: "The state government office responsible for registering and maintaining records of all land titles, deeds, and transactions in the state. Buyers can verify title documents at the Land Registry.", category: "Title & Legal" },

  // Investment Terms
  { term: "Off-Plan Property", definition: "Property purchased before construction is complete, typically at a discount to the final completed value. Buyers pay in stages tied to construction milestones. Higher upside potential but requires trust in the developer.", category: "Investment" },
  { term: "Gross Rental Yield", definition: "Annual rental income expressed as a percentage of the purchase price, before deducting management fees, maintenance, or taxes. The standard benchmark for comparing property investment returns across markets.", category: "Investment" },
  { term: "Net Rental Yield", definition: "Annual rental income after deducting all operating expenses (management fees, maintenance, insurance, ground rent) as a percentage of purchase price. More accurate than gross yield for assessing real returns.", category: "Investment" },
  { term: "Capital Appreciation", definition: "The increase in property value over time. Lagos residential property has historically appreciated significantly, driven by urbanisation, population growth, and infrastructure investment. Capital appreciation adds to the investor's total return.", category: "Investment" },
  { term: "CAGR (Compound Annual Growth Rate)", definition: "A measure of an investment's annualised rate of growth over a period, accounting for compounding. Used to compare the performance of different investments over different time horizons.", category: "Investment" },
  { term: "Payment Plan", definition: "A structured schedule allowing buyers to pay for a property in instalments over time, typically tied to construction milestones. Common in Nigerian off-plan property sales.", category: "Investment" },
  { term: "Equity Release", definition: "The process of releasing capital tied up in a property — either by refinancing, selling, or taking a mortgage against the property's value. Available to Nigerian property owners with clear title.", category: "Investment" },
  { term: "Diaspora Investment", definition: "Investment in Nigerian or African real estate by Nigerians and Africans living abroad (the diaspora). Typically structured to allow the entire process to be completed remotely, in foreign currency.", category: "Investment" },
  { term: "Short-Let Property", definition: "A property rented out for short periods (typically days to weeks), similar to hotel accommodation. In Lagos, short-let properties on platforms like Airbnb typically command higher nightly rates than long-let equivalents but with more management intensity.", category: "Investment" },
  { term: "Long-Let Property", definition: "A property rented on a fixed-term lease (typically 1–2 years) to a single tenant. Long-let provides predictable monthly income and lower management burden than short-let.", category: "Investment" },
  { term: "Property Management", definition: "Professional third-party management of a property on behalf of an investor — covering tenant sourcing, rent collection, maintenance, and reporting. Zithelo provides full property management on all its developments.", category: "Investment" },
  { term: "Service Charge", definition: "An annual or monthly fee paid by property owners or tenants to cover the maintenance and management of shared areas in a development — lobby, lifts, landscaping, security, generator, etc.", category: "Investment" },

  // Property Types
  { term: "Studio Apartment", definition: "A self-contained unit combining the living area, sleeping area, and kitchenette in one open-plan space, with a separate bathroom. The format of all Andoyi House units.", category: "Property Types" },
  { term: "Duplex", definition: "A two-floor residential property — typically with living areas on the ground floor and bedrooms on the upper floor. The format of Zithelo Signature Homes 1 units.", category: "Property Types" },
  { term: "Semi-Detached", definition: "A property that shares one wall with an adjacent property but has its own entrance, garden, and structure. Provides more privacy than a terrace while being more affordable than a fully detached house.", category: "Property Types" },
  { term: "Mixed-Use Development", definition: "A development that combines residential, commercial, and/or retail uses within a single building or project. Common in urban Lagos developments on high-value corridors.", category: "Property Types" },
  { term: "Serviced Apartment", definition: "A fully furnished apartment with hotel-like amenities — housekeeping, Wi-Fi, utilities, and on-site support — typically offered for short-term rentals. Zithelo Andoyi House units can be operated as serviced apartments.", category: "Property Types" },
  { term: "Fibre-Ready Property", definition: "A property built with fibre-optic broadband conduit and cabling infrastructure installed within the building structure. Residents can connect to high-speed internet immediately without waiting for installation. A standard feature of all Zithelo developments.", category: "Property Types" },
  { term: "Smart Apartment", definition: "An apartment with integrated smart home technology — including remote-controlled lighting, security, temperature, and access systems. Andoyi House is built to smart apartment specification.", category: "Property Types" },

  // Finance & Costs
  { term: "Stamp Duty", definition: "A tax payable to the state government on property transactions, calculated as a percentage of the transaction value. Required as part of title perfection in Nigeria.", category: "Finance & Costs" },
  { term: "Capital Gains Tax (CGT)", definition: "A tax on profits made from the sale of assets including property. In Nigeria, CGT is administered by the Federal Inland Revenue Service (FIRS) on property disposals.", category: "Finance & Costs" },
  { term: "Survey Plan", definition: "An official technical drawing produced by a licensed surveyor showing the exact boundaries, area, and location of a piece of land. Required for title registration in Nigeria.", category: "Finance & Costs" },
  { term: "Valuation Report", definition: "A professional assessment of a property's market value, carried out by a licensed estate surveyor and valuer. Required by banks for mortgage applications.", category: "Finance & Costs" },
  { term: "Ground Rent", definition: "An annual payment to the government or a landowner for the use of land under a leasehold arrangement. Ground rent is typically a small fixed amount in Nigerian developments.", category: "Finance & Costs" },
  { term: "Development Levy", definition: "A charge imposed by state or local government on new property developments, typically to fund local infrastructure improvements.", category: "Finance & Costs" },

  // Nigerian Market
  { term: "REDAN", definition: "Real Estate Developers Association of Nigeria — the main industry body representing real estate developers in Nigeria. REDAN membership is a credibility signal for developers.", category: "Nigerian Market" },
  { term: "NIESV", definition: "Nigerian Institution of Estate Surveyors and Valuers — the professional body for estate surveyors and valuers in Nigeria. NIESV membership is required for licensed property valuers.", category: "Nigerian Market" },
  { term: "Corporate Affairs Commission (CAC)", definition: "The Nigerian federal agency responsible for registering companies and businesses. All legitimate Nigerian companies must be registered with CAC. Search at search.cac.gov.ng.", category: "Nigerian Market" },
  { term: "Allocation Letter", definition: "A document issued by a government agency (federal, state, or local) allocating land to a specific individual or company. It is a preliminary document that must be converted to a formal title.", category: "Nigerian Market" },
  { term: "Silicon Lagos", definition: "The informal name for the Yaba district of Lagos — Nigeria's technology and innovation hub. Home to Paystack, Flutterwave, Andela, Interswitch, UNILAG, and many other tech companies. Yaba has the highest concentration of young professionals in Nigeria.", category: "Nigerian Market" },
];

const CATEGORIES = [...new Set(TERMS.map((t) => t.category))];

const glossarySchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": `${SITE_URL}/glossary/nigeria-real-estate-terms`,
  name: "Nigeria Real Estate Glossary — 40+ Terms Explained",
  url: `${SITE_URL}/glossary/nigeria-real-estate-terms`,
  description:
    "The definitive glossary of Nigerian real estate terms — Certificate of Occupancy, Deed of Assignment, off-plan, Governor's Consent, and 40+ more terms explained clearly.",
  author: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-NG",
  hasDefinedTerm: TERMS.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.definition,
    inDefinedTermSet: `${SITE_URL}/glossary/nigeria-real-estate-terms`,
  })),
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE_URL}/glossary` },
      { "@type": "ListItem", position: 3, name: "Nigeria Real Estate Terms", item: `${SITE_URL}/glossary/nigeria-real-estate-terms` },
    ],
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".term-name"],
  },
};

export default function GlossaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
      />
      <PageHero
        title="Nigeria Real Estate"
        titleAccent="Glossary"
        subtitle={`${TERMS.length}+ Nigerian property terms explained clearly — from Certificate of Occupancy to off-plan, short-let to CAGR.`}
        image="/images/about-hero.jpg"
        breadcrumb="Glossary"
      />

      <section className="section-padding">
        <div className="max-w-[960px] mx-auto">

          {/* Category jump links */}
          <AnimatedSection>
            <div className="flex flex-wrap gap-2 mb-14 pb-10 border-b border-border">
              {CATEGORIES.map((cat) => (
                <a
                  key={cat}
                  href={`#${cat.toLowerCase().replace(/\s+/g, "-").replace(/[&]/g, "")}`}
                  className="text-xs font-body font-semibold px-4 py-2 border border-border rounded-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors duration-200"
                >
                  {cat}
                </a>
              ))}
            </div>
          </AnimatedSection>

          {CATEGORIES.map((cat, ci) => {
            const catTerms = TERMS.filter((t) => t.category === cat);
            const catId = cat.toLowerCase().replace(/\s+/g, "-").replace(/[&]/g, "");
            return (
              <AnimatedSection key={cat} delay={ci * 0.05}>
                <div id={catId} className="mb-16 scroll-mt-24">
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="font-display text-xs tracking-[0.22em] uppercase text-primary font-bold whitespace-nowrap">
                      {cat}
                    </h2>
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs text-muted-foreground font-body">{catTerms.length} terms</span>
                  </div>
                  <div className="space-y-0">
                    {catTerms.map((t) => (
                      <div key={t.term} className="border-b border-border last:border-b-0 py-5">
                        <p className="term-name font-display font-bold text-base text-foreground mb-2">{t.term}</p>
                        <p className="font-body text-sm leading-relaxed text-muted-foreground">{t.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}

          {/* CTA */}
          <AnimatedSection>
            <div className="border-t border-border pt-14 text-center">
              <p className="text-[11px] tracking-[0.22em] uppercase text-primary font-body font-semibold mb-3">Go Deeper</p>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Ready to Apply This Knowledge?</h3>
              <p className="font-body text-sm text-muted-foreground mb-8 max-w-md mx-auto">
                Read the complete diaspora investor guide, or explore Zithelo projects with verified C of O title.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/guides/how-to-buy-property-in-nigeria-from-abroad" className="group inline-flex items-center gap-2 gold-gradient text-primary-foreground px-6 py-3 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-sm hover:opacity-90 transition-opacity">
                  Read the Full Guide <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link href="/projects" className="group inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-sm hover:border-primary/40 transition-colors">
                  View Projects <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
