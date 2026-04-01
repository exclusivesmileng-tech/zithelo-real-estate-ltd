"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, RotateCcw, CheckCircle2, TrendingUp, Users, Building2,
  ChevronRight, ChevronDown, MapPin,
} from "lucide-react";

// ─── Country / currency data ─────────────────────────────────────────────────

interface CurrencyInfo {
  currency: string;
  symbol: string;
  rateToNgn: number; // 1 unit of this currency ≈ X NGN
}

interface Country extends CurrencyInfo {
  name: string;
  code: string;
  flag: string;
}

const COUNTRIES: Country[] = [
  { name: "Nigeria",        code: "NG", currency: "NGN", symbol: "₦",   rateToNgn: 1,    flag: "🇳🇬" },
  { name: "United Kingdom", code: "GB", currency: "GBP", symbol: "£",   rateToNgn: 2100, flag: "🇬🇧" },
  { name: "United States",  code: "US", currency: "USD", symbol: "$",   rateToNgn: 1650, flag: "🇺🇸" },
  { name: "Canada",         code: "CA", currency: "CAD", symbol: "C$",  rateToNgn: 1200, flag: "🇨🇦" },
  { name: "Australia",      code: "AU", currency: "AUD", symbol: "A$",  rateToNgn: 1050, flag: "🇦🇺" },
  { name: "Germany",        code: "DE", currency: "EUR", symbol: "€",   rateToNgn: 1780, flag: "🇩🇪" },
  { name: "Netherlands",    code: "NL", currency: "EUR", symbol: "€",   rateToNgn: 1780, flag: "🇳🇱" },
  { name: "Ireland",        code: "IE", currency: "EUR", symbol: "€",   rateToNgn: 1780, flag: "🇮🇪" },
  { name: "France",         code: "FR", currency: "EUR", symbol: "€",   rateToNgn: 1780, flag: "🇫🇷" },
  { name: "Italy",          code: "IT", currency: "EUR", symbol: "€",   rateToNgn: 1780, flag: "🇮🇹" },
  { name: "Spain",          code: "ES", currency: "EUR", symbol: "€",   rateToNgn: 1780, flag: "🇪🇸" },
  { name: "UAE",            code: "AE", currency: "AED", symbol: "AED", rateToNgn: 449,  flag: "🇦🇪" },
  { name: "Qatar",          code: "QA", currency: "QAR", symbol: "QAR", rateToNgn: 453,  flag: "🇶🇦" },
  { name: "Saudi Arabia",   code: "SA", currency: "SAR", symbol: "SAR", rateToNgn: 440,  flag: "🇸🇦" },
  { name: "South Africa",   code: "ZA", currency: "ZAR", symbol: "R",   rateToNgn: 90,   flag: "🇿🇦" },
  { name: "Ghana",          code: "GH", currency: "GHS", symbol: "₵",   rateToNgn: 105,  flag: "🇬🇭" },
  { name: "Kenya",          code: "KE", currency: "KES", symbol: "KSh", rateToNgn: 13,   flag: "🇰🇪" },
  { name: "Other",          code: "XX", currency: "USD", symbol: "$",   rateToNgn: 1650, flag: "🌍" },
];

const OVERRIDE_CURRENCIES: CurrencyInfo[] = [
  { currency: "NGN", symbol: "₦",   rateToNgn: 1    },
  { currency: "GBP", symbol: "£",   rateToNgn: 2100 },
  { currency: "USD", symbol: "$",   rateToNgn: 1650 },
  { currency: "EUR", symbol: "€",   rateToNgn: 1780 },
  { currency: "CAD", symbol: "C$",  rateToNgn: 1200 },
  { currency: "AUD", symbol: "A$",  rateToNgn: 1050 },
  { currency: "AED", symbol: "AED", rateToNgn: 449  },
];

