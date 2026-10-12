// Low-level GA4 (gtag) and Meta Pixel (fbq) setup. Only ever called once the
// matching consent has been given; see components/analytics/AnalyticsScripts.tsx.

type Command = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Command;
    fbq?: Command & { callMethod?: Command; queue?: unknown[]; push?: Command; loaded?: boolean; version?: string };
    _fbq?: Window["fbq"];
  }
}

// Invalid or missing IDs resolve to null, and the provider simply doesn't load
function readId(value: string | undefined, pattern: RegExp): string | null {
  const id = value?.trim();
  return id && pattern.test(id) ? id : null;
}

export const GA4_ID = readId(process.env.NEXT_PUBLIC_GA4_ID, /^G-[A-Z0-9]+$/i);
export const META_PIXEL_ID = readId(process.env.NEXT_PUBLIC_META_PIXEL_ID, /^\d+$/);

let gaInitialised = false;
let pixelInitialised = false;

function adConsent(marketing: boolean) {
  const value = marketing ? "granted" : "denied";
  return { ad_storage: value, ad_user_data: value, ad_personalization: value };
}

export function initGtag(id: string, marketing: boolean) {
  if (gaInitialised) return;
  gaInitialised = true;
  window.dataLayer = window.dataLayer || [];
  // gtag.js expects the arguments object itself, not an array
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  // Consent mode: everything denied by default, then updated straight away to
  // what the user has just accepted (this only runs after analytics consent).
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", { analytics_storage: "granted", ...adConsent(marketing) });
  window.gtag("js", new Date());
  window.gtag("config", id);
}

export function updateGtagConsent(analytics: boolean, marketing: boolean) {
  if (!window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ...adConsent(marketing),
  });
}

export function initPixel(id: string) {
  if (pixelInitialised) return;
  pixelInitialised = true;
  if (!window.fbq) {
    // Meta's standard queue stub; fbevents.js replays the queue once it loads
    const fbq: NonNullable<Window["fbq"]> = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue!.push(args);
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    if (!window._fbq) window._fbq = fbq;
  }
  window.fbq("consent", "grant");
  window.fbq("init", id);
  window.fbq("track", "PageView");
}

export function setPixelConsent(granted: boolean) {
  if (!window.fbq) return;
  window.fbq("consent", granted ? "grant" : "revoke");
}

// Removes first-party cookies a provider set, when its consent is withdrawn
export function clearCookies(match: (name: string) => boolean) {
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join(".")}`);
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (!name || !match(name)) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    });
  });
}

export const isGaCookie = (name: string) => name.startsWith("_ga") || name === "_gid" || name.startsWith("_gat");
export const isPixelCookie = (name: string) => name === "_fbp" || name === "_fbc";
