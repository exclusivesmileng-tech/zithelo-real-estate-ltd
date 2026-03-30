"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Bookmark, ArrowRight, BookmarkX } from "lucide-react";
import Link from "next/link";
import { useSaved } from "@/contexts/SavedPropertiesContext";

const ALL_PROJECTS = [
  {
    slug: "andoyi-house",
    name: "Andoyi House",
    location: "Yaba, Lagos",
    img: "/images/andoyi/2.png",
    href: "/projects/andoyi-house",
    type: "Smart Studio · 88 Units",
  },
  {
    slug: "signature-homes",
    name: "Signature Homes 1",
    location: "Ikeja, Lagos",
    img: "/images/signature/zsh1.jpg.jpeg",
    href: "/projects/signature-homes",
    type: "4-Bed Semi-Detached",
  },
];

export default function SavedDrawer() {
  const { saved, toggle, drawerOpen, setDrawerOpen } = useSaved();
  const savedProjects = ALL_PROJECTS.filter((p) => saved.includes(p.slug));

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
          />

          {/* Panel — bottom sheet on mobile, right drawer on desktop */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            className="fixed bottom-0 left-0 right-0 lg:bottom-auto lg:top-0 lg:right-0 lg:left-auto lg:w-[380px] lg:h-screen z-[71] bg-card border-t lg:border-t-0 lg:border-l border-border rounded-t-3xl lg:rounded-none overflow-y-auto"
            style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3.5 pb-1 lg:hidden">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <Bookmark size={16} className="text-primary" />
                <h2 className="font-heading font-semibold text-foreground text-base">Saved Properties</h2>
                {savedProjects.length > 0 && (
                  <span className="w-5 h-5 rounded-full gold-gradient flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                    {savedProjects.length}
                  </span>
                )}
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              {savedProjects.length === 0 ? (
                <div className="text-center py-14 space-y-3">
                  <BookmarkX size={36} className="text-muted-foreground/30 mx-auto" />
                  <p className="text-muted-foreground font-body text-sm">No saved properties yet.</p>
                  <p className="text-muted-foreground/60 font-body text-xs max-w-[220px] mx-auto">
                    Tap the bookmark icon on any project card to save it here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedProjects.map((p) => (
                    <div key={p.slug} className="bg-background border border-border rounded-2xl overflow-hidden">
                      <div className="relative aspect-[16/8] overflow-hidden">
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                        <button
                          onClick={() => toggle(p.slug)}
                          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-red-500/80 transition-colors"
                          aria-label="Remove from saved"
                        >
                          <X size={13} className="text-white" />
                        </button>
                      </div>
                      <div className="p-4">
                        <p className="font-heading font-semibold text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground font-body mt-0.5">
                          {p.location} · {p.type}
                        </p>
                        <Link
                          href={p.href}
                          onClick={() => setDrawerOpen(false)}
                          className="mt-3 flex items-center justify-center gap-1.5 w-full py-2.5 gold-gradient text-primary-foreground text-xs font-body font-semibold rounded-xl hover:opacity-90 transition"
                        >
                          View Project <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
