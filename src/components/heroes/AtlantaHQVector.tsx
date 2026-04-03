"use client";

import { motion } from "framer-motion";

export default function AtlantaHQVector({ size = 120 }: { size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.42;

  // Atlanta approx position on globe projection: slightly left-of-center, upper area
  const pinX = cx - size * 0.06;
  const pinY = cy - size * 0.1;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(212,170,83,0.08)" />
          <stop offset="100%" stopColor="rgba(212,170,83,0)" />
        </radialGradient>
        <clipPath id="globeClip">
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>

      {/* Outer glow */}
      <circle cx={cx} cy={cy} r={r + size * 0.06} fill="url(#globeGlow)" />

      {/* Globe body */}
      <circle cx={cx} cy={cy} r={r} fill="rgba(212,170,83,0.04)" stroke="rgba(212,170,83,0.25)" strokeWidth={1} />

      {/* Latitude lines */}
      {[-0.55, -0.28, 0, 0.28, 0.55].map((offset, i) => {
        const y = cy + offset * r;
        const halfW = Math.sqrt(Math.max(0, r * r - (offset * r) * (offset * r)));
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={y}
            rx={halfW}
            ry={halfW * 0.18}
            stroke="rgba(212,170,83,0.15)"
            strokeWidth={0.6}
            fill="none"
          />
        );
      })}

      {/* Longitude lines */}
      {[0, 0.33, 0.66].map((offset, i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={r * offset + r * 0.08}
          ry={r}
          stroke="rgba(212,170,83,0.12)"
          strokeWidth={0.6}
          fill="none"
          clipPath="url(#globeClip)"
        />
      ))}

      {/* Equator line */}
      <line
        x1={cx - r}
        y1={cy}
        x2={cx + r}
        y2={cy}
        stroke="rgba(212,170,83,0.2)"
        strokeWidth={0.8}
      />

      {/* Pulsing rings at Atlanta */}
      <motion.circle
        cx={pinX}
        cy={pinY}
        r={size * 0.07}
        fill="none"
        stroke="rgba(212,170,83,0.4)"
        strokeWidth={1}
        animate={{ r: [size * 0.07, size * 0.18], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.circle
        cx={pinX}
        cy={pinY}
        r={size * 0.07}
        fill="none"
        stroke="rgba(212,170,83,0.3)"
        strokeWidth={0.8}
        animate={{ r: [size * 0.07, size * 0.22], opacity: [0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
      />

      {/* Pin dot */}
      <circle cx={pinX} cy={pinY} r={size * 0.035} fill="rgba(212,170,83,0.2)" />
      <motion.circle
        cx={pinX}
        cy={pinY}
        r={size * 0.025}
        fill="#D4AA53"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Label line + tag */}
      <line
        x1={pinX}
        y1={pinY - size * 0.025}
        x2={pinX + size * 0.14}
        y2={pinY - size * 0.13}
        stroke="rgba(212,170,83,0.4)"
        strokeWidth={0.8}
        strokeDasharray="2 2"
      />
      <text
        x={pinX + size * 0.16}
        y={pinY - size * 0.1}
        fontSize={size * 0.085}
        fill="rgba(212,170,83,0.8)"
        fontFamily="sans-serif"
        fontWeight="700"
        letterSpacing="0.04em"
      >
        ATL
      </text>
    </svg>
  );
}
