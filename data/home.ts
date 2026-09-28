import { HomeData } from "../types";
import { warranty } from "./warranty";

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
    { title: "Custom tuning files", description: "Made for your car by Top Gear Tuning." },
    { title: "Lifetime software warranty", description: "For as long as you own the car." },
    { title: "Talk to us directly on WhatsApp", description: "Speak directly to the tuner, not a call centre." }
  ],
  ecuTrust: {
    eyebrow: "Tuning, done properly",
    title: "Why your ECU is safe with us",
    intro: "A remap is only as good as the file, the tools and the care behind it. Here's what comes with every ECU tune.",
    items: [
      { id: "file", title: "Custom tuning file", description: "Written for your exact car and engine by Top Gear Tuning. We're a verified dealer." },
      { id: "tool", title: "Professional tuning tool", description: "We read and write your ECU with the Alientech KESS3, a professional-grade programming tool." },
      { id: "power", title: "ECU-protected power", description: "A mains-powered battery support unit keeps your car's voltage steady while we work on it, so a weak battery can't interrupt the tune." },
      { id: "health", title: "Health check before & after", description: "We scan for faults and check live engine data before we tune, then again after. You know the car's healthy both times." },
      { id: "warranty", title: "Lifetime software warranty", description: warranty.summary, note: warranty.termsNote }
    ]
  },
  newToTuning: null
};
