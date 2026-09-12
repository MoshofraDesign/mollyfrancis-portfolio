import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export const SITE = "https://mollyfrancis.com";

/**
 * Every page on the site, for crawlers.
 *
 * The project pages are generated from lib/projects.ts rather than listed by
 * hand: that list is already the single source of truth for the work grid and
 * the Up-next chain, so a project can't ship without turning up here too.
 * app/v2/* is deliberately absent — it's a legacy parallel design nothing
 * links to, and letting it be indexed would file a second copy of the same
 * copy under a different URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const work: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...work];
}
