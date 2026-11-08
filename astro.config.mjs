// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://statemaps.net",
  trailingSlash: "always",
  output: "static",
  build: { format: "directory" },
  compressHTML: true,
  prefetch: false,
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
