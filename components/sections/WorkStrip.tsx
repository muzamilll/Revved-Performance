"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// The recent-work strip. It drifts slowly on its own, like before, but it is a real scroller:
// swipe it on a phone, drag it with a mouse, or use the arrows on desktop. Any touch, hover,
// drag or focus pauses the drift; it picks up again a few seconds after the person lets go.
// Children are rendered twice by the caller (second copy aria-hidden) so the loop is seamless.
const SPEED = 0.35; // px per frame, about 21px a second: the same pace as the old marquee
const RESUME_AFTER = 3500;

export function WorkStrip({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const paused = React.useRef(false);
  const resumeAt = React.useRef(0);
  const drag = React.useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const hold = React.useCallback(() => {
    resumeAt.current = performance.now() + RESUME_AFTER;
  }, []);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let carry = 0;
    const tick = (t: number) => {
      if (!paused.current && !drag.current && t > resumeAt.current) {
        carry += SPEED;
        const step = Math.floor(carry);
        if (step) {
          carry -= step;
          el.scrollLeft += step;
        }
      }
      // Wrap: halfway along, the second copy lines up with the first.
      const half = el.scrollWidth / 2;
      if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const by = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    hold();
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 20 : 300;
    if (dir === -1 && el.scrollLeft < w) el.scrollLeft += el.scrollWidth / 2;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar flex cursor-grab overflow-x-auto overscroll-x-contain px-6 outline-none select-none active:cursor-grabbing md:px-8 lg:px-12"
        onPointerEnter={(e) => { if (e.pointerType === "mouse") paused.current = true; }}
        onPointerLeave={(e) => { if (e.pointerType === "mouse") { paused.current = false; hold(); } drag.current = null; }}
        onTouchStart={hold}
        onTouchMove={hold}
        onWheel={hold}
        onFocus={() => { paused.current = true; }}
        onBlur={() => { paused.current = false; hold(); }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !ref.current) return;
          drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || !ref.current) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 4) d.moved = true;
          ref.current.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => { drag.current = null; hold(); }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); by(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); by(-1); }
        }}
      >
        <ul className="flex w-max items-stretch [&_img]:pointer-events-none">{children}</ul>
      </div>

      <div className="mx-auto mt-5 hidden w-full max-w-[1440px] justify-end gap-2 px-6 md:flex md:px-8 lg:px-12">
        <button type="button" onClick={() => by(-1)} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-ink/25 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream">
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => by(1)} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-ink/25 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream">
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
