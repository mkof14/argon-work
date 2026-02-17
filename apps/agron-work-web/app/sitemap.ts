import type { MetadataRoute } from "next";
import { roleDomains, roles } from "../lib/roles";
import { corePages, getSiteUrl, legalPages } from "../lib/site";

const siteUrl = getSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const basePages = corePages.map((page) => page.href);
  const legalPageUrls = legalPages.map((page) => page.href);
  const domainPages = roleDomains.map((slug) => `/domains/${slug}`);
  const rolePages = roles.map((role) => `/roles/${role.id}`);

  return [...basePages, ...legalPageUrls, ...domainPages, ...rolePages].map((page) => ({
    url: `${siteUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page === "" ? 1 : 0.7
  }));
}
