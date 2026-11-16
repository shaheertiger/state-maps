# Vaultaire — new Japanese guides (JP Semrush, 2026-11-16)

These guides were picked from the JP organic positions export and follow the structure of the four Japanese pages that rank best today:
`/ja/gaido/iphone-kakushi-shashin/` (#1 for 写真 非表示), `/ja/gaido/iphone-shashin-kakusu/`, `/ja/gaido/iphone-shashin-rokku/` (#1–3 for 写真 ロック), and `/ja/guides/stop-icloud-photos-syncing-other-devices/`.

## Why these topics

The data shows two kinds of Japanese page. Pages written natively for Japanese readers under `/ja/gaido/`, built with the full structure, rank in the top 5. Big Japanese keyword groups that land on thin pages translated from English under `/ja/guides/` sit at positions 20–90. Each new guide takes one of those keyword groups.

| New page | Keyword group (vol/mo, current best position) | Page ranking today |
|---|---|---|
| `/ja/gaido/iphone-apuri-kakusu/` | 23,340 — アプリ 非 表示 12,100 (p30), iphone アプリ 非 表示 9,900 (p21) | `/ja/guides/hide-apps-screen-time-iphone/` |
| `/ja/gaido/iphone-shashin-fukugen/` | 34,060 (61 kw) — 写真 復元 iphone 5,400 (p88), iphone 削除 した 写真 復元 4,400 (p25) | `/ja/guides/iphone-photo-recovery-after-delete/` |
| `/ja/gaido/iphone-private-browse/` | 26,670 — プライベート ブラウズ 解除 8,100 (p24), プライベート ブラウズ モード 8,100 (p50) | `/ja/guides/iphone-safari-private-browsing/` |
| `/ja/gaido/iphone-shashin-ichi-joho/` | 6,650 — iphone 写真 位置 情報 2,400 (p18), iphone カメラ 位置 情報 1,000 (p25) | `/ja/gaido/remove-location-metadata-iphone-photos/` + `/ja/guides/turn-off-photo-location-sharing-iphone/` |
| `/ja/gaido/icloud-kyoyu-album/` | 7,100 — iphone 共有 アルバム と は 2,900 (p49), icloud 共有 アルバム 1,900 (p36) | `/ja/guides/icloud-shared-album-privacy/` |

**Avoid cannibalization:** when a new page goes live, 301 the old page in the right-hand column to it (or set its canonical to the new URL). Otherwise two Vaultaire pages compete for the same query.

Next candidates from the same export: iphone 下取り 準備 (9,900, p73), フォルダ に パスワード を かける (6,600, p42), エンド ツー エンド と は (8,100, p49), iphone ファミリー 共有 解除 (2,400, p58).

## Structure every page follows (copied from the ranking pages)

1. Breadcrumbs → `feature-hero`: hero image, H1 with 「（2026年完全ガイド）」, `hero-lead`, `hero-actions` + `ios-handoff` QR card
2. A direct-answer paragraph with an inline link to a sibling guide
3. `aside.guide-intent-answer`: 「すぐわかる答え」 with a 4-item `dl` grid
4. Two intro paragraphs → `verdict-box` (Vaultaire positioning)
5. `h2#quick-answer` 「簡潔な答え：…」 with the main keyword phrases in bold
6. An H2 explaining how the concepts differ, plus a `guide-data-table`
7. An H2 for the built-in method, with `h3` 「ステップ1：…」 steps (these feed the HowTo schema)
8. An H2 on finding things or troubleshooting (ordered list), then an H2 on other methods (H3 for each)
9. A comparison H2 with a `compare-table`
10. 「確認ポイント」: H3 確認1–3, each ending in 「結果：」, then 「これが意味すること」
11. Threat model (第1–3段階) + `compare-table#threat-matrix`
12. Vaultaire H2 with H3 steps → よくある間違い → `section.guide-sources`
13. よくある質問 (H3/P pairs, which feed the FAQPage schema) → `guide-lockout-links` → 結論 → 関連記事 → `feature-cta`

Head: the same meta, OG and Twitter tags, canonical, `og:locale ja_JP`, and JSON-LD for Article (same author and publisher), HowTo, FAQPage and BreadcrumbList. The schema is generated from the body, so it always matches what's on the page.

## Files

- `src/*.html`: article bodies plus a META JSON header. **Edit these.**
- `<slug>/index.html`: the full built pages
- `build.py`: rebuild with `python3 build.py src .` (needs `beautifulsoup4`)

## Before publishing

- Hero images don't exist yet: `assets/guides/<slug>/hero.webp` (800×450).
- The core/feature/guides stylesheets and the site header and footer come from your site template. They're left out here, the same way each page's hashed CSS is.
- hreflang lists `ja` only, because no other language versions exist for these slugs yet.
- iOS menu wording changes between versions. Check each step on a current iPhone before publishing.
