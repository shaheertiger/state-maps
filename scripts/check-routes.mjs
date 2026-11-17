import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3100';
const get = (path, headers = {}) => fetch(new URL(path, base), { headers, redirect: 'manual', signal: AbortSignal.timeout(20000) });
// The product link appears only on the photo-storage guides named in lib/related-product.ts.
const productGuides=new Set([...(await fs.readFile(new URL('../lib/related-product.ts',import.meta.url),'utf8')).match(/productGuides=new Set\(\[([^\]]*)\]/)[1].matchAll(/'([^']+)'/g)].map(m=>'/blog/'+m[1]));
const backlinks=path=>productGuides.has(path)?1:0;
const editions=JSON.parse(await fs.readFile(new URL('../data/edition-canonicals.json',import.meta.url),'utf8'));const editionCount=Object.keys(editions).length;
for(const [variant,main] of Object.entries(editions)){const r=await get(`/app-privacy/${variant}`,{Accept:'text/html'});assert.equal(r.status,200,variant);const c=(await r.text()).match(/<link rel="canonical" href="([^"]+)"/);assert.equal(new URL(c[1]).pathname,`/app-privacy/${main}`,`${variant} names its main edition as canonical`);}
const sitemapResponse = await get('/sitemap.xml'); assert.equal(sitemapResponse.status, 200);
const rootXml = await sitemapResponse.text();
const childSitemaps=[...rootXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const xml=rootXml.includes('<sitemapindex')?(await Promise.all(childSitemaps.map(async path=>{const r=await get(path);assert.equal(r.status,200,path);return r.text();}))).join('\n'):rootXml;
const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
assert.equal(paths.length,4561-editionCount,'All indexable destinations appear in the sitemap index'); assert.equal(new Set(paths).size, paths.length);assert.equal(paths.filter(p=>p.startsWith('/app-privacy/')).length,4500-editionCount,'Every main app record appears in sitemaps');assert.ok(!paths.some(p=>p.startsWith('/app-privacy/page/')),'Noindex pagination stays out of sitemaps');
const evidence = [];
const internalLinks = new Set();
const appRecords=new Map(JSON.parse(await fs.readFile(new URL('../data/apple-apps.json',import.meta.url),'utf8')).map(a=>[a.slug,a]));
async function checkPath(path) {
  const r = await get(path, { Accept: 'text/html' }); assert.equal(r.status, 200, `HTML ${path}`);
  const body = await r.text(); assert.match(body, /<h1[ >]/, `${path} H1`);
  assert.match(body.match(/<title>([^<]*)<\/title>/)?.[1]||'',/statemaps\.net/,`${path} uses the confirmed site identity`);
  assert.ok(!(body.match(/class="logo"[^>]*>([^<]*)/)?.[1]||'').includes('VaultForYou'),`${path} header uses the confirmed brand`);
  if (process.env.CHECK_EDGE_HEADERS === '1') {
    assert.match(r.headers.get('vary') || '', /(?:^|,\s*)Accept(?:,|$)/i, `${path} HTML cache varies by Accept`);
    assert.match(r.headers.get('vary') || '', /User-Agent/i, `${path} HTML cache varies by User-Agent`);
  }
  const canonical = body.match(/<link rel="canonical" href="([^"]+)"/); assert.ok(canonical, `${path} canonical`);
  assert.equal(new URL(canonical[1]).pathname, path, `${path} canonical path`);
  if(process.env.EXPECTED_CANONICAL_ORIGIN)assert.equal(new URL(canonical[1]).origin,process.env.EXPECTED_CANONICAL_ORIGIN,`${path} production canonical origin`);
  assert.equal((body.match(/href="https:\/\/www\.vaultforyou\.app\/"/g)||[]).length,backlinks(path),`${path} product link only on storage guides`);
  assert.match(body, /og:title/); assert.match(body, /twitter:card/);assert.ok(body.includes(`${new URL(canonical[1]).origin}/social-image`),`${path} shares the site social image`);
  const schemas=[];
  for (const match of body.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) {const data=JSON.parse(match[1]);schemas.push(...(Array.isArray(data)?data:[data]));}
  if(path.startsWith('/blog/')){
    assert.match(body,/class="quick-answer"/,'Guide quick answer is server rendered');
    const faq=schemas.find(s=>s['@type']==='FAQPage');assert.ok(faq.mainEntity.length>=6,'Guide FAQ has at least six questions');
    const normalize=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#x27;',"'").replaceAll('&#39;',"'").replace(/\s+/g,' ').trim();
    const visibleSource=normalize(body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<[^>]*>/g,' '));
    for(const q of faq.mainEntity){assert.ok(visibleSource.includes(normalize(q.name)),'FAQ question matches HTML');assert.ok(visibleSource.includes(normalize(q.acceptedAnswer.text)),'FAQ answer matches HTML');}
  }
  if(path.startsWith('/app-privacy/')&&!path.startsWith('/app-privacy/page/')){
    for(const anchor of ['privacy-label','listing-facts','review-checklist','questions','sources','related-records'])assert.ok(body.includes(`id="${anchor}"`),`${path} structured section ${anchor}`);
    const app=appRecords.get(path.split('/').pop());assert.ok(app,'App identity exists in source snapshot');const schema=schemas.find(s=>s['@type']==='SoftwareApplication');assert.equal(schema.identifier,String(app.id));assert.equal(schema.name,app.name);assert.equal(schema.author.name,app.developer);assert.equal(schema.softwareVersion,app.version);assert.equal(schema.sameAs,app.sourceUrl);
  }
  for (const match of body.matchAll(/href="(\/[^"#?]*)/g)) if (!match[1].startsWith('/_next/')) internalLinks.add(match[1]);
  const mdPath = path === '/' ? '/index.md' : path + '.md';
  assert.ok((r.headers.get('link') || '').includes(mdPath), `${path} advertised alternate`);
  const md = await get(mdPath); assert.equal(md.status, 200, `Markdown ${mdPath}`);
  assert.match(md.headers.get('content-type') || '', /^text\/markdown/);
  assert.match(md.headers.get('x-robots-tag') || '', /noindex/);
  assert.ok(Number(md.headers.get('x-markdown-tokens')) > 0);
  const markdown = await md.text();assert.equal((markdown.match(/\]\(https:\/\/www\.vaultforyou\.app\/\)/g)||[]).length,backlinks(path),`${path} Markdown product link only on storage guides`); assert.match(markdown, /^# /); assert.ok(markdown.length > 100);
  for (const headers of [{ Accept: 'text/markdown' }, { 'User-Agent': 'GPTBot' }]) {
    const negotiated = await get(path, headers); assert.equal(negotiated.status, 200, `Negotiated ${path}`);
    assert.match(negotiated.headers.get('content-type') || '', /^text\/markdown/);
    assert.equal(await negotiated.text(), markdown, `${path} negotiated parity`);
  }
  evidence.push({ path, htmlStatus: r.status, markdownStatus: md.status, canonical: canonical[1], markdownTokens: md.headers.get('x-markdown-tokens') });
}
let cursor=0;await Promise.all(Array.from({length:8},async()=>{while(cursor<paths.length){const path=paths[cursor++];await checkPath(path);if(cursor%500===0)console.log(`Checked ${cursor}/${paths.length} sitemap pages`);}}));
const linkPaths=[...internalLinks].filter(path=>!paths.includes(path));let linkCursor=0;await Promise.all(Array.from({length:8},async()=>{while(linkCursor<linkPaths.length){const path=linkPaths[linkCursor++];const r=await get(path);assert.ok(r.status>=200&&r.status<400,`Broken internal link ${path}: ${r.status}`);if(r.status===200&&(r.headers.get('content-type')||'').includes('text/html')){const body=await r.text();assert.equal((body.match(/href="https:\/\/www\.vaultforyou\.app\/"/g)||[]).length,backlinks(path),`${path} nonindexed page backlink`);const md=await get(path+'.md');assert.equal(md.status,200);assert.equal(((await md.text()).match(/\]\(https:\/\/www\.vaultforyou\.app\/\)/g)||[]).length,backlinks(path),`${path} nonindexed Markdown backlink`);}}}));
for (const path of ['/blog/not-a-guide', '/guides/not-a-category', '/privacy-settings/not-a-setting', '/not-a-page.md', '/md/blog/not-a-guide','/lock-notes/whatsapp','/hide-notifications/instagram','/app-privacy/not-a-real-app','/app-privacy/page/9999']) {
  const r = await get(path); assert.equal(r.status, 404, `Unknown route ${path}`);
}
for (const path of ['/robots.txt', '/llms.txt', '/social-image', '/icon.svg', '/apple-icon','/app-directory-index.json']) { const r = await get(path); assert.equal(r.status, 200, path); }
const catalogIndex=await (await get('/app-directory-index.json')).json();assert.equal(catalogIndex.length,4500);assert.equal(new Set(catalogIndex.map(a=>a.slug)).size,4500);
for(const page of Array.from({length:44},(_,i)=>i+2)){const path=`/app-privacy/page/${page}`,r=await get(path,{Accept:'text/html'}),body=await r.text();assert.equal(r.status,200);assert.match(body,/name="robots" content="noindex, follow"/);const md=await get(path+'.md');assert.equal(md.status,200);assert.equal((body.match(/href="https:\/\/www\.vaultforyou\.app\/"/g)||[]).length,0);assert.equal(((await md.text()).match(/\]\(https:\/\/www\.vaultforyou\.app\/\)/g)||[]).length,0);}
// Duplicates merged into one page: each old URL answers with a single permanent redirect.
for (const [from,to] of [['/hide-apps/whatsapp','/apps/whatsapp'],['/lock-apps/instagram','/apps/instagram'],['/unhide-apps','/blog/how-to-unhide-apps-on-iphone'],['/hide-notifications','/blog/hide-notifications-lock-screen-iphone'],['/lock-notes','/blog/how-to-lock-notes-iphone'],['/privacy-settings/show-hidden-album','/blog/how-to-hide-photos-iphone'],['/privacy-settings','/guides'],['/privacy-checklist','/tools/privacy-checkup'],['/best/vault-apps','/blog/best-photo-vault-apps-iphone'],['/compare/photo-storage-options','/blog/hidden-vs-encrypted-photo-vault'],['/is-melo-safe','/app-privacy/melo-ai-family-organizer-6752846683'],['/unhide-apps.md','/blog/how-to-unhide-apps-on-iphone.md'],['/privacy-settings.md','/guides.md'],['/hide-apps/whatsapp.md','/apps/whatsapp.md'],['/compare.md','/blog/hidden-vs-encrypted-photo-vault.md']]){const r=await get(from,{Accept:'text/html'});assert.equal(r.status,308,from);assert.equal(new URL(r.headers.get('location'),base).pathname,to,from);assert.ok(!paths.includes(from),`${from} left the sitemap`);}
const sharedImage=await get('/social-image');assert.equal(sharedImage.status,200);assert.match(sharedImage.headers.get('content-type')||'',/^image\//);
const llms = await (await get('/llms.txt')).text(); for (const path of paths) assert.ok(llms.includes(path === '/' ? '/index.md' : path + '.md'));
const output = process.env.ROUTE_EVIDENCE_PATH;
if (output) await fs.writeFile(output, JSON.stringify({ base, pageCount: paths.length, internalLinkCount: internalLinks.size, routes: evidence }, null, 2));
console.log(`PASS: ${paths.length} HTML pages, Markdown twins and both negotiation modes; ${internalLinks.size} internal targets; 404s and discovery/image routes.`);
