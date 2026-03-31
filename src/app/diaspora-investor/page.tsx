import type { Metadata } from "next";
import DiasporaInvestorPageClient from "./DiasporaInvestorPageClient";

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

export default function Page() {
  return <DiasporaInvestorPageClient />;
}
