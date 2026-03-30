"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Four pillars — one at each compass point
const PILLARS = [
  { cx: 260, cy:  78, label: "EXECUTION",  sub: "EXCELLENCE",  delay: 1.3 },  // top
  { cx: 378, cy: 178, label: "MARKET",     sub: "INTELLIGENCE",delay: 1.6 },  // right
  { cx: 260, cy: 278, label: "LONG-TERM",  sub: "VISION",      delay: 1.9 },  // bottom
  { cx: 142, cy: 178, label: "STRATEGIC",  sub: "PARTNERSHIPS",delay: 2.2 },  // left
];

// Hexagon points helper (flat-top, size s)
function hex(cx: number, cy: number, s: number) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${cx + s * Math.cos(a)},${cy + s * Math.sin(a)}`;
  });
  return pts.join(" ");
}

// Inline icons as SVG paths (relative to pillar centre)
function ExecIcon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx - 10}, ${cy - 10})`}>
      <circle cx="10" cy="10" r="8" stroke={G} strokeWidth="1.1" fill="none" strokeOpacity="0.7" />
      <line x1="10" y1="2" x2="10" y2="18" stroke={G} strokeWidth="0.9" strokeOpacity="0.7" />
      <line x1="2" y1="10" x2="18" y2="10" stroke={G} strokeWidth="0.9" strokeOpacity="0.7" />
      <circle cx="10" cy="10" r="2.5" fill={G} fillOpacity="0.8" />
    </g>
  );
}
function DataIcon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx - 10}, ${cy - 9})`}>
      {[0, 1, 2, 3].map((i) => {
        const h = [6, 10, 7, 13][i];
        return (
          <rect key={i} x={i * 5} y={18 - h} width="4" height={h}
            fill={G} fillOpacity="0.7" />
        );
      })}
    </g>
  );
}
function HorizonIcon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx - 10}, ${cy - 9})`}>
      <path d="M 0,14 Q 10,2 20,14" fill="none" stroke={G} strokeWidth="1.2" strokeOpacity="0.75" />
      <line x1="0" y1="18" x2="20" y2="18" stroke={G} strokeWidth="0.9" strokeOpacity="0.5" />
      <circle cx="10" cy="14" r="2.5" fill={G} fillOpacity="0.85" />
    </g>
  );
}
function LinkIcon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx - 10}, ${cy - 9})`}>
      <circle cx="5"  cy="9" r="5.5" stroke={G} strokeWidth="1.1" fill="none" strokeOpacity="0.7" />
      <circle cx="15" cy="9" r="5.5" stroke={G} strokeWidth="1.1" fill="none" strokeOpacity="0.7" />
    </g>
  );
}

const ICONS = [ExecIcon, DataIcon, HorizonIcon, LinkIcon];

export default function WhyZitheloHeroVector() {
  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-label="Four pillars of Zithelo illustration"
    >
      {/* Blueprint grid */}
      {[1, 2, 3, 4].map((i) => (
        <motion.line key={`hg${i}`}
          x1="0" y1={i * 80} x2="520" y2={i * 80}
          stroke="white" strokeOpacity="0.055" strokeWidth="0.7"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: i * 0.07 }}
        />
      ))}
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.line key={`vg${i}`}
          x1={i * 104} y1="0" x2={i * 104} y2="360"
          stroke="white" strokeOpacity="0.055" strokeWidth="0.7"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: i * 0.07 }}
        />
      ))}

      {/* Centre to pillar connection lines — drawn first */}
      {PILLARS.map((p, i) => (
        <motion.line key={`cl${i}`}
          x1="260" y1="178" x2={p.cx} y2={p.cy}
          stroke={G} strokeWidth="1.1" strokeOpacity="0.22" strokeDasharray="5 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: p.delay - 0.3, ease }}
        />
      ))}

      {/* Pillar hexagons */}
      {PILLARS.map((p, i) => {
        const Icon = ICONS[i];
        return (
          <motion.g key={p.label}>
            {/* Outer faint hex ring */}
            <motion.polygon
              points={hex(p.cx, p.cy, 44)}
              stroke={G} strokeWidth="0.8" strokeOpacity="0.14" fill="none"
              strokeDasharray="5 4"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
              transition={{ duration: 0.35, delay: p.delay - 0.1, ease }}
            />
            {/* Main hex */}
            <motion.polygon
              points={hex(p.cx, p.cy, 34)}
              fill={G} fillOpacity="0.09"
              stroke={G} strokeWidth="1.3" strokeOpacity="0.5"
              style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, delay: p.delay, ease }}
            />
            {/* Icon */}
            <motion.g
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: p.delay + 0.2 }}
            >
              <Icon cx={p.cx} cy={p.cy - 9} />
            </motion.g>
            {/* Label */}
            <motion.text
              x={p.cx} y={p.cy + 18}
              textAnchor="middle"
              fontSize="9.5" fontFamily="sans-serif" fontWeight="700"
              letterSpacing="1.3" fill={G} fillOpacity="0.68"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: p.delay + 0.28 }}
            >
              {p.label}
            </motion.text>
            <motion.text
              x={p.cx} y={p.cy + 27}
              textAnchor="middle"
              fontSize="8.5" fontFamily="sans-serif" fontWeight="600"
              letterSpacing="0.8" fill="white" fillOpacity="0.35"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: p.delay + 0.35 }}
            >
              {p.sub}
            </motion.text>
          </motion.g>
        );
      })}

      {/* Centre nexus */}
      {/* Pulse ring */}
      <motion.circle cx="260" cy="178"
        stroke={G} strokeWidth="1.2" fill="none"
        animate={{ r: [14, 38], opacity: [0.7, 0], strokeOpacity: [0.5, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, delay: 2.6, ease: "easeOut" }}
      />
      {/* Centre diamond (rotated square) */}
      <motion.polygon
        points="260,158 280,178 260,198 240,178"
        fill={G} fillOpacity="0.18"
        stroke={G} strokeWidth="1.6" strokeOpacity="0.65"
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 0 }}
        style={{ transformOrigin: "260px 178px" }}
        transition={{ duration: 0.45, delay: 2.4, ease }}
      />
      {/* Gold dot */}
      <motion.circle cx="260" cy="178" r="5" fill={G}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        style={{ transformOrigin: "260px 178px" }}
        transition={{ duration: 0.25, delay: 2.55, ease }}
      />

      {/* Connecting ring between the four pillars (dashed) */}
      <motion.circle cx="260" cy="178" r="115"
        stroke={G} strokeWidth="0.85" strokeOpacity="0.1" fill="none" strokeDasharray="6 5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 1.0, ease }}
      />

      {/* Corner brackets */}
      <motion.path d="M 474,10 L 510,10 L 510,46"
        stroke={G} strokeWidth="1.5" strokeOpacity="0.38" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      />
      <motion.path d="M 10,314 L 10,350 L 46,350"
        stroke={G} strokeWidth="1.5" strokeOpacity="0.38" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.85 }}
      />

      {/* "BUILT DIFFERENT" footer */}
      <motion.text x="58" y="351"
        fontSize="9" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="3.8" fill={G} fillOpacity="0.45"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        BUILT DIFFERENT
      </motion.text>
    </svg>
  );
}
