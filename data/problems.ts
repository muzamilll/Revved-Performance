import { Problem } from "../types";

export const problems: Problem[] = [
  {
    id: "loss-of-power",
    label: "Loss of power",
    recommendedServiceSlug: "vehicle-diagnostics",
    whatsappMessage: "Hi Revved, I'm experiencing a loss of power. I'd like to book a diagnostic check."
  },
  {
    id: "warning-light",
    label: "Warning light on",
    recommendedServiceSlug: "vehicle-diagnostics",
    whatsappMessage: "Hi Revved, I have a warning light on my dashboard. I'd like to book a diagnostic check."
  },
  {
    id: "poor-fuel-economy",
    label: "Poor fuel economy",
    recommendedServiceSlug: "vehicle-diagnostics",
    whatsappMessage: "Hi Revved, I'm getting poor fuel economy. I'd like to book a diagnostic check."
  },
  {
    id: "strange-noise",
    label: "Strange noise",
    recommendedServiceSlug: "vehicle-diagnostics",
    whatsappMessage: "Hi Revved, my car is making a strange noise. I'd like to book a diagnostic check."
  },
  {
    id: "starting-issue",
    label: "Starting issue",
    recommendedServiceSlug: "vehicle-diagnostics",
    whatsappMessage: "Hi Revved, I'm having issues starting my car. I'd like to book a diagnostic check."
  },
  {
    id: "want-more-performance",
    label: "Want more performance",
    recommendedServiceSlug: "stage-1-remap",
    whatsappMessage: "Hi Revved, I'm looking for more performance from my car. I'd like a quote for a remap."
  },
  {
    id: "not-sure",
    label: "Not sure",
    recommendedServiceSlug: "vehicle-diagnostics",
    whatsappMessage: "Hi Revved, I'm having some issues with my car but I'm not sure what's wrong. I'd like to book a diagnostic check."
  }
];
