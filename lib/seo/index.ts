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
