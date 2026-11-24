import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { offers } from "../../data/offers";
import { formatOfferPrice, getOffersForDisplay } from "../../lib/offers";
import { EnquiryButton } from "../../components/enquiry/EnquiryButton";
import { WhatsAppLink } from "../../components/ui/actions";
import { TrackView } from "../../components/analytics/TrackView";
import { PageHero } from "../../components/sections/PageHero";
import { Band, Heading } from "../../components/sections/Band";
import { FinalCall } from "../../components/sections/shared";
import { Offer } from "../../types";
import { cn } from "../../lib/utils";

export const metadata: Metadata = {
  title: "Offers",
  description: "Current Revved Performance offers, including the ECU + TCU Stage 1 bundle for £329. Mobile across East London & Essex.",
  alternates: { canonical: "/offers" },
};

// A live offer is shown in brand plum so it stands out on the cream page.
// A preview-only proposal is shown in cream with a dashed label, so it can't be mistaken for a live one.
function OfferBlock({ offer }: { offer: Offer }) {
  const proposal = offer.status === "preview";
  const onPlum = !proposal;

  return (
    <article
      id={offer.slug}
      className={cn(
        "scroll-mt-24 overflow-hidden rounded-xl",
        onPlum ? "bg-plum text-white shadow-[0_24px_60px_-30px_rgba(105,60,86,0.9)]" : "border border-dashed border-ink/40 bg-white text-ink"
      )}
    >
      {proposal && (
        <p className="border-b border-dashed border-ink/30 bg-cream px-5 py-3 text-[13px] font-semibold leading-relaxed lg:px-8">
          Proposal, shown on previews only. It stays off the live site until Rayyan agrees it.
        </p>
      )}

      <div className="grid gap-8 p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12 lg:p-10">
        <div>
          <p className={cn("text-[12px] font-bold uppercase tracking-[0.18em]", onPlum ? "text-white/70" : "text-plum")}>
            {offer.serviceSlugs.length > 0 ? "Performance offer" : "Car care offer"}
          </p>
          <Heading className="mt-3">{offer.title}</Heading>
          {offer.description && (
            <p className={cn("mt-4 max-w-xl text-[16px] leading-relaxed", onPlum ? "text-white/80" : "text-ink-soft")}>{offer.description}</p>
          )}
          {!offer.description && offer.tagline && <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">{offer.tagline}</p>}

          <ul className="mt-6 grid gap-2.5 text-[15px] sm:grid-cols-2 sm:gap-x-6">
            {offer.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className={cn("mt-[3px] h-4 w-4 shrink-0", onPlum ? "text-plate" : "text-plum")} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={cn("flex flex-col gap-4 rounded-xl p-5 lg:self-start lg:p-6", onPlum ? "bg-white text-ink" : "border border-line bg-cream")}>
          {offer.saving ? (
            <>
              <dl className="text-[15px]">
                {offer.saving.parts.map((part) => (
                  <div key={part.label} className="flex justify-between gap-4 py-1.5">
                    <dt className="text-ink-soft">{part.label}</dt>
                    <dd className="font-medium whitespace-nowrap">{part.price}</dd>
                  </div>
                ))}
                <div className="mt-1 flex justify-between gap-4 border-t border-line pt-2.5">
                  <dt className="text-ink-soft">Booked separately</dt>
                  <dd className="font-medium whitespace-nowrap line-through decoration-1">{offer.saving.separately}</dd>
                </div>
              </dl>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.16em] text-plum">Bundle price</p>
                  <p className="mt-1 text-[44px] font-bold leading-none tracking-[-0.02em]">{formatOfferPrice(offer)}</p>
                </div>
                <p className="rounded-sm bg-plate px-2.5 py-1 text-[15px] font-bold whitespace-nowrap">{offer.saving.headline}</p>
              </div>
            </>
          ) : (
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-plum">Price</p>
              <p className="mt-1 text-[44px] font-bold leading-none tracking-[-0.02em]">{formatOfferPrice(offer)}</p>
            </div>
          )}
          {offer.eligibility && <p className="text-[14px] leading-relaxed text-ink-soft">{offer.eligibility}</p>}
          <EnquiryButton choice={`offer-${offer.slug}`} className="w-full min-h-[56px] text-[16px]">
            Book this offer
          </EnquiryButton>
          {offer.note && (
            <WhatsAppLink
              plain
              message={`Hi Revved, can you send the expected gains for my car? (${offer.title}) My reg is: `}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 text-center text-[14px] font-semibold text-plum underline-offset-4 hover:underline"
            >
              {offer.note}
            </WhatsAppLink>
          )}
        </div>
      </div>
    </article>
  );
}

export default function OffersPage() {
  const visibleOffers = getOffersForDisplay(offers);

  return (
    <>
      {visibleOffers.filter((o) => o.status === "active").map((o) => (
        <TrackView key={o.slug} event="offer_view" properties={{ offer: o.slug }} />
      ))}

      <PageHero
        crumb="Offers"
        title="Offers"
        intro={<p>Fixed prices on jobs that go well together, at your home or work.</p>}
        promises={[
          "Fixed offer prices",
          "At your home or work",
          "Lifetime software warranty on remaps",
          "Pay on the day, when the job is done",
        ]}
      />

      <Band>
        {visibleOffers.length > 0 ? (
          <div className="flex flex-col gap-6 lg:gap-8">
            {visibleOffers.map((offer) => (
              <OfferBlock key={offer.id} offer={offer} />
            ))}
          </div>
        ) : (
          <div>
            <Heading>No offers are running right now.</Heading>
            <Link href="/#services" className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-[16px] font-semibold text-plum underline-offset-4 hover:underline">
              See services and prices <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </Band>

      <FinalCall />
    </>
  );
}
