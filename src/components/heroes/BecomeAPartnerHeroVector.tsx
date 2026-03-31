"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

const CX = 230, CY = 182;

const NODES = [
  { cx: 90,  cy: 95,  label: "JOINT",    sub: "VENTURE",    delay: 1.1 },
  { cx: 370, cy: 95,  label: "LAND",     sub: "OWNER",      delay: 1.3 },
  { cx: 90,  cy: 268, label: "CONTRACTOR",sub: "SUPPLIER",  delay: 1.5 },
  { cx: 370, cy: 268, label: "OTHER",    sub: "PARTNERSHIP",delay: 1.7 },
];

export default function BecomeAPartnerHeroVector() {
  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-label="Partnership types illustration"
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

      {/* Dashed spoke lines from each node to centre */}
      {NODES.map((n, i) => (
        <motion.line key={`spoke${i}`}
          x1={n.cx} y1={n.cy} x2={CX} y2={CY}
          stroke={G} strokeWidth="0.9" strokeOpacity="0.22" strokeDasharray="5 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: n.delay + 0.25, ease }}
        />
      ))}

      {/* Outer connecting ring (dashed rectangle) */}
      <motion.rect
        x="68" y="73" width="304" height="218" rx="6"
        stroke={G} strokeWidth="0.8" strokeOpacity="0.14" strokeDasharray="6 5" fill="none"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease }}
      />

      {/* Partner type nodes */}
      {NODES.map((n) => (
        <motion.g key={n.label}>
          {/* Pulse ring */}
          <motion.circle cx={n.cx} cy={n.cy} stroke={G} strokeWidth="1" fill="none"
            animate={{ r: [8, 24], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, delay: n.delay + 0.6, ease: "easeOut" }}
          />
          {/* Filled node */}
          <motion.circle cx={n.cx} cy={n.cy}
            fill={G} fillOpacity="0.12" stroke={G} strokeWidth="1.4" strokeOpacity="0.55"
            initial={{ r: 0 }} animate={{ r: 14 }}
            transition={{ duration: 0.28, delay: n.delay, ease }}
          />
          <motion.circle cx={n.cx} cy={n.cy} r="5" fill={G}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
            transition={{ duration: 0.18, delay: n.delay + 0.14, ease }}
          />
          {/* Labels */}
          <motion.text
            x={n.cx} y={n.cy + 27}
            textAnchor="middle"
            fontSize="8.5" fontFamily="sans-serif" fontWeight="800"
            letterSpacing="1.2" fill={G} fillOpacity="0.72"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: n.delay + 0.3 }}
          >
            {n.label}
          </motion.text>
          <motion.text
            x={n.cx} y={n.cy + 38}
            textAnchor="middle"
            fontSize="7" fontFamily="sans-serif" fontWeight="600"
            letterSpacing="0.6" fill="white" fillOpacity="0.32"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: n.delay + 0.38 }}
          >
            {n.sub}
          </motion.text>
        </motion.g>
      ))}

      {/* Centre hub — outer pulse */}
      <motion.circle cx={CX} cy={CY} stroke={G} strokeWidth="1.2" fill="none"
        animate={{ r: [20, 56], opacity: [0.55, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, delay: 2.3, ease: "easeOut" }}
      />
      {/* Centre hub — mid ring */}
      <motion.circle cx={CX} cy={CY}
        fill={G} fillOpacity="0.08" stroke={G} strokeWidth="1.2" strokeOpacity="0.30"
        initial={{ r: 0 }} animate={{ r: 36 }}
        transition={{ duration: 0.45, delay: 2.1, ease }}
      />
      {/* Centre hub — inner filled */}
      <motion.circle cx={CX} cy={CY}
        fill={G} fillOpacity="0.18" stroke={G} strokeWidth="1.8" strokeOpacity="0.7"
        initial={{ r: 0 }} animate={{ r: 24 }}
        transition={{ duration: 0.35, delay: 2.2, ease }}
      />
      {/* "Z" monogram */}
      <motion.text x={CX} y={CY + 7}
        textAnchor="middle"
        fontSize="20" fontFamily="sans-serif" fontWeight="900"
        fill={G} fillOpacity="0.88"
        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{ duration: 0.3, delay: 2.35, ease }}
      >
        Z
      </motion.text>

      {/* "ZITHELO" label below centre node */}
      <motion.text x={CX} y={CY + 50}
        textAnchor="middle"
        fontSize="7.5" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="3" fill={G} fillOpacity="0.45"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
      >
        ZITHELO HUB
      </motion.text>

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
        PARTNERSHIP PATHWAYS
      </motion.text>
    </svg>
  );
}
