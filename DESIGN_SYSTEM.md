# DESIGN SYSTEM — COMPLETE CONCEPT EXPORT
> Design concepts extracted from Zithelo Real Estate codebase.
> Adapted for new property development company with **Royal Blue + White** brand colours.

---

## TABLE OF CONTENTS
1. [Tech Stack](#1-tech-stack)
2. [Typography System](#2-typography-system)
3. [Colour Palette](#3-colour-palette)
4. [Brand Gradient — Signature Effect](#4-brand-gradient--signature-effect)
5. [Global Animation Language](#5-global-animation-language)
6. [Global CSS Utilities](#6-global-css-utilities)
7. [Navbar Design](#7-navbar-design)
8. [Homepage Hero](#8-homepage-hero)
9. [Inner Page Hero — `<PageHero />`](#9-inner-page-hero--pagehero-)
10. [Homepage Section Map](#10-homepage-section-map)
11. [Footer Design](#11-footer-design)
12. [Reusable Component Patterns](#12-reusable-component-patterns)
13. [Spacing & Layout System](#13-spacing--layout-system)
14. [Interaction Principles](#14-interaction-principles)
15. [Page Inventory](#15-page-inventory)

---

## 1. TECH STACK

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Animations | Framer Motion |
| CMS | Sanity v5 (optional — works with static fallback data) |
| UI primitives | shadcn/ui (Radix UI base) |
| Icons | Lucide React |
| Fonts | Google Fonts — Fira Sans + DM Sans |

---

## 2. TYPOGRAPHY SYSTEM

```html
<!-- In <head> or layout.tsx -->
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

```css
:root {
  --font-display: 'Fira Sans', sans-serif;
  --font-body:    'DM Sans',   sans-serif;
}

h1, h2, h3, h4, h5, h6 { font-family: var(--font-display); }
body                    { font-family: var(--font-body); }
```

### Scale & usage rules

| Element | Classes |
|---|---|
| Hero H1 | `font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05]` |
| Page hero H1 | `font-display font-bold text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.08]` |
| Section H2 | `font-display font-bold text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.06]` |
| Section H3 | `font-display font-bold text-xl md:text-2xl` |
| Card H3 | `font-display font-bold text-[1.15rem] leading-snug` |
| Body large | `font-body text-lg md:text-xl leading-relaxed` |
| Body base | `font-body text-base leading-relaxed` |
| Body small | `font-body text-sm leading-relaxed` |
| Eyebrow / label | `font-body font-semibold text-[10–11px] tracking-[0.25–0.3em] uppercase` |
| Nav links | `font-display font-bold text-[11.5px] tracking-[0.12em] uppercase` |
| Step numbers | `font-display font-black text-6xl leading-none` |

---

## 3. COLOUR PALETTE

### Brand colours
```
Royal Blue:       hsl(225, 73%, 57%)   →  #4169E1
Royal Blue Light: hsl(220, 80%, 68%)   →  lighter, for gradients
Royal Blue Dark:  hsl(225, 85%, 42%)   →  deeper, for gradients
Navy (dark bg):   hsl(225, 45%, 10%)   →  #0D1526 — replaces charcoal
Deep Navy:        hsl(225, 50%, 7%)    →  #090F1C — ultra-dark sections
White:            #FFFFFF              →  primary foreground on dark
Off-white:        hsl(220, 20%, 97%)   →  #F4F6FB — warm white tinted blue
```

### CSS Custom Properties (globals.css)

```css
@layer base {
  :root {
    /* ── Background / Foreground ── */
    --background:         220 20% 97%;   /* off-white, cool tint */
    --foreground:         225 45% 10%;   /* deep navy */

    /* ── Card surfaces ── */
    --card:               220 18% 94%;
    --card-foreground:    225 45% 10%;

    /* ── Primary accent — ROYAL BLUE ── */
    --primary:            225 73% 57%;   /* hsl → #4169E1 */
    --primary-foreground: 0   0%  100%;  /* white on blue */

    /* ── Secondary — Medium Blue ── */
    --secondary:          220 50% 45%;
    --secondary-foreground: 0  0% 100%;

    /* ── Muted ── */
    --muted:              220 15% 90%;
    --muted-foreground:   225 15% 40%;

    /* ── Borders & Inputs ── */
    --border:             220 15% 85%;
    --input:              220 15% 85%;
    --ring:               225 73% 57%;

    /* ── Border radius ── */
    --radius: 0.25rem;   /* sharp by default; cards use rounded-2xl on mobile */

    /* ── Named tokens ── */
    --royal-blue:         225 73% 57%;   /* primary brand blue */
    --royal-blue-light:   220 80% 68%;   /* shimmer highlight */
    --royal-blue-dark:    225 85% 42%;   /* deep anchor */
    --navy:               225 45% 10%;   /* dark section backgrounds */
    --deep-navy:          225 50%  7%;   /* ultra-dark sections */
    --sky:                210 85% 65%;   /* accent sky blue */
    --warm-white:         220 20% 97%;
    --cool-grey:          220 10% 55%;
  }

  .dark {
    --background:         225 45% 10%;
    --foreground:         220 20% 92%;
    --card:               225 40% 14%;
    --card-foreground:    220 20% 92%;
    --primary:            225 73% 57%;   /* royal blue stays consistent */
    --primary-foreground: 0   0% 100%;
    --muted:              225 30% 18%;
    --muted-foreground:   220 10% 65%;
    --border:             225 30% 20%;
    --input:              225 30% 20%;
    --warm-white:         220 20% 92%;
    --cool-grey:          220 10% 55%;
  }
}
```

### Section background reference

| Section type | Background value |
|---|---|
| Light sections | `bg-background` → `hsl(220,20%,97%)` |
| Card surface sections | `bg-card` → `hsl(220,18%,94%)` |
| Dark navy sections | `bg-[hsl(var(--navy))]` → `#0D1526` |
| Ultra-dark sections | `bg-[#090F1C]` |
| Sustainability / green sections | `bg-[#071a0e]` *(unchanged)* |
| Browser chrome / theme colour | `#4169E1` |

---

## 4. BRAND GRADIENT — SIGNATURE EFFECT

### Class: `brand-gradient` (fill — replaces `gold-gradient`)
```css
.brand-gradient {
  background: linear-gradient(
    135deg,
    hsl(220, 80%, 68%) 0%,    /* royal blue light */
    hsl(225, 73%, 57%) 50%,   /* royal blue */
    hsl(225, 85%, 42%) 100%   /* royal blue dark */
  );
}
```
**Used on:** CTA buttons, icon backgrounds, status badges, bottom tab active states, divider rules, floating badges.

---

### Class: `brand-gradient-text` (animated shimmer — THE signature effect)
```css
.brand-gradient-text {
  background: linear-gradient(
    90deg,
    hsl(225, 85%, 42%)  0%,    /* deep blue */
    hsl(220, 80%, 68%)  25%,   /* light blue shimmer */
    hsl(225, 73%, 57%)  50%,   /* royal blue */
    hsl(210, 90%, 80%)  65%,   /* sky highlight */
    hsl(225, 73%, 57%)  75%,   /* royal blue */
    hsl(225, 85%, 42%)  100%   /* deep blue */
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: blueShimmer 4s linear infinite;
}

@keyframes blueShimmer {
  0%   { background-position: 200% center; }
  100% { background-position: -200% center; }
}
```
**Used on:** Hero headline accent line, section H2 accent word, step numbers, animated statistics, mobile active nav links, tagline accents.

---

### Class: `brand-border`
```css
.brand-border { border-color: hsl(225, 73%, 57%); }
```

### White shimmer variant (for on-image / on-dark use)
```css
.white-shimmer-text {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.7)  0%,
    rgba(255,255,255,1.0) 40%,
    hsl(220, 80%, 85%)    60%,
    rgba(255,255,255,1.0) 75%,
    rgba(255,255,255,0.7) 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: blueShimmer 4s linear infinite;
}
```
**Use on dark navy/blue section headlines** for a premium white-shimmer variation.

---

## 5. GLOBAL ANIMATION LANGUAGE

Powered by **Framer Motion**. Every animation follows a luxury, deliberate pacing philosophy.

### Core easing curve
```js
ease: [0.25, 0.46, 0.45, 0.94]  // used everywhere — feels premium
```

### Standard entrance animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
>
```

### Stagger cascade (for card/list groups)
```tsx
transition={{ duration: 0.65, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
```

### Slide in from left/right
```tsx
// From left
initial={{ opacity: 0, x: -32 }}
whileInView={{ opacity: 1, x: 0 }}

// From right
initial={{ opacity: 0, x: 32 }}
whileInView={{ opacity: 1, x: 0 }}
```

### Hero fade-up (entrance — no scroll trigger)
```tsx
initial={{ opacity: 0, y: 28 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
```

### Infinite scroll indicator (bouncing chevron)
```tsx
animate={{ y: [0, 6, 0] }}
transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
```

### Infinite marquee (ticker bar)
```tsx
animate={{ x: ["0%", "-50%"] }}
transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
// Render items × 2 so it loops seamlessly
```

### Pulsing ambient orb (dark section backgrounds)
```tsx
// Royal blue orb — replaces gold orb
animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
style={{ background: "radial-gradient(circle, hsl(225 73% 57%) 0%, transparent 65%)" }}
```

### CTA button pulsing glow (navbar contact button)
```tsx
// Royal blue pulse — replaces gold pulse
animate={{
  boxShadow: [
    "0 0 10px 3px rgba(65,105,225,0.5), 0 0 20px 6px rgba(65,105,225,0.25)",
    "0 0 20px 8px rgba(65,105,225,0.85), 0 0 36px 12px rgba(65,105,225,0.4)",
    "0 0 10px 3px rgba(65,105,225,0.5), 0 0 20px 6px rgba(65,105,225,0.25)",
  ],
}}
transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
```

### Footer CTA banner shimmer
```tsx
animate={{ x: ["-100%", "100%"] }}
transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)" }}
```

---

### Special components

#### `<WordReveal />` — Hero headline word-by-word entry
Each word slides up from `y: 110%` with overflow hidden, staggered by delay.
```tsx
// Usage
<WordReveal text="Building Premium" className="block" delay={0.25} stagger={0.09} />
<WordReveal text="Properties" className="block brand-gradient-text" delay={0.5} stagger={0.1} />
```
```tsx
// Implementation
words.map((word, i) => (
  <span className="inline-block overflow-hidden leading-none">
    <motion.span
      className="inline-block"
      initial={{ y: "110%", opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.55, delay: delay + i * stagger, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {word}
    </motion.span>
  </span>
))
```

#### `<TiltCard />` — 3D perspective tilt on mouse move
```tsx
// Wraps project cards and premium cards
<TiltCard maxTilt={6}>
  <YourCard />
</TiltCard>
```
Implementation: `useMotionValue + useSpring` tracking mouse position, `rotateX/rotateY` with `perspective: 900`, white glare overlay `linear-gradient(135deg, rgba(255,255,255,1) 0%, transparent 60%)`.

#### `<MagneticButton />` — CTAs pull toward cursor
```tsx
<MagneticButton strength={0.35}>
  <Link href="...">Explore Projects</Link>
</MagneticButton>
```
Implementation: `useMotionValue + useSpring` (`stiffness: 220, damping: 18`), translates element toward cursor on hover.

#### `<AnimatedSection />` — Reusable scroll-reveal wrapper
```tsx
<AnimatedSection delay={0.1}>
  <YourContent />
</AnimatedSection>
```
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
>
```

#### `<SocialProofBar />` — Animated count-up stats
Numbers animate from 0 → final value using `requestAnimationFrame` with cubic ease-out, triggered `whileInView`.

---

## 6. GLOBAL CSS UTILITIES

Paste into `globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * { @apply border-border; }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  h1, h2, h3, h4, h5, h6 { font-family: var(--font-display); }
}

@layer components {
  /* ── Brand gradient fill (royal blue) ── */
  .brand-gradient {
    background: linear-gradient(
      135deg,
      hsl(220, 80%, 68%) 0%,
      hsl(225, 73%, 57%) 50%,
      hsl(225, 85%, 42%) 100%
    );
  }

  /* ── Brand shimmer text (animated) ── */
  .brand-gradient-text {
    background: linear-gradient(
      90deg,
      hsl(225, 85%, 42%)  0%,
      hsl(220, 80%, 68%)  25%,
      hsl(225, 73%, 57%)  50%,
      hsl(210, 90%, 80%)  65%,
      hsl(225, 73%, 57%)  75%,
      hsl(225, 85%, 42%)  100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: blueShimmer 4s linear infinite;
  }

  /* ── White shimmer text (for dark/navy sections) ── */
  .white-shimmer-text {
    background: linear-gradient(
      90deg,
      rgba(255,255,255,0.7)  0%,
      rgba(255,255,255,1.0) 40%,
      hsl(220, 80%, 88%)    60%,
      rgba(255,255,255,1.0) 75%,
      rgba(255,255,255,0.7) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: blueShimmer 4s linear infinite;
  }

  .brand-border { border-color: hsl(225, 73%, 57%); }

  .section-padding { @apply px-6 md:px-12 lg:px-24 py-12 md:py-20 lg:py-32; }

  /* Overlay for hero images */
  .luxury-overlay {
    background: linear-gradient(
      180deg,
      rgba(13, 21, 38, 0.65) 0%,
      rgba(13, 21, 38, 0.35) 40%,
      rgba(13, 21, 38, 0.75) 100%
    );
  }

  .text-balance { text-wrap: balance; }
  .mobile-bottom-safe { @apply pb-20 lg:pb-0; }
}

@layer utilities {
  .animate-fade-up        { animation: fadeUp 0.8s ease-out forwards; }
  .animate-fade-in-slow   { animation: fadeInSlow 1.2s ease-out forwards; }
  .no-scrollbar           { -ms-overflow-style: none; scrollbar-width: none; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
}

@keyframes fadeUp      { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform: translateY(0); } }
@keyframes fadeInSlow  { from { opacity:0; } to { opacity:1; } }
@keyframes blueShimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }

/* Text selection: white on royal blue */
::selection { background: hsl(225, 73%, 57%); color: #ffffff; }
```

---

## 7. NAVBAR DESIGN

### Behaviour specification
- Position: `fixed top-0 left-0 right-0 z-50`
- **Transparent** on homepage at scroll position 0
- **Frosted glass** after `window.scrollY > 48px`
- Light mode glass: `hsl(0 0% 100% / 0.96)` | Dark mode: `hsl(225 45% 8% / 0.96)`
- Uses `backdrop-blur-md` + animated `border-b`
- Transition: `duration: 0.4, ease: "easeInOut"` via `motion.div`

### Logo behaviour
```tsx
// Shrinks from 42px to 34px on scroll
<motion.img
  animate={{ height: scrolled ? 34 : 42 }}
  transition={{ duration: 0.4, ease: "easeInOut" }}
/>

// Logo switches: white version on hero (before scroll) / coloured on scroll/other pages
const logoSrc = (isHeroPage && !scrolled)
  ? "/images/logo-white.png"
  : (theme === "dark" ? "/images/logo-white.png" : "/images/logo-colored.png");
```

### Desktop nav links
```tsx
// Active state: white text on navy pill
className={`... ${
  isActive
    ? "text-white bg-[hsl(var(--navy))] shadow-sm"
    : inactiveColor
}`}

// On homepage before scroll — inactive links are white
const inactiveColor = isHeroPage && !scrolled
  ? "text-white/75 hover:text-white"
  : "text-muted-foreground hover:text-foreground";
```

### Dropdown menus
```tsx
<motion.div
  initial={{ opacity: 0, y: 6 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 6 }}
  transition={{ duration: 0.18, ease: "easeOut" }}
  className="absolute top-full left-1/2 -translate-x-1/2 pt-1 z-50 min-w-[168px]"
>
  <div className="border border-border rounded-xl py-2 shadow-2xl shadow-black/20 overflow-hidden">
    {/* Royal blue accent top line */}
    <div className="absolute top-0 left-0 right-0 h-[2px] brand-gradient opacity-70" />
    {children.map(child => (
      <Link className="flex items-center gap-3 px-5 py-2.5 text-[11.5px] tracking-[0.12em] uppercase font-display font-bold">
        <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary/60" />
        {child.label}
      </Link>
    ))}
  </div>
</motion.div>
```

### Contact CTA button (pulsing royal blue glow)
```tsx
<motion.a
  animate={{
    boxShadow: [
      "0 0 10px 3px rgba(65,105,225,0.5), 0 0 20px 6px rgba(65,105,225,0.25)",
      "0 0 20px 8px rgba(65,105,225,0.85), 0 0 36px 12px rgba(65,105,225,0.4)",
      "0 0 10px 3px rgba(65,105,225,0.5), 0 0 20px 6px rgba(65,105,225,0.25)",
    ],
  }}
  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
  className="ml-1 px-5 py-2 text-[11.5px] tracking-[0.12em] uppercase font-display font-bold brand-gradient text-white rounded-sm"
>
  Contact
</motion.a>
```

### Mobile — Bottom tab bar (iOS-style)
```tsx
<div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/92 backdrop-blur-xl border-t border-border/60"
  style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
  <div className="flex items-stretch justify-around px-2">
    {tabs.map(tab => (
      <Link className="flex flex-col items-center gap-1 py-2.5">
        {/* Active: royal blue gradient pill */}
        <span className={`flex items-center justify-center w-9 h-9 rounded-2xl transition-all duration-200 ${
          isActive ? "brand-gradient shadow-md shadow-primary/30" : ""
        }`}>
          <Icon size={18} className={isActive ? "text-white" : "text-muted-foreground"} />
        </span>
        <span className={`text-[9px] tracking-wide font-body font-semibold ${
          isActive ? "text-primary" : "text-muted-foreground"
        }`}>{tab.label}</span>
      </Link>
    ))}
  </div>
</div>
```

### Mobile — Full-screen drawer (slides up from bottom)
```tsx
<motion.div
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "100%" }}
  transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
  className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl overflow-hidden shadow-2xl"
  style={{ maxHeight: "88vh" }}
>
  {/* Pull handle */}
  <div className="flex justify-center pt-3">
    <div className="w-10 h-1 rounded-full bg-border" />
  </div>
  {/* Royal blue accent line */}
  <div className="h-px mx-6 mt-3 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

  {/* Nav links — numbered, large, active = brand-gradient-text */}
  {navLinks.map((link, i) => (
    <Link className={`flex items-center gap-4 px-4 py-4 rounded-2xl ${isActive ? "bg-primary/8" : ""}`}>
      <span className="text-[10px] text-primary/40 font-body w-5 tabular-nums">
        {String(i + 1).padStart(2, "0")}
      </span>
      <span className={`font-display text-xl font-bold flex-1 ${isActive ? "brand-gradient-text" : "text-foreground"}`}>
        {link.label}
      </span>
      {isActive && <span className="w-2 h-2 rounded-full brand-gradient" />}
    </Link>
  ))}
</motion.div>
```

---

## 8. HOMEPAGE HERO

Full-viewport video/image hero with parallax scroll and text fade.

### Structure
```tsx
<section ref={heroRef} className="relative h-screen min-h-[680px] flex items-center overflow-hidden">

  {/* ── Background video or image ── */}
  <motion.video
    style={{ y: imgY }}
    className="absolute inset-0 w-full h-[115%] object-cover -top-[7.5%]"
    autoPlay muted loop playsInline preload="metadata"
    src="/videos/hero.mp4"
  />

  {/* ── Overlays ── */}
  <div className="absolute inset-0 luxury-overlay" />
  {/* Navy gradient from left — keeps text readable */}
  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(225,45%,8%)]/70 via-[hsl(225,45%,8%)]/25 to-transparent" />
  {/* Optional film grain noise */}
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      backgroundRepeat: "repeat",
      backgroundSize: "128px"
    }}
  />

  {/* ── Text content — parallaxes slower than video ── */}
  <motion.div style={{ y: textY, opacity }} className="relative z-10 w-full px-6 md:px-12 lg:px-24">
    <div className="max-w-[1400px] mx-auto text-center">

      {/* Eyebrow with flanking lines */}
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        animate={{ opacity: 1, letterSpacing: "0.25em" }}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="text-xs tracking-[0.25em] uppercase text-primary mb-6 font-body font-semibold inline-flex items-center gap-3"
      >
        <span className="w-8 h-px bg-primary" />
        COMPANY NAME
        <span className="w-8 h-px bg-primary" />
      </motion.p>

      {/* H1 with WordReveal — second line gets brand shimmer or white shimmer */}
      <h1 className="font-display font-bold text-white leading-[1.05] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]">
        <WordReveal text="First Line of Headline" className="block" delay={0.25} stagger={0.09} />
        <WordReveal text="Second Line Accent" className="block brand-gradient-text" delay={0.5} stagger={0.1} />
      </h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        className="mt-7 text-lg md:text-xl text-white/75 font-body max-w-2xl mx-auto leading-relaxed"
      >
        Your site tagline or hero subtitle copy here.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-10 flex items-center justify-center gap-3 px-4"
      >
        <MagneticButton className="flex-1 md:flex-none">
          <Link href="/projects"
            className="group inline-flex items-center gap-2 px-6 py-4 md:px-8 brand-gradient text-white font-body font-semibold text-sm tracking-wide rounded-2xl md:rounded-sm hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/25 w-full justify-center">
            Explore Properties
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </MagneticButton>
        <MagneticButton className="flex-1 md:flex-none">
          <Link href="/about"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 md:px-8 border border-white/30 text-white font-body font-semibold text-sm tracking-wide rounded-2xl md:rounded-sm hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm w-full">
            Learn More
          </Link>
        </MagneticButton>
      </motion.div>
    </div>
  </motion.div>

  {/* ── Scroll cue ── */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.4, duration: 1 }}
    className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
  >
    <span className="text-sm tracking-[0.12em] uppercase text-white/50 font-body">Scroll</span>
    <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
      <ChevronDown size={16} className="text-white/40" />
    </motion.div>
  </motion.div>

  {/* ── Marquee bar — bottom of hero ── */}
  <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/15 bg-[hsl(225,45%,8%)]/60 backdrop-blur-sm overflow-hidden py-3">
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
      className="flex whitespace-nowrap"
    >
      {[...marqueeItems, ...marqueeItems].map((item, i) => (
        <span key={i} className="inline-flex items-center gap-4 px-5 text-xs md:text-sm tracking-[0.12em] uppercase text-white/85 font-display font-semibold">
          {item}
          {/* Royal blue dot separator */}
          <span className="w-1.5 h-1.5 rounded-full bg-primary/90 shrink-0" />
        </span>
      ))}
    </motion.div>
  </div>

</section>
```

### Parallax setup
```tsx
const heroRef = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
const imgY    = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
```

---

## 9. INNER PAGE HERO — `<PageHero />`

Used for all inner pages. Background image + optional right-side vector illustration.

### Props
```tsx
interface PageHeroProps {
  title: string;
  titleAccent?: string;   // renders on new line with brand-gradient-text
  subtitle?: string;
  image?: string;
  breadcrumb?: string;
  vector?: ReactNode;     // SVG illustration, desktop right column
}
```

### Full implementation
```tsx
const PageHero = ({ title, titleAccent, subtitle, image, breadcrumb, vector }) => (
  <section className="relative min-h-[380px] md:min-h-[520px] lg:min-h-[600px] flex items-end overflow-hidden">

    {image && <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />}

    {/* Overlays */}
    <div className="absolute inset-0 luxury-overlay" />
    <div className="absolute inset-0 bg-gradient-to-r from-[hsl(225,45%,8%)]/80 via-[hsl(225,45%,8%)]/40 to-[hsl(225,45%,8%)]/15" />
    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(225,45%,8%)]/65 via-transparent to-transparent" />

    <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-24 pb-16 pt-32">
      <div className={`grid grid-cols-1 ${vector ? "lg:grid-cols-2" : ""} gap-12 items-end`}>

        {/* Text side */}
        <div>
          {/* Breadcrumb pill */}
          {breadcrumb && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/15 backdrop-blur-sm">
                {/* Royal blue dot */}
                <span className="w-1.5 h-1.5 rounded-full brand-gradient" />
                <span className="text-sm tracking-[0.1em] uppercase font-body font-semibold text-primary">
                  {breadcrumb}
                </span>
              </span>
            </motion.div>
          )}

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.08]"
          >
            {title}
            {titleAccent && (<><br /><span className="brand-gradient-text">{titleAccent}</span></>)}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-5 text-base md:text-lg text-white/65 font-body leading-relaxed max-w-md">
              {subtitle}
            </motion.p>
          )}

          {/* Royal blue rule + scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex items-center gap-5">
            <div className="h-[2px] w-14 brand-gradient rounded-full" />
            <span className="text-[9px] tracking-[0.25em] uppercase font-body font-semibold text-white/35">Scroll</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
              <ChevronDown size={13} className="text-primary opacity-60" />
            </motion.div>
          </motion.div>
        </div>

        {/* Vector side — desktop only */}
        {vector && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:flex items-end justify-center pb-4">
            {vector}
          </motion.div>
        )}
      </div>
    </div>
  </section>
);
```

> **SVG vectors:** Each inner page has a unique decorative SVG illustration.
> Use royal blue (`hsl(225,73%,57%)`), light blue (`hsl(220,80%,68%)`), and white as the palette.
> Abstract architectural / property-related shapes. Transparent background.

---

## 10. HOMEPAGE SECTION MAP

Every section listed in page order with full design specification.

---

### SECTION A — "Why Choose Us" (Dark navy pillars)

```
Background:  bg-[hsl(var(--navy))]  (#0D1526)
Decorative:  2 animated pulsing royal blue orb radial gradients (top-left + bottom-right)
Layout:      2-col header grid + 4-col cards (horizontal scroll on mobile)
```

**Ambient orbs:**
```tsx
{/* Top-left orb */}
<motion.div
  animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.14, 0.07] }}
  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
  className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
  style={{ background: "radial-gradient(circle, hsl(225 73% 57%) 0%, transparent 65%)" }}
/>
{/* Bottom-right orb */}
<motion.div
  animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.10, 0.04] }}
  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
  className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
  style={{ background: "radial-gradient(circle, hsl(225 73% 57%) 0%, transparent 65%)" }}
/>
```

**Header:**
```tsx
<p className="text-sm tracking-[0.12em] uppercase text-primary mb-4 font-body font-semibold">
  Why Choose [Company]
</p>
<h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-[1.04]">
  Built Different.<br />
  <span className="brand-gradient-text">Delivered Differently.</span>
</h2>
```

**Pillar cards (4 across):**
```tsx
<div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar">
  {pillars.map((card, i) => (
    <motion.div
      className="group relative flex flex-col border border-white/10 rounded-2xl md:rounded-sm p-6 md:p-8 hover:border-primary/60 transition-all duration-500 overflow-hidden snap-start shrink-0 w-[80vw] sm:w-[55vw] md:w-auto"
    >
      {/* Hover: subtle blue fill */}
      <div className="absolute inset-0 brand-gradient opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none" />
      {/* Hover: top glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Large step number — royal blue shimmer */}
      <span className="font-display text-6xl font-black brand-gradient-text leading-none mb-8 select-none">
        {card.num}
      </span>
      <h3 className="font-display text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
        {card.title}
      </h3>
      <p className="text-white/55 font-body text-sm leading-relaxed flex-1">{card.desc}</p>

      <div className="mt-8 pt-5 border-t border-white/10 group-hover:border-primary/30 transition-colors duration-300">
        <span className="text-sm tracking-[0.1em] uppercase text-primary font-body font-semibold">{card.detail}</span>
      </div>
    </motion.div>
  ))}
</div>
```

---

### SECTION B — "Who We Are" (Light, editorial two-col)

```
Background:  bg-card + diagonal royal blue line texture (opacity ~0.025)
Layout:      2-col — image stack left / content right
```

**Background texture:**
```tsx
<div className="absolute inset-0 pointer-events-none opacity-[0.025]"
  style={{ backgroundImage: `repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(65,105,225,0.15) 40px,rgba(65,105,225,0.15) 41px)` }} />
```

**Section label:**
```tsx
<div className="flex items-center gap-4 mb-16 md:mb-20">
  <div className="h-px w-10 brand-gradient rounded-full" />
  <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-body font-semibold">Who We Are</p>
</div>
```

**Image side (left):**
- `aspect-[4/5]` image, `hover:scale-105 transition-transform duration-700`
- Bottom gradient `from-[hsl(225,45%,8%)]/40 via-transparent to-transparent`
- **Floating stat card** (bottom-right): `bg-background border border-border shadow-2xl`
- **Brand corner accent** (top-right): 2px royal blue horizontal + 2px royal blue vertical line
- **Floating HQ card** (top-left): `bg-[hsl(var(--navy))] border border-border rounded-2xl shadow-xl`

**Content side (right):**
```tsx
<h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.06] mb-8">
  More Than a Company.<br />
  <span className="brand-gradient-text">A Vision for the Future.</span>
</h2>

{/* Callout info card */}
<div className="flex items-start gap-4 bg-background border border-border rounded-xl p-5 mb-8">
  <div className="w-10 h-10 rounded-full brand-gradient flex items-center justify-center shrink-0">
    <MapPin size={16} className="text-white" />
  </div>
  <div>
    <p className="text-[10px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-1">Eyebrow Label</p>
    <p className="font-display text-base font-bold text-foreground mb-1.5">Detail Headline</p>
    <p className="text-sm text-muted-foreground font-body leading-relaxed">Supporting copy.</p>
  </div>
</div>

{/* CTA row */}
<div className="mt-10 flex items-center gap-6">
  <Link className="group inline-flex items-center gap-2.5 bg-foreground text-background px-7 py-3.5 font-display font-bold text-sm tracking-[0.1em] uppercase hover:bg-primary hover:text-white transition-colors duration-300">
    Our Story <ArrowRight size={14} />
  </Link>
  <Link className="group inline-flex items-center gap-2 text-sm tracking-[0.12em] uppercase font-body font-semibold text-muted-foreground hover:text-primary transition-colors duration-300">
    Learn More <ArrowRight size={13} />
  </Link>
</div>
```

**Vision / Mission / Philosophy — 3-col cards:**
```tsx
<div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
  <div className="group flex flex-col gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-md hover:shadow-primary/8 transition-all duration-300">
    <div className="w-11 h-11 rounded-xl brand-gradient flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
      <Icon size={18} className="text-white" />
    </div>
    <div>
      <p className="font-display text-base font-bold text-foreground mb-2">{label}</p>
      <p className="text-sm text-muted-foreground font-body leading-relaxed">{text}</p>
    </div>
  </div>
</div>
```

---

### SECTION C — Sustainability (Dark green)
*Accent colour unchanged — green is brand-neutral and works alongside royal blue.*

```
Background:  #071a0e + green radial glows + green diagonal texture
Accent:      rgba(34, 197, 94, …) throughout
Layout:      2-col — content left / SVG illustration right
```
*(All green CSS values remain the same as the original — see source reference.)*

---

### SECTION D — Featured Properties / Projects

```
Background:  Light, section-padding
Header:      Centered, H2 accent word brand-gradient-text
Cards:       Horizontal scroll (mobile snap) / 2-col grid (desktop), wrapped in <TiltCard>
```

**Property card:**
```tsx
<motion.div
  whileHover={{ y: -5 }}
  className="group bg-card border border-border rounded-2xl md:rounded-sm overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-500"
>
  {/* Image */}
  <div className="relative overflow-hidden aspect-[16/10]">
    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(225,45%,8%)]/75 via-[hsl(225,45%,8%)]/10 to-transparent" />

    {/* Royal blue badge — top left */}
    <span className="absolute top-4 left-4 inline-flex items-center gap-2 px-4 py-1.5 brand-gradient text-white text-sm tracking-[0.1em] uppercase font-body font-bold rounded-sm shadow-md">
      {badge}
    </span>

    {/* Status chip — top right */}
    <span className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 bg-foreground/90 backdrop-blur-sm text-background text-[10px] tracking-[0.15em] uppercase font-body font-semibold rounded-sm">
      {status}
    </span>

    {/* Title overlay */}
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <h3 className="font-display text-2xl md:text-3xl font-bold text-white">{title}</h3>
      <p className="text-white/70 font-body text-sm mt-1">{subtitle}</p>
    </div>
  </div>

  {/* Body */}
  <div className="p-7">
    <p className="text-muted-foreground font-body text-base leading-relaxed">{desc}</p>

    {/* Feature checklist — royal blue check circles */}
    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
      {features.map(feat => (
        <div className="flex items-center gap-2.5">
          <span className="w-5 h-5 rounded-full brand-gradient flex items-center justify-center shrink-0">
            <Check size={11} className="text-white" strokeWidth={3} />
          </span>
          <span className="text-sm text-foreground font-body">{feat}</span>
        </div>
      ))}
    </div>

    {/* Royal blue CTA */}
    <Link className="group/btn mt-8 flex items-center justify-center gap-2 w-full py-4 brand-gradient text-white font-body font-bold text-sm tracking-[0.12em] uppercase rounded-sm hover:opacity-90 transition-all duration-300 shadow-md shadow-primary/25">
      Explore Property
      <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
    </Link>
  </div>
</motion.div>
```

---

### SECTION E — "Invest / Partner With Us" (Dark navy split)

```
Background:  bg-[hsl(var(--navy))] + royal blue glow top-right
Layout:      2-col — stacked overlapping images left / content right
```

**Stacked image pair:**
```tsx
{/* Back image — slightly rotated, royal blue border */}
<motion.div
  initial={{ rotate: -4 }}
  whileInView={{ rotate: -4 }}
  className="absolute top-[15%] left-[8%] w-[62%] aspect-[4/5] rounded-sm overflow-hidden border-2 border-primary/30 shadow-2xl"
>
  <img className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-[hsl(225,45%,8%)]/30" />
</motion.div>

{/* Front image — royal blue border, hover floats */}
<motion.div
  whileHover={{ y: -8, scale: 1.02 }}
  className="relative w-[68%] aspect-[4/5] rounded-sm overflow-hidden border-2 border-primary/60 shadow-2xl shadow-[hsl(225,45%,8%)]/60 ml-[20%] mt-[10%] group"
>
  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(225,45%,8%)]/60 via-transparent to-transparent" />
</motion.div>

{/* Floating pill badge — royal blue */}
<motion.div className="absolute top-[12%] right-[6%] brand-gradient rounded-full px-5 py-3 shadow-xl shadow-primary/30 flex items-center gap-2">
  <TrendingUp size={15} className="text-white" />
  <span className="font-display font-bold text-white text-sm">Key Benefit</span>
</motion.div>
```

**Content side:**
```tsx
{/* Royal blue pill label */}
<div className="inline-flex items-center gap-2 px-5 py-2 brand-gradient rounded-full mb-8 shadow-lg shadow-primary/25">
  <span className="text-[11px] tracking-[0.2em] uppercase font-body font-bold text-white">
    Investment Model
  </span>
</div>

<h2 className="font-display font-bold text-white leading-[1.08] text-4xl md:text-5xl">
  The Company<br />
  <span className="brand-gradient-text">Investment Model</span>
</h2>

{/* Feature list rows */}
{features.map((item, i) => (
  <div className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/8 transition-all duration-300 rounded-sm px-5 py-4">
    <div className="w-9 h-9 rounded-sm brand-gradient flex items-center justify-center shrink-0">
      <item.icon size={16} className="text-white" />
    </div>
    <p className="font-body text-sm text-white/90">
      <span className="font-semibold text-white">{item.title}</span>
      <span className="text-primary font-semibold"> {item.desc}</span>
    </p>
  </div>
))}

{/* Dual CTAs */}
<div className="mt-10 flex flex-col sm:flex-row gap-4">
  <Link className="group inline-flex items-center justify-center gap-2 px-8 py-4 brand-gradient text-white font-body font-bold text-sm tracking-wide rounded-2xl md:rounded-sm hover:opacity-90 shadow-lg shadow-primary/30">
    Primary Action <ArrowRight size={15} />
  </Link>
  <Link className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/25 text-white font-body font-semibold text-sm tracking-wide rounded-2xl md:rounded-sm hover:border-primary/60 hover:bg-white/5 transition-all duration-300">
    Secondary Action <ArrowRight size={15} />
  </Link>
</div>
```

---

### SECTION F — "What Sets Us Apart" (Light)

```
Background:  bg-background
Layout:      2-col — bullet list left / dark card + process grid right
```

**Dark positioning card:**
```tsx
<div className="relative bg-[hsl(var(--navy))] rounded-sm p-8 md:p-10 overflow-hidden">
  {/* Royal blue top accent line */}
  <div className="absolute top-0 left-0 right-0 h-[2px] brand-gradient" />
  {/* Dot grid texture in royal blue */}
  <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
    style={{ backgroundImage: "radial-gradient(hsl(225 73% 57%) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
  <div className="relative z-10">
    <p className="font-display text-2xl md:text-3xl font-bold text-white leading-[1.2] mb-4">
      Bold positioning statement.
    </p>
    <p className="text-white/65 font-body text-base leading-relaxed">Supporting line.</p>
  </div>
</div>
```

**Process grid (2×2):**
```tsx
<div className="border border-border rounded-sm overflow-hidden grid grid-cols-2">
  {steps.map((s, i) => (
    <div className={`p-5 ${i % 2 === 0 ? "border-r border-border" : ""} ${i < 2 ? "border-b border-border" : ""}`}>
      <p className="text-[10px] tracking-[0.2em] uppercase text-primary/70 font-body mb-1">{s.step}</p>
      <p className="font-display text-sm font-bold text-foreground mb-0.5">{s.action}</p>
      <p className="text-[11px] text-muted-foreground font-body">{s.detail}</p>
    </div>
  ))}
</div>
```

---

### SECTION G — Royal Blue Section Divider

```tsx
<div className="bg-[hsl(var(--navy))] flex items-center px-6 md:px-12 lg:px-24 py-5">
  <div className="flex-1 h-px"
    style={{ background: "linear-gradient(to right, transparent, rgba(65,105,225,0.45))" }} />
  <div className="flex items-center gap-2.5 px-6">
    <span className="block w-1 h-1 rounded-full bg-[hsl(225,73%,57%)] opacity-50" />
    <span className="block w-[6px] h-[6px] rotate-45 bg-[hsl(225,73%,57%)]" />
    <span className="block w-1 h-1 rounded-full bg-[hsl(225,73%,57%)] opacity-50" />
  </div>
  <div className="flex-1 h-px"
    style={{ background: "linear-gradient(to left, transparent, rgba(65,105,225,0.45))" }} />
</div>
```

---

### SECTION H — Social Proof Stats Bar

```
Background:  bg-[hsl(var(--navy))] + radial royal blue glow at bottom
Numbers:     brand-gradient-text count-up animation
```

```tsx
<section className="relative overflow-hidden bg-[hsl(var(--navy))]">
  {/* Bottom glow */}
  <div className="absolute inset-0 pointer-events-none"
    style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(65,105,225,0.18) 0%, transparent 65%)" }} />

  <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-10 md:py-14">
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-0 md:divide-x md:divide-white/10">
      {stats.map((s, i) => (
        <motion.div className="flex flex-col items-center text-center md:px-6"
          transition={{ duration: 0.55, delay: i * 0.08 }}>
          {/* Number in royal blue shimmer */}
          <p className="font-display text-3xl md:text-4xl font-black brand-gradient-text leading-none">
            {s.prefix}<Counter to={s.value} />{s.suffix}
          </p>
          <p className="text-[11px] tracking-[0.18em] uppercase text-white/50 font-body font-semibold mt-2">
            {s.label}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

---

### SECTION I — "Why This Market / Why Now" (Light + dark callout card)

**Left side:**
```tsx
<div className="flex items-center gap-3 mb-6">
  <div className="h-px w-8 brand-gradient rounded-full" />
  <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-body font-semibold">The Opportunity</p>
</div>

<h2 className="font-display text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-[1.06] mb-8">
  Why [Market].<br />
  <span className="brand-gradient-text">Why Now.</span>
</h2>

{/* Inline stats row — royal blue shimmer numbers */}
<div className="flex flex-wrap gap-x-8 gap-y-5 border-t border-border pt-8">
  {stats.map(s => (
    <div>
      <p className="font-display text-3xl font-black brand-gradient-text leading-none mb-1">{s.value}</p>
      <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">{s.label}</p>
    </div>
  ))}
</div>
```

**Right side (dark navy callout card):**
```tsx
<div className="relative rounded-2xl overflow-hidden bg-[hsl(var(--navy))] p-8 md:p-10 flex flex-col justify-between gap-10">
  {/* Ambient blue glows */}
  <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
    style={{ background: "radial-gradient(circle, hsl(225 73% 57% / 0.14) 0%, transparent 70%)" }} />
  <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
    style={{ background: "radial-gradient(circle, hsl(225 73% 57% / 0.08) 0%, transparent 70%)" }} />

  {/* Large decorative quote mark — blue tint */}
  <div className="relative">
    <span className="font-display text-7xl leading-none text-primary/20 select-none absolute -top-4 -left-2">&ldquo;</span>
    <p className="font-display text-2xl md:text-3xl font-bold text-white leading-[1.2] pt-6">
      Market insight statement with{" "}
      <span className="brand-gradient-text">royal blue accent on key phrase.</span>
    </p>
  </div>

  {/* Stat rows with white dividers */}
  <div className="space-y-0 divide-y divide-white/8">
    {stats.map(stat => (
      <div className="flex items-center gap-5 py-4">
        <p className="font-display text-2xl font-black brand-gradient-text shrink-0 w-16">{stat.value}</p>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-body font-semibold text-white/85">{stat.label}</p>
          <p className="text-[10px] tracking-[0.12em] uppercase text-primary/45 font-body mt-0.5">{stat.source}</p>
        </div>
      </div>
    ))}
  </div>
</div>
```

---

### SECTION J — Meet the Team

```
Background:  #090F1C (deep navy) + film grain noise + two royal blue blur orbs
Layout:      4-col staggered grid (horizontal scroll on mobile)
Cards:       Portrait 3:4 photo cards, content pinned to bottom
```

```tsx
<section className="relative overflow-hidden bg-[#090F1C] px-6 md:px-12 lg:px-24 py-20 md:py-32">
  {/* Film grain texture */}
  <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
    style={{ backgroundImage: "url(...noise svg...)", backgroundRepeat: "repeat", backgroundSize: "128px" }} />
  {/* Royal blue ambient glows */}
  <div className="absolute -top-32 -right-32 w-[50vw] h-[50vw] rounded-full bg-primary/8 blur-[140px] pointer-events-none" />
  <div className="absolute -bottom-32 -left-16 w-[30vw] h-[30vw] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

  {/* Cards — 4-col staggered, alternating offset */}
  {team.map((member, i) => (
    <motion.div className={`... ${(i === 1 || i === 3) ? "lg:mt-10" : ""}`}>
      <Link className="group block relative overflow-hidden bg-[#0d1526]" style={{ aspectRatio: "3 / 4" }}>
        <img className="... group-hover:scale-[1.04]" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#090F1C]/95 via-[#090F1C]/30 to-transparent" />
        {/* Royal blue shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/14 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute inset-x-0 bottom-0 p-6">
          {/* Expanding royal blue rule */}
          <div className="h-[2px] brand-gradient mb-5 w-8 group-hover:w-14 transition-all duration-500" />

          <span className="inline-block mb-2.5 px-2.5 py-0.5 text-[9px] tracking-[0.25em] uppercase font-body font-semibold text-primary border border-primary/40 bg-[#090F1C]/50 backdrop-blur-sm">
            {member.category}
          </span>
          <h3 className="font-display text-[1.15rem] font-bold text-white leading-snug">{member.name}</h3>
          <p className="text-[10px] tracking-[0.15em] uppercase text-primary/80 font-body font-semibold mt-1">{member.role}</p>

          {/* Tagline expands on hover */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
            <div className="overflow-hidden">
              <p className="text-[13px] text-white/55 font-body leading-relaxed pt-3.5 line-clamp-3">{member.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-body font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                View Full Bio <ArrowRight size={11} />
              </span>
            </div>
          </div>
        </div>

        {/* Border frame */}
        <div className="absolute inset-0 border border-white/5 group-hover:border-primary/35 transition-colors duration-300 pointer-events-none" />
      </Link>
    </motion.div>
  ))}
</section>
```

---

### SECTION K — Services / Explore More

```
Background:  bg-card
Layout:      2×2 (mobile) / 4-col (desktop)
Icons:       Royal blue gradient squares
```

```tsx
<Link className="group flex flex-col h-full bg-background border border-border rounded-2xl md:rounded-sm p-5 md:p-8 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 active:scale-[0.97]">
  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl brand-gradient flex items-center justify-center mb-4 md:mb-7 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-primary/25">
    <item.icon size={20} className="text-white" />
  </div>
  <h3 className="font-display text-base md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 md:mb-3">
    {item.title}
  </h3>
  <p className="text-muted-foreground font-body text-sm leading-relaxed flex-1 hidden sm:block">{item.desc}</p>
  <div className="mt-3 md:mt-6 inline-flex items-center gap-1.5 text-xs md:text-sm font-body font-semibold text-primary group-hover:gap-3 transition-all duration-300">
    Learn More <ArrowRight size={12} />
  </div>
</Link>
```

---

### SECTION L — Testimonials

```tsx
<div className="bg-card border border-border rounded-2xl p-7 flex flex-col h-full hover:border-primary/30 hover:shadow-lg transition-all duration-300">
  <Quote size={28} className="text-primary/25 mb-5" />
  {/* Stars — royal blue */}
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-primary fill-primary" />)}
  </div>
  <p className="mt-4 text-muted-foreground font-body text-sm leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
  <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
    {/* Royal blue avatar */}
    <div className="w-10 h-10 rounded-full brand-gradient flex items-center justify-center shrink-0">
      <span className="text-xs font-bold text-white">{initials}</span>
    </div>
    <div>
      <p className="text-sm font-body font-semibold text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground font-body">{location}</p>
      <p className="text-[10px] text-primary font-body font-semibold tracking-wide uppercase mt-0.5">{role}</p>
    </div>
  </div>
</div>
```

---

## 11. FOOTER DESIGN

### CTA Banner (immediately above footer body)

```tsx
<div className="relative overflow-hidden brand-gradient">
  {/* Moving shimmer */}
  <motion.div
    animate={{ x: ["-100%", "100%"] }}
    transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
    className="absolute inset-0 pointer-events-none"
    style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)" }}
  />
  {/* White dot texture */}
  <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
    style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

  {/* Desktop layout */}
  <div className="hidden md:block max-w-[1400px] mx-auto px-12 lg:px-24 py-14">
    <div className="flex items-center justify-between gap-10">

      {/* Left: headline + trust pills */}
      <div className="flex-1">
        <p className="text-[11px] tracking-[0.25em] uppercase text-white/60 font-body font-semibold mb-3">
          The Opportunity is Now
        </p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.08]">
          Ready to Invest in<br /> [Company] Properties?
        </h2>
        {/* Trust pills — white/translucent on blue */}
        <div className="mt-6 flex flex-wrap gap-3">
          {["Feature 1", "Feature 2", "Feature 3", "Feature 4"].map(tag => (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 border border-white/25 rounded-full text-[11px] tracking-[0.12em] uppercase font-body font-semibold text-white/85">
              <span className="w-1 h-1 rounded-full bg-white/60" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right: 2 CTA buttons */}
      <div className="flex flex-col gap-4 shrink-0">
        {/* Primary — white filled */}
        <Link className="group flex items-center justify-between gap-6 bg-white text-[hsl(var(--navy))] px-8 py-5 font-display font-bold text-sm tracking-[0.12em] uppercase hover:bg-white/90 transition-all duration-300 sm:min-w-[300px] shadow-xl shadow-[hsl(225,45%,10%)]/30">
          Primary CTA
          <span className="w-9 h-9 rounded-full border border-[hsl(var(--navy))]/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
            <ArrowRight size={15} />
          </span>
        </Link>
        {/* Secondary — ghost white */}
        <Link className="group flex items-center justify-between gap-6 bg-transparent border border-white/30 text-white px-8 py-5 font-display font-bold text-sm tracking-[0.12em] uppercase hover:bg-white/10 transition-all duration-300 sm:min-w-[300px]">
          Secondary CTA
          <span className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center">
            <ArrowRight size={15} />
          </span>
        </Link>
      </div>
    </div>
  </div>
</div>
```

### Footer body

```tsx
<footer className="relative bg-card border-t border-border overflow-hidden">
  {/* Diagonal royal blue stripe texture */}
  <div className="absolute inset-0 pointer-events-none hidden md:block"
    style={{ backgroundImage: `repeating-linear-gradient(-45deg,transparent,transparent 26px,rgba(65,105,225,0.06) 26px,rgba(65,105,225,0.06) 27px)` }} />
  {/* Royal blue glow — bottom left */}
  <div className="absolute bottom-0 left-0 w-[700px] h-[500px] pointer-events-none hidden md:block"
    style={{ background: "radial-gradient(ellipse at bottom left, rgba(65,105,225,0.14) 0%, transparent 65%)" }} />

  <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

      {/* Brand column */}
      <div>
        <img src="/logo-colored.png" className="h-10 w-auto mb-5" />
        <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6 max-w-xs">
          Company tagline or brief description.
        </p>
        <div className="flex flex-col gap-2">
          <a href="mailto:..." className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
            <Mail size={13} className="text-primary shrink-0" /> email@company.com
          </a>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={13} className="text-primary shrink-0" /> City, Country
          </div>
        </div>
      </div>

      {/* Navigation columns (map siteLinks here) */}

    </div>

    {/* Bottom bar */}
    <div className="mt-14 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-xs text-muted-foreground font-body">
        © {new Date().getFullYear()} [Company Name]. All rights reserved.
      </p>
      {/* Social icons */}
    </div>
  </div>
</footer>
```

---

## 12. REUSABLE COMPONENT PATTERNS

### Button variants

```tsx
// Primary — royal blue gradient
<Link className="group inline-flex items-center gap-2 px-8 py-4 brand-gradient text-white font-body font-bold text-sm tracking-wide rounded-sm hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/25">
  CTA Label <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
</Link>

// Ghost white (on dark/navy backgrounds)
<Link className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-body font-semibold text-sm tracking-wide rounded-sm hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm">
  Ghost CTA
</Link>

// Ghost royal blue border (on light backgrounds)
<Link className="group inline-flex items-center gap-2 px-6 py-3 border border-primary/40 text-primary text-sm font-body font-semibold hover:bg-primary/8 transition-all duration-300">
  Blue Ghost <ArrowRight size={14} />
</Link>

// Dark filled (light sections, hover to blue)
<Link className="group inline-flex items-center gap-2.5 bg-foreground text-background px-7 py-3.5 font-display font-bold text-sm tracking-[0.1em] uppercase hover:bg-primary hover:text-white transition-colors duration-300">
  Dark CTA <ArrowRight size={14} />
</Link>

// White filled (on blue/gradient backgrounds)
<Link className="group flex items-center gap-4 bg-white text-[hsl(var(--navy))] px-8 py-5 font-display font-bold text-sm tracking-[0.12em] uppercase hover:bg-white/90 transition-all duration-300 shadow-xl">
  White CTA <ArrowRight size={15} />
</Link>

// Text link with animated arrow gap
<Link className="group inline-flex items-center gap-1.5 text-sm font-body font-semibold text-muted-foreground hover:text-primary transition-colors duration-300 group-hover:gap-3">
  Learn More <ArrowRight size={13} />
</Link>
```

---

### Badge / Pill variants

```tsx
// Royal blue gradient badge (sharp)
<span className="inline-flex items-center gap-2 px-4 py-1.5 brand-gradient text-white text-sm tracking-[0.1em] uppercase font-body font-bold rounded-sm">
  Badge
</span>

// Frosted glass pill (on dark/image backgrounds)
<span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/15 backdrop-blur-sm">
  <span className="w-1.5 h-1.5 rounded-full brand-gradient" />
  <span className="text-sm tracking-[0.1em] uppercase font-body font-semibold text-primary">Label</span>
</span>

// Status chip (frosted dark)
<span className="inline-flex items-center gap-2 px-3 py-1.5 bg-foreground/90 backdrop-blur-sm text-background text-[10px] tracking-[0.15em] uppercase font-body font-semibold rounded-sm">
  Status
</span>

// Live / pulsing dot badge — royal blue
<span className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 rounded-full">
  <span className="relative flex h-1.5 w-1.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
  </span>
  <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-body font-semibold">Live</span>
</span>

// Trust pill (on blue gradient banner)
<span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 border border-white/25 rounded-full text-[10px] tracking-[0.12em] uppercase font-body font-semibold text-white/85">
  <span className="w-1 h-1 rounded-full bg-white/60" />
  Tag
</span>
```

---

### Icon square (royal blue)

```tsx
// Standard
<div className="w-11 h-11 rounded-xl brand-gradient flex items-center justify-center shrink-0">
  <Icon size={18} className="text-white" />
</div>

// Small
<div className="w-9 h-9 rounded-sm brand-gradient flex items-center justify-center shrink-0">
  <Icon size={16} className="text-white" />
</div>

// With hover scale (on card)
<div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md shadow-primary/25">
  <Icon size={20} className="text-white" />
</div>
```

---

### Section label row

```tsx
// With leading royal blue line
<div className="flex items-center gap-4 mb-16 md:mb-20">
  <div className="h-px w-10 brand-gradient rounded-full" />
  <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-body font-semibold">
    Section Label
  </p>
</div>

// Centered with flanking lines
<p className="text-xs tracking-[0.3em] uppercase text-primary font-body font-semibold mb-5 inline-flex items-center gap-3">
  <span className="w-8 h-px bg-primary" />
  Section Label
  <span className="w-8 h-px bg-primary" />
</p>
```

---

### Floating stat card

```tsx
<motion.div
  initial={{ opacity: 0, y: 20, scale: 0.96 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.6, delay: 0.45 }}
  className="absolute -bottom-8 -right-4 md:-right-10 bg-background border border-border shadow-2xl shadow-black/15 p-5 md:p-6 w-44 md:w-52"
>
  <p className="text-[10px] tracking-[0.22em] uppercase text-primary font-body font-semibold mb-2">Eyebrow</p>
  <p className="font-display text-2xl md:text-3xl font-bold text-foreground leading-none mb-2">Main stat</p>
  <p className="text-[11px] text-muted-foreground font-body leading-relaxed">Supporting note.</p>
</motion.div>
```

---

### Brand corner accent (royal blue)

```tsx
<div className="absolute -top-3 -right-3 w-12 h-12 pointer-events-none">
  <div className="absolute top-0 right-0 w-full h-[2px] brand-gradient" />
  <div className="absolute top-0 right-0 h-full w-[2px] brand-gradient" />
</div>
```

---

### Card — dark navy (on navy backgrounds)

```tsx
<div className="group relative flex flex-col border border-white/10 rounded-2xl md:rounded-sm p-6 md:p-8 hover:border-primary/60 transition-all duration-500 overflow-hidden">
  {/* Hover: subtle blue fill */}
  <div className="absolute inset-0 brand-gradient opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none" />
  {/* Hover: royal blue top glow line */}
  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  {/* content */}
</div>
```

---

### Card — light (on light/card backgrounds)

```tsx
<div className="group bg-card border border-border rounded-2xl md:rounded-sm overflow-hidden hover:shadow-2xl hover:shadow-primary/8 hover:border-primary/30 transition-all duration-500">
  {/* content */}
</div>
```

---

## 13. SPACING & LAYOUT SYSTEM

| Token | Value | Notes |
|---|---|---|
| `section-padding` | `px-6 md:px-12 lg:px-24 py-12 md:py-20 lg:py-32` | Apply to all sections |
| Container | `max-w-[1400px] mx-auto` | All content containers |
| Default border radius | `--radius: 0.25rem` | Sharp / architectural feel |
| Mobile cards | `rounded-2xl` | Friendly on small screens |
| Desktop cards | `rounded-sm` | Sharp, luxury |
| Section vertical padding | `py-20 md:py-28` to `py-24 md:py-32` | Scale with importance |
| `mobile-bottom-safe` | `pb-20 lg:pb-0` | Clearance for bottom tab bar |

### Responsive grid patterns

```tsx
// 2-col equal
className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24"

// 3-col
className="grid grid-cols-1 sm:grid-cols-3 gap-4"

// 4-col
className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"

// Horizontal scroll → grid (mobile-first cards)
className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth no-scrollbar"
// Card snap units: className="snap-start shrink-0 w-[80vw] sm:w-[55vw] md:w-auto"
```

---

## 14. INTERACTION PRINCIPLES

1. **Every section reveals on scroll** — `whileInView`, `once: true`, easing `[0.25, 0.46, 0.45, 0.94]`
2. **Lists and grids stagger** — `delay: i * 0.08` to `i * 0.15`
3. **Hover states are physical** — lift (`y: -5`), glow, border colour, image scale, expanding rule, arrow slide
4. **Dark section ambience** — animated pulsing royal blue orbs as background lighting
5. **Mobile horizontal carousels** — snap scroll, hidden scrollbar, cards reveal off-screen
6. **Theme-aware everywhere** — all CSS tokens switch light/dark, `transition: background-color 0.3s ease`
7. **Text selection** — white on royal blue (`::selection`)
8. **3D premium interactions** — TiltCard on featured cards, MagneticButton on hero CTAs
9. **No jump cuts** — everything animates in/out, drawer slides, dropdowns fade+slide
10. **White as a primary tone on blue** — `text-white`, `text-white/75`, `text-white/55` used throughout all dark/navy sections

---

## 15. PAGE INVENTORY

| Page | Route | Hero type | Notes |
|---|---|---|---|
| Home | `/` | Full-viewport video + parallax | Marquee bar at hero bottom |
| About | `/about` | PageHero + image | Two-col editorial |
| Projects | `/projects` | PageHero + vector | Grid of all properties |
| Single Project | `/projects/[slug]` | Full-bleed image hero | Gallery, features, CTA |
| Services | `/services` | PageHero + vector | Service icon cards |
| Leadership / Team | `/leadership` | PageHero + vector | Staggered portrait grid |
| Team Member | `/leadership/[slug]` | Full-bleed photo | Bio, credentials |
| Insights / Blog | `/insights` | PageHero + vector | Article card grid |
| Single Insight | `/insights/[slug]` | Full-bleed image | Reading progress bar |
| Partnerships | `/partnership` | PageHero + vector | Partner tiers |
| Become an Investor | `/become-an-investor` | PageHero + vector | Investor CTA + form |
| Contact | `/contact` | PageHero + vector | Form + map |
| Sustainability | `/sustainability` | PageHero + vector | Green section |
| Privacy Policy | `/privacy-policy` | PageHero + vector | Legal content |
| Terms of Service | `/terms-of-service` | PageHero + vector | Legal content |

---

### Page hero vector illustrations

Each inner page has a unique SVG decorative illustration.
**Colour palette for vectors:** Royal blue `hsl(225,73%,57%)`, light blue `hsl(220,80%,68%)`, white `#fff`, deep navy `hsl(225,45%,10%)`. Transparent background. Abstract architectural / property shapes. Subtle inner radial blue glows. ~400–500px wide.

---

## QUICK-START CHECKLIST

```
□ Install: next, framer-motion, tailwindcss, lucide-react, shadcn/ui
□ Set Tailwind theme with royal blue CSS custom properties (Section 3)
□ Add globals.css with brand-gradient, brand-gradient-text, white-shimmer-text, keyframes (Section 6)
□ Create <ThemeProvider> with localStorage persistence
□ Create <Navbar> — transparent hero / frosted glass scroll / royal blue active state / bottom tab bar
□ Create <PageHero> — navy overlays, breadcrumb pill, brand-gradient-text accent, vector slot
□ Create <WordReveal> — word-by-word slide-up
□ Create <TiltCard>  — 3D mouse-tracking tilt + glare
□ Create <MagneticButton> — cursor-attracted CTAs
□ Create <AnimatedSection> — scroll-reveal wrapper
□ Create <SocialProofBar> — count-up stats, brand-gradient-text numbers
□ Build homepage sections A → L in order
□ Build <Footer> — royal blue gradient banner + navy body
□ Set viewport meta + theme-color: #4169E1
□ Configure dark mode via .dark class on <html>
□ Set ::selection to white on royal blue
□ Add env(safe-area-inset-bottom) padding for iOS tab bar
```

---

*End of Design System Export*
*Brand: Royal Blue `hsl(225,73%,57%)` + White — ready for new property development company.*
