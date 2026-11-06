#!/usr/bin/env node
/** Renders the single site-wide Open Graph image (public/og.png, 1200×630) with satori + resvg. */
import { readFileSync, writeFileSync } from "node:fs";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const font = (w) => readFileSync(new URL(`../node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-${w}-normal.woff`, import.meta.url));
const apps = JSON.parse(readFileSync(new URL("../data/apps.json", import.meta.url), "utf8")).apps;
const rep = apps.filter((a) => a.status === "reported");
const track = Math.round((rep.filter((a) => a.track.length).length / rep.length) * 100);
const h = (type, style, children) => ({ type, props: { style, children } });

const tile = (label, value, bg, ink) => h("div", { display: "flex", flexDirection: "column", background: bg, borderRadius: 22, padding: "18px 24px", width: 300 }, [
  h("div", { fontSize: 20, fontWeight: 700, color: ink, letterSpacing: 1.5, textTransform: "uppercase" }, label),
  h("div", { fontSize: 48, fontWeight: 800, color: ink, marginTop: 2 }, value),
]);

const tree = h("div", { width: 1200, height: 630, display: "flex", flexDirection: "column", padding: "52px 72px", background: "#ffffff", backgroundImage: "radial-gradient(#d5e5df 1.5px, transparent 1.5px)", backgroundSize: "22px 22px", fontFamily: "Jakarta" }, [
  h("div", { display: "flex", alignItems: "center", gap: 18 }, [
    h("div", { width: 64, height: 64, borderRadius: 18, background: "#0f766e", display: "flex", alignItems: "center", justifyContent: "center", color: "#effcf9", fontSize: 34, fontWeight: 800 }, "S"),
    h("div", { fontSize: 38, fontWeight: 800, color: "#13201d", display: "flex" }, [h("span", {}, "State"), h("span", { color: "#0f766e" }, "Maps")]),
  ]),
  h("div", { display: "flex", flexDirection: "column", marginTop: 70 }, [
    h("div", { fontSize: 64, fontWeight: 800, color: "#13201d", lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 980 }, "Is that app safe? iPhone privacy labels, decoded."),
    h("div", { fontSize: 28, color: "#5f6f6b", marginTop: 16 }, `${apps.length.toLocaleString("en-US")} apps · tracking, linked data and the settings that limit it`),
  ]),
  h("div", { display: "flex", gap: 20, marginTop: 48 }, [
    tile("Track you", `${track}%`, "#fbe8e4", "#9b2c1c"),
    tile("Apps checked", apps.length.toLocaleString("en-US"), "#e2f4f1", "#0b5f58"),
    tile("Data types", "16", "#e7eefa", "#22508f"),
  ]),
]);

const svg = await satori(tree, { width: 1200, height: 630, fonts: [{ name: "Jakarta", data: font(400), weight: 400 }, { name: "Jakarta", data: font(700), weight: 700 }, { name: "Jakarta", data: font(800), weight: 800 }] });
writeFileSync(new URL("../public/og.png", import.meta.url), new Resvg(svg).render().asPng());
console.log("make-og: public/og.png");
