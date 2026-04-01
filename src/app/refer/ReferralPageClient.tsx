"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ReferHeroVector from "@/components/heroes/ReferHeroVector";

/* ── Constants ── */
const ROLES = ["Realtor / Agent", "Friend / Family", "Business Partner", "Financial Advisor", "Other"];
const PROJECTS = ["Andoyi House", "Signature Homes", "Any / Not Sure"];

interface FormState {
  referrerName: string;
  referrerEmail: string;
  referrerRole: string;
  refereeName: string;
  refereeEmail: string;
  refereePhone: string;
  project: string;
  notes: string;
}

const EMPTY: FormState = {
  referrerName: "", referrerEmail: "", referrerRole: "",
  refereeName: "", refereeEmail: "", refereePhone: "",
  project: "", notes: "",
};

/* ── Small field primitives ── */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground font-body mb-1.5">{children}</label>;
}
function TextInput({ value, onChange, placeholder, type = "text", required = false }: {
  value: string; onChange: (v: string) => void;
  placeholder: string; type?: string; required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
    />
  );
}
function ChipGroup({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`px-4 py-2 rounded-xl text-sm font-body border transition-all duration-150 ${
            value === o
              ? "gold-gradient text-primary-foreground border-primary shadow-sm shadow-primary/20"
              : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
          }`}
        >{o}</button>
      ))}
    </div>
  );
}

/* ── Success screen ── */
function SuccessScreen({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-10 space-y-6"
    >
      <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto shadow-xl shadow-primary/30">
        <CheckCircle2 size={38} className="text-primary-foreground" />
      </div>
      <div>
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Thank you, {name.split(" ")[0]}!
        </h2>
        <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-sm mx-auto">
          Your referral has been received. We&apos;ll reach out to your contact within 24 hours — and we&apos;ll keep you in the loop every step of the way.
        </p>
      </div>
      <div className="bg-card border border-border rounded-2xl p-5 text-left space-y-3 max-w-sm mx-auto">
        <p className="text-xs font-semibold tracking-wide uppercase text-primary font-body">What happens next</p>
        {[
          "Your referee receives a personalised introduction",
          "Our advisor reaches out within 24 hours",
          "Referral commission paid upon successful purchase",
          "You'll receive a confirmation to your email",
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
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-foreground text-sm font-body hover:border-primary/50 transition"
        >
          Submit another referral
        </button>
      </div>
    </motion.div>
  );
}

/* ── Main page ── */
export default function ReferralPageClient() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const isValid =
    form.referrerName && form.referrerEmail && form.referrerRole &&
    form.refereeName && (form.refereeEmail || form.refereePhone) && form.project;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    try {
      await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch { /* fail silently */ }
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-[hsl(var(--charcoal))]">
        <PageHero
          breadcrumb="Referral Programme"
          title="Refer &"
          titleAccent="Earn"
          subtitle="Know someone looking to invest in premium Nigerian real estate? Refer them to Zithelo and earn a commission on every completed purchase."
          vector={<ReferHeroVector />}
        />
      </div>

      <div className="max-w-lg mx-auto px-5 pt-12 pb-20">
        <div className="bg-card rounded-3xl shadow-2xl shadow-black/10 overflow-hidden">
          <AnimatePresence mode="wait">
            {submitted ? (
              <div key="success" className="p-6">
                <SuccessScreen name={form.referrerName} />
              </div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 space-y-7"
              >
                {/* About the referrer */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-primary-foreground">1</span>
                    </div>
                    <h2 className="text-sm font-heading font-semibold text-foreground tracking-wide">About You</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <FieldLabel>Your Full Name</FieldLabel>
                      <TextInput value={form.referrerName} onChange={(v) => set("referrerName", v)} placeholder="Your name" required />
                    </div>
                    <div>
                      <FieldLabel>Your Email</FieldLabel>
                      <TextInput value={form.referrerEmail} onChange={(v) => set("referrerEmail", v)} placeholder="you@example.com" type="email" required />
                    </div>
                    <div>
                      <FieldLabel>Your Role</FieldLabel>
                      <ChipGroup value={form.referrerRole} onChange={(v) => set("referrerRole", v)} options={ROLES} />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* About the referee */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-primary-foreground">2</span>
                    </div>
                    <h2 className="text-sm font-heading font-semibold text-foreground tracking-wide">About Your Contact</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <FieldLabel>Their Full Name</FieldLabel>
                      <TextInput value={form.refereeName} onChange={(v) => set("refereeName", v)} placeholder="Their full name" required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel>Their Email</FieldLabel>
                        <TextInput value={form.refereeEmail} onChange={(v) => set("refereeEmail", v)} placeholder="their@email.com" type="email" />
                      </div>
                      <div>
                        <FieldLabel>Their Phone / WhatsApp</FieldLabel>
                        <TextInput value={form.refereePhone} onChange={(v) => set("refereePhone", v)} placeholder="+1 555 000 0000" type="tel" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground font-body -mt-1">Provide at least one of email or phone.</p>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Property interest */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-primary-foreground">3</span>
                    </div>
                    <h2 className="text-sm font-heading font-semibold text-foreground tracking-wide">Property Interest</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <FieldLabel>Project of Interest</FieldLabel>
                      <ChipGroup value={form.project} onChange={(v) => set("project", v)} options={PROJECTS} />
                    </div>
                    <div>
                      <FieldLabel>Additional Notes (optional)</FieldLabel>
                      <textarea
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        placeholder="Any context about the contact's needs or budget…"
                        rows={3}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isValid || loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl gold-gradient text-primary-foreground text-sm font-body font-semibold disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:opacity-90 transition"
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
                    <>Submit Referral <Sparkles size={14} /></>
                  )}
                </button>

                <p className="text-[11px] text-muted-foreground font-body text-center -mt-2">
                  By submitting you confirm you have the contact&apos;s permission to share their details with Zithelo Real Estate.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
