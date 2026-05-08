import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { SITE_URL, pages } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { getAllNews } from "@/lib/news";

function getPageMtime(route: string): Date {
  try {
    const dir = route === "/" ? "" : route;
    const filePath = path.join(process.cwd(), "app", dir, "page.tsx");
    return fs.statSync(filePath).mtime;
  } catch {
    return new Date("2024-06-01");
  }
}

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

// Calculadoras de maior intenção de busca — prioridade elevada para crawlers
const highPriorityRoutes = new Set([
  "/financiamento",
  "/comprar-ou-alugar",
  "/ganho-capital",
  "/cap-rate",
  "/reajuste-aluguel",
  "/custos-compra",
  "/mcmv",
  "/fgts",
  "/quanto-posso-financiar",
  "/tributacao-aluguel",
]);

// Páginas institucionais estáticas
const institutionalRoutes = new Set(["/sobre", "/metodologia"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.keys(pages);
  const now = new Date();

  const calculadoras: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified: getPageMtime(route),
    changeFrequency: route === "/"
      ? "weekly"
      : institutionalRoutes.has(route)
      ? "yearly"
      : bcbRoutes.has(route)
      ? "weekly"
      : "monthly",
    priority: route === "/" ? 1 : institutionalRoutes.has(route) ? 0.5 : highPriorityRoutes.has(route) ? 0.9 : 0.8,
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
    lastModified: new Date(n.lastModified ?? n.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...calculadoras, ...blogIndex, ...blogPosts, ...noticiasIndex, ...noticiasArticles];
}