const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River",
  "Delta","Ebonyi","Edo","Ekiti","Enugu","FCT (Abuja)","Gombe","Imo","Jigawa","Kaduna","Kano",
  "Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau",
  "Rivers","Sokoto","Taraba","Yobe","Zamfara",
];

// ─── Budget tiers (anchored in ₦) ────────────────────────────────────────────

const BUDGET_TIERS = [
  { id: "a", ngnMin: 0,          ngnMax: 5_000_000 },
  { id: "b", ngnMin: 5_000_000,  ngnMax: 20_000_000 },
  { id: "c", ngnMin: 20_000_000, ngnMax: 50_000_000 },
  { id: "d", ngnMin: 50_000_000, ngnMax: Infinity },
];

function fmtNgn(n: number) {
  return n >= 1_000_000 ? `₦${(n / 1_000_000).toFixed(0)}m` : `₦${(n / 1000).toFixed(0)}k`;
}
function fmtFx(ngn: number, rate: number, sym: string) {
  const v = ngn / rate;
  if (v >= 1_000_000) return `${sym}${(v / 1_000_000).toFixed(1)}m`;
  if (v >= 1000)      return `${sym}${Math.round(v / 1000)}k`;
  return `${sym}${Math.round(v).toLocaleString()}`;
}

function budgetLabel(tier: typeof BUDGET_TIERS[0], cx: CurrencyInfo) {
  const isNgn = cx.currency === "NGN";
  if (isNgn) {
    const main = tier.ngnMin === 0
      ? `Under ${fmtNgn(tier.ngnMax)}`
      : tier.ngnMax === Infinity
        ? `${fmtNgn(tier.ngnMin)}+`
        : `${fmtNgn(tier.ngnMin)} – ${fmtNgn(tier.ngnMax)}`;
    return { main, sub: "" };
  }
  const main = tier.ngnMin === 0
    ? `Under ${fmtFx(tier.ngnMax, cx.rateToNgn, cx.symbol)}`
    : tier.ngnMax === Infinity
      ? `${fmtFx(tier.ngnMin, cx.rateToNgn, cx.symbol)}+`
      : `${fmtFx(tier.ngnMin, cx.rateToNgn, cx.symbol)} – ${fmtFx(tier.ngnMax, cx.rateToNgn, cx.symbol)}`;
  const sub = tier.ngnMin === 0
    ? `≈ under ${fmtNgn(tier.ngnMax)}`
    : tier.ngnMax === Infinity
      ? `≈ ${fmtNgn(tier.ngnMin)}+`
      : `≈ ${fmtNgn(tier.ngnMin)} – ${fmtNgn(tier.ngnMax)}`;
  return { main, sub };
}

// ─── Scoring questions ────────────────────────────────────────────────────────

const Q_TIMELINE = {
  id: "timeline", label: "02 / Timeline",
  question: "How long are you comfortable holding your investment?",
  context: "There's no wrong answer — your horizon shapes the entire strategy I'll build for you.",
  options: [
    { id: "a", text: "1 – 2 years",   sub: "Short-term, quick exit" },
    { id: "b", text: "3 – 5 years",   sub: "Steady mid-range growth" },
    { id: "c", text: "5 – 10 years",  sub: "Patient, strategic capital" },
    { id: "d", text: "10 – 25 years", sub: "Legacy & generational wealth" },
  ],
};

const Q_GOAL = {
  id: "goal", label: "03 / Goal",
  question: "What does a winning investment look like for you?",
  context: "Be honest with me — knowing exactly what you want is how I find you the perfect fit.",
  options: [
    { id: "a", text: "Monthly rental income", sub: "Consistent cash flow from day one" },
    { id: "b", text: "Capital appreciation",  sub: "Sell at a premium down the line" },
    { id: "c", text: "Generational wealth",   sub: "A lasting asset to pass on to family" },
    { id: "d", text: "Balanced returns",      sub: "Income + growth — best of both worlds" },
  ],
};

