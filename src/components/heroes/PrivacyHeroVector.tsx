"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

const CX = 260;
const CY = 178;

// Data-node labels orbiting the shield
const NODES = [
  { angle: -90, label: "SECURE",    sub: "END-TO-END",   delay: 1.8 },
  { angle:   0, label: "ENCRYPTED", sub: "AES-256",       delay: 2.0 },
  { angle:  90, label: "COMPLIANT", sub: "NDPR / US LAW", delay: 2.2 },
  { angle: 180, label: "PRIVATE",   sub: "YOUR DATA",     delay: 2.4 },
];

const R = 110;

export default function PrivacyHeroVector() {
  const orbitNodes = NODES.map((n) => ({
    ...n,
    cx: CX + R * Math.cos((n.angle * Math.PI) / 180),
    cy: CY + R * Math.sin((n.angle * Math.PI) / 180),
  }));

  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-label="Privacy and data protection illustration"
    >
      {/* Blueprint grid */}
      {[1, 2, 3, 4].map((i) => (
        <motion.line key={`hg${i}`}
          x1="0" y1={i * 80} x2="520" y2={i * 80}
          stroke="white" strokeOpacity="0.05" strokeWidth="0.7"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: i * 0.07 }}
        />
      ))}
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.line key={`vg${i}`}
          x1={i * 104} y1="0" x2={i * 104} y2="360"
          stroke="white" strokeOpacity="0.05" strokeWidth="0.7"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: i * 0.07 }}
        />
      ))}

      {/* Dashed orbit ring */}
      <motion.circle cx={CX} cy={CY} r={R}
        stroke={G} strokeWidth="1" strokeOpacity="0.18" strokeDasharray="6 5" fill="none"
        initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />

      {/* Slow-rotating outer ring */}
      <motion.circle cx={CX} cy={CY} r={R + 20}
        stroke={G} strokeWidth="0.6" strokeOpacity="0.10" strokeDasharray="4 7" fill="none"
        animate={{ rotate: [0, 360] }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
      />

      {/* Glow halos */}
      <motion.circle cx={CX} cy={CY} r={52}
        fill={G} fillOpacity="0.05" stroke={G} strokeWidth="1.5" strokeOpacity="0.25"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />
      <motion.circle cx={CX} cy={CY} r={34}
        fill={G} fillOpacity="0.09" stroke={G} strokeWidth="1.5" strokeOpacity="0.4"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.55, delay: 1.0 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />

      {/* Central shield */}
      <motion.path
        d={`M${CX},${CY - 26} C${CX + 22},${CY - 26} ${CX + 22},${CY - 14} ${CX + 22},${CY}
           C${CX + 22},${CY + 14} ${CX + 12},${CY + 24} ${CX},${CY + 30}
           C${CX - 12},${CY + 24} ${CX - 22},${CY + 14} ${CX - 22},${CY}
           C${CX - 22},${CY - 14} ${CX - 22},${CY - 26} ${CX},${CY - 26} Z`}
        fill={G} fillOpacity="0.18" stroke={G} strokeWidth="2" strokeOpacity="0.7"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{ duration: 0.5, delay: 1.2, ease }}
      />
      {/* Shield pulse */}
      <motion.path
        d={`M${CX},${CY - 26} C${CX + 22},${CY - 26} ${CX + 22},${CY - 14} ${CX + 22},${CY}
           C${CX + 22},${CY + 14} ${CX + 12},${CY + 24} ${CX},${CY + 30}
           C${CX - 12},${CY + 24} ${CX - 22},${CY + 14} ${CX - 22},${CY}
           C${CX - 22},${CY - 14} ${CX - 22},${CY - 26} ${CX},${CY - 26} Z`}
        fill="none" stroke={G} strokeWidth="1.5" strokeOpacity="0.3"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 2.0, ease: "easeOut" }}
      />
      {/* Lock icon inside shield */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        {/* Lock body */}
        <rect x={CX - 9} y={CY - 3} width="18" height="14" rx="2.5"
          stroke={G} strokeWidth="1.5" fill="none" strokeOpacity="0.85" />
        {/* Lock shackle */}
        <path d={`M${CX - 6},${CY - 3} L${CX - 6},${CY - 9} Q${CX - 6},${CY - 14} ${CX},${CY - 14} Q${CX + 6},${CY - 14} ${CX + 6},${CY - 9} L${CX + 6},${CY - 3}`}
          stroke={G} strokeWidth="1.5" fill="none" strokeOpacity="0.85" />
        {/* Keyhole */}
        <circle cx={CX} cy={CY + 4} r="2.5" fill={G} fillOpacity="0.8" />
      </motion.g>

      {/* Spokes to orbit nodes */}
      {orbitNodes.map((n, i) => (
        <motion.line key={`spoke-${i}`}
          x1={CX} y1={CY} x2={n.cx} y2={n.cy}
          stroke={G} strokeWidth="1" strokeOpacity="0.18" strokeDasharray="5 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: n.delay - 0.3 }}
        />
      ))}

      {/* Orbit node discs + labels */}
      {orbitNodes.map((n) => (
        <motion.g key={n.label}>
          {/* Pulse ring */}
          <motion.circle cx={n.cx} cy={n.cy}
            stroke={G} strokeWidth="1" fill="none"
            animate={{ r: [6, 22], opacity: [0.6, 0], strokeOpacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, delay: n.delay + 0.4, ease: "easeOut" }}
          />
          {/* Disc */}
          <motion.circle cx={n.cx} cy={n.cy}
            fill={G} fillOpacity="0.13" stroke={G} strokeWidth="1.3" strokeOpacity="0.55"
            initial={{ r: 0 }} animate={{ r: 16 }}
            transition={{ duration: 0.3, delay: n.delay, ease }}
          />
          <motion.circle cx={n.cx} cy={n.cy} r="4.5" fill={G}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
            transition={{ duration: 0.2, delay: n.delay + 0.15, ease }}
          />
          {/* Label — position away from centre */}
          <motion.text
            x={n.cx + (n.angle === 180 ? -25 : n.angle === 0 ? 25 : 0)}
            y={n.cy + (n.angle === -90 ? -24 : n.angle === 90 ? 30 : -6)}
            textAnchor={n.angle === 180 ? "end" : n.angle === 0 ? "start" : "middle"}
            fontSize="9.5" fontFamily="sans-serif" fontWeight="800"
            letterSpacing="1.4" fill={G} fillOpacity="0.75"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: n.delay + 0.25 }}
          >
            {n.label}
          </motion.text>
          <motion.text
            x={n.cx + (n.angle === 180 ? -25 : n.angle === 0 ? 25 : 0)}
            y={n.cy + (n.angle === -90 ? -13 : n.angle === 90 ? 42 : 6)}
            textAnchor={n.angle === 180 ? "end" : n.angle === 0 ? "start" : "middle"}
            fontSize="7.5" fontFamily="sans-serif" fontWeight="600"
            letterSpacing="0.8" fill="white" fillOpacity="0.35"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: n.delay + 0.32 }}
          >
            {n.sub}
          </motion.text>
        </motion.g>
      ))}

      {/* Travelling dot on orbit ring */}
      <motion.circle r="3" fill={G}
        animate={{
          cx: [CX + R, CX, CX - R, CX, CX + R],
          cy: [CY,     CY + R, CY, CY - R, CY],
        }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear", delay: 2.6 }}
      />

      {/* Floating data-point dots */}
      {[
        [60, 50], [78, 96], [46, 130], [88, 28],
        [100, 162], [70, 200],
      ].map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="1.5"
          fill={G} fillOpacity="0.4"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 + (i % 3) * 0.6, delay: i * 0.2 }}
        />
      ))}

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
        fontSize="8.5" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="3.5" fill={G} fillOpacity="0.45"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3.0 }}
      >
        YOUR DATA. PROTECTED.
      </motion.text>
    </svg>
  );
}
