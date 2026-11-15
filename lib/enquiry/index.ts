import { careCategories } from "../../data/care";
import { offers } from "../../data/offers";
import { remapJobs } from "../../data/performance";
import { formatOfferPrice, getOffersForDisplay } from "../offers";
import { normaliseReg } from "../vehicle";

// Everything that can be booked. Built on the server (the root layout) and handed to the
// booking form as a prop. Any button on the site opens the form with its job added;
// the customer can add as many more jobs as they like.
export type EnquiryChoice = {
  id: string;
  label: string;
  messageLabel?: string;   // wording used in the WhatsApp message when it differs from the label
  group: string;
  price: string;           // short price shown next to the job in the form
  basis: string;           // pricing basis shown on the review step: a published price, never a personalised one
  note?: string;
  track: { service?: string; offer?: string };
};

export const NOT_SURE_ID = "not-sure";

export function getEnquiryChoices(): EnquiryChoice[] {
  const care: EnquiryChoice[] = careCategories.flatMap((category) =>
    category.jobs.map((job) => ({
      id: job.id,
      label: job.name,
      group: category.name,
      price: job.price,
      basis: job.basis,
      track: { service: job.id },
    }))
  );

  const performance: EnquiryChoice[] = remapJobs.map((job) => ({
    id: job.id,
    label: job.name,
    group: "Performance",
    price: job.price,
    basis: job.price.startsWith("From") ? `${job.price}. The exact price depends on your car.` : `${job.price}.`,
    note: job.note,
    track: { service: job.id },
  }));

  const offerChoices: EnquiryChoice[] = getOffersForDisplay(offers).map((o) => ({
    id: `offer-${o.slug}`,
    label: o.title,
    group: "Offers",
    price: formatOfferPrice(o),
    basis: o.eligibility ? `${formatOfferPrice(o)}. ${o.eligibility}` : `${formatOfferPrice(o)}.`,
    track: { offer: o.slug },
  }));

  return [
    ...care,
    ...performance,
    ...offerChoices,
    {
      id: NOT_SURE_ID,
      label: "Not sure. I'll describe the problem",
      messageLabel: "Not sure yet (see notes)",
      group: "Something else",
      price: "",
      basis: "Describe what's happening in the notes and we'll recommend the right job and its price.",
      track: {},
    },
  ];
}

export type EnquiryTiming = "asap" | "today" | "tomorrow" | "date" | "quote";

export const TIMING_OPTIONS: { id: EnquiryTiming; label: string }[] = [
  { id: "asap", label: "ASAP" },
  { id: "today", label: "Today" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "date", label: "Pick a date" },
  { id: "quote", label: "Just a price" },
];

export type EnquiryValues = {
  choiceIds: string[];     // every job in the booking, in the order added
  reg: string;
  postcode: string;
  timing: EnquiryTiming | "";
  date: string;            // yyyy-mm-dd, used when timing is "date"
  notes: string;
};

export const EMPTY_ENQUIRY: EnquiryValues = {
  choiceIds: [],
  reg: "",
  postcode: "",
  timing: "",
  date: "",
  notes: "",
};

// "2026-11-20" -> "Friday 20 November"
export function formatEnquiryDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

export function describeTiming(values: Pick<EnquiryValues, "timing" | "date">): string {
  switch (values.timing) {
    case "asap": return "As soon as possible";
    case "today": return "Today";
    case "tomorrow": return "Tomorrow";
    case "date": return values.date ? formatEnquiryDate(values.date) : "A specific date";
    case "quote": return "Just a price for now";
    default: return "";
  }
}

// "ab12cde" -> "AB12 CDE" for current-format plates; anything else is just upper-cased
export function formatReg(reg: string): string {
  const norm = normaliseReg(reg);
  return /^[A-Z]{2}[0-9]{2}[A-Z]{3}$/.test(norm) ? `${norm.slice(0, 4)} ${norm.slice(4)}` : norm;
}

// "rm13ab" -> "RM1 3AB"
export function formatPostcode(postcode: string): string {
  const norm = postcode.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return norm.length >= 5 ? `${norm.slice(0, -3)} ${norm.slice(-3)}` : norm;
}

// Loose check: a full postcode ("RM1 3AB") or just the first half ("RM1")
export function isPlausiblePostcode(postcode: string): boolean {
  const norm = postcode.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return /^[A-Z]{1,2}[0-9][A-Z0-9]?([0-9][A-Z]{2})?$/.test(norm);
}

// The readable request that is prefilled in WhatsApp. The customer presses Send there.
export function buildEnquiryMessage(values: EnquiryValues, selected: EnquiryChoice[]): string {
  const quoteOnly = values.timing === "quote";
  const names = selected.map((c) => c.messageLabel ?? c.label);
  const lines = [quoteOnly ? "Hi Revved, I'd like a price." : "Hi Revved, I'd like to book a visit.", ""];
  if (names.length === 1) lines.push(`Job: ${names[0]}`);
  else lines.push("Jobs:", ...names.map((n) => `- ${n}`));
  lines.push(
    `Registration: ${formatReg(values.reg)}`,
    `Postcode: ${formatPostcode(values.postcode)}`,
    `When: ${describeTiming(values)}`,
  );
  const notes = values.notes.trim();
  if (notes) lines.push(`Notes: ${notes}`);
  return lines.join("\n");
}
