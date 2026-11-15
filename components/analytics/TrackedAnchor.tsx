"use client";

import * as React from "react";
import { trackEvent, AnalyticsEvent } from "../../lib/analytics";

interface TrackedAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  event: AnalyticsEvent;
  properties?: Record<string, unknown>;
}

// A plain <a> (tel:, mailto:, external) that records an analytics event when used
export function TrackedAnchor({ event, properties, onClick, children, ...props }: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackEvent(event, properties);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
