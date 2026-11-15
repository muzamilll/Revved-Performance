import { CareCategory } from "../types";

// Everyday car care: the four categories and their published prices (redesign brief, section 9).
// Each category has a landing page at /<slug>. Each job id is also an enquiry choice.
// Still to come from Rayyan: battery prices by type, the 90-minute postcodes,
// the parts and labour warranty, and the street parking answer. Nothing here claims them.

const PAY_ON_THE_DAY = {
  question: "When do I pay?",
  answer: "On the day, when the job is done. Nothing is paid online.",
};

const WHERE_IS_IT_DONE = {
  question: "Where is the work done?",
  answer: "At your home or workplace across East London & Essex. Let us know whether the car is on a driveway, in a private car park or on the street.",
};

export const careCategories: CareCategory[] = [
  {
    slug: "batteries",
    name: "Batteries",
    cardSummary: "Replacement, testing and help when your car won't start.",
    cardPrice: "Replacement from £99 fitted",
    cardPriceNote: "3-year warranty",
    primaryJobId: "battery-replacement",
    heroTitle: "A new car battery, fitted at your door.",
    heroIntro: "We bring the battery to your home or work and fit it there. Battery call-outs run day and night.",
    heroPrice: "From £99 fitted",
    heroPriceNote: "3-year warranty. Battery call-outs day and night.",
    jobsHeading: "Battery jobs and prices",
    jobs: [
      {
        id: "battery-replacement",
        name: "Battery replacement",
        price: "From £99 fitted",
        basis: "From £99 fitted, with a 3-year warranty. The exact price depends on the battery your car takes.",
        description: "A new battery supplied and fitted, with a 3-year warranty. Battery registration is included if your car needs it.",
      },
      {
        id: "emergency-jump-start",
        name: "Emergency jump-start",
        price: "£45",
        basis: "£45.",
        description: "For a car that won't start because the battery is flat.",
      },
      {
        id: "battery-health-check",
        name: "Battery health check",
        price: "£20",
        basis: "£20.",
        description: "A test of the battery's condition, so you know whether it needs replacing.",
      },
      {
        id: "alternator-check",
        name: "Alternator and charging-system check",
        price: "£35",
        basis: "£35.",
        description: "Checks that the car is charging its battery properly.",
      },
      {
        id: "battery-registration",
        name: "Battery registration and BMS reset",
        price: "£25",
        basis: "£25.",
        description: "Registers a new battery with the car's battery management system.",
      },
      {
        id: "starting-system-diagnosis",
        name: "Starting-system diagnosis",
        price: "£40",
        basis: "£40.",
        description: "For a car that won't start when the cause isn't clear.",
      },
    ],
    faqs: [
      {
        question: "How much is a new battery?",
        answer: "From £99 fitted. The exact price depends on the battery your car takes, and you'll know it before we come out.",
      },
      {
        question: "What warranty comes with a new battery?",
        answer: "A 3-year warranty.",
      },
      {
        question: "Does my car need battery registration?",
        answer: "Some cars need a new battery registered to the car. If yours does, it is included in your price.",
      },
      {
        question: "Can you come out at night?",
        answer: "Yes. Battery call-outs run day and night. Send your postcode and we'll tell you how soon we can be there.",
      },
      PAY_ON_THE_DAY,
    ],
    seoTitle: "Mobile Car Battery Replacement, East London & Essex",
    seoDescription: "Car battery replacement at your home or work across East London & Essex. From £99 fitted with a 3-year warranty. Battery call-outs day and night.",
  },
  {
    slug: "servicing",
    name: "Servicing",
    cardSummary: "Minor and major servicing at your home or work.",
    cardPrice: "Labour from £50 plus parts",
    cardPriceNote: "Parts priced for your car",
    primaryJobId: "minor-service",
    heroTitle: "Your car serviced where it's parked.",
    heroIntro: "A minor or major service at your home or work across East London & Essex, 7am to midnight.",
    heroPrice: "Labour from £50 plus parts",
    heroPriceNote: "Parts depend on your car. Major service £70 plus parts.",
    jobsHeading: "Service options and prices",
    jobs: [
      {
        id: "minor-service",
        name: "Minor service",
        price: "Labour £50 plus parts",
        basis: "Labour £50 plus parts for your car.",
        description: "The regular service between major ones.",
        includes: ["Oil and oil filter", "Safety check", "Fluid top-ups", "Service light reset"],
      },
      {
        id: "major-service",
        name: "Major service",
        price: "Labour £70 plus parts",
        basis: "Labour £70 plus parts for your car.",
        description: "Everything in a minor service, plus the items below.",
        includes: ["Air filter", "Cabin pollen filter", "Spark plugs", "Washer fluid"],
      },
    ],
    faqs: [
      {
        question: "Is the labour price the full price?",
        answer: "No. Labour is £50 for a minor service and £70 for a major service. Parts depend on your car, and you'll know the full price before we come out.",
      },
      {
        question: "Minor or major: which do I need?",
        answer: "A major service includes everything in a minor service and adds the air filter, cabin pollen filter, spark plugs and washer fluid. If you're not sure, tell us when the car was last serviced in your request.",
      },
      WHERE_IS_IT_DONE,
      PAY_ON_THE_DAY,
    ],
    seoTitle: "Mobile Car Servicing, East London & Essex",
    seoDescription: "Minor and major car servicing at your home or work across East London & Essex. Labour from £50 plus parts, full price agreed before you book.",
  },
  {
    slug: "brakes",
    name: "Brakes",
    cardSummary: "Brake pad replacement at your location.",
    cardPrice: "Labour £100 plus parts",
    cardPriceNote: "Pads priced for your car",
    primaryJobId: "brake-pads",
    heroTitle: "Brake pads replaced at your door.",
    heroIntro: "New brake pads fitted at your home or work across East London & Essex, 7am to midnight.",
    heroPrice: "Labour £100 plus parts",
    heroPriceNote: "Pads are priced for your car.",
    jobsHeading: "Brake work and prices",
    jobs: [
      {
        id: "brake-pads",
        name: "Brake pads",
        price: "Labour £100 plus parts",
        basis: "Labour £100 plus parts for your car.",
        description: "New brake pads supplied and fitted where the car is parked.",
      },
    ],
    faqs: [
      {
        question: "Is £100 the full price?",
        answer: "No. £100 is the labour. The pads are priced for your car, and you'll know the full price before we come out.",
      },
      {
        question: "What should I tell you about my brakes?",
        answer: "Add what you've noticed to the notes, such as a noise, a warning light or a change in the pedal. It helps us confirm the right work for your car.",
      },
      WHERE_IS_IT_DONE,
      PAY_ON_THE_DAY,
    ],
    seoTitle: "Mobile Brake Pad Replacement, East London & Essex",
    seoDescription: "Brake pads replaced at your home or work across East London & Essex. Labour £100 plus parts, full price agreed before you book.",
  },
  {
    slug: "diagnostics",
    name: "Diagnostics",
    cardSummary: "Health checks, warning lights and checks before you buy or MOT.",
    cardPrice: "Checks from £65",
    cardPriceNote: "Fixed prices",
    primaryJobId: "vehicle-diagnostics",
    heroLabel: "Diagnostic checks",
    heroTitle: "Find out what your car is telling you.",
    heroIntro: "Diagnostic checks at your home or work across East London & Essex. We scan the car and explain what we find.",
    heroPrice: "Checks from £65",
    heroPriceNote: "Each check has a fixed price, listed below.",
    jobsHeading: "Checks and prices",
    jobs: [
      {
        id: "vehicle-diagnostics",
        name: "Full vehicle health check",
        price: "£75",
        basis: "£75.",
        description: "A full diagnostic scan and health check. Warning light on, or want to know the car is healthy? We find out and explain what we find.",
      },
      {
        id: "pre-purchase-inspection",
        name: "Pre-purchase inspection",
        price: "£99",
        basis: "£99.",
        description: "Buying a used car? We meet you at the seller's, scan the car for faults and check it over before you hand over any money.",
      },
      {
        id: "pre-mot-check",
        name: "Pre-MOT check",
        price: "£65",
        basis: "£65.",
        description: "A diagnostic check before the MOT, so warning lights and faults are found before the test, not at it.",
      },
    ],
    faqs: [
      {
        question: "My engine management light is on. Can you help?",
        answer: "Yes. We read the fault codes, check the live data and tell you what's likely causing the light before anything is replaced.",
      },
      {
        question: "Can you meet me at a seller's address?",
        answer: "Yes, anywhere in our area. Give the seller's postcode in your request and tell us when you're viewing the car.",
      },
      {
        question: "Is the pre-MOT check an MOT?",
        answer: "No. It's a diagnostic check before your MOT. The MOT itself must be done at an approved test centre.",
      },
      PAY_ON_THE_DAY,
    ],
    seoTitle: "Mobile Car Diagnostics, East London & Essex",
    seoDescription: "Mobile car diagnostics at your home or work across East London & Essex. Full health check £75, pre-purchase inspection £99, pre-MOT check £65.",
  },
];

export function getCareCategory(slug: string): CareCategory | undefined {
  return careCategories.find((c) => c.slug === slug);
}

// Shown on the home page and on every category page
export const howItWorks: { title: string; text: string }[] = [
  {
    title: "Tell us the job",
    text: "Pick the job and add your registration and postcode. It takes about a minute.",
  },
  {
    title: "We reply on WhatsApp",
    text: "With the price for your car and a time that suits you.",
  },
  {
    title: "We come to you",
    text: "At your home or work, 7am to midnight. You pay on the day, when the job is done.",
  },
];
