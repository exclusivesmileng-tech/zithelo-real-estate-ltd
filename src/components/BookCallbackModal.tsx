"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Clock, CheckCircle2 } from "lucide-react";

const TIMES = ["Morning  9am – 12pm", "Afternoon  12pm – 5pm", "Evening  5pm – 8pm"];
const DAYS  = ["Today", "Tomorrow", "This Week"];

interface Props {
  open: boolean;
  onClose: () => void;
  projectName?: string;
}

export default function BookCallbackModal({ open, onClose, projectName }: Props) {
  const [name, setName]   = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime]   = useState("");
  const [day, setDay]     = useState("");
  const [done, setDone]   = useState(false);

  const canSubmit = name.trim() && phone.trim() && time && day;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const msg = [
      "Hello, I'd like to book a callback from Zithelo Real Estate.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Best time: ${time}, ${day}`,
      projectName ? `Interested in: ${projectName}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/2349110222323?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setName(""); setPhone(""); setTime(""); setDay("");
      onClose();
    }, 2200);
  };

  const handleClose = () => {
    setDone(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[75] bg-black/60 backdrop-blur-sm"
          />

          {/* Bottom sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            className="fixed bottom-0 left-0 right-0 z-[76] bg-card rounded-t-3xl border-t border-border overflow-hidden"
            style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3.5 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-primary" />
                <h2 className="font-heading font-semibold text-foreground text-base">
                  Book a Callback
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {done ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center gap-3 px-5"
              >
                <CheckCircle2 size={44} className="text-primary" />
                <p className="font-heading font-semibold text-foreground text-lg">
                  Opening WhatsApp…
                </p>
                <p className="text-sm text-muted-foreground font-body text-center">
                  We&apos;ll call you back at your requested time.
                </p>
              </motion.div>
            ) : (
              <div
                className="p-5 space-y-5 overflow-y-auto"
                style={{ maxHeight: "65vh" }}
              >
                {projectName && (
                  <div className="px-3 py-2 bg-primary/10 rounded-xl border border-primary/20 text-xs font-body text-primary font-semibold">
                    Re: {projectName}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground font-body mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground font-body mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234…"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground font-body mb-2">
                    Best Day
                  </label>
                  <div className="flex gap-2">
                    {DAYS.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDay(d)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-body border transition-all duration-150 ${
                          day === d
                            ? "gold-gradient text-primary-foreground border-primary shadow-sm"
                            : "border-border bg-card text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground font-body mb-2">
                    Best Time
                  </label>
                  <div className="space-y-2">
                    {TIMES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body border transition-all duration-150 ${
                          time === t
                            ? "gold-gradient text-primary-foreground border-primary shadow-sm"
                            : "border-border bg-card text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        <Clock size={14} className="flex-shrink-0" />
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="w-full py-3.5 gold-gradient text-primary-foreground font-body font-semibold text-sm rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition shadow-md shadow-primary/20"
                >
                  Request Callback via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
