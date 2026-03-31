"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "zithelo-cookie-consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if user hasn't already responded
    if (!localStorage.getItem(STORAGE_KEY)) {
      // Slight delay so it doesn't flash on page load
      const t = setTimeout(() => setVisible(true), 1800);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    window.dispatchEvent(new CustomEvent("zithelo:cookie-accepted"));
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          className="fixed bottom-4 left-4 right-4 z-[80] lg:left-auto lg:right-6 lg:bottom-6 lg:max-w-md"
        >
          <div className="bg-[hsl(var(--charcoal))] border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
            {/* Gold top bar */}
            <div className="h-[2px] w-full gold-gradient" />

            <div className="p-5 flex gap-4">
              {/* Icon */}
              <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-primary/20">
                <Cookie size={16} className="text-primary-foreground" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-display font-bold text-sm mb-1">We use cookies</p>
                <p className="text-white/55 font-body text-xs leading-relaxed">
                  We use cookies to improve your experience and analyse site usage.{" "}
                  <Link href="/privacy-policy" className="text-primary hover:underline underline-offset-2">
                    Privacy Policy
                  </Link>
                </p>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={accept}
                    className="gold-gradient text-primary-foreground font-display font-bold text-xs tracking-[0.08em] uppercase px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
                  >
                    Accept
                  </button>
                  <button
                    onClick={decline}
                    className="border border-white/15 text-white/60 hover:text-white font-body text-xs px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>

              {/* Dismiss */}
              <button
                onClick={decline}
                className="p-1 text-white/30 hover:text-white/60 transition-colors shrink-0"
                aria-label="Dismiss"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Returns true if the user has accepted cookies — use in client components to gate analytics */
export function cookiesAccepted(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "accepted";
}
