import * as React from "react";
import { cn } from "../../lib/utils";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;      // kept for older callers; reveals are timed in MotionProvider
  priority?: boolean;  // kept for older callers
}

// Marks a block for a scroll reveal. The animation itself lives in components/motion/MotionProvider.tsx
// (GSAP). The content is in the HTML and visible by default; only blocks still below the screen
// are hidden, just before they're revealed.
export function Reveal({ children, delay: _delay, priority: _priority, className, ...props }: RevealProps) {
  void _delay;
  void _priority;
  return (
    <div data-reveal="" className={cn(className)} {...props}>
      {children}
    </div>
  );
}
