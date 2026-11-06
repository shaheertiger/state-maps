/** Client helpers shared by the home widget, search page and tools. */
export type Row = { s: string; n: string; f?: string; d: string; k: string; c: string; l: number; t: number[]; i: number[]; u: number[]; r: number; v: [number, number] };
type Index = { types: string[]; apps: Row[] };
let cache: Promise<Index> | null = null;
export const loadIndex = () => (cache ??= fetch("/search-index.json").then((r) => r.json()));
export const appHref = (r: Row) => `/is-${r.s}-safe/`;
export const trackHref = (r: Row) => `/does-${r.s}-track-you/`;
export const LEVEL = ["No label details", "Data not collected", "Not linked to you", "Linked to you", "Used to track you"];
export const LEVEL_PILL = ["pill-caution", "pill-yes", "pill-info", "pill-caution", "pill-no"];
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
export function search(rows: Row[], q: string, limit = 8): Row[] {
  const nq = norm(q);
  if (!nq) return [];
  const words = nq.split(" ");
  const scored: [number, Row][] = [];
  for (const r of rows) {
    const name = norm(r.n);
    const hay = `${name} ${norm(r.f ?? "")} ${norm(r.d)} ${norm(r.k)}`;
    if (!words.every((w) => hay.includes(w))) continue;
    let score = r.r / 10000;
    if (name === nq) score -= 100;
    else if (name.startsWith(nq)) score -= 50;
    else if (name.includes(nq)) score -= 20;
    else if (norm(r.d).includes(nq)) score -= 5;
    scored.push([score, r]);
  }
  return scored.sort((a, b) => a[0] - b[0]).slice(0, limit).map((x) => x[1]);
}
export const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
export const names = (idx: Index, xs: number[]) => xs.map((i) => idx.types[i]);
export const allTypes = (r: Row) => [...new Set([...r.t, ...r.i, ...r.u])].sort((a, b) => a - b);

/** Fill a <datalist> for an input and resolve the typed name back to a row. */
export async function picker(input: HTMLInputElement) {
  const idx = await loadIndex();
  const list = [...idx.apps].sort((a, b) => a.n.localeCompare(b.n));
  const dl = document.getElementById(input.getAttribute("list")!)!;
  dl.innerHTML = list.map((r) => `<option value="${esc(r.n)}"></option>`).join("");
  return (): Row | null => {
    const v = input.value.trim().toLowerCase();
    if (!v) return null;
    return list.find((r) => r.n.toLowerCase() === v) ?? search(list, v, 1)[0] ?? null;
  };
}

/** Render a row's label as HTML (used by the checker and home widget). */
export function labelHtml(idx: Index, r: Row) {
  const sec = (title: string, xs: number[], cls: string) =>
    `<div class="rounded-[12px] p-3 ${cls}"><div class="text-[11px] font-bold uppercase tracking-[.08em]">${title}</div><div class="text-[26px] font-[750] leading-none mt-1">${xs.length}</div><div class="text-[13px] mt-1.5">${xs.length ? esc(names(idx, xs).join(", ")) : "None declared"}</div></div>`;
  if (r.l === 0) return `<p class="text-[15px]">The developer has not provided privacy details on the App Store.</p>`;
  if (r.l === 1) return `<p class="text-[15px]">The developer states that the app does not collect any data.</p>`;
  return `<div class="grid sm:grid-cols-3 gap-2">${sec("Used to track you", r.t, "bg-tint-red text-no")}${sec("Linked to you", r.i, "bg-tint-amber text-caution")}${sec("Not linked to you", r.u, "bg-tint-blue text-[#22508f]")}</div>`;
}
