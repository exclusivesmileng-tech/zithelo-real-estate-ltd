import type { Metadata } from "next";
import LeadershipBoardPageClient from "./LeadershipBoardPageClient";

export const metadata: Metadata = {
  title: "Board & Governance | Leadership",
  description:
    "Meet the board of directors and governance team driving Zithelo Real Estate's pan-African development strategy.",
  alternates: { canonical: "/leadership/board" },
  openGraph: {
    title: "Board & Governance | Zithelo Real Estate",
    description:
      "The board of directors steering Zithelo's premium urban development across Africa.",
  },
};

export default function Page() {
  return <LeadershipBoardPageClient />;
}
