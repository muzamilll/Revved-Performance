// Guides (brief section 8, 24 Nov). Each answers something people search when they are about
// to book, and ends with the matching service and a booking button.
// Written in the brief's order. Drafts for Muzamil to edit; facts kept general and checkable,
// nothing Rayyan hasn't confirmed, no made-up figures.

export type GuideSection = {
  heading: string;
  paragraphs?: string[];   // before the list
  list?: string[];
  after?: string[];        // after the list
};

export type Guide = {
  slug: string;
  title: string;
  description: string;          // meta description and the line on the guides list
  category: "Car care" | "Performance";
  published: string;            // yyyy-mm-dd
  readMinutes: number;
  intro: string;
  sections: GuideSection[];
  // The matching service at the end of the guide
  service: { choiceId: string; name: string; price: string; href: string; pitch: string };
};

// Planned, in order, after the three below (brief): remap and insurance, Stage 1 vs Stage 2,
// pre-purchase checklist, minor or major service, how long a battery lasts.

export const guides: Guide[] = [
  {
    slug: "dpf-warning-light",
    title: "DPF warning light: what it means and what to do",
    description: "Why the DPF light comes on in a diesel, what to try first, when to stop driving and get it checked, and how a DPF clean works.",
    category: "Car care",
    published: "2026-11-24",
    readMinutes: 4,
    intro:
      "If you drive a diesel, the DPF light is one of the most common warnings you'll see. It doesn't mean the engine is about to fail, but it does mean the exhaust filter needs attention. Here's what it means and what to do.",
    sections: [
      {
        heading: "What is a DPF?",
        paragraphs: [
          "A diesel particulate filter (DPF) sits in the exhaust of most modern diesel cars and vans. It traps the soot the engine produces so it doesn't come out of the tailpipe.",
          "The filter can only hold so much. To empty it, the car burns the soot off at high temperature. This is called regeneration, and it normally happens on its own during a longer drive at steady speed.",
        ],
      },
      {
        heading: "Why the light comes on",
        paragraphs: [
          "The light means the filter is filling up faster than the car can clear it. The most common reasons are:",
        ],
        list: [
          "Lots of short journeys, so the exhaust never gets hot enough to regenerate",
          "Mostly slow, stop-start town driving",
          "A regeneration that keeps getting interrupted when the engine is switched off",
          "A faulty sensor, or another engine fault that stops regeneration from starting",
        ],
      },
      {
        heading: "What to try first",
        paragraphs: [
          "Check your handbook, because the advice varies by car. Many manufacturers suggest a steady drive at higher speed, for example on a dual carriageway, for around 10 to 15 minutes, so the car can run a regeneration.",
          "If the light goes out afterwards, the filter has cleared. If it comes back often, your driving pattern may not be giving the filter a chance to clean itself, or there may be an underlying fault worth checking.",
        ],
      },
      {
        heading: "When to stop and get it checked",
        list: [
          "The light stays on after a long, steady drive",
          "Other warning lights come on with it, such as the engine management light",
          "The car loses power or goes into limp mode",
          "The light keeps coming back within days",
        ],
        after: [
          "Carrying on driving with a blocked filter can make the problem worse and more expensive to put right. Getting it checked early is usually the cheaper option.",
        ],
      },
      {
        heading: "How a DPF clean works",
        paragraphs: [
          "A DPF service starts with diagnostics, to find out why the filter blocked and whether a sensor or another fault is to blame. Then the filter is cleaned and a forced regeneration is run with diagnostic equipment, sensors are checked, the adaptations are reset and the car is road tested.",
          "We do all of this where the car is parked, at your home or workplace.",
        ],
      },
    ],
    service: {
      choiceId: "dpf-service",
      name: "DPF service",
      price: "£120",
      href: "/servicing#dpf-service",
      pitch: "Diagnostics, clean and forced regeneration, sensor checks and a road test, at your door.",
    },
  },
  {
    slug: "car-wont-start",
    title: "Car won't start: battery, starter or alternator?",
    description: "How to tell whether a car that won't start has a flat battery, a starter motor fault or an alternator problem, and what to do next.",
    category: "Car care",
    published: "2026-11-24",
    readMinutes: 4,
    intro:
      "A car that won't start is almost always one of three things: the battery, the starter motor or the alternator. The signs are different for each, so a few quick checks can tell you a lot before anyone picks up a spanner.",
    sections: [
      {
        heading: "Signs it's the battery",
        list: [
          "The engine turns over slowly, or not at all, when you start it",
          "You hear rapid clicking when you turn the key or press start",
          "The dashboard and interior lights are dim or flicker",
          "It happened on a cold morning, or after the car sat unused for a while",
          "The battery is several years old",
        ],
        after: [
          "If a jump-start gets the car going and it then starts normally for the rest of the day, the battery is the most likely cause.",
        ],
      },
      {
        heading: "Signs it's the starter motor",
        list: [
          "The lights and dashboard come on normally, but the engine doesn't turn",
          "You hear a single click, or nothing at all, when you try to start",
          "There's a grinding or whirring noise when you start the car",
        ],
        after: [
          "A jump-start usually won't help here, because the battery has the power. The problem is getting that power to turn the engine.",
        ],
      },
      {
        heading: "Signs it's the alternator",
        paragraphs: [
          "The alternator charges the battery while you drive. When it fails, the battery slowly runs flat even though it might be fine itself.",
        ],
        list: [
          "The car starts after a jump but goes flat again within a day or two",
          "The battery warning light comes on while you're driving",
          "Lights dim, or electrics act up, while the engine is running",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "If you're stuck, a jump-start is the quickest way to find out whether the battery is the problem. If the car keeps going flat, or doesn't respond to a jump at all, the starting and charging system needs testing so you don't replace a battery you didn't need to.",
          "We test the battery, the charging system and the starter where the car is parked, then tell you what's wrong before anything is replaced.",
        ],
      },
    ],
    service: {
      choiceId: "starting-system-diagnosis",
      name: "Starting-system diagnosis",
      price: "£40",
      href: "/batteries#starting-system-diagnosis",
      pitch: "We find out whether it's the battery, the starter or the alternator, at your door. Need a jump now? Battery call-outs run 24/7.",
    },
  },
  {
    slug: "is-ecu-remapping-safe",
    title: "Is ECU remapping safe for my engine?",
    description: "What decides whether a remap is safe, what the real risks are, and how a careful Stage 1 remap is done.",
    category: "Performance",
    published: "2026-11-24",
    readMinutes: 5,
    intro:
      "It's the first question most people ask about remapping, and it's the right one. The honest answer: a careful remap on a healthy engine is safe, and a careless one on a car with existing problems isn't. Here's what makes the difference.",
    sections: [
      {
        heading: "What a remap changes",
        paragraphs: [
          "Your engine is run by software in its ECU (engine control unit). It decides things like fuel, boost and timing. A remap changes those settings to give more power and torque and sharper response.",
          "Manufacturers often set engines conservatively, so the same engine can be sold in different markets and power levels. A careful Stage 1 remap works within the margins the existing hardware already has. No parts are changed.",
        ],
      },
      {
        heading: "What decides whether it's safe",
        list: [
          "The health of the engine before it's touched. A remap won't fix an existing fault, and can make one worse",
          "The quality of the file. A file written for your engine is very different from a generic one",
          "Staying within what the parts can handle, including the clutch, the gearbox and the turbo",
          "How the car is looked after afterwards: regular servicing and good fuel",
        ],
      },
      {
        heading: "The real risks",
        paragraphs: [
          "More power means more load. Parts can wear faster if the car is driven hard, and on some cars, especially high-torque diesels, an older clutch may start to slip.",
          "Automatic and DSG gearboxes have their own torque limits. That's why a gearbox remap is often done alongside the engine, so the two are matched.",
          "A remap may also affect a manufacturer's warranty, and it must be declared to your insurer. Check both before you go ahead.",
        ],
      },
      {
        heading: "How we do it",
        list: [
          "A health check before we touch the ECU, so we never tune a car with an existing fault",
          "A custom file from Top Gear Tuning, written for your engine",
          "Your original software saved first, so the car can go back to standard",
          "A protected power supply to the ECU while it's being programmed",
          "A second health check when we finish",
          "A lifetime software warranty on every remap (terms and conditions apply)",
        ],
      },
    ],
    service: {
      choiceId: "stage-1-remap",
      name: "Stage 1 remap",
      price: "From £250",
      href: "/performance/stage-1-remap",
      pitch: "Health check before and after, a custom Top Gear Tuning file and a lifetime software warranty, at your door.",
    },
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
