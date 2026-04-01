"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, RotateCcw, CheckCircle2, TrendingUp, Users, Building2, ChevronRight } from "lucide-react";

// ─── Quiz data ────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: "budget",
    label: "01 / Budget",
    question: "What is your investment budget?",
    subtitle: "Approximate figures in Naira or equivalent",
    options: [
      { id: "a", text: "Under ₦5m", sub: "≈ £2,500 · $3,200" },
      { id: "b", text: "₦5m – ₦20m", sub: "≈ £2,500 – £10k" },
      { id: "c", text: "₦20m – ₦50m", sub: "≈ £10k – £26k" },
      { id: "d", text: "₦50m+", sub: "≈ £26k+" },
    ],
  },
  {
    id: "timeline",
    label: "02 / Timeline",
    question: "What is your investment horizon?",
    subtitle: "How long are you comfortable holding?",
    options: [
      { id: "a", text: "1 – 2 years", sub: "Short-term, quick returns" },
      { id: "b", text: "3 – 5 years", sub: "Medium-term growth" },
      { id: "c", text: "5 – 10 years", sub: "Patient capital" },
      { id: "d", text: "10 – 25 years", sub: "Legacy / long-term wealth" },
    ],
  },
  {
    id: "goal",
    label: "03 / Goal",
    question: "What is your primary investment goal?",
    subtitle: "Pick the outcome that matters most to you",
    options: [
      { id: "a", text: "Monthly rental income", sub: "Steady cash flow from day one" },
      { id: "b", text: "Capital appreciation", sub: "Sell at a higher value later" },
      { id: "c", text: "Generational wealth", sub: "Asset to pass to family" },
      { id: "d", text: "Balanced returns", sub: "Income + growth combined" },
    ],
  },
  {
    id: "involvement",
    label: "04 / Involvement",
    question: "How do you prefer to structure your investment?",
    subtitle: "Your level of ownership and involvement",
    options: [
      { id: "a", text: "Own a unit outright", sub: "My name, my asset, fully managed" },
      { id: "b", text: "Partner with others", sub: "Pool resources, share returns" },
      { id: "c", text: "Fund the build, exit at completion", sub: "Developer finance, structured payout" },
      { id: "d", text: "Not sure yet", sub: "I'd like guidance on the best fit" },
    ],
  },
];

// ─── Scoring matrix ───────────────────────────────────────────────────────────

const SCORES: Record<string, Record<string, { offPlan: number; coInvest: number; land: number }>> = {
  budget: {
    a: { offPlan: 3, coInvest: 1, land: 0 },
    b: { offPlan: 2, coInvest: 2, land: 1 },
    c: { offPlan: 1, coInvest: 2, land: 2 },
    d: { offPlan: 0, coInvest: 1, land: 3 },
  },
  timeline: {
    a: { offPlan: 0, coInvest: 1, land: 2 },
    b: { offPlan: 1, coInvest: 2, land: 2 },
    c: { offPlan: 2, coInvest: 2, land: 1 },
    d: { offPlan: 3, coInvest: 1, land: 0 },
  },
  goal: {
    a: { offPlan: 2, coInvest: 2, land: 1 },
    b: { offPlan: 2, coInvest: 1, land: 2 },
    c: { offPlan: 3, coInvest: 1, land: 0 },
    d: { offPlan: 1, coInvest: 3, land: 1 },
  },
  involvement: {
    a: { offPlan: 3, coInvest: 0, land: 0 },
    b: { offPlan: 0, coInvest: 3, land: 1 },
    c: { offPlan: 0, coInvest: 1, land: 3 },
    d: { offPlan: 1, coInvest: 2, land: 1 },
  },
};

// ─── Results config ───────────────────────────────────────────────────────────

const RESULTS = {
  offPlan: {
    icon: Building2,
    label: "Off-Plan Investment",
    tag: "Best Match",
    headline: "Own a premium unit from the ground up",
    description:
      "You are best suited for direct off-plan ownership. Purchase a unit during construction, benefit from below-market pricing, and collect rental income from completion. Verified title, 25-year lease, managed entirely for you.",
    strengths: ["Capital appreciation at completion", "Rental income from handover", "Verified title + 25-year lease", "Zero management burden"],
    cta: "Register as an Investor",
    href: "/become-an-investor",
    accent: "from-[#c9a84c] to-[#e8c97a]",
  },
  coInvest: {
    icon: Users,
    label: "Co-Investment",
    tag: "Best Match",
    headline: "Pool resources, share in structured returns",
    description:
      "You are well-matched for co-investment. Partner with other investors to participate in a Zithelo development, reducing your individual exposure while earning structured income distributions and a share of capital gains.",
    strengths: ["Lower entry capital", "Diversified risk across investors", "Structured income distributions", "Professional asset management"],
    cta: "Explore Co-Investment",
    href: "/become-an-investor",
    accent: "from-[#c9a84c] to-[#e8c97a]",
  },
  land: {
    icon: TrendingUp,
    label: "Land / Development Funding",
    tag: "Best Match",
    headline: "Fund the build, exit with structured profit",
    description:
      "Your profile points to land acquisition or development funding. Provide capital at the earliest stage, earn the highest returns in the development cycle, and exit at completion with a pre-agreed profit structure.",
    strengths: ["Highest return potential", "Early-stage entry pricing", "Pre-agreed profit structure", "Exit at project completion"],
    cta: "Discuss Funding Options",
    href: "/become-a-partner",
    accent: "from-[#c9a84c] to-[#e8c97a]",
  },
};

