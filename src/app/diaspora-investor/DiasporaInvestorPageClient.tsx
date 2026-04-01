"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle2, Globe, Building2, Users, Sparkles } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import DiasporaInvestorHeroVector from "@/components/heroes/DiasporaInvestorHeroVector";

/* ── Types ── */
interface Step1 { country: string; nigerianState: string; ageRange: string }
interface Step2 { budget: string; propertyType: string; timeline: string }
interface Step3 { name: string; email: string; phone: string; referral: string }

type FormData = Step1 & Step2 & Step3;

const EMPTY: FormData = {
  country: "", nigerianState: "", ageRange: "",
  budget: "", propertyType: "", timeline: "",
  name: "", email: "", phone: "", referral: "",
};

/* ── Static options ── */
const AGE_RANGES = ["Under 30", "30–39", "40–49", "50–59", "60+"];
const BUDGETS = [
  "Entry level", "Mid range", "Premium", "Luxury / High-end", "Prefer to discuss privately",
];
const PROPERTY_TYPES = ["Residential apartment", "Townhouse / semi-detached", "Villa / standalone", "Off-plan / pre-construction", "Student accommodation"];
const TIMELINES = ["Immediately (0–3 months)", "Within 6 months", "Within a year", "1–2 years", "Just exploring"];
const REFERRALS = ["Social media", "Friend or family", "Realtor / agent", "News / editorial", "Event / webinar", "Other"];
const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River",
  "Delta","Ebonyi","Edo","Ekiti","Enugu","FCT (Abuja)","Gombe","Imo","Jigawa","Kaduna","Kano",
  "Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau",
  "Rivers","Sokoto","Taraba","Yobe","Zamfara","None / Non-Nigerian",
];

/* ── Step config ── */
const STEPS = [
  { label: "Background",   icon: Globe },
  { label: "Investment",   icon: Building2 },
  { label: "Your Details", icon: Users },
];

