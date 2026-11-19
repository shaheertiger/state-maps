import { ToolLayout, toolMeta } from "@/components/ToolLayout";
import { BraCalculator } from "@/components/tools/BraCalculator";
import { SizeTable } from "@/components/SizeTable";
import { US_CUPS, UK_CUPS, EU_CUPS } from "@/lib/sizing";

export const metadata = toolMeta("bra-size-calculator", "Find your bra size from two measurements. Get US, UK, EU and French sizes plus sister sizes, with tips on checking the fit.");

export default function Page() {
  return (
    <ToolLayout
      slug="bra-size-calculator"
      h1="Bra size calculator"
      intro="Measure your underbust and bust, and get your starting size in US, UK, EU and French sizing, plus the sister sizes to try if the band doesn't feel right."
      guides={["bra", "sports-bra", "push-up-bra", "strapless-bra"]}
      faqs={[
        { q: "How do I measure my bra size?", a: "Measure snugly around your ribcage directly under your bust for the band, keeping the tape level. Then measure loosely around the fullest part of your bust. Wear an unpadded bra or none, and stand straight." },
        { q: "How is cup size calculated?", a: "Subtract your band size from your bust measurement. Each inch of difference is one cup: 1 in is an A, 2 in a B, 3 in a C, 4 in a D, 5 in a DD." },
        { q: "What are sister sizes?", a: "Sizes with the same cup volume on a different band. Going down a band and up a cup (34C to 32D), or up a band and down a cup (34C to 36B), keeps the cup volume roughly the same." },
        { q: "Why is my calculated size different from what I wear?", a: "Brands size differently, and many people wear a band that's too big. Use the result as a starting point and judge by fit: a level, snug band and smooth cups with no gaps or spilling." },
        { q: "Should I use the add-4-inches method?", a: "Most brands now use the modern method, which uses your underbust measurement as the band. Some US department-store brands still size with the older method, so it's worth trying both if you're between sizes." },
      ]}
    >
      <BraCalculator />
      <h2>How to measure</h2>
      <ol className="steps">
        <li>Wear a thin, unpadded bra or no bra, and stand straight with your arms relaxed.</li>
        <li>Wrap a soft tape around your ribcage directly under your bust. Keep it level and snug, and breathe out. This is your underbust.</li>
        <li>Measure around the fullest part of your bust, keeping the tape level and loose enough not to compress anything.</li>
        <li>Enter both numbers above. If you&rsquo;re between bands, try both the band below and above with the matching sister size.</li>
      </ol>
      <h2>Cup letters by system</h2>
      <SizeTable
        table={{
          caption: "Bust minus band, and the cup letter in each system",
          headers: ["Difference (in)", "US", "UK", "EU"],
          rows: US_CUPS.slice(1, 11).map((c, i) => [String(i + 1), c, UK_CUPS[i + 1], EU_CUPS[i + 1]]),
          note: "US cup naming after DD varies between brands (DDD, F or E). EU cups step every 2 cm.",
        }}
      />
    </ToolLayout>
  );
}
