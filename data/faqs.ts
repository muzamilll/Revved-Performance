import { FAQ } from "../types";

// Home page questions. Kept to what Revved has confirmed; the parts
// warranty and the street parking answer are added when Rayyan supplies them.
export const faqs: FAQ[] = [
  {
    id: "full-price",
    group: "booking",
    question: "Is the price I see the full price?",
    answer: "Prices shown without \"from\" are fixed. Where it says \"from\", your price depends on your car and is agreed before we start.",
  },
  {
    id: "request-is-not-booking",
    group: "booking",
    question: "What happens after I request a booking?",
    answer: "Your request opens in WhatsApp. Press Send, and we reply with the price for your car and a time that suits you.",
  },
  {
    id: "when-to-pay",
    group: "booking",
    question: "When do I pay?",
    answer: "Usually when the job is done. If parts need ordering for your car, we agree that with you on WhatsApp first, including any deposit.",
  },
  {
    id: "talk-to-someone",
    group: "booking",
    question: "Can I just talk to someone?",
    answer: "Yes. Ask on WhatsApp or call 07999 200655, 7am to midnight. You don't need to fill anything in.",
  },
  {
    id: "warranty",
    group: "work",
    question: "What warranty do I get?",
    answer: "New batteries come with a 3-year warranty. Every remap comes with a lifetime software warranty; terms and conditions apply.",
  },
  {
    id: "driveway",
    group: "work",
    question: "Do I need a driveway?",
    answer: "Let us know when you book whether the car is on a driveway, in a private car park or on the street.",
  },
];