type ResultKey = keyof typeof RESULTS;
type Answers = Record<string, string>;

function calcResult(answers: Answers): ResultKey {
  const totals = { offPlan: 0, coInvest: 0, land: 0 };
  for (const [qId, optId] of Object.entries(answers)) {
    const s = SCORES[qId]?.[optId];
    if (s) {
      totals.offPlan += s.offPlan;
      totals.coInvest += s.coInvest;
      totals.land += s.land;
    }
  }
  const max = Math.max(totals.offPlan, totals.coInvest, totals.land);
  if (max === totals.offPlan) return "offPlan";
  if (max === totals.coInvest) return "coInvest";
  return "land";
}

// ─── Animation variants ───────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function InvestorQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const [done, setDone] = useState(false);

  const question = QUESTIONS[step];
  const totalSteps = QUESTIONS.length;
  const progress = ((step) / totalSteps) * 100;

  function choose(optId: string) {
    setSelected(optId);
  }

  function next() {
    if (!selected) return;
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    setDirection(1);

    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  }

  function back() {
    if (step === 0) return;
    setDirection(-1);
    setSelected(answers[QUESTIONS[step - 1].id] ?? null);
    setStep((s) => s - 1);
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setSelected(null);
    setDirection(1);
    setDone(false);
  }

  const result = done ? RESULTS[calcResult(answers)] : null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      {!done && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-[0.25em] uppercase font-body font-semibold text-primary">
              {question.label}
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase font-body text-muted-foreground">
              {step + 1} of {totalSteps}
            </span>
          </div>
          <div className="h-[2px] bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full gold-gradient rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress + (100 / totalSteps)}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        {!done ? (
          /* ── Question step ── */
          <motion.div
            key={`step-${step}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Question text */}
            <div className="mb-8">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug mb-2">
                {question.question}
              </h3>
              <p className="font-body text-sm text-muted-foreground">{question.subtitle}</p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {question.options.map((opt, i) => {
                const isSelected = selected === opt.id;
                return (
                  <motion.button
                    key={opt.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    onClick={() => choose(opt.id)}
                    className={`relative text-left p-5 border rounded-sm transition-all duration-200 group ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/40"
                    }`}
                  >
                    {/* Selected indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="selected-indicator"
                        className="absolute top-3 right-3"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <CheckCircle2 size={16} className="text-primary" />
                      </motion.div>
                    )}
                    {/* Gold top bar on selected */}
                    {isSelected && (
                      <motion.div
                        layoutId="selected-bar"
                        className="absolute top-0 left-0 right-0 h-[2px] gold-gradient rounded-t-sm"
                      />
                    )}
                    <p className={`font-display font-bold text-base mb-1 transition-colors duration-200 ${isSelected ? "text-primary" : "text-foreground"}`}>
                      {opt.text}
                    </p>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">{opt.sub}</p>
                  </motion.button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={back}
                disabled={step === 0}
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 disabled:opacity-0 disabled:pointer-events-none"
              >
                ← Back
              </button>
              <motion.button
                onClick={next}
                disabled={!selected}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3 gold-gradient text-primary-foreground font-display font-bold text-sm tracking-[0.08em] uppercase rounded-sm shadow-md shadow-primary/20 disabled:opacity-40 disabled:pointer-events-none transition-opacity duration-200"
              >
                {step === totalSteps - 1 ? "See My Result" : "Next"}
                <ArrowRight size={15} />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* ── Result screen ── */
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {result && (() => {
              const Icon = result.icon;
              return (
                <>
                  {/* Result card */}
                  <div className="border border-primary/30 rounded-sm overflow-hidden mb-6">
                    {/* Gold header */}
                    <div className={`bg-gradient-to-r ${result.accent} px-6 py-5`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center shrink-0">
                          <Icon size={20} className="text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-[10px] tracking-[0.25em] uppercase font-body font-bold text-black/60">
                            {result.tag}
                          </p>
                          <h3 className="font-display text-xl font-bold text-[#1a1a1a] leading-tight">
                            {result.label}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 bg-card">
                      <h4 className="font-display text-lg font-bold text-foreground mb-3">
                        {result.headline}
                      </h4>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                        {result.description}
                      </p>

                      {/* Strengths */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {result.strengths.map((s, i) => (
                          <motion.div
                            key={s}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
                            className="flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <span className="font-body text-xs text-foreground">{s}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={result.href}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 gold-gradient text-primary-foreground font-display font-bold text-sm tracking-[0.08em] uppercase rounded-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity duration-200"
                    >
                      {result.cta}
                      <ChevronRight size={15} />
                    </Link>
                    <button
                      onClick={reset}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 border border-border text-muted-foreground font-body text-sm rounded-sm hover:border-primary/40 hover:text-foreground transition-all duration-200"
                    >
                      <RotateCcw size={14} />
                      Retake Quiz
                    </button>
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
