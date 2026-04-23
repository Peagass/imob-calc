import type { MetadataRoute } from "next";
import { SITE_URL, pages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.keys(pages);
  const now = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
