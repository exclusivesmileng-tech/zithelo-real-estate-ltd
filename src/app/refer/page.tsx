import type { Metadata } from "next";
import ReferralPageClient from "./ReferralPageClient";

export const metadata: Metadata = {
  title: "Refer & Earn | Zithelo Referral Programme",
  description:
    "Know someone looking to invest in premium Lagos real estate? Refer them to Zithelo and earn a referral reward when they invest.",
  alternates: { canonical: "/refer" },
  openGraph: {
    title: "Refer & Earn | Zithelo Real Estate",
    description:
      "Refer an investor to Zithelo's premium Lagos developments and earn a referral reward.",
  },
};

export default function Page() {
  return <ReferralPageClient />;
}
