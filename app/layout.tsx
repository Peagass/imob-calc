import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL, ADSENSE_CLIENT } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CalcImóvel — Calculadoras Imobiliárias para Brasileiros",
    template: "%s | CalcImóvel",
  },
  description:
    "29 calculadoras gratuitas para compra, financiamento, aluguel, reforma e investimento imobiliário no Brasil. Dados atualizados do Banco Central.",
  authors: [{ name: "CalcImóvel", url: SITE_URL }],
  creator: "CalcImóvel",
  publisher: "CalcImóvel",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "CalcImóvel",
    title: "CalcImóvel — Calculadoras Imobiliárias para Brasileiros",
    description:
      "29 calculadoras gratuitas para compra, financiamento, aluguel, reforma e investimento imobiliário no Brasil.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CalcImóvel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcImóvel — Calculadoras Imobiliárias para Brasileiros",
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
  name: "CalcImóvel",
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
      </head>
      <body className="min-h-full flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
