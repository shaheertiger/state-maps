#!/usr/bin/env node
/**
 * Submits URLs to IndexNow (Bing, Yandex, Naver, Seznam, Yep share submissions).
 *   npm run indexnow                       # every URL in the built sitemaps (run after deploy)
 *   npm run indexnow -- /is-dropbox-safe/  # specific paths
 * The key file public/1f70c56620ff33dbb6326ee1888462aa.txt must be live at https://statemaps.net/1f70c56620ff33dbb6326ee1888462aa.txt first.
 * Google does not use IndexNow: submit https://statemaps.net/sitemap.xml in Search Console.
 */
import { readFileSync } from "node:fs";
const HOST = "statemaps.net";
const KEY = "1f70c56620ff33dbb6326ee1888462aa";
const DIST = new URL("../dist/", import.meta.url);
let urls = process.argv.slice(2).map((p) => `https://${HOST}${p}`);
if (!urls.length) {
  const idx = readFileSync(new URL("sitemap.xml", DIST), "utf8");
  for (const [, loc] of idx.matchAll(/<loc>https:\/\/statemaps\.net\/([^<]+)<\/loc>/g)) {
    const xml = readFileSync(new URL(loc, DIST), "utf8");
    for (const [, u] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.push(u);
  }
}
for (let i = 0; i < urls.length; i += 10000) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(i, i + 10000) }),
  });
  console.log(`IndexNow: ${Math.min(10000, urls.length - i)} URLs → HTTP ${res.status}`);
}
