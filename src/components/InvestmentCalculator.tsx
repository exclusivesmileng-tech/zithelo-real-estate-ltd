"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator, TrendingUp, Wallet, BarChart3,
  ChevronDown, Share2, Printer, Mail, Settings2,
  RefreshCw, ArrowRight,
} from "lucide-react";
import Link from "next/link";

// ── Projects data ──────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "andoyi",
    name: "Andoyi House",
    desc: "88 Studio Units · Yaba, Lagos",
    href: "/projects/andoyi-house",
    yieldDefault: 0.08,
    appreciationDefault: 0.05,
    min: 20_000,
    max: 500_000,
    step: 5_000,
  },
  {
    id: "signature",
    name: "Signature Homes",
    desc: "4-Bed Semi-Detached · Ikeja, Lagos",
    href: "/projects/signature-homes",
    yieldDefault: 0.065,
    appreciationDefault: 0.07,
    min: 80_000,
    max: 1_000_000,
    step: 10_000,
  },
];

const DEFAULT_RATE = 1_600;

// ── Formatter ──────────────────────────────────────────────────────────────
function fmt(n: number, currency: "NGN" | "USD", rate = DEFAULT_RATE): string {
  if (currency === "NGN") {
    return new Intl.NumberFormat("en-NG", {
      style: "currency", currency: "NGN", maximumFractionDigits: 0,
    }).format(n * rate);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0,
  }).format(n);
}


