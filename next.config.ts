import type {NextConfig} from 'next';
import legacyRedirects from './data/legacy-redirects.json';
const config:NextConfig={reactStrictMode:true,experimental:{cpus:2},poweredByHeader:false, outputFileTracingRoot: process.cwd(),
  // Old WordPress-era URLs that still earn impressions point at their matching app record.
  async redirects() { return legacyRedirects; },
  async headers() { return [{ source: "/(.*)", headers: [{ key: "Vary", value: "Accept, User-Agent" }, { key: "X-Content-Type-Options", value: "nosniff" }, { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, { key: "X-Frame-Options", value: "DENY" }] }]; },
};
export default config;
