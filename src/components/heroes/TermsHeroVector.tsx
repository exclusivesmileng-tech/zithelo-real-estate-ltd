"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

const CX = 260;
const CY = 175;

// Clause nodes
const NODES = [
  { angle: -90, label: "PLATFORM",  sub: "ROLE & SCOPE",   delay: 1.8 },
  { angle:   0, label: "RIGHTS",    sub: "USER TERMS",     delay: 2.0 },
  { angle:  90, label: "LIABILITY", sub: "LIMITATIONS",    delay: 2.2 },
  { angle: 180, label: "LAW",       sub: "GEORGIA · NG",   delay: 2.4 },
];

const R = 108;

// Mini document card
function DocCard({ x, y, delay }: { x: number; y: number; delay: number }) {
  const w = 36, h = 44;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay, ease }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="4"
        fill={G} fillOpacity="0.12" stroke={G} strokeWidth="1.4" strokeOpacity="0.5" />
      {/* Folded corner */}
      <path d={`M${x + w / 2 - 8},${y - h / 2} L${x + w / 2},${y - h / 2 + 8} L${x + w / 2 - 8},${y - h / 2 + 8} Z`}
        fill={G} fillOpacity="0.2" stroke={G} strokeWidth="0.7" strokeOpacity="0.4" />
      {/* Text lines */}
      <rect x={x - w / 2 + 6} y={y - h / 2 + 12} width={w - 14} height={3} rx="1.5" fill={G} fillOpacity="0.55" />
      <rect x={x - w / 2 + 6} y={y - h / 2 + 19} width={w - 20} height={2.5} rx="1.25" fill={G} fillOpacity="0.35" />
      <rect x={x - w / 2 + 6} y={y - h / 2 + 26} width={w - 12} height={2.5} rx="1.25" fill={G} fillOpacity="0.28" />
    </motion.g>
  );
}

export default function TermsHeroVector() {
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
      aria-label="Terms of service illustration"
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

      {/* Slow rotating outer ring */}
      <motion.circle cx={CX} cy={CY} r={R + 20}
        stroke={G} strokeWidth="0.6" strokeOpacity="0.10" strokeDasharray="4 7" fill="none"
        animate={{ rotate: [0, -360] }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
      />

      {/* Glow halos */}
      <motion.circle cx={CX} cy={CY} r={52}
        fill={G} fillOpacity="0.05" stroke={G} strokeWidth="1.5" strokeOpacity="0.22"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />
      <motion.circle cx={CX} cy={CY} r={34}
        fill={G} fillOpacity="0.09" stroke={G} strokeWidth="1.5" strokeOpacity="0.38"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.55, delay: 1.0 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />

      {/* Central document */}
      <motion.g
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2, ease }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      >
        <rect x={CX - 20} y={CY - 28} width="40" height="52" rx="4"
          fill={G} fillOpacity="0.15" stroke={G} strokeWidth="2" strokeOpacity="0.65" />
        {/* Folded corner */}
        <path d={`M${CX + 8},${CY - 28} L${CX + 20},${CY - 16} L${CX + 8},${CY - 16} Z`}
          fill={G} fillOpacity="0.2" stroke={G} strokeWidth="0.8" strokeOpacity="0.4" />
        {/* Text lines */}
        <rect x={CX - 13} y={CY - 14} width="26" height="3.5" rx="1.75" fill={G} fillOpacity="0.65" />
        <rect x={CX - 13} y={CY - 6}  width="18" height="3"   rx="1.5"  fill={G} fillOpacity="0.45" />
        <rect x={CX - 13} y={CY + 1}  width="22" height="3"   rx="1.5"  fill={G} fillOpacity="0.38" />
        <rect x={CX - 13} y={CY + 8}  width="14" height="3"   rx="1.5"  fill={G} fillOpacity="0.3"  />
      </motion.g>

      {/* Document pulse */}
      <motion.rect x={CX - 20} y={CY - 28} width="40" height="52" rx="4"
        fill="none" stroke={G} strokeWidth="1.5" strokeOpacity="0.25"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{ repeat: Infinity, duration: 2.8, delay: 2.2, ease: "easeOut" }}
      />

      {/* Spokes */}
      {orbitNodes.map((n, i) => (
        <motion.line key={`spoke-${i}`}
          x1={CX} y1={CY} x2={n.cx} y2={n.cy}
          stroke={G} strokeWidth="1" strokeOpacity="0.18" strokeDasharray="5 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: n.delay - 0.3 }}
        />
      ))}

      {/* Orbit doc cards + labels */}
      {orbitNodes.map((n) => (
        <motion.g key={n.label}>
          <DocCard x={n.cx} y={n.cy} delay={n.delay} />
          {/* Pulse ring */}
          <motion.circle cx={n.cx} cy={n.cy}
            stroke={G} strokeWidth="1" fill="none"
            animate={{ r: [8, 24], opacity: [0.5, 0], strokeOpacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: n.delay + 0.5, ease: "easeOut" }}
          />
          <motion.text
            x={n.cx + (n.angle === 180 ? -27 : n.angle === 0 ? 27 : 0)}
            y={n.cy + (n.angle === -90 ? -30 : n.angle === 90 ? 36 : -6)}
            textAnchor={n.angle === 180 ? "end" : n.angle === 0 ? "start" : "middle"}
            fontSize="9.5" fontFamily="sans-serif" fontWeight="800"
            letterSpacing="1.4" fill={G} fillOpacity="0.75"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: n.delay + 0.3 }}
          >
            {n.label}
          </motion.text>
          <motion.text
            x={n.cx + (n.angle === 180 ? -27 : n.angle === 0 ? 27 : 0)}
            y={n.cy + (n.angle === -90 ? -18 : n.angle === 90 ? 48 : 6)}
            textAnchor={n.angle === 180 ? "end" : n.angle === 0 ? "start" : "middle"}
            fontSize="7.5" fontFamily="sans-serif" fontWeight="600"
            letterSpacing="0.8" fill="white" fillOpacity="0.32"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: n.delay + 0.38 }}
          >
            {n.sub}
          </motion.text>
        </motion.g>
      ))}

      {/* Travelling dot on orbit */}
      <motion.circle r="3" fill={G}
        animate={{
          cx: [CX + R, CX, CX - R, CX, CX + R],
          cy: [CY,     CY + R, CY, CY - R, CY],
        }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear", delay: 2.8 }}
      />

      {/* Floating data dots */}
      {[
        [58, 46], [80, 94], [44, 128], [92, 30],
        [98, 164], [68, 198],
      ].map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="1.5"
          fill={G} fillOpacity="0.38"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 + (i % 3) * 0.65, delay: i * 0.18 }}
        />
      ))}

      {/* Jurisdiction labels */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
        <text x="420" y="295" fontSize="8" fontFamily="sans-serif" fontWeight="700"
          letterSpacing="0.8" fill={G} fillOpacity="0.4" textAnchor="middle">GEORGIA, USA</text>
        <text x="420" y="308" fontSize="8" fontFamily="sans-serif" fontWeight="700"
          letterSpacing="0.8" fill={G} fillOpacity="0.4" textAnchor="middle">NIGERIA</text>
        <text x="420" y="321" fontSize="7.5" fontFamily="sans-serif" fontWeight="600"
          letterSpacing="0.5" fill="white" fillOpacity="0.25" textAnchor="middle">GOVERNING LAW</text>
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
        fontSize="8.5" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="3.5" fill={G} fillOpacity="0.45"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        FAIR. TRANSPARENT. CLEAR.
      </motion.text>
    </svg>
  );
}
