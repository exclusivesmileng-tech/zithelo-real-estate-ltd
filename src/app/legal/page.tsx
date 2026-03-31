import type { Metadata } from "next";
import LegalPageClient from "./LegalPageClient";

export const metadata: Metadata = {
  title: "Legal | Privacy Policy & Terms of Service",
  description:
    "Zithelo Real Estate's legal documents — privacy policy, terms of service, and cookie policy.",
  alternates: { canonical: "/legal" },
  robots: { index: true, follow: false },
};

export default function Page() {
  return <LegalPageClient />;
}
