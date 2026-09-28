// Lifetime Software Warranty: short customer-facing copy. Full terms live on /terms.
export const warranty = {
  name: "Lifetime Software Warranty",
  includedItem: "Lifetime software warranty",
  summary: "For as long as you own the car, if our tune causes a software issue, we'll fix or reinstall it free.",
  termsNote: "Terms & conditions apply.",
};

// Shared FAQs for ECU / TCU remap services
export const remapFaqs = [
  {
    question: "Can a remap damage my ECU?",
    answer: "The main risk when writing an ECU is the power dropping part-way through. When we tune through the diagnostic port, a mains-powered battery support unit keeps the power steady throughout; bench jobs run on a stable bench supply. We use the Alientech KESS3 and save your original software before we start. We also check the car first, so we never tune a car with existing problems.",
  },
  {
    question: "What if something goes wrong after my remap?",
    answer: "Every remap comes with our Lifetime Software Warranty. For as long as you own the car, if an issue is caused by our tune, email info@revved.uk and we'll correct or reinstall the software free. Dealer updates or another tuner changing the software end the cover, so let your garage know the car is remapped.",
  },
  {
    question: "Can you put my car back to standard?",
    answer: "Yes. We keep a copy of your original ECU file, so it can be restored.",
  },
  {
    question: "What equipment do you use?",
    answer: "An Alientech KESS3 for reading and writing, a GYS DIAG-BATIUM 100.12 FV mains-powered battery support unit, and diagnostic tools for the health checks before and after. Tuning files are custom-made for your car by Top Gear Tuning.",
  },
];
