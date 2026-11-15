import { SiteData } from "../types";

export const site: SiteData = {
  name: "Revved Performance",
  baseTown: "Romford",
  // Shown as text wherever the number appears, written exactly as on the Google Business Profile
  phoneDisplay: "07999 200655",
  // Opening hours, kept identical to the Google Business Profile
  openingHours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:00", closes: "21:00" },
  // Hours as written in page copy (redesign brief). The structured openingHours above still
  // mirrors the Google Business Profile; update both together when the profile changes.
  hoursDisplay: "7am to midnight",
  serviceAreaSummary: "East London & Essex",
  homeTitle: "Mobile Car Batteries, Servicing & Remapping, East London & Essex | Revved Performance",
  homeDescription: "We come to you. Car batteries, servicing, brakes and diagnostics at your home or work across East London & Essex, 7am to midnight. ECU remapping by a Top Gear Tuning agent.",
  deleteServiceDisclaimer: "This modification may affect your vehicle's road-legality, insurance, or warranty. It's your responsibility to check before going ahead — get advice if you're unsure.",
  // Required disclosure for a limited company (Companies Act trading disclosures)
  company: {
    legalName: "Revved Performance Ltd",
    number: "17481621",
    registeredIn: "England & Wales",
    registeredOffice: "5 Broadway Chambers, 1 Cranbrook Road, Ilford, England, IG1 4DU"
  },
  social: {
    instagram: "https://www.instagram.com/revved_performance",
    facebook: "https://www.facebook.com/share/1CFUqmHgYo/",
    email: "info@revved.uk"
  }
};
