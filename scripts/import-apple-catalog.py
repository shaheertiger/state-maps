"""Fetch distinct iPhone software records from Apple's documented public Search API.

No app descriptions, artwork, ratings, prices, or inferred security features are published.
Requests are spaced below the documented approximate 20 calls/minute limit.
"""
import argparse, datetime, hashlib, json, re, time, unicodedata, urllib.parse, urllib.request
from pathlib import Path

TERMS = ['photo vault','private photos','password manager','authenticator','secure messenger','encrypted notes','document scanner','cloud storage','private browser','photo manager','video storage','journal diary','PDF editor','file manager','family organizer','budget planner','banking','secure email','contacts backup','calendar planner','health tracker','medical records','voice recorder','photo backup','security camera','privacy protection','digital wallet','expense tracker','business documents','receipt scanner','photo albums','VPN privacy','two factor authentication','secure documents','personal finance','screen time','parental control','private journal','encrypted storage','notes organizer','task manager','document signing','password generator','photo transfer','video editor','social networking','messaging chat','email client','work schedule','habit tracker','investment portfolio','insurance documents','travel documents','passport scanner','tax organizer','personal diary','fitness log','baby tracker','medication reminder','therapy journal','period tracker','sleep tracker','home inventory','address book','family calendar','photo organizer','photo collage','video recorder','audio notes','meeting recorder','transcription notes','business scanner','PDF scanner','PDF reader','digital notebook','handwriting notes','expense manager','money manager','savings tracker','bill tracker','invoice maker','bookkeeping','credit union','mobile banking','stock tracker','crypto wallet','payment wallet','secure chat','team messaging','work chat','dating app','private dating','family messaging','location sharing','family safety','emergency contacts','personal safety','device security','network scanner','WiFi analyzer','privacy browser','ad blocker','Safari extensions','bookmark manager','web clipper','reading list','photo cleaner','duplicate photos','photo metadata','EXIF editor','watermark photos','image editor','photo captions','camera manual','video compression','file sharing','document storage','contact manager','calendar reminders','project planner','time tracker','workout journal','food diary','symptom tracker','blood pressure log','diabetes tracker','pregnancy tracker','caregiver organizer','patient portal','clinical records','appointment scheduler','secure collaboration','business password','identity protection','subscription tracker','warranty organizer','car documents','property inventory','household budget','couples budget','wedding planner','event organizer','family photos','baby photos','digital scrapbook','memory journal','mood diary','gratitude journal','writing notebook','student planner','study notes','research organizer','document annotation','PDF annotation','scanner OCR','text scanner','business cards','contact scanner','personal CRM','sales CRM','small business','freelancer invoices','rental property','tax receipts','expense receipts','travel expenses','trip planner','packing list','travel journal','offline maps','GPX tracker','hiking journal','running log','cycling tracker','nutrition tracker','meal planner','pet health','veterinary records','health journal','mindfulness journal','private camera','photo encryption','file encryption','secure backup','recovery codes','account security','identity wallet','document wallet','membership cards','loyalty cards','digital signature','team calendar','shift calendar','school calendar','password safe','TOTP','passkey','privacy dashboard','secure mail','private cloud','business email','email organizer','photo sharing','video sharing','family archive','personal archive','record keeper','data backup','file browser','archive manager','zip files','document converter','scan to PDF','secure fax','digital forms','inventory tracker','asset manager']

