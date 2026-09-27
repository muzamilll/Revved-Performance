import { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "../../../data/services";
import { offers } from "../../../data/offers";
import { home } from "../../../data/home";
import { getVisibleOffers } from "../../../lib/offers";
import { getPhoneUrl } from "../../../lib/whatsapp";
import { absoluteUrl, getSiteUrl } from "../../../lib/seo";
import { site } from "../../../data/site";
import { Container, Section, SectionHeading } from "../../../components/layout/layout-primitives";
import { Badge } from "../../../components/ui/ui-primitives";
import { ServicePrice, PriceOptionLabel, getLaunchPrice } from "../../../components/ui/ServicePrice";
import { WhatsAppButton } from "../../../components/ui/WhatsAppButton";
import { VehicleLookup } from "../../../components/home/VehicleLookup";
import { OfferCard } from "../../../components/home/OfferCard";
import { Accordion } from "../../../components/ui/Accordion";
import { TrackView } from "../../../components/analytics/TrackView";
import { Breadcrumbs } from "../../../components/ui/Breadcrumbs";
import { EmissionsDisclaimer } from "../../../components/services/EmissionsDisclaimer";

export async function generateStaticParams() {
  return services
    .filter((s) => s.status === "active")
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams.slug && s.status === "active");
  if (!service) return {};

  const isIndexable = Boolean(service.indexable && service.seoTitle && service.seoDescription);

  return {
    title: service.seoTitle || `${service.name} | Revved Automotive`,
    description: service.seoDescription || service.shortDescription || "",
    robots: {
      index: isIndexable,
      follow: true,
    },
    alternates: {
      canonical: absoluteUrl(`/services/${service.slug}`)
    }
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams.slug && s.status === "active");
  
  if (!service) {
    notFound();
  }

  const relatedOffers = getVisibleOffers(offers, services).filter(o => o.serviceSlugs.includes(service.slug));

  const launchPrice = getLaunchPrice(service);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "provider": {
      "@type": "AutomotiveBusiness",
      "name": site.name,
      "telephone": process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447999200655",
      "url": getSiteUrl()
    },
    "areaServed": site.baseTown,
    "description": service.seoDescription || service.shortDescription || undefined,
    ...(service.price && !service.price.from ? {
      "offers": {
        "@type": "Offer",
        "price": launchPrice ?? service.price.amount,
        "priceCurrency": "GBP"
      }
    } : {})
  };

  return (
    <>
      <TrackView event="service_view" properties={{ service: service.slug }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Mobile First Hero: Title, Plain English, Price, WhatsApp button (no scroll) */}
      <Section className="pt-6 pb-12 border-b border-thin relative overflow-hidden bg-surface/10">
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none flex items-center justify-center">
          <svg viewBox="0 0 1000 300" className="w-full min-w-[1000px] h-auto stroke-accent fill-none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,250 C200,250 300,220 400,180 C500,140 600,100 750,80 C850,66 950,50 1000,20" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        <Container className="relative z-10 max-w-3xl">
          <Breadcrumbs items={[
            { label: "Services", href: "/services" },
            { label: service.name, href: `/services/${service.slug}` }
          ]} />
          
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 uppercase tracking-wide leading-tight">
            {service.name}
          </h1>

          {/* 1. Plain English / Short Description */}
          {(service.plainEnglish || service.shortDescription) && (
            <p className="text-lg md:text-xl text-silver mb-6 font-medium leading-relaxed">
              {service.plainEnglish || service.shortDescription}
            </p>
          )}

          {/* 2. Price */}
          <div className="mb-6 p-4 rounded-xl border border-thin bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <ServicePrice service={service} />
            </div>
            
            {/* WhatsApp CTA directly in hero for Meta ads */}
            <WhatsAppButton 
              className="w-full sm:w-auto text-lg h-12"
              message={service.whatsappMessage || `Hi Revved, I'd like a quote for ${service.name}.`}
            />
          </div>

          {/* Price Options if available */}
          {service.priceOptions && service.priceOptions.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-8">
              {service.priceOptions.map((opt, i) => (
                <Badge key={i} className="bg-surface border-thin">
                  <PriceOptionLabel option={opt} />
                </Badge>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* 3. What's Included */}
      {service.includedItems && service.includedItems.length > 0 && (
        <Section className="py-12 border-b border-thin bg-surface/30">
          <Container className="max-w-3xl">
            <h2 className="text-2xl font-heading font-bold text-white mb-6 uppercase">What&apos;s included</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.includedItems.map((item, i) => (
                <li key={i} className="flex items-start text-silver">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-accent text-xs font-bold">✓</span>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            {service.emissionsRelated && (
              <EmissionsDisclaimer text={site.deleteServiceDisclaimer} className="mt-6 text-xs" />
            )}
          </Container>
        </Section>
      )}

      {/* 4. Live Offers */}
      {relatedOffers.length > 0 && (
        <Section className="py-12 border-b border-thin">
          <Container className="max-w-4xl">
             <SectionHeading eyebrow="Savings" title="Available Offers & Bundles" />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {relatedOffers.map(offer => (
                 <OfferCard key={offer.id} offer={offer} services={services} />
               ))}
             </div>
          </Container>
        </Section>
      )}

      {/* 5. Is my car suitable? */}
      <Section className="py-16 border-b border-thin glow-plum bg-surface/10">
        <Container className="max-w-3xl text-center">
          <h2 className="text-2xl font-heading font-bold text-white mb-4 uppercase">Is my car suitable?</h2>
          <p className="text-silver mb-8">Enter your registration to check if we can perform this service on your specific engine.</p>
          <VehicleLookup />
        </Container>
      </Section>

      {/* 6. Technical Detail (Accordion) */}
      {service.technicalDetail && (
        <Section className="py-12 border-b border-thin">
          <Container className="max-w-3xl">
            <Accordion title="Technical Details (For Enthusiasts)" className="border-t" trackingEvent="service_details_open">
               <div className="prose prose-invert max-w-none text-silver py-4 leading-relaxed">
                 {service.technicalDetail}
               </div>
            </Accordion>
          </Container>
        </Section>
      )}

      {/* 7. What happens next */}
      <Section className="py-16 border-b border-thin bg-surface/20">
        <Container className="max-w-4xl">
          <SectionHeading title="What happens next" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {home.howItWorks.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center text-accent font-bold">
                  {item.step}
                </div>
                <p className="text-lg text-silver pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <Section className="py-16 border-b border-thin">
          <Container className="max-w-3xl">
            <SectionHeading title={`FAQs: ${service.name}`} />
            <div className="divide-y divide-thin border-y border-thin">
              {service.faqs.map((faq, i) => (
                <Accordion key={i} title={faq.question}>
                  <p className="py-4 text-silver">{faq.answer}</p>
                </Accordion>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 9. Final WhatsApp CTA */}
      <Section className="py-24">
        <Container className="max-w-2xl text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Book this service</h2>
          <p className="text-silver mb-8 text-lg">Send us your registration and we&apos;ll confirm the exact price and availability.</p>
          <div className="flex justify-center">
            <WhatsAppButton 
              className="w-full sm:w-auto h-14 px-8 text-lg"
              message={service.whatsappMessage || `Hi Revved, I'd like a quote for ${service.name}.`}
            />
          </div>
          <div className="mt-6">
            <a href={getPhoneUrl()} className="text-silver hover:text-white underline underline-offset-4">
              Or call us to discuss your vehicle
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
