import type { MetadataRoute } from "next";
import { htmlPaths } from "@/lib/markdown";
import { reviewedDate } from "@/lib/content";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap { return htmlPaths.map(path => ({ url: site.url + (path === "/" ? "" : path), lastModified: reviewedDate, changeFrequency: path === "/" || path === "/guides" || path === "/privacy-settings" ? "weekly" : "monthly", priority: path === "/" ? 1 : path.startsWith("/blog/") || path.startsWith("/privacy-settings/") ? 0.7 : 0.8 })); }
