"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;
const TX = 220, TY = 178; // transmission origin

// Outbound connection nodes
const NODES = [
  { cx: 390, cy:  88, label: "LAGOS",   sub: "HEAD OFFICE",   delay: 2.0 },
  { cx: 405, cy: 178, label: "EMAIL",   sub: "info@zithelorealestate.com",  delay: 2.2 },
  { cx: 388, cy: 268, label: "PHONE",   sub: "DIRECT LINE",   delay: 2.4 },
];

export default function ContactHeroVector() {
  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-label="Contact transmission illustration"
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

      {/* Broadcast rings — grow outward repeatedly */}
      {[0, 1, 2, 3].map((ri) => (
        <motion.circle key={`ring${ri}`}
          cx={TX} cy={TY}
          stroke={G} strokeWidth="1" fill="none"
          animate={{ r: [8, 130], opacity: [0.65, 0], strokeOpacity: [0.45, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3.2,
            delay: ri * 0.8,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Transmission point */}
      <motion.circle cx={TX} cy={TY}
        fill={G} fillOpacity="0.15"
        stroke={G} strokeWidth="1.5" strokeOpacity="0.55"
        initial={{ r: 0 }} animate={{ r: 22 }}
        style={{ transformOrigin: `${TX}px ${TY}px` }}
        transition={{ duration: 0.4, delay: 1.0, ease }}
      />
      {/* Envelope icon at centre */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        {/* Envelope body */}
        <rect x={TX - 14} y={TY - 10} width="28" height="20" rx="2"
          stroke={G} strokeWidth="1.3" fill="none" strokeOpacity="0.8" />
        {/* Envelope flap V */}
        <path d={`M ${TX - 14},${TY - 10} L ${TX},${TY + 2} L ${TX + 14},${TY - 10}`}
          stroke={G} strokeWidth="1.3" fill="none" strokeOpacity="0.8" />
      </motion.g>
      {/* Inner dot */}
      <motion.circle cx={TX} cy={TY} r="3.5" fill={G}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        style={{ transformOrigin: `${TX}px ${TY}px` }}
        transition={{ duration: 0.2, delay: 1.35, ease }}
      />

      {/* Signal arcs to destination nodes */}
      {NODES.map((n, i) => (
        <motion.path key={`arc${i}`}
          d={`M ${TX},${TY} Q ${(TX + n.cx) / 2 + 20},${(TY + n.cy) / 2 - 35} ${n.cx},${n.cy}`}
          fill="none" stroke={G} strokeWidth="1.1" strokeOpacity="0.25" strokeDasharray="5 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: n.delay - 0.2, ease }}
        />
      ))}

      {/* Destination nodes */}
      {NODES.map((n) => (
        <motion.g key={n.label}>
          {/* Pulse */}
          <motion.circle cx={n.cx} cy={n.cy}
            stroke={G} strokeWidth="1" fill="none"
            animate={{ r: [6, 20], opacity: [0.7, 0], strokeOpacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: n.delay + 0.4, ease: "easeOut" }}
          />
          {/* Node disc */}
          <motion.circle cx={n.cx} cy={n.cy}
            fill={G} fillOpacity="0.14"
            stroke={G} strokeWidth="1.3" strokeOpacity="0.6"
            initial={{ r: 0 }} animate={{ r: 14 }}
            transition={{ duration: 0.3, delay: n.delay, ease }}
          />
          <motion.circle cx={n.cx} cy={n.cy} r="4" fill={G}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
            transition={{ duration: 0.18, delay: n.delay + 0.15, ease }}
          />
          {/* Label */}
          <motion.text
            x={n.cx + 22} y={n.cy - 4}
            fontSize="10" fontFamily="sans-serif" fontWeight="800"
            letterSpacing="1.4" fill={G} fillOpacity="0.7"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: n.delay + 0.25 }}
          >
            {n.label}
          </motion.text>
          <motion.text
            x={n.cx + 22} y={n.cy + 10}
            fontSize="8" fontFamily="sans-serif" fontWeight="600"
            letterSpacing="0.8" fill="white" fillOpacity="0.38"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: n.delay + 0.32 }}
          >
            {n.sub}
          </motion.text>
        </motion.g>
      ))}

      {/* Left-side coordinates */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
        <text x="38" y="144" fontSize="8" fontFamily="sans-serif" fontWeight="700"
          letterSpacing="0.8" fill={G} fillOpacity="0.4" textAnchor="middle">6.4541°N</text>
        <text x="38" y="157" fontSize="8" fontFamily="sans-serif" fontWeight="700"
          letterSpacing="0.8" fill={G} fillOpacity="0.4" textAnchor="middle">3.3947°E</text>
        <text x="38" y="170" fontSize="7.5" fontFamily="sans-serif" fontWeight="600"
          letterSpacing="0.5" fill="white" fillOpacity="0.28" textAnchor="middle">LAGOS NG</text>
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

      {/* Footer */}
      <motion.text x="58" y="351"
        fontSize="8.5" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="3.5" fill={G} fillOpacity="0.45"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        LET&apos;S BUILD TOGETHER
      </motion.text>
    </svg>
  );
}
