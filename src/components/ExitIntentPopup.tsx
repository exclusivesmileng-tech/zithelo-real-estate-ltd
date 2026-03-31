"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, Download } from "lucide-react";

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("exit-popup-shown")) return;

    // Desktop: mouse leaves viewport top
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !fired.current) {
        fired.current = true;
        setOpen(true);
        sessionStorage.setItem("exit-popup-shown", "1");
      }
    };

    // Mobile: user has scrolled 70% down then rapidly scrolls up (intent to leave)
    let lastScrollY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const curr = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docH > 0 ? curr / docH : 0;
        if (pct > 0.7 && curr < lastScrollY - 80 && !fired.current) {
          fired.current = true;
          setOpen(true);
          sessionStorage.setItem("exit-popup-shown", "1");
        }
        lastScrollY = curr;
        ticking = false;
      });
    };

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-card rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Gold header strip */}
            <div className="relative gold-gradient px-7 pt-8 pb-10 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{ backgroundImage: "radial-gradient(hsl(17 13% 12%) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
              />
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
              >
                <X size={14} />
              </button>
              <div className="relative z-10">
                <p className="text-[10px] tracking-[0.25em] uppercase text-primary-foreground/60 font-body font-semibold mb-2">Free Download</p>
                <h3 className="font-display text-2xl font-bold text-primary-foreground leading-tight">
                  Before You Go —<br />Get Our Investment Guide
                </h3>
              </div>
            </div>

            {/* Offset icon */}
            <div className="flex justify-center -mt-5 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-card border-2 border-border shadow-lg flex items-center justify-center">
                <Download size={18} className="text-primary" />
              </div>
            </div>

            <div className="px-7 pb-7 pt-4">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-3 py-4 text-center"
                  >
                    <CheckCircle2 size={32} className="text-primary" />
                    <p className="font-display font-bold text-foreground text-lg">It&apos;s Heading to Your Inbox</p>
                    <p className="text-sm text-muted-foreground font-body">Your Lagos Real Estate Investment Guide is on its way.</p>
                    <button
                      onClick={() => setOpen(false)}
                      className="mt-2 px-6 py-3 rounded-2xl bg-muted text-foreground font-body font-semibold text-sm"
                    >
                      Continue Browsing
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form">
                    <p className="text-sm text-muted-foreground font-body text-center mb-5">
                      The 2026 Lagos Real Estate Investment Guide — everything you need before making your first investment.
                    </p>
                    <ul className="flex flex-col gap-1.5 mb-5">
                      {["Market pricing & ROI benchmarks", "Best neighbourhoods for diaspora buyers", "Step-by-step investment process", "Tax & legal considerations"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm font-body text-foreground">
                          <CheckCircle2 size={13} className="text-primary shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                      <input
                        type="email"
                        required
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-border bg-background text-foreground font-body text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full gold-gradient text-primary-foreground font-display font-bold tracking-[0.08em] uppercase rounded-2xl py-4 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                      >
                        {loading ? "Sending…" : <><span>Send Me the Guide</span><ArrowRight size={15} /></>}
                      </button>
                    </form>
                    <p className="text-center text-[11px] text-muted-foreground font-body mt-3">No spam. Unsubscribe anytime.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
