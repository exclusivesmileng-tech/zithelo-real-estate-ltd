// Meta Pixel helpers. The base script is injected by MetaPixelLoader on every
// page; until it loads `window.fbq` is undefined and calls no-op.

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1090740333669483";

type FbqParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a standard Meta event (Lead, Contact, Schedule, CompleteRegistration…).
 * Pass `eventId` when the server also reports the event via the Conversions
 * API, so Meta deduplicates the pair instead of counting it twice.
 */
export function trackMeta(event: string, params?: FbqParams, eventId?: string) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (eventId) window.fbq("track", event, params, { eventID: eventId });
  else window.fbq("track", event, params);
}
