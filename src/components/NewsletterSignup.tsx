"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

interface Props {
  /** "inline" = horizontal bar (footer/section), "card" = centred card */
  variant?: "inline" | "card";
  className?: string;
}

export default function NewsletterSignup({ variant = "inline", className = "" }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // TODO: wire to API route / Resend / Mailchimp
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 900);
  }

  if (variant === "card") {
    return (
      <div className={`relative overflow-hidden rounded-3xl bg-card border border-border p-8 md:p-12 text-center ${className}`}>
        {/* Gold glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(212,170,83,0.18) 0%, transparent 65%)" }} />
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-[10px] tracking-[0.2em] uppercase text-primary font-body font-semibold mb-4">
            <Mail size={11} /> Market Updates
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Stay Ahead of the Market</h2>
          <p className="text-muted-foreground font-body text-sm md:text-base max-w-md mx-auto mb-6">
            Monthly intelligence on Lagos real estate — new launches, price trends, and investment opportunities.
          </p>
          <FormBody email={email} setEmail={setEmail} loading={loading} submitted={submitted} onSubmit={handleSubmit} size="lg" />
          <p className="text-[11px] text-muted-foreground font-body mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    );
  }

  // inline variant
  return (
    <div className={`${className}`}>
      <p className="text-[10px] tracking-[0.2em] uppercase text-primary font-body font-semibold mb-2">Market Updates</p>
      <p className="text-sm text-muted-foreground font-body mb-3 leading-relaxed">
        Monthly insights on Lagos real estate, new launches &amp; investment opportunities.
      </p>
      <FormBody email={email} setEmail={setEmail} loading={loading} submitted={submitted} onSubmit={handleSubmit} size="sm" />
    </div>
  );
}

function FormBody({
  email, setEmail, loading, submitted, onSubmit, size,
}: {
  email: string;
  setEmail: (v: string) => void;
  loading: boolean;
  submitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
  size: "sm" | "lg";
}) {
  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 text-sm font-body text-primary font-semibold"
        >
          <CheckCircle2 size={16} /> You&apos;re on the list — look out for our next update.
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} className={size === "lg" ? "flex flex-col sm:flex-row gap-2 max-w-sm mx-auto" : "flex gap-2"}>
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`flex-1 border border-border bg-background text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${
              size === "lg" ? "px-4 py-3 rounded-xl text-sm" : "px-3 py-2.5 rounded-xl text-xs"
            }`}
          />
          <button
            type="submit"
            disabled={loading}
            className={`gold-gradient text-primary-foreground font-display font-bold tracking-[0.08em] uppercase rounded-xl flex items-center justify-center gap-2 shrink-0 transition-opacity ${
              loading ? "opacity-60" : "hover:opacity-90"
            } ${size === "lg" ? "px-6 py-3 text-sm" : "px-4 py-2.5 text-xs"}`}
          >
            {loading ? "…" : <><span>Subscribe</span><ArrowRight size={13} /></>}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
