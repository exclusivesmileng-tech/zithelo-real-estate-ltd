"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// City urbanisation pulse centres
const CITIES = [
  { cx: 148, cy: 178, r: 0,  delay: 1.2, label: "LAGOS"    },
  { cx: 258, cy: 175, r: 0,  delay: 1.6, label: "NAIROBI"  },
  { cx: 220, cy:  78, r: 0,  delay: 1.4, label: "CAIRO"    },
  { cx: 198, cy: 262, r: 0,  delay: 1.8, label: "J'BURG"   },
];

// Population growth bar chart (right side) — normalised heights
const BARS = [48, 68, 90, 118, 148, 178, 200];
const BAR_X0 = 348;
const CHART_Y = 300;

export default function AfricaVisionHeroVector() {
  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-label="Africa urbanisation wave illustration"
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

      {/* Africa region — soft filled ellipse */}
      <motion.ellipse
        cx="198" cy="178" rx="108" ry="130"
        fill="white" fillOpacity="0.04"
        stroke="white" strokeWidth="1.2" strokeOpacity="0.12"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: "198px 178px" }}
        transition={{ duration: 1.1, delay: 0.5, ease }}
      />
      {/* Gold dashed inner border */}
      <motion.ellipse
        cx="198" cy="178" rx="108" ry="130"
        fill="none" stroke={G} strokeWidth="0.85" strokeOpacity="0.2" strokeDasharray="6 5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, delay: 0.9, ease }}
      />

      {/* Urbanisation sonar rings per city */}
      {CITIES.map((c) =>
        [0, 1, 2].map((ri) => (
          <motion.circle key={`${c.label}-ring${ri}`}
            cx={c.cx} cy={c.cy}
            stroke={G} strokeWidth="0.9" fill="none"
            animate={{
              r:       [2, 52],
              opacity: [0.6, 0],
              strokeOpacity: [0.45, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.8,
              delay: c.delay + ri * 0.9,
              ease: "easeOut",
            }}
          />
        ))
      )}

      {/* City dots */}
      {CITIES.map((c) => (
        <motion.g key={c.label}>
          <motion.circle cx={c.cx} cy={c.cy} fill={G}
            initial={{ r: 0 }} animate={{ r: c.label === "LAGOS" ? 5.5 : 3.5 }}
            transition={{ duration: 0.3, delay: c.delay, ease }}
          />
          <motion.text
            x={c.cx + (c.cx > 200 ? 10 : -10)}
            y={c.cy - 9}
            textAnchor={c.cx > 200 ? "start" : "end"}
            fontSize="10" fontFamily="sans-serif" fontWeight="700"
            letterSpacing="1.2" fill={G} fillOpacity="0.65"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: c.delay + 0.3 }}
          >
            {c.label}
          </motion.text>
        </motion.g>
      ))}

      {/* City cross-connection lines */}
      {[
        [148, 178, 258, 175],
        [148, 178, 220,  78],
        [148, 178, 198, 262],
        [258, 175, 198, 262],
        [220,  78, 258, 175],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line key={`cl${i}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={G} strokeWidth="0.7" strokeOpacity="0.15" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 2.2 + i * 0.1, ease }}
        />
      ))}

      {/* Population growth chart — right panel */}
      {/* Axes */}
      <motion.line x1="338" y1="308" x2="338" y2="055"
        stroke={G} strokeOpacity="0.18" strokeWidth="0.8"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 2.6 }}
      />
      <motion.line x1="334" y1="302" x2="500" y2="302"
        stroke={G} strokeOpacity="0.18" strokeWidth="0.8"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 2.6 }}
      />
      {/* Bars */}
      {BARS.map((h, i) => (
        <motion.rect key={`bar${i}`}
          x={BAR_X0 + i * 22} y={CHART_Y - h} width="16" height={h}
          fill={G} fillOpacity="0.16"
          stroke={G} strokeWidth="0.8" strokeOpacity="0.45"
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          style={{ transformOrigin: `${BAR_X0 + i * 22 + 8}px ${CHART_Y}px` }}
          transition={{ duration: 0.45, delay: 2.75 + i * 0.09, ease }}
        />
      ))}
      {/* Bar top gold line (tallest bar accent) */}
      <motion.line
        x1={BAR_X0 + 6 * 22} y1={CHART_Y - 200} x2={BAR_X0 + 6 * 22 + 16} y2={CHART_Y - 200}
        stroke={G} strokeWidth="2" strokeOpacity="0.75"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.2, delay: 3.5 }}
      />

      {/* "900M" big text */}
      <motion.text x="370" y="44"
        fontSize="28" fontFamily="sans-serif" fontWeight="800"
        letterSpacing="1" fill={G} fillOpacity="0.55"
        textAnchor="middle"
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 3.6 }}
      >
        900M
      </motion.text>
      <motion.text x="370" y="58"
        fontSize="9" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="2.5" fill={G} fillOpacity="0.42"
        textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3.9 }}
      >
        NEW URBAN RESIDENTS
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

      {/* "URBAN FUTURE" footer */}
      <motion.text x="58" y="351"
        fontSize="9" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="3.8" fill={G} fillOpacity="0.45"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3.8 }}
      >
        URBAN FUTURE 2050
      </motion.text>

      {/* Scatter growth dots */}
      {[
        { cx: 165, cy: 145 }, { cx: 232, cy: 210 }, { cx: 180, cy: 230 },
        { cx: 245, cy: 155 }, { cx: 155, cy: 215 }, { cx: 205, cy: 130 },
      ].map((p, i) => (
        <motion.circle key={`gd${i}`}
          cx={p.cx} cy={p.cy} r="1.8" fill={G} fillOpacity="0.5"
          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: 1.2 + i * 0.2, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}
