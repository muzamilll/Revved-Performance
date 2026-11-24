import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { BandHeader, cardClass, cardInteractive } from "./Band";
import { addOnsSummary, performancePrices, performanceTrust } from "../../data/performance";
import { cn } from "../../lib/utils";

// Home page Performance section. Same structure, cards and buttons as the rest of the page;
// it moves from brand plum (the offer above it) into deep plum.
export function PerformanceSection() {
  return (
    <section
      id="performance"
      data-perf=""
      className="relative isolate overflow-hidden bg-dark py-16 text-cream lg:py-24"
      style={{ backgroundImage: "linear-gradient(to bottom, #693C56 0, #150B12 22rem)" }}
    >
      {/* Oversized outlined word, behind the heading. Drifts with the scroll on desktop. */}
      <div
        aria-hidden="true"
        data-perf-word=""
        className="pointer-events-none absolute -left-2 top-6 -z-10 select-none whitespace-nowrap font-display text-[clamp(4.5rem,19vw,17rem)] uppercase leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,213,0,0.14)] lg:top-10"
      >
        Performance
      </div>

      {/* Power curve: draws as the section scrolls in */}
      <svg
        aria-hidden="true"
        data-perf-curve=""
        viewBox="0 0 620 300"
        fill="none"
        className="pointer-events-none absolute -right-24 top-16 -z-10 w-[300px] opacity-30 sm:right-0 lg:right-12 lg:top-6 lg:w-[400px]"
      >
        <path pathLength={1} d="M0 290 C 120 280, 200 240, 290 150 S 440 40, 520 34 S 590 60, 620 90" stroke="#FFD500" strokeWidth="2.5" />
        <path pathLength={1} d="M0 296 C 140 270, 240 200, 330 150 S 480 110, 620 130" stroke="#E3C2D3" strokeWidth="1.5" />
        <circle cx="520" cy="34" r="6" fill="#FFD500" />
        <circle cx="520" cy="34" r="14" stroke="#FFD500" strokeWidth="1" />
      </svg>

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 lg:px-12">
        <BandHeader
          tone="dark"
          className="pt-[clamp(3rem,12vw,9rem)]"
          eyebrow="Performance"
          title="More from your car."
          aside="ECU remapping at your door, by an authorised agent of Top Gear Tuning."
        />

        <ul className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          {performanceTrust.map((item) => (
            <li key={item.title} className={cn(cardClass.dark, "p-6")}>
              <h3 className="text-[17px] font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/75">{item.text}</p>
            </li>
          ))}
        </ul>

        <ul className="mt-4 grid grid-cols-2 gap-4 lg:mt-5 lg:grid-cols-4 lg:gap-5">
          {performancePrices.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/performance#${item.slug}`}
                className={cn(cardClass.dark, cardInteractive, "group flex h-full flex-col gap-1 p-5 hover:border-white/30")}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">{item.label}</span>
                <span className="mt-1 text-[24px] font-bold leading-tight tracking-[-0.01em] text-plate lg:text-[28px]">{item.price}</span>
                <span className="text-[13px] leading-snug text-white/70">{item.note}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-white/70">{addOnsSummary}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <EnquiryButton choice="stage-1-remap" className="min-h-[56px] px-7 text-[16px]" />
          <Link
            href="/performance"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 px-3 text-[15px] font-semibold text-white underline-offset-4 hover:text-plate hover:underline"
          >
            See all remaps and prices <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

