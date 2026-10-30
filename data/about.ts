import { AboutData } from "../types";

// Brand-first About copy. heading: "\n" marks the line break in the big heading.
export const about: AboutData = {
  heading: "Your car, tuned properly.\nAt your door.",
  personName: null,
  role: null,
  photo: null,
  body: [
    "Revved Performance is a mobile tuning and diagnostics company based in Romford, covering East London and Essex. We bring the kit to your driveway or workplace, so there's no garage waiting room and no lost day.",
    "Getting a car tuned shouldn't feel like a gamble. That's why every job starts with a health check, so we never tune a car with an existing fault, and ends with a before-and-after comparison so you can see exactly what changed.",
    "Every remap file is custom-written for your car by Top Gear Tuning, and we're one of their authorised agents. Your original software is saved before we touch anything, every remap is covered by our Lifetime Software Warranty, and you get a fixed price on WhatsApp before we book.",
    "No overselling. No jargon. Just more from the car you already own."
  ].join("\n")
};
