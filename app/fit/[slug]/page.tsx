import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allGuides, allCategories, getGuide, guideTitle, guideMeta } from "@/lib/content";
import { hubSlug, guidePath, hubPath } from "@/lib/site";
import { GuidePage } from "@/components/GuidePage";
import { HubPage, hubTitle, hubMeta } from "@/components/HubPage";
import { ogId } from "@/lib/ld";

export const dynamicParams = false;

const catFromHub = (slug: string) => allCategories().find((c) => hubSlug(c.slug) === slug);

export function generateStaticParams() {
  return [...allGuides().map((g) => ({ slug: g.slug })), ...allCategories().map((c) => ({ slug: hubSlug(c.slug) }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (g)
    return {
      title: { absolute: guideTitle(g) },
      description: guideMeta(g),
      alternates: { canonical: guidePath(g.slug) },
      openGraph: { title: guideTitle(g), description: guideMeta(g), url: guidePath(g.slug), type: "article", images: [`/og/${ogId(guidePath(g.slug))}`] },
    };
  const c = catFromHub(slug);
  if (c)
    return {
      title: hubTitle(c),
      description: hubMeta(c),
      alternates: { canonical: hubPath(c.slug) },
      openGraph: { title: hubTitle(c), description: hubMeta(c), url: hubPath(c.slug), images: [`/og/${ogId(hubPath(c.slug))}`] },
    };
  return {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (g) return <GuidePage g={g} />;
  const c = catFromHub(slug);
  if (c) return <HubPage c={c} />;
  notFound();
}
