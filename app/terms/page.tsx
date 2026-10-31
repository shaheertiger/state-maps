import InfoPage from "@/components/info-page";
import { infoPages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(infoPages["/terms"].title, infoPages["/terms"].description, "/terms");
export default function Page() { return <InfoPage path="/terms" />; }
