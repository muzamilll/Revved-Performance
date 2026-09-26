import { MetadataRoute } from "next";
import { services } from "../data/services";
import { offers } from "../data/offers";
import { getVisibleOffers } from "../lib/offers";
import { absoluteUrl, isItemIndexable } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Home
  routes.push({
    url: absoluteUrl(""),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  });

  // Services list
  routes.push({
    url: absoluteUrl("/services"),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  });

  // Offers list
  routes.push({
    url: absoluteUrl("/offers"),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  });

  // Individual services
  const activeServices = services.filter(s => s.status === "active");
  for (const service of activeServices) {
    if (isItemIndexable(service)) {
      routes.push({
        url: absoluteUrl(`/services/${service.slug}`),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Individual offers
  const visibleOffers = getVisibleOffers(offers, activeServices);
  for (const offer of visibleOffers) {
    if (isItemIndexable(offer)) {
      routes.push({
        url: absoluteUrl(`/offers/${offer.slug}`),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return routes;
}
