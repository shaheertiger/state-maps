#!/usr/bin/env node
/** Favicons from one SVG: favicon.svg, favicon.ico (16/32/48), 96px, Apple touch icon and manifest icons. */
import { writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="9" fill="#0f766e"/><path d="M7 22l6-3 6 3 6-3V9l-6 3-6-3-6 3z" fill="none" stroke="#effcf9" stroke-width="1.8" stroke-linejoin="round"/><path d="M13 9v10M19 12v10" stroke="#effcf9" stroke-width="1.4" opacity=".7"/><circle cx="23.5" cy="8.5" r="3.2" fill="#e0a33b" stroke="#0f766e" stroke-width="1.2"/></svg>`;
// Full-bleed variant (no rounded corners) for platforms that apply their own mask.
const bleed = svg.replace('rx="9"', 'rx="0"');
const out = (p) => new URL(`../public/${p}`, import.meta.url);
const png = (src, size) => new Resvg(src, { fitTo: { mode: "width", value: size } }).render().asPng();

writeFileSync(out("favicon.svg"), svg);
writeFileSync(out("favicon-96x96.png"), png(svg, 96));
writeFileSync(out("apple-touch-icon.png"), png(bleed, 180));
writeFileSync(out("web-app-manifest-192x192.png"), png(bleed, 192));
writeFileSync(out("web-app-manifest-512x512.png"), png(bleed, 512));

// ICO container with PNG payloads.
const sizes = [16, 32, 48];
const imgs = sizes.map((s) => png(svg, s));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const o = 6 + i * 16;
  header.writeUInt8(s, o); header.writeUInt8(s, o + 1); header.writeUInt8(0, o + 2); header.writeUInt8(0, o + 3);
  header.writeUInt16LE(1, o + 4); header.writeUInt16LE(32, o + 6);
  header.writeUInt32LE(imgs[i].length, o + 8); header.writeUInt32LE(offset, o + 12);
  offset += imgs[i].length;
});
writeFileSync(out("favicon.ico"), Buffer.concat([header, ...imgs]));
console.log("make-favicons: favicon.svg, favicon.ico, 96px, apple-touch-icon, manifest icons");
