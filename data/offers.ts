import { Offer } from "../types";

export const offers: Offer[] = [
  {
    id: "remap-launch-offer",
    slug: "remap-launch-offer",
    status: "active",
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
      "Full pre-remap vehicle health check"
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
    indexable: false,
    kind: "bundle",
    title: "ECU + TCU Stage 1 Bundle",
    tagline: "Engine and gearbox tuned together.",
    description: "A Stage 1 engine remap plus a DSG / gearbox remap in one visit, so the gearbox is set up to handle the extra torque.",
    serviceSlugs: [
      "stage-1-remap",
      "dsg-gearbox-remap"
    ],
    includes: [
      "Stage 1 ECU remap",
      "DSG / gearbox (TCU) remap",
      "Vehicle health check",
      "Before/after comparison"
    ],
    price: { amount: 325, from: true },
    discount: null,
    startDate: null,
    endDate: null,
    showCountdown: false,
    featured: true,
    terms: "Vehicle eligibility applies. We confirm the exact price once we've checked your registration.",
    seoTitle: null,
    seoDescription: null,
    whatsappMessage: "Hi Revved, I'm interested in the ECU + TCU Stage 1 Bundle."
  }
];
