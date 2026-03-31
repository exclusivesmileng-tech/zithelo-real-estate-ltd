"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Bar chart — 5 years of growth
const BARS = [
  { x: 82,  h: 60,  year: "YR 1", delay: 1.0 },
  { x: 144, h: 90,  year: "YR 2", delay: 1.15 },
  { x: 206, h: 128, year: "YR 3", delay: 1.3 },
  { x: 268, h: 172, year: "YR 4", delay: 1.45 },
  { x: 330, h: 218, year: "YR 5", delay: 1.6 },
];

const BAR_W = 36;
const BASE_Y = 290;

// Trend line connecting bar tops
const trendPoints = BARS.map((b) => `${b.x + BAR_W / 2},${BASE_Y - b.h}`).join(" ");
const trendPath = BARS.map((b, i) =>
  `${i === 0 ? "M" : "L"} ${b.x + BAR_W / 2},${BASE_Y - b.h}`
).join(" ");

// Investor type labels (right side)
const TYPES = [
  { y: 95,  label: "DIASPORA",     sub: "INVESTOR",  delay: 1.8 },
  { y: 145, label: "INDIVIDUAL",   sub: "INVESTOR",  delay: 1.95 },
  { y: 195, label: "INSTITUTIONAL",sub: "FUND",      delay: 2.1 },
  { y: 245, label: "OFF-PLAN",     sub: "BUYER",     delay: 2.25 },
];

export default function BecomeAnInvestorHeroVector() {
  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-label="Investment growth chart illustration"
    >
      {/* Background grid */}
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

      {/* Chart baseline */}
      <motion.line
        x1="62" y1={BASE_Y} x2="390" y2={BASE_Y}
        stroke={G} strokeWidth="1" strokeOpacity="0.25"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      />

      {/* Y-axis */}
      <motion.line
        x1="62" y1="60" x2="62" y2={BASE_Y}
        stroke={G} strokeWidth="1" strokeOpacity="0.2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />

      {/* Horizontal guide lines */}
      {[0.33, 0.66, 1.0].map((f, i) => (
        <motion.line key={`guide${i}`}
          x1="62" y1={BASE_Y - f * 218} x2="390" y2={BASE_Y - f * 218}
          stroke="white" strokeWidth="0.6" strokeOpacity="0.08" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.9 + i * 0.06 }}
        />
      ))}

      {/* Bars */}
      {BARS.map((b) => (
        <motion.g key={b.year}>
          {/* Bar fill */}
          <motion.rect
            x={b.x} y={BASE_Y} width={BAR_W} height={0} rx="2"
            fill={G} fillOpacity="0.18"
            animate={{ y: BASE_Y - b.h, height: b.h }}
            transition={{ duration: 0.55, delay: b.delay, ease }}
          />
          {/* Bar border */}
          <motion.rect
            x={b.x} y={BASE_Y} width={BAR_W} height={0} rx="2"
            stroke={G} strokeWidth="1.2" strokeOpacity="0.55" fill="none"
            animate={{ y: BASE_Y - b.h, height: b.h }}
            transition={{ duration: 0.55, delay: b.delay, ease }}
          />
          {/* Bar top cap glow */}
          <motion.rect
            x={b.x} y={BASE_Y} width={BAR_W} height={3} rx="1"
            fill={G} fillOpacity="0.65"
            animate={{ y: BASE_Y - b.h }}
            transition={{ duration: 0.55, delay: b.delay, ease }}
          />
          {/* Year label */}
          <motion.text
            x={b.x + BAR_W / 2} y={BASE_Y + 16}
            textAnchor="middle"
            fontSize="8" fontFamily="sans-serif" fontWeight="700"
            letterSpacing="0.8" fill="white" fillOpacity="0.4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: b.delay + 0.4 }}
          >
            {b.year}
          </motion.text>
        </motion.g>
      ))}

      {/* Trend line */}
      <motion.path
        d={trendPath}
        stroke={G} strokeWidth="1.8" strokeOpacity="0.6" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.0, delay: 1.7, ease }}
      />

      {/* Trend line dots at each bar top */}
      {BARS.map((b) => (
        <motion.circle key={`dot${b.year}`}
          cx={b.x + BAR_W / 2} cy={BASE_Y - b.h} r="3.5"
          fill={G} fillOpacity="0.9"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          style={{ transformOrigin: `${b.x + BAR_W / 2}px ${BASE_Y - b.h}px` }}
          transition={{ duration: 0.18, delay: b.delay + 0.52, ease }}
        />
      ))}

      {/* ROI badge */}
      <motion.rect
        x="74" y="42" width="108" height="28" rx="4"
        fill={G} fillOpacity="0.12" stroke={G} strokeWidth="1" strokeOpacity="0.4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.7 }}
      />
      <motion.text x="128" y="61"
        textAnchor="middle"
        fontSize="11" fontFamily="sans-serif" fontWeight="900"
        letterSpacing="1.5" fill={G} fillOpacity="0.9"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
      >
        25-YR LEASE
      </motion.text>

      {/* Vertical divider — right panel */}
      <motion.line
        x1="415" y1="72" x2="415" y2="308"
        stroke={G} strokeWidth="0.8" strokeOpacity="0.18" strokeDasharray="4 4"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      />

      {/* Investor type nodes — right panel */}
      {TYPES.map((t) => (
        <motion.g key={t.label}>
          {/* Dot */}
          <motion.circle cx={427} cy={t.y} r="4" fill={G} fillOpacity="0.75"
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            style={{ transformOrigin: `427px ${t.y}px` }}
            transition={{ duration: 0.2, delay: t.delay, ease }}
          />
          {/* Pulse */}
          <motion.circle cx={427} cy={t.y} stroke={G} strokeWidth="0.8" fill="none"
            animate={{ r: [5, 14], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: t.delay + 0.4, ease: "easeOut" }}
          />
          {/* Connector line to right label */}
          <motion.line x1={433} y1={t.y} x2={445} y2={t.y}
            stroke={G} strokeWidth="0.8" strokeOpacity="0.3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.2, delay: t.delay + 0.15 }}
          />
          <motion.text x="448" y={t.y - 3}
            fontSize="8" fontFamily="sans-serif" fontWeight="800"
            letterSpacing="1" fill={G} fillOpacity="0.7"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: t.delay + 0.2 }}
          >
            {t.label}
          </motion.text>
          <motion.text x="448" y={t.y + 10}
            fontSize="7" fontFamily="sans-serif" fontWeight="600"
            letterSpacing="0.5" fill="white" fillOpacity="0.3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: t.delay + 0.28 }}
          >
            {t.sub}
          </motion.text>
        </motion.g>
      ))}

      {/* Corner brackets */}
      <motion.path d="M 474,10 L 510,10 L 510,46"
        stroke={G} strokeWidth="1.5" strokeOpacity="0.35" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      />
      <motion.path d="M 10,314 L 10,350 L 46,350"
        stroke={G} strokeWidth="1.5" strokeOpacity="0.35" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.75 }}
      />

      {/* Footer label */}
      <motion.text x="58" y="351"
        fontSize="8.5" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="3.5" fill={G} fillOpacity="0.42"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3.0 }}
      >
        INVESTMENT GROWTH MODEL
      </motion.text>
    </svg>
  );
}
