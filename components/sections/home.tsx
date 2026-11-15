import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { CallLink, WhatsAppLink } from "../ui/actions";
import { Img } from "../ui/Img";
import { CareIcon } from "./CareIcon";
import { Band, BandHeader, cardClass, cardInteractive } from "./Band";
import { careCategories } from "../../data/care";
import { locations } from "../../data/locations";
import { workPhotos, workReviews } from "../../data/work";
import { formatOfferPrice } from "../../lib/offers";
import { isPreviewBuild } from "../../lib/env";
import { Offer } from "../../types";
import { cn } from "../../lib/utils";

// Car care: the four categories. Tapping a card opens its page; "Book" opens the booking
// form with that job selected.
export function CareServices() {
  return (
    <Band id="services">
      <BandHeader eyebrow="Everyday car care" title="What needs doing?" aside="Pick a job to see its prices, or book it straight away." />

      <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
        {careCategories.map((category) => (
          <li
            key={category.slug}
            className={cn(cardClass.cream, cardInteractive, "flex flex-col overflow-hidden hover:border-ink/40 hover:shadow-[0_16px_36px_-20px_rgba(26,20,24,0.45)]")}
          >
            <Link href={`/${category.slug}`} className="group flex flex-1 items-center gap-4 p-5 sm:flex-col sm:items-stretch sm:gap-3 sm:p-6">
              <span className="flex items-start justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-plum/[0.08] text-plum transition-colors duration-200 group-hover:bg-plum group-hover:text-white">
                  <CareIcon slug={category.slug} className="h-7 w-7" />
                </span>
                <ArrowRight className="hidden h-5 w-5 text-ink-soft transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none sm:block" aria-hidden="true" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:gap-3">
                <span className="text-[20px] font-semibold tracking-[-0.01em] sm:mt-2 sm:text-[22px]">{category.name}</span>
                <span className="hidden text-[15px] leading-relaxed text-ink-soft sm:block">{category.cardSummary}</span>
                <span className="flex flex-col gap-0.5 sm:mt-auto sm:pt-3">
                  <span className="text-[15px] font-bold sm:text-[16px]">{category.cardPrice}</span>
                  <span className="hidden text-[13px] text-ink-soft sm:block">{category.cardPriceNote}</span>
                </span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-ink-soft sm:hidden" aria-hidden="true" />
            </Link>
            <EnquiryButton
              plain
              choice={category.primaryJobId}
              aria-label={`Request a booking: ${category.name.toLowerCase()}`}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 border-t border-line text-[15px] font-semibold text-plum transition-colors hover:bg-plum hover:text-white sm:min-h-[52px]"
            >
              Book {category.name.toLowerCase()}
            </EnquiryButton>
          </li>
        ))}
      </ul>

      {/* Urgent help, and questions. Two different needs, two different routes. */}
      <div className="mt-4 grid gap-4 lg:mt-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-5">
        <div className={cn(cardClass.cream, "flex flex-col gap-4 border-ink/80 p-6 sm:flex-row sm:items-center sm:justify-between")}>
          <div>
            <span className="inline-block rounded-sm bg-plate px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em]">Day or night</span>
            <p className="mt-2 text-[21px] font-semibold leading-snug tracking-[-0.01em]">Dead battery? We&apos;ll come out.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
            <CallLink variant="primary" className="px-5">Call now</CallLink>
            <EnquiryButton variant="secondary" choice="battery-replacement" timing="asap" className="px-5 text-ink">
              Book a battery
            </EnquiryButton>
          </div>
        </div>

        <WhatsAppLink
          plain
          icon={false}
          message="Hi Revved, I'm not sure what's wrong with my car."
          className={cn(cardClass.cream, cardInteractive, "group flex items-center gap-4 p-6 hover:border-ink/40")}
        >
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#128C4B]">
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="flex-1">
            <span className="block text-[18px] font-semibold tracking-[-0.01em]">Not sure what&apos;s wrong?</span>
            <span className="block text-[15px] text-ink-soft">Tell us on WhatsApp. We&apos;ll point you to the right job.</span>
          </span>
          <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
        </WhatsAppLink>
      </div>
    </Band>
  );
}

