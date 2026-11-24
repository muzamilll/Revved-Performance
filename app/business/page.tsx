import { Metadata } from "next";
import { Check } from "lucide-react";
import { site } from "../../data/site";
import { PageHero } from "../../components/sections/PageHero";
import { Band, BandHeader, cardClass } from "../../components/sections/Band";
import { WhatsAppLink } from "../../components/ui/actions";
import { cn } from "../../lib/utils";

// Revved for business (brief section 8, 24 Nov). Matches the partner pilot plan, so the site
// and the outreach say the same thing. Linked from the footer only. No prices on the page.
export const metadata: Metadata = {
  title: "Revved for Business: Mobile Tuning, Diagnostics and Servicing for Garages, Dealers and Fleets",
  description: "Mobile remapping for garages, diagnostics and pre-sale checks for car dealers, fleet servicing for PCO hire, across East London and Essex. We come to your premises. Trade rates on request.",
  alternates: { canonical: "/business" },
};

const tradeMessage = (type: string) => `Hi Revved, trade enquiry. Business type: ${type}. Business name: `;
const PARTNER_MESSAGE = "Hi Revved, I'd like to work together. I run a car club / I'm a creator: ";

const businessTypes = [
  {
    id: "garages",
    title: "Independent garages and MOT centres",
    lead: "Tuning, DPF and coding you don't have the kit for.",
    points: [
      "Book us at a trade price and bill your own customer",
      "We come to your workshop",
      "The customer stays yours",
    ],
    type: "Garage / MOT centre",
  },
  {
    id: "dealers",
    title: "Used-car dealers",
    lead: "Cars checked and ready before they go on sale.",
    points: [
      "Diagnostics and pre-sale checks",
      "Batteries on forecourt stock",
      "DPF cleans before sale",
      "A trade account",
    ],
    type: "Used-car dealer",
  },
  {
    id: "fleets",
    title: "PCO hire fleets",
    lead: "Servicing, brakes and batteries that keep rental cars earning.",
    points: [
      "Work done where the cars are parked",
      "Car care only, no remaps",
      "A trade account",
    ],
    type: "PCO hire fleet",
  },
  {
    id: "referrers",
    title: "Detailers and tyre shops",
    lead: "Refer a customer who needs a battery, a service or a remap.",
    points: [
      "We quote, do the job and handle the aftercare",
      "You earn a fee on completed, paid jobs",
    ],
    type: "Detailer / tyre shop",
  },
];

const ways = [
  { title: "Book us at a trade price", text: "We do the work for you and your customer, at your premises." },
  { title: "Refer a customer and earn a fee", text: "Send them our way. You're paid when the job is completed and paid for." },
  { title: "Recommend each other", text: "We send work your way when our customers need what you do." },
];

export default function BusinessPage() {
  return (
    <>
      <PageHero
        tone="dark"
        crumb="Revved for business"
        image={{ name: "business", alt: "Revved Performance working with a business" }}
        chip="Trade"
        title="Your mobile specialist, on call."
        intro={<p>Tuning, diagnostics, batteries and servicing for businesses across {site.serviceAreaSummary}. We come to your premises.</p>}
        aside={
          <div className="rounded-xl border border-white/20 bg-white/[0.08] p-5 lg:p-6">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/70">Trade rates and referral fees</p>
            <p className="mt-2 text-[22px] font-semibold leading-snug">On request. Tell us about your business.</p>
            <WhatsAppLink variant="primary" message="Hi Revved, trade enquiry. Business type: " className="mt-5 w-full min-h-[56px] text-[16px]">
              Become a trade partner
            </WhatsAppLink>
          </div>
        }
      />

      <Band>
        <BandHeader eyebrow="Who we work with" title="Built around how your business runs." />
        <ul className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          {businessTypes.map((b) => (
            <li key={b.id} id={b.id} className={cn(cardClass.cream, "flex scroll-mt-24 flex-col p-6 lg:p-7")}>
              <h3 className="text-[21px] font-semibold tracking-[-0.01em]">{b.title}</h3>
              <p className="mt-1.5 text-[16px] leading-relaxed text-ink-soft">{b.lead}</p>
              <ul className="mt-4 flex flex-col gap-2 text-[15px]">
                {b.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <Check className="mt-[3px] h-4 w-4 shrink-0 text-plum" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <WhatsAppLink
                variant="secondary"
                message={tradeMessage(b.type)}
                className="mt-6 self-start px-5 text-plum hover:bg-plum/10"
                aria-label={`Become a trade partner: ${b.title}`}
              >
                Become a trade partner
              </WhatsAppLink>
            </li>
          ))}
        </ul>
      </Band>

      <Band className="border-t border-line">
        <BandHeader eyebrow="Three ways to work together" title="Pick what suits you." />
        <ol className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          {ways.map((w, i) => (
            <li key={w.title} className={cn(cardClass.cream, "p-6")}>
              <span aria-hidden="true" className="font-accent text-[32px] italic leading-none text-plum">{i + 1}</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em]">{w.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{w.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-[15px] text-ink-soft">Trade rates and referral fees on request.</p>
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
