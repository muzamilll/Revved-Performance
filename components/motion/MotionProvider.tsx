"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

// All motion on the site, in one place, with GSAP:
//   - the hero entrance (.hero-rise, .hero-art), held until the first-visit loader lifts
//   - section reveals ([data-reveal]), started just before a section reaches the screen
//   - the Performance section ([data-perf]): the power curve draws and the outlined word drifts
// GSAP is loaded after the page is interactive, so it never delays the booking form.
// Visitors who prefer reduced motion get everything in place, with no movement.

let firstRun = true;

export function MotionProvider() {
  const pathname = usePathname();

  React.useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const root = document.documentElement;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.matchMedia("(max-width: 639px)").matches;

      // The loader runs for about 1s from page load on the first view of a session
      const loaderShowing = firstRun && !root.classList.contains("no-loader");
      const heroDelay = loaderShowing ? Math.max(0.05, 1.0 - performance.now() / 1000) : 0.05;
      firstRun = false;

      const ctx = gsap.context(() => {
        const heroItems = gsap.utils.toArray<HTMLElement>(".hero-rise");
        const heroArt = gsap.utils.toArray<HTMLElement>(".hero-art");

        if (reduce) {
          gsap.set([...heroItems, ...heroArt], { opacity: 1, y: 0, scale: 1 });
          return;
        }

        // Hero entrance: one coordinated rise, content first, artwork last
        gsap.to(heroItems, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out", delay: heroDelay });
        gsap.to(heroArt, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", delay: heroDelay + 0.12 });

        // Section reveals. Only sections still below the screen are hidden, and each starts
        // 80px before it arrives, so nobody waits on an empty space.
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) return;
          gsap.fromTo(
            el,
            { opacity: 0, y: mobile ? 8 : 14 },
            {
              opacity: 1,
              y: 0,
              duration: mobile ? 0.3 : 0.45,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top bottom+=80", once: true },
            }
          );
        });

        // Performance: the power curve draws, the outlined word drifts (desktop only)
        gsap.utils.toArray<HTMLElement>("[data-perf]").forEach((section) => {
          const paths = section.querySelectorAll<SVGPathElement>("[data-perf-curve] path");
          const dots = section.querySelectorAll<SVGCircleElement>("[data-perf-curve] circle");
          const word = section.querySelector<HTMLElement>("[data-perf-word]");

          gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
          gsap.set(dots, { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" });

          if (mobile) {
            const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 75%", once: true } });
            tl.to(paths, { strokeDashoffset: 0, duration: 1.2, stagger: 0.15, ease: "power2.out" })
              .to(dots, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.25");
          } else {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: section, start: "top 80%", end: "top 20%", scrub: 0.6 },
            });
            tl.to(paths, { strokeDashoffset: 0, stagger: 0.1, ease: "none" })
              .to(dots, { opacity: 1, scale: 1, ease: "none", duration: 0.15 });
            if (word) {
              gsap.fromTo(
                word,
                { xPercent: 3 },
                { xPercent: -5, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } }
              );
            }
          }
        });
      });

      // From here on GSAP owns the hero; the CSS fallback stands down
      root.classList.add("motion-ready");
      revert = () => ctx.revert();

      // Images and fonts can shift positions after load
      window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [pathname]);

  return null;
}
