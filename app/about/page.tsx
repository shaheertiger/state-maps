import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "About", description: `What ${SITE.name} is, and why it exists.`, alternates: { canonical: "/about/" } };

export default function About() {
  return (
    <InfoPage title={`About ${SITE.name}`} path="/about/">
      <p className="lede">
        {SITE.name} answers three questions people ask right before they buy: how should this fit, will this fit that, and does this
        brand run small?
      </p>
      <p>
        Most fit advice is buried in long articles or scattered across forum threads. We put the answer first, then a point-by-point
        checklist you can use in a fitting room or at home, with concrete measurements rather than vague advice.
      </p>
      <h2>Why &ldquo;State Maps&rdquo;?</h2>
      <p>
        Every guide here maps where something should sit on your body: the shoulder seam of a jacket, the toe room in a shoe, the band
        of a bra. Those fit maps, and the measurements behind them, are what the site is built on. We cover fit and sizing, not
        geography.
      </p>
      <h2>What you&rsquo;ll find here</h2>
      <ul>
        <li><Link href="/fit/">Fit guides</Link>: how clothing, shoes, jewelry and gear should fit, point by point.</li>
        <li><Link href="/will-it-fit/">Will it fit?</Link>: yes-or-no answers worked out from the dimensions of both things.</li>
        <li><Link href="/sizing/">Brand sizing</Link>: how brands size, taken only from their own published charts.</li>
        <li><Link href="/tools/">Tools</Link>: free calculators that run in your browser.</li>
      </ul>
      <h2>How we keep it honest</h2>
      <p>
        We don&rsquo;t publish invented reviews or claim to have tested products we haven&rsquo;t. Size charts link to their source with
        the date we last checked it. Read more in <Link href="/methodology/">how we write our guides</Link>.
      </p>
      <p>
        The site is supported by affiliate links; see our <Link href="/affiliate-disclosure/">affiliate disclosure</Link>.
      </p>
    </InfoPage>
  );
}
