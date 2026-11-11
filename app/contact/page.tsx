import InfoPage from "@/components/info-page";
import { infoPages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(infoPages["/contact"].title, infoPages["/contact"].description, "/contact");
export default function Page() { return <InfoPage path="/contact" />; }
