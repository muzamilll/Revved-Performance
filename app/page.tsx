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
import { HeroScene } from "../components/sections/HeroScene";
import { RouteIcon } from "../components/sections/RouteIcon";
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
    title: "Servicing, brakes, batteries",
    text: "And diagnostics. Done where it\u2019s parked.",
    icon: "care" as const,
  },
  {
    href: "#performance",
    eyebrow: "Performance",
    title: "Stage 1 remaps from £250",
    text: "Engine + gearbox together saves £71.",
    icon: "performance" as const,
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

      {/* Opening: the promise on the left, the service story playing on the right.
          The two routes in sit on the light band right underneath, so the plum stays to one screen. */}
      <section className="relative isolate overflow-hidden bg-plum text-white">
        <Container className="pt-8 pb-10 sm:pt-12 lg:pt-14 lg:pb-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)] lg:items-center lg:gap-14">
            <div>
              <p className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
                <span className="rounded-sm bg-plate px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">{site.hoursDisplay}</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">{site.serviceAreaSummary}</span>
              </p>
              <h1 className="mt-5">
                <span className="block font-display text-[clamp(3.4rem,15vw,6.4rem)] uppercase leading-[0.9] tracking-[0.005em]">
                  We come<br />to you.
                </span>
                <span className="mt-2.5 block font-accent text-[clamp(1.6rem,6vw,2.5rem)] italic leading-[1.1] text-white">
                  You get on with your day.
                </span>
              </h1>
              <p className="mt-4 max-w-[30rem] text-[17px] leading-relaxed text-white/85">
                Servicing, brakes, batteries and remaps at your home or work. Price and time agreed before we start.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <EnquiryButton className="min-h-[56px] px-8 text-[16px]" />
                <WhatsAppLink plain className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-white underline-offset-4 hover:underline" />
              </div>
            </div>
            <HeroScene />
          </div>
        </Container>
      </section>

      {/* Two clear routes in, on the light band */}
      <section className="bg-cream">
        <Container className="py-7 md:py-10">
          <ul className="grid gap-3.5 md:grid-cols-2 md:gap-5">
            {routes.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  className="group grid h-full grid-cols-[56px_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-line bg-white px-5 py-5 text-ink transition-[border-color,box-shadow] hover:border-ink hover:shadow-[0_14px_30px_-20px_rgba(0,0,0,0.35)] sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:gap-5 sm:px-6"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-[14px] bg-cream sm:h-16 sm:w-16"><RouteIcon kind={r.icon} /></span>
                  <span>
                    <span className="block text-[11px] font-extrabold uppercase tracking-[0.16em] text-plum">{r.eyebrow}</span>
                    <span className="mt-0.5 block text-[20px] font-bold leading-tight tracking-[-0.01em] sm:text-[21px]">{r.title}</span>
                    <span className="mt-0.5 block text-[14.5px] text-ink-soft">{r.text}</span>
                  </span>
                  <span aria-hidden="true" className="hidden h-11 w-11 place-items-center rounded-full border-[1.5px] border-line transition-colors group-hover:border-plate group-hover:bg-plate sm:grid">
                    <ArrowRight className="h-[18px] w-[18px]" />
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
