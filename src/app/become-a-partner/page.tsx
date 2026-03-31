import type { Metadata } from "next";
import BecomeAPartnerPageClient from "./BecomeAPartnerPageClient";

export const metadata: Metadata = {
  title: "Become a Partner | Joint Ventures & Land Partnerships",
  description:
    "Partner with Zithelo to unlock your land or capital. We offer joint venture agreements, land owner deals, and contractor partnerships across Nigeria.",
  keywords: [
    "joint venture real estate Nigeria",
    "land owner partnership Lagos",
    "property development partnership Nigeria",
    "real estate JV Lagos",
  ],
  alternates: { canonical: "/become-a-partner" },
  openGraph: {
    title: "Become a Partner | Zithelo Real Estate",
    description:
      "Unlock your land or capital through joint venture and partnership agreements with Zithelo.",
  },
};

export default function Page() {
  return <BecomeAPartnerPageClient />;
}
