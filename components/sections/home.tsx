import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "../layout/layout-primitives";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { TrackedAnchor } from "../analytics/TrackedAnchor";
import { Reveal } from "../ui/Reveal";
import { Img } from "../ui/Img";
import { CareIcon } from "./CareIcon";
import { Eyebrow, Heading } from "./shared";
import { careCategories } from "../../data/care";
import { locations } from "../../data/locations";
import { site } from "../../data/site";
import { workPhotos, workReviews } from "../../data/work";
import { formatOfferPrice } from "../../lib/offers";
import { isPreviewBuild } from "../../lib/env";
import { getPhoneUrl } from "../../lib/whatsapp";
import { NOT_SURE_ID } from "../../lib/enquiry";
import { Offer } from "../../types";
import { cn } from "../../lib/utils";

// Car care (cream): the four categories, the dead-battery line, and a way in for "not sure".
export function CareServices() {
  return (
    <section id="services" className="bg-cream text-ink py-16 lg:py-24">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div>
              <Eyebrow>Everyday car care</Eyebrow>
              <Heading className="mt-3">What needs doing?</Heading>
            </div>
            <p className="max-w-[21rem] text-[15px] leading-relaxed text-ink-soft">
              Choose the job and see how it&apos;s priced. We confirm the full quote with you before you book.
            </p>
          </div>

          <ul className="mt-9 grid gap-3 sm:grid-cols-2 lg:mt-10 xl:grid-cols-4">
            {careCategories.map((category) => (
              <li key={category.slug} className="flex flex-col border border-line bg-white/60 transition-[border-color,box-shadow] duration-200 hover:border-ink/50 hover:shadow-[0_10px_28px_-16px_rgba(26,20,24,0.45)]">
                <Link href={`/${category.slug}`} className="group flex flex-1 flex-col gap-3 p-5 lg:p-6">
                  <span className="flex items-start justify-between">
                    <CareIcon slug={category.slug} className="h-9 w-9 text-plum" />
                    <ArrowRight className="h-5 w-5 text-ink-soft transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </span>
                  <span className="mt-2 text-[22px] font-semibold tracking-[-0.01em]">{category.name}</span>
                  <span className="text-[15px] leading-relaxed text-ink-soft">{category.cardSummary}</span>
                  <span className="mt-auto flex flex-col gap-0.5 pt-3">
                    <span className="text-[16px] font-bold">{category.cardPrice}</span>
                    <span className="text-[13px] text-ink-soft">{category.cardPriceNote}</span>
                  </span>
                </Link>
                <div className="grid grid-cols-2 border-t border-line text-[14px] font-semibold">
                  <Link href={`/${category.slug}`} className="inline-flex min-h-[48px] items-center justify-center border-r border-line hover:bg-ink/5">
                    See prices
                  </Link>
                  <EnquiryButton plain choice={category.primaryJobId} aria-label={`Get a quote for ${category.name.toLowerCase()}`} className="inline-flex min-h-[48px] items-center justify-center text-plum hover:bg-plum/10">
                    Get a quote
                  </EnquiryButton>
                </div>
              </li>
            ))}
          </ul>

          {/* The dead-battery line */}
          <div className="mt-3 flex flex-col gap-4 border-[1.5px] border-ink bg-white p-5 text-ink sm:flex-row sm:items-center sm:justify-between lg:p-6">
            <div className="flex flex-col gap-2">
              <span className="self-start bg-plate px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">Day or night</span>
              <p className="text-[21px] font-semibold leading-snug tracking-[-0.01em] lg:text-[24px]">
                Dead battery? Battery call-outs run day and night.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
              <EnquiryButton choice="battery-replacement" timing="asap" className="px-5">Get a battery now</EnquiryButton>
              <TrackedAnchor
                href={getPhoneUrl()}
                event="phone_click"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border-[1.5px] border-ink px-5 text-[15px] font-bold hover:bg-ink/5"
              >
                <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                Call {site.phoneDisplay}
              </TrackedAnchor>
            </div>
          </div>

          <EnquiryButton
            plain
            choice={NOT_SURE_ID}
            className="group mt-3 flex min-h-[56px] w-full items-center justify-between gap-4 border-b border-line py-3 text-left text-[15px]"
          >
            <span><strong className="font-semibold">Not sure what&apos;s wrong?</strong> Tell us what&apos;s happening.</span>
            <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
          </EnquiryButton>
        </Reveal>
      </Container>
    </section>
  );
}

