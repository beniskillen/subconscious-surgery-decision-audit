/** Public Pixel ID from Events Manager. Safe in the browser bundle. */
export const META_PIXEL_ID = "1305330447748049";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded?: boolean;
  version?: string;
  push?: Fbq;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export function pixelId(): string {
  const fromEnv = import.meta.env["VITE_META_PIXEL_ID"] as string | undefined;
  return fromEnv?.trim() || META_PIXEL_ID;
}

export function pixelBaseCode(): string {
  const id = pixelId();
  return `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${id}');
fbq('track', 'PageView');`;
}

export function pixelNoscriptSrc(): string {
  return `https://www.facebook.com/tr?id=${pixelId()}&ev=PageView&noscript=1`;
}

function cookie(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  const value = match?.[1];
  return value ? decodeURIComponent(value) : "";
}

/** No-op when fbq is already installed by the head snippet. */
export function initPixel(): void {
  if (typeof window === "undefined" || window.fbq) return;
  const script = document.createElement("script");
  script.text = pixelBaseCode();
  document.head.appendChild(script);
}

/**
 * Fire Schedule on Calendly event_scheduled only — never on CTA click.
 * Browser pixel and CAPI share the same event_id for dedup.
 */
export async function fireSchedule(): Promise<string> {
  const eventId = crypto.randomUUID();
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Schedule", { content_name: "Decision Audit" }, { eventID: eventId });
  }
  try {
    await fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "Schedule",
        event_id: eventId,
        event_source_url: window.location.href,
        user_agent: navigator.userAgent,
        fbp: cookie("_fbp"),
        fbc: cookie("_fbc"),
      }),
    });
  } catch {
    // Pixel already fired. CAPI is best-effort from the browser.
  }
  return eventId;
}
