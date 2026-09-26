"use client";

import Link from "next/link";
import { trackEvent, AnalyticsEvent } from "../../lib/analytics";

interface TrackedLinkProps {
  href: string;
  event: AnalyticsEvent;
  properties?: Record<string, unknown>;
  className?: string;
  children: React.ReactNode;
}

export function TrackedLink({ href, event, properties, className, children }: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(event, properties);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
