import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
  alternates: { canonical: "/search/" },
};

export default function SearchPage() {
  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <Breadcrumbs items={[{ name: "Search", href: "/search/" }]} />
      <h1>Search</h1>
      <SearchResults />
    </div>
  );
}
