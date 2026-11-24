import { Service, Offer } from "../../types";

// The live domain. Every canonical URL, the sitemap and robots.txt use it, so preview
// deployments and the *.vercel.app address all point Google at revvedperformance.uk.
// NEXT_PUBLIC_SITE_URL can override it (e.g. for local testing).
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://revvedperformance.uk";
  return url.replace(/\/+$/, "");
}

export function absoluteUrl(path: string): string {
  const url = getSiteUrl();
  return `${url}${path}`;
}

export function isItemIndexable(item: Service | Offer): boolean {
  if (item.status !== "active") return false;
  if (!item.indexable) return false;
  if (!item.seoTitle || !item.seoDescription) return false;
  return true;
}

// Where Revved works: anywhere within 20 miles of Ilford (structured data)
export function areaServedLd() {
  return {
    "@type": "GeoCircle",
    "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 51.559, "longitude": 0.0741 },
    "geoRadius": 32187,
    "description": "Within 20 miles of Ilford, East London and Essex",
  };
}
