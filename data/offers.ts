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
    description: "A Stage 1 engine remap and a DSG / gearbox remap together, so the gearbox is re-tuned to match the remapped engine.",
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
    price: { amount: 325, from: false },
    discount: null,
    startDate: null,
    endDate: null,
    showCountdown: false,
    featured: true,
    terms: null,
    seoTitle: "ECU + TCU Stage 1 Remap Bundle",
    seoDescription: "Stage 1 engine remap plus DSG / gearbox remap in one visit for £325. Mobile across East London & Essex.",
    whatsappMessage: "Hi Revved, I'm interested in the ECU + TCU Stage 1 bundle.",
    eligibility: "For cars with a DSG or automatic gearbox Revved can remap. We confirm eligibility from your registration on WhatsApp.",
    // What changes with the bundle. A description of the work, not a test result.
    comparison: [
      { label: "Engine", before: "Factory settings", after: "Stage 1 file written for your engine" },
      { label: "Gearbox", before: "Factory shift points", after: "Re-tuned to match the remapped engine" },
      { label: "Health check", before: "None", after: "Before and after the remap" },
      { label: "Warranty", before: "None", after: "Lifetime software warranty (T&Cs apply)" },
      { label: "Price", before: "£400 booked separately", after: "£325" }
    ],
    note: "Send us your reg and we'll send you the expected gains for your car."
  },
  {
    // PROPOSAL. Preview only until Rayyan agrees: change status to "active" to publish it.
    id: "winter-ready-check",
    slug: "winter-ready-check",
    status: "preview",
    indexable: false,
    kind: "bundle",
    title: "Winter Ready Check",
    tagline: "One visit to get the car ready for the cold.",
    description: null,
    serviceSlugs: [],
    includes: [
      "Battery health and cold-start test",
      "Charging-system check",
      "Coolant and antifreeze strength",
      "Tyre tread and pressures",
      "Lights and wipers check",
      "Winter screenwash top-up",
      "£20 off a new battery fitted on the same visit"
    ],
    price: { amount: 45, from: false },
    discount: null,
    startDate: null,
    endDate: null,
    showCountdown: false,
    featured: false,
    terms: null,
    seoTitle: null,
    seoDescription: null,
    whatsappMessage: "Hi Revved, I'm interested in the Winter Ready Check."
  }
];
