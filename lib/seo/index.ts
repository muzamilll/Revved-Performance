import { Service, Offer } from "../../types";

// Explicit env var wins; otherwise use Vercel's production domain (set automatically
// on Vercel builds, and switches to the custom domain once one is attached).
export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    "https://www.revvedautomotive.co.uk";
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
