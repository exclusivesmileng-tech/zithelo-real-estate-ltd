"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, DollarSign, Globe } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import BecomeAnInvestorHeroVector from "@/components/heroes/BecomeAnInvestorHeroVector";

const investorTypes = [
  { id: "diaspora", label: "Diaspora Investor", icon: Globe, desc: "Invest from abroad in premium Nigerian real estate with full management support." },
  { id: "individual", label: "Individual Investor", icon: TrendingUp, desc: "Direct investment in a specific Zithelo development with long-term value creation." },
  { id: "institutional", label: "Institutional / Fund", icon: Shield, desc: "Bulk investment or fund allocation across our active and pipeline projects." },
  { id: "offplan", label: "Off-Plan Buyer", icon: DollarSign, desc: "Reserve a unit at pre-completion pricing for long-term capital appreciation." },
];

const highlights = [
  { figure: "25-Year", label: "Structured Lease", sub: "Long-term income security" },
  { figure: "Fibre", label: "Ready Infrastructure", sub: "Premium tenant attraction" },
  { figure: "Title", label: "Verified & Secured", sub: "Full legal due diligence" },
  { figure: "2027", label: "Delivery Target", sub: "Current active portfolio" },
];

export default function BecomeAnInvestorPageClient() {
  const [type, setType] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/investor-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type }),
      });
    } catch { /* fail silently */ }
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        title="Become an Investor"
        titleAccent="Grow Your Wealth."
        subtitle="Access structured real estate investment opportunities in Africa's fastest-growing cities."
        image="/images/hero-skyline.jpg"
        breadcrumb="Invest"
        vector={<BecomeAnInvestorHeroVector />}
      />

      {/* Investment highlights */}
      <section className="bg-[hsl(var(--charcoal))] py-10">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <p className="font-display text-2xl md:text-3xl font-bold gold-gradient-text">{h.figure}</p>
                <p className="mt-1 text-xs font-body font-semibold text-white">{h.label}</p>
                <p className="mt-0.5 text-[11px] text-white/50 font-body">{h.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1100px] mx-auto">

          {/* Investor types */}
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-4">Investment Type</p>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                How Would You Like to <span className="gold-gradient-text">Invest?</span>
              </h2>
              <Link
                href="/investor-quiz"
                className="group inline-flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-primary transition-colors duration-200 shrink-0"
              >
                Not sure?
                <span className="font-semibold text-primary/70 group-hover:text-primary transition-colors duration-200">
                  Take the investor quiz →
                </span>
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
            {investorTypes.map((it, i) => (
              <motion.button
                key={it.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setType(it.id)}
                className={`group text-left p-7 rounded-sm border transition-all duration-300 ${
                  type === it.id
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center mb-4 transition-all duration-300 ${
                  type === it.id ? "border-primary bg-primary/10" : "border-border group-hover:border-primary/50"
                }`}>
                  <it.icon size={20} className="text-primary" />
                </div>
                <h3 className={`font-display text-lg font-bold mb-2 transition-colors duration-300 ${type === it.id ? "text-primary" : "text-foreground"}`}>
                  {it.label}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{it.desc}</p>
                {type === it.id && (
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="mt-4 h-[2px] w-10 gold-gradient rounded-full origin-left" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Form */}
          <AnimatedSection delay={0.2}>
            <div className="relative bg-card border border-border rounded-sm p-8 md:p-12 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient opacity-60" />
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
                    <TrendingUp size={28} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">Enquiry Received</h3>
                  <p className="text-muted-foreground font-body max-w-sm mx-auto">
                    Thank you for your interest. Our investment team will contact you within 2 business days.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { id: "name",    label: "Full Name",         type: "text",  required: true },
                      { id: "email",   label: "Email Address",     type: "email", required: true },
                      { id: "phone",   label: "Phone Number",      type: "tel",   required: false },
                      { id: "country", label: "Country of Residence", type: "text", required: false },
                    ].map((f) => (
                      <div key={f.id}>
                        <label className="block text-[10px] tracking-[0.2em] uppercase font-body font-semibold text-muted-foreground mb-2">
                          {f.label}{f.required && <span className="text-primary ml-1">*</span>}
                        </label>
                        <input
                          type={f.type}
                          required={f.required}
                          value={form[f.id as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                          className="w-full bg-background border border-border rounded-sm px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-200"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Budget — open text, no specific figures */}
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase font-body font-semibold text-muted-foreground mb-2">
                      Investment Interest
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. residential unit, land partnership, off-plan…"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full bg-background border border-border rounded-sm px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase font-body font-semibold text-muted-foreground mb-2">
                      Additional Information
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your investment goals, preferred projects, or any questions..."
                      className="w-full bg-background border border-border rounded-sm px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center gap-3 gold-gradient text-primary-foreground px-8 py-4 font-display font-bold text-sm tracking-[0.12em] uppercase rounded-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-60"
                  >
                    {loading ? "Submitting…" : <>Submit Investment Enquiry<ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" /></>}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
