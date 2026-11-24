import * as React from "react";
import { ChevronDown } from "lucide-react";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { WhatsAppLink, CallLink } from "../ui/actions";
import { Band, BandHeader, Eyebrow, Heading, cardClass } from "./Band";
import { howItWorks } from "../../data/care";
import { cn } from "../../lib/utils";

export { Eyebrow, Heading };

// The trust row. It sits along the bottom edge of each page hero, in the same plum,
// divided by a hairline, so it reads as part of the hero rather than a separate strip.
export function PromiseRow({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul
      aria-label="Our promises"
      className={cn("mt-10 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-white/15 pt-5 text-[12px] font-bold uppercase leading-snug tracking-[0.12em] text-white lg:mt-14 lg:grid-cols-4 lg:gap-6 lg:pt-6", className)}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span aria-hidden="true" className="mt-[0.3em] h-1.5 w-1.5 shrink-0 rounded-full bg-plate" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function HowItWorks() {
  return (
    <Band className="border-t border-line">
      <BandHeader eyebrow="How it works" title="Get started in a minute." />
      <ol className="grid gap-4 lg:grid-cols-3 lg:gap-5">
        {howItWorks.map((item, i) => (
          <li key={item.title} className={cn(cardClass.cream, "flex gap-4 p-6 lg:flex-col lg:gap-3 lg:p-7")}>
            <span aria-hidden="true" className="w-6 shrink-0 font-accent text-[32px] italic leading-none text-plum">{i + 1}</span>
            <div>
              <h3 className="text-[19px] font-semibold tracking-[-0.01em]">{item.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Band>
  );
}

// Questions. Native <details>, so it works without JavaScript; it animates open where supported.
export function FaqSection({
  id,
  title,
  items,
  tone = "cream",
}: {
  id?: string;
  title: string;
  items: { question: string; answer: string }[];
  tone?: "cream" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <Band id={id} tone={tone} className={dark ? "border-t border-white/10" : "border-t border-line"}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-14">
        <div>
          <Eyebrow tone={tone}>Questions</Eyebrow>
          <Heading className="mt-3">{title}</Heading>
          <p className={cn("mt-4 text-[15px] leading-relaxed", dark ? "text-white/75" : "text-ink-soft")}>
            Something not covered here?
          </p>
          <WhatsAppLink variant="secondary" className={cn("mt-3", dark ? "text-white" : "text-ink")} />
        </div>
        <div className={dark ? "border-b border-white/10" : "border-b border-line"}>
          {items.map((item) => (
            <details key={item.question} className={cn("group border-t", dark ? "border-white/10" : "border-line")}>
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-semibold tracking-[-0.005em]">
                {item.question}
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color] duration-200 group-open:rotate-180 motion-reduce:transition-none",
                    dark ? "border-white/20 group-open:bg-white/10" : "border-line group-open:bg-plum group-open:text-white group-open:border-plum"
                  )}
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <p className={cn("max-w-2xl pb-6 text-[15px] leading-relaxed", dark ? "text-white/75" : "text-ink-soft")}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Band>
  );
}

// Final call (plum). One of the two places Anton appears, with the hero.
export function FinalCall({ choice }: { choice?: string }) {
  return (
    <Band tone="plum" className="py-20 lg:py-28">
      <div className="flex flex-col items-center text-center">
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/70">Your day doesn&apos;t need a detour.</p>
        <h2 className="mt-4 font-display text-[clamp(2.25rem,calc((100vw-3rem)/6.75),7.5rem)] uppercase leading-[0.96] tracking-[0.005em]">
          We come to you.
        </h2>
        <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <EnquiryButton choice={choice} className="w-full min-h-[56px] px-8 text-[16px] sm:w-auto" />
          <WhatsAppLink className="w-full min-h-[56px] px-7 text-[16px] text-white sm:w-auto" />
        </div>
        <CallLink plain className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline" />
      </div>
    </Band>
  );
}
