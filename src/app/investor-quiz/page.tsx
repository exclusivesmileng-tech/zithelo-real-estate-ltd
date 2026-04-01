import type { Metadata } from "next";
import Image from "next/image";
import InvestorQuiz from "@/components/InvestorQuiz";
import PageHero from "@/components/PageHero";
import InvestorQuizHeroVector from "@/components/heroes/InvestorQuizHeroVector";

export const metadata: Metadata = {
  title: "Investor Profile Quiz | Find Your Investment Type",
  description:
    "Answer 4 quick questions to discover whether Off-Plan, Co-Investment, or Land Funding is the right fit for your goals, budget, and timeline.",
  alternates: { canonical: "/investor-quiz" },
  openGraph: {
    title: "What Type of Investor Are You? | Zithelo Real Estate",
    description:
      "4 questions. Instant recommendation. Find your perfect Zithelo investment structure.",
  },
};

export default function InvestorQuizPage() {
  return (
    <>
      <PageHero
        title="Investor Profile"
        titleAccent="Quiz."
        subtitle="Answer 4 quick questions. Get an instant recommendation matched to your budget, goals, and timeline — no registration required."
        breadcrumb="Investor Quiz"
        vector={<InvestorQuizHeroVector />}
      />

      {/* ── Quiz ── */}
      <section className="relative section-padding py-16 md:py-24 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-skyline.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-background/88" />
        </div>
        <div className="relative z-10">
          <InvestorQuiz />
        </div>
      </section>

      {/* ── Footer note ── */}
      <section className="pb-16 px-6">
        <p className="text-center text-xs text-muted-foreground font-body max-w-md mx-auto">
          Your answers are used only to generate a recommendation. No data is stored or shared.
          Speak to our team for a full personalised consultation.
        </p>
      </section>
    </>
  );
}
