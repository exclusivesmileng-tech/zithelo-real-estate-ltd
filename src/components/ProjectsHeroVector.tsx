"use client";

import { motion } from "framer-motion";

const GOLD = "hsl(43, 81%, 61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

interface Building {
  x: number; w: number; y: number; h: number; delay: number; isGold: boolean;
}

// all buildings: y + h = 360 (ground line)
const BUILDINGS: Building[] = [
  { x: 30,  w: 55,  y: 140, h: 220, delay: 0.30, isGold: false },
  { x: 100, w: 85,  y: 60,  h: 300, delay: 0.40, isGold: false },
  { x: 200, w: 65,  y: 120, h: 240, delay: 0.35, isGold: false },
  { x: 280, w: 110, y: 40,  h: 320, delay: 0.45, isGold: true  },
  { x: 405, w: 65,  y: 140, h: 220, delay: 0.50, isGold: false },
];

export default function ProjectsHeroVector() {
  return (
    <svg
      viewBox="0 0 500 385"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[460px]"
      aria-hidden
    >
      {/* ── Blueprint grid ────────────────────────────────────── */}
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.line
          key={`h${i}`}
          x1="0" y1={60 * i} x2="500" y2={60 * i}
          stroke="white" strokeOpacity="0.07" strokeWidth="0.8"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, delay: i * 0.08 }}
        />
      ))}
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <motion.line
          key={`v${i}`}
          x1={i * 71} y1="0" x2={i * 71} y2="385"
          stroke="white" strokeOpacity="0.07" strokeWidth="0.8"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, delay: i * 0.07 }}
        />
      ))}

      {/* ── Ground line ───────────────────────────────────────── */}
      <motion.line
        x1="0" y1="360" x2="500" y2="360"
        stroke={GOLD} strokeOpacity="0.5" strokeWidth="1.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.15, ease }}
      />

      {/* ── Buildings — scale from bottom ────────────────────── */}
      {BUILDINGS.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x} y={b.y} width={b.w} height={b.h}
          fill={b.isGold ? GOLD : "white"}
          fillOpacity={b.isGold ? 0.1 : 0.07}
          stroke={b.isGold ? GOLD : "white"}
          strokeOpacity={b.isGold ? 0.5 : 0.2}
          strokeWidth="1"
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.85, delay: b.delay, ease }}
        />
      ))}

      {/* ── B4 (gold) windows ─────────────────────────────────── */}
      {[60, 90, 120, 150, 180, 210, 240]
        .flatMap((wy) => [295, 320, 345, 370].map((wx) => ({ wx, wy })))
        .map(({ wx, wy }, i) => (
          <motion.rect
            key={`w4-${i}`}
            x={wx} y={wy} width="14" height="18"
            fill="white" fillOpacity="0.18"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: 1.5 + i * 0.025 }}
          />
        ))}

      {/* ── B2 windows (gold tint) ────────────────────────────── */}
      {[80, 110, 140, 170, 200, 230]
        .flatMap((wy) => [112, 136, 160].map((wx) => ({ wx, wy })))
        .map(({ wx, wy }, i) => (
          <motion.rect
            key={`w2-${i}`}
            x={wx} y={wy} width="14" height="18"
            fill={GOLD} fillOpacity="0.3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: 1.3 + i * 0.035 }}
          />
        ))}

      {/* ── B1 windows ────────────────────────────────────────── */}
      {[160, 195, 230, 265]
        .flatMap((wy) => [40, 61].map((wx) => ({ wx, wy })))
        .map(({ wx, wy }, i) => (
          <motion.rect
            key={`w1-${i}`}
            x={wx} y={wy} width="14" height="18"
            fill="white" fillOpacity="0.14"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: 1.2 + i * 0.055 }}
          />
        ))}

      {/* ── B3 windows ────────────────────────────────────────── */}
      {[140, 170, 200, 230]
        .flatMap((wy) => [210, 234].map((wx) => ({ wx, wy })))
        .map(({ wx, wy }, i) => (
          <motion.rect
            key={`w3-${i}`}
            x={wx} y={wy} width="14" height="18"
            fill="white" fillOpacity="0.14"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: 1.4 + i * 0.055 }}
          />
        ))}

      {/* ── B5 windows ────────────────────────────────────────── */}
      {[160, 195, 230, 265]
        .flatMap((wy) => [415, 439].map((wx) => ({ wx, wy })))
        .map(({ wx, wy }, i) => (
          <motion.rect
            key={`w5-${i}`}
            x={wx} y={wy} width="14" height="18"
            fill="white" fillOpacity="0.14"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: 1.65 + i * 0.055 }}
          />
        ))}

      {/* ── Gold tower spire ──────────────────────────────────── */}
      <motion.path
        d="M280 40 L335 8 L390 40"
        stroke={GOLD} strokeWidth="1.5" strokeOpacity="0.7" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 1.35, ease }}
      />
      <motion.line
        x1="335" y1="8" x2="335" y2="40"
        stroke={GOLD} strokeOpacity="0.75" strokeWidth="2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.25, delay: 1.95 }}
      />

      {/* Antenna tip */}
      <motion.circle
        cx="335" cy="5"
        fill={GOLD} fillOpacity="0.9"
        initial={{ r: 0 }} animate={{ r: 3 }}
        transition={{ duration: 0.2, delay: 2.2 }}
      />
      {/* Pulse ring */}
      <motion.circle
        cx="335" cy="5"
        fill="none" stroke={GOLD}
        initial={{ r: 0, strokeOpacity: 0 }}
        animate={{ r: [0, 10, 18], strokeOpacity: [0.65, 0.3, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2.4, ease: "easeOut", repeatDelay: 0.6 }}
      />

      {/* ── Measurement dash across gold tower top ────────────── */}
      <motion.path
        d="M280 26 L390 26"
        stroke={GOLD} strokeWidth="0.7" strokeOpacity="0.22"
        strokeDasharray="4 3" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 1.75 }}
      />
      {/* End ticks */}
      <motion.line x1="280" y1="22" x2="280" y2="30"
        stroke={GOLD} strokeOpacity="0.35" strokeWidth="0.9"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.15, delay: 2.45 }}
      />
      <motion.line x1="390" y1="22" x2="390" y2="30"
        stroke={GOLD} strokeOpacity="0.35" strokeWidth="0.9"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.15, delay: 2.45 }}
      />

      {/* ── Corner bracket frames ─────────────────────────────── */}
      <motion.path
        d="M460 8 L493 8 L493 42"
        stroke={GOLD} strokeWidth="1.5" strokeOpacity="0.42" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, delay: 0.75, ease }}
      />
      <motion.path
        d="M8 330 L8 372 L50 372"
        stroke={GOLD} strokeWidth="1.5" strokeOpacity="0.42" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, delay: 0.88, ease }}
      />

      {/* ── Ground connection dots ───────────────────────────── */}
      {BUILDINGS.map((b, i) => (
        <motion.circle
          key={`gd${i}`}
          cx={b.x + b.w / 2} cy={360}
          fill={b.isGold ? GOLD : "white"}
          fillOpacity={b.isGold ? 0.8 : 0.35}
          initial={{ r: 0 }} animate={{ r: 4 }}
          transition={{ duration: 0.25, delay: b.delay + 0.85, ease }}
        />
      ))}

      {/* ── Connection lines between buildings on ground ──────── */}
      {BUILDINGS.slice(0, -1).map((b, i) => {
        const next = BUILDINGS[i + 1];
        return (
          <motion.line
            key={`cl${i}`}
            x1={b.x + b.w / 2} y1="360"
            x2={next.x + next.w / 2} y2="360"
            stroke="white" strokeOpacity="0.12" strokeWidth="0.8"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.35, delay: 1.5 + i * 0.08 }}
          />
        );
      })}

      {/* ── Floating particles above skyline ─────────────────── */}
      {[
        { cx: 65,  cy: 32 },
        { cx: 185, cy: 22 },
        { cx: 255, cy: 14 },
        { cx: 450, cy: 30 },
      ].map((p, i) => (
        <motion.circle
          key={`fp${i}`}
          cx={p.cx} cy={p.cy} r="2.5"
          fill={GOLD} fillOpacity="0.65"
          animate={{ y: [0, -10, 0], opacity: [0.65, 1, 0.65] }}
          transition={{
            duration: 2.6 + i * 0.5,
            repeat: Infinity,
            delay: 1.6 + i * 0.35,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── "PORTFOLIO" label ─────────────────────────────────── */}
      <motion.text
        x="406" y="133"
        fill={GOLD} fillOpacity="0.55"
        fontSize="10" fontWeight="700" letterSpacing="3.5"
        fontFamily="sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.1 }}
      >
        PORTFOLIO
      </motion.text>
    </svg>
  );
}
