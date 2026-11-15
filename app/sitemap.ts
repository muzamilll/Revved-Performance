import { MetadataRoute } from "next";
import { careCategories } from "../data/care";
import { absoluteUrl } from "../lib/seo";

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

  // Performance (all remaps)
  routes.push({
    url: absoluteUrl("/performance"),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  // Offers list
  routes.push({
    url: absoluteUrl("/offers"),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  });

  return routes;
}
