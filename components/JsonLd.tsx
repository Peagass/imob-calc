import { pages, SITE_URL } from "@/lib/seo";
import { faqs } from "@/lib/faq";

interface Props {
  path: string;
}

export default function JsonLd({ path }: Props) {
  const page = pages[path];
  if (!page) return null;

  const appData = {
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

  const faqItems = faqs[path];
  const faqData = faqItems?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appData) }} />
      {faqData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      )}
    </>
  );
}
