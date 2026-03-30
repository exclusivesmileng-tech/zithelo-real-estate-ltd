"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Home, Building2, Briefcase, Users, Phone, LayoutGrid } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import ThemeToggle from "./ThemeToggle";

type NavChild = { label: string; path: string };
type NavItem = { label: string; path: string; children?: NavChild[] };

const bottomTabs = [
  { label: "Home",     path: "/",           icon: Home },
  { label: "Projects", path: "/projects",   icon: Building2 },
  { label: "About",    path: "/about",      icon: Briefcase },
  { label: "Team",     path: "/leadership", icon: Users },
  { label: "More",     path: "__more__",    icon: LayoutGrid },
];

const navLinks: NavItem[] = [
  { label: "Home",         path: "/" },
  { label: "About",        path: "/about" },
  { label: "Projects",     path: "/projects" },
  { label: "Services",     path: "/services" },
  {
    label: "Leadership",
    path: "/leadership",
    children: [
      { label: "Management", path: "/leadership/management" },
      { label: "Board",      path: "/leadership/board" },
    ],
  },
  { label: "Why Zithelo",  path: "/why-zithelo" },
  { label: "Africa Vision",path: "/africa-vision" },
  { label: "Insights",     path: "/insights" },
  { label: "Partnership",  path: "/partnership" },
];

const isLinkActive = (link: NavItem, pathname: string): boolean =>
  link.children
    ? link.children.some((c) => pathname.startsWith(c.path)) || pathname === link.path
    : pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));

