/**
 * Shared assistant constants.
 *
 * Kept in its own module so `knowledge.ts` and `live-knowledge.ts` can both use
 * them without importing each other.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";
