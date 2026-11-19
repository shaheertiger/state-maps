import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";

export default function NotFound() {
  return (
    <div className="wrap" style={{ padding: "48px 16px 96px" }}>
      <h1>That page doesn&rsquo;t fit</h1>
      <p className="lede">We couldn&rsquo;t find that page. It may have moved. Search for what you were looking for, or start from a section below.</p>
      <SearchBox />
      <ul className="link-cols" style={{ marginTop: 24 }}>
        <li><Link href="/fit/">All fit guides</Link></li>
        <li><Link href="/will-it-fit/">Will it fit?</Link></li>
        <li><Link href="/sizing/">Brand sizing</Link></li>
        <li><Link href="/tools/">Sizing tools</Link></li>
      </ul>
    </div>
  );
}
