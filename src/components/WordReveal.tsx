"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WordRevealProps {
  text: string;
  className?: string;
  /** Extra delay before the first word starts (seconds) */
  delay?: number;
  /** Stagger gap between each word (seconds) */
  stagger?: number;
  /** Tag to render — defaults to span so it can live inside any heading */
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p";
}

export default function WordReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.07,
  as: Tag = "span",
}: WordRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-60px" });

  const words = text.split(" ");

  return (
    // @ts-expect-error — polymorphic ref is fine here
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-none">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.55,
              delay: delay + i * stagger,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
          {/* Preserve inter-word spacing */}
          {i < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
