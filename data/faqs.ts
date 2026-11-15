import { FAQ } from "../types";

// Home page questions. Kept to what Revved has confirmed; the parts and labour
// warranty and the street parking answer are added when Rayyan supplies them.
export const faqs: FAQ[] = [
  {
    id: "full-price",
    group: "booking",
    question: "Is the price I see the full price?",
    answer: "Fixed prices are shown as fixed. Labour prices exclude parts. We confirm the full price for your car on WhatsApp before you book.",
  },
  {
    id: "request-is-not-booking",
    group: "booking",
    question: "Does sending a request book me in?",
    answer: "No. It tells us what you need and when suits you. Revved confirms your car's compatibility, the price and availability with you on WhatsApp.",
  },
  {
    id: "when-to-pay",
    group: "booking",
    question: "When do I pay?",
    answer: "On the day, when the job is done. Nothing is paid online.",
  },
  {
    id: "talk-to-someone",
    group: "booking",
    question: "Can I just talk to someone?",
    answer: "Yes. Call 07999 200655, 7am to midnight. You don't need to fill anything in.",
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
    answer: "Tell us whether the car is on a driveway, in a private car park or on the street. We confirm whether the location suits the work.",
  },
];
