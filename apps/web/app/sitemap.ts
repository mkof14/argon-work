import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const locales = ["en", "es", "ru", "uk", "ar", "he"] as const;
const pages = [
  "",
  "/about",
  "/programs",
  "/diagnostic",
  "/part-107",
  "/flight-skills",
  "/simulator",
  "/corporate",
  "/faq",
  "/contact",
  "/pricing",
  "/legal/terms",
  "/legal/privacy",
  "/legal/disclaimer"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${siteUrl}/${locale}${page}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.7
    }))
  );
}
