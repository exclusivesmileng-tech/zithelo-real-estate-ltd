"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;
const CX = 230, CY = 178;

// Build ring nodes
function ring(n: number, r: number, offsetDeg = 0) {
  return Array.from({ length: n }, (_, i) => {
    const a = (Math.PI / 180) * (360 / n * i + offsetDeg - 90);
    return { cx: CX + r * Math.cos(a), cy: CY + r * Math.sin(a) };
  });
}

const BOARD = ring(3, 82, 0);   // 3 board members
const MGMT  = ring(6, 148, 30); // 6 management members

export default function LeadershipHeroVector() {
  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-label="Leadership constellation hierarchy illustration"
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

      {/* Outer dashed orbit rings */}
      <motion.circle cx={CX} cy={CY} r="82"
        stroke={G} strokeWidth="0.8" strokeOpacity="0.14" fill="none" strokeDasharray="5 5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: 0.8, ease }}
      />
      <motion.circle cx={CX} cy={CY} r="148"
        stroke={G} strokeWidth="0.8" strokeOpacity="0.1" fill="none" strokeDasharray="5 5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, delay: 1.0, ease }}
      />

      {/* Spokes from centre → board */}
      {BOARD.map((n, i) => (
        <motion.line key={`bs${i}`}
          x1={CX} y1={CY} x2={n.cx} y2={n.cy}
          stroke={G} strokeWidth="1" strokeOpacity="0.22" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 1.4 + i * 0.12, ease }}
        />
      ))}

      {/* Spokes from board → mgmt */}
      {MGMT.map((m, i) => {
        const b = BOARD[i % 3];
        return (
          <motion.line key={`ms${i}`}
            x1={b.cx} y1={b.cy} x2={m.cx} y2={m.cy}
            stroke={G} strokeWidth="0.75" strokeOpacity="0.16" strokeDasharray="3 4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 1.9 + i * 0.1, ease }}
          />
        );
      })}

      {/* Board nodes */}
      {BOARD.map((n, i) => (
        <motion.g key={`bn${i}`}>
          {/* Pulse ring */}
          <motion.circle cx={n.cx} cy={n.cy}
            stroke={G} strokeWidth="1" fill="none"
            animate={{ r: [7, 22], opacity: [0.7, 0], strokeOpacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 1.8 + i * 0.4, ease: "easeOut" }}
          />
          {/* Node */}
          <motion.circle cx={n.cx} cy={n.cy}
            fill={G} fillOpacity="0.85"
            initial={{ r: 0 }} animate={{ r: 6.5 }}
            transition={{ duration: 0.3, delay: 1.6 + i * 0.14, ease }}
          />
        </motion.g>
      ))}

      {/* Management nodes */}
      {MGMT.map((m, i) => (
        <motion.g key={`mn${i}`}>
          <motion.circle cx={m.cx} cy={m.cy}
            stroke={G} strokeWidth="1" fill="none"
            animate={{ r: [4, 14], opacity: [0.6, 0], strokeOpacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 2.2 + i * 0.3, ease: "easeOut" }}
          />
          <motion.circle cx={m.cx} cy={m.cy}
            fill="white" fillOpacity="0.55"
            initial={{ r: 0 }} animate={{ r: 4 }}
            transition={{ duration: 0.25, delay: 2.0 + i * 0.1, ease }}
          />
        </motion.g>
      ))}

      {/* Centre hub */}
      <motion.circle cx={CX} cy={CY}
        stroke={G} strokeWidth="1.2" fill="none"
        animate={{ r: [12, 38], opacity: [0.6, 0], strokeOpacity: [0.45, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, delay: 2.8, ease: "easeOut" }}
      />
      <motion.circle cx={CX} cy={CY}
        fill={G}
        initial={{ r: 0 }} animate={{ r: 10 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{ duration: 0.35, delay: 1.2, ease }}
      />
      {/* Star shape at centre */}
      {[0, 45, 90, 135].map((a) => (
        <motion.line key={`star${a}`}
          x1={CX + 13 * Math.cos((a * Math.PI) / 180)}
          y1={CY + 13 * Math.sin((a * Math.PI) / 180)}
          x2={CX - 13 * Math.cos((a * Math.PI) / 180)}
          y2={CY - 13 * Math.sin((a * Math.PI) / 180)}
          stroke={G} strokeWidth="1.2" strokeOpacity="0.45"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 1.25 }}
        />
      ))}

      {/* Labels right-side panel */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
        {/* Board label */}
        <circle cx="390" cy="140" r="4" fill={G} fillOpacity="0.8" />
        <text x="400" y="144" fontSize="10" fontFamily="sans-serif" fontWeight="700"
          letterSpacing="1.2" fill={G} fillOpacity="0.65">BOARD</text>
        {/* Mgmt label */}
        <circle cx="390" cy="164" r="3" fill="white" fillOpacity="0.55" />
        <text x="400" y="168" fontSize="10" fontFamily="sans-serif" fontWeight="700"
          letterSpacing="1.2" fill="white" fillOpacity="0.4">MANAGEMENT</text>
        {/* Chairman label */}
        <circle cx="390" cy="188" r="5.5" fill={G} />
        <text x="400" y="192" fontSize="10" fontFamily="sans-serif" fontWeight="700"
          letterSpacing="1.2" fill={G} fillOpacity="0.65">CHAIRMAN</text>
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
        LEADERSHIP CONSTELLATION
      </motion.text>
    </svg>
  );
}
