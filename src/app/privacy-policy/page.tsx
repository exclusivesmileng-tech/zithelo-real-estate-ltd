import type { Metadata } from "next";
import PrivacyPolicyPageClient from "./PrivacyPolicyPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy | How We Handle Your Data",
  description:
    "Read Zithelo Real Estate's privacy policy. Learn how we collect, use, store, and protect your personal information.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: false },
};

export default function Page() {
  return <PrivacyPolicyPageClient />;
}
