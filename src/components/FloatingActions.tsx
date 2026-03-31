"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle, Phone, Mail, X, Headphones, PhoneCall, Bookmark } from "lucide-react";
import { useSaved } from "@/contexts/SavedPropertiesContext";
import BookCallbackModal from "@/components/BookCallbackModal";

const PHONE = "tel:+2349110222323";
const EMAIL = "mailto:info@zithelo.com";

const PROJECT_MESSAGES: Record<string, string> = {
  "/projects/andoyi-house": "Hello, I'm interested in Andoyi House by Zithelo Real Estate. Please share more details.",
  "/projects/signature-homes": "Hello, I'm interested in Signature Homes by Zithelo Real Estate. Please share more details.",
};
const DEFAULT_MESSAGE = "Hello, I'm interested in Zithelo Real Estate. Please share more details.";

function whatsappUrl(path: string) {
  const base = path.replace(/\/$/, "");
  const msg = PROJECT_MESSAGES[base] ?? DEFAULT_MESSAGE;
  return `https://wa.me/2349110222323?text=${encodeURIComponent(msg)}`;
}

export default function FloatingActions() {
  const pathname = usePathname();
  const { count, setDrawerOpen } = useSaved();
  const [showTop, setShowTop] = useState(false);
  const [open, setOpen] = useState(false);
  const [showCallback, setShowCallback] = useState(false);

  const contacts = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: whatsappUrl(pathname),
      bg: "bg-[#25D366]",
      target: "_blank" as const,
      onClick: undefined as undefined | (() => void),
    },
    {
      icon: Phone,
      label: "Call Us",
      href: PHONE,
      bg: "bg-[hsl(var(--charcoal))]",
      target: "_self" as const,
      onClick: undefined,
    },
    {
      icon: Mail,
      label: "Email",
      href: EMAIL,
      bg: "bg-[hsl(var(--charcoal))]",
      target: "_self" as const,
      onClick: undefined,
    },
    {
      icon: PhoneCall,
      label: "Book a Call",
      href: "#",
      bg: "bg-[hsl(var(--charcoal))]",
      target: "_self" as const,
      onClick: () => { setOpen(false); setShowCallback(true); },
    },
  ];

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* ── Mobile-only WhatsApp sticky button ── */}
      <a
        href={whatsappUrl(pathname)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="lg:hidden fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-4 z-50 w-[52px] h-[52px] rounded-full bg-[#25D366] flex items-center justify-center shadow-xl shadow-black/25 hover:opacity-90 transition-opacity"
      >
        <MessageCircle size={24} className="text-white" />
      </a>

      <div className="hidden lg:contents">
      {/* ── Back to top — bottom LEFT ── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-[calc(2rem+env(safe-area-inset-bottom))] left-6 z-50 w-11 h-11 rounded-full gold-gradient flex items-center justify-center shadow-lg shadow-primary/30 hover:opacity-90 hover:scale-110 transition-all duration-200"
          >
            <ArrowUp size={18} className="text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Saved-properties pill — bottom right, left of FAB ── */}
      <AnimatePresence>
        {count > 0 && !open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: 10 }}
            transition={{ duration: 0.25 }}
            onClick={() => setDrawerOpen(true)}
            aria-label="View saved properties"
            className="fixed bottom-[calc(2rem+env(safe-area-inset-bottom))] right-[76px] z-50 h-11 px-4 rounded-full gold-gradient flex items-center gap-2 shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
          >
            <Bookmark size={14} className="text-primary-foreground" />
            <span className="text-xs font-body font-bold text-primary-foreground">
              Saved {count}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Contact FAB — bottom RIGHT ── */}
      <div className="fixed bottom-[calc(2rem+env(safe-area-inset-bottom))] right-6 z-50 flex flex-col items-center gap-3">

        {/* Expanded contact buttons */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-2"
            >
              {contacts.map((c, i) => (
                c.onClick ? (
                  <motion.button
                    key={c.label}
                    onClick={c.onClick}
                    aria-label={c.label}
                    initial={{ opacity: 0, y: 12, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.85 }}
                    transition={{ duration: 0.22, delay: (contacts.length - 1 - i) * 0.06 }}
                    className={`group relative w-11 h-11 rounded-full ${c.bg} flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200`}
                  >
                    <c.icon size={18} className="text-white" />
                    <span className="hidden sm:block absolute right-14 whitespace-nowrap bg-foreground text-background dark:text-foreground dark:bg-card text-xs font-body font-semibold px-3 py-1.5 rounded-sm shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150">
                      {c.label}
                    </span>
                  </motion.button>
                ) : (
                  <motion.a
                    key={c.label}
                    href={c.href}
                    target={c.target}
                    rel={c.target === "_blank" ? "noopener noreferrer" : undefined}
                    aria-label={c.label}
                    initial={{ opacity: 0, y: 12, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.85 }}
                    transition={{ duration: 0.22, delay: (contacts.length - 1 - i) * 0.06 }}
                    className={`group relative w-11 h-11 rounded-full ${c.bg} flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200`}
                  >
                    <c.icon size={18} className="text-white" />
                    <span className="hidden sm:block absolute right-14 whitespace-nowrap bg-foreground text-background dark:text-foreground dark:bg-card text-xs font-body font-semibold px-3 py-1.5 rounded-sm shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150">
                      {c.label}
                    </span>
                  </motion.a>
                )
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close contact menu" : "Open contact menu"}
          whileTap={{ scale: 0.92 }}
          className="w-13 h-13 w-[52px] h-[52px] rounded-full gold-gradient flex items-center justify-center shadow-xl shadow-primary/30 hover:opacity-90 transition-all duration-200"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div key="close"
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}>
                <X size={22} className="text-primary-foreground" />
              </motion.div>
            ) : (
              <motion.div key="contact"
                initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}>
                <Headphones size={22} className="text-primary-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Book Callback modal */}
      <BookCallbackModal
        open={showCallback}
        onClose={() => setShowCallback(false)}
      />
    </div>
    </>
  );
}
