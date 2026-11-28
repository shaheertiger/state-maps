import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Spotted a wrong measurement or an out-of-date size chart? How to get in touch about these fit and sizing guides.", alternates: { canonical: "/contact/" } };

export default function Contact() {
  return (
    <InfoPage title="Contact" path="/contact/">
      <p className="lede">Found an error, a size chart that&rsquo;s out of date, or a question we haven&rsquo;t answered? Email us.</p>
      <p>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
      <p>
        If you&rsquo;re reporting a correction, include the page address and what should change. If you&rsquo;re a brand, send a link to
        your current official size chart.
      </p>
    </InfoPage>
  );
}
