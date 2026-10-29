import { LEAD_SOURCES, LeadSource } from "./types";

export type SourceInput = {
  src?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  fbclid?: boolean;
  gclid?: boolean;
  referrer?: string | null;
};

const PAID_MEDIUMS = ["cpc", "ppc", "paid", "paid_social", "paidsocial", "ads", "ad", "display"];

// One source per lead, most specific signal first: an explicit ?src=, then campaign
// tags, then ad click ids, then the referring site, otherwise "direct".
export function deriveSource(input: SourceInput): LeadSource {
  const src = input.src?.toLowerCase().trim();
  if (src && (LEAD_SOURCES as readonly string[]).includes(src)) return src as LeadSource;

  const utm = input.utmSource?.toLowerCase().trim();
  const medium = input.utmMedium?.toLowerCase().trim() ?? "";
  const paid = PAID_MEDIUMS.includes(medium);

  if (utm) {
    if (utm.includes("google")) return paid ? "google_ads" : "google";
    if (utm === "ig" || utm.includes("instagram")) return paid ? "meta_ads" : "instagram";
    if (utm === "fb" || utm.includes("facebook") || utm.includes("meta")) return paid ? "meta_ads" : "facebook";
    if (utm.includes("whatsapp")) return "whatsapp";
    return "other";
  }

  if (input.gclid) return "google_ads";
  if (input.fbclid) return "meta_ads";

  const ref = input.referrer?.toLowerCase() ?? "";
  if (ref) {
    let host = "";
    try {
      host = new URL(ref).hostname;
    } catch {
      host = ref;
    }
    if (/(^|\.)google\./.test(host) || host.includes("bing.") || host.includes("duckduckgo.")) return "google";
    if (host.includes("instagram.")) return "instagram";
    if (host.includes("facebook.") || host.includes("fb.com")) return "facebook";
    if (host.includes("whatsapp.")) return "whatsapp";
    return "referral";
  }

  return "direct";
}
