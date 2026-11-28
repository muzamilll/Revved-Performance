import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { cn } from "../../lib/utils";

// One bookable job with its price. Used on the car care pages and the Performance page.
// "What's included" opens and closes, with a visible open state.
export function JobRow({
  id,
  name,
  price,
  description,
  includes,
  note,
  tone = "cream",
  anchor,
  href,
}: {
  id: string;
  name: string;
  price: string;
  description: string;
  includes?: string[];
  note?: string;           // small print under the job, e.g. the emissions disclaimer
  tone?: "cream" | "dark";
  anchor?: string;
  href?: string;           // the job's own page
}) {
  const dark = tone === "dark";
  return (
    <li
      id={anchor}
      className={cn(
        "scroll-mt-24 grid gap-x-6 gap-y-4 border-t py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start",
        dark ? "border-white/10" : "border-line"
      )}
    >
      <div className="min-w-0">
        <h3 className="text-[20px] font-semibold tracking-[-0.01em]">
          {href ? (
            <Link href={href} className="underline decoration-1 underline-offset-4 decoration-current/30 hover:decoration-current">{name}</Link>
          ) : (
            name
          )}
        </h3>
        <p className={cn("mt-1.5 max-w-xl text-[15px] leading-relaxed", dark ? "text-white/75" : "text-ink-soft")}>{description}</p>
        {includes && includes.length > 0 && (
          <details className="group mt-3">
            <summary
              className={cn(
                "inline-flex min-h-[44px] cursor-pointer list-none items-center gap-2 text-[14px] font-semibold",
                dark ? "text-white" : "text-plum"
              )}
            >
              <span className="group-open:hidden">What&apos;s included</span>
              <span className="hidden group-open:inline">Hide what&apos;s included</span>
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
            </summary>
            <ul className="grid gap-x-6 gap-y-1.5 pb-1 pt-1 text-[15px] sm:grid-cols-2">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className={cn("mt-[3px] h-4 w-4 shrink-0", dark ? "text-plate" : "text-plum")} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </details>
        )}
        {note && <p className={cn("mt-3 max-w-xl text-[13px] leading-relaxed", dark ? "text-white/65" : "text-ink-soft")}>{note}</p>}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 sm:flex-col sm:flex-nowrap sm:items-end">
        <p className="rounded-sm bg-plate px-2.5 py-1 text-[18px] font-bold leading-tight tracking-[-0.01em] text-ink whitespace-nowrap">{price}</p>
        <EnquiryButton
          plain
          choice={id}
          aria-label={`Get a quote: ${name}`}
          className={cn(
            "inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-semibold underline-offset-4 hover:underline",
            dark ? "text-white" : "text-plum"
          )}
        >
          Get a quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </EnquiryButton>
      </div>
    </li>
  );
}
