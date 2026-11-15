import { Offer, Service } from "../../types";
import { isPreviewBuild } from "../env";

export function isOfferLive(offer: Offer, today: Date = new Date()): boolean {
  if (offer.status !== "active") return false;
  
  const now = today.getTime();
  
  if (offer.startDate) {
    const start = new Date(offer.startDate).getTime();
    if (now < start) return false;
  }
  
  if (offer.endDate) {
    const end = new Date(offer.endDate).getTime();
    // End date is usually inclusive, so we can consider it up to the end of that day.
    // Assuming endDate is an ISO string like "2024-12-31".
    if (now > end) return false;
  }
  
  return true;
}

export function getVisibleOffers(offers: Offer[], services: Service[], today: Date = new Date()): Offer[] {
  return offers.filter(offer => {
    if (!isOfferLive(offer, today)) return false;
    
    // Check if all included services are active
    const includedServices = services.filter(s => offer.serviceSlugs.includes(s.slug));
    
    // If we didn't find all services, or any is not active, hide the offer
    if (includedServices.length !== offer.serviceSlugs.length) return false;
    if (includedServices.some(s => s.status !== "active")) return false;
    
    return true;
  });
}

export function getOfferSavings(offer: Offer, services: Service[]): number | null {
  if (!offer.price || offer.price.from) return null; // Offer must have a fixed price
  
  const includedServices = services.filter(s => offer.serviceSlugs.includes(s.slug));
  if (includedServices.length !== offer.serviceSlugs.length) return null;
  
  let totalFixedPrice = 0;
  for (const s of includedServices) {
    if (!s.price || s.price.from) return null; // All services must have fixed prices
    totalFixedPrice += s.price.amount;
  }
  
  const savings = totalFixedPrice - offer.price.amount;
  return savings > 0 ? savings : null;
}

// Offers for the Offers page and the enquiry: active offers everywhere, plus
// "preview" proposals on preview builds only (never on the live site).
export function getOffersForDisplay(offers: Offer[], today: Date = new Date()): Offer[] {
  const preview = isPreviewBuild();
  return offers.filter(offer => {
    if (offer.status === "preview") return preview;
    return isOfferLive(offer, today);
  });
}

export function formatOfferPrice(offer: Offer): string {
  if (!offer.price) return "Price on request";
  return `${offer.price.from ? "From " : ""}£${offer.price.amount}`;
}
