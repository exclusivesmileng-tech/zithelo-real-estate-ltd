"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHONE = "2347069716822";
const MESSAGE = encodeURIComponent(
  "Hey Harzotech 👋🏽, I saw the amazing job you did on the Zithelo Real Estate website — I'd love to discuss a project with you."
);
const WA_LINK = `https://wa.me/${PHONE}?text=${MESSAGE}`;

export default function DeveloperCredit() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group fixed bottom-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-background/80 backdrop-blur-md shadow-lg shadow-black/10 hover:border-primary/40 hover:shadow-primary/10 transition-all duration-300 cursor-pointer select-none"
      style={{ fontSize: 0 }} // prevent layout shift from text
    >
      {/* Animated dot */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
      </span>

      {/* "Crafted by" label */}
      <span className="text-[10px] tracking-[0.15em] uppercase font-body font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200 whitespace-nowrap" style={{ fontSize: "10px" }}>
        Crafted by
      </span>

      {/* Logo */}
      <img
        src="/images/Harzotech-Logo.gif"
        alt="Harzotech"
        className="h-5 w-auto object-contain"
      />

      {/* Tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[hsl(var(--charcoal))] text-white text-[10px] font-body px-3 py-1.5 rounded-full shadow-lg pointer-events-none"
          >
            💬 Tap to start a project
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  );
}
