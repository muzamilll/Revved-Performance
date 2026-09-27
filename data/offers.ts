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
    featured: true,
    terms: null,
    seoTitle: null,
    seoDescription: null,
    whatsappMessage: null
  }
];