const Navbar = () => {
  const [isOpen, setIsOpen]           = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname  = usePathname();
  const { theme } = useTheme();

  const isHeroPage = pathname === "/";
  const logoSrc = (isHeroPage && !scrolled)
    ? "/images/zithelo-logo-white.png"
    : (theme === "dark" ? "/images/zithelo-logo-white.png" : "/images/zithelo-logo-colored.png");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  /* text colour helper for desktop links — inactive only */
  const inactiveColor = isHeroPage && !scrolled
    ? "text-white/75 hover:text-white"
    : "text-muted-foreground hover:text-foreground";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Backdrop */}
      <motion.div
        animate={{
          backgroundColor: scrolled || !isHeroPage
            ? theme === "dark" ? "hsl(17 12% 10% / 0.96)" : "hsl(0 0% 100% / 0.96)"
            : "rgba(0,0,0,0)",
          borderColor: scrolled || !isHeroPage
            ? "hsl(var(--border) / 0.5)"
            : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute inset-0 backdrop-blur-md border-b"
      />

      <div className="relative max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center z-10 py-3 shrink-0">
          <motion.img
            src={logoSrc}
            alt="Zithelo Real Estate Limited"
            animate={{ height: scrolled ? 34 : 42 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-auto"
          />
        </Link>

        {/* ── Desktop nav ── */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) =>
            link.children ? (
              /* Dropdown item */
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.path)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.path}
                  className={`relative flex items-center gap-1.5 px-3 py-[5px] my-auto mx-1 text-[11.5px] tracking-[0.12em] uppercase font-display font-bold transition-all duration-300 rounded-md ${
                    isLinkActive(link, pathname)
                      ? "text-[hsl(43,70%,52%)] bg-[hsl(17,13%,12%)] shadow-sm"
                      : inactiveColor
                  }`}
                >
                  {link.label}
                  <motion.span
                    animate={{ rotate: openDropdown === link.path ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={11} />
                  </motion.span>
                </Link>

                <AnimatePresence>
                  {openDropdown === link.path && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-1 z-50 min-w-[168px]"
                    >
                      <div
                        className="border border-border rounded-xl py-2 shadow-2xl shadow-black/20 overflow-hidden"
                        style={{
                          background: theme === "dark"
                            ? "hsl(17 12% 12%)"
                            : "hsl(0 0% 100%)",
                        }}
                      >
                        <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient opacity-60" />
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            href={child.path}
                            className={`flex items-center gap-3 px-5 py-2.5 text-[11.5px] tracking-[0.12em] uppercase font-display font-bold transition-all duration-200 group ${
                              pathname === child.path
                                ? "text-primary bg-primary/8"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            }`}
                          >
                            <span className={`w-1 h-1 rounded-full transition-colors duration-200 ${pathname === child.path ? "bg-primary" : "bg-border group-hover:bg-primary/60"}`} />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Regular item */
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-3 py-[5px] my-auto mx-1 text-[11.5px] tracking-[0.12em] uppercase font-display font-bold transition-all duration-300 rounded-md ${
                  isLinkActive(link, pathname)
                    ? "text-[hsl(43,70%,52%)] bg-[hsl(17,13%,12%)] shadow-sm"
                    : inactiveColor
                }`}
              >
                {link.label}
              </Link>
            )
          )}

          <div className="w-px h-4 bg-border/50 mx-2" />

          <motion.a
            href="/contact"
            animate={{
              boxShadow: [
                "0 0 10px 3px rgba(212,170,83,0.5), 0 0 20px 6px rgba(212,170,83,0.25)",
                "0 0 20px 8px rgba(212,170,83,0.85), 0 0 36px 12px rgba(212,170,83,0.4)",
                "0 0 10px 3px rgba(212,170,83,0.5), 0 0 20px 6px rgba(212,170,83,0.25)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="ml-1 px-5 py-2 text-[11.5px] tracking-[0.12em] uppercase font-display font-bold gold-gradient text-primary-foreground rounded-sm cursor-pointer"
          >
            Contact
          </motion.a>

          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile toggle — hidden on mobile (bottom tab bar handles it) */}
        <div className="lg:hidden z-10 flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`transition-colors duration-300 ${isHeroPage && !scrolled && !isOpen ? "text-white" : "text-foreground"}`}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span key="x"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }} className="block">
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span key="menu"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }} className="block">
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile App Drawer (slides up from bottom) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            {/* Drawer slides up from bottom */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
              className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl overflow-hidden shadow-2xl"
              style={{ maxHeight: "88vh" }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-0">
                <div className="w-10 h-1 rounded-full bg-border" />
              </div>
              {/* Gold accent line */}
              <div className="h-px mx-6 mt-3 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <div className="overflow-y-auto px-6 pb-10" style={{ maxHeight: "calc(88vh - 60px)" }}>
                {/* Logo + close */}
                <div className="flex items-center justify-between py-4 mb-2">
                  <img
                    src={theme === "dark" ? "/images/zithelo-logo-white.png" : "/images/zithelo-logo-colored.png"}
                    alt="Zithelo" className="h-8 w-auto"
                  />
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-9 h-9 rounded-full bg-muted flex items-center justify-center"
                      aria-label="Close menu"
                    >
                      <X size={17} />
                    </button>
                  </div>
                </div>

                {/* Nav links */}
                <nav className="space-y-1">
                  {[...navLinks, { label: "Contact", path: "/contact", children: undefined }].map((link, i) => (
                    <div key={link.path}>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.04 + i * 0.04, ease: [0.33, 1, 0.68, 1] }}
                      >
                        <Link
                          href={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 active:scale-[0.97] ${
                            isLinkActive(link, pathname) ? "bg-primary/10" : "active:bg-muted"
                          }`}
                        >
                          <span className="text-[10px] text-primary/40 font-body w-5 shrink-0 tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className={`font-display text-xl font-bold flex-1 ${
                            isLinkActive(link, pathname) ? "gold-gradient-text" : "text-foreground"
                          }`}>
                            {link.label}
                          </span>
                          {isLinkActive(link, pathname) && (
                            <span className="w-2 h-2 rounded-full gold-gradient shrink-0" />
                          )}
                        </Link>
                      </motion.div>
                      {link.children && (
                        <motion.div
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          transition={{ delay: 0.12 + i * 0.04 }}
                          className="flex flex-wrap gap-2 pl-14 pb-2"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              href={child.path}
                              onClick={() => setIsOpen(false)}
                              className={`px-3 py-1.5 rounded-full text-[10px] tracking-[0.15em] uppercase font-body font-semibold border transition-colors ${
                                pathname === child.path
                                  ? "bg-primary/15 border-primary/40 text-primary"
                                  : "border-border text-muted-foreground"
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </nav>

                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-body text-center"
                >
                  Zithelo Real Estate Limited
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Bottom Tab Bar ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/92 backdrop-blur-xl border-t border-border/60"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-stretch justify-around px-2">
          {bottomTabs.map((tab) => {
            const isMore = tab.path === "__more__";
            const isActive = isMore
              ? isOpen
              : tab.path === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.path);
            return (
              <button key={tab.path} className="flex-1" aria-label={tab.label}
                onClick={() => { if (isMore) setIsOpen((v) => !v); }}
              >
                {isMore ? (
                  <span className="flex flex-col items-center gap-1 py-2.5 w-full">
                    <span className={`flex items-center justify-center w-9 h-9 rounded-2xl transition-all duration-200 ${
                      isActive ? "gold-gradient shadow-md shadow-primary/30" : ""
                    }`}>
                      <tab.icon size={18} className={isActive ? "text-primary-foreground" : "text-muted-foreground"} />
                    </span>
                    <span className={`text-[9px] tracking-wide font-body font-semibold ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}>{tab.label}</span>
                  </span>
                ) : (
                  <Link href={tab.path} className="flex flex-col items-center gap-1 py-2.5 w-full active:scale-95 transition-transform duration-150">
                    <span className={`flex items-center justify-center w-9 h-9 rounded-2xl transition-all duration-200 ${
                      isActive ? "gold-gradient shadow-md shadow-primary/30" : ""
                    }`}>
                      <tab.icon size={18} className={isActive ? "text-primary-foreground" : "text-muted-foreground"} />
                    </span>
                    <span className={`text-[9px] tracking-wide font-body font-semibold ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}>{tab.label}</span>
                  </Link>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
