import { getAllNews } from "@/lib/news";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

export async function GET() {
  const noticias = getAllNews();
  const lastBuildDate = noticias[0]
    ? toRfc822(noticias[0].lastModified ?? noticias[0].date)
    : new Date().toUTCString();

  const items = noticias
    .map(
      (n) => `
    <item>
      <title>${escapeXml(n.title)}</title>
      <link>${SITE_URL}/noticias/${n.slug}</link>
      <description>${escapeXml(n.description)}</description>
      <pubDate>${toRfc822(n.date)}</pubDate>
      <guid isPermaLink="true">${SITE_URL}/noticias/${n.slug}</guid>
      <category>${escapeXml(n.category)}</category>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Notícias Imobiliárias — CalculaImóvel</title>
    <link>${SITE_URL}/noticias</link>
    <description>As principais notícias do mercado imobiliário brasileiro: financiamento, legislação, preços e tendências.</description>
    <language>pt-BR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/noticias/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