/* ── Reusable field wrappers ── */
function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground font-body mb-1.5">{children}</label>;
}
function Select({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
function Input({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
    />
  );
}

/* ── Steps ── */
function Step1Form({ data, set }: { data: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <Label>Country of Residence</Label>
        <Input value={data.country} onChange={(v) => set("country", v)} placeholder="e.g. United Kingdom" />
      </div>
      <div>
        <Label>Nigerian State of Origin</Label>
        <Select value={data.nigerianState} onChange={(v) => set("nigerianState", v)} options={NIGERIAN_STATES} placeholder="Select state" />
      </div>
      <div>
        <Label>Age Range</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {AGE_RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => set("ageRange", r)}
              className={`px-3 py-2.5 rounded-xl text-sm font-body border transition-all duration-150 ${
                data.ageRange === r
                  ? "gold-gradient text-primary-foreground border-primary shadow-sm shadow-primary/20"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >{r}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step2Form({ data, set }: { data: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <Label>Investment Budget (USD)</Label>
        <div className="space-y-2">
          {BUDGETS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => set("budget", b)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body border transition-all duration-150 ${
                data.budget === b
                  ? "gold-gradient text-primary-foreground border-primary shadow-sm shadow-primary/20"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              <span>{b}</span>
              {data.budget === b && <CheckCircle2 size={15} />}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label>Preferred Property Type</Label>
        <Select value={data.propertyType} onChange={(v) => set("propertyType", v)} options={PROPERTY_TYPES} placeholder="Select type" />
      </div>
      <div>
        <Label>Investment Timeline</Label>
        <Select value={data.timeline} onChange={(v) => set("timeline", v)} options={TIMELINES} placeholder="When are you looking to invest?" />
      </div>
    </div>
  );
}

function Step3Form({ data, set }: { data: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <Label>Full Name</Label>
        <Input value={data.name} onChange={(v) => set("name", v)} placeholder="Your full name" />
      </div>
      <div>
        <Label>Email Address</Label>
        <Input value={data.email} onChange={(v) => set("email", v)} placeholder="you@example.com" type="email" />
      </div>
      <div>
        <Label>Phone / WhatsApp</Label>
        <Input value={data.phone} onChange={(v) => set("phone", v)} placeholder="+1 555 000 0000" type="tel" />
      </div>
      <div>
        <Label>How did you hear about us?</Label>
        <div className="grid grid-cols-2 gap-2">
          {REFERRALS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => set("referral", r)}
              className={`px-3 py-2.5 rounded-xl text-sm font-body border transition-all duration-150 text-left ${
                data.referral === r
                  ? "gold-gradient text-primary-foreground border-primary shadow-sm shadow-primary/20"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >{r}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Success screen ── */
function SuccessScreen({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-8 space-y-6"
    >
      <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto shadow-xl shadow-primary/30">
        <CheckCircle2 size={38} className="text-primary-foreground" />
      </div>
      <div>
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Welcome, {name.split(" ")[0]}!
        </h2>
        <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-sm mx-auto">
          Your investor profile has been received. A member of our team will reach out within 48 hours to discuss opportunities tailored to your goals.
        </p>
      </div>
      <div className="bg-card border border-border rounded-2xl p-5 text-left space-y-3 max-w-sm mx-auto">
        <p className="text-xs font-semibold tracking-wide uppercase text-primary font-body">What happens next</p>
        {[
          "Personalised property portfolio sent to your email",
          "WhatsApp introduction from your dedicated advisor",
          "Exclusive diaspora investor webinar invite",
          "Priority access to new project launches",
        ].map((item) => (
          <div key={item} className="flex items-start gap-2.5">
            <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
            <span className="text-sm font-body text-muted-foreground">{item}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/projects" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl gold-gradient text-primary-foreground text-sm font-body font-semibold shadow-md hover:opacity-90 transition">
          Browse Projects <ChevronRight size={15} />
        </Link>
        <Link href="/" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-foreground text-sm font-body hover:border-primary/50 transition">
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Main page ── */
export default function DiasporaInvestorPageClient() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof FormData, v: string) => setData((d) => ({ ...d, [k]: v }));

  const canNext = [
    data.country && data.nigerianState && data.ageRange,
    data.budget && data.propertyType && data.timeline,
    data.name && data.email && data.phone,
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch("/api/diaspora-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch { /* fail silently — still show success */ }
    setLoading(false);
    setSubmitted(true);
  };

  const stepContent = [
    <Step1Form key="s1" data={data} set={set} />,
    <Step2Form key="s2" data={data} set={set} />,
    <Step3Form key="s3" data={data} set={set} />,
  ];

  return (
    <>
      <PageHero
        title="Diaspora Investor"
        titleAccent="Programme."
        subtitle="Join hundreds of diaspora investors building wealth through Nigerian premium real estate. Register your interest in minutes."
        breadcrumb="Diaspora"
        vector={<DiasporaInvestorHeroVector />}
      />

      <section className="section-padding py-16">
      <div className="max-w-lg mx-auto">
        <div className="bg-card border border-border shadow-2xl shadow-black/10 overflow-hidden rounded-sm">

          {!submitted ? (
            <>
              {/* Progress bar */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center gap-0 relative">
                  {STEPS.map((s, i) => {
                    const Icon = s.icon;
                    const done = i < step;
                    const active = i === step;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5 relative">
                        {/* connector line */}
                        {i > 0 && (
                          <div className={`absolute left-0 right-1/2 top-[18px] -translate-y-1/2 h-0.5 ${done ? "bg-primary" : "bg-border"}`} />
                        )}
                        {i < STEPS.length - 1 && (
                          <div className={`absolute left-1/2 right-0 top-[18px] -translate-y-1/2 h-0.5 ${done ? "bg-primary" : "bg-border"}`} />
                        )}
                        <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          done ? "gold-gradient border-primary" :
                          active ? "bg-primary/10 border-primary" :
                          "bg-muted border-border"
                        }`}>
                          {done
                            ? <CheckCircle2 size={16} className="text-primary-foreground" />
                            : <Icon size={16} className={active ? "text-primary" : "text-muted-foreground"} />
                          }
                        </div>
                        <span className={`text-[10px] font-body font-semibold tracking-wide ${active ? "text-primary" : "text-muted-foreground"}`}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step content */}
              <div className="px-6 pb-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h2 className="text-base font-heading font-semibold text-foreground mb-5">
                      {step === 0 && "Tell us a bit about yourself"}
                      {step === 1 && "Your investment preferences"}
                      {step === 2 && "Create your investor profile"}
                    </h2>
                    {stepContent[step]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="px-6 pt-4 pb-6 flex items-center justify-between gap-3">
                {step > 0 ? (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                ) : (
                  <span />
                )}

                {step < STEPS.length - 1 ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canNext[step]}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl gold-gradient text-primary-foreground text-sm font-body font-semibold disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:opacity-90 transition"
                  >
                    Continue <ChevronRight size={15} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!canNext[step] || loading}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl gold-gradient text-primary-foreground text-sm font-body font-semibold disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:opacity-90 transition"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-primary-foreground" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Submitting…
                      </span>
                    ) : (
                      <>Submit Profile <Sparkles size={14} /></>
                    )}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="p-6">
              <SuccessScreen name={data.name} />
            </div>
          )}
        </div>
      </div>
      </section>
    </>
  );
}
