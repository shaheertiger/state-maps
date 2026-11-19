import fs from "node:fs";
import path from "node:path";
import { ToolLayout, toolMeta } from "@/components/ToolLayout";
import { CarryOnChecker, type Airline } from "@/components/tools/CarryOnChecker";
import { formatDate } from "@/components/SizeTable";

export const metadata = toolMeta("carry-on-size-checker", "Enter your bag's dimensions and see which airlines accept it as a carry-on or personal item. Limits from each airline's own baggage page.");

export default function Page() {
  const file = path.join(process.cwd(), "data/airlines.json");
  const airlines: Airline[] = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : [];
  const checked = airlines.map((a) => a.checked).sort().at(-1);
  return (
    <ToolLayout
      slug="carry-on-size-checker"
      h1="Carry-on size checker"
      intro="Type in your bag's height, width and depth to see which airlines accept it in the cabin. Each limit comes from the airline's own baggage page, linked by name."
      faqs={[
        { q: "What is the standard carry-on size?", a: "For most large US airlines it's 22 × 14 × 9 in (56 × 36 × 23 cm), including wheels and handles. Some low-cost and international airlines are stricter, so check the airline you're flying." },
        { q: "Do wheels and handles count?", a: "Yes. Airlines measure the bag's outside dimensions, including wheels, handles and any expansion that's unzipped." },
        { q: "Is a personal item different from a carry-on?", a: "Yes. A personal item is a smaller bag, like a backpack or purse, that fits under the seat in front of you. Many fares include a personal item and a carry-on; some basic fares include only the personal item." },
        { q: "Can I bring a slightly larger bag?", a: "Gate agents may check bags against a sizer, and a bag that doesn't fit can be checked for a fee. Soft bags have a little give; hard-shell cases don't." },
      ]}
    >
      <CarryOnChecker airlines={airlines} />
      {checked && <p className="table-note">Airline limits last checked {formatDate(checked)}. Rules change, so confirm on the airline&rsquo;s site before you fly.</p>}
    </ToolLayout>
  );
}
