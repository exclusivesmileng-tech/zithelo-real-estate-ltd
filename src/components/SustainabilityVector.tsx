"use client";

import { motion } from "framer-motion";

// Green palette
const G1 = "hsl(142,76%,42%)";   // primary green
const G2 = "hsl(142,60%,62%)";   // lighter green
const G3 = "hsl(150,40%,22%)";   // deep green fills
const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function SustainabilityVector() {
  return (
    <svg
      viewBox="0 0 480 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-label="Sustainable building illustration"
    >
      {/* ── Organic background circle glow ── */}
      <motion.circle cx="240" cy="220" r="190"
        fill={G1} fillOpacity="0.05"
        initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease }}
        style={{ transformOrigin: "240px 220px" }}
      />
      <motion.circle cx="240" cy="220" r="140"
        fill={G1} fillOpacity="0.05"
        initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.1, ease }}
        style={{ transformOrigin: "240px 220px" }}
      />

      {/* ── Blueprint grid ── */}
      {[1,2,3,4,5].map((i) => (
        <motion.line key={`hg${i}`}
          x1="0" y1={i * 80} x2="480" y2={i * 80}
          stroke={G1} strokeOpacity="0.09" strokeWidth="0.8"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: i * 0.06 }}
        />
      ))}
      {[1,2,3,4,5].map((i) => (
        <motion.line key={`vg${i}`}
          x1={i * 96} y1="0" x2={i * 96} y2="440"
          stroke={G1} strokeOpacity="0.09" strokeWidth="0.8"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: i * 0.06 }}
        />
      ))}

      {/* ══════════════════════════════════
          LARGE LEAF — background shape
      ══════════════════════════════════ */}
      <motion.path
        d="M 240,60
           C 310,80 370,130 370,200
           C 370,280 310,340 240,370
           C 170,340 110,280 110,200
           C 110,130 170,80 240,60 Z"
        fill={G1} fillOpacity="0.07"
        stroke={G1} strokeWidth="1.5" strokeOpacity="0.28"
        initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease }}
        style={{ transformOrigin: "240px 215px" }}
      />
      {/* Leaf central vein */}
      <motion.line x1="240" y1="60" x2="240" y2="370"
        stroke={G1} strokeWidth="1" strokeOpacity="0.22"
        strokeDasharray="6 4"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      {/* Leaf side veins */}
      {[120,150,180,210,240,270,300,330].map((y, i) => {
        const spread = 18 + (i < 4 ? i * 8 : (7 - i) * 8);
        return (
          <motion.g key={y}>
            <motion.line x1="240" y1={y} x2={240 - spread} y2={y + 18}
              stroke={G1} strokeWidth="0.7" strokeOpacity="0.20"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 1.0 + i * 0.05 }}
            />
            <motion.line x1="240" y1={y} x2={240 + spread} y2={y + 18}
              stroke={G1} strokeWidth="0.7" strokeOpacity="0.20"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 1.0 + i * 0.05 }}
            />
          </motion.g>
        );
      })}

      {/* ══════════════════════════════════
          BUILDING
      ══════════════════════════════════ */}
      {/* Ground */}
      <motion.line x1="120" y1="340" x2="360" y2="340"
        stroke={G1} strokeOpacity="0.35" strokeWidth="1.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      {/* Main tower */}
      <motion.rect x="188" y="168" width="104" height="172" rx="1"
        fill={G3} stroke={G1} strokeWidth="1.5" strokeOpacity="0.6"
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        style={{ transformOrigin: "240px 340px" }}
        transition={{ duration: 0.7, delay: 0.7, ease }}
      />
      {/* Window rows */}
      {[0,1,2,3].map((row) =>
        [0,1].map((col) => (
          <motion.rect key={`w${row}${col}`}
            x={203 + col * 38} y={183 + row * 36}
            width="22" height="24" rx="1"
            fill={G1} fillOpacity="0.20"
            stroke={G1} strokeWidth="0.9" strokeOpacity="0.45"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.1 + (row * 2 + col) * 0.07 }}
          />
        ))
      )}
      {/* Rooftop ledge */}
      <motion.rect x="183" y="160" width="114" height="10" rx="1"
        fill={G3} stroke={G1} strokeWidth="1.1" strokeOpacity="0.50"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: "240px 165px" }}
        transition={{ duration: 0.5, delay: 1.0, ease }}
      />

      {/* ── Solar panels on roof ── */}
      {[0,1,2].map((i) => (
        <motion.g key={`sp${i}`}
          initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.5 + i * 0.1 }}
        >
          <rect x={198 + i * 30} y="145" width="22" height="14" rx="2"
            fill={G1} fillOpacity="0.28"
            stroke={G1} strokeWidth="1.3" strokeOpacity="0.7" />
          <line x1={209 + i * 30} y1="145" x2={209 + i * 30} y2="159"
            stroke={G1} strokeWidth="0.7" strokeOpacity="0.45" />
          <line x1={198 + i * 30} y1="152" x2={220 + i * 30} y2="152"
            stroke={G1} strokeWidth="0.7" strokeOpacity="0.45" />
        </motion.g>
      ))}

      {/* ══════════════════════════════════
          ORBITAL RING — green economy circle
      ══════════════════════════════════ */}
      <motion.ellipse cx="240" cy="250" rx="88" ry="30"
        stroke={G1} strokeWidth="1" strokeOpacity="0.22"
        strokeDasharray="6 4" fill="none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      />
      {/* Particle orbiting the ring */}
      <motion.circle r="4"
        fill={G2} fillOpacity="0.85"
        animate={{ offsetDistance: ["0%", "100%"] } as never}
        style={{ offsetPath: "path('M 328,250 A 88,30 0 1 0 151.6,250 A 88,30 0 1 0 328,250')" } as never}
        transition={{ repeat: Infinity, duration: 5, ease: "linear", delay: 2.0 }}
      />

      {/* ══════════════════════════════════
          TREE — left of building
      ══════════════════════════════════ */}
      {/* Trunk */}
      <motion.rect x="147" y="278" width="9" height="62" rx="4"
        fill={G1} fillOpacity="0.45"
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        style={{ transformOrigin: "152px 340px" }}
        transition={{ duration: 0.5, delay: 1.2, ease }}
      />
      {/* Canopy */}
      {[
        { cx: 152, cy: 263, r: 30, delay: 1.4 },
        { cx: 130, cy: 276, r: 19, delay: 1.55 },
        { cx: 174, cy: 273, r: 21, delay: 1.5 },
      ].map((c, i) => (
        <motion.circle key={i} cx={c.cx} cy={c.cy} r={c.r}
          fill={G1} fillOpacity="0.22"
          stroke={G1} strokeWidth="1.2" strokeOpacity="0.42"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
          transition={{ duration: 0.45, delay: c.delay, ease }}
        />
      ))}
      {/* Leaf detail dots */}
      {[[140,256],[156,250],[166,258],[144,270],[161,266]].map(([cx,cy],i) => (
        <motion.circle key={`leaf${i}`} cx={cx} cy={cy} r="3.5"
          fill={G1} fillOpacity="0.38"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          transition={{ duration: 0.2, delay: 1.7 + i * 0.06 }}
        />
      ))}

      {/* ══════════════════════════════════
          SUN — top right (spinning rays)
      ══════════════════════════════════ */}
      {/* Spinning ray group */}
      <motion.g
        style={{ transformOrigin: "395px 72px" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
      >
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          return (
            <motion.line key={`ray${i}`}
              x1={395 + 20 * Math.cos(a)} y1={72 + 20 * Math.sin(a)}
              x2={395 + 36 * Math.cos(a)} y2={72 + 36 * Math.sin(a)}
              stroke={G2} strokeWidth="2" strokeOpacity="0.7" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 1.8 + i * 0.04 }}
            />
          );
        })}
      </motion.g>
      {/* Sun disc */}
      <motion.circle cx="395" cy="72" r="15"
        fill={G1} fillOpacity="0.30"
        stroke={G2} strokeWidth="2" strokeOpacity="0.75"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        style={{ transformOrigin: "395px 72px" }}
        transition={{ duration: 0.4, delay: 1.7, ease }}
      />
      {/* Pulsing halo */}
      <motion.circle cx="395" cy="72"
        fill="none" stroke={G1} strokeWidth="1.2"
        animate={{ r: [15, 32], opacity: [0.45, 0] }}
        transition={{ repeat: Infinity, duration: 2.6, delay: 2.2, ease: "easeOut" }}
      />
      {/* Energy cable from sun to panels */}
      <motion.path d="M 382,86 Q 338,112 280,145"
        stroke={G2} strokeWidth="1.4" strokeOpacity="0.40" strokeDasharray="5 4" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 2.0, ease }}
      />
      <motion.circle r="3.5" fill={G2} fillOpacity="0.95"
        animate={{ offsetDistance: ["0%","100%"] } as never}
        style={{ offsetPath: "path('M 382,86 Q 338,112 280,145')" } as never}
        transition={{ repeat: Infinity, duration: 1.8, delay: 2.4, ease: "easeInOut" }}
      />

      {/* ══════════════════════════════════
          WATER DROP — bottom right
      ══════════════════════════════════ */}
      <motion.g
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.6 }}
      >
        <path d="M 358,310 C 358,292 342,278 342,264 C 342,254 349,247 358,247 C 367,247 374,254 374,264 C 374,278 358,292 358,310 Z"
          fill={G1} fillOpacity="0.20"
          stroke={G1} strokeWidth="1.5" strokeOpacity="0.65" />
        {/* Ripple ring */}
        <motion.ellipse cx="358" cy="316" rx="8" ry="3"
          stroke={G1} strokeWidth="0.8" strokeOpacity="0" fill="none"
          animate={{ rx: [8, 18], ry: [3, 7], strokeOpacity: [0.5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, delay: 2.2, ease: "easeOut" }}
        />
        <path d="M 351,260 Q 353,255 357,256"
          stroke={G2} strokeWidth="1" strokeOpacity="0.6" strokeLinecap="round" fill="none" />
      </motion.g>

      {/* ══════════════════════════════════
          CO₂ reduction label
      ══════════════════════════════════ */}
      <motion.g
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
      >
        <rect x="46" y="92" width="76" height="52" rx="10"
          fill={G1} fillOpacity="0.10"
          stroke={G1} strokeWidth="1" strokeOpacity="0.38" />
        <text x="84" y="114" textAnchor="middle"
          fontSize="12" fontFamily="sans-serif" fontWeight="900"
          letterSpacing="0.5" fill={G2} fillOpacity="0.95">CO₂</text>
        <text x="84" y="130" textAnchor="middle"
          fontSize="8" fontFamily="sans-serif" fontWeight="700"
          letterSpacing="1.5" fill={G1} fillOpacity="0.60">REDUCED ↓</text>
      </motion.g>

      {/* ── LEED badge ── */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: "420px 310px" }}
        transition={{ duration: 0.5, delay: 2.8, ease }}
      >
        <rect x="388" y="288" width="64" height="46" rx="8"
          fill={G1} fillOpacity="0.13"
          stroke={G1} strokeWidth="1.1" strokeOpacity="0.45" />
        <text x="420" y="310" textAnchor="middle"
          fontSize="13" fontFamily="sans-serif" fontWeight="900"
          letterSpacing="1" fill={G2} fillOpacity="0.95">LEED</text>
        <text x="420" y="325" textAnchor="middle"
          fontSize="7.5" fontFamily="sans-serif" fontWeight="700"
          letterSpacing="2" fill={G1} fillOpacity="0.60">ALIGNED</text>
      </motion.g>

      {/* ── Floating data dots ── */}
      {[[42,180],[48,240],[430,150],[438,200],[424,380],[56,380]].map(([cx,cy],i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="2"
          fill={G1} fillOpacity="0.45"
          animate={{ opacity: [0.25, 0.8, 0.25] }}
          transition={{ repeat: Infinity, duration: 2 + (i%3)*0.7, delay: i*0.22 }}
        />
      ))}

      {/* ── Corner brackets ── */}
      <motion.path d="M 448,14 L 466,14 L 466,34"
        stroke={G1} strokeWidth="1.6" strokeOpacity="0.48" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
      <motion.path d="M 14,406 L 14,426 L 34,426"
        stroke={G1} strokeWidth="1.6" strokeOpacity="0.48" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.65 }}
      />

      {/* ── Footer label ── */}
      <motion.text x="58" y="428"
        fontSize="7.5" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="3.5" fill={G1} fillOpacity="0.50"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3.0 }}
      >
        BUILDING THE FUTURE. SUSTAINABLY.
      </motion.text>
    </svg>
  );
}
