"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Calendar, ChevronRight } from "lucide-react";
import { BrochureModal, SiteVisitModal } from "./ProjectModals";

interface Props {
  projectName: string;
  /** Scroll depth (px) before the bar appears — default 400 */
  threshold?: number;
}

export default function StickyCTABar({ projectName, threshold = 400 }: Props) {
  const [visible, setVisible] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed bottom-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-2xl shadow-black/10
                       lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2 lg:w-auto lg:rounded-2xl lg:border lg:shadow-xl lg:px-2 lg:py-2"
          >
            <div className="flex items-center gap-2 px-4 py-3 lg:px-1 lg:py-0">
              {/* Label (desktop only) */}
              <p className="hidden lg:block text-xs font-body font-semibold text-muted-foreground tracking-wide mr-2 whitespace-nowrap">
                {projectName}
              </p>

              <button
                onClick={() => setBrochureOpen(true)}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-foreground font-body font-semibold text-sm rounded-xl px-4 py-3 lg:py-2.5 active:scale-[0.97] transition-all"
              >
                <FileText size={15} className="text-primary shrink-0" />
                <span>Get Brochure</span>
                <ChevronRight size={13} className="text-muted-foreground hidden lg:block" />
              </button>

              <button
                onClick={() => setVisitOpen(true)}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 gold-gradient text-primary-foreground font-body font-bold text-sm rounded-xl px-4 py-3 lg:py-2.5 active:scale-[0.97] transition-all shadow-md shadow-primary/20"
              >
                <Calendar size={15} className="shrink-0" />
                <span>Book a Visit</span>
                <ChevronRight size={13} className="opacity-70 hidden lg:block" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BrochureModal projectName={projectName} open={brochureOpen} onClose={() => setBrochureOpen(false)} />
      <SiteVisitModal projectName={projectName} open={visitOpen} onClose={() => setVisitOpen(false)} />
    </>
  );
}
