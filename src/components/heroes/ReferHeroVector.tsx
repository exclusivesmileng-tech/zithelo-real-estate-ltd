"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Three people nodes in a referral chain: referrer → referee → investor
const NODES = [
  { cx: 120, cy: 178, label: "YOU",      sub: "REFERRER",  delay: 0.9 },
  { cx: 270, cy: 100, label: "CONTACT",  sub: "REFEREE",   delay: 1.5 },
  { cx: 270, cy: 256, label: "INVESTOR", sub: "NEW JOIN",  delay: 1.7 },
  { cx: 420, cy: 178, label: "REWARD",   sub: "COMMISSION",delay: 2.2 },
];

// Person icon path centred at 0,0
function PersonIcon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy - 7} r="5.5" stroke={G} strokeWidth="1.4" fill="none" strokeOpacity="0.85" />
      <path d={`M${cx - 9},${cy + 10} Q${cx - 9},${cy + 2} ${cx},${cy + 2} Q${cx + 9},${cy + 2} ${cx + 9},${cy + 10}`}
        stroke={G} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeOpacity="0.85" />
    </g>
  );
}

export default function ReferHeroVector() {
  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-label="Refer and earn referral network illustration"
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

      {/* Connection lines */}
      {/* You → Contact */}
      <motion.path d={`M${NODES[0].cx + 18},${NODES[0].cy - 20} Q195,100 ${NODES[1].cx - 18},${NODES[1].cy}`}
        stroke={G} strokeWidth="1.2" strokeOpacity="0.3" strokeDasharray="6 4" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 1.2, ease }}
      />
      {/* You → Investor */}
      <motion.path d={`M${NODES[0].cx + 18},${NODES[0].cy + 20} Q195,256 ${NODES[2].cx - 18},${NODES[2].cy}`}
        stroke={G} strokeWidth="1.2" strokeOpacity="0.3" strokeDasharray="6 4" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 1.4, ease }}
      />
      {/* Contact → Reward */}
      <motion.path d={`M${NODES[1].cx + 18},${NODES[1].cy + 10} Q345,140 ${NODES[3].cx - 18},${NODES[3].cy - 20}`}
        stroke={G} strokeWidth="1.2" strokeOpacity="0.2" strokeDasharray="5 4" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 1.9, ease }}
      />
      {/* Investor → Reward */}
      <motion.path d={`M${NODES[2].cx + 18},${NODES[2].cy - 10} Q345,216 ${NODES[3].cx - 18},${NODES[3].cy + 20}`}
        stroke={G} strokeWidth="1.2" strokeOpacity="0.2" strokeDasharray="5 4" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 2.0, ease }}
      />

      {/* Animated travelling dots along connection lines */}
      <motion.circle r="3.5" fill={G} fillOpacity="0.8"
        animate={{ offsetDistance: ["0%", "100%"] } as never}
        style={{ offsetPath: "path('M138,158 Q195,100 252,100')" } as never}
        transition={{ repeat: Infinity, duration: 2.2, delay: 1.6, ease: "easeInOut" }}
      />
      <motion.circle r="3.5" fill={G} fillOpacity="0.8"
        animate={{ offsetDistance: ["0%", "100%"] } as never}
        style={{ offsetPath: "path('M138,198 Q195,256 252,256')" } as never}
        transition={{ repeat: Infinity, duration: 2.4, delay: 2.0, ease: "easeInOut" }}
      />

      {/* People nodes */}
      {NODES.map((n) => (
        <motion.g key={n.label}>
          {/* Halo */}
          <motion.circle cx={n.cx} cy={n.cy} r={28}
            fill={G} fillOpacity="0.06" stroke={G} strokeWidth="1" strokeOpacity="0.2"
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: n.delay, ease }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          />
          {/* Disc */}
          <motion.circle cx={n.cx} cy={n.cy} r={18}
            fill={G} fillOpacity="0.14" stroke={G} strokeWidth="1.5" strokeOpacity="0.6"
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 0.35, delay: n.delay + 0.1, ease }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          />
          {/* Pulse ring */}
          <motion.circle cx={n.cx} cy={n.cy}
            stroke={G} strokeWidth="1" fill="none"
            animate={{ r: [18, 36], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: n.delay + 0.5, ease: "easeOut" }}
          />
          {/* Icon */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: n.delay + 0.2 }}>
            {n.label === "REWARD" ? (
              // Coin / star for reward node
              <>
                <circle cx={n.cx} cy={n.cy} r="7" stroke={G} strokeWidth="1.3" fill="none" strokeOpacity="0.9" />
                <text x={n.cx} y={n.cy + 3.5} textAnchor="middle"
                  fontSize="9" fontFamily="sans-serif" fontWeight="900" fill={G} fillOpacity="0.9">₦</text>
              </>
            ) : (
              <PersonIcon cx={n.cx} cy={n.cy} />
            )}
          </motion.g>
          {/* Labels */}
          <motion.text
            x={n.cx} y={n.cy + 36}
            textAnchor="middle"
            fontSize="9.5" fontFamily="sans-serif" fontWeight="800"
            letterSpacing="1.5" fill={G} fillOpacity="0.75"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: n.delay + 0.3 }}
          >{n.label}</motion.text>
          <motion.text
            x={n.cx} y={n.cy + 48}
            textAnchor="middle"
            fontSize="7.5" fontFamily="sans-serif" fontWeight="600"
            letterSpacing="0.8" fill="white" fillOpacity="0.32"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: n.delay + 0.38 }}
          >{n.sub}</motion.text>
        </motion.g>
      ))}

      {/* Reward amount badge */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 2.5, ease }}
        style={{ transformOrigin: "420px 130px" }}
      >
        <rect x="388" y="108" width="64" height="22" rx="6"
          fill={G} fillOpacity="0.2" stroke={G} strokeWidth="1" strokeOpacity="0.5" />
        <text x="420" y="123" textAnchor="middle"
          fontSize="9" fontFamily="sans-serif" fontWeight="800"
          letterSpacing="0.8" fill={G} fillOpacity="0.95">COMMISSION</text>
      </motion.g>

      {/* Floating data dots */}
      {[[58,46],[80,94],[46,128],[90,30],[98,164],[68,198]].map(([cx,cy],i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="1.5"
          fill={G} fillOpacity="0.4"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 + (i % 3) * 0.65, delay: i * 0.2 }}
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
        REFER. CONNECT. EARN.
      </motion.text>
    </svg>
  );
}