// ── Main Component ─────────────────────────────────────────────────────────
export default function InvestmentCalculator() {
  const [projectIdx, setProjectIdx]     = useState(0);
  const [amount, setAmount]             = useState(100_000);
  const [years, setYears]               = useState(5);
  const [currency, setCurrency]         = useState<"NGN" | "USD">("NGN");

  // Advanced state
  const [customRate, setCustomRate]     = useState(DEFAULT_RATE);
  const [showRateInput, setShowRateInput] = useState(false);
  const [yieldOverride, setYieldOverride]   = useState<number | null>(null);
  const [appOverride, setAppOverride]       = useState<number | null>(null);
  const [inflationOn, setInflationOn]   = useState(false);
  const [inflationPct, setInflationPct] = useState(15);
  const [compareMode, setCompareMode]   = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const p = PROJECTS[projectIdx];
  const effYield = yieldOverride !== null ? yieldOverride / 100 : p.yieldDefault;
  const effApp   = appOverride   !== null ? appOverride   / 100 : p.appreciationDefault;
  const rate     = customRate;

  function deflate(v: number, yr: number) {
    return inflationOn ? v / Math.pow(1 + inflationPct / 100, yr) : v;
  }

  // ── Derived metrics ──────────────────────────────────────────────────────
  const annualIncome  = amount * effYield;
  const monthlyIncome = annualIncome / 12;
  const capitalValue  = amount * Math.pow(1 + effApp, years);
  const totalRental   = annualIncome * years;
  const totalReturn   = deflate(capitalValue, years) + deflate(totalRental, years) - amount;
  const roi           = (totalReturn / amount) * 100;
  const cagr          = (Math.pow((deflate(capitalValue, years) + deflate(totalRental, years)) / amount, 1 / years) - 1) * 100;
  const breakEvenYear = effYield > 0 ? Math.ceil(1 / effYield) : null;

  // ── Compare project data ─────────────────────────────────────────────────
  const otherIdx  = 1 - projectIdx;
  const other     = PROJECTS[otherIdx];
  const otherYield = other.yieldDefault;
  const otherApp   = other.appreciationDefault;
  const otherAmt   = Math.min(Math.max(amount, other.min), other.max);
  const otherCapital = otherAmt * Math.pow(1 + otherApp, years);
  const otherRental  = otherAmt * otherYield * years;
  const otherReturn  = otherCapital + otherRental - otherAmt;
  const otherROI     = (otherReturn / otherAmt) * 100;

  // ── Share / Print ────────────────────────────────────────────────────────
  function buildSummary() {
    return [
      `*Zithelo Investment Estimate*`,
      `Project: ${p.name}`,
      `Investment: ${fmt(amount, currency, rate)}`,
      `Horizon: ${years} years`,
      `Monthly Income: ${fmt(monthlyIncome, currency, rate)}`,
      `Capital Value: ${fmt(capitalValue, currency, rate)}`,
      `Total Return: ${fmt(totalReturn, currency, rate)}`,
      `ROI: ${roi.toFixed(0)}%  |  CAGR: ${cagr.toFixed(1)}%`,
      `${inflationOn ? `(Inflation-adjusted @ ${inflationPct}%)` : ""}`,
      `— zithelo.com`,
    ].filter(Boolean).join("\n");
  }

  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(buildSummary())}`, "_blank");
  }

  function shareEmail() {
    const subject = encodeURIComponent(`Zithelo Investment Estimate — ${p.name}`);
    const body    = encodeURIComponent(buildSummary());
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  }

  function printPDF() {
    const w = window.open("", "_blank")!;
    const cv = fmt(capitalValue, currency, rate);
    const tr = fmt(totalReturn, currency, rate);
    const mi = fmt(monthlyIncome, currency, rate);
    w.document.write(`<!DOCTYPE html><html><head>
      <meta charset="utf-8"><title>Zithelo ROI — ${p.name}</title>
      <style>
        body{font-family:Georgia,serif;max-width:680px;margin:40px auto;color:#111;line-height:1.7}
        h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;color:#b8882a;margin:24px 0 8px}
        table{width:100%;border-collapse:collapse;margin-top:8px}
        td,th{padding:9px 12px;border-bottom:1px solid #eee;font-size:14px}
        th{text-align:left;color:#666;font-weight:normal}
        td{text-align:right;font-weight:bold}
        .tag{display:inline-block;background:#f5f0e8;color:#8a6518;padding:2px 8px;border-radius:4px;font-size:12px}
        footer{margin-top:40px;color:#999;font-size:12px;border-top:1px solid #eee;padding-top:16px}
        @media print{button{display:none}}
      </style>
    </head><body>
      <h1>Zithelo Group — Investment Projection</h1>
      <p style="color:#888;font-size:13px">Generated ${new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</p>
      <div class="tag">${p.name}</div> <div class="tag" style="margin-left:6px">${p.desc}</div>
      <h2>Inputs</h2>
      <table><tr><th>Investment Amount</th><td>${fmt(amount, currency, rate)}</td></tr>
      <tr><th>Currency</th><td>${currency} ${currency === "NGN" ? `(Rate: ₦${rate.toLocaleString()}/$)` : ""}</td></tr>
      <tr><th>Horizon</th><td>${years} years</td></tr>
      <tr><th>Gross Rental Yield</th><td>${(effYield * 100).toFixed(1)}% p.a.</td></tr>
      <tr><th>Capital Appreciation</th><td>${(effApp * 100).toFixed(1)}% p.a.</td></tr>
      ${inflationOn ? `<tr><th>Inflation Adjustment</th><td>${inflationPct}% p.a.</td></tr>` : ""}
      </table>
      <h2>Projected Outputs</h2>
      <table>
      <tr><th>Monthly Passive Income</th><td>${mi}</td></tr>
      <tr><th>Annual Rental Income</th><td>${fmt(annualIncome, currency, rate)}</td></tr>
      <tr><th>Total Rental (${years}yr)</th><td>${fmt(totalRental, currency, rate)}</td></tr>
      <tr><th>Projected Property Value</th><td>${cv}</td></tr>
      <tr><th>Total ${years}-Year Return</th><td>${tr}</td></tr>
      <tr><th>ROI</th><td>${roi.toFixed(0)}%</td></tr>
      <tr><th>CAGR</th><td>${cagr.toFixed(2)}% p.a.</td></tr>
      ${breakEvenYear !== null ? `<tr><th>Break-Even Year</th><td>Year ${breakEvenYear}</td></tr>` : ""}
      </table>
      <footer>This projection is an illustrative estimate based on structured yield and appreciation assumptions.
      It does not constitute financial advice. Actual returns may vary. &nbsp;|&nbsp; zithelo.com</footer>
      <script>setTimeout(()=>window.print(),300)</script>
    </body></html>`);
    w.document.close();
  }

  return (
    <section className="relative overflow-hidden bg-[hsl(var(--charcoal))] section-padding">
      {/* Ambient glow */}
      <div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: "radial-gradient(circle, hsl(43 81% 61%) 0%, transparent 65%)" }}
      />

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary text-xs font-body font-semibold px-4 py-2 rounded-full mb-5 border border-primary/20">
            <Calculator size={13} /> Return on Investment Calculator
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Estimate Your <span className="gold-gradient-text">Returns</span>
          </h2>
          <p className="mt-4 text-white/55 font-body text-lg max-w-xl mx-auto">
            See projected rental income and capital appreciation based on our structured investment model.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* ── INPUTS ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-8 space-y-8"
          >
            {/* Project selector */}
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-primary font-body font-semibold mb-3">
                Select Project
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PROJECTS.map((proj, i) => (
                  <button
                    key={proj.id}
                    onClick={() => { setProjectIdx(i); setAmount(proj.min * 4); setYieldOverride(null); setAppOverride(null); }}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 ${
                      projectIdx === i
                        ? "gold-gradient border-primary shadow-md shadow-primary/20"
                        : "border-white/10 bg-white/[0.03] hover:border-primary/40"
                    }`}
                  >
                    <p className={`text-sm font-body font-semibold ${projectIdx === i ? "text-primary-foreground" : "text-white"}`}>{proj.name}</p>
                    <p className={`text-[11px] font-body mt-0.5 ${projectIdx === i ? "text-primary-foreground/70" : "text-white/40"}`}>{proj.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Currency + Rate */}
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-primary font-body font-semibold mb-3">
                Currency
              </label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {(["NGN", "USD"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`py-2.5 rounded-xl border text-sm font-body font-semibold transition-all duration-200 ${
                      currency === c
                        ? "gold-gradient border-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "border-white/10 bg-white/[0.03] text-white/60 hover:border-primary/40 hover:text-white"
                    }`}
                  >
                    {c === "NGN" ? "₦ NGN" : "$ USD"}
                  </button>
                ))}
              </div>
              {/* Exchange rate override */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowRateInput((v) => !v)}
                  className="text-[11px] text-primary/60 hover:text-primary font-body font-semibold flex items-center gap-1 transition-colors"
                >
                  <Settings2 size={11} /> Exchange Rate: ₦{customRate.toLocaleString()}/$
                  <ChevronDown size={11} className={`transition-transform duration-200 ${showRateInput ? "rotate-180" : ""}`} />
                </button>
                {customRate !== DEFAULT_RATE && (
                  <button onClick={() => setCustomRate(DEFAULT_RATE)} className="text-[10px] text-white/30 hover:text-white/60 flex items-center gap-1 transition-colors">
                    <RefreshCw size={9} /> Reset
                  </button>
                )}
              </div>
              <AnimatePresence>
                {showRateInput && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }} className="overflow-hidden"
                  >
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-white/40 font-body text-sm">₦</span>
                      <input
                        type="number" min={500} max={5000} step={50}
                        value={customRate}
                        onChange={(e) => setCustomRate(Math.max(100, Number(e.target.value)))}
                        className="w-full bg-white/[0.07] border border-white/15 rounded-lg px-3 py-2 text-white font-body text-sm focus:outline-none focus:border-primary/50"
                      />
                      <span className="text-white/40 font-body text-sm whitespace-nowrap">per $</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Amount slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs tracking-[0.15em] uppercase text-primary font-body font-semibold">Investment Amount</label>
                <span className="text-white font-display font-bold text-lg">{fmt(amount, currency, rate)}</span>
              </div>
              <input
                type="range" min={p.min} max={p.max} step={p.step}
                value={Math.min(Math.max(amount, p.min), p.max)}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "hsl(43 81% 61%)" }}
              />
              <div className="flex justify-between mt-1.5">
                <span className="text-[11px] text-white/35 font-body">{fmt(p.min, currency, rate)}</span>
                <span className="text-[11px] text-white/35 font-body">{fmt(p.max, currency, rate)}</span>
              </div>
            </div>

            {/* Time horizon */}
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-primary font-body font-semibold mb-3">Investment Horizon</label>
              <div className="flex gap-2">
                {[3, 5, 10, 15].map((y) => (
                  <button
                    key={y} onClick={() => setYears(y)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-body font-semibold border transition-all duration-150 ${
                      years === y
                        ? "gold-gradient text-primary-foreground border-primary"
                        : "border-white/10 text-white/60 hover:border-primary/40 hover:text-white"
                    }`}
                  >
                    {y}yr
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced settings toggle */}
            <div>
              <button
                onClick={() => setShowAdvanced((v) => !v)}
                className="w-full flex items-center justify-between text-xs tracking-[0.12em] uppercase text-white/40 hover:text-white/70 font-body font-semibold border-t border-white/5 pt-5 transition-colors"
              >
                <span className="flex items-center gap-2"><Settings2 size={12} /> Advanced Settings</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }} className="overflow-hidden"
                  >
                    <div className="pt-5 space-y-6">
                      {/* Yield slider */}
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-[11px] tracking-[0.12em] uppercase text-primary/70 font-body font-semibold">Gross Rental Yield</label>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-body text-sm font-semibold">{(effYield * 100).toFixed(1)}%</span>
                            {yieldOverride !== null && (
                              <button onClick={() => setYieldOverride(null)} className="text-[10px] text-white/30 hover:text-white/60 flex items-center gap-0.5 transition-colors">
                                <RefreshCw size={9} />
                              </button>
                            )}
                          </div>
                        </div>
                        <input
                          type="range" min={1} max={20} step={0.5}
                          value={effYield * 100}
                          onChange={(e) => setYieldOverride(Number(e.target.value))}
                          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                          style={{ accentColor: "hsl(43 81% 61%)" }}
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-[10px] text-white/25 font-body">1%</span>
                          <span className="text-[10px] text-white/25 font-body">20%</span>
                        </div>
                      </div>

                      {/* Appreciation slider */}
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-[11px] tracking-[0.12em] uppercase text-primary/70 font-body font-semibold">Annual Appreciation</label>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-body text-sm font-semibold">{(effApp * 100).toFixed(1)}%</span>
                            {appOverride !== null && (
                              <button onClick={() => setAppOverride(null)} className="text-[10px] text-white/30 hover:text-white/60 flex items-center gap-0.5 transition-colors">
                                <RefreshCw size={9} />
                              </button>
                            )}
                          </div>
                        </div>
                        <input
                          type="range" min={0} max={25} step={0.5}
                          value={effApp * 100}
                          onChange={(e) => setAppOverride(Number(e.target.value))}
                          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                          style={{ accentColor: "hsl(43 81% 61%)" }}
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-[10px] text-white/25 font-body">0%</span>
                          <span className="text-[10px] text-white/25 font-body">25%</span>
                        </div>
                      </div>

                      {/* Inflation toggle */}
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[11px] tracking-[0.12em] uppercase text-primary/70 font-body font-semibold mb-0.5">Inflation-Adjusted Returns</p>
                          <p className="text-[10px] text-white/30 font-body">Deflate future cash flows</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {inflationOn && (
                            <div className="flex items-center gap-1">
                              <input
                                type="number" min={1} max={50} step={1}
                                value={inflationPct}
                                onChange={(e) => setInflationPct(Math.max(1, Number(e.target.value)))}
                                className="w-14 bg-white/[0.07] border border-white/15 rounded-lg px-2 py-1 text-white font-body text-sm text-center focus:outline-none focus:border-primary/50"
                              />
                              <span className="text-white/40 text-sm font-body">%</span>
                            </div>
                          )}
                          <button
                            onClick={() => setInflationOn((v) => !v)}
                            className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${inflationOn ? "bg-primary" : "bg-white/15"}`}
                          >
                            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${inflationOn ? "translate-x-5" : ""}`} />
                          </button>
                        </div>
                      </div>

                      {/* Compare mode */}
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[11px] tracking-[0.12em] uppercase text-primary/70 font-body font-semibold mb-0.5">Compare Projects</p>
                          <p className="text-[10px] text-white/30 font-body">Side-by-side with {other.name}</p>
                        </div>
                        <button
                          onClick={() => setCompareMode((v) => !v)}
                          className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${compareMode ? "bg-primary" : "bg-white/15"}`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${compareMode ? "translate-x-5" : ""}`} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Disclaimer */}
            <p className="text-[11px] text-white/30 font-body leading-relaxed border-t border-white/5 pt-5">
              * Projections are illustrative estimates based on {(effYield * 100).toFixed(1)}% gross rental yield
              and {(effApp * 100).toFixed(1)}% annual capital appreciation.{inflationOn ? ` Values deflated at ${inflationPct}% inflation.` : ""} Actual returns may vary. Not financial advice.
            </p>
          </motion.div>

          {/* ── OUTPUTS ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            {/* Monthly income highlight */}
            <div className="gold-gradient border border-primary rounded-2xl p-5 flex items-center gap-5 shadow-xl shadow-primary/20">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Wallet size={18} className="text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] tracking-wide uppercase font-body font-semibold mb-0.5 text-primary-foreground/70">Monthly Passive Income</p>
                <AnimatePresence mode="wait">
                  <motion.p key={`mi-${monthlyIncome}-${currency}-${rate}`}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }} className="font-display font-bold text-2xl text-primary-foreground"
                  >{fmt(monthlyIncome, currency, rate)}</motion.p>
                </AnimatePresence>
                <p className="text-[11px] font-body mt-0.5 text-primary-foreground/60">{fmt(annualIncome, currency, rate)} per year</p>
              </div>
            </div>

            {/* Capital value + total rental */}
            {[
              { icon: BarChart3, label: `Projected Property Value (${years}yr)`, value: fmt(capitalValue, currency, rate), sub: `Capital growth: +${fmt(capitalValue - amount, currency, rate)}` },
              { icon: TrendingUp, label: `Total Rental Income (${years}yr)`, value: fmt(totalRental, currency, rate), sub: `At ${(effYield * 100).toFixed(1)}% gross yield` },
            ].map((m) => (
              <div key={m.label} className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 flex items-center gap-5 hover:border-primary/30 transition-colors">
                <div className="w-11 h-11 rounded-xl gold-gradient flex items-center justify-center shrink-0">
                  <m.icon size={18} className="text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] tracking-wide uppercase font-body font-semibold mb-0.5 text-primary">{m.label}</p>
                  <AnimatePresence mode="wait">
                    <motion.p key={m.value}
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }} className="font-display font-bold text-2xl text-white"
                    >{m.value}</motion.p>
                  </AnimatePresence>
                  <p className="text-[11px] font-body mt-0.5 text-white/40">{m.sub}</p>
                </div>
              </div>
            ))}

            {/* Total ROI + CAGR + Break-even */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs tracking-wide uppercase text-primary font-body font-semibold mb-1">
                    Total {years}-Year Return {inflationOn && <span className="text-white/30 normal-case tracking-normal text-[10px]">(real)</span>}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p key={`${totalReturn}-${years}-${currency}-${rate}`}
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }} className="font-display font-bold text-2xl text-white"
                    >{fmt(totalReturn, currency, rate)}</motion.p>
                  </AnimatePresence>
                  <p className="text-[11px] text-white/40 font-body mt-0.5">Combined rental + capital growth</p>
                </div>
                <div className="shrink-0 text-center">
                  <AnimatePresence mode="wait">
                    <motion.p key={`roi-${roi.toFixed(0)}`}
                      initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.2 }} className="font-display font-black text-4xl gold-gradient-text"
                    >{roi.toFixed(0)}%</motion.p>
                  </AnimatePresence>
                  <p className="text-[10px] text-white/35 font-body uppercase tracking-wide mt-1">ROI</p>
                </div>
              </div>
              {/* CAGR + Break-even chips */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
                <div className="bg-white/[0.04] rounded-xl px-3 py-2.5 text-center">
                  <p className="text-[10px] tracking-[0.1em] uppercase text-primary/60 font-body font-semibold mb-1">CAGR</p>
                  <AnimatePresence mode="wait">
                    <motion.p key={cagr.toFixed(1)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                      className="font-display font-bold text-lg text-white"
                    >{cagr.toFixed(1)}%<span className="text-white/30 text-xs font-body font-normal"> p.a.</span></motion.p>
                  </AnimatePresence>
                  <p className="text-[9px] text-white/25 font-body mt-0.5">Annualised return</p>
                </div>
                <div className="bg-white/[0.04] rounded-xl px-3 py-2.5 text-center">
                  <p className="text-[10px] tracking-[0.1em] uppercase text-primary/60 font-body font-semibold mb-1">Break-Even</p>
                  <AnimatePresence mode="wait">
                    <motion.p key={breakEvenYear ?? 0} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                      className="font-display font-bold text-lg text-white"
                    >{breakEvenYear !== null ? `Yr ${breakEvenYear}` : "N/A"}</motion.p>
                  </AnimatePresence>
                  <p className="text-[9px] text-white/25 font-body mt-0.5">Rental covers principal</p>
                </div>
              </div>
            </div>


            {/* Comparison panel */}
            <AnimatePresence>
              {compareMode && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white/[0.04] border border-white/10 rounded-2xl p-5"
                >
                  <p className="text-[11px] tracking-[0.12em] uppercase text-primary font-body font-semibold mb-4">Project Comparison ({years}yr)</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { proj: p, r: totalReturn, roi, capital: capitalValue, rental: totalRental, amt: amount, active: true },
                      { proj: other, r: otherReturn, roi: otherROI, capital: otherCapital, rental: otherRental, amt: otherAmt, active: false },
                    ].map(({ proj, r, roi: r2, capital, rental, amt, active }) => (
                      <div key={proj.id} className={`rounded-xl p-3.5 border ${active ? "border-primary/40 bg-primary/5" : "border-white/10 bg-white/[0.02]"}`}>
                        <p className={`text-[11px] font-body font-semibold mb-3 ${active ? "text-primary" : "text-white/50"}`}>{proj.name}</p>
                        <div className="space-y-2">
                          {[
                            { label: "Investment", val: fmt(amt, currency, rate) },
                            { label: "Total Return", val: fmt(r, currency, rate) },
                            { label: "ROI", val: `${r2.toFixed(0)}%` },
                            { label: "Capital", val: fmt(capital, currency, rate) },
                          ].map(({ label, val }) => (
                            <div key={label} className="flex justify-between gap-2">
                              <span className="text-[10px] text-white/30 font-body">{label}</span>
                              <span className={`text-[11px] font-body font-semibold ${active ? "text-white" : "text-white/50"}`}>{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Share / Download */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={shareWhatsApp}
                className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:border-primary/40 hover:bg-white/[0.06] transition-all duration-200"
              >
                <Share2 size={14} className="text-primary/70" />
                <span className="text-[10px] text-white/45 font-body font-semibold tracking-wide uppercase">WhatsApp</span>
              </button>
              <button
                onClick={shareEmail}
                className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:border-primary/40 hover:bg-white/[0.06] transition-all duration-200"
              >
                <Mail size={14} className="text-primary/70" />
                <span className="text-[10px] text-white/45 font-body font-semibold tracking-wide uppercase">Email</span>
              </button>
              <button
                onClick={printPDF}
                className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:border-primary/40 hover:bg-white/[0.06] transition-all duration-200"
              >
                <Printer size={14} className="text-primary/70" />
                <span className="text-[10px] text-white/45 font-body font-semibold tracking-wide uppercase">Save PDF</span>
              </button>
            </div>

            {/* CTA */}
            <Link
              href={p.href}
              className="group flex items-center justify-center gap-2 w-full py-4 gold-gradient text-primary-foreground font-body font-bold text-sm tracking-wide rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/25"
            >
              Explore {p.name}
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
