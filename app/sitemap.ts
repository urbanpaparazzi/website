import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { NEWS_QUERY, VIDEOS_QUERY } from "@/sanity/lib/queries";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://urbanpaparazzi.ng";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ data: news }, { data: videos }] = await Promise.all([
    client.fetch(NEWS_QUERY),
    client.fetch(VIDEOS_QUERY),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/news`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/videos`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/authors`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const newsRoutes = (news ?? []).flatMap((post) => {
    const slug = post.slug?.current;
    return slug
      ? [
          {
            url: `${baseUrl}/news/${slug}`,
            lastModified: post.publishedAt,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
        ]
      : [];
  });

  const videoRoutes = (videos ?? []).flatMap((video) => {
    const slug = video.slug?.current;
    return slug
      ? [
          {
            url: `${baseUrl}/videos/${slug}`,
            lastModified: video.publishedAt,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
        ]
      : [];
  });

  return [...staticRoutes, ...newsRoutes, ...videoRoutes];
}
