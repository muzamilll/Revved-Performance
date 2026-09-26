"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  priority?: boolean;
}

export const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(
  ({ children, delay = 0, priority = false, className, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
      return (
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      );
    }

    // If it's a priority reveal (above the fold), we might not want to hide it initially,
    // or we use motion's initial state so SSR renders it, then client animates.
    // However, the rule states "never hide the hero until JavaScript loads".
    // A safe approach for SSR is to let it render normally, but we can animate it from its normal position if needed,
    // or use Framer Motion's ability to hydrate safely.
    // Framer Motion's `initial` is applied on the server. If we hide it (`opacity: 0`), it's hidden without JS.
    // To solve this, for priority items, we don't fade them in from 0 on the server.
    
    return (
      <motion.div
        ref={ref}
        initial={priority ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        className={cn(className)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);
Reveal.displayName = "Reveal";
