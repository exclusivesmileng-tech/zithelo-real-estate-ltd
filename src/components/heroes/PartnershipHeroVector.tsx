"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;
const CX = 220, CY = 178;

// Partner type nodes — left arc (realtors / property owners)
const PARTNER_NODES = [
  { cx: 88,  cy: 118, label: "REALTOR",  sub: "NETWORK",    delay: 1.3 },
  { cx: 68,  cy: 198, label: "PROPERTY", sub: "OWNER",      delay: 1.6 },
  { cx: 105, cy: 268, label: "DEVELOPER",sub: "PARTNER",    delay: 1.9 },
];

// Investor nodes — right arc
const INVESTOR_NODES = [
  { cx: 370, cy: 108, label: "EQUITY",  sub: "INVESTOR",   delay: 1.4 },
  { cx: 388, cy: 190, label: "DIASPORA",sub: "CAPITAL",    delay: 1.7 },
  { cx: 365, cy: 268, label: "INSTIT.",  sub: "FUND",       delay: 2.0 },
];

export default function PartnershipHeroVector() {
  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-label="Partnership and investment pathways illustration"
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

      {/* Left arc spine — partners */}
      <motion.path d="M 88,118 Q 50,178 105,268"
        fill="none" stroke={G} strokeWidth="1.2" strokeOpacity="0.22" strokeDasharray="5 4"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1.1, ease }}
      />
      {/* Right arc spine — investors */}
      <motion.path d="M 370,108 Q 420,190 365,268"
        fill="none" stroke={G} strokeWidth="1.2" strokeOpacity="0.22" strokeDasharray="5 4"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1.1, ease }}
      />

      {/* Converging arcs from each node → centre */}
      {[...PARTNER_NODES, ...INVESTOR_NODES].map((n, i) => (
        <motion.path key={`ca${i}`}
          d={`M ${n.cx},${n.cy} Q ${(n.cx + CX) / 2},${(n.cy + CY) / 2 - 20} ${CX},${CY}`}
          fill="none" stroke={G} strokeWidth="0.9" strokeOpacity="0.18" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: n.delay + 0.2, ease }}
        />
      ))}

      {/* Partner track label */}
      <motion.text x="30" y="46"
        fontSize="9" fontFamily="sans-serif" fontWeight="800"
        letterSpacing="2" fill={G} fillOpacity="0.55"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        PARTNERS
      </motion.text>
      <motion.line x1="30" y1="50" x2="110" y2="50"
        stroke={G} strokeWidth="1" strokeOpacity="0.3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 1.0 }}
      />

      {/* Investor track label */}
      <motion.text x="340" y="46"
        fontSize="9" fontFamily="sans-serif" fontWeight="800"
        letterSpacing="2" fill={G} fillOpacity="0.55"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        INVESTORS
      </motion.text>
      <motion.line x1="340" y1="50" x2="430" y2="50"
        stroke={G} strokeWidth="1" strokeOpacity="0.3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 1.0 }}
      />

      {/* Partner nodes */}
      {PARTNER_NODES.map((n) => (
        <motion.g key={n.label}>
          <motion.circle cx={n.cx} cy={n.cy} stroke={G} strokeWidth="1" fill="none"
            animate={{ r: [6, 20], opacity: [0.6, 0] }}
            transition={{ repeat: Infinity, duration: 2.6, delay: n.delay + 0.5, ease: "easeOut" }}
          />
          <motion.circle cx={n.cx} cy={n.cy}
            fill={G} fillOpacity="0.12" stroke={G} strokeWidth="1.3" strokeOpacity="0.55"
            initial={{ r: 0 }} animate={{ r: 13 }}
            transition={{ duration: 0.28, delay: n.delay, ease }}
          />
          <motion.circle cx={n.cx} cy={n.cy} r="4" fill={G}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
            transition={{ duration: 0.18, delay: n.delay + 0.15, ease }}
          />
          <motion.text x={n.cx - 18} y={n.cy + 24}
            textAnchor="middle"
            fontSize="9" fontFamily="sans-serif" fontWeight="800"
            letterSpacing="1" fill={G} fillOpacity="0.68"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: n.delay + 0.28 }}
          >
            {n.label}
          </motion.text>
          <motion.text x={n.cx - 18} y={n.cy + 36}
            textAnchor="middle"
            fontSize="7.5" fontFamily="sans-serif" fontWeight="600"
            letterSpacing="0.8" fill="white" fillOpacity="0.35"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: n.delay + 0.35 }}
          >
            {n.sub}
          </motion.text>
        </motion.g>
      ))}

      {/* Investor nodes */}
      {INVESTOR_NODES.map((n) => (
        <motion.g key={n.label}>
          <motion.circle cx={n.cx} cy={n.cy} stroke={G} strokeWidth="1" fill="none"
            animate={{ r: [6, 20], opacity: [0.6, 0] }}
            transition={{ repeat: Infinity, duration: 2.6, delay: n.delay + 0.5, ease: "easeOut" }}
          />
          <motion.circle cx={n.cx} cy={n.cy}
            fill={G} fillOpacity="0.12" stroke={G} strokeWidth="1.3" strokeOpacity="0.55"
            initial={{ r: 0 }} animate={{ r: 13 }}
            transition={{ duration: 0.28, delay: n.delay, ease }}
          />
          <motion.circle cx={n.cx} cy={n.cy} r="4" fill={G}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
            transition={{ duration: 0.18, delay: n.delay + 0.15, ease }}
          />
          <motion.text x={n.cx + 18} y={n.cy + 24}
            textAnchor="middle"
            fontSize="9" fontFamily="sans-serif" fontWeight="800"
            letterSpacing="1" fill={G} fillOpacity="0.68"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: n.delay + 0.28 }}
          >
            {n.label}
          </motion.text>
          <motion.text x={n.cx + 18} y={n.cy + 36}
            textAnchor="middle"
            fontSize="7.5" fontFamily="sans-serif" fontWeight="600"
            letterSpacing="0.8" fill="white" fillOpacity="0.35"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: n.delay + 0.35 }}
          >
            {n.sub}
          </motion.text>
        </motion.g>
      ))}

      {/* Centre deal node */}
      <motion.circle cx={CX} cy={CY} stroke={G} strokeWidth="1.2" fill="none"
        animate={{ r: [16, 50], opacity: [0.6, 0], strokeOpacity: [0.45, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, delay: 2.6, ease: "easeOut" }}
      />
      <motion.circle cx={CX} cy={CY}
        fill={G} fillOpacity="0.16" stroke={G} strokeWidth="1.6" strokeOpacity="0.65"
        initial={{ r: 0 }} animate={{ r: 28 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{ duration: 0.4, delay: 2.4, ease }}
      />
      {/* "Z" monogram */}
      <motion.text x={CX} y={CY + 6}
        textAnchor="middle"
        fontSize="20" fontFamily="sans-serif" fontWeight="900"
        fill={G} fillOpacity="0.85"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{ duration: 0.3, delay: 2.55, ease }}
      >
        Z
      </motion.text>

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
        PARTNERSHIP NETWORK
      </motion.text>
    </svg>
  );
}
