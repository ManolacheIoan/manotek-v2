import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
