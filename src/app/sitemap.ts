import type { MetadataRoute } from "next";
import { caseStudies, siteMeta } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-08");

  return [
    { url: `${siteMeta.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((study) => ({
      url: `${siteMeta.url}/work/${study.slug}/`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: study.flagship ? 0.9 : 0.7,
    })),
  ];
}
