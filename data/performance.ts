import { services } from "./services";
import { Service } from "../types";

// The Performance section on the home page. Prices come from data/services.ts, so they
// can't drift from the service pages.
type PerformanceItem = { slug: string; label: string; note: string; suffix?: string };

const items: PerformanceItem[] = [
  { slug: "stage-1-remap", label: "Stage 1 (OBD)", note: "Through the diagnostic port" },
  { slug: "stage-1-remap-bench", label: "Stage 1 (bench)", note: "ECU removed from the car" },
  { slug: "stage-2-remap", label: "Stage 2", note: "For cars with hardware upgrades" },
  { slug: "dsg-gearbox-remap", label: "Gearbox (DSG / TCU)", note: "Shifts matched to the remap" },
  { slug: "remap-add-ons", label: "Remap add-ons", note: "Priced per add-on", suffix: " each" },
  { slug: "emissions-add-ons", label: "Emissions add-ons", note: "Off-road use · by enquiry", suffix: " each" },
];

export function formatServicePrice(service: Service, suffix = ""): string {
  if (!service.price) return "By enquiry";
  return `${service.price.from ? "From " : ""}£${service.price.amount}${suffix}`;
}

export const performancePrices = items.flatMap((item) => {
  const service = services.find((s) => s.slug === item.slug && s.status === "active");
  if (!service) return [];
  return [{ ...item, name: service.name, price: formatServicePrice(service, item.suffix) }];
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

export const emissionsDisclaimer =
  "Emissions add-ons may affect your vehicle's road legality, insurance or warranty. It is your responsibility to check before going ahead.";
