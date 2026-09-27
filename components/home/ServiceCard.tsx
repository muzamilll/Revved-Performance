"use client";

import * as React from "react";
import { Service } from "../../types";
import { Card, Badge } from "../ui/ui-primitives";
import { ServicePrice } from "../ui/ServicePrice";
import { Modal } from "../ui/Modal";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { Button } from "../ui/Button";
import Link from "next/link";
import { trackEvent } from "../../lib/analytics";
import { site } from "../../data/site";
import { EmissionsDisclaimer } from "../services/EmissionsDisclaimer";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    trackEvent("service_details_open");
    setIsOpen(true);
  };

  return (
    <>
      <div onClick={handleOpen} className="cursor-pointer group h-full">
        <Card className="h-full flex flex-col transition-all bg-background border border-thin/20 hover:border-accent/40 hover:glow-plum overflow-hidden relative p-8">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-accent/10 transition-colors"></div>
          
          {index !== undefined && (
            <div className="text-muted/20 font-heading text-5xl font-extrabold mb-4 group-hover:text-accent/20 transition-colors">
              {String(index).padStart(2, '0')}
            </div>
          )}
          
          {service.emissionsRelated && (
            <Badge className="self-start mb-3">Enquiry only</Badge>
          )}
          <h3 className="text-xl font-heading font-extrabold text-white mb-2 uppercase tracking-wide group-hover:text-accent transition-colors">{service.name}</h3>
          
          <p className="text-muted text-sm mb-6 flex-1">
            {service.shortDescription}
          </p>

          {service.includedItems && service.includedItems.length > 0 && (
            <ul className="space-y-3 mb-8">
              {service.includedItems.slice(0, 4).map((item, i) => (
                <li key={i} className="flex items-start text-xs font-medium text-silver">
                  <span className="text-accent mr-3 font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {service.emissionsRelated && (
            <EmissionsDisclaimer text={site.deleteServiceDisclaimer} className="-mt-4 mb-8" />
          )}

          <div className="flex flex-col gap-4 mt-auto pt-6 border-t border-white/5 relative z-10">
            <ServicePrice service={service} amountClassName="text-3xl md:text-4xl font-extrabold text-accent" />
            <Button className="w-full text-sm h-12 uppercase tracking-widest font-bold bg-accent/10 text-accent hover:bg-accent hover:text-white border border-accent/20">
              Get a Quote &rarr;
            </Button>
          </div>
        </Card>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h3 className="text-3xl font-heading font-extrabold text-white mb-2 uppercase tracking-tight">{service.name}</h3>
        <p className="text-silver mb-8 text-lg">{service.plainEnglish || service.shortDescription}</p>
        
        {service.includedItems && service.includedItems.length > 0 && (
          <div className="mb-8 p-6 bg-surface/30 rounded-xl border border-thin">
            <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Included in service</h4>
            <ul className="space-y-3">
              {service.includedItems.map((item, i) => (
                <li key={i} className="flex items-start text-sm text-silver font-medium">
                  <span className="text-accent mr-3 font-bold text-lg leading-none">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            {service.emissionsRelated && (
              <EmissionsDisclaimer text={site.deleteServiceDisclaimer} className="mt-4" />
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-8 pb-6 border-b border-thin">
          <ServicePrice service={service} />
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => {
              setIsOpen(false);
              document.getElementById("check-my-car")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="uppercase tracking-widest font-bold"
          >
            Check my vehicle
          </Button>
          <WhatsAppButton 
            variant="secondary"
            message={service.whatsappMessage || `Hi Revved, I'd like a quote for ${service.name}.`} 
            className="uppercase tracking-widest font-bold text-sm"
          />
          {service.indexable && (
            <Link href={`/services/${service.slug}`} className="text-center text-xs font-bold text-muted uppercase tracking-widest hover:text-white mt-4 border-b border-muted/30 pb-1 self-center">
              View full service page
            </Link>
          )}
        </div>
      </Modal>
    </>
  );
}
