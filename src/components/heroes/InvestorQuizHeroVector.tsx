"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Quiz question cards (stacked cascade)
const CARDS = [
  { label: "BUDGET",      sub: "How much?",    y: 56,  delay: 0.6 },
  { label: "TIMELINE",    sub: "How long?",    y: 120, delay: 0.75 },
  { label: "GOAL",        sub: "What for?",    y: 184, delay: 0.9 },
  { label: "STYLE",       sub: "How involved?",y: 248, delay: 1.05 },
];

// Result outcomes on right
const OUTCOMES = [
  { label: "OFF-PLAN",   y: 88,  delay: 1.7, primary: true },
  { label: "CO-INVEST",  y: 168, delay: 1.85, primary: false },
  { label: "LAND",       y: 248, delay: 2.0, primary: false },
];

export default function InvestorQuizHeroVector() {
  return (
    <svg viewBox="0 0 464 340" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[460px]" aria-hidden="true">

      {/* ── Background grid dots ── */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => (
          <circle key={`${row}-${col}`}
            cx={30 + col * 58} cy={28 + row * 52}
            r={1} fill={G} opacity={0.06}
          />
        ))
      )}

      {/* ── Step number column ── */}
      {CARDS.map((c, i) => (
        <motion.text key={c.label}
          x={16} y={c.y + 20}
          fontSize="8" fontFamily="sans-serif" letterSpacing="1"
          fill={G} opacity={0}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 0.3, delay: c.delay }}
        >
          {String(i + 1).padStart(2, "0")}
        </motion.text>
      ))}

      {/* ── Question cards ── */}
      {CARDS.map((c) => (
        <g key={c.label}>
          {/* Card background */}
          <motion.rect x={34} y={c.y} width={148} height={50}
            rx={3} fill="hsl(var(--charcoal, 30 15% 10%))"
            stroke={G} strokeWidth="0.7" opacity={0}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.4, delay: c.delay, ease }}
          />
          {/* Gold left bar */}
          <motion.rect x={34} y={c.y} width={3} height={50}
            rx={1.5} fill={G} opacity={0}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: c.delay + 0.1 }}
          />
          {/* Label */}
          <motion.text x={46} y={c.y + 20}
            fontSize="7.5" fontFamily="sans-serif" letterSpacing="2"
            fontWeight="700" fill={G} opacity={0}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: c.delay + 0.1 }}
          >
            {c.label}
          </motion.text>
          {/* Sub */}
          <motion.text x={46} y={c.y + 35}
            fontSize="6.5" fontFamily="sans-serif" letterSpacing="0.5"
            fill="white" opacity={0}
            animate={{ opacity: 0.45 }}
            transition={{ duration: 0.3, delay: c.delay + 0.15 }}
          >
            {c.sub}
          </motion.text>
        </g>
      ))}

      {/* ── Centre arrow path ── */}
      <motion.path
        d="M 192 168 C 225 168 235 168 268 168"
        stroke={G} strokeWidth="1.2" strokeDasharray="5 4"
        opacity={0.6}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 0.6, delay: 1.5, ease }}
      />
      {/* Arrow head */}
      <motion.path d="M 264 164 L 272 168 L 264 172"
        stroke={G} strokeWidth="1.2" fill="none" opacity={0}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.3, delay: 2.1 }}
      />

      {/* ── Scoring label ── */}
      <motion.text x={228} y={160}
        textAnchor="middle" fontSize="6" fontFamily="sans-serif"
        letterSpacing="1.5" fill={G} opacity={0}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.3, delay: 1.6 }}
      >
        SCORED
      </motion.text>

      {/* ── Outcome cards ── */}
      {OUTCOMES.map((o) => (
        <g key={o.label}>
          <motion.rect x={278} y={o.y} width={126} height={50}
            rx={3}
            fill={o.primary ? G : "none"}
            stroke={G} strokeWidth={o.primary ? "0" : "0.7"}
            opacity={0}
            animate={{ opacity: o.primary ? 1 : 0.45 }}
            transition={{ duration: 0.45, delay: o.delay, ease }}
          />
          <motion.text x={341} y={o.y + 22}
            textAnchor="middle" fontSize="7.5" fontFamily="sans-serif"
            letterSpacing="2" fontWeight="700"
            fill={o.primary ? "#1a1a1a" : G} opacity={0}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: o.delay + 0.1 }}
          >
            {o.label}
          </motion.text>
          {o.primary && (
            <>
              <motion.text x={341} y={o.y + 37}
                textAnchor="middle" fontSize="6" fontFamily="sans-serif"
                letterSpacing="1" fill="#1a1a1a" opacity={0}
                animate={{ opacity: 0.65 }}
                transition={{ duration: 0.3, delay: o.delay + 0.15 }}
              >
                YOUR MATCH
              </motion.text>
              {/* Pulse rings on primary */}
              <motion.rect x={278} y={o.y} width={126} height={50} rx={3}
                fill="none" stroke={G} strokeWidth="1"
                animate={{ opacity: [0.4, 0], scale: [1, 1.06] }}
                transition={{ duration: 2, delay: 2.2, repeat: Infinity, ease: "easeOut" }}
                style={{ originX: "341px", originY: `${o.y + 25}px` }}
              />
            </>
          )}
        </g>
      ))}

      {/* ── Corner decorations ── */}
      {[{ x: 6, y: 6 }, { x: 440, y: 6 }, { x: 6, y: 316 }, { x: 440, y: 316 }].map((p, i) => (
        <motion.g key={i} opacity={0} animate={{ opacity: 0.2 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}>
          <line x1={p.x} y1={p.y} x2={p.x + (i % 2 === 0 ? 12 : -12)} y2={p.y} stroke={G} strokeWidth="1.2" />
          <line x1={p.x} y1={p.y} x2={p.x} y2={p.y + (i < 2 ? 12 : -12)} stroke={G} strokeWidth="1.2" />
        </motion.g>
      ))}
    </svg>
  );
}
