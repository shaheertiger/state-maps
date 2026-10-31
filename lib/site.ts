const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
const parsed = new URL(configuredUrl);
if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== "/") throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without a path, credentials or query.");
export const site = { name: "VaultForYou", url: parsed.origin, description: "A practical iPhone privacy database: app controls, hidden photos, cloud sharing, metadata and recovery." };
