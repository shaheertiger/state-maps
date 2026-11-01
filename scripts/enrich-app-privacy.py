"""Read developer-reported privacy cards from the same public App Store sources.
No authentication, private endpoints, third-party sites, reviews, artwork or app descriptions are used.
"""
import concurrent.futures, datetime, gzip, hashlib, html, json, re, threading, time, urllib.error, urllib.request
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
PACE=threading.Lock(); last_request=0.0
def pace():
    global last_request
    with PACE:
        delay=max(0,0.2-(time.monotonic()-last_request))
        if delay:time.sleep(delay)
        last_request=time.monotonic()
def clean(s):return ' '.join(html.unescape(re.sub('<[^>]+>',' ',s)).split())
def read_one(app):
    for attempt in range(3):
        pace()
        try:
            req=urllib.request.Request(app['sourceUrl'],headers={'User-Agent':'statemaps.net-public-catalog/1.0','Accept-Encoding':'gzip','Accept-Language':'en-US,en;q=0.9'})
            with urllib.request.urlopen(req,timeout=40) as response:
                raw=response.read()
                if response.headers.get('Content-Encoding')=='gzip':raw=gzip.decompress(raw)
            page=raw.decode('utf-8');m=re.search(r'<section\b[^>]*\bid="privacyTypes"[^>]*>(.*?)</section>',page,re.S)
            cards=[]
            if m:
                for heading,body in re.findall(r'<h3\b[^>]*>(.*?)</h3>(.*?)(?=<h3\b|$)',m.group(1),re.S):
                    categories=list(dict.fromkeys(clean(item) for item in re.findall(r'<li\b[^>]*>(.*?)</li>',body,re.S) if clean(item)))
                    cards.append({'type':clean(heading),'categories':categories})
            return app['id'],{'privacyStatus':'reported' if cards else 'not-extracted','privacyCards':cards,'privacyCheckedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'privacySourceUrl':app['sourceUrl'],'privacyResponseSha256':hashlib.sha256(raw).hexdigest()}
        except urllib.error.HTTPError as error:
            if error.code in (403,429):
                wait=min(120,int(error.headers.get('Retry-After','30')) if error.headers.get('Retry-After','').isdigit() else 30)
                time.sleep(wait)
                if attempt==2:return app['id'],{'privacyStatus':f'http-{error.code}','privacyCards':[]}
            elif error.code in (404,410):return app['id'],{'privacyStatus':f'http-{error.code}','privacyCards':[]}
            else:time.sleep(2**attempt)
        except Exception:time.sleep(2**attempt)
    return app['id'],{'privacyStatus':'fetch-failed','privacyCards':[]}
def main():
    apps=json.loads((ROOT/'data/apple-apps.json').read_text(encoding='utf-8'));cache=ROOT/'data/apple-privacy-cache.json'
    results=json.loads(cache.read_text(encoding='utf-8')) if cache.exists() else {}
    pending=[a for a in apps if str(a['id']) not in results];completed=0
    with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:
        for app_id,result in pool.map(read_one,pending):
            results[str(app_id)]=result;completed+=1
            if completed%25==0:
                cache.write_text(json.dumps(results,ensure_ascii=False),encoding='utf-8')
                print(f'{len(results)}/{len(apps)} privacy sources checked; {sum(r["privacyStatus"]=="reported" for r in results.values())} labels extracted',flush=True)
            if sum(r['privacyStatus'] in ('http-403','http-429') for r in results.values())>=20:raise SystemExit('Public source access is rate-limited or denied; stopping instead of bypassing it.')
    cache.write_text(json.dumps(results,ensure_ascii=False),encoding='utf-8')
    for app in apps:
        result=results[str(app['id'])]
        if result.get('privacyCards') and all(c['type']=='No Details Provided' for c in result['privacyCards']):result={**result,'privacyStatus':'not-provided'}
        app.update(result)
    (ROOT/'data/apple-apps.json').write_text(json.dumps(apps,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
    print('Saved source-backed privacy labels; unavailable or unparsed labels remain explicitly unknown.',flush=True)
if __name__=='__main__':main()