const Q_INVOLVEMENT = {
  id: "involvement", label: "04 / Structure",
  question: "How do you prefer to structure your investment?",
  context: "Don't worry if you're unsure — I'll explain each option and help you choose.",
  options: [
    { id: "a", text: "Own a unit outright",           sub: "My name, my asset — fully managed for me" },
    { id: "b", text: "Partner with other investors",  sub: "Pool resources, share structured returns" },
    { id: "c", text: "Fund the build, exit clean",    sub: "Developer finance with a pre-agreed payout" },
    { id: "d", text: "Not sure — guide me",           sub: "I'd love a recommendation on the best fit" },
  ],
};

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

// ─── Results ──────────────────────────────────────────────────────────────────

const RESULTS = {
  offPlan: {
    icon: Building2,
    label: "Off-Plan Investment",
    tag: "Your Ideal Match",
    headline: "Own a premium unit from the ground up",
    description: "Based on everything you've shared, direct off-plan ownership is your sweet spot. You purchase during construction at below-market pricing, benefit from capital appreciation, then collect rental income from handover. Verified title, 25-year lease, and zero management burden — we handle it all.",
    strengths: ["Capital appreciation at completion", "Rental income from handover", "Verified title + 25-year lease", "Fully managed — no landlord stress"],
    cta: "Register as an Investor",
    href: "/become-an-investor",
  },
  coInvest: {
    icon: Users,
    label: "Co-Investment",
    tag: "Your Ideal Match",
    headline: "Pool resources, share structured returns",
    description: "Your profile is a strong match for co-investment. Partner with other investors in a Zithelo development — lower individual exposure, structured quarterly income distributions, and a proportional share of capital gains at exit. Smart, scalable, professionally managed.",
    strengths: ["Lower entry capital required", "Risk spread across the portfolio", "Quarterly income distributions", "Professional asset management"],
    cta: "Explore Co-Investment",
    href: "/become-an-investor",
  },
  land: {
    icon: TrendingUp,
    label: "Land / Development Funding",
    tag: "Your Ideal Match",
    headline: "Fund the build — exit with maximum returns",
    description: "Your answers point clearly to land acquisition or development funding. You come in at the earliest stage in the project cycle, earn the highest returns in the chain, and exit at completion with a pre-agreed profit structure. This is where serious capital moves.",
    strengths: ["Highest return potential in the cycle", "Early-stage entry pricing", "Pre-agreed profit structure", "Clean exit at project completion"],
    cta: "Discuss Funding Options",
    href: "/become-a-partner",
  },
};

type ResultKey = keyof typeof RESULTS;
type Answers = Record<string, string>;

function calcResult(answers: Answers): ResultKey {
  const t = { offPlan: 0, coInvest: 0, land: 0 };
  for (const [qId, optId] of Object.entries(answers)) {
    const s = SCORES[qId]?.[optId];
    if (s) { t.offPlan += s.offPlan; t.coInvest += s.coInvest; t.land += s.land; }
  }
  const max = Math.max(t.offPlan, t.coInvest, t.land);
  if (max === t.offPlan) return "offPlan";
  if (max === t.coInvest) return "coInvest";
  return "land";
}

// ─── Endorsement copy (appears when an option is selected) ───────────────────

const ENDORSEMENTS: Record<string, Record<string, string>> = {
  budget: {
    a: "Every great portfolio starts with a single smart entry.",
    b: "Solid — this range unlocks several well-performing structures.",
    c: "Now we're in premium territory. Let me show you what's possible.",
    d: "You're in our high-net-worth bracket — the best opportunities live here.",
  },
  timeline: {
    a: "Quick exits are something we design very well.",
    b: "A great balance of growth potential and flexibility.",
    c: "Patient capital consistently earns the best returns in premium real estate.",
    d: "Legacy thinking — this is exactly what Zithelo was built for.",
  },
  goal: {
    a: "Cash flow from day one. Let's structure that for you.",
    b: "Smart. Our projects have delivered strong capital appreciation.",
    c: "Family wealth is at the heart of everything we build here.",
    d: "Income and growth combined — absolutely achievable with the right structure.",
  },
  involvement: {
    a: "Full ownership, zero headache. The classic Zithelo model.",
    b: "Strength in numbers. Co-investment is a powerful move.",
    c: "Structured exit with maximum upside. Very popular with HNW investors.",
    d: "That's exactly why I'm here. I'll walk you through every option.",
  },
};

