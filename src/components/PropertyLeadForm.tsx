"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, MessageCircle, Phone, Check } from "lucide-react";
import { trackMeta } from "@/lib/metaPixel";
import { getAttribution, newEventId } from "@/lib/attribution";
import {
  BUDGETS, ENQUIRY_TYPES, PAYMENT_PREFERENCES, PROJECT_BROCHURES, TIMELINES, VIEWING_READINESS,
} from "@/lib/leads";

const WHATSAPP_NUMBER = "2349110222323";

type AnswerKey = "enquiryType" | "budget" | "timeline" | "paymentPreference" | "viewingReadiness";

interface Question {
  key: AnswerKey;
  title: (project: string) => string;
  /** Stored values (Airtable) with friendlier on-screen labels */
  options: readonly string[];
  labels?: Record<string, string>;
}

const QUESTIONS: Question[] = [
  {
    key: "enquiryType",
    title: (p) => `What’s your interest in ${p}?`,
    options: ENQUIRY_TYPES,
    labels: {
      "Personal/family purchase": "A home for me or my family",
      Investment: "An investment",
      "Realtor/agent": "I’m a realtor / agent",
      Other: "Something else",
    },
  },
  { key: "budget", title: () => "What budget are you working with?", options: BUDGETS },
  {
    key: "timeline",
    title: () => "When are you looking to buy?",
    options: TIMELINES,
    labels: { Researching: "Just researching for now" },
  },
  {
    key: "paymentPreference",
    title: () => "How would you prefer to pay?",
    options: PAYMENT_PREFERENCES,
    labels: { Outright: "Outright payment", Undecided: "Not decided yet" },
  },
  {
    key: "viewingReadiness",
    title: () => "Would you like to see the property?",
    options: VIEWING_READINESS,
    labels: {
      "Ready to book inspection": "Yes — I’m ready to book an inspection",
      "Needs details first": "I’d like more details first",
      "Not ready": "Not yet",
    },
  },
];

const TOTAL_STEPS = QUESTIONS.length + 1;

interface Props {
  projectName: string;
  /** Called from the success screen's Close button (sheet variant) */
  onClose?: () => void;
}

/**
 * Multi-step lead qualification form: one tap-to-answer question per screen
 * (auto-advancing), contact details last. Used in the brochure sheet and
 * inline on each property page.
 */
