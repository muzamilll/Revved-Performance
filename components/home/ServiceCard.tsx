import * as React from "react";
import Link from "next/link";
import { Service } from "../../types";
import { Card, Badge } from "../ui/ui-primitives";
import { ServicePrice } from "../ui/ServicePrice";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { site } from "../../data/site";
import { EmissionsDisclaimer } from "../services/EmissionsDisclaimer";

interface ServiceCardProps {
  service: Service;
}

// Service card on the existing /services page. Its button opens the enquiry with this service selected.
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="h-full flex flex-col bg-background border border-thin overflow-hidden relative p-6 md:p-8">
      {service.emissionsRelated && (
        <Badge className="self-start mb-3">Enquiry only</Badge>
      )}
      <h3 className="text-xl font-bold text-white mb-2 tracking-[-0.01em]">{service.name}</h3>

      <p className="text-muted text-sm mb-6 flex-1">
        {service.shortDescription}
      </p>

      {service.includedItems && service.includedItems.length > 0 && (
        <ul className="space-y-3 mb-8">
          {service.includedItems.slice(0, 4).map((item, i) => (
            <li key={i} className="flex items-start text-sm text-muted">
              <span className="text-accent-light mr-3 font-bold" aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {service.emissionsRelated && (
        <EmissionsDisclaimer text={site.deleteServiceDisclaimer} className="-mt-4 mb-8" />
      )}

      <div className="flex flex-col gap-4 mt-auto pt-6 border-t border-white/10">
        <ServicePrice service={service} amountClassName="text-3xl md:text-4xl font-bold text-plate" />
        <EnquiryButton choice={service.slug} aria-label={`Get a quote for ${service.name}`} className="w-full">
          Get a quote
        </EnquiryButton>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex min-h-[44px] items-center justify-center text-sm font-semibold text-white underline underline-offset-4 hover:text-plate"
        >
          Full details
        </Link>
      </div>
    </Card>
  );
}
