import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { offers } from "../../data/offers";
import { formatOfferPrice, getOffersForDisplay } from "../../lib/offers";
import { Container } from "../../components/layout/layout-primitives";
import { EnquiryButton } from "../../components/enquiry/EnquiryButton";
import { TrackView } from "../../components/analytics/TrackView";
import { Reveal } from "../../components/ui/Reveal";
import { Eyebrow, FinalCall, Heading, PromiseBand } from "../../components/sections/shared";
import { Offer } from "../../types";

export const metadata: Metadata = {
  title: "Offers",
  description: "Current Revved Performance offers, including the ECU + TCU Stage 1 bundle for £325. Mobile across East London & Essex.",
  alternates: { canonical: "/offers" },
};

function OfferBlock({ offer }: { offer: Offer }) {
  const isProposal = offer.status === "preview";

  return (
    <article id={offer.slug} className="scroll-mt-24 border border-line bg-white">
      {isProposal && (
        <p className="border-b border-dashed border-ink/40 bg-cream-deep px-5 py-3 text-[13px] font-semibold leading-relaxed text-ink lg:px-8">
          Proposal, shown on previews only. This offer stays off the live site until Rayyan agrees it.
        </p>
      )}

      <div className="grid gap-8 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12 lg:p-8">
        <div>
          <Eyebrow>{offer.serviceSlugs.length > 0 ? "Performance offer" : "Car care offer"}</Eyebrow>
          <Heading as="h2" className="mt-3">{offer.title}</Heading>
          {offer.tagline && <p className="mt-3 text-[18px] leading-snug text-ink">{offer.tagline}</p>}
          {offer.description && <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">{offer.description}</p>}

          <h3 className="mt-7 text-[13px] font-bold uppercase tracking-[0.12em]">What&apos;s included</h3>
          <ul className="mt-3 grid gap-2 text-[15px] sm:grid-cols-2 sm:gap-x-6">
            {offer.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="mt-[3px] h-4 w-4 shrink-0 text-plum" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 border border-line bg-cream p-5 lg:self-start">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-plum">
              {offer.price && !offer.price.from ? "Fixed price" : "Price"}
            </p>
            <p className="mt-2 inline-block bg-plate px-3 py-1 text-[40px] font-bold leading-none tracking-[-0.02em]">{formatOfferPrice(offer)}</p>
          </div>
          {offer.eligibility && <p className="text-[14px] leading-relaxed text-ink-soft">{offer.eligibility}</p>}
          <EnquiryButton choice={`offer-${offer.slug}`} className="w-full min-h-[56px] text-[16px]">
            Get this offer
          </EnquiryButton>
          <p className="text-[13px] leading-relaxed text-ink-soft">
            Price agreed before you book. You pay on the day, when the job is done.
          </p>
        </div>
      </div>

      {offer.comparison && (
        <div className="border-t border-line p-5 lg:p-8">
          <h3 className="text-[13px] font-bold uppercase tracking-[0.12em]">What changes</h3>

          {/* Phones: one block per row, so nothing scrolls sideways */}
          <dl className="mt-4 sm:hidden">
            {offer.comparison.map((row) => (
              <div key={row.label} className="border-t border-line py-4">
                <dt className="text-[16px] font-semibold">{row.label}</dt>
                <dd className="mt-2 grid grid-cols-2 gap-3 text-[14px] leading-snug">
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft">Your car now</span>
                    <span className="mt-1 block text-ink-soft">{row.before}</span>
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-plum">With the bundle</span>
                    <span className="mt-1 block font-semibold">{row.after}</span>
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <table className="mt-4 hidden w-full border-collapse text-left text-[15px] sm:table">
            <thead>
              <tr className="text-[12px] font-bold uppercase tracking-[0.12em]">
                <td className="w-[22%] py-3 pr-4" />
                <th scope="col" className="w-[36%] py-3 pr-4 font-bold text-ink-soft">Your car now</th>
                <th scope="col" className="bg-cream py-3 px-4 font-bold text-plum">With the bundle</th>
              </tr>
            </thead>
            <tbody>
              {offer.comparison.map((row) => (
                <tr key={row.label} className="border-t border-line align-top">
                  <th scope="row" className="py-3.5 pr-4 font-semibold">{row.label}</th>
                  <td className="py-3.5 pr-4 text-ink-soft">{row.before}</td>
                  <td className="bg-cream py-3.5 px-4 font-semibold">{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {offer.note && (
            <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5 text-[16px] font-medium leading-relaxed sm:flex-row sm:items-center sm:justify-between">
              <p>{offer.note}</p>
              <EnquiryButton variant="secondary" choice={`offer-${offer.slug}`} className="shrink-0 px-5 text-plum hover:bg-plum/10">
                Send my reg
              </EnquiryButton>
            </div>
          )}
        </div>
      )}
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

      {/* Hero (plum) */}
      <section className="bg-plum-hero text-white lg:bg-[linear-gradient(to_bottom,var(--color-plum-hero),var(--color-plum-hero-end))]">
        <Container className="pt-6 pb-10 lg:pt-12 lg:pb-16">
          <nav aria-label="Breadcrumb" className="hero-rise text-[13px] text-mist" style={{ "--i": 0 } as React.CSSProperties}>
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-white hover:underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-white">Offers</li>
            </ol>
          </nav>
          <h1 className="hero-rise mt-2 text-[clamp(2.25rem,9.4vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.025em] lg:mt-6" style={{ "--i": 1 } as React.CSSProperties}>
            Offers
          </h1>
          <p className="hero-rise mt-4 max-w-[34rem] text-[17px] leading-relaxed text-mist lg:text-[18px]" style={{ "--i": 2 } as React.CSSProperties}>
            Fixed-price offers from Revved. Choose one and send your registration; we confirm your car is eligible on WhatsApp before you book.
          </p>
        </Container>
      </section>

      <PromiseBand
        items={[
          "Price agreed before you book",
          "At your home or work",
          "Eligibility checked from your reg",
          "Pay on the day, when the job is done",
        ]}
      />

      <section className="bg-cream text-ink py-12 lg:py-20">
        <Container>
          {visibleOffers.length > 0 ? (
            <Reveal className="flex flex-col gap-6 lg:gap-10">
              {visibleOffers.map((offer) => (
                <OfferBlock key={offer.id} offer={offer} />
              ))}
            </Reveal>
          ) : (
            <div className="py-10">
              <Heading>No offers are running right now.</Heading>
              <Link href="/#services" className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-[16px] font-semibold text-plum underline-offset-4 hover:underline">
                See services and prices <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          )}
        </Container>
      </section>

      <FinalCall />
    </>
  );
}
