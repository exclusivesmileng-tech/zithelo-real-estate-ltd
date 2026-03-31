"use client";

import Link from "next/link";
import { ArrowRight, Mail, MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import NewsletterSignup from "./NewsletterSignup";
import PushNotificationButton from "./PushNotificationButton";

const companyLinks = [
  { label: "About Us",       path: "/about" },
  { label: "Leadership",     path: "/leadership" },
  { label: "Why Zithelo",    path: "/why-zithelo" },
  { label: "Africa Vision",  path: "/africa-vision" },
  { label: "Partnership",    path: "/partnership" },
  { label: "Projects",       path: "/projects" },
  { label: "Services",       path: "/services" },
  { label: "Insights",       path: "/insights" },
  { label: "Contact",        path: "/contact" },
];

const Footer = () => {
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/images/zithelo-logo-white.png" : "/images/zithelo-logo-colored.png";

  return (
    <footer className="relative">

      {/* ════════════════════════════════════════
          CTA BANNER
          Desktop: wide gold strip
          Mobile:  rounded app-style card
      ════════════════════════════════════════ */}
      <div className="relative overflow-hidden gold-gradient md:rounded-none">
        {/* Shimmer */}
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)" }}
        />
        {/* Dot texture */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(hsl(17 13% 12%) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

        {/* ── Mobile CTA card layout ── */}
        <div className="relative z-10 block md:hidden px-5 py-10">
          <p className="text-[10px] tracking-[0.25em] uppercase text-primary-foreground/60 font-body font-semibold mb-3">
            The Opportunity is Now
          </p>
          <h2 className="font-display text-[1.75rem] font-bold text-primary-foreground leading-[1.1] mb-3">
            Ready to Invest in Africa&apos;s Urban Future?
          </h2>
          <p className="text-primary-foreground/70 font-body text-sm leading-relaxed mb-6">
            Partner with Zithelo for premium real estate opportunities across Nigeria and beyond.
          </p>

          {/* Trust pills — horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-7">
            {["Verified Title", "25-Year Lease", "Fibre-Ready", "Diaspora-Trusted"].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-foreground/15 border border-primary-foreground/20 rounded-full text-[10px] tracking-[0.1em] uppercase font-body font-semibold text-primary-foreground/80 whitespace-nowrap shrink-0">
                <span className="w-1 h-1 rounded-full bg-primary-foreground/60" />
                {tag}
              </span>
            ))}
          </div>

          {/* Full-width stacked CTA buttons */}
          <div className="flex flex-col gap-3">
            <Link
              href="/become-a-partner"
              className="group flex items-center justify-between gap-4 bg-[hsl(var(--charcoal))] text-white px-6 py-4 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-2xl shadow-xl shadow-black/20 active:scale-[0.98] transition-transform duration-150"
            >
              Become a Partner
              <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center shrink-0">
                <ArrowRight size={14} />
              </span>
            </Link>
            <Link
              href="/become-an-investor"
              className="group flex items-center justify-between gap-4 bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground px-6 py-4 font-display font-bold text-sm tracking-[0.1em] uppercase rounded-2xl active:scale-[0.98] transition-transform duration-150"
            >
              Become an Investor
              <span className="w-8 h-8 rounded-full border border-primary-foreground/30 flex items-center justify-center shrink-0">
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>

        {/* ── Desktop CTA strip layout ── */}
        <div className="relative z-10 hidden md:block max-w-[1400px] mx-auto px-12 lg:px-24 py-14 md:py-18">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="flex-1"
            >
              <p className="text-[11px] tracking-[0.25em] uppercase text-primary-foreground/60 font-body font-semibold mb-3">
                The Opportunity is Now
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-[1.08]">
                Ready to Invest in<br className="hidden md:block" /> Africa&apos;s Urban Future?
              </h2>
              <p className="mt-4 text-primary-foreground/70 font-body text-base md:text-lg max-w-xl leading-relaxed">
                Partner with Zithelo for premium real estate opportunities across Nigeria and beyond.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Verified Title", "25-Year Lease", "Fibre-Ready", "Diaspora-Trusted"].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-foreground/15 border border-primary-foreground/20 rounded-full text-[11px] tracking-[0.12em] uppercase font-body font-semibold text-primary-foreground/80">
                    <span className="w-1 h-1 rounded-full bg-primary-foreground/60" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col gap-4 shrink-0"
            >
              <Link
                href="/become-a-partner"
                className="group relative flex items-center justify-between gap-6 bg-[hsl(var(--charcoal))] text-white px-8 py-5 font-display font-bold text-sm tracking-[0.12em] uppercase hover:bg-foreground transition-all duration-300 w-full sm:min-w-[300px] shadow-xl shadow-black/20"
              >
                Become a Partner
                <span className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300">
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link
                href="/become-an-investor"
                className="group flex items-center justify-between gap-6 bg-transparent border border-primary-foreground/30 text-primary-foreground px-8 py-5 font-display font-bold text-sm tracking-[0.12em] uppercase hover:bg-primary-foreground/10 transition-all duration-300 w-full sm:min-w-[300px]"
              >
                Become an Investor
                <span className="w-9 h-9 rounded-full border border-primary-foreground/30 flex items-center justify-center group-hover:border-primary-foreground transition-all duration-300">
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          MAIN FOOTER BODY
      ════════════════════════════════════════ */}
      <div className="relative bg-card border-t border-border overflow-hidden">

        {/* Desktop background layers */}
        <div className="absolute inset-0 pointer-events-none hidden md:block"
          style={{ backgroundImage: `repeating-linear-gradient(-45deg,transparent,transparent 26px,rgba(212,170,83,0.10) 26px,rgba(212,170,83,0.10) 27px)` }} />
        <div className="absolute bottom-0 left-0 w-[700px] h-[500px] pointer-events-none hidden md:block"
          style={{ background: "radial-gradient(ellipse at bottom left, rgba(212,170,83,0.22) 0%, transparent 65%)" }} />

        {/* ── Mobile footer: app-style grouped sections ── */}
        <div className="relative z-10 block md:hidden px-5 pt-8 pb-24">

          {/* Brand block */}
          <div className="flex items-center gap-3 mb-5">
            <img src={logo} alt="Zithelo Real Estate" className="h-9 w-auto" />
          </div>
          <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4 max-w-xs">
            Developing connected urban spaces for modern professionals and global investors.
          </p>
          <div className="flex flex-col gap-2 mb-8">
            <a href="mailto:info@zithelo.com" className="inline-flex items-center gap-2 text-sm text-muted-foreground font-body">
              <Mail size={13} className="text-primary shrink-0" /> info@zithelo.com
            </a>
            <a href="tel:+2349110222323" className="inline-flex items-center gap-2 text-sm text-muted-foreground font-body">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.45 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6.37 6.37l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +234 9110 222 323
            </a>
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground font-body">
              <MapPin size={13} className="text-primary shrink-0" /> Victoria Island, Lagos, Nigeria
            </div>
          </div>

          {/* iOS-style grouped navigation list */}
          <p className="text-[10px] tracking-[0.2em] uppercase text-primary font-body font-semibold mb-3 px-1">
            Navigation
          </p>
          <div className="bg-muted/60 rounded-2xl overflow-hidden mb-8">
            {companyLinks.map((link, i) => (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center justify-between px-4 py-3.5 active:bg-muted transition-colors duration-150 ${
                  i < companyLinks.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <span className="text-sm font-body font-medium text-foreground">{link.label}</span>
                <ChevronRight size={15} className="text-muted-foreground shrink-0" />
              </Link>
            ))}
          </div>

          {/* Contact action row */}
          <p className="text-[10px] tracking-[0.2em] uppercase text-primary font-body font-semibold mb-3 px-1">
            Get in Touch
          </p>
          <div className="bg-muted/60 rounded-2xl overflow-hidden mb-8">
            <Link href="/contact" className="flex items-center justify-between px-4 py-3.5 border-b border-border/50 active:bg-muted transition-colors">
              <span className="text-sm font-body font-medium text-foreground">Schedule a Discussion</span>
              <ChevronRight size={15} className="text-muted-foreground shrink-0" />
            </Link>
            <Link href="/partnership" className="flex items-center justify-between px-4 py-3.5 border-b border-border/50 active:bg-muted transition-colors">
              <span className="text-sm font-body font-medium text-foreground">Partner with Zithelo</span>
              <ChevronRight size={15} className="text-muted-foreground shrink-0" />
            </Link>
            <Link href="/diaspora-investor" className="flex items-center justify-between px-4 py-3.5 border-b border-border/50 active:bg-muted transition-colors">
              <span className="text-sm font-body font-medium text-foreground">Diaspora Investor Programme</span>
              <ChevronRight size={15} className="text-muted-foreground shrink-0" />
            </Link>
            <Link href="/refer" className="flex items-center justify-between px-4 py-3.5 border-b border-border/50 active:bg-muted transition-colors">
              <span className="text-sm font-body font-medium text-foreground">Refer &amp; Earn</span>
              <ChevronRight size={15} className="text-muted-foreground shrink-0" />
            </Link>
            <a href="mailto:info@zithelo.com" className="flex items-center justify-between px-4 py-3.5 active:bg-muted transition-colors">
              <span className="text-sm font-body font-medium text-foreground">Email Us Directly</span>
              <ChevronRight size={15} className="text-muted-foreground shrink-0" />
            </a>
          </div>

          {/* Newsletter */}
          <div className="mb-8">
            <NewsletterSignup variant="inline" />
          </div>

          {/* Social + legal */}
          <div className="flex items-center justify-between pt-2 pb-2">
            <div className="flex items-center gap-1">
              <a href="https://instagram.com/zithelohomes" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/zithelo-real-estate" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://x.com/zithelohomes" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/privacy-policy" className="text-[10px] text-muted-foreground font-body hover:text-primary transition-colors">Privacy</Link>
              <span className="text-border text-xs">·</span>
              <Link href="/terms-of-service" className="text-[10px] text-muted-foreground font-body hover:text-primary transition-colors">Terms</Link>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground font-body mt-3 text-center">
            © {new Date().getFullYear()} Zithelo Real Estate Limited
          </p>

          {/* Developer credit — mobile only */}
          <div className="mt-5 pt-4 border-t border-border/50 flex justify-center">
            <a
              href="https://wa.me/2347069716822?text=Hey%20Harzotech%20%F0%9F%91%8B%F0%9F%8F%BD%2C%20I%20saw%20the%20amazing%20job%20you%20did%20on%20the%20Zithelo%20Real%20Estate%20website%20%E2%80%94%20I%27d%20love%20to%20discuss%20a%20project%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 active:bg-muted transition-colors"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-[10px] tracking-[0.15em] uppercase font-body font-semibold text-muted-foreground whitespace-nowrap">
                Crafted by
              </span>
              <img src="/images/Harzotech-Logo.gif" alt="Harzotech" className="h-4 w-auto object-contain" />
            </a>
          </div>
        </div>

        {/* ── Desktop footer: original grid layout ── */}
        <div className="relative z-10 hidden md:block max-w-[1400px] mx-auto px-12 lg:px-24 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <div className="md:col-span-4">
              <img src={logo} alt="Zithelo Real Estate" className="h-12 w-auto mb-6" />
              <p className="text-base text-muted-foreground font-body leading-relaxed max-w-xs">
                Developing connected urban spaces for modern professionals and global investors.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a href="mailto:info@zithelo.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                  <Mail size={14} className="text-primary" /> info@zithelo.com
                </a>
                <a href="tel:+2349110222323" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.45 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6.37 6.37l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  +234 9110 222 323
                </a>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                  <MapPin size={14} className="text-primary" /> Lagos, Nigeria
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-sm tracking-[0.15em] uppercase text-primary mb-6 font-body font-semibold">Company</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "About",         path: "/about" },
                  { label: "Leadership",    path: "/leadership" },
                  { label: "Why Zithelo",   path: "/why-zithelo" },
                  { label: "Africa Vision", path: "/africa-vision" },
                  { label: "Partnership",   path: "/partnership" },
                ].map((l) => (
                  <Link key={l.path} href={l.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">{l.label}</Link>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-sm tracking-[0.15em] uppercase text-primary mb-6 font-body font-semibold">Portfolio</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Projects", path: "/projects" },
                  { label: "Services", path: "/services" },
                  { label: "Insights", path: "/insights" },
                  { label: "Contact",  path: "/contact" },
                ].map((l) => (
                  <Link key={l.path} href={l.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">{l.label}</Link>
                ))}
              </div>
            </div>
            <div className="md:col-span-4">
              <h4 className="text-sm tracking-[0.15em] uppercase text-primary mb-6 font-body font-semibold">Invest with Us</h4>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5">
                Premium opportunities for investors, developers, and diaspora partners across Nigeria&apos;s urban growth corridor.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                <Link href="/partnership" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                  <ArrowRight size={12} className="text-primary flex-shrink-0" /> Partner with Zithelo
                </Link>
                <Link href="/partnership" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                  <ArrowRight size={12} className="text-primary flex-shrink-0" /> Investment Opportunities
                </Link>
                <Link href="/diaspora-investor" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                  <ArrowRight size={12} className="text-primary flex-shrink-0" /> Diaspora Investor Programme
                </Link>
                <Link href="/refer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                  <ArrowRight size={12} className="text-primary flex-shrink-0" /> Refer &amp; Earn
                </Link>
                <Link href="/contact?type=investment" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                  <ArrowRight size={12} className="text-primary flex-shrink-0" /> Schedule a Discussion
                </Link>
                {process.env.NEXT_PUBLIC_BROCHURE_PDF_URL && (
                  <a
                    href={process.env.NEXT_PUBLIC_BROCHURE_PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-body font-semibold"
                  >
                    <ArrowRight size={12} className="text-primary flex-shrink-0" /> Download Brochure
                  </a>
                )}
              </div>
              <NewsletterSignup variant="inline" />
              <div className="mt-4">
                <PushNotificationButton variant="button" className="text-white/50 hover:text-white/80" />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop bottom bar */}
        <div className="relative z-10 border-t border-border hidden md:block">
          <div className="max-w-[1400px] mx-auto px-12 lg:px-24 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground font-body">
              © {new Date().getFullYear()} Zithelo Real Estate Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-1">
              <a href="https://instagram.com/zithelohomes" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/zithelo-real-estate" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://x.com/zithelohomes" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <div className="w-px h-4 bg-border mx-2" />
              <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors font-body">Privacy Policy</Link>
              <span className="mx-2 text-border text-xs">·</span>
              <Link href="/terms-of-service" className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors font-body">Terms of Service</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
