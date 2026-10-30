import { SiteData } from "../types";

export const site: SiteData = {
  name: "Revved Performance",
  baseTown: "Romford",
  // Shown as text wherever the number appears, written exactly as on the Google Business Profile
  phoneDisplay: "07999 200655",
  // Opening hours, kept identical to the Google Business Profile
  openingHours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:00", closes: "21:00" },
  serviceAreaSummary: "East London & Essex",
  homeTitle: "Mobile ECU Remapping Romford, East London & Essex | Revved Performance",
  homeDescription: "Mobile ECU remapping, DPF and diagnostics in Romford, East London & Essex. We come to you. Custom Top Gear Tuning files, health check before and after, and a lifetime software warranty.",
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
