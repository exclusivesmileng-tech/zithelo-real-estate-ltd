"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Departments
const TRACKS = [
  { label: "CEO",      y: 72,  delay: 1.2 },
  { label: "HR",       y: 124, delay: 1.5 },
  { label: "PROJECTS", y: 176, delay: 1.8 },
  { label: "FINANCE",  y: 228, delay: 2.1 },
  { label: "CX",       y: 280, delay: 2.4 },
];

const TRACK_X0 = 118;
const TRACK_X1 = 478;

// Task blocks per track [x, width]
const BLOCKS: [number, number][][] = [
  [[130, 72], [215, 90], [320, 100]],
  [[130, 68], [218, 80], [318, 88]],
  [[130, 82], [228, 95], [342, 82]],
  [[130, 60], [204, 78], [300, 95]],
  [[130, 75], [220, 85], [330, 78]],
];

// Milestone diamond x positions per track
const MILESTONES: number[][] = [
  [270, 378, 460],
  [260, 358, 452],
  [272, 380, 470],
  [254, 348, 452],
  [265, 366, 458],
];

export default function ManagementHeroVector() {
  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-label="Execution delivery matrix illustration"
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

      {/* Vertical synergy line */}
      <motion.line x1={TRACK_X0 - 8} y1="56" x2={TRACK_X0 - 8} y2="296"
        stroke={G} strokeWidth="1.6" strokeOpacity="0.3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1.0, ease }}
      />

      {TRACKS.map((t, ti) => (
        <motion.g key={t.label}>
          {/* Track rail */}
          <motion.line x1={TRACK_X0} y1={t.y} x2={TRACK_X1} y2={t.y}
            stroke={G} strokeWidth="0.7" strokeOpacity="0.15"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: t.delay - 0.1, ease }}
          />

          {/* Department label */}
          <motion.text
            x={TRACK_X0 - 14} y={t.y + 4}
            textAnchor="end"
            fontSize="10" fontFamily="sans-serif" fontWeight="700"
            letterSpacing="0.5" fill={G} fillOpacity="0.65"
            initial={{ opacity: 0, x: TRACK_X0 - 5 }}
            animate={{ opacity: 1, x: TRACK_X0 - 14 }}
            transition={{ duration: 0.3, delay: t.delay, ease }}
          >
            {t.label}
          </motion.text>

          {/* Task blocks */}
          {BLOCKS[ti].map(([bx, bw], bi) => (
            <motion.rect key={`blk${bi}`}
              x={bx} y={t.y - 10} width={bw} height="20" rx="2"
              fill={G} fillOpacity={bi === 0 ? 0.22 : 0.1}
              stroke={G} strokeWidth="0.9" strokeOpacity={bi === 0 ? 0.5 : 0.3}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              style={{ transformOrigin: `${bx}px ${t.y}px` }}
              transition={{ duration: 0.35, delay: t.delay + 0.2 + bi * 0.15, ease }}
            />
          ))}

          {/* Milestone diamonds */}
          {MILESTONES[ti].map((mx, mi) => (
            <motion.path key={`ms${mi}`}
              d={`M${mx},${t.y - 7} L${mx + 6},${t.y} L${mx},${t.y + 7} L${mx - 6},${t.y} Z`}
              fill={mi === 2 ? G : "none"}
              fillOpacity="0.75"
              stroke={G} strokeWidth="1.1" strokeOpacity="0.6"
              style={{ transformOrigin: `${mx}px ${t.y}px` }}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: t.delay + 0.55 + mi * 0.1, ease }}
            />
          ))}
        </motion.g>
      ))}

      {/* Horizontal time axis */}
      <motion.line x1={TRACK_X0} y1="308" x2={TRACK_X1} y2="308"
        stroke={G} strokeOpacity="0.18" strokeWidth="0.8"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 2.9 }}
      />
      {/* Time tick labels */}
      {["Q1", "Q2", "Q3", "Q4"].map((q, i) => (
        <motion.g key={q}>
          <line
            x1={TRACK_X0 + 10 + i * 90} y1="305"
            x2={TRACK_X0 + 10 + i * 90} y2="312"
            stroke={G} strokeOpacity="0.3" strokeWidth="0.8"
          />
          <motion.text
            x={TRACK_X0 + 10 + i * 90}
            y="322"
            textAnchor="middle"
            fontSize="9.5" fontFamily="sans-serif" fontWeight="700"
            letterSpacing="1" fill={G} fillOpacity="0.45"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 3.0 + i * 0.08 }}
          >
            {q}
          </motion.text>
        </motion.g>
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

      {/* Footer */}
      <motion.text x="58" y="351"
        fontSize="9" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="3.8" fill={G} fillOpacity="0.45"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        EXECUTION MATRIX
      </motion.text>
    </svg>
  );
}
