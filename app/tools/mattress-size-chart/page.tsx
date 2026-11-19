import Link from "next/link";
import { ToolLayout, toolMeta } from "@/components/ToolLayout";
import { BedChecker } from "@/components/tools/BedChecker";
import { SizeTable } from "@/components/SizeTable";
import { BEDS } from "@/lib/sizing";
import { compatPages } from "@/lib/compat";
import { compatPath } from "@/lib/site";

export const metadata = toolMeta("mattress-size-chart", "Every standard US mattress size in inches and cm, plus a checker that tells you whether a mattress fits a frame or a sheet fits a mattress.");

export default function Page() {
  const bedding = compatPages().filter((p) => p.pair.hub === "bedding");
  return (
    <ToolLayout
      slug="mattress-size-chart"
      h1="Mattress, sheet and bed frame size chart"
      intro="Standard US mattress sizes, and a quick checker for the two questions people ask most: will this mattress fit that frame, and will these sheets fit this bed?"
      faqs={[
        { q: "What's the difference between a king and a California king?", a: "A king is 76 × 80 in; a California king is 72 × 84 in, so it's 4 in narrower and 4 in longer. Their sheets and frames aren't interchangeable." },
        { q: "Is a full the same as a double?", a: "Yes. Full and double are two names for the same 54 × 75 in mattress." },
        { q: "What's the difference between a twin and a twin XL?", a: "Both are 38 in wide; a twin XL is 5 in longer (80 in versus 75 in). Twin XL is common in college dorms." },
        { q: "Do two twin XLs make a king?", a: "Yes. Two twin XL mattresses side by side measure 76 × 80 in, the same as a king, which is how split-king beds work." },
        { q: "What about mattress depth?", a: "Fitted sheets also need a deep enough pocket. Measure your mattress height, including any topper, and choose sheets with a pocket at least that deep." },
      ]}
    >
      <BedChecker />
      <h2>Standard mattress sizes</h2>
      <SizeTable
        table={{
          caption: "US mattress dimensions",
          headers: ["Size", "Inches (W × L)", "Centimeters (W × L)"],
          rows: BEDS.map((b) => [b.name, `${b.w} × ${b.l}`, `${Math.round(b.w * 2.54)} × ${Math.round(b.l * 2.54)}`]),
          note: "Nominal sizes; individual mattresses can be up to about an inch smaller. Bed frames and fitted sheets are made to these same dimensions.",
        }}
      />
      {bedding.length > 0 && (
        <>
          <h2>Common questions, answered</h2>
          <ul className="link-cols">
            {bedding.map((p) => (
              <li key={p.slug}>
                <Link href={compatPath(p.slug)}>{p.h1}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </ToolLayout>
  );
}
