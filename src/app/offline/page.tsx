"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WifiOff, RefreshCw, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function OfflinePage() {
  const [retrying, setRetrying] = useState(false);

  function retry() {
    setRetrying(true);
    setTimeout(() => window.location.reload(), 800);
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--charcoal))] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Gold glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.18) 0%, transparent 65%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 text-center max-w-md"
      >
        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/25">
          <WifiOff size={32} className="text-primary-foreground" />
        </div>

        {/* Label */}
        <p className="text-[11px] tracking-[0.28em] uppercase text-primary font-body font-semibold mb-4">
          No Connection
        </p>

        {/* Headline */}
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          You&apos;re{" "}
          <span className="gold-gradient-text">Offline</span>
        </h1>

        <p className="text-white/55 font-body text-base leading-relaxed mb-10">
          It looks like you&apos;ve lost your internet connection. Check your network
          and try again — your progress is saved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={retry}
            disabled={retrying}
            className="group inline-flex items-center gap-3 gold-gradient text-primary-foreground font-display font-bold text-sm tracking-[0.1em] uppercase px-8 py-4 rounded-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-60"
          >
            <RefreshCw
              size={15}
              className={retrying ? "animate-spin" : "transition-transform duration-300 group-hover:rotate-180"}
            />
            {retrying ? "Retrying…" : "Try Again"}
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-white/15 text-white/70 hover:text-white hover:border-white/30 font-body text-sm px-6 py-4 rounded-sm transition-colors"
          >
            Go to Home
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Offline note */}
        <p className="mt-10 text-white/25 font-body text-xs leading-relaxed">
          Some pages may still be available if you&apos;ve visited them before.
        </p>
      </motion.div>
    </div>
  );
}
