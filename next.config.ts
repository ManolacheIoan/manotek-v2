import type { NextConfig } from "next";

/**
 * BASE_PATH: sub-calea de pe care e servit site-ul, de ex. "/manotek-v2" pe GitHub Pages.
 * Gol (implicit) pentru build-ul local și pentru domeniul propriu.
 */
const basePath = process.env.BASE_PATH ?? "";
if (!/^(\/[a-z0-9-]+)*$/.test(basePath)) {
  throw new Error(`BASE_PATH trebuie să arate ca "/nume" sau să fie gol, nu "${basePath}"`);
}

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
  // URL-uri cu bară finală („/audit-gratuit/”), exact cum le servește GitHub Pages;
  // fără ea, linkurile „/#servicii” devin „/manotek-v2#servicii” și Next.js le tratează ca altă pagină
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Export static: `npm run build` generează site-ul complet în folderul `out/`.
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  devIndicators: false,
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
