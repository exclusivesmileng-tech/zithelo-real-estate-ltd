"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, TrendingUp, Wallet, BarChart3 } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PROJECTS = [
  {
    id: "andoyi",
    name: "Andoyi House",
    desc: "88 Studio Units · Yaba, Lagos",
    href: "/projects/andoyi-house",
    yield: 0.08,
    appreciation: 0.05,
    min: 20000,
    max: 500000,
    step: 5000,
  },
  {
    id: "signature",
    name: "Signature Homes",
    desc: "4-Bed Semi-Detached · Ikeja, Lagos",
    href: "/projects/signature-homes",
    yield: 0.065,
    appreciation: 0.07,
    min: 80000,
    max: 1000000,
    step: 10000,
  },
];

function fmtUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function InvestmentCalculator() {
  const [projectIdx, setProjectIdx] = useState(0);
  const [amount, setAmount] = useState(100000);
  const [years, setYears] = useState(5);

  const p = PROJECTS[projectIdx];
  const annualIncome = amount * p.yield;
  const monthlyIncome = annualIncome / 12;
  const capitalValue = amount * Math.pow(1 + p.appreciation, years);
  const totalRental = annualIncome * years;
  const totalReturn = capitalValue + totalRental - amount;
  const roi = (totalReturn / amount) * 100;

  const metrics = [
    {
      icon: Wallet,
      label: "Monthly Passive Income",
      value: fmtUSD(monthlyIncome),
      sub: `${fmtUSD(annualIncome)} per year`,
      highlight: true,
    },
    {
      icon: BarChart3,
      label: `Projected Property Value (${years}yr)`,
      value: fmtUSD(capitalValue),
      sub: `Capital growth: +${fmtUSD(capitalValue - amount)}`,
      highlight: false,
    },
    {
      icon: TrendingUp,
      label: `Total Rental Income (${years}yr)`,
      value: fmtUSD(totalRental),
      sub: `At ${Math.round(p.yield * 100)}% gross yield`,
      highlight: false,
    },
  ];

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
          {/* Inputs */}
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
                    onClick={() => {
                      setProjectIdx(i);
                      setAmount(proj.min * 4);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 ${
                      projectIdx === i
                        ? "gold-gradient border-primary shadow-md shadow-primary/20"
                        : "border-white/10 bg-white/[0.03] hover:border-primary/40"
                    }`}
                  >
                    <p className={`text-sm font-body font-semibold ${projectIdx === i ? "text-primary-foreground" : "text-white"}`}>
                      {proj.name}
                    </p>
                    <p className={`text-[11px] font-body mt-0.5 ${projectIdx === i ? "text-primary-foreground/70" : "text-white/40"}`}>
                      {proj.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs tracking-[0.15em] uppercase text-primary font-body font-semibold">
                  Investment Amount
                </label>
                <span className="text-white font-display font-bold text-lg">{fmtUSD(amount)}</span>
              </div>
              <input
                type="range"
                min={p.min}
                max={p.max}
                step={p.step}
                value={Math.min(Math.max(amount, p.min), p.max)}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "hsl(43 81% 61%)" }}
              />
              <div className="flex justify-between mt-1.5">
                <span className="text-[11px] text-white/35 font-body">{fmtUSD(p.min)}</span>
                <span className="text-[11px] text-white/35 font-body">{fmtUSD(p.max)}</span>
              </div>
            </div>

            {/* Time horizon */}
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-primary font-body font-semibold mb-3">
                Investment Horizon
              </label>
              <div className="flex gap-2">
                {[3, 5, 10, 15].map((y) => (
                  <button
                    key={y}
                    onClick={() => setYears(y)}
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

            {/* Disclaimer */}
            <p className="text-[11px] text-white/30 font-body leading-relaxed border-t border-white/5 pt-5">
              * Projections are illustrative estimates based on {Math.round(p.yield * 100)}% gross rental yield
              and {Math.round(p.appreciation * 100)}% annual capital appreciation. Actual returns may vary.
              Not financial advice.
            </p>
          </motion.div>

          {/* Outputs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className={`flex items-center gap-5 p-5 rounded-2xl border ${
                  m.highlight
                    ? "gold-gradient border-primary shadow-xl shadow-primary/20"
                    : "bg-white/[0.04] border-white/10 hover:border-primary/30 transition-colors"
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  m.highlight ? "bg-white/20" : "gold-gradient"
                }`}>
                  <m.icon size={18} className="text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[11px] tracking-wide uppercase font-body font-semibold mb-0.5 ${
                    m.highlight ? "text-primary-foreground/70" : "text-primary"
                  }`}>
                    {m.label}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={m.value}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className={`font-display font-bold text-2xl ${m.highlight ? "text-primary-foreground" : "text-white"}`}
                    >
                      {m.value}
                    </motion.p>
                  </AnimatePresence>
                  <p className={`text-[11px] font-body mt-0.5 ${m.highlight ? "text-primary-foreground/60" : "text-white/40"}`}>
                    {m.sub}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Total ROI summary */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-xs tracking-wide uppercase text-primary font-body font-semibold mb-1">
                  Total {years}-Year Return
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${totalReturn}-${years}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="font-display font-bold text-2xl text-white"
                  >
                    {fmtUSD(totalReturn)}
                  </motion.p>
                </AnimatePresence>
                <p className="text-[11px] text-white/40 font-body mt-0.5">Combined rental + capital growth</p>
              </div>
              <div className="shrink-0 text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`roi-${roi.toFixed(0)}`}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.2 }}
                    className="font-display font-black text-4xl gold-gradient-text"
                  >
                    {roi.toFixed(0)}%
                  </motion.p>
                </AnimatePresence>
                <p className="text-[10px] text-white/35 font-body uppercase tracking-wide mt-1">ROI</p>
              </div>
            </motion.div>

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
