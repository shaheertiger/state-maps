import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "Affiliate Disclosure", description: "How these free fit and sizing guides are paid for: affiliate links that never change the price you pay or the fit advice.", alternates: { canonical: "/affiliate-disclosure/" } };

export default function Disclosure() {
  return (
    <InfoPage title="Affiliate disclosure" path="/affiliate-disclosure/">
      <p className="lede">
        This site is free to read. We pay for it through affiliate links: if you buy something after clicking a shopping link on this
        site, the retailer may pay us a commission. The price you pay is the same.
      </p>
      <p>
        As an Amazon Associate we earn from qualifying purchases. Shopping links are marked with a note next to them, and they never
        change our fit advice: the guides would say the same thing without them.
      </p>
      <p>
        Our shopping suggestions describe types of product and the features that matter for fit, rather than paid placements. No brand
        pays to appear on this site.
      </p>
    </InfoPage>
  );
}
