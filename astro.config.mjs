// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://statemaps.net",
  trailingSlash: "always",
  output: "static",
  // ~10k pages: one cached stylesheet beats inlining the same CSS into every file.
  build: { format: "directory", inlineStylesheets: "never", concurrency: 4 },
  compressHTML: true,
  prefetch: false,
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
