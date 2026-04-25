import type { Metadata } from "next";
import Link from "next/link";
import { getAllNews } from "@/lib/news";
import NewsCard from "@/components/noticias/NewsCard";
import { SITE_URL } from "@/lib/seo";
import { Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Notícias do Mercado Imobiliário | CalculaImóvel" },
  description:
    "Acompanhe as principais notícias do mercado imobiliário brasileiro: legislação, taxas, financiamento, construção e tendências de preços.",
  alternates: { canonical: `${SITE_URL}/noticias` },
  openGraph: {
    title: "Notícias do Mercado Imobiliário — CalculaImóvel",
    description: "As principais notícias do mercado imobiliário brasileiro.",
    url: `${SITE_URL}/noticias`,
    type: "website",
  },
};

const CATEGORIAS = ["Todas", "Mercado", "Financiamento", "Legislação", "Economia", "Construção", "Investimento"];

export default function NoticiasPage() {
  const noticias = getAllNews();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Newspaper className="w-5 h-5 text-slate-600" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Notícias</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Mercado Imobiliário</h1>
        <p className="text-slate-500 max-w-xl">
          As principais notícias e movimentos do mercado imobiliário brasileiro.
        </p>
      </div>

      {noticias.length === 0 ? (
        <p className="text-slate-400 text-sm">Nenhuma notícia publicada ainda.</p>
      ) : (
        <>
          {/* Destaque — primeira notícia */}
          <div className="mb-8">
            <Link href={`/noticias/${noticias[0].slug}`} className="group block bg-white rounded-2xl border border-slate-100 p-7 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold bg-slate-900 text-white px-2.5 py-1 rounded-full">
                  Mais recente
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(noticias[0].date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors leading-snug">
                {noticias[0].title}
              </h2>
              <p className="text-slate-500 leading-relaxed max-w-2xl">{noticias[0].description}</p>
            </Link>
          </div>

          {/* Grid restante */}
          {noticias.length > 1 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {noticias.slice(1).map((post) => (
                <NewsCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
