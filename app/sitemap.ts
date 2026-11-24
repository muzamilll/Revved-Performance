import { MetadataRoute } from "next";
import { careCategories } from "../data/care";
import { remapJobs } from "../data/performance";
import { guides } from "../data/guides";
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

  // One page per job
  for (const category of careCategories) {
    for (const job of category.jobs) {
      routes.push({ url: absoluteUrl(`/${category.slug}/${job.id}`), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
    }
  }
  for (const job of remapJobs.filter((j) => j.indexable)) {
    routes.push({ url: absoluteUrl(`/performance/${job.id}`), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
  }

  // Guides
  for (const guide of guides) {
    routes.push({ url: absoluteUrl(`/guides/${guide.slug}`), lastModified: new Date(guide.published), changeFrequency: "monthly", priority: 0.6 });
  }

  // About, Revved for business and the guides list
  for (const path of ["/about", "/business", "/guides"]) {
    routes.push({ url: absoluteUrl(path), lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 });
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
