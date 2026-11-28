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
import { FaqSection, FinalCall } from "../components/sections/shared";
import { CareServices, RecentWork } from "../components/sections/home";
import { AreasCovered, ChatStrip } from "../components/sections/personality";
import { photos, Photo as PhotoData } from "../data/photos";
import { Photo } from "../components/ui/Photo";
import { PerformanceSection } from "../components/sections/PerformanceSection";

export const metadata: Metadata = {
  title: {
    absolute: site.homeTitle,
  },
  description: site.homeDescription,
  alternates: { canonical: "/" },
};


const routes = [
  {
    href: "#services",
    eyebrow: "Car care",
    title: "Batteries, servicing, brakes, diagnostics",
    text: "Done where the car is parked. From £50.",
    cta: "See car care",
    photo: photos.servicing as PhotoData,
  },
  {
    href: "#performance",
    eyebrow: "Performance",
    title: "Stage 1 remaps from £250",
    text: "Engine + gearbox in one visit, £329. Real figures for your car.",
    cta: "See performance",
    photo: photos.tool as PhotoData,
  },
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
      {/* Opening: the promise, one action, and the two routes in (car care / performance) */}
      <section className="relative isolate overflow-hidden bg-plum text-white">
        <Container className="pt-10 pb-10 sm:pt-14 lg:pt-16 lg:pb-14">
          <p className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
            <span className="rounded-sm bg-plate px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">{site.hoursDisplay}</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">{site.serviceAreaSummary}</span>
          </p>

          <div className="mt-5 grid gap-8 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end lg:gap-14">
            <h1>
              <span className="block whitespace-nowrap font-display text-[clamp(2.6rem,calc((100vw-3rem)/6.4),7.25rem)] uppercase leading-[0.9] tracking-[0.005em]">
                We come to you.
              </span>
              <span className="mt-2 block font-accent text-[clamp(1.55rem,6.2vw,2.6rem)] italic leading-[1.1] text-white lg:mt-3">
                You get on with your day.
              </span>
            </h1>
            <div className="lg:pb-2">
              <p className="text-[17px] leading-relaxed text-white/85">
                Car care and remapping at your home or work, 7am to midnight. The price is agreed before we start.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                <EnquiryButton className="min-h-[56px] px-8 text-[16px]" />
                <WhatsAppLink plain className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-white underline-offset-4 hover:underline" />
              </div>
            </div>
          </div>

          {/* Two clear routes in, so Performance isn't an afterthought */}
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:gap-5">
            {routes.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  className="group grid h-full grid-cols-[7.5rem_minmax(0,1fr)] overflow-hidden rounded-xl bg-[#4f2a40] ring-1 ring-white/10 transition-colors hover:bg-[#57304a] sm:grid-cols-[10rem_minmax(0,1fr)]"
                >
                  <span className="relative block min-h-[9rem]">
                    <Photo photo={r.photo} sizes="(min-width: 640px) 20rem, 15rem" className="photo-grade" />
                  </span>
                  <span className="flex flex-col justify-center gap-1 p-5 sm:p-6">
                    <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-plate">{r.eyebrow}</span>
                    <span className="text-[21px] font-semibold leading-tight tracking-[-0.01em] sm:text-[23px]">{r.title}</span>
                    <span className="text-[14px] leading-snug text-white/75">{r.text}</span>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-[15px] font-semibold text-white">
                      {r.cta} <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
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
