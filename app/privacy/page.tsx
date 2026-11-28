import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy", description: "What these fit and sizing guides collect (as little as possible): calculators run in your browser, analytics are cookie-free.", alternates: { canonical: "/privacy/" } };

export default function Privacy() {
  return (
    <InfoPage title="Privacy" path="/privacy/">
      <p className="lede">We collect as little as possible.</p>
      <h2>Tools</h2>
      <p>Our calculators run entirely in your browser. Measurements you type are never sent to us or anyone else.</p>
      <h2>Analytics</h2>
      <p>
        We may use privacy-focused, cookie-free analytics (Cloudflare Web Analytics) to count page views. It doesn&rsquo;t use cookies or
        build a profile of you. Our hosting provider keeps standard server logs for security.
      </p>
      <h2>Shopping links</h2>
      <p>
        When you follow a shopping link to a retailer such as Amazon, that retailer&rsquo;s own privacy policy applies and it may set
        cookies to credit the referral.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about privacy: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </InfoPage>
  );
}
