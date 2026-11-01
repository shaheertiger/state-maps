import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3100';
const get = (path, headers = {}) => fetch(new URL(path, base), { headers, redirect: 'manual', signal: AbortSignal.timeout(20000) });
const sitemapResponse = await get('/sitemap.xml'); assert.equal(sitemapResponse.status, 200);
const rootXml = await sitemapResponse.text();
const childSitemaps=[...rootXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const xml=rootXml.includes('<sitemapindex')?(await Promise.all(childSitemaps.map(async path=>{const r=await get(path);assert.equal(r.status,200,path);return r.text();}))).join('\n'):rootXml;
const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
assert.ok(paths.length > 15); assert.equal(new Set(paths).size, paths.length);
const evidence = [];
const internalLinks = new Set();
for (const path of paths) {
  const r = await get(path, { Accept: 'text/html' }); assert.equal(r.status, 200, `HTML ${path}`);
  const body = await r.text(); assert.match(body, /<h1[ >]/, `${path} H1`);
  assert.match(body.match(/<title>([^<]*)<\/title>/)?.[1]||'',/statemaps\.net/,`${path} uses the confirmed site identity`);
  assert.ok(!body.includes('VaultForYou'),`${path} does not retain the draft product brand`);
  if (process.env.CHECK_EDGE_HEADERS === '1') {
    assert.match(r.headers.get('vary') || '', /(?:^|,\s*)Accept(?:,|$)/i, `${path} HTML cache varies by Accept`);
    assert.match(r.headers.get('vary') || '', /User-Agent/i, `${path} HTML cache varies by User-Agent`);
  }
  const canonical = body.match(/<link rel="canonical" href="([^"]+)"/); assert.ok(canonical, `${path} canonical`);
  assert.equal(new URL(canonical[1]).pathname, path, `${path} canonical path`);
  if(process.env.EXPECTED_CANONICAL_ORIGIN)assert.equal(new URL(canonical[1]).origin,process.env.EXPECTED_CANONICAL_ORIGIN,`${path} production canonical origin`);
  assert.match(body, /og:title/); assert.match(body, /twitter:card/);
  const schemas=[];
  for (const match of body.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) {const data=JSON.parse(match[1]);schemas.push(...(Array.isArray(data)?data:[data]));}
  if(path.startsWith('/blog/')){
    assert.match(body,/class="quick-answer"/,'Guide quick answer is server rendered');
    const faq=schemas.find(s=>s['@type']==='FAQPage');assert.ok(faq.mainEntity.length>=6,'Guide FAQ has at least six questions');
    const normalize=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#x27;',"'").replaceAll('&#39;',"'").replace(/\s+/g,' ').trim();
    const visibleSource=normalize(body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<[^>]*>/g,' '));
    for(const q of faq.mainEntity){assert.ok(visibleSource.includes(normalize(q.name)),'FAQ question matches HTML');assert.ok(visibleSource.includes(normalize(q.acceptedAnswer.text)),'FAQ answer matches HTML');}
  }
  if(path==='/lock-notes'){
    const list=schemas.find(s=>s['@type']==='ItemList');assert.equal(list.numberOfItems,1,'Notes hub lists only its applicable app');assert.equal(new URL(list.itemListElement[0].url).pathname,'/apps/notes');
  }
  for (const match of body.matchAll(/href="(\/[^"#?]*)/g)) if (!match[1].startsWith('/_next/')) internalLinks.add(match[1]);
  const mdPath = path === '/' ? '/index.md' : path + '.md';
  assert.ok((r.headers.get('link') || '').includes(mdPath), `${path} advertised alternate`);
  const md = await get(mdPath); assert.equal(md.status, 200, `Markdown ${mdPath}`);
  assert.match(md.headers.get('content-type') || '', /^text\/markdown/);
  assert.match(md.headers.get('x-robots-tag') || '', /noindex/);
  assert.ok(Number(md.headers.get('x-markdown-tokens')) > 0);
  const markdown = await md.text(); assert.match(markdown, /^# /); assert.ok(markdown.length > 100);
  for (const headers of [{ Accept: 'text/markdown' }, { 'User-Agent': 'GPTBot' }]) {
    const negotiated = await get(path, headers); assert.equal(negotiated.status, 200, `Negotiated ${path}`);
    assert.match(negotiated.headers.get('content-type') || '', /^text\/markdown/);
    assert.equal(await negotiated.text(), markdown, `${path} negotiated parity`);
  }
  evidence.push({ path, htmlStatus: r.status, markdownStatus: md.status, canonical: canonical[1], markdownTokens: md.headers.get('x-markdown-tokens') });
}
for (const path of internalLinks) { const r = await get(path); assert.ok(r.status >= 200 && r.status < 400, `Broken internal link ${path}: ${r.status}`); }
for (const path of ['/blog/not-a-guide', '/guides/not-a-category', '/privacy-settings/not-a-setting', '/not-a-page.md', '/md/blog/not-a-guide','/lock-notes/whatsapp','/hide-notifications/instagram']) {
  const r = await get(path); assert.equal(r.status, 404, `Unknown route ${path}`);
}
for (const path of ['/robots.txt', '/llms.txt', '/social-image', '/icon.svg', '/apple-icon']) { const r = await get(path); assert.equal(r.status, 200, path); }
for (const path of ['/hide-apps/whatsapp','/lock-apps/instagram']){const r=await get(path,{Accept:'text/html'});assert.equal(r.status,200);const body=await r.text();assert.match(body,/name="robots" content="noindex, follow"/);assert.ok(!paths.includes(path),'Shared-method combinations must stay out of sitemaps');assert.match(body,/rel="canonical" href="[^"]+\/apps\//);}
for(const path of ['/og/index','/og/hide-apps','/og/apps/whatsapp','/og/tools/exif-viewer']){const r=await get(path);assert.equal(r.status,200,path);assert.match(r.headers.get('content-type')||'',/^image\//);}
const llms = await (await get('/llms.txt')).text(); for (const path of paths) assert.ok(llms.includes(path === '/' ? '/index.md' : path + '.md'));
const output = process.env.ROUTE_EVIDENCE_PATH;
if (output) await fs.writeFile(output, JSON.stringify({ base, pageCount: paths.length, internalLinkCount: internalLinks.size, routes: evidence }, null, 2));
console.log(`PASS: ${paths.length} HTML pages, Markdown twins and both negotiation modes; ${internalLinks.size} internal targets; 404s and discovery/image routes.`);
