import type { Metadata } from "next";
import TermsOfServicePageClient from "./TermsOfServicePageClient";

export const metadata: Metadata = {
  title: "Terms of Service | Zithelo Real Estate",
  description:
    "Read Zithelo Real Estate's terms of service. Understand your rights, obligations, and our policies when using our website and services.",
  alternates: { canonical: "/terms-of-service" },
  robots: { index: true, follow: false },
};

export default function Page() {
  return <TermsOfServicePageClient />;
}
