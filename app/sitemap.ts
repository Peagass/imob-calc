import type { MetadataRoute } from "next";
import { SITE_URL, pages } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { getAllNews } from "@/lib/news";

// Calculadoras que consomem dados ao vivo do BCB — rastrear com mais frequência
const bcbRoutes = new Set([
  "/reajuste-aluguel",
  "/cap-rate",
  "/quanto-cobrar-aluguel",
  "/tributacao-aluguel",
  "/imovel-vs-renda-fixa",
  "/fii-vs-imovel",
  "/tir-imovel",
  "/fluxo-caixa-imovel",
  "/airbnb-vs-aluguel",
]);

// Páginas institucionais estáticas
const institutionalRoutes = new Set(["/sobre", "/metodologia"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.keys(pages);
  const now = new Date();

  const calculadoras: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified: now,
    changeFrequency: route === "/"
      ? "weekly"
      : institutionalRoutes.has(route)
      ? "yearly"
      : bcbRoutes.has(route)
      ? "weekly"
      : "monthly",
    priority: route === "/" ? 1 : institutionalRoutes.has(route) ? 0.5 : 0.8,
  }));

  const blogIndex: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  const posts = getAllPosts();
  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const noticiasIndex: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/noticias`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  const noticias = getAllNews();
  const noticiasArticles: MetadataRoute.Sitemap = noticias.map((n) => ({
    url: `${SITE_URL}/noticias/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...calculadoras, ...blogIndex, ...blogPosts, ...noticiasIndex, ...noticiasArticles];
}
