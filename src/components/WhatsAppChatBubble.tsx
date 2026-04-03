"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/2349110222323?text=Hi%20Zithelo%2C%20I%27m%20interested%20in%20your%20premium%20developments.%20Could%20you%20tell%20me%20more%3F";

const STORAGE_KEY = "zithelo-wa-bubble-dismissed";

export default function WhatsAppChatBubble() {
  const [visible, setVisible]     = useState(false);
  const [open, setOpen]           = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Show bubble after 6 s — skip if already dismissed this session
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    setVisible(false);
    setOpen(false);
    setDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }

  if (dismissed) return null;

  return (
    // Hidden on mobile — mobile already has the green fab in FloatingActions
    <div className="hidden lg:flex fixed bottom-24 right-6 z-[60] flex-col items-end gap-3">

      {/* ── Expanded chat card ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-[300px] rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10"
          >
            {/* Header */}
            <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm font-body leading-tight">Zithelo Team</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block" />
                    <p className="text-white/70 text-[10px] font-body">Online · Replies in minutes</p>
                  </div>
                </div>
              </div>
              <button
                onClick={dismiss}
                aria-label="Close chat"
                className="text-white/60 hover:text-white transition-colors p-1"
              >
                <X size={15} />
              </button>
            </div>

            {/* Chat bubble area */}
            <div
              className="px-4 py-5"
              style={{
                background: "linear-gradient(to bottom, #e5ddd5 0%, #d1c4b8 100%)",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl rounded-tl-[4px] px-4 py-3 shadow-md max-w-[90%]"
              >
                <p className="text-sm font-body text-gray-800 leading-relaxed">
                  👋 Hi there!
                </p>
                <p className="text-sm font-body text-gray-800 leading-relaxed mt-1">
                  Interested in our premium Lagos developments? We&apos;d love to walk you through the options.
                </p>
                <p className="text-[10px] text-gray-400 font-body mt-2 text-right">
                  Just now ✓✓
                </p>
              </motion.div>
            </div>

            {/* CTA */}
            <div className="bg-white px-3 py-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#1fbd5e] active:bg-[#1aad55] text-white font-body font-semibold text-sm rounded-xl transition-colors"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bubble trigger ── */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="flex items-center gap-3"
          >
            {/* Greeting tooltip — only when not open */}
            <AnimatePresence>
              {!open && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white text-gray-800 rounded-full px-4 py-2 shadow-lg shadow-black/15 text-xs font-body font-medium whitespace-nowrap border border-gray-100"
                >
                  Chat with us 👋
                </motion.div>
              )}
            </AnimatePresence>

            {/* Green bubble button */}
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Chat on WhatsApp"
              className="relative w-14 h-14 bg-[#25D366] rounded-full shadow-xl shadow-green-500/30 flex items-center justify-center hover:bg-[#1fbd5e] transition-colors focus:outline-none"
            >
              {/* Pulse ring — only when closed */}
              {!open && (
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
              )}
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} className="text-white" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="chat"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MessageCircle size={24} className="text-white" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
