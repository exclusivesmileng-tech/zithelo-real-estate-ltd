"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 88,   suffix: "+", label: "Units Delivered",   prefix: "" },
  { value: 3,    suffix: "",  label: "Active Projects",   prefix: "" },
  { value: 250,  suffix: "+", label: "Investors",         prefix: "" },
  { value: 12,   suffix: "",  label: "Countries Reached", prefix: "" },
  { value: 25,   suffix: "-Year", label: "Lease Security", prefix: "" },
];

function Counter({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(to);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return <span ref={ref}>{count}</span>;
}

interface Props {
  /** "strip" = full-width coloured section, "row" = compact inline row */
  variant?: "strip" | "row";
  className?: string;
}

export default function SocialProofBar({ variant = "strip", className = "" }: Props) {
  if (variant === "row") {
    return (
      <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center">
            <p className="font-display text-2xl font-black text-foreground leading-none">
              {s.prefix}<Counter to={s.value} />{s.suffix}
            </p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-body font-semibold mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className={`relative overflow-hidden bg-[hsl(var(--charcoal))] ${className}`}>
      {/* Subtle gold glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(212,170,83,0.15) 0%, transparent 65%)" }} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-0 md:divide-x md:divide-white/10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="flex flex-col items-center text-center md:px-6"
            >
              <p className="font-display text-3xl md:text-4xl font-black text-white leading-none gold-gradient-text">
                {s.prefix}<Counter to={s.value} />{s.suffix}
              </p>
              <p className="text-[11px] tracking-[0.18em] uppercase text-white/50 font-body font-semibold mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