// ─── Animation variants ───────────────────────────────────────────────────────

const slide = {
  enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
};

// ─── Reusable native select ───────────────────────────────────────────────────

function NativeSelect({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-background border border-border rounded-lg px-4 py-3 pr-10 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
    </div>
  );
}

// ─── Currency override dropdown ───────────────────────────────────────────────

function CurrencyPicker({ value, onChange }: { value: string; onChange: (cx: CurrencyInfo) => void }) {
  const [open, setOpen] = useState(false);
  const current = OVERRIDE_CURRENCIES.find((c) => c.currency === value) ?? OVERRIDE_CURRENCIES[0];
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-body font-semibold text-foreground hover:border-primary/50 transition-colors"
      >
        {current.currency} ({current.symbol})
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-1 z-20 bg-card border border-border rounded-xl shadow-lg overflow-hidden min-w-[130px]"
          >
            {OVERRIDE_CURRENCIES.map((cx) => (
              <button
                key={cx.currency}
                type="button"
                onClick={() => { onChange(cx); setOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-body hover:bg-muted transition-colors ${cx.currency === value ? "text-primary font-semibold" : "text-foreground"}`}
              >
                <span>{cx.currency}</span>
                <span className="text-muted-foreground ml-4">{cx.symbol}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function InvestorQuiz() {
  // step 0 = location capture; steps 1-4 = scoring questions; done = result
  const [step, setStep]           = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers]     = useState<Answers>({});
  const [selected, setSelected]   = useState<string | null>(null);
  const [done, setDone]           = useState(false);

  // Location fields
  const [countryCode, setCountryCode] = useState("");
  const [stateVal, setStateVal]       = useState("");
  const [cityVal, setCityVal]         = useState("");

  // Currency (auto-set from country, overrideable on budget step)
  const [currencyInfo, setCurrencyInfo] = useState<CurrencyInfo>(
    OVERRIDE_CURRENCIES.find((c) => c.currency === "USD")!
  );

  const scoreQuestions = [
    {
      id: "budget", label: "01 / Budget",
      question: "What's your investment range?",
      context: "Don't overthink it — a rough ballpark is all I need to point you in the right direction.",
    },
    Q_TIMELINE, Q_GOAL, Q_INVOLVEMENT,
  ];

  const TOTAL_Q       = scoreQuestions.length;   // 4
  const isLocationStep = step === 0;
  const qIndex         = step - 1;               // 0–3
  const currentQ       = isLocationStep ? null : scoreQuestions[qIndex];

  const selectedCountry = COUNTRIES.find((c) => c.code === countryCode);
  const isNigeria        = countryCode === "NG";
  const locationReady    = countryCode !== "";

  const TOTAL_DISPLAY = 1 + TOTAL_Q; // 5 display steps
  const progressPct   = (step / TOTAL_DISPLAY) * 100 + (100 / TOTAL_DISPLAY);

  function selectCountry(code: string) {
    setCountryCode(code);
    setStateVal("");
    setCityVal("");
    const found = COUNTRIES.find((c) => c.code === code);
    if (found) {
      const cx = OVERRIDE_CURRENCIES.find((c) => c.currency === found.currency)
               ?? OVERRIDE_CURRENCIES.find((c) => c.currency === "USD")!;
      setCurrencyInfo(cx);
    }
  }

  function next() {
    setDirection(1);
    if (isLocationStep) { setStep(1); setSelected(null); return; }
    if (!selected || !currentQ) return;
    const newAnswers = { ...answers, [currentQ.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    if (qIndex < TOTAL_Q - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  }

  function back() {
    if (step === 0) return;
    setDirection(-1);
    if (step === 1) { setStep(0); setSelected(null); return; }
    const prevQ = scoreQuestions[qIndex - 1];
    setSelected(answers[prevQ.id] ?? null);
    setStep((s) => s - 1);
  }

  function reset() {
    setStep(0); setDirection(1); setAnswers({});
    setSelected(null); setDone(false);
    setCountryCode(""); setStateVal(""); setCityVal("");
    setCurrencyInfo(OVERRIDE_CURRENCIES.find((c) => c.currency === "USD")!);
  }

  const endorsement = currentQ && selected ? ENDORSEMENTS[currentQ.id]?.[selected] : null;

  const nextLabel = isLocationStep
    ? "Let's find your match"
    : qIndex < TOTAL_Q - 1 ? "Next question" : "Show my result";

  const nextDisabled = isLocationStep ? !locationReady : !selected;

  const budgetOptions = BUDGET_TIERS.map((t) => ({ id: t.id, ...budgetLabel(t, currencyInfo) }));

  const result = done ? RESULTS[calcResult(answers)] : null;

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* ── Progress bar ── */}
      {!done && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-[0.25em] uppercase font-body font-semibold text-primary">
              {isLocationStep ? "Your Profile" : currentQ?.label}
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase font-body text-muted-foreground">
              {step} of {TOTAL_DISPLAY}
            </span>
          </div>
          <div className="h-[2px] bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full gold-gradient rounded-full"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        {!done ? (
          <motion.div
            key={`step-${step}`}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >

            {/* ── Step 0: Location ── */}
            {isLocationStep && (
              <div>
                <div className="mb-8 p-5 rounded-sm border border-primary/20 bg-primary/5">
                  <p className="font-body text-sm text-foreground leading-relaxed">
                    <span className="font-semibold text-primary">Hi there!</span>{" "}
                    I&apos;m your Zithelo investment guide. Answer 4 quick questions and I&apos;ll match you with the{" "}
                    <span className="font-semibold">exact investment structure</span> that fits your goals — no registration required.
                  </p>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug mb-2">
                  First, where are you based?
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-7">
                  I&apos;ll use this to show your budget options in your local currency with naira equivalents.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground font-body mb-1.5">
                      Country of Residence
                    </label>
                    <NativeSelect
                      value={countryCode}
                      onChange={selectCountry}
                      placeholder="Select your country"
                      options={COUNTRIES.map((c) => ({ value: c.code, label: `${c.flag}  ${c.name}` }))}
                    />
                  </div>

                  {/* Nigerian state */}
                  {countryCode && isNigeria && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground font-body mb-1.5">
                        State of Origin{" "}
                        <span className="text-muted-foreground/50 normal-case font-normal">(optional)</span>
                      </label>
                      <NativeSelect
                        value={stateVal}
                        onChange={setStateVal}
                        placeholder="Select your state"
                        options={NIGERIAN_STATES.map((s) => ({ value: s, label: s }))}
                      />
                    </motion.div>
                  )}

                  {/* Non-Nigerian city */}
                  {countryCode && !isNigeria && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground font-body mb-1.5">
                        City / Region{" "}
                        <span className="text-muted-foreground/50 normal-case font-normal">(optional)</span>
                      </label>
                      <div className="relative">
                        <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <input
                          type="text"
                          value={cityVal}
                          onChange={(e) => setCityVal(e.target.value)}
                          placeholder="e.g. London, Houston, Dubai…"
                          className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </motion.div>
                  )}

                  {selectedCountry && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-body text-muted-foreground">
                      Your budget will be shown in{" "}
                      <span className="font-semibold text-foreground">{currencyInfo.currency} ({currencyInfo.symbol})</span>{" "}
                      with naira equivalents. You can change the currency at any time.
                    </motion.p>
                  )}
                </div>
              </div>
            )}

            {/* ── Steps 1-4: Scoring questions ── */}
            {!isLocationStep && currentQ && (
              <div>
                <div className="mb-7">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug mb-2">
                    {currentQ.question}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">{currentQ.context}</p>
                </div>

                {/* Currency switcher — budget step only */}
                {currentQ.id === "budget" && (
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xs font-body text-muted-foreground">Showing prices in:</span>
                    <CurrencyPicker value={currencyInfo.currency} onChange={setCurrencyInfo} />
                  </div>
                )}

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {(currentQ.id === "budget" ? budgetOptions : (currentQ as typeof Q_TIMELINE).options).map((opt, i) => {
                    const isSelected  = selected === opt.id;
                    const mainText    = "main" in opt ? opt.main : opt.text;
                    const subText     = "sub" in opt ? opt.sub : "";
                    return (
                      <motion.button
                        key={opt.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.07 }}
                        onClick={() => setSelected(opt.id)}
                        className={`relative text-left p-5 border rounded-sm transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 hover:bg-muted/40"
                        }`}
                      >
                        {isSelected && (
                          <>
                            <motion.div
                              layoutId="sel-indicator"
                              className="absolute top-3 right-3"
                              initial={{ scale: 0 }} animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                              <CheckCircle2 size={16} className="text-primary" />
                            </motion.div>
                            <motion.div
                              layoutId="sel-bar"
                              className="absolute top-0 left-0 right-0 h-[2px] gold-gradient rounded-t-sm"
                            />
                          </>
                        )}
                        <p className={`font-display font-bold text-base mb-1 transition-colors ${isSelected ? "text-primary" : "text-foreground"}`}>
                          {mainText}
                        </p>
                        {subText && (
                          <p className="font-body text-xs text-muted-foreground leading-relaxed">{subText}</p>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Endorsement */}
                <AnimatePresence>
                  {endorsement && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mb-4 px-4 py-2.5 rounded-lg bg-primary/8 border border-primary/15"
                    >
                      <p className="text-xs font-body text-primary font-medium">✦ {endorsement}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* ── Navigation ── */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={back}
                disabled={step === 0}
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 disabled:opacity-0 disabled:pointer-events-none"
              >
                ← Back
              </button>
              <motion.button
                onClick={next}
                disabled={nextDisabled}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3 gold-gradient text-primary-foreground font-display font-bold text-sm tracking-[0.08em] uppercase rounded-sm shadow-md shadow-primary/20 disabled:opacity-40 disabled:pointer-events-none transition-opacity duration-200"
              >
                {nextLabel}
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
              const locationLine = cityVal
                ? `As someone based in ${cityVal}`
                : isNigeria && stateVal
                  ? `As an investor from ${stateVal} State`
                  : selectedCountry
                    ? `As someone based in ${selectedCountry.name}`
                    : "Based on your answers";
              return (
                <>
                  <div className="mb-5 p-4 rounded-sm border border-primary/20 bg-primary/5">
                    <p className="font-body text-sm text-foreground leading-relaxed">
                      <span className="font-semibold text-primary">Great news!</span>{" "}
                      {locationLine}, here&apos;s the investment structure that fits you perfectly.
                    </p>
                  </div>

                  <div className="border border-primary/30 rounded-sm overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center shrink-0">
                          <Icon size={20} className="text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-[10px] tracking-[0.25em] uppercase font-body font-bold text-black/60">{result.tag}</p>
                          <h3 className="font-display text-xl font-bold text-[#1a1a1a] leading-tight">{result.label}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-card">
                      <h4 className="font-display text-lg font-bold text-foreground mb-3">{result.headline}</h4>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">{result.description}</p>
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
