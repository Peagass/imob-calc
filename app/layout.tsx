import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Header from "@/components/Header";
import IndicesTicker from "@/components/IndicesTicker";
import Footer from "@/components/Footer";
import { SITE_URL, ADSENSE_CLIENT } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CalculaImóvel — Calculadoras Imobiliárias para Brasileiros",
    template: "%s | CalculaImóvel",
  },
  description:
    "29 calculadoras gratuitas para compra, financiamento, aluguel, reforma e investimento imobiliário no Brasil. Dados atualizados do Banco Central.",
  authors: [{ name: "CalculaImóvel", url: SITE_URL }],
  creator: "CalculaImóvel",
  publisher: "CalculaImóvel",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "CalculaImóvel",
    title: "CalculaImóvel — Calculadoras Imobiliárias para Brasileiros",
    description:
      "29 calculadoras gratuitas para compra, financiamento, aluguel, reforma e investimento imobiliário no Brasil.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CalculaImóvel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CalculaImóvel — Calculadoras Imobiliárias para Brasileiros",
    description: "29 calculadoras gratuitas para decisões imobiliárias no Brasil.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CalculaImóvel",
  url: SITE_URL,
  description: "Calculadoras imobiliárias gratuitas para brasileiros",
  inLanguage: "pt-BR",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {ADSENSE_CLIENT && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-slate-50">
        <Suspense fallback={<div className="h-8 bg-slate-900" />}>
          <IndicesTicker />
        </Suspense>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
