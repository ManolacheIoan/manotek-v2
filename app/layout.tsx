import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { about, formatLei, lowestPrice, site } from "@/content/site";
import "./globals.css";

// latin-ext e obligatoriu pentru ă, ș, ț (â și î sunt în latin)
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: `%s | ${site.name}`,
  },
  description: site.seo.description,
  applicationName: site.name,
  authors: [{ name: about.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "/",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F4",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  slogan: site.tagline,
  description: site.seo.description,
  url: site.url,
  email: site.email,
  ...(site.phone ? { telephone: site.phone } : {}),
  image: `${site.url}/opengraph-image.png`,
  logo: `${site.url}/icon.png`,
  areaServed: { "@type": "Country", name: "România" },
  knowsLanguage: "ro",
  priceRange: `de la ${formatLei(lowestPrice)} lei`,
  founder: { "@type": "Person", name: about.name },
  serviceType: [
    "Site-uri de prezentare",
    "Profil Google Business",
    "Administrare social media",
    "Video și foto de prezentare",
    "Campanii și oferte",
    "Magazine online și aplicații la comandă",
    "Mentenanță și monitorizare site-uri",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ro" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        {/* Fără JavaScript, conținutul animat rămâne vizibil */}
        <noscript>
          <style>{`[data-reveal],[data-scrub]{opacity:1!important;transform:none!important}[data-draw]{stroke-dasharray:none!important;opacity:1!important}[data-curtain],[data-scrub-dim]{opacity:0!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
        <div aria-hidden="true" className="grain" />
      </body>
    </html>
  );
}
