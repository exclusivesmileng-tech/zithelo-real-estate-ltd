"use client";

import { motion } from "framer-motion";

// Green palette
const G1 = "hsl(142,76%,42%)";   // primary green
const G2 = "hsl(142,60%,62%)";   // lighter green
const G3 = "hsl(150,40%,22%)";   // deep green for fills
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
      <motion.circle cx="240" cy="220" r="180"
        fill={G1} fillOpacity="0.04"
        initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease }}
        style={{ transformOrigin: "240px 220px" }}
      />
      <motion.circle cx="240" cy="220" r="140"
        fill={G1} fillOpacity="0.04"
        initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.1, ease }}
        style={{ transformOrigin: "240px 220px" }}
      />

      {/* ── Blueprint grid (green tint) ── */}
      {[1,2,3,4,5].map((i) => (
        <motion.line key={`hg${i}`}
          x1="0" y1={i * 80} x2="480" y2={i * 80}
          stroke={G1} strokeOpacity="0.08" strokeWidth="0.7"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: i * 0.06 }}
        />
      ))}
      {[1,2,3,4,5].map((i) => (
        <motion.line key={`vg${i}`}
          x1={i * 96} y1="0" x2={i * 96} y2="440"
          stroke={G1} strokeOpacity="0.08" strokeWidth="0.7"
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
        stroke={G1} strokeWidth="1.5" strokeOpacity="0.25"
        initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease }}
        style={{ transformOrigin: "240px 215px" }}
      />
      {/* Leaf central vein */}
      <motion.line x1="240" y1="60" x2="240" y2="370"
        stroke={G1} strokeWidth="1" strokeOpacity="0.2"
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
              stroke={G1} strokeWidth="0.7" strokeOpacity="0.18"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 1.0 + i * 0.05 }}
            />
            <motion.line x1="240" y1={y} x2={240 + spread} y2={y + 18}
              stroke={G1} strokeWidth="0.7" strokeOpacity="0.18"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 1.0 + i * 0.05 }}
            />
          </motion.g>
        );
      })}

      {/* ══════════════════════════════════
          BUILDING emerging from leaf base
      ══════════════════════════════════ */}
      {/* Ground */}
      <motion.line x1="130" y1="340" x2="350" y2="340"
        stroke={G1} strokeOpacity="0.3" strokeWidth="1.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      {/* Main tower */}
      <motion.rect x="190" y="170" width="100" height="170" rx="1"
        fill={G3} stroke={G1} strokeWidth="1.5" strokeOpacity="0.55"
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        style={{ transformOrigin: "240px 340px" }}
        transition={{ duration: 0.7, delay: 0.7, ease }}
      />
      {/* Window rows */}
      {[0,1,2,3].map((row) =>
        [0,1].map((col) => (
          <motion.rect key={`w${row}${col}`}
            x={203 + col * 38} y={185 + row * 36}
            width="22" height="24" rx="1"
            fill={G1} fillOpacity="0.15"
            stroke={G1} strokeWidth="0.8" strokeOpacity="0.4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.1 + (row * 2 + col) * 0.07 }}
          />
        ))
      )}
      {/* Rooftop */}
      <motion.rect x="185" y="162" width="110" height="10" rx="1"
        fill={G3} stroke={G1} strokeWidth="1" strokeOpacity="0.45"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: "240px 167px" }}
        transition={{ duration: 0.5, delay: 1.0, ease }}
      />

      {/* ── Solar panels on roof ── */}
      {[0,1,2].map((i) => (
        <motion.g key={`sp${i}`}
          initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.5 + i * 0.1 }}
        >
          <rect x={198 + i * 30} y="147" width="22" height="14" rx="2"
            fill={G1} fillOpacity="0.22"
            stroke={G1} strokeWidth="1.2" strokeOpacity="0.65" />
          <line x1={209 + i * 30} y1="147" x2={209 + i * 30} y2="161"
            stroke={G1} strokeWidth="0.6" strokeOpacity="0.4" />
          <line x1={198 + i * 30} y1="154" x2={220 + i * 30} y2="154"
            stroke={G1} strokeWidth="0.6" strokeOpacity="0.4" />
        </motion.g>
      ))}

      {/* ══════════════════════════════════
          TREE growing left of building
      ══════════════════════════════════ */}
      {/* Trunk */}
      <motion.rect x="148" y="280" width="8" height="60" rx="4"
        fill={G1} fillOpacity="0.4"
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        style={{ transformOrigin: "152px 340px" }}
        transition={{ duration: 0.5, delay: 1.2, ease }}
      />
      {/* Canopy circles */}
      {[
        { cx: 152, cy: 265, r: 28, delay: 1.4 },
        { cx: 132, cy: 278, r: 18, delay: 1.55 },
        { cx: 172, cy: 275, r: 20, delay: 1.5 },
      ].map((c, i) => (
        <motion.circle key={i} cx={c.cx} cy={c.cy} r={c.r}
          fill={G1} fillOpacity="0.20"
          stroke={G1} strokeWidth="1.2" strokeOpacity="0.4"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
          transition={{ duration: 0.45, delay: c.delay, ease }}
        />
      ))}
      {/* Leaves detail dots on canopy */}
      {[[140,258],[155,252],[165,260],[145,272],[160,268]].map(([cx,cy],i) => (
        <motion.circle key={`leaf${i}`} cx={cx} cy={cy} r="3"
          fill={G1} fillOpacity="0.35"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          transition={{ duration: 0.2, delay: 1.7 + i * 0.06 }}
        />
      ))}

      {/* ══════════════════════════════════
          SUN — top right
      ══════════════════════════════════ */}
      {/* Rays */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <motion.line key={`ray${i}`}
            x1={395 + 20 * Math.cos(a)} y1={72 + 20 * Math.sin(a)}
            x2={395 + 34 * Math.cos(a)} y2={72 + 34 * Math.sin(a)}
            stroke={G2} strokeWidth="1.8" strokeOpacity="0.65" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 1.8 + i * 0.04 }}
          />
        );
      })}
      {/* Disc */}
      <motion.circle cx="395" cy="72" r="14"
        fill={G1} fillOpacity="0.25"
        stroke={G2} strokeWidth="1.8" strokeOpacity="0.7"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        style={{ transformOrigin: "395px 72px" }}
        transition={{ duration: 0.4, delay: 1.7, ease }}
      />
      {/* Pulsing halo */}
      <motion.circle cx="395" cy="72"
        fill="none" stroke={G1} strokeWidth="1"
        animate={{ r: [14, 30], opacity: [0.4, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, delay: 2.2, ease: "easeOut" }}
      />
      {/* Energy cable solar → panels */}
      <motion.path d="M 384,84 Q 340,110 282,147"
        stroke={G2} strokeWidth="1.2" strokeOpacity="0.35" strokeDasharray="5 4" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 2.0, ease }}
      />
      <motion.circle r="3" fill={G2} fillOpacity="0.9"
        animate={{ offsetDistance: ["0%","100%"] } as never}
        style={{ offsetPath: "path('M 384,84 Q 340,110 282,147')" } as never}
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
          fill={G1} fillOpacity="0.18"
          stroke={G1} strokeWidth="1.5" strokeOpacity="0.6" />
        <path d="M 351,260 Q 353,255 357,256"
          stroke={G2} strokeWidth="1" strokeOpacity="0.6" strokeLinecap="round" fill="none" />
        <motion.line x1="358" y1="310" x2="358" y2="330"
          stroke={G1} strokeWidth="1" strokeOpacity="0.35" strokeDasharray="3 3"
          animate={{ y2: [326, 332, 326] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </motion.g>

      {/* ══════════════════════════════════
          CO₂ reduction arc label
      ══════════════════════════════════ */}
      <motion.g
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
      >
        <rect x="50" y="96" width="72" height="44" rx="8"
          fill={G1} fillOpacity="0.1"
          stroke={G1} strokeWidth="1" strokeOpacity="0.35" />
        <text x="86" y="116" textAnchor="middle"
          fontSize="11" fontFamily="sans-serif" fontWeight="900"
          letterSpacing="0.5" fill={G2} fillOpacity="0.9">CO₂</text>
        <text x="86" y="131" textAnchor="middle"
          fontSize="8" fontFamily="sans-serif" fontWeight="700"
          letterSpacing="1.5" fill={G1} fillOpacity="0.55">REDUCED</text>
      </motion.g>

      {/* ── LEED badge ── */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: "420px 310px" }}
        transition={{ duration: 0.5, delay: 2.8, ease }}
      >
        <rect x="390" y="290" width="60" height="42" rx="6"
          fill={G1} fillOpacity="0.12"
          stroke={G1} strokeWidth="1" strokeOpacity="0.4" />
        <text x="420" y="310" textAnchor="middle"
          fontSize="12" fontFamily="sans-serif" fontWeight="900"
          letterSpacing="1" fill={G2} fillOpacity="0.9">LEED</text>
        <text x="420" y="324" textAnchor="middle"
          fontSize="7" fontFamily="sans-serif" fontWeight="700"
          letterSpacing="2" fill={G1} fillOpacity="0.55">ALIGNED</text>
      </motion.g>

      {/* ── Floating data dots ── */}
      {[[42,180],[48,240],[430,150],[438,200],[424,380],[56,380]].map(([cx,cy],i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="1.5"
          fill={G1} fillOpacity="0.4"
          animate={{ opacity: [0.25, 0.75, 0.25] }}
          transition={{ repeat: Infinity, duration: 2 + (i%3)*0.7, delay: i*0.22 }}
        />
      ))}

      {/* ── Corner brackets ── */}
      <motion.path d="M 448,14 L 466,14 L 466,32"
        stroke={G1} strokeWidth="1.5" strokeOpacity="0.45" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
      <motion.path d="M 14,408 L 14,426 L 32,426"
        stroke={G1} strokeWidth="1.5" strokeOpacity="0.45" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.65 }}
      />

      {/* ── Footer label ── */}
      <motion.text x="58" y="428"
        fontSize="8" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="3.5" fill={G1} fillOpacity="0.45"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3.0 }}
      >
        BUILDING THE FUTURE. SUSTAINABLY.
      </motion.text>
    </svg>
  );
}
