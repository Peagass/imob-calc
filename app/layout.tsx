import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Script from "next/script";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import IndicesTicker from "@/components/IndicesTicker";
import Footer from "@/components/Footer";
import { SITE_URL, ADSENSE_CLIENT, GA_ID } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CalculaImóvel — Calculadoras Imobiliárias para Brasileiros",
    template: "%s | CalculaImóvel",
  },
  description:
    "40 calculadoras gratuitas para brasileiros que querem entender os números antes de comprar, vender, alugar, reformar e morar. Dados atualizados do Banco Central.",
  authors: [{ name: "CalculaImóvel", url: SITE_URL }],
  creator: "CalculaImóvel",
  publisher: "CalculaImóvel",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "CalculaImóvel",
    title: "CalculaImóvel — Calculadoras Imobiliárias para Brasileiros",
    description:
      "40 calculadoras gratuitas para brasileiros que querem entender os números antes de comprar, vender, alugar, reformar e morar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalculaImóvel — Calculadoras Imobiliárias para Brasileiros",
    description: "40 calculadoras gratuitas para decisões imobiliárias no Brasil.",
    site: "@calculaimovel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "CalculaImóvel",
      url: SITE_URL,
      description: "Calculadoras imobiliárias gratuitas para brasileiros",
      inLanguage: "pt-BR",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      name: "CalculaImóvel",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg`, width: 512, height: 512 },
      sameAs: [
        "https://twitter.com/calculaimovel",
        "https://www.instagram.com/calculaimovel",
      ],
      areaServed: { "@type": "Country", name: "Brasil" },
      foundingDate: "2024",
      knowsAbout: [
        "financiamento imobiliário",
        "sistema SAC",
        "sistema PRICE",
        "FGTS habitacional",
        "Minha Casa Minha Vida",
        "portabilidade de crédito imobiliário",
        "ganho de capital imobiliário",
        "ITBI",
        "ITCMD",
        "cap rate imobiliário",
        "TIR de investimento imobiliário",
        "reajuste de aluguel IGP-M IPCA",
        "carnê-leão renda de aluguel",
        "Lei do Inquilinato",
        "distrato imobiliário Lei 13786",
        "fundos de investimento imobiliário",
        "Selic e mercado imobiliário",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`h-full antialiased ${inter.variable}`}>
      <head suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50">
        <Suspense fallback={<div className="h-8 bg-slate-900" />}>
          <IndicesTicker />
        </Suspense>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        {ADSENSE_CLIENT && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}
