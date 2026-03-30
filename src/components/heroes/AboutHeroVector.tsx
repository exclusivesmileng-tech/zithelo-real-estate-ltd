"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

const CITIES = [
  { name: "Lagos",   cx: 120, cy: 196, delay: 1.55, primary: true  },
  { name: "Accra",   cx:  97, cy: 203, delay: 1.70, primary: false },
  { name: "Nairobi", cx: 262, cy: 208, delay: 1.85, primary: false },
  { name: "J'burg",  cx: 196, cy: 289, delay: 1.95, primary: false },
  { name: "Cairo",   cx: 238, cy:  52, delay: 2.05, primary: false },
];

const DIASPORA = [
  { cx: 415, cy:  55, label: "EUROPE", delay: 2.30 },
  { cx: 430, cy: 130, label: "USA",    delay: 2.50 },
  { cx: 428, cy: 210, label: "UAE",    delay: 2.70 },
];

const CHART_POINTS: [number, number][] = [
  [348, 308], [368, 282], [393, 248],
  [418, 208], [443, 162], [468, 112], [487, 70],
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _GDIM = "hsl(43,81%,40%)";

export default function AboutHeroVector() {
  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-label="Continental vision — Africa city connections illustration"
    >
      {/* Grid */}
      {[1,2,3,4].map((i) => (
        <motion.line key={`hg${i}`} x1="0" y1={i*80} x2="520" y2={i*80}
          stroke="white" strokeOpacity="0.055" strokeWidth="0.7"
          initial={{ pathLength:0 }} animate={{ pathLength:1 }}
          transition={{ duration:1, delay:i*0.07 }} />
      ))}
      {[1,2,3,4,5].map((i) => (
        <motion.line key={`vg${i}`} x1={i*104} y1="0" x2={i*104} y2="360"
          stroke="white" strokeOpacity="0.055" strokeWidth="0.7"
          initial={{ pathLength:0 }} animate={{ pathLength:1 }}
          transition={{ duration:1, delay:i*0.07 }} />
      ))}

      {/* Africa fill */}
      <motion.path
        d="M 128,30 L 196,22 L 248,40 L 276,62 Q 302,98 296,158 L 280,202 L 268,242 Q 248,288 206,308 Q 170,322 142,300 L 108,268 L 92,214 L 102,188 Q 76,200 58,186 Q 56,158 72,132 L 76,94 Q 100,56 128,30 Z"
        fill="white" fillOpacity="0.04"
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1, delay:0.5 }} />
      {/* Africa outline */}
      <motion.path
        d="M 128,30 L 196,22 L 248,40 L 276,62 Q 302,98 296,158 L 280,202 L 268,242 Q 248,288 206,308 Q 170,322 142,300 L 108,268 L 92,214 L 102,188 Q 76,200 58,186 Q 56,158 72,132 L 76,94 Q 100,56 128,30 Z"
        fill="none" stroke="white" strokeWidth="1.4" strokeOpacity="0.18"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:2.2, delay:0.45, ease }} />
      {/* Africa gold dashed */}
      <motion.path
        d="M 128,30 L 196,22 L 248,40 L 276,62 Q 302,98 296,158 L 280,202 L 268,242 Q 248,288 206,308 Q 170,322 142,300 L 108,268 L 92,214 L 102,188 Q 76,200 58,186 Q 56,158 72,132 L 76,94 Q 100,56 128,30 Z"
        fill="none" stroke={G} strokeWidth="0.9" strokeOpacity="0.18" strokeDasharray="6 5"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:2.6, delay:0.9, ease }} />

      {/* City connections */}
      <motion.line x1="120" y1="196" x2="97" y2="203"
        stroke={G} strokeWidth="0.9" strokeOpacity="0.25" strokeDasharray="3 3"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:0.3, delay:2.1 }} />
      <motion.path d="M 120,196 Q 155,250 196,289"
        fill="none" stroke={G} strokeWidth="0.9" strokeOpacity="0.2" strokeDasharray="4 3"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:0.7, delay:2.1 }} />
      <motion.path d="M 262,208 Q 238,252 196,289"
        fill="none" stroke={G} strokeWidth="0.9" strokeOpacity="0.2" strokeDasharray="4 3"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:0.65, delay:2.2 }} />
      <motion.path d="M 238,52 Q 268,140 262,208"
        fill="none" stroke={G} strokeWidth="0.9" strokeOpacity="0.2" strokeDasharray="4 3"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:0.75, delay:2.25 }} />
      <motion.path d="M 120,196 Q 170,110 238,52"
        fill="none" stroke={G} strokeWidth="0.9" strokeOpacity="0.15" strokeDasharray="4 3"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:0.8, delay:2.3 }} />

      {/* City nodes */}
      {CITIES.map((c) => (
        <motion.g key={c.name}>
          <motion.circle cx={c.cx} cy={c.cy} stroke={G} strokeWidth="1.2" fill="none"
            animate={{ r:[c.primary?8:5, c.primary?22:14, c.primary?8:5], opacity:[0.7,0,0.7] }}
            transition={{ repeat:Infinity, duration:c.primary?2:2.8, ease:"easeOut", delay:c.delay+0.5 }} />
          <motion.circle cx={c.cx} cy={c.cy}
            fill={c.primary?G:"white"} fillOpacity={c.primary?1:0.6}
            initial={{ r:0 }} animate={{ r:c.primary?5.5:3.5 }}
            transition={{ duration:0.3, delay:c.delay, ease }} />
          <motion.text
            x={c.cx+(c.cx>175?10:-10)} y={c.cy-10}
            textAnchor={c.cx>175?"start":"end"}
            fontSize="10" fontFamily="sans-serif" fontWeight="700"
            letterSpacing="1.2" fill={G} fillOpacity="0.7"
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ delay:c.delay+0.28 }}>
            {c.name.toUpperCase()}
          </motion.text>
        </motion.g>
      ))}

      {/* Diaspora diamonds */}
      {DIASPORA.map((d) => (
        <motion.g key={d.label}>
          <motion.path
            d={`M${d.cx},${d.cy-7} L${d.cx+7},${d.cy} L${d.cx},${d.cy+7} L${d.cx-7},${d.cy} Z`}
            fill={G} fillOpacity="0.12" stroke={G} strokeWidth="1.2" strokeOpacity="0.55"
            style={{ transformOrigin:`${d.cx}px ${d.cy}px` }}
            initial={{ scale:0 }} animate={{ scale:1 }}
            transition={{ duration:0.35, delay:d.delay, ease }} />
          <motion.text x={d.cx+13} y={d.cy+3}
            fontSize="10" fontFamily="sans-serif" fontWeight="700"
            letterSpacing="1.2" fill={G} fillOpacity="0.65"
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ delay:d.delay+0.22 }}>
            {d.label}
          </motion.text>
        </motion.g>
      ))}

      {/* Diaspora → Lagos arcs */}
      {DIASPORA.map((d, i) => (
        <motion.path key={`arc${i}`}
          d={`M${d.cx-7},${d.cy} Q${Math.round((d.cx+120)/2+15)},${Math.round((d.cy+196)/2-35)} 120,196`}
          fill="none" stroke={G} strokeWidth="1" strokeOpacity="0.22" strokeDasharray="5 4"
          initial={{ pathLength:0 }} animate={{ pathLength:1 }}
          transition={{ duration:0.9, delay:d.delay+0.22, ease }} />
      ))}
      {DIASPORA.map((d, i) => (
        <motion.circle key={`pulse${i}`} cx={120} cy={196} r={2.5} fill={G}
          initial={{ opacity:0, scale:0 }}
          animate={{ opacity:[0,1,0], scale:[0,1.4,0] }}
          transition={{ repeat:Infinity, duration:1.8, delay:d.delay+1.1+i*0.35, ease:"easeOut" }} />
      ))}

      {/* Urbanisation chart */}
      <motion.line x1="340" y1="320" x2="340" y2="52"
        stroke={G} strokeOpacity="0.17" strokeWidth="0.8"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:0.5, delay:2.85 }} />
      <motion.line x1="335" y1="315" x2="496" y2="315"
        stroke={G} strokeOpacity="0.17" strokeWidth="0.8"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:0.5, delay:2.85 }} />
      <motion.path
        d={`M ${CHART_POINTS[0][0]},315 ${CHART_POINTS.map(([x,y]) => `L ${x},${y}`).join(" ")} L ${CHART_POINTS[CHART_POINTS.length-1][0]},315 Z`}
        fill={G} fillOpacity="0.05"
        initial={{ opacity:0 }} animate={{ opacity:1 }}
        transition={{ duration:0.6, delay:4.1 }} />
      <motion.path
        d={CHART_POINTS.map(([x,y], i) => `${i===0?"M":"L"} ${x},${y}`).join(" ")}
        fill="none" stroke={G} strokeWidth="1.6" strokeOpacity="0.6"
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:1.1, delay:2.95, ease }} />
      {CHART_POINTS.map(([x,y], i) => (
        <motion.circle key={`cp${i}`} cx={x} cy={y} fill={G} fillOpacity="0.85"
          initial={{ r:0 }} animate={{ r:3 }}
          transition={{ duration:0.2, delay:2.95+i*0.12 }} />
      ))}
      <motion.text x="342" y="47"
        fontSize="9" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="1" fill={G} fillOpacity="0.55"
        initial={{ opacity:0 }} animate={{ opacity:1 }}
        transition={{ delay:4.2 }}>
        URBAN GROWTH 2050
      </motion.text>

      {/* Corner brackets */}
      <motion.path d="M 480,10 L 510,10 L 510,42"
        stroke={G} strokeWidth="1.5" strokeOpacity="0.38" fill="none"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:0.4, delay:0.7 }} />
      <motion.path d="M 10,318 L 10,350 L 44,350"
        stroke={G} strokeWidth="1.5" strokeOpacity="0.38" fill="none"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:0.4, delay:0.85 }} />

      {/* Footer */}
      <motion.text x="58" y="351"
        fontSize="9" fontFamily="sans-serif" fontWeight="700"
        letterSpacing="3.8" fill={G} fillOpacity="0.45"
        initial={{ opacity:0 }} animate={{ opacity:1 }}
        transition={{ duration:0.5, delay:3.4 }}>
        CONTINENTAL VISION
      </motion.text>

      {/* Floating particles */}
      {[{ cx:155,cy:38 },{ cx:210,cy:17 },{ cx:280,cy:48 }].map((p, i) => (
        <motion.circle key={`fp${i}`} cx={p.cx} cy={p.cy} r="2.2" fill={G} fillOpacity="0.6"
          animate={{ y:[0,-9,0], opacity:[0.6,1,0.6] }}
          transition={{ duration:2.4+i*0.4, repeat:Infinity, delay:1.5+i*0.3, ease:"easeInOut" }} />
      ))}
    </svg>
  );
}
