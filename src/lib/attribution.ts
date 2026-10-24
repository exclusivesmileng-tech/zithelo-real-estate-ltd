// First-touch campaign attribution, captured on landing and sent with every
// property lead so Airtable shows which ad/campaign produced it.

const STORAGE_KEY = "zithelo-attribution";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"] as const;

export type Attribution = Partial<Record<(typeof PARAMS)[number] | "landing_page", string>>;

/** Call on every page load; keeps the first campaign touch, replaced only by a newer campaign click. */
export function captureAttribution() {
  try {
    const url = new URL(window.location.href);
    const fromUrl: Attribution = {};
    for (const p of PARAMS) {
      const v = url.searchParams.get(p);
      if (v) fromUrl[p] = v.slice(0, 300);
    }
    const hasCampaign = Object.keys(fromUrl).length > 0;
    if (!hasCampaign && localStorage.getItem(STORAGE_KEY)) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...fromUrl, landing_page: url.pathname + url.search })
    );
  } catch {
    /* storage blocked — attribution is best-effort */
  }
}

function cookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/** Stored attribution plus Meta's browser ids, for the Conversions API. */
export function getAttribution(): Attribution & { fbp?: string; fbc?: string } {
  let stored: Attribution = {};
  try {
    stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    /* ignore */
  }
  return { ...stored, fbp: cookie("_fbp"), fbc: cookie("_fbc") };
}

export function newEventId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
