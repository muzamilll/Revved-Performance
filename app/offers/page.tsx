import { Metadata } from "next";
import Link from "next/link";
import { services } from "../../data/services";
import { offers } from "../../data/offers";
import { getVisibleOffers } from "../../lib/offers";
import { Container, Section } from "../../components/layout/layout-primitives";
import { OfferCard } from "../../components/home/OfferCard";
import { Reveal } from "../../components/ui/Reveal";
import { Breadcrumbs } from "../../components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "ECU Remap Offers & Bundles",
  description: "Current offers and bundles on mobile ECU and gearbox remapping across East London & Essex.",
  alternates: { canonical: "/offers" },
};

export default function OffersPage() {
  const visibleOffers = getVisibleOffers(offers, services);

  return (
    <>
      <Section className="pt-8 pb-16 md:pt-16 md:pb-24 border-b border-border">
        <Container>
          <Reveal>
            <Breadcrumbs items={[{ label: "Offers", href: "/offers" }]} />
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase tracking-wide">
                Special Offers
              </h1>
              <p className="text-xl text-muted">
                Get more value with our bundles and limited offers.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-surface/20 border-b border-border pb-24">
        <Container>
          <Reveal>
            {visibleOffers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
                {visibleOffers.map(offer => (
                  <OfferCard key={offer.id} offer={offer} services={services} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                <p className="text-xl text-muted mb-8">We don&apos;t have any special offers running right now.</p>
                <Link href="/services" className="text-accent-light hover:text-white underline underline-offset-4">
                  View our standard services &rarr;
                </Link>
              </div>
            )}
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
