import { pages, SITE_URL } from "@/lib/seo";

interface Props {
  path: string;
}

export default function JsonLd({ path }: Props) {
  const page = pages[path];
  if (!page) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: page.title.split("|")[0].trim(),
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    inLanguage: "pt-BR",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    description: page.description,
    url: `${SITE_URL}${path}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "CalculaImóvel", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: page.title.split("|")[0].trim(), item: `${SITE_URL}${path}` },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
