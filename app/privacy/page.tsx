import InfoPage from "@/components/info-page";
import { infoPages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(infoPages["/privacy"].title, infoPages["/privacy"].description, "/privacy");
export default function Page() { return <InfoPage path="/privacy" />; }
