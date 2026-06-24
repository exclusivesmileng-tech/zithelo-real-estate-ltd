import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

const FAQ_CATEGORIES = [
  {
    id: "about",
    title: "About Zithelo",
    items: [
      {
        q: "What is Zithelo Real Estate Limited?",
        a: "Zithelo Real Estate Limited is a premium Nigerian property development company building fibre-ready, professionally managed urban residences in Lagos. Zithelo is known for pioneering the 25-year lease investment model in Nigeria, offering diaspora investors and professionals a structured, secure route to property ownership and passive income.",
      },
      {
        q: "Where is Zithelo based?",
        a: "Zithelo Real Estate Limited is headquartered in Atlanta, USA, with active development operations in Lagos, Nigeria. The company operates pan-African real estate projects with offices and investor relations support serving clients in Nigeria, the United Kingdom, the United States, and Canada.",
      },
      {
        q: "Is Zithelo Real Estate a legitimate Nigerian company?",
        a: "Yes. Zithelo Real Estate Limited is a duly incorporated company in Nigeria. All Zithelo developments are built on properties with verified land title, including Certificates of Occupancy (C of O). Zithelo provides transparent investor reporting, registered documentation, and full legal compliance with Nigerian property laws.",
      },
      {
        q: "Who founded Zithelo Real Estate?",
        a: "Zithelo Real Estate Limited was founded by Dr. Oluwaseun Akinbobola (Chairman), a Wharton School and Strathmore Business School alumnus, and Mrs. Ibitayo Akinbobola (CEO), an alumna of Staffordshire University and the University of Greenwich. Together they bring international business education and deep expertise in African real estate markets.",
      },
      {
        q: "What does Zithelo build?",
        a: "Zithelo builds premium, fibre-ready residential developments in Lagos' most strategic urban corridors. Current projects include Andoyi House — 88 smart studio apartments in Yaba, Lagos — and Zithelo Signature Homes 1, premium semi-detached duplexes in Ikeja, Lagos. All Zithelo developments include smart home infrastructure, professional management, and verified title.",
      },
      {
        q: "What makes Zithelo different from other Nigerian real estate developers?",
        a: "Three things set Zithelo apart: (1) The 25-Year Lease Model — a structured, long-term investment vehicle unique to Zithelo in Nigeria. (2) Verified title on every project — Certificates of Occupancy confirmed before sales open. (3) Full property management — Zithelo manages the property and delivers rental income to investors, requiring no landlord involvement. No other Nigerian developer packages these three together.",
      },
    ],
  },
  {
    id: "lease",
    title: "The 25-Year Lease Model",
    items: [
      {
        q: "What is the Zithelo 25-year lease model?",
        a: "The Zithelo 25-year lease model is a structured property investment instrument. Investors purchase a 25-year leasehold interest in a Zithelo development — securing the right to the property and its rental income for 25 years. The model provides investors with legal title security, structured returns, and professional management throughout the lease period. It is specifically designed for diaspora investors and professionals who want passive income without landlord responsibilities.",
      },
      {
        q: "Why does Zithelo offer a 25-year lease instead of outright sale?",
        a: "The 25-year lease model creates a more structured and investor-friendly experience than outright ownership. It allows Zithelo to maintain quality control over the development, deliver consistent rental management, and provide investors with a defined income horizon and exit timeline. The model is also more flexible for diaspora investors who do not wish to navigate the complexities of Nigerian property registration in person.",
      },
      {
        q: "What happens after the 25-year lease period ends?",
        a: "At the end of the 25-year lease period, investors have options including renewal of the lease, exit from the investment at the appreciated property value, or conversion to full ownership subject to the terms agreed at the time of purchase. Full terms are specified in the investment agreement provided before purchase.",
      },
      {
        q: "Is the 25-year lease model registered and legal in Nigeria?",
        a: "Yes. Leasehold property arrangements are fully legal and recognised under Nigerian property law, specifically under the Land Use Act. The lease agreement is a registered legal instrument and provides the investor with enforceable property rights under Nigerian law.",
      },
      {
        q: "Can I sell my 25-year lease to someone else?",
        a: "Yes. Leasehold interests are transferable assets under Nigerian law. You may sell, assign, or transfer your Zithelo lease interest to another party at any time during the lease period, subject to the transfer terms outlined in your investment agreement.",
      },
      {
        q: "How does the 25-year lease protect investors?",
        a: "The 25-year lease protects investors through: (1) Verified Certificate of Occupancy on the underlying land — the strongest title available in Nigeria. (2) Registered lease agreement — a legal document enforceable in Nigerian courts. (3) Structured rental management — Zithelo operates the property, eliminating vacancy risk management for investors. (4) Transparent reporting — investors receive regular statements of rental income and property performance.",
      },
    ],
  },
  {
    id: "andoyi",
    title: "Andoyi House",
    items: [
      {
        q: "What is Andoyi House?",
        a: "Andoyi House is Zithelo's flagship development — 88 premium, fibre-ready smart studio apartments located in Yaba, Lagos (Silicon Lagos). Each unit is fully finished, managed, and available for short-let or long-let rental. Andoyi House is designed for diaspora investors and modern professionals seeking passive rental income from Lagos' most dynamic urban district.",
      },
      {
        q: "Where exactly is Andoyi House located?",
        a: "Andoyi House is located in Yaba, Lagos State, Nigeria — at approximate coordinates 6.5095°N, 3.3711°E. Yaba is Lagos' technology and innovation district, home to major tech companies, universities, co-working spaces, and the highest concentration of young professionals in Nigeria. It is known internationally as 'Silicon Lagos.'",
      },
      {
        q: "How many units does Andoyi House have?",
        a: "Andoyi House comprises 88 studio apartment units. Each unit is individually available for investment and will be professionally managed by Zithelo's property management team upon completion.",
      },
      {
        q: "What does 'fibre-ready' mean for Andoyi House?",
        a: "Fibre-ready means Andoyi House has been built with fibre-optic broadband infrastructure integrated into the building structure — conduits, cables, and network points are installed within the walls and ceiling. Residents can connect to high-speed fibre internet immediately upon moving in without waiting for installation. This is a rare feature in Nigerian residential developments and is a major draw for the tech-professional tenant profile in Yaba.",
      },
      {
        q: "What is the price of an Andoyi House unit?",
        a: "Unit prices at Andoyi House are available on request. Zithelo accepts payment in Nigerian Naira (NGN), US Dollars (USD), and British Pounds (GBP). Structured payment plans are available. Contact Zithelo at invest@zithelorealestate.com or visit the Andoyi House page to request current pricing.",
      },
      {
        q: "What is the expected rental yield at Andoyi House?",
        a: "Andoyi House is structured for a gross rental yield of approximately 8% per annum based on Yaba short-let market rates. The technology professional demographic in Yaba maintains strong year-round rental demand. Use the Zithelo ROI Calculator to model your projected returns based on your investment amount and preferred strategy.",
      },
      {
        q: "When will Andoyi House be ready for delivery?",
        a: "Andoyi House is targeting delivery in 2027. Zithelo publishes regular construction progress updates on its website and social media channels. Off-plan investors are given priority access and structured payment plans tied to construction milestones.",
      },
    ],
  },
  {
    id: "signature",
    title: "Signature Homes",
    items: [
      {
        q: "What is Zithelo Signature Homes 1?",
        a: "Zithelo Signature Homes 1 is a premium residential development of semi-detached duplexes located off Toyin Street, Ikeja, Lagos. The development is designed for diaspora returnees and quality-focused professionals seeking a flagship family home in one of Lagos' most established neighbourhoods.",
      },
      {
        q: "Where is Signature Homes located?",
        a: "Signature Homes is located off Toyin Street, Ikeja, Lagos State. Ikeja is Lagos State's capital and a major commercial and residential hub with excellent infrastructure, transport links, and close proximity to Murtala Muhammed International Airport.",
      },
      {
        q: "What type of property is Signature Homes?",
        a: "Signature Homes 1 features premium semi-detached duplexes — multi-floor family residences with private gardens, premium finishes, and smart infrastructure. The duplex format is ideal for families and professionals who want the prestige of an Ikeja address with the quality of a Zithelo development.",
      },
      {
        q: "What are the key features of Signature Homes?",
        a: "Signature Homes 1 features include: fibre-ready broadband infrastructure, premium interior finishes and fittings, verified title documentation, structured investor returns, full property management service, and a diaspora-friendly investment process allowing purchase from abroad in NGN, USD, or GBP.",
      },
      {
        q: "Who is Signature Homes designed for?",
        a: "Signature Homes 1 is designed for two primary audiences: (1) diaspora returnees seeking a high-quality Lagos family home they can purchase from abroad with confidence; and (2) premium property investors looking for capital appreciation in Ikeja, one of Lagos' most stable and established residential markets.",
      },
    ],
  },
  {
    id: "investing",
    title: "Investing with Zithelo",
    items: [
      {
        q: "How do I invest with Zithelo Real Estate?",
        a: "To invest with Zithelo: (1) Browse available projects at zithelo.com/projects. (2) Use the Investor Quiz to identify which project matches your goals. (3) Contact the Zithelo investment team at invest@zithelorealestate.com. (4) Receive project documentation, pricing, and legal agreement. (5) Execute the investment agreement and initiate payment. Zithelo's team guides you through every step, including for investors based abroad.",
      },
      {
        q: "Is investing with Zithelo safe?",
        a: "Zithelo prioritises investor protection through verified title, registered legal agreements, and transparent reporting. All developments are built on properties with Certificates of Occupancy — the strongest land title available in Nigeria. Investment agreements are legally registered instruments. Zithelo has never missed a committed deliverable to investors. As with any property investment, returns are subject to market conditions.",
      },
      {
        q: "What returns can I expect from a Zithelo investment?",
        a: "Andoyi House is structured for approximately 8% gross rental yield per annum, with projected 5% annual capital appreciation based on Yaba market trends. Signature Homes targets approximately 6.5% gross yield with 7% projected appreciation in Ikeja. These are illustrative projections, not guarantees. Use the Zithelo ROI Calculator at zithelo.com/tools/roi-calculator to model your specific scenario.",
      },
      {
        q: "What is off-plan property investment?",
        a: "Off-plan property investment means purchasing a property before it is fully constructed, typically at a lower price than the completed value. You secure your unit at today's price, benefit from capital appreciation during construction, and receive the property at completion. Zithelo ties payment plans to construction milestones, ensuring investor funds are protected throughout the build.",
      },
      {
        q: "Is off-plan property investment in Nigeria safe?",
        a: "Off-plan investment with reputable developers is a legitimate and widely practised strategy in Nigeria. The key risk with off-plan is developer reliability. Zithelo mitigates this through: verified land title before sales open, milestone-linked payment schedules, registered investment agreements, and regular construction reporting. Choose only developers with verified title and a track record of delivery.",
      },
      {
        q: "What rental strategy options does Zithelo offer?",
        a: "Zithelo offers investors both short-let and long-let rental strategies. Short-let (serviced apartment) typically generates higher gross yields but with more operational intensity. Long-let provides stable, predictable monthly income. Zithelo's property management team operates both strategies and advises investors on the most profitable option for their specific unit and market conditions.",
      },
      {
        q: "Does Zithelo manage the property after I buy?",
        a: "Yes. Full property management is included with every Zithelo investment. Zithelo handles tenant sourcing, screening, rent collection, maintenance, and reporting. Investors receive structured rental income without any day-to-day landlord responsibilities. This is particularly valuable for diaspora investors who are not based in Nigeria.",
      },
    ],
  },
  {
    id: "diaspora",
    title: "Diaspora Investors",
    items: [
      {
        q: "Can Nigerians living abroad invest with Zithelo?",
        a: "Yes. Zithelo's investment process is specifically designed for diaspora investors. The entire process — from consultation to signing to payment — can be completed remotely without visiting Nigeria. Zithelo accepts payment in GBP, USD, and NGN, and provides all documentation digitally.",
      },
      {
        q: "How do I buy a Zithelo property from the UK?",
        a: "UK-based investors can purchase a Zithelo property entirely online: (1) Contact the investment team at invest@zithelorealestate.com. (2) Receive and review the project prospectus and investment agreement. (3) Execute the agreement digitally. (4) Transfer funds in GBP via international wire transfer to Zithelo's designated account. (5) Receive your registered investment documentation. Zithelo has served investors from London, Manchester, Birmingham, and across the UK.",
      },
      {
        q: "Can I pay in pounds sterling (GBP) or US dollars (USD)?",
        a: "Yes. Zithelo accepts payment in Nigerian Naira (NGN), British Pounds Sterling (GBP), and US Dollars (USD). Exchange rates are fixed at the time of payment agreement. This removes currency risk for diaspora investors who earn in foreign currency.",
      },
      {
        q: "What documents do I need as a diaspora investor?",
        a: "Diaspora investors typically need: (1) Valid Nigerian or foreign passport. (2) Proof of address (UK/US/Canada utility bill or bank statement). (3) Bank account details for rental income remittance. (4) Completed Zithelo investor KYC form. Zithelo's team guides you through document requirements specific to your country of residence.",
      },
      {
        q: "How do I repatriate my rental income from Nigeria?",
        a: "Rental income from Zithelo investments can be remitted abroad through Nigerian banks via approved international transfer channels including SWIFT. Zithelo works with investors and their banks to ensure smooth income repatriation. Many diaspora investors elect to receive income in Naira into a Nigerian domiciliary account and transfer periodically.",
      },
      {
        q: "Do I need to travel to Nigeria to buy?",
        a: "No. The entire Zithelo investment process can be completed remotely. Documents are signed digitally, payments are made via international wire transfer, and investment agreements are delivered electronically. Zithelo offers virtual property tours and video consultations for investors who cannot travel to Lagos.",
      },
      {
        q: "Has Zithelo served diaspora investors before?",
        a: "Yes. Zithelo has served investors from the United Kingdom, United States, and Canada. The diaspora investor process is a core part of Zithelo's business model, not an afterthought. The /diaspora-investor page at zithelo.com outlines the complete process.",
      },
    ],
  },
  {
    id: "legal",
    title: "Legal & Title",
    items: [
      {
        q: "What is a Certificate of Occupancy (C of O)?",
        a: "A Certificate of Occupancy (C of O) is the highest form of land title available in Nigeria, issued by the state government under the Land Use Act. It grants the holder an exclusive right to occupy and use the land for a specified period (usually 99 years). A C of O is the most secure title for property investment in Nigeria and is required for bank mortgages.",
      },
      {
        q: "What is a Deed of Assignment?",
        a: "A Deed of Assignment is a legal document that transfers ownership or interest in a property from one party (the assignor) to another (the assignee). In a Zithelo investment, the Deed of Assignment documents the transfer of the 25-year lease interest from Zithelo to the investor and is a registered legal instrument.",
      },
      {
        q: "Does Zithelo have verified title on all its properties?",
        a: "Yes. All Zithelo developments are built on land with verified Certificates of Occupancy before any investment offer is made. Investors can request title verification documentation at any point in the process.",
      },
      {
        q: "What is Governor's Consent and do I need it?",
        a: "Governor's Consent is formal approval from the state Governor for the transfer of a statutory right of occupancy or leasehold interest from one party to another. Under the Land Use Act, transactions involving land must receive Governor's Consent to be legally complete. Zithelo handles all Governor's Consent applications on behalf of investors.",
      },
      {
        q: "What is Right of Occupancy (R of O)?",
        a: "A Right of Occupancy (R of O) is a lesser form of land title issued by local government councils for properties on land that has not yet been granted a state-level Certificate of Occupancy. It is valid but carries more risk than a C of O. Zithelo only builds on C of O-titled land, not R of O land.",
      },
      {
        q: "How do I verify a Nigerian property title?",
        a: "To verify a Nigerian property title: (1) Request a copy of the title document (C of O, Deed, or Allocation Letter) from the developer. (2) Cross-check the document at the relevant state Land Registry. (3) Engage a registered Nigerian lawyer to conduct due diligence. Zithelo welcomes independent legal due diligence by investor solicitors.",
      },
    ],
  },
  {
    id: "payment",
    title: "Financing & Payment",
    items: [
      {
        q: "Can I buy a Zithelo property on a payment plan?",
        a: "Yes. Zithelo offers structured payment plans for all projects. Off-plan investors can typically spread payments across construction milestones — for example, 30% at signing, 30% at foundation completion, 20% at decking, and 20% at handover. Full payment plan schedules are provided in the project prospectus.",
      },
      {
        q: "What currencies does Zithelo accept?",
        a: "Zithelo accepts payment in Nigerian Naira (NGN), British Pounds Sterling (GBP), and US Dollars (USD). This multi-currency capability is specifically designed for diaspora investors who earn in foreign currencies.",
      },
      {
        q: "Can I get a mortgage for a Zithelo property?",
        a: "Zithelo is working with Nigerian financial institutions to facilitate mortgage financing for qualified buyers. Currently, most investors use personal funds or the Zithelo payment plan. Contact the investment team for the latest information on mortgage availability.",
      },
      {
        q: "What is the minimum investment amount?",
        a: "The minimum investment varies by project. For Andoyi House, minimum off-plan investment starts from $20,000 USD equivalent. For Signature Homes, the minimum is higher given the duplex nature of the development. Contact invest@zithelorealestate.com for current pricing.",
      },
      {
        q: "Are there any hidden fees?",
        a: "No. Zithelo provides full fee transparency upfront. The investment agreement details all costs including the unit price, legal fees, documentation fees, and property management fee. There are no undisclosed charges.",
      },
      {
        q: "What payment methods does Zithelo accept?",
        a: "Zithelo accepts bank transfers (SWIFT for international and domestic wire for local), and in some cases, other payment methods by prior arrangement. Cash payments are not accepted. All transactions must be traceable and documented for legal compliance.",
      },
    ],
  },
  {
    id: "yaba",
    title: "Yaba & Lagos Market",
    items: [
      {
        q: "Why is Yaba a good place to invest in Lagos?",
        a: "Yaba is Lagos' technology and innovation district — home to the highest concentration of tech companies, startups, co-working spaces, and universities in Nigeria. The area has seen sustained double-digit rental growth as the tech sector expanded. Rental demand is driven by young professionals and tech employees who want to live close to work in a walkable urban environment. Infrastructure is being actively upgraded, and Yaba is one of the few areas of Lagos with both road access and proximity to Lagos Island.",
      },
      {
        q: "What is 'Silicon Lagos'?",
        a: "Silicon Lagos is the informal name for the Yaba technology district, drawing comparison to Silicon Valley in California. The area houses companies including Paystack, Flutterwave, Andela, Interswitch, and dozens of major Nigerian tech businesses, as well as the University of Lagos (UNILAG) and Yaba College of Technology (YABATECH). The tech ecosystem drives sustained demand for premium rental accommodation.",
      },
      {
        q: "What is the rental yield in Yaba, Lagos?",
        a: "Short-let rental yields in Yaba currently range from 7–10% gross per annum based on prevailing market rates for serviced studio and one-bedroom apartments. Andoyi House is structured to target approximately 8% gross yield. Long-let yields are typically 5–7%. These figures reflect market conditions as of mid-2026 and may vary.",
      },
      {
        q: "Who typically rents in Yaba, Lagos?",
        a: "Yaba's primary tenant profile includes: technology professionals and employees at Yaba-based companies, UNILAG and YABATECH lecturers and postgraduate students, young professionals in their 20s–30s seeking urban living, and international professionals on medium-term assignments. This demographic is low-risk, income-stable, and values quality accommodation over price.",
      },
      {
        q: "How does Yaba compare to Victoria Island for investment?",
        a: "Yaba and Victoria Island serve different investor profiles. Victoria Island offers higher absolute prices and strong demand from corporate and diplomatic tenants, but entry prices are significantly higher, making yields lower as a percentage. Yaba offers stronger yield percentage returns at lower entry cost, with higher demand growth potential as the tech sector expands. Yaba is widely considered the higher-growth, better-value investment in 2025–2030.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact & Support",
    items: [
      {
        q: "How do I contact Zithelo Real Estate?",
        a: "You can reach Zithelo Real Estate at: Email — invest@zithelorealestate.com (investment enquiries) or hello@zithelorealestate.com (general). Phone/WhatsApp — available on the Contact page at zithelo.com/contact. Zithelo also has offices in Atlanta (USA) and Lagos (Nigeria). Response time is typically within one business day.",
      },
      {
        q: "Does Zithelo have a physical office I can visit?",
        a: "Yes. Zithelo has development operations in Lagos, Nigeria, and a headquarters in Atlanta, USA. Investors and prospective buyers are welcome to schedule in-person meetings at either location. Virtual consultations are available for investors unable to travel.",
      },
      {
        q: "How do I book a consultation with Zithelo?",
        a: "To book a consultation, visit zithelo.com/contact and fill in the contact form, or email invest@zithelorealestate.com with your name, country of residence, and investment budget. A member of the Zithelo investment team will respond within one business day to schedule a call.",
      },
      {
        q: "Does Zithelo have a referral programme?",
        a: "Yes. Zithelo runs a structured referral programme — refer a friend or colleague who completes a Zithelo investment and receive a referral bonus. Visit zithelo.com/refer for current referral terms and rewards.",
      },
      {
        q: "Can I take an investor quiz to find the right Zithelo project for me?",
        a: "Yes. Zithelo offers a free Investor Quiz at zithelo.com/investor-quiz. Answer 5 questions about your investment budget, timeline, income goals, and risk profile, and the quiz recommends the Zithelo project that best matches your objectives.",
      },
    ],
  },
];

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
