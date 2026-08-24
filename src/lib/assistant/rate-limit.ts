/**
 * Shared in-memory rate limiter for the assistant's API routes (chat + the
 * lead-form submit endpoint share one budget per IP — submitting the form is
 * part of the same conversation as the chat messages that led to it).
 *
 * Per-instance, not distributed: it blunts casual abuse and runaway cost, but
 * isn't a hard guarantee across a multi-instance deployment. Move to
 * Redis/Upstash if the site scales past a single serverless instance.
 */

import type { NextRequest } from "next/server";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;
const hits = new Map<string, number[]>();

export function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

export function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}
