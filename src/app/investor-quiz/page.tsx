import type { Metadata } from "next";
import InvestorQuiz from "@/components/InvestorQuiz";

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
    <main className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[hsl(var(--charcoal))] py-24 md:py-32">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Gold orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-[760px] mx-auto px-6 md:px-12 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-body font-semibold mb-4">
            Investor Profile Quiz
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Which investment type<br className="hidden md:block" /> is right for you?
          </h1>
          <p className="font-body text-base text-white/60 leading-relaxed max-w-lg mx-auto">
            Answer 4 quick questions. Get an instant, personalised recommendation across
            Off-Plan, Co-Investment, and Land Funding — matched to your budget, goals, and timeline.
          </p>
          {/* Gold rule */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 gold-gradient" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-body font-semibold">
              2 minutes · No registration
            </span>
            <div className="h-[1px] w-12 gold-gradient" />
          </div>
        </div>
      </section>

      {/* ── Quiz ── */}
      <section className="section-padding py-16 md:py-24">
        <InvestorQuiz />
      </section>

      {/* ── Footer note ── */}
      <section className="pb-16 px-6">
        <p className="text-center text-xs text-muted-foreground font-body max-w-md mx-auto">
          Your answers are used only to generate a recommendation. No data is stored or shared.
          Speak to our team for a full personalised consultation.
        </p>
      </section>
    </main>
  );
}
