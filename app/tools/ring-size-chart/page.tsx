import { ToolLayout, toolMeta } from "@/components/ToolLayout";
import { RingSizer, PrintableSizer } from "@/components/tools/RingSizer";
import { SizeTable } from "@/components/SizeTable";
import { RING_SIZES, ringCirc, ringDiameter, ukRing } from "@/lib/sizing";

export const metadata = toolMeta("ring-size-chart", "Ring size chart with US, UK and EU sizes by inside diameter and circumference, a size finder, and a printable ring sizer.");
const show = (n: number) => (Number.isInteger(n) ? String(n) : `${Math.floor(n)}½`);

export default function Page() {
  return (
    <ToolLayout
      slug="ring-size-chart"
      h1="Ring size chart and printable sizer"
      intro="Find your ring size from your finger's circumference or a ring's inside diameter, then check it against the full US, UK and EU chart. You can also print a sizer to test a ring you already own."
      guides={["ring", "engagement-ring", "wedding-band", "bracelet"]}
      faqs={[
        { q: "How do I measure my ring size at home?", a: "Wrap a strip of paper or string around the base of your finger, mark where it overlaps, and measure the length in millimeters. That's your circumference. Make sure it can slide over your knuckle." },
        { q: "What's the most common ring size?", a: "Sizes around 6–7 are commonly cited for women and 9–10 for men, but finger sizes vary widely, so measure rather than guess." },
        { q: "Should I size up for a wide band?", a: "Often yes. Bands about 6 mm or wider sit more snugly, so many people go up a quarter or half size." },
        { q: "When is the best time to measure ring size?", a: "In the afternoon at a comfortable room temperature. Fingers are smaller in the cold and first thing in the morning, and larger in heat or after exercise." },
        { q: "How do EU ring sizes work?", a: "EU (ISO) ring sizes are the inside circumference in millimeters, so a 54 is about 54 mm around, which is roughly a US 7." },
      ]}
    >
      <RingSizer />
      <h2>Ring size chart</h2>
      <SizeTable
        table={{
          caption: "US, UK and EU ring sizes with inside diameter and circumference",
          headers: ["US", "UK / AU", "EU / ISO", "Diameter (mm)", "Circumference (mm)"],
          rows: RING_SIZES.map((s) => [show(s), ukRing(s), String(Math.round(ringCirc(s))), ringDiameter(s).toFixed(1), ringCirc(s).toFixed(1)]),
          note: "US sizes use the standard formula: inside diameter = 11.63 mm + 0.8128 mm per size. UK letters are the nearest equivalents; individual jewelers' charts can differ slightly.",
        }}
      />
      <h2 className="no-print">Printable ring sizer</h2>
      <p className="no-print">Print this page and use the circles at the bottom to size a ring that already fits you.</p>
      <PrintableSizer />
    </ToolLayout>
  );
}
