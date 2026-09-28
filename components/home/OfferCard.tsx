import * as React from "react";
import { Offer, Service } from "../../types";
import { Card, PriceTag, Badge } from "../ui/ui-primitives";
import { getOfferSavings } from "../../lib/offers";
import { TrackedLink } from "../analytics/TrackedLink";

interface OfferCardProps {
  offer: Offer;
  services: Service[];
}

export function OfferCard({ offer, services }: OfferCardProps) {
  const savings = getOfferSavings(offer, services);

  return (
    <TrackedLink href={`/offers/${offer.slug}`} className="block group h-full" event="offer_click" properties={{ offer: offer.slug }}>
      <Card className="h-full flex flex-col transition-all group-hover:border-accent/50 group-hover:glow-plum relative overflow-hidden bg-surface">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 blur-3xl rounded-full"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <Badge className="bg-accent/20 text-accent-light border-accent/30">Limited Offer</Badge>
            {savings && (
              <span className="text-sm font-bold text-accent-light">Save £{savings}</span>
            )}
          </div>
          
          <h3 className="text-2xl font-heading font-bold text-white mb-2">{offer.title}</h3>
          
          {offer.tagline && (
            <p className="text-lg text-white mb-4 font-medium">{offer.tagline}</p>
          )}
          
          <ul className="space-y-2 mb-8 flex-1">
            {offer.includes.map((item, i) => (
              <li key={i} className="flex items-start text-sm text-muted">
                <span className="text-accent-light mr-2 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
          
          <div className="flex items-end justify-between mt-auto pt-6 border-t border-thin/50">
            <PriceTag price={offer.price} />
            <span className="text-sm font-medium text-accent-light">View details &rarr;</span>
          </div>
        </div>
      </Card>
    </TrackedLink>
  );
}
