import type {NextConfig} from 'next';
const config:NextConfig={reactStrictMode:true,poweredByHeader:false, outputFileTracingRoot: process.cwd(),
  async headers() { return [{ source: "/(.*)", headers: [{ key: "Vary", value: "Accept, User-Agent" }, { key: "X-Content-Type-Options", value: "nosniff" }, { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, { key: "X-Frame-Options", value: "DENY" }] }]; },
};
export default config;
