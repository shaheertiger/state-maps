import { ToolLayout, toolMeta } from "@/components/ToolLayout";
import { ShoeConverter } from "@/components/tools/ShoeConverter";
import { SizeTable } from "@/components/SizeTable";
import { shoeFromLength } from "@/lib/sizing";

export const metadata = toolMeta("shoe-size-converter", "Convert shoe sizes between US men's, US women's, UK, EU, kids' and foot length in cm. Free converter and full chart.");
const fmt = (n: number) => (Number.isInteger(n) ? String(n) : `${Math.floor(n)}½`);

export default function Page() {
  const rows = [];
  for (let men = 4; men <= 15; men += 0.5) {
    const L = (men + 22) / 3;
    const r = shoeFromLength(L);
    rows.push([fmt(men), fmt(r.usWomen), fmt(r.uk), fmt(r.eu), String(r.cm), (L).toFixed(1)]);
  }
  return (
    <ToolLayout
      slug="shoe-size-converter"
      h1="Shoe size converter"
      intro="Convert between US men's, US women's, UK, EU and kids' sizes, or start from your foot length. The chart below shows every half size side by side."
      guides={["shoes", "running-shoes", "sneakers", "boots", "heels", "sandals"]}
      faqs={[
        { q: "How do I convert women's shoe sizes to men's?", a: "US women's sizes run about 1½ sizes larger than men's for the same foot, so a women's 9 is roughly a men's 7½." },
        { q: "Is a UK shoe size the same as US?", a: "No. UK sizes run about half a size smaller than US men's sizes and about two sizes smaller than US women's." },
        { q: "How do I measure my foot length?", a: "Stand on a sheet of paper with your heel against a wall, mark the tip of your longest toe, and measure from the wall to the mark. Measure both feet in the afternoon and use the longer one." },
        { q: "Why are EU sizes different between brands?", a: "EU sizes are based on the length of the shoe's last rather than your foot, and brands add different amounts of room, so the same foot can be a 42 in one brand and a 43 in another." },
        { q: "How much room should I leave in a shoe?", a: "About a thumb's width, roughly ⅜–½ in (1–1.5 cm), between your longest toe and the end of the shoe." },
      ]}
    >
      <ShoeConverter />
      <h2>Shoe size chart</h2>
      <SizeTable
        table={{
          caption: "Adult shoe sizes by system, with foot length",
          headers: ["US men's", "US women's", "UK", "EU", "Foot (cm)", "Foot (in)"],
          rows,
          note: "Approximate, based on the common conventions: US men's = 3 × foot length in inches − 22; US women's = men's + 1½; UK = US men's − ½. EU sizes vary by brand.",
        }}
      />
    </ToolLayout>
  );
}
