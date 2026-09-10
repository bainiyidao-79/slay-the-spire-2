import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/site";
import { listAllContentPaths } from "@/lib/content";

export const dynamic = "force-static";

// 树状 sitemap：目录页 + 文章页全量（深度按层级降权）
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  entries.push({
    url: `${siteUrl}/`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 1,
  });

  for (const segments of listAllContentPaths()) {
    entries.push({
      url: `${siteUrl}/${segments.join("/")}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: Math.max(0.4, 0.8 - segments.length * 0.1),
    });
  }

  return entries;
}
