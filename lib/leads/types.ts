export const LEAD_STATUSES = ["new", "replied", "quoted", "booked", "done", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const CONTACT_METHODS = ["form", "whatsapp_click", "call_click"] as const;
export type ContactMethod = (typeof CONTACT_METHODS)[number];

export const LEAD_SOURCES = [
  "google",
  "google_ads",
  "instagram",
  "facebook",
  "meta_ads",
  "whatsapp",
  "referral",
  "direct",
  "missed_call",
  "other",
] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export type Lead = {
  id: string;
  createdAt: string; // ISO
  contactMethod: ContactMethod;
  status: LeadStatus;
  source: LeadSource;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  referrer: string | null;
  landingPage: string | null;
  page: string | null;
  service: string | null;
  reg: string | null;
  name: string | null;
  phone: string | null;
  email: string | null;
  message: string | null;
  notes: string | null;
  firstRepliedAt: string | null; // ISO
  isTest: boolean;
};

export type NewLead = Omit<Lead, "id" | "createdAt" | "status" | "notes" | "firstRepliedAt">;

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  replied: "Replied",
  quoted: "Quoted",
  booked: "Booked",
  done: "Done",
  lost: "Lost",
};

export const METHOD_LABELS: Record<ContactMethod, string> = {
  form: "Enquiry form",
  whatsapp_click: "Clicked WhatsApp",
  call_click: "Clicked call",
};

export const SOURCE_LABELS: Record<LeadSource, string> = {
  google: "Google search",
  google_ads: "Google Ads",
  instagram: "Instagram",
  facebook: "Facebook",
  meta_ads: "Meta ads",
  whatsapp: "WhatsApp",
  referral: "Other website",
  direct: "Direct",
  missed_call: "Missed call",
  other: "Other",
};
