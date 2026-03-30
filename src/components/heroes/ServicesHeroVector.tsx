"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// 4 service pillars — stacked horizontal bands
const PILLARS = [
  { label: "DEVELOPMENT",     sub: "REAL ESTATE",     y: 68,  w: 260, x: 60, delay: 1.0 },
  { label: "CONSTRUCTION",    sub: "BUILD + DELIVER",  y: 132, w: 218, x: 82, delay: 1.3 },
  { label: "PROJ MANAGEMENT", sub: "END-TO-END",       y: 196, w: 238, x: 72, delay: 1.6 },
  { label: "INVESTMENT",      sub: "PARTNERSHIPS",     y: 260, w: 198, x: 92, delay: 1.9 },
];

const BAR_H = 48;

// Connector dots between pillars (right edge midpoints)
const CONNECTOR_X = 330;

export default function ServicesHeroVector() {
  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-label="End-to-end services capability illustration"
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

      {/* Vertical spine */}
      <motion.line x1="52" y1="56" x2="52" y2="296"
        stroke={G} strokeWidth="2" strokeOpacity="0.28"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.7, ease }}
      />

      {/* Service pillar bars */}
      {PILLARS.map((p) => (
        <motion.g key={p.label}>
          {/* Bar fill */}
          <motion.rect
            x={p.x} y={p.y} width={p.w} height={BAR_H} rx="2"
            fill={G} fillOpacity="0.09"
            stroke={G} strokeWidth="1.1" strokeOpacity="0.42"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            style={{ transformOrigin: `${p.x}px ${p.y + BAR_H / 2}px` }}
            transition={{ duration: 0.45, delay: p.delay, ease }}
          />
          {/* Gold left accent bar */}
          <motion.rect
            x={p.x} y={p.y} width={3} height={BAR_H} rx="1"
            fill={G} fillOpacity="0.85"
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            style={{ transformOrigin: `${p.x + 1.5}px ${p.y + BAR_H / 2}px` }}
            transition={{ duration: 0.3, delay: p.delay + 0.1, ease }}
          />
          {/* Sub label */}
          <motion.text
            x={p.x + 16} y={p.y + 19}
            fontSize="8" fontFamily="sans-serif" fontWeight="600"
            letterSpacing="1.8" fill={G} fillOpacity="0.55"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: p.delay + 0.22 }}
          >
            {p.sub}
          </motion.text>
          {/* Main label */}
          <motion.text
            x={p.x + 16} y={p.y + 34}
            fontSize="13" fontFamily="sans-serif" fontWeight="800"
            letterSpacing="1.5" fill="white" fillOpacity="0.78"
            initial={{ opacity: 0, x: p.x + 8 }} animate={{ opacity: 1, x: p.x + 16 }}
            transition={{ duration: 0.3, delay: p.delay + 0.18, ease }}
          >
            {p.label}
          </motion.text>
          {/* Spine tick */}
          <motion.line
            x1="48" y1={p.y + BAR_H / 2} x2={p.x} y2={p.y + BAR_H / 2}
            stroke={G} strokeWidth="1" strokeOpacity="0.3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.2, delay: p.delay + 0.05 }}
          />
        </motion.g>
      ))}

      {/* Connector line right side */}
      <motion.line x1={CONNECTOR_X} y1="80" x2={CONNECTOR_X} y2="284"
        stroke={G} strokeWidth="0.9" strokeOpacity="0.2" strokeDasharray="4 4"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 2.2, ease }}
      />
      {PILLARS.map((p) => (
        <motion.circle key={`cd${p.label}`}
          cx={CONNECTOR_X} cy={p.y + BAR_H / 2} r="4"
          fill={G} fillOpacity="0.7"
          stroke={G} strokeWidth="1" strokeOpacity="0.4"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          style={{ transformOrigin: `${CONNECTOR_X}px ${p.y + BAR_H / 2}px` }}
          transition={{ duration: 0.22, delay: p.delay + 0.35, ease }}
        />
      ))}

      {/* Right panel — capability stats */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
        {[
          { v: "20+", l: "YEARS EXPERTISE" },
          { v: "4",   l: "SERVICE LINES"   },
          { v: "∞",   l: "COMMITMENT"       },
        ].map((s, i) => (
          <g key={s.l}>
            <text x="390" y={100 + i * 68}
              fontSize="26" fontFamily="sans-serif" fontWeight="800"
              fill={G} fillOpacity="0.55" textAnchor="middle">{s.v}</text>
            <text x="390" y={120 + i * 68}
              fontSize="8" fontFamily="sans-serif" fontWeight="700"
              letterSpacing="1.8" fill="white" fillOpacity="0.35" textAnchor="middle">{s.l}</text>
          </g>
        ))}
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
        transition={{ delay: 3.0 }}
      >
        END-TO-END CAPABILITY
      </motion.text>
    </svg>
  );
}
