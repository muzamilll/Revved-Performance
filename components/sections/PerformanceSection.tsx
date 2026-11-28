import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BandHeader } from "./Band";
import { BundleCard, GainsByReg } from "./BundleOffer";
import { addOnsSummary, performancePrices, performanceTrustLine } from "../../data/performance";
import { Offer } from "../../types";

// Home page Performance: the one dark section. The bundle is the headline (a receipt with the
// saving worked out), the send-your-reg step beside it, then every remap price on one line.
export function PerformanceSection({ offer }: { offer?: Offer }) {
  return (
    <section id="performance" className="relative isolate overflow-hidden bg-dark py-16 text-cream lg:py-24">
      {/* Oversized outlined word behind the heading. Static. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-2 top-6 -z-10 select-none whitespace-nowrap font-display text-[clamp(4.5rem,19vw,17rem)] uppercase leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,213,0,0.12)] lg:top-10"
      >
        Performance
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 lg:px-12">
        <BandHeader
          tone="dark"
          className="pt-[clamp(2.5rem,10vw,7rem)]"
          eyebrow="Performance"
          title="More from your car."
          aside="ECU and gearbox remapping at your door, by an authorised agent of Top Gear Tuning."
        />

        <ul className="-mt-2 mb-10 flex flex-wrap gap-x-7 gap-y-2 text-[13px] font-bold uppercase tracking-[0.14em] text-white/85 lg:mb-12">
          {performanceTrustLine.map((t) => (
            <li key={t} className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-plate" aria-hidden="true" />{t}</li>
          ))}
        </ul>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          {offer ? <BundleCard offer={offer} /> : null}
          <GainsByReg />
        </div>

        {/* Every remap price, on one quiet line */}
        <div className="mt-12 border-t border-white/10 pt-6 lg:mt-14">
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            {performancePrices.map((p) => (
              <div key={p.slug}>
                <dt className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/60">{p.label}</dt>
                <dd className="mt-0.5 text-[20px] font-bold text-white">{p.price}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[14px] leading-relaxed text-white/65">{addOnsSummary}</p>
          <Link href="/performance" className="mt-3 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-plate underline-offset-4 hover:underline">
            See all remaps and prices <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
