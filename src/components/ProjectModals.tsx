"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Calendar, CheckCircle2, Phone, ArrowRight } from "lucide-react";

// ─── Brochure Modal ──────────────────────────────────────────────────────────

interface BrochureModalProps {
  projectName: string;
  open: boolean;
  onClose: () => void;
}

export function BrochureModal({ projectName, open, onClose }: BrochureModalProps) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/brochure-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, projectName }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl gold-gradient flex items-center justify-center shrink-0">
          <FileText size={18} className="text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">Request Brochure</h3>
          <p className="text-xs text-muted-foreground font-body">{projectName}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3 py-4 text-center">
            <CheckCircle2 size={36} className="text-primary" />
            <p className="font-display font-bold text-foreground text-lg">Brochure on its way!</p>
            <p className="text-sm text-muted-foreground font-body">Check your inbox — we&apos;ve sent the {projectName} investment brochure to {form.email}.</p>
            {process.env.NEXT_PUBLIC_BROCHURE_PDF_URL && (
              <a
                href={process.env.NEXT_PUBLIC_BROCHURE_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="mt-1 inline-flex items-center gap-2 gold-gradient text-primary-foreground font-display font-bold text-xs tracking-[0.08em] uppercase px-5 py-3 rounded-2xl hover:opacity-90 transition-opacity"
              >
                <FileText size={13} /> Download Now
              </a>
            )}
            <button onClick={onClose} className="mt-2 px-6 py-3 rounded-2xl bg-muted text-foreground font-body font-semibold text-sm">Close</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field label="Full Name" placeholder="Your name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} type="text" required />
            <Field label="Email Address" placeholder="your@email.com" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} type="email" required />
            <button type="submit" disabled={loading} className="w-full gold-gradient text-primary-foreground font-display font-bold tracking-[0.08em] uppercase rounded-2xl py-4 flex items-center justify-center gap-2 mt-2 active:scale-[0.98] transition-all">
              {loading ? "Sending…" : <><span>Send Me the Brochure</span><ArrowRight size={15} /></>}
            </button>
            <p className="text-center text-[11px] text-muted-foreground font-body">We&apos;ll email your brochure immediately. No spam.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </BottomSheet>
  );
}

// ─── Site Visit Modal ────────────────────────────────────────────────────────

interface SiteVisitModalProps {
  projectName: string;
  open: boolean;
  onClose: () => void;
}

export function SiteVisitModal({ projectName, open, onClose }: SiteVisitModalProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Min date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/site-visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, projectName }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl gold-gradient flex items-center justify-center shrink-0">
          <Calendar size={18} className="text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">Book a Site Visit</h3>
          <p className="text-xs text-muted-foreground font-body">{projectName}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3 py-4 text-center">
            <CheckCircle2 size={36} className="text-primary" />
            <p className="font-display font-bold text-foreground text-lg">Visit Booked!</p>
            <p className="text-sm text-muted-foreground font-body">Our team will confirm your site visit to {projectName} within 24 hours.</p>
            <button onClick={onClose} className="mt-4 px-6 py-3 rounded-2xl bg-muted text-foreground font-body font-semibold text-sm">Close</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Full Name" placeholder="Your name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} type="text" required />
              <Field label="Phone Number" placeholder="+234…" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} type="tel" required Icon={Phone} />
            </div>
            <Field label="Email Address" placeholder="your@email.com" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} type="email" required />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-body font-semibold text-foreground tracking-wide">Preferred Visit Date <span className="text-primary">*</span></label>
              <input
                type="date"
                required
                min={minDate}
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className="w-full border border-border bg-background text-foreground font-body text-sm px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-body font-semibold text-foreground tracking-wide">Notes (optional)</label>
              <textarea
                rows={2}
                placeholder="Any questions or special requests?"
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                className="w-full border border-border bg-background text-foreground font-body text-sm px-3 py-2.5 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full gold-gradient text-primary-foreground font-display font-bold tracking-[0.08em] uppercase rounded-2xl py-4 flex items-center justify-center gap-2 mt-2 active:scale-[0.98] transition-all">
              {loading ? "Booking…" : <><span>Confirm Site Visit</span><ArrowRight size={15} /></>}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </BottomSheet>
  );
}

// ─── Shared ──────────────────────────────────────────────────────────────────

function BottomSheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />
          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[61] bg-background rounded-t-3xl px-5 pt-5 pb-[calc(2rem+env(safe-area-inset-bottom))] max-h-[90vh] overflow-y-auto lg:max-w-lg lg:mx-auto lg:left-0 lg:right-0 lg:rounded-2xl lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 shadow-2xl"
          >
            {/* Handle */}
            <div className="w-10 h-1 rounded-full bg-border mx-auto mb-5" />
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <X size={16} />
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label, placeholder, value, onChange, type, required, Icon,
}: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type: string; required?: boolean; Icon?: React.ElementType;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-body font-semibold text-foreground tracking-wide">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />}
        <input
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full border border-border bg-background text-foreground font-body text-sm py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${Icon ? "pl-8 pr-3" : "px-3"}`}
        />
      </div>
    </div>
  );
}
