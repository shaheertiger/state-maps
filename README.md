# Private Photo Guide

Vercel-ready Next.js 15 site focused exclusively on iPhone photo privacy. Includes nine article routes, topic hub, checklist, Radix UI accordions, structured data, sitemap, robots, and DualMark Markdown twins.

## Install and deploy

```sh
npm install
npm run typecheck
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` to the real canonical HTTPS domain in Vercel. The existing default is an example and must be updated before launch if you use a different domain.

## DualMark

`@dualmark/nextjs` middleware handles negotiation. `app/md/[...path]/route.ts` uses the same content records as the HTML pages. `/llms.txt` lists all guides. After deployment run `npx @dualmark/cli verify https://YOUR_DOMAIN/blog/how-to-hide-photos-iphone`.

## Editorial QA

Verify iOS instructions, replace placeholder brand/contact/legal details, test accessibility and performance, run the production build, and check SEO URLs before deployment. No claim of tested competitor rankings or AI citations is implied.
