import { Metadata } from "next";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "../data/site";
import { services } from "../data/services";
import { offers } from "../data/offers";
import { locations } from "../data/locations";
import { faqs } from "../data/faqs";
import { careCategories } from "../data/care";
import { absoluteUrl, getSiteUrl } from "../lib/seo";
import { getPhoneUrl, getWhatsAppNumber } from "../lib/whatsapp";
import { getOffersForDisplay } from "../lib/offers";

import { Container } from "../components/layout/layout-primitives";
import { Img } from "../components/ui/Img";
import { EnquiryButton } from "../components/enquiry/EnquiryButton";
import { TrackedAnchor } from "../components/analytics/TrackedAnchor";
import { FaqSection, FinalCall, PromiseBand } from "../components/sections/shared";
import { Areas, CareServices, OfferTeaser, RecentWork } from "../components/sections/home";
import { PerformanceSection } from "../components/sections/PerformanceSection";

export const metadata: Metadata = {
  title: {
    absolute: site.homeTitle,
  },
  description: site.homeDescription,
  alternates: { canonical: "/" },
};

const promises = [
  "Price agreed before you book",
  "At your home or work",
  "3-year battery warranty",
  "Pay on the day, when the job is done",
];

export default function Home() {
  // The featured offer is always a published one, never a preview-only proposal
  const featuredOffer = getOffersForDisplay(offers).find((o) => o.featured && o.status === "active");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${getSiteUrl()}/#business`,
    "name": site.name,
    "url": getSiteUrl(),
    "logo": absoluteUrl("/images/revved-logo.png"),
    "image": absoluteUrl("/images/revved-logo.png"),
    "email": site.social.email,
    "legalName": site.company.legalName,
    // Mobile business: town only, no street address (registered office is not a trading address)
    "address": {
      "@type": "PostalAddress",
      "addressLocality": site.baseTown,
      "addressCountry": "GB"
    },
    "telephone": `+${getWhatsAppNumber()}`,
    "priceRange": "££",
    "areaServed": locations.map(l => ({ "@type": "City", "name": l.name })),
    "sameAs": [site.social.instagram, site.social.facebook].filter(Boolean),
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": site.openingHours.days,
      "opens": site.openingHours.opens,
      "closes": site.openingHours.closes
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mobile car care and performance tuning",
      "itemListElement": [
        ...careCategories.map(c => ({
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": c.name, "url": absoluteUrl(`/${c.slug}`) }
        })),
        ...services
          .filter(s => s.status === "active" && s.indexable && s.price)
          .map(s => ({
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": s.name, "url": absoluteUrl(`/services/${s.slug}`) },
            "price": s.price!.amount,
            "priceCurrency": "GBP"
          }))
      ]
    }
  };

  // FAQ markup mirrors the questions rendered on the page, word for word
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero (plum). The background runs from the artwork's own top plum to its bottom plum, so there is no seam.
          Phone: headline in the clear plum above the artwork. Desktop: text left, artwork right, uncropped. */}
      <section className="relative isolate overflow-hidden bg-plum-hero text-white lg:bg-[linear-gradient(to_bottom,var(--color-plum-hero)_30%,var(--color-plum-hero-end))]">
        <Container className="relative z-10 pt-7 sm:pt-10 lg:flex lg:min-h-[min(calc(100svh-72px),800px)] lg:items-center lg:py-16">
          <div className="lg:max-w-[40rem]">
            <p className="hero-rise flex flex-wrap items-center gap-x-3.5 gap-y-2" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="bg-plate px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">{site.hoursDisplay}</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-plum-tint">{site.serviceAreaSummary}</span>
            </p>

            <h1 className="mt-5 flex flex-col gap-1.5 lg:gap-2">
              <span className="hero-rise whitespace-nowrap font-display text-[clamp(2.25rem,calc((100vw-3rem)/6.75),6.5rem)] lg:max-xl:text-[5.25rem] uppercase leading-[0.96] tracking-[0.005em]" style={{ "--i": 1 } as React.CSSProperties}>
                We come to you.
              </span>
              <span className="hero-rise font-accent text-[clamp(1.55rem,7.2vw,2.75rem)] italic leading-[1.1] text-plum-tint" style={{ "--i": 2 } as React.CSSProperties}>
                You get on with your day.
              </span>
            </h1>

            <p className="hero-rise mt-5 max-w-[32.5rem] text-[17px] leading-relaxed text-mist lg:text-[18px]" style={{ "--i": 3 } as React.CSSProperties}>
              Batteries, servicing, brakes and diagnostics at your home or work. ECU remapping and performance tuning too.
            </p>

            <div className="hero-rise mt-7 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ "--i": 4 } as React.CSSProperties}>
              <EnquiryButton className="min-h-[56px] px-8 text-[16px]">Get a quote</EnquiryButton>
              <TrackedAnchor
                href={getPhoneUrl()}
                event="phone_click"
                className="hidden min-h-[56px] items-center justify-center gap-2 rounded-md border-[1.5px] border-white px-7 text-[16px] font-bold transition-colors hover:bg-white/10 sm:inline-flex"
              >
                <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                Call {site.phoneDisplay}
              </TrackedAnchor>
            </div>

            <p className="hero-rise mt-4 text-[14px] text-mist" style={{ "--i": 5 } as React.CSSProperties}>
              Price agreed before you book. Nothing is paid online.
            </p>

            <a
              href="#performance"
              className="hero-rise mt-1 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-plate underline-offset-4 hover:underline"
              style={{ "--i": 6 } as React.CSSProperties}
            >
              After a remap? See Performance
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Container>

        {/* Artwork: the rolled-road concept. Placeholder file; the refined version (1504 x 2688) drops in at the same path. */}
        <div className="hero-art pointer-events-none relative -mt-[38vw] -mb-[9vw] sm:ml-auto sm:mr-0 sm:-mt-[34vw] sm:-mb-[4rem] lg:mb-0 sm:max-w-[34rem] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:max-w-none lg:w-[min(46vw,640px)]">
          <Img
            src="/images/hero-road.png"
            alt="A road rolling up to the driveway of a British house at dusk, with a silver car parked outside"
            width={752}
            height={1344}
            preload
            sizes="(min-width: 1024px) 640px, (min-width: 640px) 544px, 100vw"
            className="hero-art-mask h-auto w-full lg:absolute lg:bottom-0 lg:right-0 lg:h-[112%] lg:w-auto lg:max-w-none lg:object-contain"
          />
        </div>
      </section>

      <PromiseBand items={promises} />

      <CareServices />

      {featuredOffer && <OfferTeaser offer={featuredOffer} />}

      <PerformanceSection />

      <RecentWork />

      <Areas />

      <FaqSection id="questions" title="Before you book." items={faqs} />

      <FinalCall />
    </>
  );
}