// The featured offer, full width in brand plum. It leads straight into Performance below.
export function OfferBand({ offer }: { offer: Offer }) {
  return (
    <Band tone="plum" label="Featured offer" className="pb-8 lg:pb-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/70">Offer</p>
          <h2 className="mt-3 text-[clamp(1.9rem,6.4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.02em]">{offer.title}</h2>
          <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-white/80">{offer.tagline}</p>
        </div>
        <div className="flex flex-col gap-5 rounded-xl bg-white p-5 text-ink sm:flex-row sm:items-center sm:gap-8 lg:p-6">
          <div>
            {offer.saving && <p className="text-[14px] text-ink-soft">Booked separately <span className="line-through">{offer.saving.separately}</span></p>}
            <p className="mt-1 flex items-baseline gap-3">
              <span className="text-[44px] font-bold leading-none tracking-[-0.02em]">{formatOfferPrice(offer)}</span>
              {offer.saving && <span className="rounded-sm bg-plate px-2 py-0.5 text-[14px] font-bold">{offer.saving.headline}</span>}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <EnquiryButton choice={`offer-${offer.slug}`} className="px-6">Book this offer</EnquiryButton>
            <Link href={`/offers#${offer.slug}`} className="inline-flex min-h-[44px] items-center justify-center gap-1.5 text-[14px] font-semibold text-plum underline-offset-4 hover:underline">
              What&apos;s included <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </Band>
  );
}

// Recent work: real photos and customers' own words. No review platform is named.
// With nothing to show yet it renders marked slots on preview builds and nothing on the live site.
export function RecentWork() {
  const hasContent = workPhotos.length > 0 || workReviews.length > 0;
  if (!hasContent && !isPreviewBuild()) return null;

  const slot = "flex items-center justify-center rounded-xl border-[1.5px] border-dashed border-ink/30 bg-white/60 p-5 text-center text-[14px] leading-relaxed text-ink-soft";

  return (
    <Band id="recent-work">
      <BandHeader eyebrow="Recent work" title="Done at the door." />
      {workPhotos.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-3 lg:gap-5">
          {workPhotos.slice(0, 3).map((photo) => (
            <li key={photo.src} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white">
              <Img src={photo.src} alt={photo.alt} fill sizes="(min-width: 640px) 33vw, 100vw" />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-3 lg:gap-5" aria-label="Photo slots, preview only">
          {[1, 2, 3].map((n) => (
            <li key={n} className={cn(slot, "aspect-[4/3]", n > 1 && "hidden sm:flex")}>Slot for job photo {n}. Shown on previews only.</li>
          ))}
        </ul>
      )}

      {workReviews.length > 0 ? (
        <ul className="mt-4 grid gap-4 lg:mt-5 lg:grid-cols-2 lg:gap-5">
          {workReviews.slice(0, 2).map((review) => (
            <li key={review.quote}>
              <figure className={cn(cardClass.cream, "flex h-full flex-col gap-3 p-6")}>
                <blockquote className="font-accent text-[22px] italic leading-[1.4]">{review.quote}</blockquote>
                <figcaption className="mt-auto text-[14px] font-semibold text-ink-soft">{review.firstName} · {review.job}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-4 grid gap-4 lg:mt-5 lg:grid-cols-2 lg:gap-5" aria-label="Review slots, preview only">
          {[1, 2].map((n) => (
            <li key={n} className={cn(slot, "min-h-[7.5rem]")}>Slot for review {n}: the customer&apos;s own words and first name. Shown on previews only.</li>
          ))}
        </ul>
      )}
    </Band>
  );
}

export function Areas() {
  return (
    <Band id="areas" className="border-t border-line">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-14">
        <BandHeader eyebrow="Close to home" title="East London. Essex. Your door." aside="Add your postcode when you book." className="mb-0 lg:mb-0 lg:block [&>div:last-child]:mt-4" />
        <ul className="flex flex-wrap content-start gap-2" aria-label="Towns we cover">
          {locations.map((location) => (
            <li key={location.slug} className="rounded-full border border-line bg-white px-4 py-2 text-[14px] font-medium">
              {location.name}
            </li>
          ))}
        </ul>
      </div>
    </Band>
  );
}
