"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Adaeze Nwosu",
    location: "London, UK 🇬🇧",
    role: "Andoyi House Investor",
    rating: 5,
    quote:
      "I invested in Andoyi House from London with zero friction. The documentation was thorough, the title was fully verified, and the team was available every step of the way. It's the first time investing from abroad has felt genuinely safe.",
    initials: "AN",
  },
  {
    name: "Emeka Okonkwo",
    location: "Toronto, Canada 🇨🇦",
    role: "Diaspora Investor",
    rating: 5,
    quote:
      "As someone who had been burned by Nigerian property deals before, I was cautious. Zithelo changed that entirely. Their structured model and comprehensive documentation gave me confidence I hadn't felt in years. Building generational wealth — finally.",
    initials: "EO",
  },
  {
    name: "Ngozi Abara",
    location: "Houston, USA 🇺🇸",
    role: "Signature Homes Investor",
    rating: 5,
    quote:
      "I evaluated over a dozen Nigerian real estate options before choosing Zithelo. The professionalism is unmatched. My advisor is responsive, the paperwork watertight, and I'm already seeing rental returns. Couldn't be happier.",
    initials: "NA",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="text-primary fill-primary" />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[0] }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-7 flex flex-col h-full hover:border-primary/30 hover:shadow-lg transition-all duration-300">
      <Quote size={28} className="text-primary/25 mb-5" />
      <StarRow count={t.rating} />
      <p className="mt-4 text-muted-foreground font-body text-sm leading-relaxed flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-primary-foreground">{t.initials}</span>
        </div>
        <div>
          <p className="text-sm font-body font-semibold text-foreground">{t.name}</p>
          <p className="text-xs text-muted-foreground font-body">{t.location}</p>
          <p className="text-[10px] text-primary font-body font-semibold tracking-wide uppercase mt-0.5">
            {t.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  // Auto-advance every 6 seconds on mobile
  useEffect(() => {
    const t = setTimeout(
      () => setActive((a) => (a + 1) % TESTIMONIALS.length),
      6000
    );
    return () => clearTimeout(t);
  }, [active]);

  const prev = () =>
    setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () =>
    setActive((a) => (a + 1) % TESTIMONIALS.length);

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm tracking-[0.12em] uppercase text-primary mb-4 font-body font-semibold">
            Investor Stories
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            Trusted by{" "}
            <span className="gold-gradient-text">Diaspora Investors</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-body text-lg max-w-xl mx-auto">
            From London to Toronto to Houston — see why diaspora investors chose
            Zithelo.
          </p>
        </motion.div>

        {/* Desktop: 3-col grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: single auto-advancing card */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg mx-auto"
            >
              <TestimonialCard t={TESTIMONIALS[active]} />
            </motion.div>
          </AnimatePresence>

          {/* Nav controls */}
          <div className="flex items-center justify-center gap-4 mt-7">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary/50 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-primary" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary/50 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
