// Browser-side lead logging. First-touch data (campaign tags, referrer, landing
// page) is read into memory when the visitor lands and sent with each enquiry to
// our own server. Nothing is written to cookies or browser storage.

import { normaliseReg } from "../vehicle";

type Landing = {
  src?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  fbclid?: boolean;
  gclid?: boolean;
  referrer?: string;
  landingPage?: string;
  isTest?: boolean;
};

function readLanding(): Landing {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const get = (key: string) => params.get(key)?.trim().slice(0, 100) || undefined;
  let referrer: string | undefined;
  try {
    const ref = document.referrer ? new URL(document.referrer) : null;
    // Internal navigation is not a referrer
    if (ref && ref.host !== window.location.host) referrer = ref.origin + ref.pathname;
  } catch {
    referrer = undefined;
  }
  return {
    src: get("src"),
    utmSource: get("utm_source"),
    utmMedium: get("utm_medium"),
    utmCampaign: get("utm_campaign"),
    fbclid: params.has("fbclid"),
    gclid: params.has("gclid"),
    referrer,
    landingPage: window.location.pathname,
    isTest: params.get("test") === "1",
  };
}

// Captured once, at module load on the landing page, so it survives client-side navigation.
const landing: Landing = readLanding();

export type LeadPayload = {
  contactMethod: "form" | "whatsapp_click" | "call_click";
  service?: string;
  reg?: string;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  company?: string; // honeypot
};

function body(payload: LeadPayload) {
  return JSON.stringify({
    ...payload,
    reg: payload.reg ? normaliseReg(payload.reg) : undefined,
    page: typeof window !== "undefined" ? window.location.pathname : undefined,
    landing,
  });
}

// Fire-and-forget for clicks: never delays opening WhatsApp or the dialler.
export function logClickLead(payload: LeadPayload) {
  if (typeof window === "undefined") return;
  try {
    const data = body(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/leads", new Blob([data], { type: "application/json" }));
    } else {
      void fetch("/api/leads", { method: "POST", body: data, headers: { "content-type": "application/json" }, keepalive: true });
    }
  } catch {
    // Logging must never block the customer
  }
}

// Awaited submit for the enquiry form, so the visitor sees whether it worked.
export async function submitFormLead(payload: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      body: body(payload),
      headers: { "content-type": "application/json" },
    });
    const json = (await res.json().catch(() => ({}))) as { error?: string };
    return res.ok ? { ok: true } : { ok: false, error: json.error || "Something went wrong." };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again or message us on WhatsApp." };
  }
}
