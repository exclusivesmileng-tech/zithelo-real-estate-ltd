// Meta Pixel helpers. The base script is injected by MetaPixelLoader once the
// visitor accepts cookies; until then `window.fbq` is undefined and calls no-op.

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1090740333669483";

type FbqParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fire a standard Meta event (Lead, Contact, Schedule, CompleteRegistration…). */
export function trackMeta(event: string, params?: FbqParams) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, params);
}
