export type Price = { amount: number; from?: boolean } | null; // null = price on request

export type Service = {
  slug: string;
  name: string;
  category: "ecu-remapping" | "diagnostics";
  status: "active" | "draft";
  indexable: boolean;
  price: Price;
  launchPrice: number | null;       // shown while the launch offer is active; null = no discount
  priceOptions?: { label: string; amount: number; launchPrice?: number | null }[];
  shortDescription: string | null;
  plainEnglish: string | null;      // for beginners
  technicalDetail: string | null;   // for enthusiasts, shown on demand
  includedItems: string[] | null;
  emissionsRelated?: boolean;       // shows site.deleteServiceDisclaimer and an "Enquiry only" badge
  warranty?: boolean;               // covered by the Lifetime Software Warranty (links to the terms)
  faqs: { question: string; answer: string }[];
  seoTitle: string | null;
  seoDescription: string | null;
  whatsappMessage: string | null;
};

export type Offer = {
  id: string;
  slug: string;
  status: "active" | "draft";
  indexable: boolean;
  kind: "included" | "bundle" | "discount";
  title: string;
  tagline: string | null;
  description: string | null;
  serviceSlugs: string[];
  includes: string[];
  price: Price;                       // bundle price
  discount: { type: "amount" | "percent"; value: number } | null;
  startDate: string | null;           // ISO date
  endDate: string | null;             // ISO date
  showCountdown: boolean;
  featured: boolean;
  terms: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  whatsappMessage: string | null;
};

export type Location = {
  slug: string;
  name: string;
};

export type Problem = {
  id: string;
  label: string;
  recommendedServiceSlug: string | null;
  whatsappMessage: string | null;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  group: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number; // 1 to 5
  text: string;
  source: "google" | "facebook" | "direct";
  date: string | null;
  url: string | null;
};

export type TrustItem = {
  id: string;
  label: string;
  logoSrc: string | null;
  alt: string | null;
  verified: boolean;
};

export type HomeData = {
  hero: {
    headline: string;
    supportingLine: string;
    primaryCta: string;
    secondaryCta: string;
    labels: string[];
  };
  explainer: {
    heading: string;
    text: string[];
  };
  howItWorks: { step: number; text: string }[];
  whyRevved: { title: string; description: string }[];
  ecuTrust: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { id: "file" | "tool" | "power" | "health" | "warranty"; title: string; description: string; note?: string }[];
  };
  newToTuning: {
    explainer: string | null;
    glossary: { term: string; definition: string }[] | null;
  } | null;
};

export type SiteData = {
  name: string;
  baseTown: string;
  serviceAreaSummary: string;
  homeTitle: string;
  homeDescription: string;
  deleteServiceDisclaimer: string;
  company: {
    legalName: string;
    number: string;
    registeredIn: string;
    registeredOffice: string;
  };
  social: {
    instagram: string;   // full profile URL; empty = shown but not clickable yet
    facebook: string;
    email: string;
  };
};

export type AboutData = {
  heading: string;
  body: string;
  personName: string | null;
  role: string | null;
  photo: { src: string; alt: string } | null;
} | null;
