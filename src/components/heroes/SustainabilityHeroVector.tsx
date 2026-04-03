"use client";

import { motion } from "framer-motion";

const G1 = "hsl(142,76%,42%)";
const G2 = "hsl(142,60%,62%)";
const GOLD = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function SustainabilityHeroVector() {
  return (
    <svg
      viewBox="0 0 480 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-label="Sustainable development illustration"
    >
      {/* ── Blueprint grid ── */}
      {[1,2,3,4,5].map((i) => (
        <motion.line key={`hg${i}`} x1="0" y1={i*84} x2="480" y2={i*84}
          stroke={G1} strokeOpacity="0.07" strokeWidth="0.6"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: i * 0.05 }} />
      ))}
      {[1,2,3,4,5].map((i) => (
        <motion.line key={`vg${i}`} x1={i*96} y1="0" x2={i*96} y2="420"
          stroke={G1} strokeOpacity="0.07" strokeWidth="0.6"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: i * 0.05 }} />
      ))}

      {/* ── Large leaf background ── */}
      <motion.path
        d="M 240,40 C 320,65 385,125 385,205 C 385,295 320,360 240,385 C 160,360 95,295 95,205 C 95,125 160,65 240,40 Z"
        fill={G1} fillOpacity="0.055"
        stroke={G1} strokeWidth="1.2" strokeOpacity="0.18"
        initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease }}
        style={{ transformOrigin: "240px 212px" }}
      />
      {/* Leaf vein */}
      <motion.line x1="240" y1="40" x2="240" y2="385"
        stroke={G1} strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="5 4"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }} />

      {/* ── Building ── */}
      {/* Ground */}
      <motion.line x1="130" y1="330" x2="350" y2="330"
        stroke={G1} strokeOpacity="0.3" strokeWidth="1.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }} />
      {/* Tower body */}
      <motion.rect x="188" y="165" width="104" height="165" rx="1"
        fill="hsl(150,40%,14%)" stroke={G1} strokeWidth="1.5" strokeOpacity="0.5"
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        style={{ transformOrigin: "240px 330px" }}
        transition={{ duration: 0.75, delay: 0.65, ease }} />
      {/* Window grid */}
      {[0,1,2,3].map((row) => [0,1].map((col) => (
        <motion.rect key={`w${row}${col}`}
          x={202 + col * 38} y={180 + row * 35} width="22" height="22" rx="1"
          fill={G2} fillOpacity="0.18"
          stroke={G2} strokeWidth="0.7" strokeOpacity="0.4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.1 + (row * 2 + col) * 0.07 }} />
      )))}
      {/* Rooftop band */}
      <motion.rect x="183" y="158" width="114" height="9" rx="1"
        fill="hsl(150,40%,18%)" stroke={G1} strokeWidth="1" strokeOpacity="0.4"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: "240px 162px" }}
        transition={{ duration: 0.5, delay: 1.0, ease }} />
      {/* Solar panels */}
      {[0,1,2].map((i) => (
        <motion.g key={`sp${i}`}
          initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.4 + i * 0.1 }}>
          <rect x={196 + i * 30} y="143" width="22" height="14" rx="2"
            fill={G1} fillOpacity="0.2" stroke={G1} strokeWidth="1.1" strokeOpacity="0.6" />
          <line x1={207 + i * 30} y1="143" x2={207 + i * 30} y2="157"
            stroke={G1} strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1={196 + i * 30} y1="150" x2={218 + i * 30} y2="150"
            stroke={G1} strokeWidth="0.5" strokeOpacity="0.4" />
        </motion.g>
      ))}

      {/* ── Tree left ── */}
      <motion.rect x="146" y="275" width="8" height="55" rx="4"
        fill={G1} fillOpacity="0.4"
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        style={{ transformOrigin: "150px 330px" }}
        transition={{ duration: 0.4, delay: 1.2, ease }} />
      {[{ cx:150, cy:260, r:26 },{ cx:132, cy:272, r:17 },{ cx:168, cy:270, r:19 }].map((c,i) => (
        <motion.circle key={i} cx={c.cx} cy={c.cy} r={c.r}
          fill={G1} fillOpacity="0.18" stroke={G1} strokeWidth="1" strokeOpacity="0.35"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
          transition={{ duration: 0.4, delay: 1.4 + i * 0.1, ease }} />
      ))}

      {/* ── Sun top-right ── */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <motion.line key={`ray${i}`}
            x1={400 + 18 * Math.cos(a)} y1={68 + 18 * Math.sin(a)}
            x2={400 + 30 * Math.cos(a)} y2={68 + 30 * Math.sin(a)}
            stroke={GOLD} strokeWidth="1.6" strokeOpacity="0.7" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 1.8 + i * 0.04 }} />
        );
      })}
      <motion.circle cx="400" cy="68" r="13"
        fill={GOLD} fillOpacity="0.22" stroke={GOLD} strokeWidth="1.6" strokeOpacity="0.7"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        style={{ transformOrigin: "400px 68px" }}
        transition={{ duration: 0.4, delay: 1.7, ease }} />
      <motion.circle cx="400" cy="68"
        fill="none" stroke={GOLD} strokeWidth="1"
        animate={{ r: [13, 28], opacity: [0.4, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, delay: 2.2, ease: "easeOut" }} />

      {/* Energy cable sun → panels */}
      <motion.path d="M 390,80 Q 344,108 278,143"
        stroke={GOLD} strokeWidth="1" strokeOpacity="0.3" strokeDasharray="5 4" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 2.0, ease }} />
      <motion.circle r="2.5" fill={GOLD} fillOpacity="0.9"
        animate={{ offsetDistance: ["0%","100%"] } as never}
        style={{ offsetPath: "path('M 390,80 Q 344,108 278,143')" } as never}
        transition={{ repeat: Infinity, duration: 1.8, delay: 2.4, ease: "easeInOut" }} />

      {/* ── Water drop bottom-right ── */}
      <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.6 }}>
        <path d="M 362,308 C 362,290 347,276 347,263 C 347,253 354,246 362,246 C 370,246 377,253 377,263 C 377,276 362,290 362,308 Z"
          fill={G1} fillOpacity="0.16" stroke={G1} strokeWidth="1.4" strokeOpacity="0.55" />
        <path d="M 355,258 Q 357,253 361,254"
          stroke={G2} strokeWidth="0.9" strokeOpacity="0.55" strokeLinecap="round" fill="none" />
        <motion.line x1="362" y1="308" x2="362" y2="326"
          stroke={G1} strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3"
          animate={{ y2: [322, 328, 322] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} />
      </motion.g>

      {/* ── Badges ── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
        <rect x="44" y="90" width="74" height="42" rx="7"
          fill={G1} fillOpacity="0.09" stroke={G1} strokeWidth="1" strokeOpacity="0.3" />
        <text x="81" y="109" textAnchor="middle" fontSize="11" fontFamily="sans-serif"
          fontWeight="900" letterSpacing="0.5" fill={G2} fillOpacity="0.9">CO₂</text>
        <text x="81" y="124" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif"
          fontWeight="700" letterSpacing="1.5" fill={G1} fillOpacity="0.5">REDUCED</text>
      </motion.g>
      <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: "415px 305px" }}
        transition={{ duration: 0.5, delay: 2.7, ease }}>
        <rect x="388" y="285" width="58" height="40" rx="6"
          fill={G1} fillOpacity="0.1" stroke={G1} strokeWidth="1" strokeOpacity="0.35" />
        <text x="417" y="304" textAnchor="middle" fontSize="11" fontFamily="sans-serif"
          fontWeight="900" letterSpacing="1" fill={G2} fillOpacity="0.9">LEED</text>
        <text x="417" y="318" textAnchor="middle" fontSize="7" fontFamily="sans-serif"
          fontWeight="700" letterSpacing="2" fill={G1} fillOpacity="0.5">ALIGNED</text>
      </motion.g>

      {/* ── Floating dots ── */}
      {[[40,175],[46,235],[432,145],[440,195],[428,375],[52,375]].map(([cx,cy],i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="1.5"
          fill={G1} fillOpacity="0.4"
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ repeat: Infinity, duration: 2 + (i%3)*0.6, delay: i*0.2 }} />
      ))}

      {/* ── Corner brackets ── */}
      <motion.path d="M 450,12 L 468,12 L 468,30" stroke={G1} strokeWidth="1.5" strokeOpacity="0.4" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.4 }} />
      <motion.path d="M 12,390 L 12,408 L 30,408" stroke={G1} strokeWidth="1.5" strokeOpacity="0.4" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.55 }} />

      {/* ── Footer label ── */}
      <motion.text x="56" y="412" fontSize="7.5" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="3.5" fill={G1} fillOpacity="0.4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0 }}>
        BUILDING THE FUTURE. SUSTAINABLY.
      </motion.text>
    </svg>
  );
}
