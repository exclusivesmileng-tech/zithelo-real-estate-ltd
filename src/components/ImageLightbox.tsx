"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  index: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelect: (i: number) => void;
  title?: string;
}

export default function ImageLightbox({
  images, index, isOpen, onClose, onNext, onPrev, onSelect, title,
}: Props) {
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, onNext, onPrev]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/96 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 md:px-8 py-4 z-10 bg-gradient-to-b from-black/60 to-transparent">
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/50 font-body font-semibold">
              {title && <>{title}&nbsp;&middot;&nbsp;</>}{index + 1}&nbsp;/&nbsp;{images.length}
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-200"
            >
              <X size={16} />
            </button>
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous image"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-200"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next image"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-200"
          >
            <ChevronRight size={20} />
          </button>

          {/* Image */}
          <div
            className="flex items-center justify-center w-full px-16 md:px-24"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={images[index]}
                alt={`${title ?? "Image"} ${index + 1}`}
                initial={{ opacity: 0, scale: 0.88, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="max-h-[75vh] max-w-full object-contain rounded-sm shadow-2xl"
              />
            </AnimatePresence>
          </div>

          {/* Thumbnail strip */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center px-6 pt-3 pb-4 bg-gradient-to-t from-black/80 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-1.5 overflow-x-auto max-w-full pb-0.5 scrollbar-thin">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => onSelect(i)}
                  className={`flex-shrink-0 w-10 h-7 rounded-sm overflow-hidden border transition-all duration-200 ${
                    i === index
                      ? "border-primary opacity-100 scale-110"
                      : "border-white/20 opacity-35 hover:opacity-75 hover:border-white/50"
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
