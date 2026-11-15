import { FAQ } from "../types";

// Home page questions. Kept to what Revved has confirmed; the parts and labour
// warranty and the street parking answer are added when Rayyan supplies them.
export const faqs: FAQ[] = [
  {
    id: "full-price",
    group: "booking",
    question: "Is the price I see the full price?",
    answer: "Fixed prices are shown as fixed. Labour prices exclude parts, and you'll know the full price for your car before we come out.",
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
    answer: "On the day, when the job is done. Nothing is paid online.",
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
