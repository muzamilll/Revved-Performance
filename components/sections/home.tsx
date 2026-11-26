import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { CallLink, WhatsAppLink } from "../ui/actions";
import { Img } from "../ui/Img";
import { Band, BandHeader, cardClass, cardInteractive } from "./Band";
import { careCategories } from "../../data/care";
import { photos, CarePhotoKey } from "../../data/photos";
import { workPhotos, workReviews } from "../../data/work";
import { formatOfferPrice } from "../../lib/offers";
import { isPreviewBuild } from "../../lib/env";
import { Offer } from "../../types";
import { cn } from "../../lib/utils";

// Car care: the four categories as photo tiles (real photography, data/photos.ts).
// Each tile leads with the situation ("If..."), then the service and its "from" price.
const tileCopy: Record<CarePhotoKey, { line: string; tag?: string; focus?: string }> = {
  batteries: { line: "If your car won't start", tag: "24/7", focus: "60% 50%" },
  servicing: { line: "If it's due a service", focus: "62% 50%" },
  brakes: { line: "If it squeals when you stop", focus: "50% 50%" },
  diagnostics: { line: "If a warning light comes on", focus: "28% 50%" },
};

export function CareServices() {
  return (
    <Band id="services" tone="plum" className="pt-6 lg:pt-10">
      <BandHeader
        tone="plum"
        eyebrow="Everyday car care"
        title={<>What needs<br className="hidden sm:block" /> doing?</>}
        aside="Pick what's going on. Every price is confirmed before we start."
      />

      <ul className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-5 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
        {careCategories.map((category) => {
          const key = category.slug as CarePhotoKey;
          const photo = photos[key];
          const copy = tileCopy[key];
          return (
            <li key={category.slug} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <Link
                href={`/${category.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-dark outline-offset-4 sm:aspect-[4/5.2]"
              >
                <Img
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 78vw"
                  style={{ objectPosition: copy.focus }}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,11,18,0.94)_0%,rgba(21,11,18,0.55)_40%,rgba(21,11,18,0)_66%)]" />
                {copy.tag && (
                  <span className="absolute left-4 top-4 rounded-sm bg-plate px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">{copy.tag}</span>
                )}
                <span className="absolute inset-x-5 bottom-5 flex flex-col text-white">
                  <span className="font-accent text-[17px] italic leading-snug text-white/90">{copy.line}</span>
                  <span className="mt-1.5 font-display text-[clamp(2rem,3vw,2.6rem)] uppercase leading-none tracking-[0.01em]">{category.name}</span>
                  <span className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-[17px] font-bold text-plate">{category.cardPrice}</span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-plate text-ink transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none">
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Urgent help, and questions. Two different needs, two different routes. */}
      <div className="mt-4 grid gap-4 lg:mt-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-5">
        <div className={cn(cardClass.plum, "flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between")}>
          <div>
            <span className="inline-block rounded-sm bg-plate px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">Day or night</span>
            <p className="mt-2 text-[21px] font-semibold leading-snug tracking-[-0.01em]">Dead battery? We&apos;ll come out.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
            <CallLink variant="primary" className="px-5">Call now</CallLink>
            <EnquiryButton variant="secondary" choice="battery-replacement" timing="asap" className="border-white/60 px-5 text-white">
              Book a battery
            </EnquiryButton>
          </div>
        </div>

        <WhatsAppLink
          plain
          icon={false}
          message="Hi Revved, I'm not sure what's wrong with my car."
          className={cn(cardClass.plum, cardInteractive, "group flex items-center gap-4 p-6 text-white hover:border-white/40")}
        >
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/20 text-[#5BE38F]">
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="flex-1">
            <span className="block text-[18px] font-semibold tracking-[-0.01em]">Not sure what&apos;s wrong?</span>
            <span className="block text-[15px] text-white/75">Tell us on WhatsApp. We&apos;ll point you to the right job.</span>
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
