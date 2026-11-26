import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { CallLink, WhatsAppLink } from "../ui/actions";
import { Band, BandHeader, cardClass, cardInteractive } from "./Band";
import { careCategories } from "../../data/care";
import { photos, CarePhotoKey, Photo as PhotoData } from "../../data/photos";
import { Photo } from "../ui/Photo";
import { workItems, sampleWorkItems, WorkItem } from "../../data/work";
import { formatOfferPrice } from "../../lib/offers";
import { isPreviewBuild } from "../../lib/env";
import { Offer } from "../../types";
import { cn } from "../../lib/utils";

// Car care: the four categories as photo tiles (real photography, data/photos.ts).
// Each tile leads with the situation ("If..."), then the service and its "from" price.
const tileCopy: Record<CarePhotoKey, { line: string; tag?: string }> = {
  batteries: { line: "If your car won't start", tag: "24/7" },
  servicing: { line: "If it's due a service" },
  brakes: { line: "If it squeals when you stop" },
  diagnostics: { line: "If a warning light comes on" },
};

const tiles = [
  ...careCategories.map((category) => {
    const key = category.slug as CarePhotoKey;
    return {
      href: `/${category.slug}`,
      name: category.name,
      price: category.cardPrice,
      photo: photos[key] as PhotoData,
      wide: false,
      ...tileCopy[key],
    };
  }),
  {
    href: "/performance",
    name: "Performance",
    price: "Stage 1 from £179",
    photo: photos.performance as PhotoData,
    line: "If you want more power",
    tag: undefined as string | undefined,
    wide: true,
  },
];

export function CareServices() {
  return (
    <Band id="services" tone="plum" className="pt-6 lg:pt-10">
      <BandHeader
        tone="plum"
        eyebrow="Car care and performance"
        title={<>What needs<br className="hidden sm:block" /> doing?</>}
        aside="Pick what's going on. Every price is confirmed before we start."
      />

      <ul
        aria-label="Services"
        className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-5 xl:grid-cols-5 [&::-webkit-scrollbar]:hidden"
      >
        {tiles.map((t) => (
          <li key={t.href} className={cn("w-[78%] shrink-0 snap-start sm:w-auto", t.wide && "sm:col-span-2 xl:col-span-1")}>
            <Link
              href={t.href}
              className={cn(
                "group relative block aspect-[4/5] overflow-hidden rounded-xl bg-dark outline-offset-4",
                t.wide ? "sm:aspect-[16/8] xl:aspect-[4/5.4]" : "sm:aspect-[4/5] xl:aspect-[4/5.4]"
              )}
            >
              <Photo
                photo={t.photo}
                sizes={t.wide ? "(min-width: 1280px) 40vw, (min-width: 640px) 100vw, 160vw" : "(min-width: 1280px) 40vw, (min-width: 640px) 92vw, 160vw"}
                className="transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,11,18,0.9)_0%,rgba(21,11,18,0.35)_30%,rgba(21,11,18,0)_50%)]" />
              {t.tag && (
                <span className="absolute left-4 top-4 rounded-sm bg-plate px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">{t.tag}</span>
              )}
              <span className="absolute inset-x-5 bottom-5 flex flex-col text-white">
                <span className="font-display text-[clamp(2rem,2.6vw,2.5rem)] uppercase leading-none tracking-[0.01em]">{t.name}</span>
                <span className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-[16px] font-bold text-plate">{t.price}</span>
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-plate text-ink transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none">
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {/* Phones: the tiles scroll sideways; say so, as the next one only peeks in */}
      <p aria-hidden="true" className="mt-3 flex items-center gap-2 text-[13px] font-semibold text-white/70 sm:hidden">
        Swipe for all {tiles.length} <ArrowRight className="h-4 w-4" />
      </p>

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
  const sample = workItems.length === 0;
  if (sample && !isPreviewBuild()) return null;
  const items = sample ? sampleWorkItems : workItems;

  const card = (item: WorkItem, key: string, hidden = false) =>
    item.kind === "photo" ? (
      <li key={key} aria-hidden={hidden || undefined} className="relative mr-4 aspect-[4/5] w-[15rem] shrink-0 overflow-hidden rounded-xl bg-dark sm:w-[18rem] lg:mr-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.src} alt={hidden ? "" : item.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,11,18,0.85)_0%,rgba(21,11,18,0)_45%)]" />
        <span className="absolute inset-x-4 bottom-4 text-white">
          <span className="block text-[16px] font-semibold">{item.job}</span>
          <span className="block text-[13px] text-white/75">{item.town}</span>
        </span>
        {sample && <span className="absolute left-3 top-3 rounded-sm bg-white/90 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-ink">Sample</span>}
      </li>
    ) : (
      <li key={key} aria-hidden={hidden || undefined} className="mr-4 flex w-[17rem] shrink-0 flex-col justify-between gap-6 rounded-xl border border-line bg-white p-6 sm:w-[21rem] lg:mr-5">
        <span className="flex flex-col gap-3">
          <span aria-hidden="true" className="text-[15px] tracking-[0.2em] text-plate [text-shadow:0_0_0.5px_#1a1418]">★★★★★</span>
          <blockquote className="font-accent text-[20px] italic leading-[1.4] text-ink">{item.quote}</blockquote>
        </span>
        <span className="text-[14px] font-semibold text-ink-soft">
          {item.firstName} · {item.job}
          {sample && <span className="ml-2 rounded-sm bg-plum/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-plum">Sample</span>}
        </span>
      </li>
    );

  return (
    <Band id="recent-work" containerClassName="max-w-none! px-0! md:px-0! lg:px-0!">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 lg:px-12">
        <BandHeader eyebrow="Recent work" title="Done at the door." aside={sample ? "Sample photos and reviews, shown on previews only. The real ones replace them." : undefined} />
      </div>
      {/* One strip that keeps sliding; it pauses under the pointer or keyboard focus.
          With reduced motion it stops and scrolls by hand instead. */}
      <div className="work-marquee group relative overflow-hidden">
        <ul className="work-track flex w-max items-stretch">
          {items.map((item, i) => card(item, `a${i}`))}
          {items.map((item, i) => card(item, `b${i}`, true))}
        </ul>
      </div>
    </Band>
  );
}
