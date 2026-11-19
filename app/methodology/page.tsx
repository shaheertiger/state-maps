import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "How We Write Our Guides", description: "Where our fit advice, size charts and dimensions come from, and the rules every page follows.", alternates: { canonical: "/methodology/" } };

export default function Methodology() {
  return (
    <InfoPage title="How we write our guides" path="/methodology/">
      <p className="lede">Every page on this site follows the same rules, and the site&rsquo;s build checks several of them automatically.</p>
      <h2>Fit guides</h2>
      <p>
        Each guide starts from the questions people actually search for, such as &ldquo;should running shoes be tight or loose&rdquo;,
        and answers them with the fit conventions used by tailors, shoe fitters, bra fitters and equipment makers. Each one has a
        short answer, a checklist of body points with what too tight and too loose look like, how to measure yourself, and fixes for
        common problems.
      </p>
      <p>
        Size conversion tables appear only where a widely published standard exists, like ring sizes, hat sizes or bra band
        conventions, and they&rsquo;re labelled approximate where brands vary.
      </p>
      <h2>Will it fit?</h2>
      <p>
        These answers are calculated, not written by hand. Each page is generated from a dataset of dimensions, and the yes-or-no
        verdict is worked out from those numbers. If a dimension changes, the answer, table and drawing update together. Dimensions for
        vehicles, products and devices come from manufacturers or recognised standards, and we list the sources on each page.
      </p>
      <h2>Brand sizing</h2>
      <p>
        We publish a brand only when we can read its own size chart or fit advice. Every brand page links to those sources and shows
        the date we last checked them. We don&rsquo;t summarise forum opinions or write &ldquo;customers say&rdquo;.
      </p>
      <h2>Health and safety items</h2>
      <p>
        For items like retainers, compression socks, slings, helmets and life jackets, we give general fit information only and point
        you to the right professional. That information isn&rsquo;t medical advice.
      </p>
      <h2>Corrections</h2>
      <p>
        Spotted something wrong or out of date? <Link href="/contact/">Tell us</Link> and we&rsquo;ll check it and update the page.
      </p>
    </InfoPage>
  );
}
