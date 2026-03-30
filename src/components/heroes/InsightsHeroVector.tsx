"use client";

import { motion } from "framer-motion";

const G = "hsl(43,81%,61%)";
const GDIM = "hsl(43,81%,40%)";

/* Mini article card — document icon with text lines */
function ArticleCard({ x, y, delay, size = 1 }: { x: number; y: number; delay: number; size?: number }) {
  const w = 48 * size;
  const h = 58 * size;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      {/* Card body */}
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="5"
        fill={G} fillOpacity="0.1" stroke={G} strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Folded corner */}
      <path
        d={`M${x + w / 2 - 10},${y - h / 2} L${x + w / 2},${y - h / 2 + 10} L${x + w / 2 - 10},${y - h / 2 + 10} Z`}
        fill={G} fillOpacity="0.2" stroke={G} strokeWidth="0.8" strokeOpacity="0.4"
      />
      {/* Text lines */}
      <rect x={x - w / 2 + 8 * size} y={y - h / 2 + 16 * size} width={w - 20 * size} height={3 * size} rx="1.5"
        fill={G} fillOpacity="0.55" />
      <rect x={x - w / 2 + 8 * size} y={y - h / 2 + 23 * size} width={w - 28 * size} height={2.5 * size} rx="1.25"
        fill={G} fillOpacity="0.35" />
      <rect x={x - w / 2 + 8 * size} y={y - h / 2 + 30 * size} width={w - 16 * size} height={2.5 * size} rx="1.25"
        fill={G} fillOpacity="0.3" />
      <rect x={x - w / 2 + 8 * size} y={y - h / 2 + 37 * size} width={w - 24 * size} height={2.5 * size} rx="1.25"
        fill={G} fillOpacity="0.25" />
    </motion.g>
  );
}

