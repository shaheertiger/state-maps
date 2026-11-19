import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allBrands, getBrand } from "@/lib/content";
import { brandPath } from "@/lib/site";
import { BrandProductPage } from "@/components/BrandPage";

export const dynamicParams = false;
export function generateStaticParams() {
  const out = allBrands().flatMap((b) => (b.products ?? []).map((p) => ({ brand: b.slug, product: p.slug })));
  return out.length ? out : [{ brand: "_none", product: "_none" }];
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string; product: string }> }): Promise<Metadata> {
  const { brand, product } = await params;
  const p = getBrand(brand)?.products?.find((x) => x.slug === product);
  if (!p) return { robots: { index: false } };
  const title = `${p.h1.replace(/\?$/, "")}? Sizing Guide (True to Size?)`;
  return { title: { absolute: title }, description: p.answer.slice(0, 300), alternates: { canonical: brandPath(brand, product) }, openGraph: { title, url: brandPath(brand, product) } };
}

export default async function Page({ params }: { params: Promise<{ brand: string; product: string }> }) {
  const { brand, product } = await params;
  const b = getBrand(brand);
  if (!b || !b.products?.some((p) => p.slug === product)) notFound();
  return <BrandProductPage b={b} slug={product} />;
}
