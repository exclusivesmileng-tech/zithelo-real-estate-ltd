import type { Metadata } from "next";
import DiasporaInvestorPageClient from "./DiasporaInvestorPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

export const metadata: Metadata = {
  title: "Diaspora Investor | Invest in Nigeria Real Estate From Abroad",
  description:
    "Live abroad and own premium Nigerian real estate. Zithelo makes diaspora investment simple — verified title, structured returns, full management, and 25-year lease security.",
  keywords: [
    "diaspora investment Nigeria",
    "invest in Nigeria from UK",
    "invest in Nigeria from USA",
    "Nigerian property abroad",
    "how to buy property in Nigeria as diaspora",
    "Nigeria real estate diaspora",
  ],
  alternates: { canonical: "/diaspora-investor" },
  openGraph: {
    title: "Diaspora Investor | Own Premium Nigerian Real Estate From Abroad",
    description:
      "Invest in Nigeria's premium real estate from the UK, US, Canada, Europe. Verified title. Managed for you. 25-year lease.",
    images: [{ url: "/images/andoyi/2.png", width: 1200, height: 630, alt: "Andoyi House, Lagos — Diaspora Investment" }],
  },
};

const diasporaSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/diaspora-investor`,
  name: "Diaspora Investor | Own Premium Nigerian Real Estate From Abroad",
  url: `${SITE_URL}/diaspora-investor`,
  description:
    "Zithelo's diaspora investor programme enables Nigerians and Africans abroad to own premium Lagos real estate with verified title, 25-year lease security, and full property management.",
  audience: {
    "@type": "Audience",
    audienceType: "Diaspora investors, Nigerians abroad, African investors in UK US Canada Europe",
    geographicArea: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
  },
  mainEntity: { "@id": `${SITE_URL}/#organization` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Diaspora Investor", item: `${SITE_URL}/diaspora-investor` },
    ],
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2"],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(diasporaSchema) }}
      />
      <DiasporaInvestorPageClient />
    </>
  );
}
