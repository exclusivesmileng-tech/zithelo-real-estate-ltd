"use client";

import { motion } from "framer-motion";

interface Props {
  total: number;
  remaining: number;
  /** Show as pill (compact) or inline badge */
  variant?: "pill" | "badge";
}

export default function AvailabilityCounter({ total, remaining, variant = "pill" }: Props) {
  const pct = (remaining / total) * 100;
  const urgent = remaining <= Math.ceil(total * 0.2); // last 20% = urgent

  if (variant === "badge") {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-body font-bold tracking-[0.08em] uppercase ${
        urgent ? "bg-red-500/15 text-red-500 border border-red-500/30" : "bg-primary/15 text-primary border border-primary/30"
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${urgent ? "bg-red-500 animate-pulse" : "bg-primary"}`} />
        {remaining} of {total} units available
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-body text-muted-foreground">Unit Availability</span>
        <span className={`text-xs font-body font-bold ${urgent ? "text-red-500" : "text-primary"}`}>
          {remaining} / {total} remaining
          {urgent && " — Moving Fast"}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${100 - pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className={`h-full rounded-full ${urgent ? "bg-red-500" : "gold-gradient"}`}
        />
      </div>
      <p className="text-[11px] text-muted-foreground font-body">
        {Math.round(100 - pct)}% of units reserved · {remaining} available
      </p>
    </div>
  );
}
