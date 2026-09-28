import * as React from "react";
import { Service } from "../../types";
import { launchOffer } from "../../data/launch-offer";
import { cn } from "../../lib/utils";

// Launch pricing only shows while the offer is switched on and slots remain.
export function isLaunchOfferRunning(): boolean {
  return launchOffer.active && launchOffer.slotsRemaining > 0;
}

export function getLaunchPrice(service: Service): number | null {
  if (!isLaunchOfferRunning() || !service.price) return null;
  return service.launchPrice;
}

export function LaunchSlots({ className }: { className?: string }) {
  if (!isLaunchOfferRunning()) return null;
  return (
    <p className={cn("text-xs font-bold uppercase tracking-widest text-accent-light", className)}>
      {launchOffer.slotsRemaining} of {launchOffer.slotsTotal} launch slots left
    </p>
  );
}

interface ServicePriceProps {
  service: Service;
  className?: string;
  amountClassName?: string;
}

export function ServicePrice({ service, className, amountClassName }: ServicePriceProps) {
  const { price } = service;
  const launchPrice = getLaunchPrice(service);

  if (!price) {
    return <div className={cn("text-xl md:text-2xl font-heading font-bold text-white", className)}>Price on request</div>;
  }

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {launchPrice !== null && (
        <span className="text-[10px] font-bold uppercase tracking-widest text-accent-light">{launchOffer.label}</span>
      )}
      <div className="flex items-baseline gap-3 flex-wrap">
        {price.from && <span className="text-xs uppercase tracking-widest text-muted">From</span>}
        {launchPrice !== null && (
          <s className="text-lg md:text-xl font-heading font-bold text-muted">£{price.amount}</s>
        )}
        <span className={cn("text-xl md:text-2xl font-heading font-bold text-white", amountClassName)}>
          £{launchPrice ?? price.amount}
        </span>
      </div>
    </div>
  );
}

interface PriceOptionProps {
  option: { label: string; amount: number; launchPrice?: number | null };
}

export function PriceOptionLabel({ option }: PriceOptionProps) {
  const launchPrice = isLaunchOfferRunning() ? option.launchPrice ?? null : null;
  return (
    <>
      {option.label}:{" "}
      {launchPrice !== null ? (
        <>
          <s className="text-muted">£{option.amount}</s> £{launchPrice}
        </>
      ) : (
        <>£{option.amount}</>
      )}
    </>
  );
}
