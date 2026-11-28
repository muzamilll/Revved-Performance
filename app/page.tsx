import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { site } from "../data/site";
import { services } from "../data/services";
import { offers } from "../data/offers";
import { faqs } from "../data/faqs";
import { careCategories } from "../data/care";
import { absoluteUrl, areaServedLd, getSiteUrl } from "../lib/seo";
import { getWhatsAppNumber } from "../lib/whatsapp";
import { getOffersForDisplay } from "../lib/offers";

import { Container } from "../components/layout/layout-primitives";
import { EnquiryButton } from "../components/enquiry/EnquiryButton";
import { WhatsAppLink } from "../components/ui/actions";
import { FaqSection, FinalCall, PromiseRow } from "../components/sections/shared";
import { CareServices, RecentWork } from "../components/sections/home";
import { AreasCovered, ChatStrip } from "../components/sections/personality";
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
    "areaServed": areaServedLd(),
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

      {/* Hero: type only, on plum. The real photos start right below it, in the car care tiles,
          so they're on the first screen. Headline across the full width; actions beside the intro. */}
      <section className="relative isolate overflow-hidden bg-plum text-white">
        <Container className="pt-8 pb-6 sm:pt-12 lg:pt-14 lg:pb-8">
          <p className="hero-rise flex flex-wrap items-center gap-x-3.5 gap-y-2" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="rounded-sm bg-plate px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">{site.hoursDisplay}</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">{site.serviceAreaSummary}</span>
          </p>

          <h1 className="mt-5 lg:mt-6">
            <span className="hero-rise block whitespace-nowrap font-display text-[clamp(2.6rem,calc((100vw-3rem)/6.4),11.5rem)] uppercase leading-[0.9] tracking-[0.005em]" style={{ "--i": 1 } as React.CSSProperties}>
              We come to you.
            </span>
            <span className="hero-rise mt-2 block font-accent text-[clamp(1.6rem,6.6vw,3.25rem)] italic leading-[1.1] text-white lg:mt-3" style={{ "--i": 2 } as React.CSSProperties}>
              You get on with your day.
            </span>
          </h1>

          <div className="mt-6 grid gap-6 lg:mt-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
            <p className="hero-rise max-w-[34rem] text-[17px] leading-relaxed text-white/85 lg:text-[19px]" style={{ "--i": 3 } as React.CSSProperties}>
              Batteries, servicing, brakes and diagnostics at your home or work. ECU remapping too.
            </p>
            <div className="hero-rise flex flex-col gap-3 sm:flex-row sm:items-center" style={{ "--i": 4 } as React.CSSProperties}>
              <EnquiryButton className="min-h-[56px] px-8 text-[16px]" />
              <WhatsAppLink className="min-h-[56px] px-7 text-[16px] text-white" />
            </div>
          </div>

          <a
            href="#performance"
            className="hero-rise mt-3 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-plate underline-offset-4 hover:underline lg:mt-4"
            style={{ "--i": 5 } as React.CSSProperties}
          >
            Want more power? See Performance
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <PromiseRow items={trustLine} className="mt-5 lg:mt-7" />
        </Container>
      </section>

      <CareServices />

      <ChatStrip />

      <RecentWork />

      <PerformanceSection offer={featuredOffer} />

      <AreasCovered />

      <FaqSection id="questions" title="Good to know." items={faqs} />

      <FinalCall skyline />
    </>
  );
}
