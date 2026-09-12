import type { MetadataRoute } from "next";
import { SITE } from "./sitemap";

/**
 * /v2 is the legacy parallel design and nothing links to it; keeping it out
 * of the index stops the same case-study copy being filed twice under two
 * URLs, which is the thing search engines actually penalise.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/v2/"] }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
