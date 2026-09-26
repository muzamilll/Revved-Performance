import { Service, Offer } from "../../types";

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
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