export default function PropertyLeadForm({ projectName, onClose }: Props) {
  const downloadUrl = PROJECT_BROCHURES[projectName] ?? process.env.NEXT_PUBLIC_BROCHURE_PDF_URL;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<AnswerKey, string>>({
    enquiryType: "", budget: "", timeline: "", paymentPreference: "", viewingReadiness: "",
  });
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function choose(key: AnswerKey, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));
    // Brief pause so the tap visibly registers before the next question slides in
    setTimeout(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1)), 180);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const eventId = newEventId();
    try {
      const res = await fetch("/api/property-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, ...contact, projectName, eventId, attribution: getAttribution() }),
      });
      if (!res.ok) throw new Error("Failed");
      trackMeta("Lead", { content_name: projectName, content_category: answers.enquiryType }, eventId);
      setSubmitted(true);
    } catch {
      setError("Something went wrong — please try again, or message us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Zithelo, I'm interested in ${projectName}${contact.name ? ` — this is ${contact.name.split(" ")[0]}` : ""}.`
  )}`;

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3 py-4 text-center">
        <CheckCircle2 size={36} className="text-primary" />
        <p className="font-display font-bold text-foreground text-lg">Thank you, {contact.name.split(" ")[0]}!</p>
        <p className="text-sm text-muted-foreground font-body max-w-sm">
          {downloadUrl
            ? <>Your {projectName} brochure is ready below, and we&apos;ve emailed a copy to {contact.email}. Our team will reach out on WhatsApp shortly.</>
            : <>We&apos;ve received your details for {projectName}. Our team will reach out on WhatsApp shortly.</>}
        </p>
        <div className="mt-1 flex flex-wrap justify-center gap-2">
          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 gold-gradient text-primary-foreground font-display font-bold text-xs tracking-[0.08em] uppercase px-5 py-3 rounded-2xl hover:opacity-90 transition-opacity"
            >
              <FileText size={13} /> Download Brochure
            </a>
          )}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackMeta("Contact", { content_name: projectName })}
            className="inline-flex items-center gap-2 bg-muted text-foreground font-display font-bold text-xs tracking-[0.08em] uppercase px-5 py-3 rounded-2xl hover:bg-muted/80 transition-colors"
          >
            <MessageCircle size={13} className="text-primary" /> Chat on WhatsApp
          </a>
        </div>
        {onClose && (
          <button onClick={onClose} className="mt-2 px-6 py-3 rounded-2xl text-muted-foreground font-body font-semibold text-sm hover:text-foreground">Close</button>
        )}
      </motion.div>
    );
  }

  const question = QUESTIONS[step];

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center gap-1 text-xs font-body font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={13} /> Back
          </button>
        ) : <span />}
        <span className="text-[11px] font-body font-semibold text-muted-foreground tracking-wide">
          Step {step + 1} of {TOTAL_STEPS}
        </span>
      </div>
      <div className="h-1 w-full rounded-full bg-muted overflow-hidden mb-6">
        <motion.div
          className="h-full gold-gradient"
          initial={false}
          animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {question ? (
          <motion.div
            key={question.key}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.2 }}
          >
            <p className="font-display text-lg font-bold text-foreground mb-4">{question.title(projectName)}</p>
            <div className="flex flex-col gap-2.5">
              {question.options.map((value) => {
                const selected = answers[question.key] === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => choose(question.key, value)}
                    className={`w-full flex items-center justify-between gap-3 text-left border rounded-xl px-4 py-3.5 font-body text-sm font-semibold transition-all active:scale-[0.98] ${
                      selected
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                    }`}
                  >
                    {question.labels?.[value] ?? value}
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${selected ? "gold-gradient border-transparent" : "border-border"}`}>
                      {selected && <Check size={11} className="text-primary-foreground" strokeWidth={3} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="contact"
            onSubmit={submit}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            <p className="font-display text-lg font-bold text-foreground">
              {downloadUrl ? "Last step — where should we send your brochure?" : "Last step — how can we reach you?"}
            </p>
            <Input label="Full Name" placeholder="Your name" value={contact.name} onChange={(v) => setContact((c) => ({ ...c, name: v }))} type="text" autoComplete="name" />
            <Input label="Phone / WhatsApp" placeholder="+234 800 000 0000" value={contact.phone} onChange={(v) => setContact((c) => ({ ...c, phone: v }))} type="tel" autoComplete="tel" Icon={Phone} />
            <Input label="Email Address" placeholder="your@email.com" value={contact.email} onChange={(v) => setContact((c) => ({ ...c, email: v }))} type="email" autoComplete="email" />
            {error && <p className="text-xs text-red-500 font-body">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full gold-gradient text-primary-foreground font-display font-bold tracking-[0.08em] uppercase rounded-2xl py-4 flex items-center justify-center gap-2 mt-1 active:scale-[0.98] transition-all disabled:opacity-70"
            >
              {loading ? "Sending…" : <><span>{downloadUrl ? "Get the Brochure" : "Submit"}</span><ArrowRight size={15} /></>}
            </button>
            <p className="text-center text-[11px] text-muted-foreground font-body">Your details stay with Zithelo. No spam.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Input({
  label, placeholder, value, onChange, type, autoComplete, Icon,
}: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void;
  type: string; autoComplete?: string; Icon?: React.ElementType;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-body font-semibold text-foreground tracking-wide">
        {label} <span className="text-primary">*</span>
      </label>
      <div className="relative">
        {Icon && <Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />}
        <input
          type={type}
          required
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full border border-border bg-background text-foreground font-body text-base py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${Icon ? "pl-8 pr-3" : "px-3"}`}
        />
      </div>
    </div>
  );
}
