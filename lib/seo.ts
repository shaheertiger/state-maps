import type { Metadata } from "next";
import { site } from "./site";
export function pageMetadata(title: string, description: string, path: string, article?: { published: string; updated: string }): Metadata {
  const image = `${site.url}/og${path==='/'?'/index':path}`;
  return { title, description, alternates: { canonical: path, types: { "text/markdown": path === "/" ? "/index.md" : `${path}.md` } },
    openGraph: { title, description, url: `${site.url}${path === "/" ? "" : path}`, siteName: site.name, locale: "en_US", type: article ? "article" : "website", images: [{ url: image, width: 1280, height: 720, alt: `${title} — ${site.name}` }], ...(article ? { publishedTime: article.published, modifiedTime: article.updated, authors: [`${site.url}/about`] } : {}) },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
export function jsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, "\\u003c"); }
