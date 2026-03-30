"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

const KEY = "zithelo_saved";

interface SavedCtxType {
  saved: string[];
  toggle: (slug: string) => void;
  isSaved: (slug: string) => boolean;
  count: number;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
}

const SavedCtx = createContext<SavedCtxType>({
  saved: [],
  toggle: () => {},
  isSaved: () => false,
  count: 0,
  drawerOpen: false,
  setDrawerOpen: () => {},
});

export function SavedPropertiesProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(KEY);
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggle = useCallback((slug: string) => {
    setSaved((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  return (
    <SavedCtx.Provider
      value={{
        saved,
        toggle,
        isSaved: (s) => saved.includes(s),
        count: saved.length,
        drawerOpen,
        setDrawerOpen,
      }}
    >
      {children}
    </SavedCtx.Provider>
  );
}

export const useSaved = () => useContext(SavedCtx);
