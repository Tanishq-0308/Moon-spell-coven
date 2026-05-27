import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getPublishedServices } from "@/lib/services-db";
import { getPublishedProducts } from "@/lib/products-db";
import { BLOG_POSTS } from "@/lib/blog";
import { ZODIAC } from "@/lib/zodiac";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const now = new Date();
  const products = await getPublishedProducts();
  const services = await getPublishedServices();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/horoscopes`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const shopPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const signPages: MetadataRoute.Sitemap = ZODIAC.map((z) => ({
    url: `${base}/horoscopes/${z.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...shopPages,
    ...blogPages,
    ...signPages,
  ];
}
