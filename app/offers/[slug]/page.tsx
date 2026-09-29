import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { offers } from "../../../data/offers";
import { services } from "../../../data/services";
import { getOfferSavings, isOfferLive } from "../../../lib/offers";
import { Container, Section } from "../../../components/layout/layout-primitives";
import { PriceTag, Badge, Card } from "../../../components/ui/ui-primitives";
import { WhatsAppButton } from "../../../components/ui/WhatsAppButton";
import { VehicleLookup } from "../../../components/home/VehicleLookup";
import { TrackView } from "../../../components/analytics/TrackView";
import { Breadcrumbs } from "../../../components/ui/Breadcrumbs";
import { Countdown } from "../../../components/ui/Countdown";

export async function generateStaticParams() {
  return offers
    .filter((o) => o.status === "active")
    .map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const offer = offers.find((o) => o.slug === resolvedParams.slug && o.status === "active");
  if (!offer) return {};

  const isIndexable = Boolean(offer.indexable && offer.seoTitle && offer.seoDescription);

  return {
    title: offer.seoTitle || offer.title,
    description: offer.seoDescription || offer.description || "",
    robots: {
      index: isIndexable,
      follow: true,
    },
    alternates: {
      canonical: `/offers/${offer.slug}`
    }
  };
}

export default async function OfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const offer = offers.find((o) => o.slug === resolvedParams.slug && o.status === "active");
  
  if (!offer || !isOfferLive(offer)) {
    notFound();
  }

  const savings = getOfferSavings(offer, services);
  
  const showCountdown = offer.showCountdown && offer.endDate && new Date(offer.endDate).getTime() > new Date().getTime();

  return (
    <>
      <TrackView event="offer_view" properties={{ offer: offer.slug }} />

      {/* 1. Mobile First Hero */}
      <Section className="pt-6 pb-12 border-b border-border relative overflow-hidden bg-surface/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

        <Container className="relative z-10 max-w-3xl">
          <Breadcrumbs items={[
            { label: "Offers", href: "/offers" },
            { label: offer.title, href: `/offers/${offer.slug}` }
          ]} />
          
          <div className="flex flex-wrap gap-3 mb-6">
            <Badge className="bg-accent text-white border-transparent">Limited Offer</Badge>
            {savings && (
              <Badge className="bg-surface border-accent text-accent-light">Save £{savings}</Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 uppercase tracking-wide leading-tight">
            {offer.title}
          </h1>

          {offer.tagline && (
            <p className="text-xl text-accent-light mb-4 font-medium">
              {offer.tagline}
            </p>
          )}

          {offer.description && (
            <p className="text-lg text-muted mb-8 leading-relaxed">
              {offer.description}
            </p>
          )}

          <div className="mb-8 p-4 rounded-xl border border-thin bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold uppercase tracking-wider text-muted mb-1">Bundle Price</div>
              <PriceTag price={offer.price} />
            </div>
            
            <WhatsAppButton 
              className="w-full sm:w-auto text-lg h-12"
              message={offer.whatsappMessage || `Hi Revved, I'm interested in the ${offer.title} offer.`}
            />
          </div>

          {showCountdown && (
            <div className="mt-8">
              <div className="text-sm font-bold uppercase tracking-wider text-white mb-2">Offer ends in:</div>
              <Countdown endDateStr={offer.endDate!} />
            </div>
          )}
        </Container>
      </Section>

      {/* 2. What's Included */}
      <Section className="py-16 border-b border-border bg-surface/20">
        <Container className="max-w-4xl">
          <h2 className="text-2xl font-heading font-bold text-white mb-8 uppercase">What&apos;s included in this offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
               <h3 className="text-lg font-bold text-white mb-4">Included Items</h3>
               <ul className="space-y-3">
                 {offer.includes.map((item, i) => (
                   <li key={i} className="flex items-start text-muted">
                     <span className="text-accent-light mr-3 mt-1 font-bold">✓</span>
                     {item}
                   </li>
                 ))}
               </ul>
            </div>
            
            <div>
               <h3 className="text-lg font-bold text-white mb-4">Applicable Services</h3>
               <div className="space-y-4">
                 {offer.serviceSlugs.map(slug => {
                   const service = services.find(s => s.slug === slug);
                   if (!service) return null;
                   return (
                     <Card key={slug} className="p-4 bg-surface border-thin/50">
                       <h4 className="font-bold text-white">{service.name}</h4>
                       <p className="text-sm text-muted mt-1">{service.shortDescription}</p>
                       {service.indexable && (
                         <Link href={`/services/${service.slug}`} className="text-accent-light text-sm mt-2 inline-block hover:underline">
                           View service details &rarr;
                         </Link>
                       )}
                     </Card>
                   );
                 })}
               </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Is my car suitable? */}
      <Section className="py-16 border-b border-border glow-plum bg-surface/10">
        <Container className="max-w-3xl text-center">
          <h2 className="text-2xl font-heading font-bold text-white mb-4 uppercase">Check availability</h2>
          <p className="text-muted mb-8">Enter your registration to check if this offer applies to your vehicle.</p>
          <VehicleLookup />
        </Container>
      </Section>

      {/* 4. Terms */}
      {offer.terms && (
        <Section className="py-12 border-b border-border bg-surface/30">
          <Container className="max-w-3xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Terms & Conditions</h3>
            <div className="prose prose-sm prose-invert text-muted">
              <p>{offer.terms}</p>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
