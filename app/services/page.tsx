import { Metadata } from "next";
import { services } from "../../data/services";
import { offers } from "../../data/offers";
import { getVisibleOffers } from "../../lib/offers";
import { Container, Section, SectionHeading } from "../../components/layout/layout-primitives";
import { ServiceCard } from "../../components/home/ServiceCard";
import { OfferCard } from "../../components/home/OfferCard";
import { WhatsAppButton } from "../../components/ui/WhatsAppButton";
import { getPhoneUrl } from "../../lib/whatsapp";
import { Reveal } from "../../components/ui/Reveal";
import { Breadcrumbs } from "../../components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Tuning & Diagnostic Services | Revved Automotive",
  description: "Explore our range of mobile ECU remapping, performance tuning, and diagnostic services across East London and Essex.",
};

export default function ServicesPage() {
  const activeServices = services.filter(s => s.status === "active");
  const visibleOffers = getVisibleOffers(offers, services);
  
  const ecuServices = activeServices.filter(s => s.category === "ecu-remapping");
  const diagServices = activeServices.filter(s => s.category === "diagnostics");

  return (
    <>
      <Section className="pt-8 pb-16 md:pt-16 md:pb-24 border-b border-thin">
        <Container>
          <Reveal>
            <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase tracking-wide">
                Our Services
              </h1>
              <p className="text-xl text-silver">
                Professional mobile remapping, calibration, and advanced diagnostics brought directly to you.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-surface/20 border-b border-thin">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Performance" title="ECU Remapping & Tuning" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {ecuServices.map(service => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>

            <SectionHeading eyebrow="Checks" title="Advanced Diagnostics" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diagServices.map(service => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {visibleOffers.length > 0 && (
        <Section className="border-b border-thin bg-surface/30">
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Value" title="Active Offers & Bundles" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleOffers.map(offer => (
                  <OfferCard key={offer.id} offer={offer} services={services} />
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      <Section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none"></div>
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-bold text-white mb-6">Not sure what you need?</h2>
              <p className="text-lg text-silver mb-8">Send us your registration and we will advise you on the best service for your vehicle.</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <WhatsAppButton className="w-full sm:w-auto h-14 px-8 text-lg" message="Hi Revved, I'm not sure which service I need. My registration is ______." />
              </div>
              <div className="mt-6">
                <a href={getPhoneUrl()} className="text-silver hover:text-white underline underline-offset-4">
                  Or call us to discuss your car
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
