"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function SustainabilityVector() {
  return (
    <svg
      viewBox="0 0 480 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[480px]"
      aria-label="Sustainable development illustration"
    >
      {/* Blueprint grid */}
      {[1,2,3,4,5].map((i) => (
        <motion.line key={`hg${i}`}
          x1="0" y1={i*70} x2="480" y2={i*70}
          stroke={G} strokeOpacity="0.06" strokeWidth="0.7"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: i * 0.06 }}
        />
      ))}
      {[1,2,3,4,5,6].map((i) => (
        <motion.line key={`vg${i}`}
          x1={i*80} y1="0" x2={i*80} y2="420"
          stroke={G} strokeOpacity="0.06" strokeWidth="0.7"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: i * 0.06 }}
        />
      ))}

      {/* ── Ground line ── */}
      <motion.line x1="60" y1="310" x2="420" y2="310"
        stroke={G} strokeOpacity="0.25" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      {/* ── Building silhouette ── */}
      {/* Main tower */}
      <motion.rect x="170" y="140" width="140" height="170" rx="2"
        fill={G} fillOpacity="0.07" stroke={G} strokeWidth="1.5" strokeOpacity="0.5"
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        style={{ transformOrigin: "240px 310px" }}
        transition={{ duration: 0.7, delay: 0.6, ease }}
      />
      {/* Window grid */}
      {[0,1,2,3].map((row) =>
        [0,1,2].map((col) => (
          <motion.rect
            key={`w${row}${col}`}
            x={184 + col * 38} y={158 + row * 36} width="20" height="22" rx="1"
            fill={G} fillOpacity="0.18" stroke={G} strokeWidth="0.8" strokeOpacity="0.35"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.0 + (row * 3 + col) * 0.06 }}
          />
        ))
      )}
      {/* Rooftop edge */}
      <motion.rect x="165" y="132" width="150" height="10" rx="1"
        fill={G} fillOpacity="0.15" stroke={G} strokeWidth="1" strokeOpacity="0.4"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: "240px 137px" }}
        transition={{ duration: 0.5, delay: 0.9, ease }}
      />

      {/* ── Solar panels on roof ── */}
      {[0,1,2].map((i) => (
        <motion.g key={`solar${i}`}
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.4 + i * 0.12, ease }}
        >
          <rect x={182 + i * 36} y="116" width="28" height="16" rx="2"
            fill={G} fillOpacity="0.2" stroke={G} strokeWidth="1.2" strokeOpacity="0.6" />
          {/* Panel grid lines */}
          <line x1={196 + i * 36} y1="116" x2={196 + i * 36} y2="132"
            stroke={G} strokeWidth="0.6" strokeOpacity="0.4" />
          <line x1={182 + i * 36} y1="124" x2={210 + i * 36} y2="124"
            stroke={G} strokeWidth="0.6" strokeOpacity="0.4" />
        </motion.g>
      ))}

      {/* ── Sun rays (top-right) ── */}
      {[0,1,2,3,4,5,6,7].map((i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const r1 = 22, r2 = 34;
        const cx = 390, cy = 60;
        return (
          <motion.line key={`ray${i}`}
            x1={cx + r1 * Math.cos(angle)} y1={cy + r1 * Math.sin(angle)}
            x2={cx + r2 * Math.cos(angle)} y2={cy + r2 * Math.sin(angle)}
            stroke={G} strokeWidth="1.5" strokeOpacity="0.55" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 1.6 + i * 0.05 }}
          />
        );
      })}
      {/* Sun disc */}
      <motion.circle cx="390" cy="60" r="14"
        fill={G} fillOpacity="0.18" stroke={G} strokeWidth="1.5" strokeOpacity="0.65"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        style={{ transformOrigin: "390px 60px" }}
        transition={{ duration: 0.45, delay: 1.5, ease }}
      />
      {/* Pulsing halo */}
      <motion.circle cx="390" cy="60"
        fill="none" stroke={G} strokeWidth="1" strokeOpacity="0.2"
        animate={{ r: [14, 28], opacity: [0.5, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, delay: 2.0, ease: "easeOut" }}
      />

      {/* ── Energy cable from sun → roof ── */}
      <motion.path d="M 380,72 Q 340,100 286,116"
        stroke={G} strokeWidth="1.2" strokeOpacity="0.3" strokeDasharray="5 4" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 1.8, ease }}
      />
      {/* Travelling energy dot */}
      <motion.circle r="3" fill={G}
        animate={{ offsetDistance: ["0%","100%"] } as never}
        style={{ offsetPath: "path('M 380,72 Q 340,100 286,116')" } as never}
        transition={{ repeat: Infinity, duration: 1.8, delay: 2.2, ease: "easeInOut" }}
      />

      {/* ── Leaf (bottom-left) ── */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: "88px 340px" }}
        transition={{ duration: 0.6, delay: 1.3, ease }}
      >
        {/* Leaf shape */}
        <path d="M 88,360 C 68,335 72,305 88,295 C 104,305 108,335 88,360 Z"
          fill={G} fillOpacity="0.15" stroke={G} strokeWidth="1.5" strokeOpacity="0.55" />
        {/* Mid-vein */}
        <line x1="88" y1="360" x2="88" y2="295"
          stroke={G} strokeWidth="1" strokeOpacity="0.3" />
        {/* Side veins */}
        <line x1="88" y1="320" x2="78" y2="310" stroke={G} strokeWidth="0.7" strokeOpacity="0.25" />
        <line x1="88" y1="335" x2="98" y2="322" stroke={G} strokeWidth="0.7" strokeOpacity="0.25" />
        <line x1="88" y1="348" x2="80" y2="340" stroke={G} strokeWidth="0.7" strokeOpacity="0.25" />
        {/* Label */}
        <text x="88" y="375" textAnchor="middle"
          fontSize="8" fontFamily="sans-serif" fontWeight="700"
          letterSpacing="1.2" fill={G} fillOpacity="0.5">ECO DESIGN</text>
      </motion.g>

      {/* ── Water drop (bottom-right) ── */}
      <motion.g
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5, ease }}
      >
        <path d="M 390,290 C 390,275 375,265 375,252 C 375,243 382,237 390,237 C 398,237 405,243 405,252 C 405,265 390,275 390,290 Z"
          fill={G} fillOpacity="0.14" stroke={G} strokeWidth="1.4" strokeOpacity="0.55" />
        {/* Shine mark */}
        <path d="M 383,248 Q 385,244 389,245" stroke={G} strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round" fill="none" />
        {/* Drip line */}
        <motion.line x1="390" y1="290" x2="390" y2="310"
          stroke={G} strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3"
          animate={{ y1: [290, 294, 290] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <text x="390" y="375" textAnchor="middle"
          fontSize="8" fontFamily="sans-serif" fontWeight="700"
          letterSpacing="1.2" fill={G} fillOpacity="0.5">WATER SMART</text>
      </motion.g>

      {/* ── Circuit / smart line from building ── */}
      <motion.path d="M 310,220 L 350,220 L 350,240 L 380,240"
        stroke={G} strokeWidth="1" strokeOpacity="0.28" strokeDasharray="4 3" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 2.0, ease }}
      />
      <motion.circle cx="380" cy="240" r="3.5"
        fill={G} fillOpacity="0.7"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.6, delay: 2.5 }}
      />
      <text x="380" y="255" textAnchor="middle"
        fontSize="7.5" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="0.8" fill={G} fillOpacity="0.4">SMART</text>

      {/* ── LEED badge (top-left) ── */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: "72px 88px" }}
        transition={{ duration: 0.5, delay: 2.4, ease }}
      >
        <rect x="40" y="62" width="64" height="52" rx="6"
          fill={G} fillOpacity="0.1" stroke={G} strokeWidth="1.2" strokeOpacity="0.45" />
        <text x="72" y="85" textAnchor="middle"
          fontSize="13" fontFamily="sans-serif" fontWeight="900"
          letterSpacing="1" fill={G} fillOpacity="0.85">LEED</text>
        <rect x="48" y="90" width="48" height="1.5" rx="1" fill={G} fillOpacity="0.3" />
        <text x="72" y="105" textAnchor="middle"
          fontSize="7.5" fontFamily="sans-serif" fontWeight="700"
          letterSpacing="1.5" fill={G} fillOpacity="0.5">ALIGNED</text>
      </motion.g>

      {/* ── Floating data dots ── */}
      {[[44,160],[52,220],[430,160],[440,200],[430,300],[56,270]].map(([cx,cy],i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="1.5"
          fill={G} fillOpacity="0.35"
          animate={{ opacity: [0.25, 0.7, 0.25] }}
          transition={{ repeat: Infinity, duration: 2 + (i % 3) * 0.7, delay: i * 0.2 }}
        />
      ))}

      {/* Corner brackets */}
      <motion.path d="M 444,14 L 466,14 L 466,36"
        stroke={G} strokeWidth="1.5" strokeOpacity="0.4" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
      <motion.path d="M 14,384 L 14,406 L 36,406"
        stroke={G} strokeWidth="1.5" strokeOpacity="0.4" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.65 }}
      />

      {/* Footer label */}
      <motion.text x="58" y="407"
        fontSize="8.5" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="3.5" fill={G} fillOpacity="0.45"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
      >
        BUILDING THE FUTURE. SUSTAINABLY.
      </motion.text>
    </svg>
  );
}
