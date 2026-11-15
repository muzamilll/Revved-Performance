import { services } from "./services";
import { Service } from "../types";

// Performance: ECU and gearbox remapping. Prices come from data/services.ts, the one price list,
// so the home page, the Performance page and the booking form always agree.

export function formatServicePrice(service: Service, suffix = ""): string {
  if (!service.price) return "By enquiry";
  return `${service.price.from ? "From " : ""}£${service.price.amount}${suffix}`;
}

const EACH = new Set(["remap-add-ons"]);

// Every remap service on the site, in order (emissions add-ons are switched off in services.ts)
export const remapServices = services.filter((s) => s.status === "active" && s.category === "ecu-remapping");

export const remapJobs = remapServices.map((s) => ({
  id: s.slug,
  name: s.name,
  price: formatServicePrice(s, EACH.has(s.slug) ? " each" : ""),
  description: s.shortDescription ?? "",
  includes: s.includedItems ?? undefined,
}));

// The four headline prices shown on the home page
const homeItems: { slug: string; label: string; note: string }[] = [
  { slug: "stage-1-remap", label: "Stage 1 (OBD)", note: "Through the diagnostic port" },
  { slug: "stage-1-remap-bench", label: "Stage 1 (bench)", note: "ECU removed and programmed" },
  { slug: "stage-2-remap", label: "Stage 2", note: "For cars with upgraded parts" },
  { slug: "dsg-gearbox-remap", label: "Gearbox (DSG)", note: "Shifts matched to the remap" },
];

export const performancePrices = homeItems.flatMap((item) => {
  const service = remapServices.find((s) => s.slug === item.slug);
  if (!service) return [];
  return [{ ...item, name: service.name, price: formatServicePrice(service) }];
});

export const performanceTrust: { title: string; text: string }[] = [
  {
    title: "A file written for your car",
    text: "Custom files from Top Gear Tuning, matched to your engine.",
  },
  {
    title: "Checked before and after",
    text: "A health check before we touch the ECU, and again when we finish.",
  },
  {
    title: "Lifetime software warranty",
    text: "On every remap. Terms and conditions apply.",
  },
];
