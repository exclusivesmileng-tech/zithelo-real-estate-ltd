"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSaved } from "@/contexts/SavedPropertiesContext";

interface Props {
  slug: string;
  className?: string;
}

export default function SaveButton({ slug, className = "" }: Props) {
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(slug);

  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      whileTap={{ scale: 0.82 }}
      aria-label={saved ? "Remove from saved" : "Save property"}
      className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
        saved
          ? "bg-primary shadow-lg shadow-primary/40"
          : "bg-black/50 backdrop-blur-sm hover:bg-black/70"
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {saved ? (
          <motion.div
            key="saved"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <BookmarkCheck size={16} className="text-primary-foreground" />
          </motion.div>
        ) : (
          <motion.div
            key="unsaved"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Bookmark size={16} className="text-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
