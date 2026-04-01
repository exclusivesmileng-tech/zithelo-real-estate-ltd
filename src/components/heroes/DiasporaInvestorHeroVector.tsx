"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Diaspora cities: label, approximate SVG position, line endpoint on globe
const NODES = [
  { label: "LONDON",  sub: "UK",      cx: 60,  cy: 80,  tx: 195, ty: 148, delay: 1.1 },
  { label: "HOUSTON", sub: "USA",     cx: 52,  cy: 195, tx: 190, ty: 175, delay: 1.25 },
  { label: "TORONTO", sub: "CANADA",  cx: 68,  cy: 300, tx: 200, ty: 205, delay: 1.4 },
  { label: "DUBAI",   sub: "UAE",     cx: 400, cy: 90,  tx: 270, ty: 145, delay: 1.55 },
  { label: "LAGOS",   sub: "NIGERIA", cx: 232, cy: 330, tx: 232, ty: 265, delay: 1.7 },
];

// Globe center and radius
const GX = 232, GY = 188, GR = 115;

export default function DiasporaInvestorHeroVector() {
  return (
    <svg viewBox="0 0 464 380" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[460px]" aria-hidden="true">

      {/* ── Outer glow ring ── */}
      <motion.circle cx={GX} cy={GY} r={GR + 28}
        stroke={G} strokeWidth="0.5" strokeDasharray="4 6" opacity={0.2}
        initial={{ rotate: 0 }} animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ originX: `${GX}px`, originY: `${GY}px` }}
      />

      {/* ── Globe circle ── */}
      <motion.circle cx={GX} cy={GY} r={GR}
        stroke={G} strokeWidth="1.2" opacity={0.35}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.35 }}
        transition={{ duration: 0.7, ease }}
        style={{ originX: `${GX}px`, originY: `${GY}px` }}
      />

      {/* ── Latitude lines ── */}
      {[-50, -24, 0, 24, 50].map((offset, i) => {
        const y = GY + offset;
        const half = Math.sqrt(Math.max(0, GR * GR - offset * offset));
        return (
          <motion.line key={i}
            x1={GX - half} y1={y} x2={GX + half} y2={y}
            stroke={G} strokeWidth="0.6" opacity={0.15}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.07, ease }}
            style={{ originX: `${GX}px`, originY: `${y}px` }}
          />
        );
      })}

      {/* ── Longitude arcs (simplified as vertical lines) ── */}
      {[-60, -28, 0, 28, 60].map((offset, i) => {
        const x = GX + offset;
        const halfH = Math.sqrt(Math.max(0, GR * GR - offset * offset));
        return (
          <motion.line key={i}
            x1={x} y1={GY - halfH} x2={x} y2={GY + halfH}
            stroke={G} strokeWidth="0.6" opacity={0.12}
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.07, ease }}
            style={{ originX: `${x}px`, originY: `${GY}px` }}
          />
        );
      })}

      {/* ── Africa highlight patch ── */}
      <motion.circle cx={GX + 8} cy={GY + 18} r={30}
        fill={G} opacity={0}
        animate={{ opacity: [0, 0.12, 0.07] }}
        transition={{ duration: 1.2, delay: 0.8, times: [0, 0.4, 1] }}
      />
      <motion.circle cx={GX + 8} cy={GY + 18} r={6}
        fill={G}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.0, ease }}
        style={{ originX: `${GX + 8}px`, originY: `${GY + 18}px` }}
      />

      {/* ── Connection lines: diaspora → globe ── */}
      {NODES.map((n) => (
        <motion.line key={n.label}
          x1={n.cx} y1={n.cy} x2={n.tx} y2={n.ty}
          stroke={G} strokeWidth="0.8" strokeDasharray="4 3"
          opacity={0.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 0.5, delay: n.delay, ease }}
        />
      ))}

      {/* ── Diaspora city nodes ── */}
      {NODES.map((n) => (
        <g key={n.label}>
          {/* Pulse ring */}
          <motion.circle cx={n.cx} cy={n.cy} r={10}
            stroke={G} strokeWidth="0.8" fill="none" opacity={0}
            animate={{ r: [10, 18], opacity: [0.4, 0] }}
            transition={{ duration: 1.8, delay: n.delay + 0.3, repeat: Infinity, ease: "easeOut" }}
          />
          {/* Dot */}
          <motion.circle cx={n.cx} cy={n.cy} r={4}
            fill={G} opacity={0}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: n.delay }}
          />
          {/* Label */}
          <motion.text x={n.label === "DUBAI" ? n.cx - 4 : n.cx + 10}
            y={n.cy - 6}
            textAnchor={n.label === "DUBAI" ? "end" : "start"}
            fontSize="7" fontFamily="sans-serif" letterSpacing="1.5"
            fill={G} opacity={0}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.4, delay: n.delay + 0.15 }}
          >
            {n.label}
          </motion.text>
          <motion.text x={n.label === "DUBAI" ? n.cx - 4 : n.cx + 10}
            y={n.cy + 5}
            textAnchor={n.label === "DUBAI" ? "end" : "start"}
            fontSize="5.5" fontFamily="sans-serif" letterSpacing="1"
            fill="white" opacity={0}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.4, delay: n.delay + 0.2 }}
          >
            {n.sub}
          </motion.text>
        </g>
      ))}

      {/* ── Centre badge ── */}
      <motion.rect x={GX - 42} y={GY - 13} width={84} height={26}
        rx={4} fill={G} opacity={0}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 2.0 }}
      />
      <motion.text x={GX} y={GY + 5}
        textAnchor="middle" fontSize="8" fontFamily="sans-serif"
        letterSpacing="2" fontWeight="700" fill="#1a1a1a" opacity={0}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 2.1 }}
      >
        DIASPORA CONNECT
      </motion.text>
    </svg>
  );
}
