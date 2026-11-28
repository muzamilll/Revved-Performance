import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { Offer } from "../../types";
import { formatOfferPrice } from "../../lib/offers";
import { remapResults } from "../../data/results";
import { cn } from "../../lib/utils";

// The ECU + TCU bundle, set out like a receipt: what each part costs on its own, the total
// struck through, then the bundle price. The saving is plain arithmetic, nothing invented.
export function BundleCard({ offer, className }: { offer: Offer; className?: string }) {
  const s = offer.saving;
  return (
    <div className={cn("relative rounded-2xl bg-cream p-6 text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-8", className)}>
      {s && (
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-4 rotate-[6deg] rounded-md bg-plate px-3.5 py-2 font-display text-[26px] uppercase leading-none tracking-[0.01em] text-ink shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] sm:-right-5 sm:text-[30px]"
        >
          {s.headline}
        </span>
      )}
      <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-plum">The bundle</p>
      <h3 className="mt-2 font-display text-[clamp(2.1rem,5vw,3rem)] uppercase leading-[0.95]">Engine + gearbox.<br />One visit.</h3>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">{offer.description}</p>

      {s && (
        <dl className="mt-6 text-[16px]">
          {s.parts.map((part) => (
            <div key={part.label} className="flex items-baseline gap-2 py-2">
              <dt>{part.label}</dt>
              <span aria-hidden="true" className="mb-1 flex-1 border-b-2 border-dotted border-ink/20" />
              <dd className="font-semibold tabular-nums">{part.price}</dd>
            </div>
          ))}
          <div className="flex items-baseline gap-2 border-t border-ink/15 py-2 text-ink-soft">
            <dt>Booked separately</dt>
            <span aria-hidden="true" className="mb-1 flex-1 border-b-2 border-dotted border-ink/15" />
            <dd className="tabular-nums line-through decoration-2">{s.separately}</dd>
          </div>
        </dl>
      )}

      <div className="mt-3 flex items-end justify-between gap-4 border-t-2 border-ink pt-4">
        <p className="text-[15px] font-semibold">Together</p>
        <p className="font-display text-[clamp(3.5rem,9vw,4.75rem)] leading-[0.85] tabular-nums text-plum">{formatOfferPrice(offer)}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <EnquiryButton choice={`offer-${offer.slug}`} className="min-h-[56px] px-7 text-[16px]">Get a quote for the bundle</EnquiryButton>
        <Link href={`/offers#${offer.slug}`} className="inline-flex min-h-[44px] items-center gap-1.5 px-1 text-[15px] font-semibold text-plum underline-offset-4 hover:underline">
          What&apos;s included <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      {offer.eligibility && <p className="mt-4 text-[13px] leading-relaxed text-ink-soft">{offer.eligibility}</p>}
    </div>
  );
}

// Real cars, real figures: before and after from Revved jobs, with the gain drawn as a bar.
export function RealFigures({ className }: { className?: string }) {
  const max = Math.max(...remapResults.map((r) => r.bhp[1]));
  return (
    <div className={cn("flex flex-col", className)}>
      <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/70">Real cars, real figures</p>
      <ul className="mt-4 flex flex-col divide-y divide-white/10 border-y border-white/10">
        {remapResults.map((r) => {
          const gain = r.bhp[1] - r.bhp[0];
          return (
            <li key={r.car} className="py-5">
              <div className="flex items-baseline justify-between gap-4">
                <p className="min-w-0">
                  <span className="block text-[18px] font-semibold text-white">{r.car}</span>
                  <span className="block text-[13px] text-white/60">{r.detail} · {r.stage}</span>
                </p>
                <p className="shrink-0 font-display text-[38px] leading-none text-plate tabular-nums">+{gain}<span className="ml-1 font-sans text-[14px] font-bold text-white/80">bhp</span></p>
              </div>
              {/* stock to Stage 1, to scale */}
              <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                <span className="h-full bg-white/45" style={{ width: `${(r.bhp[0] / max) * 100}%` }} />
                <span className="h-full bg-plate" style={{ width: `${(gain / max) * 100}%` }} />
              </div>
              <p className="mt-2 flex justify-between text-[13px] tabular-nums text-white/70">
                <span>{r.bhp[0]} → <b className="font-semibold text-white">{r.bhp[1]} bhp</b></span>
                <span>{r.nm[0]} → <b className="font-semibold text-white">{r.nm[1]} Nm</b></span>
              </p>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[13px] leading-relaxed text-white/60">Figures from the Top Gear Tuning file for each car. Send your reg for yours.</p>
    </div>
  );
}
