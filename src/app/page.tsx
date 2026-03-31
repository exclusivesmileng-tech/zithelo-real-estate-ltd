import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "Zithelo Real Estate Limited | Premium Urban Development in Africa",
  description:
    "Invest in premium, fibre-ready smart apartments across Africa's fastest-growing cities. Verified title, 25-year lease security, full management support. Diaspora-trusted.",
  keywords: [
    "real estate Nigeria",
    "Lagos property investment",
    "diaspora investor Nigeria",
    "Andoyi House Yaba",
    "smart apartments Lagos",
    "25 year lease property Nigeria",
    "off-plan property Lagos",
    "Zithelo Homes",
    "real estate investment Africa",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Zithelo Real Estate | Premium Smart Apartments in Lagos",
    description:
      "Premium, fibre-ready real estate investment in Africa's fastest-growing cities. Verified title. 25-year lease. Diaspora-trusted.",
    images: [
      {
        url: "/images/andoyi/2.png",
        width: 1200,
        height: 630,
        alt: "Andoyi House — Premium Smart Apartments by Zithelo, Yaba Lagos",
      },
    ],
  },
};

export default function Page() {
  return <HomePageClient />;
}
