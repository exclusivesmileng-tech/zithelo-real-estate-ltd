"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;
const CX = 230, CY = 175;
const R = 110; // council table radius

// 3 board nodes at 90°, 210°, 330° (top, bottom-left, bottom-right)
// Values are rounded to 4 decimal places to prevent SSR/client float mismatches
const NODES = [90, 210, 330].map((deg, i) => {
  const a = (deg - 90) * (Math.PI / 180);
  return {
    cx: Math.round((CX + R * Math.cos(a)) * 1e4) / 1e4,
    cy: Math.round((CY + R * Math.sin(a)) * 1e4) / 1e4,
    label: ["OVERSIGHT", "STRATEGY", "EXECUTION"][i],
    delay: 1.4 + i * 0.3,
  };
});

// Triangle path connecting 3 nodes
const triPath = `M ${NODES[0].cx},${NODES[0].cy} L ${NODES[1].cx},${NODES[1].cy} L ${NODES[2].cx},${NODES[2].cy} Z`;

export default function BoardHeroVector() {
  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-label="Board governance council illustration"
    >
      {/* Grid */}
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

      {/* Outer council ring */}
      <motion.circle cx={CX} cy={CY} r={R + 22}
        stroke={G} strokeWidth="0.8" strokeOpacity="0.12" fill="none" strokeDasharray="6 5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, delay: 0.7, ease }}
      />
      {/* Council table circle */}
      <motion.circle cx={CX} cy={CY} r={R}
        stroke={G} strokeWidth="1.2" strokeOpacity="0.22" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.0, delay: 0.85, ease }}
      />
      {/* Inner filled table */}
      <motion.circle cx={CX} cy={CY} r={R}
        fill={G} fillOpacity="0.03"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 1.0 }}
      />

      {/* Rotating slow compass circle */}
      <motion.circle cx={CX} cy={CY} r={R + 10}
        stroke={G} strokeWidth="0.75" strokeOpacity="0.1" fill="none"
        strokeDasharray="2 12"
        animate={{ rotate: 360 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      />

      {/* Governance triangle */}
      <motion.path d={triPath}
        fill={G} fillOpacity="0.07"
        stroke={G} strokeWidth="1.1" strokeOpacity="0.35"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2, ease }}
      />

      {/* Board member nodes */}
      {NODES.map((n) => (
        <motion.g key={n.label}>
          {/* Pulse */}
          <motion.circle cx={n.cx} cy={n.cy}
            stroke={G} strokeWidth="1.1" fill="none"
            animate={{ r: [9, 28], opacity: [0.7, 0], strokeOpacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, delay: n.delay + 0.5, ease: "easeOut" }}
          />
          {/* Background disc */}
          <motion.circle cx={n.cx} cy={n.cy}
            fill={G} fillOpacity="0.14"
            stroke={G} strokeWidth="1.4" strokeOpacity="0.65"
            initial={{ r: 0 }} animate={{ r: 16 }}
            transition={{ duration: 0.35, delay: n.delay, ease }}
          />
          {/* Inner dot */}
          <motion.circle cx={n.cx} cy={n.cy}
            fill={G}
            initial={{ r: 0 }} animate={{ r: 5 }}
            transition={{ duration: 0.2, delay: n.delay + 0.18, ease }}
          />
          {/* Label arc text via positioned text */}
          <motion.text
            x={n.cx + (n.cx < CX ? -25 : n.cx > CX + 10 ? 25 : 0)}
            y={n.cy + (n.cy < CY ? -24 : 30)}
            textAnchor="middle"
            fontSize="10" fontFamily="sans-serif" fontWeight="700"
            letterSpacing="1.6" fill={G} fillOpacity="0.65"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: n.delay + 0.3 }}
          >
            {n.label}
          </motion.text>
        </motion.g>
      ))}

      {/* Compass rose at centre */}
      {[0, 45, 90, 135].map((deg, i) => {
        const a = (deg * Math.PI) / 180;
        const len = i % 2 === 0 ? 22 : 14;
        return (
          <motion.line key={`cr${i}`}
            x1={CX + len * Math.cos(a)} y1={CY + len * Math.sin(a)}
            x2={CX - len * Math.cos(a)} y2={CY - len * Math.sin(a)}
            stroke={G} strokeWidth={i % 2 === 0 ? 1.2 : 0.8} strokeOpacity="0.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.25, delay: 2.1 + i * 0.05 }}
          />
        );
      })}
      {/* Centre dot */}
      <motion.circle cx={CX} cy={CY} r="5" fill={G}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{ duration: 0.25, delay: 2.1, ease }}
      />

      {/* Right-side governance labels */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
        <line x1="385" y1="118" x2="385" y2="238"
          stroke={G} strokeOpacity="0.2" strokeWidth="0.7" />
        <text x="395" y="123" fontSize="9" fontFamily="sans-serif"
          fontWeight="700" letterSpacing="1.5" fill={G} fillOpacity="0.5">INDEPENDENT</text>
        <text x="395" y="136" fontSize="9" fontFamily="sans-serif"
          fontWeight="700" letterSpacing="1.5" fill={G} fillOpacity="0.5">OVERSIGHT</text>
        <text x="395" y="162" fontSize="9" fontFamily="sans-serif"
          fontWeight="700" letterSpacing="1.5" fill={G} fillOpacity="0.5">STRATEGIC</text>
        <text x="395" y="175" fontSize="9" fontFamily="sans-serif"
          fontWeight="700" letterSpacing="1.5" fill={G} fillOpacity="0.5">DIRECTION</text>
        <text x="395" y="201" fontSize="9" fontFamily="sans-serif"
          fontWeight="700" letterSpacing="1.5" fill={G} fillOpacity="0.5">VALUE</text>
        <text x="395" y="214" fontSize="9" fontFamily="sans-serif"
          fontWeight="700" letterSpacing="1.5" fill={G} fillOpacity="0.5">CREATION</text>
      </motion.g>

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

      {/* Footer label */}
      <motion.text x="58" y="351"
        fontSize="9" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="3.8" fill={G} fillOpacity="0.45"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        GOVERNANCE COUNCIL
      </motion.text>
    </svg>
  );
}
