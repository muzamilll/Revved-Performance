import { Location } from "../types";

// Coverage (brief, 24 Nov): anywhere within 20 miles of Ilford (IG1), Rayyan's rule.
// Towns grouped by region so people find their own; all are within 20 miles in a straight line.
// Further out: ask on WhatsApp.

export const COVERAGE_MILES = 20;
export const BASE = { name: "Ilford", lat: 51.559, lon: 0.0741 };

export const regions: { name: string; towns: string[] }[] = [
  {
    name: "East London",
    towns: ["Barking", "Dagenham", "East Ham", "Beckton", "Stratford", "West Ham", "Leyton", "Leytonstone", "Walthamstow", "Wanstead", "Woodford", "Redbridge", "Hainault", "Chingford", "Bow", "Poplar", "Canary Wharf", "Hackney", "Shoreditch", "Stoke Newington"],
  },
  {
    name: "Romford and Havering",
    towns: ["Romford", "Collier Row", "Gidea Park", "Harold Wood", "Hornchurch", "Elm Park", "Upminster", "Rainham"],
  },
  {
    name: "Essex",
    towns: ["Chigwell", "Buckhurst Hill", "Loughton", "Theydon Bois", "Abridge", "Epping", "Ongar", "Waltham Abbey", "Harlow", "Brentwood", "Shenfield", "Ingatestone", "Billericay", "Basildon", "Wickford", "Grays", "Chafford Hundred", "Lakeside", "Purfleet", "South Ockendon", "Tilbury", "Stanford-le-Hope"],
  },
  {
    name: "North London and Hertfordshire",
    towns: ["Tottenham", "Edmonton", "Enfield", "Wood Green", "Palmers Green", "Southgate", "Barnet", "Islington", "Camden", "Cheshunt", "Hoddesdon", "Hertford", "Ware", "Hatfield", "Potters Bar"],
  },
  {
    name: "Central, South East London and Kent",
    towns: ["City of London", "Westminster", "Greenwich", "Woolwich", "Thamesmead", "Eltham", "Lewisham", "Catford", "Peckham", "Brixton", "Welling", "Bexleyheath", "Erith", "Sidcup", "Bromley", "Orpington", "Croydon", "Dartford", "Bluewater", "Swanley", "Gravesend"],
  },
  {
    name: "West London",
    towns: ["Wembley", "Ealing", "Harrow", "Richmond", "Kingston", "Wimbledon"],
  },
];

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Flat list (structured data, sitemaps)
export const locations: Location[] = [
  { slug: "ilford", name: "Ilford" },
  ...regions.flatMap((r) => r.towns.map((name) => ({ slug: slugify(name), name }))),
];

// Towns shown on the coverage map, placed roughly in their direction from Ilford
// (approximate latitude and longitude; the map converts them to miles)
export const mapTowns: { name: string; lat: number; lon: number; side?: "left" | "right" }[] = [
  { name: "Romford", lat: 51.5768, lon: 0.1801 },
  { name: "Brentwood", lat: 51.6208, lon: 0.305 },
  { name: "Basildon", lat: 51.5761, lon: 0.4886 },
  { name: "Grays", lat: 51.4785, lon: 0.3244 },
  { name: "Dartford", lat: 51.4462, lon: 0.2169, side: "left" },
  { name: "Gravesend", lat: 51.4416, lon: 0.37, side: "right" },
  { name: "Bromley", lat: 51.4059, lon: 0.0144 },
  { name: "Croydon", lat: 51.3762, lon: -0.0982 },
  { name: "Westminster", lat: 51.4975, lon: -0.1357 },
  { name: "Stratford", lat: 51.5413, lon: -0.0036 },
  { name: "Wembley", lat: 51.5588, lon: -0.2817 },
  { name: "Barnet", lat: 51.6531, lon: -0.2004 },
  { name: "Enfield", lat: 51.6523, lon: -0.0807, side: "right" },
  { name: "Hertford", lat: 51.7959, lon: -0.0781 },
  { name: "Harlow", lat: 51.7709, lon: 0.0927 },
  { name: "Epping", lat: 51.6993, lon: 0.1114 },
];
