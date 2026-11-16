"""Wrap Japanese article fragments in the exact Vaultaire /ja/gaido/ page chrome.
Usage: python3 -I build.py SRC_DIR OUT_DIR"""
import sys, os, re, json, html
from urllib.parse import quote
from bs4 import BeautifulSoup

SRC, OUT = sys.argv[1], sys.argv[2]
BASE = "https://vaultaire.app"
DATE = "2026-11-16"
SMS = "sms:?&amp;body=Vaultaire%E3%82%92%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%3A%20https%3A%2F%2Fvaultaire.app%2Fgo%2Fapp-store%3Fct%3Dweb_sms"
AUTHOR = {"@type": "Person", "name": "Rasty Turek", "url": "https://turek.co", "jobTitle": "Founder & Engineer",
          "sameAs": ["https://turek.co", "https://www.linkedin.com/in/synopsi/", "https://x.com/synopsi"]}
PUBLISHER = {"@type": "Organization", "name": "Wraxle LLC", "alternateName": "Vaultaire", "url": BASE,
             "logo": {"@type": "ImageObject", "url": BASE + "/assets/vault-logo.png", "width": 512, "height": 512}}
LOCKOUT = '''<aside class="guide-lockout-links" data-guide-lockout-links="ja" aria-labelledby="guide-lockout-links-title">
  <p id="guide-lockout-links-title" class="guide-lockout-links-title">パスワードのヘルプ</p>
  <ul>
    <li><a class="inline-link" href="https://vaultaire.app/ja/gaido/shashin-kinko-password-wasureta/" data-cta-name="guide_lockout_link">フォトボルトのパスワードを忘れた？回復方法を解説</a></li>
    <li><a class="inline-link" href="https://vaultaire.app/ja/gaido/iphone-folder-password-hogo/" data-cta-name="guide_folder_link">iPhoneでフォルダをパスワード保護する方法</a></li>
  </ul>
</aside>'''

def appstore(slug, prefix):
    ct = prefix + "_" + slug.replace("-", "_")
    return f"{BASE}/go/app-store?ct={ct}&amp;src={quote('/ja/gaido/' + slug + '/', safe='')}"

def text(el):
    return re.sub(r"\s+", " ", el.get_text(" ", strip=True)).replace(" 。", "。").replace(" 、", "、")

def jsonld(obj):
    return '  <script type="application/ld+json">\n' + json.dumps(obj, ensure_ascii=False, indent=2) + '\n  </script>'

