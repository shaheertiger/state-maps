// Tiny inline markdown: **bold**, *italic*, [text](url). Everything else is escaped.
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function inline(src: string): string {
  let out = esc(src);
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, href) => {
    const external = /^https?:\/\//.test(href);
    const rel = external ? ' rel="noopener noreferrer" target="_blank"' : "";
    return `<a href="${href}"${rel}>${text}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
  return out;
}

export const plain = (src: string) =>
  src.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*?([^*]+)\*\*?/g, "$1");

export const words = (...parts: (string | string[] | undefined)[]) =>
  parts
    .flat()
    .filter(Boolean)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

export const readMinutes = (n: number) => Math.max(1, Math.round(n / 230));

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const fmtDate = (iso: string) =>
  new Date(iso + (iso.length === 10 ? "T12:00:00Z" : "")).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
