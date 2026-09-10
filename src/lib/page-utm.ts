const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export function pageUtms(search = typeof window === "undefined" ? "" : window.location.search): Record<string, string> {
  const src = new URLSearchParams(search);
  const out: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = src.get(key);
    if (value) out[key] = value;
  }
  return out;
}

export function withUtms(baseUrl: string, utms: Record<string, string>): string {
  const url = new URL(baseUrl);
  for (const [key, value] of Object.entries(utms)) {
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}
