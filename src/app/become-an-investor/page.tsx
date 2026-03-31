import type { Metadata } from "next";
import BecomeAnInvestorPageClient from "./BecomeAnInvestorPageClient";

export const metadata: Metadata = {
  title: "Become an Investor | Structure Your Real Estate Portfolio",
  description:
    "Invest in Zithelo's premium Lagos developments — off-plan units, co-investment, or land funding. Verified title, 25-year lease, and full management support.",
  keywords: [
    "invest in Lagos real estate",
    "off-plan property investment Nigeria",
    "real estate co-investment Lagos",
    "become a real estate investor Nigeria",
    "diaspora property investment Lagos",
  ],
  alternates: { canonical: "/become-an-investor" },
  openGraph: {
    title: "Become an Investor | Zithelo Real Estate Lagos",
    description:
      "Off-plan units, co-investment, and land funding in premium Lagos developments. Verified title. 25-year lease.",
    images: [{ url: "/images/andoyi/2.png", width: 1200, height: 630, alt: "Zithelo Investment Opportunities" }],
  },
};

export default function Page() {
  return <BecomeAnInvestorPageClient />;
}
