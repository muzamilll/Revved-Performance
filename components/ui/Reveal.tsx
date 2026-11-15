"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number; // seconds
  priority?: boolean; // accepted for older callers; above-the-fold content is never hidden anyway
}

// Subtle section reveal: fades and rises a section as it scrolls into view.
// The content is in the HTML and visible by default. It is only hidden (and then revealed)
// once JavaScript has confirmed the section is still below the screen, so nothing depends
// on JavaScript to be readable, and visitors who prefer reduced motion get no animation.
export function Reveal({ children, delay = 0, priority: _priority, className, style, ...props }: RevealProps) {
  void _priority;
  const ref = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState<"static" | "pending" | "shown">("static");

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen (or above it): leave it alone
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setState("pending");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        state !== "static" && "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        state === "pending" && "opacity-0 translate-y-3",
        className
      )}
      style={delay ? { ...style, transitionDelay: `${delay}s` } : style}
      {...props}
    >
      {children}
    </div>
  );
}
