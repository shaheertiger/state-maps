import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allBrands, getBrand } from "@/lib/content";
import { brandPath } from "@/lib/site";
import { BrandPage } from "@/components/BrandPage";

export const dynamicParams = false;
export const generateStaticParams = () => allBrands().map((b) => ({ brand: b.slug }));
export const brandTitle = (h1: string) => `${h1.replace(/\?$/, "")}? Sizing Guide (True to Size?)`;

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
  const b = getBrand((await params).brand);
  if (!b) return {};
  const title = brandTitle(b.h1);
  return { title: { absolute: title }, description: b.answer.slice(0, 300), alternates: { canonical: brandPath(b.slug) }, openGraph: { title, url: brandPath(b.slug), images: [`/og/sizing-${b.slug}.png`] } };
}

export default async function Page({ params }: { params: Promise<{ brand: string }> }) {
  const b = getBrand((await params).brand);
  if (!b) notFound();
  return <BrandPage b={b} />;
}
