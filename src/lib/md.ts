/**
 * Minimal Markdown → HTML for the editorial records (headings, paragraphs, lists, tables,
 * blockquotes, links, bold/italic/code). Internal links are rewritten to trailing-slash paths.
 */
import { SITE } from "./site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const slugId = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

export function localHref(href: string) {
  let h = href.replace(SITE.url, "").replace("https://statemaps.net", "");
  if (/^https?:/.test(h)) return h;
  if (!h.startsWith("/")) return h;
  const [p, rest = ""] = h.split(/(?=[?#])/);
  const path = p === "/" || /\.[a-z0-9]+$/i.test(p) || p.endsWith("/") ? p : p + "/";
  return path + rest;
}

function inline(s: string) {
  let out = esc(s);
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, h) => {
    const href = localHref(h.replace(/&amp;/g, "&"));
    const ext = /^https?:/.test(href);
    return `<a href="${esc(href)}" class="link"${ext ? ' rel="noopener nofollow"' : ""}>${t}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>").replace(/`([^`]+)`/g, "<code>$1</code>");
  return out;
}

export type Heading = { id: string; text: string };
export function render(md: string): { html: string; headings: Heading[] } {
  const lines = md.replace(/\r/g, "").split("\n");
  const html: string[] = [];
  const headings: Heading[] = [];
  const seen = new Set<string>();
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const level = Math.max(2, h[1].length);
      let id = slugId(h[2]);
      while (seen.has(id)) id += "-2";
      seen.add(id);
      if (level === 2) headings.push({ id, text: h[2] });
      html.push(`<h${level} id="${id}">${inline(h[2])}</h${level}>`);
      i++; continue;
    }
    if (/^\|/.test(line)) {
      const rows: string[][] = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        if (!/^\|[\s:|-]+\|$/.test(lines[i])) rows.push(lines[i].replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
        i++;
      }
      const [head, ...body] = rows;
      html.push(`<div class="table-wrap my-5"><table class="data-table"><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }
    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items: string[] = [];
      while (i < lines.length && (ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/).test(lines[i])) {
        items.push(lines[i].replace(/^\s*(?:[-*]|\d+\.)\s+/, ""));
        i++;
      }
      html.push(`<${ordered ? "ol" : "ul"}>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</${ordered ? "ol" : "ul"}>`);
      continue;
    }
    if (/^>\s?/.test(line)) {
      const q: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, ""));
      html.push(`<blockquote>${inline(q.join(" "))}</blockquote>`);
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|\||\s*[-*]\s|\s*\d+\.\s|>)/.test(lines[i])) para.push(lines[i++]);
    html.push(`<p>${inline(para.join(" "))}</p>`);
  }
  return { html: html.join("\n"), headings };
}

/** Drop the record's own title/metadata lines (the template renders those). */
export const stripMeta = (md: string) =>
  md.split("\n").filter((l, idx) => !(idx < 12 && /^(# |> |Author:|Published:|Updated:|Canonical:)/.test(l))).join("\n");
