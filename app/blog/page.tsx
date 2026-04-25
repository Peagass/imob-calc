import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import PostCard from "@/components/blog/PostCard";
import { SITE_URL } from "@/lib/seo";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Guias — Mercado Imobiliário no Brasil | CalculaImóvel" },
  description:
    "Artigos práticos sobre compra, venda, aluguel, reforma e investimento imobiliário. Guias claros para tomar as melhores decisões com seu imóvel.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Guias CalculaImóvel — Mercado Imobiliário no Brasil",
    description: "Artigos práticos sobre compra, venda, aluguel e investimento imobiliário no Brasil.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const categorias = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Guias</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Guias práticos sobre imóveis
        </h1>
        <p className="text-slate-500 max-w-xl">
          Guias práticos para ajudar você a entender os números por trás de cada decisão imobiliária.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-slate-400 text-sm">Nenhum artigo publicado ainda.</p>
      ) : (
        <div className="space-y-10">
          {categorias.map((cat) => {
            const catPosts = posts.filter((p) => p.category === cat);
            return (
              <div key={cat}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide shrink-0 bg-slate-100 text-slate-600">
                    {cat}
                  </span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {catPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
