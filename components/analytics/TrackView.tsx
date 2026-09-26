"use client";

import { useEffect, useRef } from "react";
import { trackEvent, AnalyticsEvent } from "../../lib/analytics";

export function TrackView({ event, properties }: { event: AnalyticsEvent, properties?: Record<string, unknown> }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      trackEvent(event, properties);
      tracked.current = true;
    }
  }, [event, properties]);

  return null;
}
