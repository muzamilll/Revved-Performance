import { Check, Minus } from "lucide-react";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { WhatsAppLink } from "../ui/actions";
import { cn } from "../../lib/utils";

// Minor or major, side by side: what each includes, what's different, and the price.
// Answers the question a servicing customer actually has: which one do I need?
const rows: { item: string; minor: boolean; note?: string }[] = [
  { item: "Oil and oil filter change", minor: true },
  { item: "Safety check", minor: true },
  { item: "Fluid top-ups", minor: true },
  { item: "Service light reset", minor: true },
  { item: "Engine air filter", minor: false },
  { item: "Cabin pollen filter", minor: false },
  { item: "Spark plugs", minor: false, note: "petrol cars" },
  { item: "Washer fluid top-up", minor: false },
];

const plans = [
  { id: "minor-service", name: "Minor service", price: "From £50", best: "The in-between service: oil, filter and checks." },
  { id: "major-service", name: "Major service", price: "From £70", best: "The full service: everything in a minor, plus filters and plugs." },
];

export function ServiceCompare() {
  return (
    <div>
      {/* Desktop and tablet: one table */}
      <div className="hidden overflow-hidden rounded-2xl border border-line bg-white md:block">
        <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="p-6" />
          {plans.map((p, i) => (
            <div key={p.id} className={cn("border-l border-line p-6", i === 1 && "bg-plum/[0.04]")}>
              <span className={cn("mb-2 inline-block rounded-sm px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em]", i === 1 ? "bg-plate text-ink" : "invisible")}>Most complete</span>
              <p className="text-[20px] font-semibold tracking-[-0.01em]">{p.name}</p>
              <p className="mt-1 text-[30px] font-bold leading-tight tracking-[-0.02em] text-plum">{p.price}</p>
              <p className="mt-1 text-[14px] leading-snug text-ink-soft">{p.best}</p>
            </div>
          ))}
          {rows.map((r) => (
            <div key={r.item} className="contents">
              <div className="flex items-center border-t border-line px-6 py-3.5 text-[15px]">
                {r.item}{r.note && <span className="ml-1.5 text-[13px] text-ink-soft">({r.note})</span>}
              </div>
              {[r.minor, true].map((on, i) => (
                <div key={i} className={cn("flex items-center justify-center border-l border-t border-line py-3.5", i === 1 && "bg-plum/[0.04]")}>
                  {on ? <Check className="h-5 w-5 text-plum" aria-label="Included" /> : <Minus className="h-5 w-5 text-ink/25" aria-label="Not included" />}
                </div>
              ))}
            </div>
          ))}
          <div className="border-t border-line px-6 py-5 text-[14px] text-ink-soft">Parts quoted for your car before we start.</div>
          {plans.map((p, i) => (
            <div key={p.id} className={cn("border-l border-t border-line p-5", i === 1 && "bg-plum/[0.04]")}>
              <EnquiryButton choice={p.id} variant={i === 1 ? "primary" : "secondary"} className={cn("w-full min-h-[50px]", i === 0 && "text-plum hover:bg-plum/10")}>
                Quote for a {p.name.split(" ")[0].toLowerCase()}
              </EnquiryButton>
            </div>
          ))}
        </div>
      </div>

      {/* Phones: two cards, the major one showing what it adds */}
      <div className="flex flex-col gap-4 md:hidden">
        {plans.map((p, i) => (
          <div key={p.id} className={cn("rounded-2xl border border-line bg-white p-5", i === 1 && "border-plum/30")}>
            {i === 1 && <span className="mb-2 inline-block rounded-sm bg-plate px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">Most complete</span>}
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[20px] font-semibold">{p.name}</p>
              <p className="text-[24px] font-bold text-plum whitespace-nowrap">{p.price}</p>
            </div>
            <p className="mt-1 text-[14px] text-ink-soft">{p.best}</p>
            <ul className="mt-4 flex flex-col gap-2 text-[15px]">
              {(i === 0 ? rows.filter((r) => r.minor) : [{ item: "Everything in a minor service", minor: true }, ...rows.filter((r) => !r.minor)]).map((r) => (
                <li key={r.item} className="flex items-start gap-2.5">
                  <Check className="mt-[3px] h-4 w-4 shrink-0 text-plum" aria-hidden="true" />
                  <span>{r.item}{"note" in r && r.note && <span className="ml-1 text-[13px] text-ink-soft">({r.note})</span>}</span>
                </li>
              ))}
            </ul>
            <EnquiryButton choice={p.id} variant={i === 1 ? "primary" : "secondary"} className={cn("mt-5 w-full min-h-[50px]", i === 0 && "text-plum")}>
              Quote for a {p.name.split(" ")[0].toLowerCase()}
            </EnquiryButton>
          </div>
        ))}
        <p className="text-[14px] text-ink-soft">Parts quoted for your car before we start.</p>
      </div>

      {/* Not sure which */}
      <p className="mt-6 flex flex-wrap items-center gap-x-2 text-[16px]">
        <span className="font-semibold">Not sure which one?</span>
        <span className="text-ink-soft">Send your reg and when it was last serviced, and we&apos;ll tell you.</span>
        <WhatsAppLink plain icon={false} message="Hi Revved, which service does my car need? Reg: " className="font-semibold text-plum underline underline-offset-4">Ask on WhatsApp</WhatsAppLink>
      </p>
    </div>
  );
}
