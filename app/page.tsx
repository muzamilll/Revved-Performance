import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { site } from "../data/site";
import { services } from "../data/services";
import { offers } from "../data/offers";
import { locations } from "../data/locations";
import { faqs } from "../data/faqs";
import { careCategories } from "../data/care";
import { absoluteUrl, getSiteUrl } from "../lib/seo";
import { getWhatsAppNumber } from "../lib/whatsapp";
import { getOffersForDisplay } from "../lib/offers";

import { Container } from "../components/layout/layout-primitives";
import { Img } from "../components/ui/Img";
import { EnquiryButton } from "../components/enquiry/EnquiryButton";
import { WhatsAppLink } from "../components/ui/actions";
import { FaqSection, FinalCall, PromiseRow } from "../components/sections/shared";
import { Areas, CareServices, OfferBand, RecentWork } from "../components/sections/home";
import { PerformanceSection } from "../components/sections/PerformanceSection";

export const metadata: Metadata = {
  title: {
    absolute: site.homeTitle,
  },
  description: site.homeDescription,
  alternates: { canonical: "/" },
};

const trustLine = ["No lift to the garage", "No waiting room", "No lost day"];

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

      {/* Hero. The artwork's backdrop is the brand plum, so it sits in the page with no edge.
          Phone: message first, artwork below it. Desktop: message left, artwork filling the right half. */}
      <section className="relative isolate overflow-hidden bg-plum text-white">
        <Container>
          <div className="grid lg:min-h-[min(calc(100svh-72px-6rem),760px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-6 xl:grid-cols-[minmax(0,7fr)_minmax(0,6fr)]">
            <div className="relative z-10 pt-8 sm:pt-12 lg:py-16">
              <p className="hero-rise flex flex-wrap items-center gap-x-3.5 gap-y-2" style={{ "--i": 0 } as React.CSSProperties}>
                <span className="rounded-sm bg-plate px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">{site.hoursDisplay}</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/75">{site.serviceAreaSummary}</span>
              </p>

              <h1 className="mt-5 flex flex-col gap-1.5 lg:gap-2">
                <span className="hero-rise whitespace-nowrap font-display text-[clamp(2.25rem,calc((100vw-3rem)/6.75),6rem)] lg:text-[clamp(4.5rem,7.4vw,6.75rem)] uppercase leading-[0.96] tracking-[0.005em]" style={{ "--i": 1 } as React.CSSProperties}>
                  We come to you.
                </span>
                <span className="hero-rise font-accent text-[clamp(1.55rem,7.2vw,2.75rem)] italic leading-[1.1] text-white" style={{ "--i": 2 } as React.CSSProperties}>
                  You get on with your day.
                </span>
              </h1>

              <p className="hero-rise mt-5 max-w-[32rem] text-[17px] leading-relaxed text-white/80 lg:text-[18px]" style={{ "--i": 3 } as React.CSSProperties}>
                Batteries, servicing, brakes and diagnostics at your home or work. ECU remapping too.
              </p>

              <div className="hero-rise mt-7 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ "--i": 4 } as React.CSSProperties}>
                <EnquiryButton className="min-h-[56px] px-8 text-[16px]" />
                <WhatsAppLink className="min-h-[56px] px-7 text-[16px] text-white" />
              </div>

              <a
                href="#performance"
                className="hero-rise mt-3 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-plate underline-offset-4 hover:underline"
                style={{ "--i": 5 } as React.CSSProperties}
              >
                Want more power? See Performance
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            {/* The rolled-road artwork */}
            <div className="hero-art relative -mx-6 -mt-[18vw] sm:mx-auto sm:-mt-24 sm:w-[30rem] md:-mx-8 md:ml-auto md:mr-[-2rem] lg:m-0 lg:-mr-12 lg:h-full lg:w-auto lg:self-end">
              <Img
                src="/images/hero-road.webp"
                alt="A road rolled up like a carpet in front of a brick house, ending at the driveway where a silver hatchback is parked"
                width={991}
                height={1334}
                preload
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 480px, 100vw"
                className="hero-art-mask pointer-events-none h-auto w-full lg:ml-auto lg:max-h-[min(calc(100svh-72px-6rem),760px)] lg:w-auto lg:object-contain lg:object-bottom"
              />
            </div>
          </div>
        </Container>

        <Container className="relative z-10 pb-8 lg:pb-10">
          <PromiseRow items={trustLine} className="mt-0 lg:mt-0" />
        </Container>
      </section>

      <CareServices />

      {featuredOffer && <OfferBand offer={featuredOffer} />}

      <PerformanceSection />

      <RecentWork />

      <Areas />

      <FaqSection id="questions" title="Before you book." items={faqs} />

      <FinalCall />
    </>
  );
}
