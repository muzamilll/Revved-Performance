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
      className="relative isolate overflow-hidden bg-dark py-16 text-cream lg:py-24"
      style={{ backgroundImage: "linear-gradient(to bottom, #693C56 0, #150B12 22rem)" }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 lg:px-12">
        <BandHeader
          tone="dark"
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

