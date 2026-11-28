import { ImageResponse } from "next/og";
import { allBrands, allCategories, allGuides } from "@/lib/content";
import { allEntries } from "@/lib/urls";
import { ogId } from "@/lib/ld";
import { compatPages } from "@/lib/compat";
import { SITE, TOOLS, brandPath, compatPath, guidePath, hubPath } from "@/lib/site";

/** Open Graph images, rendered once at build into /og/{id}.png. */
export const dynamic = "force-static";
export const dynamicParams = false;

/** One card per sitemap page, keyed by ogId(path). Will-it-fit cards carry the two items and the answer. */
function cards(): Record<string, { title: string; kicker: string }> {
  const out: Record<string, { title: string; kicker: string }> = {};
  const VERDICT = { yes: "Yes", no: "No", loosely: "Yes, loosely", depends: "It depends" } as const;
  for (const e of allEntries()) out[ogId(e.path)] = { title: e.title, kicker: SITE.descriptor };
  out[ogId("/")] = { title: "What are you trying to fit?", kicker: SITE.descriptor };
  for (const g of allGuides()) out[ogId(guidePath(g.slug))] = { title: g.h1, kicker: `${g.checklist.length} fit checks` };
  for (const p of compatPages())
    out[ogId(compatPath(p.slug))] = { title: p.h1, kicker: `${VERDICT[p.verdict]} · ${p.a.name} vs ${p.b.name}` };
  for (const c of allCategories()) out[ogId(hubPath(c.slug))] = { title: c.name, kicker: "Fit guides" };
  for (const b of allBrands()) {
    out[ogId(brandPath(b.slug))] = { title: b.h1, kicker: `Sizing: ${b.verdict}` };
    for (const p of b.products ?? []) out[ogId(brandPath(b.slug, p.slug))] = { title: p.h1, kicker: `${b.brand} sizing` };
  }
  for (const t of TOOLS) out[ogId(`/tools/${t.slug}/`)] = { title: t.name, kicker: "Free tool" };
  return out;
}

export function generateStaticParams() {
  return Object.keys(cards()).map((id) => ({ id }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = cards()[id] ?? { title: SITE.name, kicker: SITE.tagline };
  const ticks = Array.from({ length: 121 }, (_, i) => i);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#F2F4F0", color: "#18202E" }}>
        <div style={{ display: "flex", height: 56, background: "#F3C631", position: "relative" }}>
          {ticks.map((i) => (
            <div key={i} style={{ position: "absolute", left: i * 10, top: 0, width: 2, height: i % 10 === 0 ? 30 : i % 5 === 0 ? 20 : 12, background: "#18202E" }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, padding: "0 72px" }}>
          <div style={{ fontSize: 34, color: "#2B5FA6", marginBottom: 18 }}>{c.kicker}</div>
          <div style={{ fontSize: c.title.length > 48 ? 66 : 82, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>{c.title}</div>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, padding: "0 72px 48px" }}>
          <div style={{ fontSize: 34, fontWeight: 800 }}>{SITE.name}</div>
          <div style={{ fontSize: 26, color: "#4A5466" }}>{SITE.descriptor}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
