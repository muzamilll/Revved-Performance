import { CareCategory } from "../types";

// Everyday car care: the four categories and their published prices.
// Prices follow the Revved price sheet (Google Sheet on info@revved.uk, 22 Nov 2026).
// Rayyan's rule: never say "labour" or "plus parts" to customers; show a discreet "from".
// Each category has a landing page at /<slug>. Each job id is also an enquiry choice.
// Still to come from Rayyan: battery prices by type, the 90-minute postcodes,
// the parts and labour warranty, and the street parking answer. Nothing here claims them.

const PAY_ON_THE_DAY = {
  question: "When do I pay?",
  answer: "On the day, when the job is done.",
};

const WHERE_IS_IT_DONE = {
  question: "Where is the work done?",
  answer: "At your home or workplace across East London & Essex. Let us know whether the car is on a driveway, in a private car park or on the street.",
};

export const careCategories: CareCategory[] = [
  {
    slug: "batteries",
    trustLine: ["24/7 call-outs", "3-year battery warranty", "Registered to your car on the spot"],
    name: "Batteries",
    cardSummary: "Fitting, testing and help when your car won't start.",
    cardPrice: "Fitting from £99",
    cardPriceNote: "3-year warranty, free car checks",
    primaryJobId: "battery-replacement",
    heroTitle: "A new car battery, fitted at your door.",
    heroIntro: "We bring the battery to your home or work and fit it there. Battery call-outs run day and night.",
    heroPrice: "From £99",
    heroPriceNote: "The battery is priced for your car. 3-year warranty, plus free checks on charging, coolant, tyres, lights and wipers.",
    jobsHeading: "Battery jobs and prices",
    jobs: [
      {
        id: "battery-replacement",
        name: "Battery fitting",
        price: "From £99",
        basis: "From £99. The battery is priced for your car and agreed before we start. 3-year warranty.",
        description: "A new battery supplied and fitted at your door, with a 3-year warranty. We check the rest of the car over for free while we're there.",
        includes: [
          "Free charging-system check",
          "Free coolant and antifreeze check",
          "Free tyre tread and pressure check",
          "Free lights and wipers check",
          "Free screenwash top-up",
        ],
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
        price: "£40",
        basis: "£40.",
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
        answer: "Fitting is from £99, and the battery is priced for your car. You'll know the full price before we start.",
      },
      {
        question: "What warranty comes with a new battery?",
        answer: "A 3-year warranty.",
      },
      {
        question: "Does my car need battery registration?",
        answer: "Some cars need a new battery registered to the car. If yours does, registration and BMS reset is £40, and we'll tell you before we start.",
      },
      {
        question: "Can you come out at night?",
        answer: "Yes. Battery call-outs run day and night. Send your postcode and we'll tell you how soon we can be there.",
      },
      PAY_ON_THE_DAY,
    ],
    seoTitle: "Mobile Car Battery Replacement, East London & Essex",
    seoDescription: "Car battery fitting at your home or work across East London & Essex, from £99 with a 3-year warranty. Battery call-outs day and night.",
  },
  {
    slug: "servicing",
    trustLine: ["Done on your driveway", "Service light reset included", "Price confirmed before we start"],
    name: "Servicing",
    cardSummary: "Minor and major servicing and DPF cleaning at your home or work.",
    cardPrice: "From £50",
    cardPriceNote: "Minor and major services, plus DPF",
    primaryJobId: "minor-service",
    heroTitle: "Your car serviced where it's parked.",
    heroIntro: "A minor or major service, or a DPF clean, at your home or work across East London & Essex, 7am to midnight.",
    heroPrice: "From £50",
    heroPriceNote: "Your price depends on your car and is agreed before we start.",
    jobsHeading: "Service options and prices",
    jobs: [
      {
        id: "minor-service",
        name: "Minor service",
        price: "From £50",
        basis: "From £50. Your price depends on your car and is agreed before we start.",
        description: "The regular service between major ones.",
        includes: ["Oil and oil filter change", "Safety check", "Fluid top-ups", "Service light reset"],
      },
      {
        id: "major-service",
        name: "Major service",
        price: "From £70",
        basis: "From £70. Your price depends on your car and is agreed before we start.",
        description: "Everything in a minor service, plus the items below.",
        includes: ["Everything in a minor service", "Engine air filter", "Cabin pollen filter", "Spark plugs", "Washer fluid top-up"],
      },
      {
        id: "dpf-service",
        name: "DPF service",
        price: "£120",
        basis: "£120.",
        description: "For a diesel with a DPF warning light or a blocked particulate filter. We clean it and run a forced regeneration where it's parked.",
        includes: [
          "DPF diagnostics",
          "Soot and filter check",
          "Clean and forced regeneration",
          "Sensor checks",
          "Adaptations reset",
          "Road test",
        ],
      },
    ],
    faqs: [
      {
        question: "How much will my service cost?",
        answer: "A minor service is from £50 and a major service from £70. Your price depends on your car and is agreed before we start.",
      },
      {
        question: "Minor or major: which do I need?",
        answer: "A major service includes everything in a minor service and adds the engine air filter, cabin pollen filter, spark plugs and a washer fluid top-up. If you're not sure, tell us when the car was last serviced in your request.",
      },
      WHERE_IS_IT_DONE,
      PAY_ON_THE_DAY,
    ],
    seoTitle: "Mobile Car Servicing and DPF Cleaning, East London & Essex",
    seoDescription: "Minor and major car servicing from £50 and DPF cleaning at your home or work across East London & Essex. Price agreed before we start.",
  },
  {
    slug: "brakes",
    trustLine: ["Fitted where the car is parked", "Safety check after every job", "Price confirmed before we start"],
    name: "Brakes",
    cardSummary: "Brake pad replacement at your location.",
    cardPrice: "From £100",
    cardPriceNote: "Fitted where the car is parked",
    primaryJobId: "brake-pads",
    heroTitle: "Brake pads replaced at your door.",
    heroIntro: "New brake pads fitted at your home or work across East London & Essex, 7am to midnight.",
    heroPrice: "From £100",
    heroPriceNote: "Your price depends on your car and is agreed before we start.",
    jobsHeading: "Brake work and prices",
    jobs: [
      {
        id: "brake-pads",
        name: "Brake pads",
        price: "From £100",
        basis: "From £100. Your price depends on your car and is agreed before we start.",
        description: "New brake pads supplied and fitted where the car is parked.",
      },
    ],
    faqs: [
      {
        question: "How much are new brake pads?",
        answer: "From £100. Your price depends on your car and is agreed before we start.",
      },
      {
        question: "What should I tell you about my brakes?",
        answer: "Add what you've noticed to the notes, such as a noise, a warning light or a change in the pedal. It helps us confirm the right work for your car.",
      },
      WHERE_IS_IT_DONE,
      PAY_ON_THE_DAY,
    ],
    seoTitle: "Mobile Brake Pad Replacement, East London & Essex",
    seoDescription: "Brake pads replaced at your home or work across East London & Essex, from £100. Price agreed before we start.",
  },
  {
    slug: "diagnostics",
    trustLine: ["Warning lights read where the car is", "Pre-purchase checks at the seller's", "Explained in plain English"],
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
