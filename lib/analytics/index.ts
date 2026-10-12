import { hasConsent } from "../consent";
import { getAttribution, persistAttribution } from "./attribution";
import { GA4_ID, META_PIXEL_ID, initGtag, initPixel } from "./providers";

export type AnalyticsEvent =
  | "page_view"
  | "offer_view"
  | "offer_click"
  | "service_view"
  | "service_details_open"
  | "vehicle_lookup_start"
  | "vehicle_lookup_success"
  | "vehicle_lookup_failure"
  | "performance_result_view"
  | "whatsapp_click"
  | "phone_click"
  | "quote_start"
  | "faq_open"
  | "review_click"
  | "location_view";

// Events that carry campaign attribution
const CONVERSIONS: AnalyticsEvent[] = ["whatsapp_click", "service_view", "offer_view", "quote_start"];

// Meta only receives these; everything else is GA4 only
const META_EVENTS: Partial<Record<AnalyticsEvent, string>> = {
  whatsapp_click: "Contact",
  service_view: "ViewContent",
  offer_view: "ViewContent",
};

// Free text (e.g. a prefilled WhatsApp message) is never sent to a provider
const DROPPED_KEYS = new Set(["message"]);

function generateEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

// Service or offer slug: from the event data, else from the page the event came from
function slugFor(data?: Record<string, unknown>): { service?: string; offer?: string } {
  if (typeof data?.service === "string") return { service: data.service };
  if (typeof data?.offer === "string") return { offer: data.offer };
  const match = window.location.pathname.match(/^\/(services|offers)\/([^/]+)/);
  if (!match) return {};
  return match[1] === "services" ? { service: match[2] } : { offer: match[2] };
}

function toParams(data?: Record<string, unknown>): Record<string, string | number | boolean> {
  const params: Record<string, string | number | boolean> = {};
  Object.entries(data || {}).forEach(([key, value]) => {
    if (DROPPED_KEYS.has(key)) return;
    if (typeof value === "string") params[key] = value.slice(0, 100);
    else if (typeof value === "number" || typeof value === "boolean") params[key] = value;
  });
  return params;
}

export function trackEvent(event: AnalyticsEvent, data?: Record<string, unknown>) {
  const eventId = generateEventId();

  if (process.env.NODE_ENV === "development") {
    console.debug(`[Analytics Track] ${event}`, { ...data, event_id: eventId });
  }

  if (typeof window === "undefined") return;

  // A returning visitor's page-view events can fire before AnalyticsScripts has
  // mounted, so set the providers up here too (both are idempotent)
  const analytics = hasConsent("analytics") && !!GA4_ID;
  if (analytics) initGtag(GA4_ID!, hasConsent("marketing"));
  const meta = META_EVENTS[event];
  const marketing = !!meta && hasConsent("marketing") && !!META_PIXEL_ID;
  if (marketing) initPixel(META_PIXEL_ID!);
  if (!analytics && !marketing) return;

  const conversion = CONVERSIONS.includes(event);
  if (conversion) persistAttribution();

  const slug = event === "whatsapp_click" || meta ? slugFor(data) : {};
  const params = {
    ...toParams(data),
    ...slug,
    ...(conversion ? getAttribution() : {}),
  };

  if (analytics) window.gtag!("event", event, { ...params, event_id: eventId });

  if (marketing) {
    const slugValue = slug.service ?? slug.offer;
    window.fbq!(
      "track",
      meta,
      {
        ...params,
        ...(slugValue
          ? { content_ids: [slugValue], content_name: slugValue, content_category: slug.service ? "service" : "offer" }
          : {}),
      },
      // Same id on both sides, so server-side Conversions API events can dedupe later
      { eventID: eventId }
    );
  }
}
