// Recent work: real job photos and customer reviews, shown as one strip that keeps sliding.
// Reviews: the customer's own words and first name only. No review platform is named.
//
// Until the real material arrives, preview builds show SAMPLE items (stock photos and
// placeholder reviews, marked "Sample"), so the strip can be judged. The live site never
// shows samples: with no real items the section is left off.

export type WorkPhoto = { kind: "photo"; src: string; alt: string; job: string; town: string };
export type WorkReview = { kind: "review"; quote: string; firstName: string; job: string };
export type WorkItem = WorkPhoto | WorkReview;

// Real items go here, newest first, mixing photos and reviews in the order they should appear.
export const workItems: WorkItem[] = [];

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=1125&q=80`;

export const sampleWorkItems: WorkItem[] = [
  { kind: "photo", src: u("photo-1597766321604-9de3ff9e93e2"), alt: "Jump leads over an engine bay", job: "Battery fitted", town: "Romford" },
  { kind: "review", quote: "Sample review: the customer's own words about the job go here, kept short.", firstName: "First name", job: "Battery" },
  { kind: "photo", src: u("photo-1642075223291-f9ec545889fa"), alt: "Old oil draining from a filter", job: "Major service", town: "Ilford" },
  { kind: "photo", src: u("photo-1760317890314-e964ffd7e6a6"), alt: "A brake disc and caliper", job: "Front pads", town: "Barking" },
  { kind: "review", quote: "Sample review: a second customer, a different job, a different town.", firstName: "First name", job: "Stage 1 remap" },
  { kind: "photo", src: "/images/hero-r8.webp", alt: "An Audi R8 on a road at sunset", job: "Stage 1 remap", town: "Chigwell" },
  { kind: "photo", src: u("photo-1659576048262-940d9c1c84fe"), alt: "A laptop reading a car's fault codes", job: "Diagnostics", town: "Stratford" },
  { kind: "review", quote: "Sample review: a third one, so the strip has a few to cycle through.", firstName: "First name", job: "Pre-purchase inspection" },
];
