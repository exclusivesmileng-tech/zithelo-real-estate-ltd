"use client";

import { motion } from "framer-motion";

const G   = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Layout constants
const CEO_X  = 170, CEO_Y  = 22, CEO_W  = 180, CEO_H  = 54;
const CEO_CX = CEO_X + CEO_W / 2;   // 260
const CEO_BOT = CEO_Y + CEO_H;       // 76

const H_BAR_Y  = 118;                // y of horizontal connector bar
const NODE_Y   = 150;                // top of second-row nodes
const NODE_H   = 52;
const NODE_W   = 130;

const REPORTS = [
  { label: "HR & ADMIN",   sub: "Mr. I. Iwalewa",  cx: 85  },
  { label: "PROJECTS",     sub: "Bldr. F. Diya",   cx: 260 },
  { label: "CUSTOMER EXP", sub: "Mr. G. Akintayo", cx: 435 },
];

// small dot at a junction
function Dot({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  return (
    <motion.circle cx={cx} cy={cy} r="3"
      fill={G} fillOpacity="0.75"
      initial={{ scale: 0 }} animate={{ scale: 1 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      transition={{ duration: 0.18, delay, ease }}
    />
  );
}

export default function ManagementHeroVector() {
  return (
    <svg
      viewBox="0 0 520 272"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-label="Management hierarchy illustration"
    >
      {/* ── faint background grid ── */}
      {[1, 2, 3].map((i) => (
        <motion.line key={`hg${i}`}
          x1="0" y1={i * 90} x2="520" y2={i * 90}
          stroke="white" strokeOpacity="0.045" strokeWidth="0.7"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: i * 0.1 }}
        />
      ))}

      {/* ── corner brackets ── */}
      <motion.path d="M 474,10 L 510,10 L 510,46"
        stroke={G} strokeWidth="1.5" strokeOpacity="0.35" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.3, ease }}
      />
      <motion.path d="M 10,226 L 10,262 L 46,262"
        stroke={G} strokeWidth="1.5" strokeOpacity="0.35" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.45, ease }}
      />

      {/* ── CEO node — glow halo ── */}
      <motion.rect
        x={CEO_X - 5} y={CEO_Y - 5} width={CEO_W + 10} height={CEO_H + 10} rx="6"
        fill={G} fillOpacity="0.05"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />

      {/* ── CEO node — border ── */}
      <motion.rect
        x={CEO_X} y={CEO_Y} width={CEO_W} height={CEO_H} rx="3"
        fill={G} fillOpacity="0.1"
        stroke={G} strokeWidth="1.6" strokeOpacity="0.85"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.6, ease }}
      />

      {/* ── CEO label ── */}
      <motion.text
        x={CEO_CX} y={CEO_Y + 21} textAnchor="middle"
        fontSize="11" fontFamily="sans-serif" fontWeight="800"
        letterSpacing="2.5" fill={G} fillOpacity="0.92"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.95 }}
      >
        CHIEF EXECUTIVE
      </motion.text>
      <motion.text
        x={CEO_CX} y={CEO_Y + 38} textAnchor="middle"
        fontSize="8.5" fontFamily="sans-serif" fontWeight="400"
        letterSpacing="0.4" fill={G} fillOpacity="0.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.05 }}
      >
        Mrs. Ibitayo Akinbobola
      </motion.text>

      {/* ── trunk line: CEO → horizontal bar ── */}
      <motion.line
        x1={CEO_CX} y1={CEO_BOT} x2={CEO_CX} y2={H_BAR_Y}
        stroke={G} strokeWidth="1.4" strokeOpacity="0.55"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 1.25, ease }}
      />

      {/* ── horizontal connector bar ── */}
      <motion.line
        x1={REPORTS[0].cx} y1={H_BAR_Y} x2={REPORTS[2].cx} y2={H_BAR_Y}
        stroke={G} strokeWidth="1.3" strokeOpacity="0.45"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, delay: 1.5, ease }}
      />
      <Dot cx={CEO_CX} cy={H_BAR_Y} delay={1.5} />

      {/* ── report nodes ── */}
      {REPORTS.map((n, i) => (
        <motion.g key={n.label}>

          {/* branch drop line */}
          <motion.line
            x1={n.cx} y1={H_BAR_Y} x2={n.cx} y2={NODE_Y}
            stroke={G} strokeWidth="1.2" strokeOpacity="0.45"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.22, delay: 1.65 + i * 0.17, ease }}
          />
          <Dot cx={n.cx} cy={H_BAR_Y} delay={1.65 + i * 0.17} />

          {/* node rect */}
          <motion.rect
            x={n.cx - NODE_W / 2} y={NODE_Y} width={NODE_W} height={NODE_H} rx="3"
            fill={G} fillOpacity="0.065"
            stroke={G} strokeWidth="1.1" strokeOpacity={i === 0 ? 0.55 : 0.4}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.82 + i * 0.18, ease }}
          />

          {/* role label */}
          <motion.text
            x={n.cx} y={NODE_Y + 21} textAnchor="middle"
            fontSize="9.5" fontFamily="sans-serif" fontWeight="700"
            letterSpacing="1.8" fill={G} fillOpacity="0.82"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2.0 + i * 0.18 }}
          >
            {n.label}
          </motion.text>

          {/* person sub-label */}
          <motion.text
            x={n.cx} y={NODE_Y + 37} textAnchor="middle"
            fontSize="8" fontFamily="sans-serif" fontWeight="400"
            letterSpacing="0.3" fill={G} fillOpacity="0.42"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2.1 + i * 0.18 }}
          >
            {n.sub}
          </motion.text>

        </motion.g>
      ))}

      {/* ── "reports to" label on trunk ── */}
      <motion.text
        x={CEO_CX + 8} y={(CEO_BOT + H_BAR_Y) / 2 + 4}
        fontSize="7.5" fontFamily="sans-serif" fontWeight="600"
        letterSpacing="1.2" fill={G} fillOpacity="0.3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.9 }}
      >
        REPORTS TO
      </motion.text>

      {/* ── footer ── */}
      <motion.text
        x="58" y="266"
        fontSize="9" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="3.8" fill={G} fillOpacity="0.38"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
      >
        MANAGEMENT STRUCTURE
      </motion.text>
    </svg>
  );
}
