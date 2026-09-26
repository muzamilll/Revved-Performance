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
      "Before your remap, we check the vehicle for faults and review key engine data to make sure it is suitable for tuning.",
      "We then record pre-remap performance using DynoDrive and repeat the test after the calibration.",
      "That gives you a clear before-and-after comparison."
    ]
  },
  howItWorks: [
    { step: 1, text: "Message us your reg." },
    { step: 2, text: "We check your car and confirm the service and price." },
    { step: 3, text: "We come to you at your home or workplace." },
    { step: 4, text: "For remaps: pre and post DynoDrive testing so you can see the difference." }
  ],
  whyRevved: [
    { title: "We come to you", description: "Convenient mobile service at your location." },
    { title: "Health check before any tuning", description: "Issues are identified before tuning." },
    { title: "Before-and-after DynoDrive results", description: "See the performance difference for yourself." },
    { title: "Talk to us directly on WhatsApp", description: "Speak directly to the tuner, not a call centre." }
  ],
  newToTuning: null
};