export default function InsightsHeroVector() {
  /* Orbit radius */
  const R = 92;
  const CX = 270;
  const CY = 178;

  /* 4 orbiting article cards at NESW positions */
  const orbitNodes = [
    { angle: -90, label: "MARKET", delay: 1.6 },   /* top */
    { angle:   0, label: "INVEST", delay: 1.8 },   /* right */
    { angle:  90, label: "BUILD",  delay: 2.0 },   /* bottom */
    { angle: 180, label: "URBAN",  delay: 2.2 },   /* left */
  ].map((n) => ({
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
      aria-label="Insights and thought leadership illustration"
    >
      {/* ── Outer dashed orbit ring ── */}
      <motion.circle cx={CX} cy={CY} r={R}
        stroke={G} strokeWidth="1" strokeOpacity="0.2" strokeDasharray="7 5" fill="none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />

      {/* ── Slowly rotating outer ring ── */}
      <motion.circle cx={CX} cy={CY} r={R + 18}
        stroke={G} strokeWidth="0.6" strokeOpacity="0.12" strokeDasharray="4 6" fill="none"
        animate={{ rotate: [0, 360] }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
      />

      {/* ── Inner glow rings ── */}
      <motion.circle cx={CX} cy={CY} r={38}
        fill={G} fillOpacity="0.06" stroke={G} strokeWidth="1.5" strokeOpacity="0.3"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />
      <motion.circle cx={CX} cy={CY} r={24}
        fill={G} fillOpacity="0.12" stroke={G} strokeWidth="1.5" strokeOpacity="0.5"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />

      {/* ── Central hub ── */}
      <motion.circle cx={CX} cy={CY} r={13}
        fill={G}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 1.2 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />
      {/* Hub pulse */}
      <motion.circle cx={CX} cy={CY} r={13}
        stroke={G} strokeWidth="1.5" fill="none"
        animate={{ r: [13, 30, 13], opacity: [0.7, 0, 0.7] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut", delay: 1.8 }}
      />
      {/* Hub icon — simplified lightbulb lines */}
      <motion.path
        d={`M${CX - 4},${CY + 4} L${CX + 4},${CY + 4} M${CX},${CY - 5} L${CX},${CY + 2}`}
        stroke="hsl(17 13% 12%)" strokeWidth="2" strokeLinecap="round"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      />

      {/* ── Spokes from hub to orbit nodes ── */}
      {orbitNodes.map((n, i) => (
        <motion.line key={`spoke-${i}`}
          x1={CX} y1={CY} x2={n.cx} y2={n.cy}
          stroke={G} strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: n.delay - 0.3 }}
        />
      ))}

      {/* ── Orbit article cards ── */}
      {orbitNodes.map((n, i) => (
        <ArticleCard key={`card-${i}`} x={n.cx} y={n.cy} delay={n.delay} size={0.88} />
      ))}

      {/* ── Orbit label tags under each card ── */}
      {orbitNodes.map((n, i) => (
        <motion.text key={`label-${i}`}
          x={n.cx} y={n.cy + 38}
          textAnchor="middle"
          fontSize="10" fontFamily="var(--font-body)" fontWeight="700"
          letterSpacing="1.5" fill={G} fillOpacity="0.7"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: n.delay + 0.4 }}
        >
          {n.label}
        </motion.text>
      ))}

      {/* ── Floating corner cards (like in reference) ── */}
      <motion.g
        initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 2.6 }}
      >
        <rect x="415" y="58" width="68" height="78" rx="8"
          fill={G} fillOpacity="0.1" stroke={G} strokeWidth="1.5" strokeOpacity="0.5" />
        {/* doc icon inside */}
        <rect x="427" y="74" width="44" height="4" rx="2" fill={G} fillOpacity="0.6" />
        <rect x="427" y="82" width="32" height="3" rx="1.5" fill={G} fillOpacity="0.4" />
        <rect x="427" y="89" width="40" height="3" rx="1.5" fill={G} fillOpacity="0.35" />
        <rect x="427" y="96" width="28" height="3" rx="1.5" fill={G} fillOpacity="0.3" />
        {/* category pill */}
        <rect x="427" y="108" width="36" height="14" rx="4"
          fill={G} fillOpacity="0.2" stroke={G} strokeWidth="0.8" strokeOpacity="0.5" />
        <text x="445" y="118" textAnchor="middle"
          fontSize="9" fontFamily="var(--font-body)" fontWeight="700"
          letterSpacing="0.8" fill={G} fillOpacity="0.9">INSIGHT</text>
      </motion.g>

      <motion.g
        initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 2.9 }}
      >
        <rect x="415" y="200" width="68" height="78" rx="8"
          fill={G} fillOpacity="0.08" stroke={G} strokeWidth="1" strokeOpacity="0.35" />
        <rect x="427" y="216" width="44" height="4" rx="2" fill={G} fillOpacity="0.5" />
        <rect x="427" y="224" width="30" height="3" rx="1.5" fill={G} fillOpacity="0.35" />
        <rect x="427" y="231" width="40" height="3" rx="1.5" fill={G} fillOpacity="0.3" />
        <rect x="427" y="238" width="24" height="3" rx="1.5" fill={G} fillOpacity="0.25" />
        <rect x="427" y="250" width="36" height="14" rx="4"
          fill={G} fillOpacity="0.15" stroke={G} strokeWidth="0.8" strokeOpacity="0.4" />
        <text x="445" y="260" textAnchor="middle"
          fontSize="9" fontFamily="var(--font-body)" fontWeight="700"
          letterSpacing="0.8" fill={G} fillOpacity="0.8">REPORT</text>
      </motion.g>

      {/* Connecting dashed lines from hub to corner cards */}
      <motion.path d={`M${CX + 38},${CY - 30} Q390,80 415,97`}
        stroke={G} strokeWidth="0.8" strokeOpacity="0.18" strokeDasharray="4 4" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 2.7 }}
      />
      <motion.path d={`M${CX + 38},${CY + 30} Q390,220 415,239`}
        stroke={G} strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="4 4" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 3.0 }}
      />

      {/* ── Travelling dot on orbit ring ── */}
      <motion.circle r="3.5" fill={G}
        animate={{
          cx: [
            CX + R, CX, CX - R, CX, CX + R,
          ],
          cy: [
            CY, CY + R, CY, CY - R, CY,
          ],
        }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear", delay: 2.4 }}
      />

      {/* ── Stars / data dots ── */}
      {[
        [96,44],[78,90],[110,28],[72,68],
        [100,128],[80,160],
      ].map(([cx,cy],i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="1.5"
          fill={G} fillOpacity="0.4"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 + (i%3)*0.7, delay: i*0.22 }}
        />
      ))}
    </svg>
  );
}
