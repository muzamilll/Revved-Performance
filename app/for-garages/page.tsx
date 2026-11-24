import { Metadata } from "next";
import { Check } from "lucide-react";
import { site } from "../../data/site";
import { PageHero } from "../../components/sections/PageHero";
import { Band, BandHeader, cardClass } from "../../components/sections/Band";
import { WhatsAppLink } from "../../components/ui/actions";
import { cn } from "../../lib/utils";

// Trade page (brief, 24 Nov). Linked from the footer only. No trade prices on the page.
export const metadata: Metadata = {
  title: "Mobile Remapping and Diagnostics for Garages, East London",
  description: "Trade ECU remapping, DSG tuning, DPF work, coding and diagnostics for garages across East London and Essex. We come to your workshop. Trade rates on request.",
  alternates: { canonical: "/for-garages" },
};

const TRADE_MESSAGE = "Hi Revved, trade enquiry. Garage name: ";
const PARTNER_MESSAGE = "Hi Revved, I'd like to work together. I run a car club / I'm a creator: ";

const work = [
  { title: "Stage 1 remaps", text: "Custom Top Gear Tuning files, written for the car on your ramp." },
  { title: "DSG and gearbox tunes", text: "Gearbox software matched to the engine." },
  { title: "DPF work", text: "Diagnostics, cleaning and forced regeneration." },
  { title: "Coding and diagnostics", text: "Fault finding, coding and ECU updates." },
];

const steps = [
  { title: "You book us", text: "Message us with the car and the job. We reply with a time." },
  { title: "We come to your workshop", text: "We bring the kit and work alongside your team." },
  { title: "Your customer stays yours", text: "We work for you, not around you. We never approach your customer." },
  { title: "Paid the same day", text: "Trade jobs are paid on the day the work is done." },
];

export default function ForGaragesPage() {
  return (
    <>
      <PageHero
        tone="dark"
        crumb="For garages"
        chip="Trade"
        title="Tuning and diagnostics for your garage."
        intro={<p>We come to your workshop. The jobs you turn away or send elsewhere today, done on your premises for your customers.</p>}
        aside={
          <div className="rounded-xl border border-white/20 bg-white/[0.08] p-5 lg:p-6">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/70">Trade rates</p>
            <p className="mt-2 text-[22px] font-semibold leading-snug">On request, for garages we work with regularly.</p>
            <WhatsAppLink variant="primary" message={TRADE_MESSAGE} className="mt-5 w-full min-h-[56px] text-[16px]">
              Become a trade partner
            </WhatsAppLink>
          </div>
        }
      />

      <Band>
        <BandHeader eyebrow="What we do for garages" title="The work you don't have the kit for." />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {work.map((w) => (
            <li key={w.title} className={cn(cardClass.cream, "p-6")}>
              <Check className="h-5 w-5 text-plum" aria-hidden="true" />
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em]">{w.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{w.text}</p>
            </li>
          ))}
        </ul>
      </Band>

      <Band className="border-t border-line">
        <BandHeader eyebrow="How it works" title="Simple for you and your customer." />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((s, i) => (
            <li key={s.title} className={cn(cardClass.cream, "p-6")}>
              <span aria-hidden="true" className="font-accent text-[32px] italic leading-none text-plum">{i + 1}</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <WhatsAppLink variant="primary" message={TRADE_MESSAGE} className="min-h-[56px] px-8 text-[16px]">
            Become a trade partner
          </WhatsAppLink>
          <p className="text-[14px] text-ink-soft">Or call {site.phoneDisplay}.</p>
        </div>
      </Band>

      <Band tone="plum">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/70">Car clubs and creators</p>
            <h2 className="mt-3 text-[clamp(1.9rem,6.4vw,2.875rem)] font-medium leading-[1.08] tracking-[-0.02em]">Let&apos;s work together.</h2>
            <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-white/80">Run a car club, a meet or a channel? Tell us what you have in mind.</p>
          </div>
          <WhatsAppLink message={PARTNER_MESSAGE} className="min-h-[56px] shrink-0 px-7 text-[16px] text-white">
            Message us on WhatsApp
          </WhatsAppLink>
        </div>
      </Band>
    </>
  );
}
