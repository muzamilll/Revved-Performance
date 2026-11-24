import { Offer } from "../types";
import { warranty } from "./warranty";

export const offers: Offer[] = [
  {
    id: "remap-launch-offer",
    slug: "remap-launch-offer",
    // Draft since the redesign: this promise now lives in the Performance section's trust cards
    status: "draft",
    indexable: false,
    kind: "included",
    title: "More than a remap. We verify the car before and after.",
    tagline: null,
    description: null,
    serviceSlugs: [
      "stage-1-remap",
      "stage-1-remap-bench",
      "stage-2-remap",
      "dsg-gearbox-remap",
      "remap-add-ons"
    ],
    includes: [
      "Health check before and after your remap",
      warranty.includedItem
    ],
    price: null,
    discount: null,
    startDate: null,
    endDate: null,
    showCountdown: false,
    featured: false,
    terms: null,
    seoTitle: null,
    seoDescription: null,
    whatsappMessage: null
  },
  {
    id: "ecu-tcu-stage-1-bundle",
    slug: "ecu-tcu-stage-1-bundle",
    status: "active",
    indexable: true,
    kind: "bundle",
    title: "ECU + TCU Stage 1 bundle",
    tagline: "Engine and gearbox remapped in one visit.",
    description: "A Stage 1 engine remap and a DSG / gearbox remap in one visit, so the gearbox is re-tuned to match the engine. Both come with the health check before and after and the lifetime software warranty.",
    serviceSlugs: [
      "stage-1-remap",
      "dsg-gearbox-remap"
    ],
    includes: [
      "Stage 1 ECU remap",
      "DSG / gearbox TCU remap",
      "Health check before and after",
      "Lifetime software warranty (terms and conditions apply)"
    ],
    price: { amount: 329, from: false },
    discount: null,
    startDate: null,
    endDate: null,
    showCountdown: false,
    featured: true,
    terms: null,
    seoTitle: "ECU + TCU Stage 1 Remap Bundle",
    seoDescription: "Stage 1 engine remap plus DSG / gearbox remap in one visit for £329. Mobile across East London & Essex.",
    whatsappMessage: "Hi Revved, I'm interested in the ECU + TCU Stage 1 bundle.",
    eligibility: "For cars with a DSG or automatic gearbox we can remap. Your registration tells us if yours qualifies.",
    // No "booked separately" price or saving until Rayyan decides the bundle (brief, 24 Nov):
    // at current prices Stage 1 OBD (£179) plus a gearbox remap (£150) is also £329.
    note: "Send your reg and we'll send you the expected gains for your car."
  }
];
