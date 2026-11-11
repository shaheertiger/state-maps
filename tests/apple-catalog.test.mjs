import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {profileFacts,profileFaq,profileMarkdown,profileTitle,privacySummary,sourceDate} from '../lib/apple-profile.ts';
const records=JSON.parse(fs.readFileSync(new URL('../data/apple-apps.json',import.meta.url),'utf8'));
test('catalog contains 4500 distinct complete sourced app identities',()=>{
 assert.equal(records.length,4500);
 for(const key of ['id','slug','bundleId'])assert.equal(new Set(records.map(r=>r[key])).size,4500,`Duplicate ${key}`);
 for(const r of records){
  assert.match(r.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);assert.ok(r.slug.endsWith('-'+r.id));
  for(const key of ['name','developer','bundleId','minimumIos','version','updatedAt','retrievedAt','responseSha256'])assert.ok(r[key],`${r.slug} missing ${key}`);
  assert.equal(new URL(r.sourceUrl).hostname,'apps.apple.com');assert.ok(new URL(r.sourceUrl).pathname.endsWith('/id'+r.id));
  assert.equal(new URL(r.lookupUrl).searchParams.get('id'),String(r.id));assert.equal(new URL(r.lookupUrl).hostname,'itunes.apple.com');
  assert.match(r.responseSha256,/^[a-f0-9]{64}$/);assert.ok(!Number.isNaN(Date.parse(r.retrievedAt)));
  assert.ok(Array.from(profileTitle(r)).length<=65);
 }
});
test('profile body and FAQ retain each sampled app identity and source without inventing a security score',()=>{
 for(const i of [0,499,999,1999,2999,3999,4499]){const r=records[i],md=profileMarkdown(r),facts=new Map(profileFacts(r));assert.equal(facts.get('App Store ID'),String(r.id));assert.equal(facts.get('Developer / seller'),r.developer);assert.equal(facts.get('Listing version'),r.version);assert.ok(md.includes(r.sourceUrl));assert.ok(md.includes(r.bundleId));assert.equal(profileFaq(r).length,6);assert.ok(md.includes('not a security assessment'));}
});
test('missing privacy evidence cannot be turned into a no-data-collected claim',()=>{for(const r of records){if(r.privacyStatus!=='reported')assert.ok(!r.privacyCards?.some(c=>c.type==='Data Not Collected'));if(r.privacyStatus==='reported'){assert.ok(r.privacyCards.length>0);assert.equal(r.privacySourceUrl,r.sourceUrl);assert.match(r.privacyResponseSha256,/^[a-f0-9]{64}$/);}}});
test('an explicit unprovided disclosure stays distinct from a no-collection declaration',()=>{const text=privacySummary({...records[0],privacyStatus:'not-provided',privacyCards:[{type:'No Details Provided',categories:[]}]});assert.ok(text.includes('No Details Provided'));assert.ok(text.includes('does not mean'));});
test('source dates use the confirmed client timezone at a UTC date boundary',()=>{assert.equal(sourceDate('2026-11-01T02:00:00Z'),'2026-10-31');});

test('every published record retains its individual privacy disclosure provenance',()=>{for(const r of records){assert.ok(['reported','not-provided','not-extracted','fetch-failed','http-404','http-410','http-403','http-429'].includes(r.privacyStatus),r.slug);if(['reported','not-provided'].includes(r.privacyStatus)){assert.equal(r.privacySourceUrl,r.sourceUrl);assert.match(r.privacyResponseSha256,/^[a-f0-9]{64}$/);assert.ok(!Number.isNaN(Date.parse(r.privacyCheckedAt)));assert.ok(r.privacyCards.length);for(const c of r.privacyCards)assert.ok(['Data Used to Track You','Data Linked to You','Data Not Linked to You','Data Not Collected','No Details Provided'].includes(c.type),c.type);if(r.privacyStatus==='not-provided')assert.ok(r.privacyCards.every(c=>c.type==='No Details Provided'));}}});