// One compact featured-offer teaser, linking to the Offers page
export function OfferTeaser({ offer }: { offer: Offer }) {
  return (
    <section aria-label="Featured offer" className="bg-cream text-ink pb-16 lg:pb-24">
      <Container>
        <Reveal>
          <Link
            href={`/offers#${offer.slug}`}
            className="group flex flex-col gap-4 border border-plum bg-white p-5 transition-shadow duration-200 hover:shadow-[0_10px_28px_-16px_rgba(105,60,86,0.7)] sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:p-6"
          >
            <span className="flex flex-col gap-1.5">
              <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-plum">Offer</span>
              <span className="text-[21px] font-semibold leading-snug tracking-[-0.01em] lg:text-[24px]">{offer.title}</span>
              {offer.tagline && <span className="text-[15px] text-ink-soft">{offer.tagline}</span>}
            </span>
            <span className="flex shrink-0 items-center justify-between gap-6">
              <span className="bg-plate px-3 py-1 text-[26px] font-bold leading-tight tracking-[-0.01em]">{formatOfferPrice(offer)}</span>
              <span className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-plum">
                See the offer
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
              </span>
            </span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

// Recent work (cream): real photos and customers' own words. No review platform is named.
// With nothing to show yet it renders marked slots on preview builds and nothing on the live site.
export function RecentWork() {
  const hasContent = workPhotos.length > 0 || workReviews.length > 0;
  const preview = isPreviewBuild();
  if (!hasContent && !preview) return null;

  const slot = "flex items-center justify-center border-[1.5px] border-dashed border-ink/35 bg-white/50 p-5 text-center text-[14px] leading-relaxed text-ink-soft";

  return (
    <section id="recent-work" className="bg-cream text-ink py-16 lg:py-24">
      <Container>
        <Reveal>
          <Eyebrow>Recent work</Eyebrow>
          <Heading className="mt-3">Done at the door.</Heading>

          {workPhotos.length > 0 ? (
            <ul className="mt-9 grid gap-3 sm:grid-cols-3">
              {workPhotos.slice(0, 3).map((photo) => (
                <li key={photo.src} className="relative aspect-[4/3] overflow-hidden bg-cream-deep">
                  <Img src={photo.src} alt={photo.alt} fill sizes="(min-width: 640px) 33vw, 100vw" />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-9 grid gap-3 sm:grid-cols-3" aria-label="Photo slots, preview only">
              {[1, 2, 3].map((n) => (
                <li key={n} className={cn(slot, "aspect-[4/3]", n > 1 && "hidden sm:flex")}>Slot for job photo {n}. Shown on previews only.</li>
              ))}
            </ul>
          )}

          {workReviews.length > 0 ? (
            <ul className="mt-3 grid gap-3 lg:grid-cols-2">
              {workReviews.slice(0, 2).map((review) => (
                <li key={review.quote}>
                  <figure className="flex h-full flex-col gap-3 border border-line bg-white/60 p-6">
                    <blockquote className="font-accent text-[22px] italic leading-[1.4]">{review.quote}</blockquote>
                    <figcaption className="mt-auto text-[14px] font-semibold text-ink-soft">{review.firstName} · {review.job}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-3 grid gap-3 lg:grid-cols-2" aria-label="Review slots, preview only">
              {[1, 2].map((n) => (
                <li key={n} className={cn(slot, "min-h-[7.5rem]")}>Slot for review {n}: the customer&apos;s own words and first name. Shown on previews only.</li>
              ))}
            </ul>
          )}
        </Reveal>
      </Container>
    </section>
  );
}

// Areas (cream)
export function Areas() {
  return (
    <section id="areas" className="bg-cream-deep text-ink py-16 lg:py-24">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-14">
          <div>
            <Eyebrow>Close to home</Eyebrow>
            <Heading className="mt-3">East London. Essex. Your door.</Heading>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-soft">
              Send your postcode with your request. We confirm coverage and availability.
            </p>
          </div>
          <ul className="flex flex-wrap content-start gap-2" aria-label="Towns we cover">
            {locations.map((location) => (
              <li key={location.slug} className="border border-line bg-cream px-3.5 py-2 text-[14px] font-medium">
                {location.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
