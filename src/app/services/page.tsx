import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Services | End-to-End Property Development & Management",
  description:
    "Zithelo offers full-service real estate development — from site acquisition and construction to leasing, property management, and investor returns.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Zithelo Real Estate",
    description:
      "Full-service real estate: site acquisition, construction, leasing, property management, and investor support.",
  },
};

export default function Page() {
  return <ServicesPageClient />;
}
