import InfoPage from "@/components/info-page";
import { infoPages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(infoPages["/about"].title, infoPages["/about"].description, "/about");
export default function Page() { return <InfoPage path="/about" />; }
