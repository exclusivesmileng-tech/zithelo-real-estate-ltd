import type { Metadata } from "next";
import LeadershipManagementPageClient from "./LeadershipManagementPageClient";

export const metadata: Metadata = {
  title: "Management Team | Leadership",
  description:
    "Meet the executive management team at Zithelo Real Estate — the operators executing our pan-African development vision.",
  alternates: { canonical: "/leadership/management" },
  openGraph: {
    title: "Management Team | Zithelo Real Estate",
    description:
      "The management team executing Zithelo's premium urban development across Africa.",
  },
};

export default function Page() {
  return <LeadershipManagementPageClient />;
}
