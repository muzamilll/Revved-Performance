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

export function trackEvent(event: AnalyticsEvent, data?: Record<string, unknown>) {
  if (process.env.NODE_ENV === "development") {
    console.debug(`[Analytics Track] ${event}`, data || {});
  }
  // no-op until tracking prompt is run
}