def build(path):
    raw = open(path, encoding="utf-8").read()
    m = re.match(r"\s*<!--META\s*(\{.*?\})\s*-->\s*(.*)", raw, re.S)
    meta, body = json.loads(m.group(1)), m.group(2)
    slug = meta["slug"]; url = f"{BASE}/ja/gaido/{slug}/"
    body = body.replace("{{APPSTORE}}", appstore(slug, "web_g")).replace("<!--LOCKOUT-->", LOCKOUT)
    soup = BeautifulSoup(body, "html.parser")

    # HowTo: every <h3>ステップN：…</h3> plus the paragraphs/lists until the next heading
    steps = []
    for h3 in soup.find_all("h3"):
        sm = re.match(r"ステップ\s*\d+\s*[：:]\s*(.+)", text(h3))
        if not sm: continue
        parts = []
        for sib in h3.find_next_siblings():
            if sib.name in ("h2", "h3", "aside", "div", "section"): break
            parts.append(text(sib))
        steps.append({"@type": "HowToStep", "position": len(steps) + 1, "name": sm.group(1), "text": " ".join(parts)})

    # FAQ: <h3>/<p> pairs after the よくある質問 <h2>
    faqs = []
    faq_h2 = next((h for h in soup.find_all("h2") if text(h) == "よくある質問"), None)
    if faq_h2:
        for sib in faq_h2.find_next_siblings():
            if sib.name == "h2" or (sib.name == "aside"): break
            if sib.name == "h3":
                ans = []
                for s2 in sib.find_next_siblings():
                    if s2.name in ("h2", "h3", "aside"): break
                    ans.append(text(s2))
                faqs.append({"@type": "Question", "name": text(sib), "acceptedAnswer": {"@type": "Answer", "text": " ".join(ans)}})

    hero_img = f"{BASE}/assets/guides/{slug}/hero.webp"
    article_ld = {"@context": "https://schema.org", "@type": "Article", "headline": meta["title"], "description": meta["description"],
                  "author": AUTHOR, "image": hero_img, "publisher": PUBLISHER, "datePublished": DATE, "dateModified": DATE,
                  "mainEntityOfPage": url, "inLanguage": "ja"}
    if meta.get("citations"):
        article_ld["citation"] = [{"@type": "CreativeWork", "name": c["name"], "url": c["url"]} for c in meta["citations"]]
    lds = [article_ld]
    if steps:
        lds.append({"@context": "https://schema.org", "@type": "HowTo", "name": meta["howto_name"], "description": meta["howto_description"],
                    "totalTime": meta.get("total_time", "PT5M"), "step": steps})
    if faqs:
        lds.append({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs})
    lds.append({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "ホーム", "item": BASE + "/ja/"},
        {"@type": "ListItem", "position": 2, "name": "ガイド", "item": BASE + "/ja/gaido/"},
        {"@type": "ListItem", "position": 3, "name": meta["breadcrumb"], "item": url}]})

    e = html.escape
    page = f'''<!DOCTYPE html>
<html lang="ja" dir="ltr" data-handoff-label="リンクをSMSで送る" data-handoff-sms-prefix="Vaultaireをインストール:" data-handoff-card-title="VaultaireはiPhoneとiPadのアプリです" data-handoff-card-subtitle="iPhoneカメラをコードに向けてインストール — アカウント不要。" data-handoff-card-link="またはリンクをSMSで送る" data-handoff-qr-alt="QRコード — iPhoneカメラでスキャンしてVaultaireをインストール">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- core / feature / guides stylesheets: injected by the site template (same as every /ja/gaido/ page) -->
  <title>{e(meta["title"])}</title>
  <meta name="description" content="{e(meta["description"])}">
  <meta property="og:title" content="{e(meta.get("og_title", meta["title"]))}">
  <meta property="og:description" content="{e(meta["og_description"])}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="{url}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="{url}">
  <meta property="og:site_name" content="Vaultaire">
  <meta property="og:image" content="{BASE}/assets/social-share.png">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Vaultaire — local-first encrypted vault for iOS">
  <meta name="twitter:title" content="{e(meta["title"])}">
  <meta name="twitter:description" content="{e(meta["hero_lead"])}">
  <meta name="twitter:image" content="{BASE}/assets/social-share.png">
  <meta name="twitter:image:alt" content="Vaultaire — local-first encrypted vault for iOS">
  <meta name="twitter:site" content="@vaultaire_app">
  <meta name="twitter:creator" content="@synopsi">
  <meta property="article:published_time" content="{DATE}T00:00:00Z">
  <meta property="article:modified_time" content="{DATE}T00:00:00Z">
  <meta name="theme-color" content="#20233C" media="(prefers-color-scheme: dark)">
  <meta name="theme-color" content="#D1D1E9" media="(prefers-color-scheme: light)">
  <meta property="og:locale" content="ja_JP">
  <link rel="alternate" type="application/rss+xml" title="Vaultaire Updates" href="{BASE}/feed.xml">
  <link rel="alternate" hreflang="ja" href="{url}">
{chr(10).join(jsonld(x) for x in lds)}
</head>
<body>
  <main id="main-content">
    <div class="container">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="{BASE}/ja/">ホーム</a><span>/</span>
        <a href="{BASE}/ja/gaido/">ガイド</a><span>/</span>
        {e(meta["h1"])}
      </nav>

      <article class="feature-article">
        <div class="feature-hero">
          <img src="{hero_img}" alt="{e(meta["hero_alt"])}" width="800" height="450" class="guide-hero-img" loading="eager" decoding="async" fetchpriority="high">
          <h1>{e(meta["h1"])}</h1>
          <p class="hero-lead">{e(meta["hero_lead"])}</p>
        <div class="hero-actions guide-hero-actions"><a class="btn btn-primary" data-appstore-card="" href="{appstore(slug, "web_gb")}">アプリを入手</a><div class="ios-handoff" data-ios-handoff=""><div class="ioh-card"><img class="ioh-qr" src="{BASE}/assets/qr-appstore.png" width="104" height="104" loading="lazy" alt="QRコード — iPhoneカメラでスキャンしてVaultaireをインストール"><span class="ioh-meta"><span class="ioh-h">VaultaireはiPhoneとiPadのアプリです</span><span class="ioh-s">iPhoneカメラをコードに向けてインストール — アカウント不要。</span><a class="ioh-text" data-cta-name="download_app_handoff" href="{SMS}">またはリンクをSMSで送る</a></span></div></div></div></div>

{body.strip()}

        <div class="feature-cta">
          <a href="{appstore(slug, "web_g")}" class="btn btn-primary">{e(meta["cta_text"])}</a>
        </div>
      </article>
    </div>
  </main>
</body>
</html>
'''
    os.makedirs(os.path.join(OUT, slug), exist_ok=True)
    open(os.path.join(OUT, slug, "index.html"), "w", encoding="utf-8").write(page)
    plain = BeautifulSoup(body, "html.parser").get_text("", strip=True)
    print(f"{slug}: {len(plain):,} chars, h2={len(soup.find_all('h2'))}, steps={len(steps)}, faqs={len(faqs)}, tables={len(soup.find_all('table'))}")

for f in sorted(os.listdir(SRC)):
    if f.endswith(".html"): build(os.path.join(SRC, f))
