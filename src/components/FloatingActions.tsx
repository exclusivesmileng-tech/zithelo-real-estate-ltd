"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Bookmark } from "lucide-react";
import { useSaved } from "@/contexts/SavedPropertiesContext";

/**
 * Back-to-top and saved-properties pill only — the contact quick-actions
 * (WhatsApp/Call/Email/Book a callback) that used to live here were merged
 * into the single Linda launcher in AIAssistant.tsx, so visitors have one
 * floating button, not two competing for the same corner.
 */
export default function FloatingActions() {
  const { count, setDrawerOpen } = useSaved();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* ── Back to top — bottom LEFT ── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="hidden lg:flex fixed bottom-[calc(2rem+env(safe-area-inset-bottom))] left-6 z-50 w-11 h-11 rounded-full gold-gradient items-center justify-center shadow-lg shadow-primary/30 hover:opacity-90 hover:scale-110 transition-all duration-200"
          >
            <ArrowUp size={18} className="text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Saved-properties pill — bottom right, left of the Linda launcher ── */}
      <AnimatePresence>
        {count > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: 10 }}
            transition={{ duration: 0.25 }}
            onClick={() => setDrawerOpen(true)}
            aria-label="View saved properties"
            className="hidden lg:flex fixed bottom-[calc(2rem+env(safe-area-inset-bottom))] right-[76px] z-50 h-11 px-4 rounded-full gold-gradient items-center gap-2 shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
          >
            <Bookmark size={14} className="text-primary-foreground" />
            <span className="text-xs font-body font-bold text-primary-foreground">
              Saved {count}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
