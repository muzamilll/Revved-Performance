"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { trackEvent, AnalyticsEvent } from "../../lib/analytics";

interface AccordionProps extends React.HTMLAttributes<HTMLDetailsElement> {
  title: string;
  children: React.ReactNode;
  trackingEvent?: AnalyticsEvent;
}

export const Accordion = React.forwardRef<HTMLDetailsElement, AccordionProps>(
  ({ title, children, className, onToggle, trackingEvent = "faq_open", ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleToggle = (e: any) => {
      const details = e.currentTarget;
      if (details.open) {
        trackEvent(trackingEvent, { title });
      }
      onToggle?.(e);
    };

    return (
      <details
        ref={ref}
        onToggle={handleToggle}
        className={cn("group border-b border-thin overflow-hidden marker:hidden", className)}
        {...props}
      >
        <summary className="flex items-center justify-between py-4 cursor-pointer list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm text-lg font-medium">
          {title}
          <span className="ml-4 flex-shrink-0 transition-transform duration-300 group-open:rotate-180 text-accent">
            <ChevronDown className="w-5 h-5" />
          </span>
        </summary>
        <div className="pb-4 text-muted overflow-hidden">
          {/* A simple CSS trick: we can use a fade-in animation on the content */}
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            {children}
          </div>
        </div>
      </details>
    );
  }
);
Accordion.displayName = "Accordion";
