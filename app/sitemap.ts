import { MetadataRoute } from "next";
import { services } from "../data/services";
import { careCategories } from "../data/care";
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

  // Car care category pages
  for (const category of careCategories) {
    routes.push({
      url: absoluteUrl(`/${category.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

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

  return routes;
}
