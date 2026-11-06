// Shim so the editorial modules keep their original `site` import.
import { SITE } from "../site";
export const site = { name: SITE.domain, url: SITE.url, description: "A practical iPhone privacy database: app controls, hidden photos, cloud sharing, metadata and recovery." };
