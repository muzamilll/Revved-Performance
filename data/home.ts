import { HomeData } from "../types";

export const home: HomeData = {
  hero: {
    headline: "MOBILE AUTOMOTIVE SERVICE. PERFORMANCE. DIAGNOSTICS.",
    supportingLine: "Professional automotive services brought to your home or workplace across East London & Essex.",
    primaryCta: "GET A QUOTE",
    secondaryCta: "WHATSAPP REVVED",
    labels: ["ECU Remapping", "Diagnostics", "Mobile Automotive Services"],
  },
  explainer: {
    heading: "MORE THAN A REMAP. WE VERIFY THE CAR BEFORE AND AFTER.",
    text: [
      "We don't just flash the ECU and send you on your way.",
      "Before your remap, we check the vehicle for faults and review key engine data to make sure it is suitable for tuning."
    ]
  },
  howItWorks: [
    { step: 1, text: "Message us your reg." },
    { step: 2, text: "We check your car and confirm the service and price." },
    { step: 3, text: "We come to you at your home or workplace." }
  ],
  whyRevved: [
    { title: "We come to you", description: "Convenient mobile service at your location." },
    { title: "Health check before any tuning", description: "Issues are identified before tuning." },
    { title: "Talk to us directly on WhatsApp", description: "Speak directly to the tuner, not a call centre." }
  ],
  newToTuning: null
};
