"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface PageHeroProps {
  title: string;
  titleAccent?: string;   /* renders on a new line in gold-gradient-text */
  subtitle?: string;
  image?: string;
  breadcrumb?: string;
  vector?: ReactNode;
}

const PageHero = ({ title, titleAccent, subtitle, image, breadcrumb, vector }: PageHeroProps) => {
  return (
    <section className="relative min-h-[380px] md:min-h-[520px] lg:min-h-[600px] flex items-end overflow-hidden">

      {/* Background image */}
      {image && (
        <img src={image} alt={title}
          className="absolute inset-0 w-full h-full object-cover" />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 luxury-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-24 pb-16 pt-32">
        <div className={`grid grid-cols-1 ${vector ? "lg:grid-cols-2" : ""} gap-12 items-end`}>

          {/* ── Text side ── */}
          <div>

            {/* Breadcrumb pill */}
            {breadcrumb && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/15 backdrop-blur-sm">
                  {/* Gold dot */}
                  <span className="w-1.5 h-1.5 rounded-full gold-gradient" />
                  <span className="text-sm tracking-[0.1em] uppercase font-body font-semibold text-primary">
                    {breadcrumb}
                  </span>
                </span>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.08]"
            >
              {title}
              {titleAccent && (
                <>
                  <br />
                  <span className="gold-gradient-text">{titleAccent}</span>
                </>
              )}
            </motion.h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28 }}
                className="mt-5 text-base md:text-lg text-white/65 font-body leading-relaxed max-w-md"
              >
                {subtitle}
              </motion.p>
            )}

            {/* Gold rule + scroll indicator row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 flex items-center gap-5"
            >
              <div className="h-[2px] w-14 gold-gradient rounded-full" />
              <span className="text-[9px] tracking-[0.25em] uppercase font-body font-semibold text-white/35">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              >
                <ChevronDown size={13} className="text-primary opacity-60" />
              </motion.div>
            </motion.div>
          </div>

          {/* ── Vector side ── */}
          {vector && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden lg:flex items-end justify-center pb-4"
            >
              {vector}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