def slug(name, app_id):
    ascii_name=unicodedata.normalize('NFKD',name).encode('ascii','ignore').decode().lower()
    return (re.sub('[^a-z0-9]+','-',ascii_name).strip('-')[:65].rstrip('-') or 'iphone-app')+'-'+str(app_id)

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--target',type=int,default=4500);ap.add_argument('--resume',action='store_true');args=ap.parse_args()
    root=Path(__file__).resolve().parents[1];cache=root/'data/apple-import-cache.json'; records={};queries=[]
    if args.resume and cache.exists():
        saved=json.loads(cache.read_text(encoding='utf-8'));records={str(r['id']):r for r in saved['records']};queries=saved['queries']
    allowed={6000,6002,6005,6007,6008,6015,6013,6020,6012}
    for term in TERMS:
        if len(records)>=args.target:break
        if term in queries:continue
        url='https://itunes.apple.com/search?'+urllib.parse.urlencode({'term':term,'country':'us','media':'software','entity':'software','limit':200,'lang':'en_us','explicit':'No'})
        try:
            request=urllib.request.Request(url,headers={'User-Agent':'statemaps.net-reference-catalog/1.0'})
            with urllib.request.urlopen(request,timeout=45) as response: raw=response.read()
            payload=json.loads(raw);now=datetime.datetime.now(datetime.timezone.utc).isoformat()
            for r in payload.get('results',[]):
                if r.get('kind')!='software' or int(r.get('primaryGenreId',0)) not in allowed:continue
                devices=r.get('supportedDevices',[])
                if not any(str(d).lower().startswith('iphone') for d in devices):continue
                if not all(r.get(k) for k in ['trackId','trackName','sellerName','bundleId','version','minimumOsVersion','trackViewUrl','currentVersionReleaseDate']):continue
                ident=str(r['trackId'])
                if ident in records:continue
                source=r['trackViewUrl'].split('?')[0]
                if urllib.parse.urlparse(source).hostname!='apps.apple.com':continue
                records[ident]={'id':r['trackId'],'slug':slug(r['trackName'],r['trackId']),'name':r['trackName'],'developer':r['sellerName'],'bundleId':r['bundleId'],'category':r['primaryGenreName'],'categoryId':int(r['primaryGenreId']),'genres':r.get('genres',[]),'minimumIos':r['minimumOsVersion'],'version':r['version'],'updatedAt':r['currentVersionReleaseDate'],'releasedAt':r.get('releaseDate'),'fileSizeBytes':r.get('fileSizeBytes'),'ageRating':r.get('trackContentRating'),'languages':r.get('languageCodesISO2A',[]),'developerUrl':r.get('sellerUrl') if str(r.get('sellerUrl','')).startswith('https://') else None,'sourceUrl':source,'lookupUrl':'https://itunes.apple.com/lookup?id='+ident+'&country=us','retrievedAt':now,'importQuery':term,'responseSha256':hashlib.sha256(raw).hexdigest()}
            queries.append(term)
            cache.write_text(json.dumps({'records':list(records.values()),'queries':queries},ensure_ascii=False,indent=2),encoding='utf-8')
            print(f'{len(queries)} queries; {len(records)} distinct verified iPhone records; latest: {term}',flush=True)
        except Exception as error:print(f'Query failed ({term}): {type(error).__name__}',flush=True)
        time.sleep(3.2)
    if len(records)<args.target:raise SystemExit(f'Only {len(records)} records verified; target {args.target} not met. No placeholder records generated.')
    selected=list(records.values())[:args.target]
    (root/'data/apple-apps.json').write_text(json.dumps(selected,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
    (root/'data/apple-app-slugs.json').write_text(json.dumps([r['slug'] for r in selected],separators=(',',':')),encoding='utf-8')
    (root/'data/apple-catalog-provenance.json').write_text(json.dumps({'provider':'Apple public iTunes Search API','documentation':'https://performance-partners.apple.com/search-api','storefront':'US','pageLanguage':'en','target':args.target,'count':len(selected),'queryCount':len(queries),'queries':queries,'retrievedFrom':min(r['retrievedAt'] for r in selected),'retrievedThrough':max(r['retrievedAt'] for r in selected),'selection':'First complete, distinct iPhone software records from the listed privacy-relevant query sequence; selected genres only. No security ranking or search-volume inference.'},indent=2),encoding='utf-8')
    print(f'Wrote {len(selected)} sourced records; no translations.',flush=True)

if __name__=='__main__':main()
