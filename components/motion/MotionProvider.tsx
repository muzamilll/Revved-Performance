"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

// All motion on the site, in one place, with GSAP:
//   - the hero entrance (.hero-rise, .hero-art), held until the first-visit loader lifts
//   - section reveals ([data-reveal]), started just before a section reaches the screen
//   - the "How it works" chat ([data-chat]): messages appear one by one
//   - the coverage map ([data-map-ring]): the 20-mile ring draws
//   - the skyline ([data-skyline-layer]): gentle parallax, desktop only
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

        const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.85;

        // Chat: messages appear one by one, like a real conversation
        gsap.utils.toArray<HTMLElement>("[data-chat]").forEach((phone) => {
          const msgs = phone.querySelectorAll<HTMLElement>("[data-chat-msg]");
          if (!below(phone)) return;
          gsap.set(msgs, { opacity: 0, y: 10, scale: 0.96, transformOrigin: "bottom center" });
          gsap.to(msgs, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: "back.out(1.6)",
            stagger: mobile ? 0.4 : 0.5,
            scrollTrigger: { trigger: phone, start: "top 75%", once: true },
          });
        });

        // Coverage map: the 20-mile ring draws once
        gsap.utils.toArray<SVGCircleElement>("[data-map-ring]").forEach((ring) => {
          if (!below(ring)) return;
          gsap.fromTo(
            ring,
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", scrollTrigger: { trigger: ring, start: "top 80%", once: true } }
          );
        });

        // Skyline: layers drift at slightly different speeds, desktop only
        if (!mobile) {
          gsap.utils.toArray<SVGGElement>("[data-skyline-layer]").forEach((layer) => {
            const speed = Number(layer.dataset.speed ?? 0.5);
            gsap.fromTo(
              layer,
              { y: 40 * (1 - speed) },
              { y: 0, ease: "none", scrollTrigger: { trigger: layer.closest("section"), start: "top bottom", end: "bottom bottom", scrub: true } }
            );
          });
        }
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
