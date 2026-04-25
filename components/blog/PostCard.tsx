import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { Clock, ArrowRight, Calculator } from "lucide-react";

const categoryColors: Record<string, string> = {
  Compra: "bg-blue-50 text-blue-700",
  Aluguel: "bg-amber-50 text-amber-700",
  Reforma: "bg-orange-50 text-orange-700",
  Investimento: "bg-teal-50 text-teal-700",
  "Venda & Herança": "bg-violet-50 text-violet-700",
  Custos: "bg-green-50 text-green-700",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PostCard({ post }: { post: PostMeta }) {
  const badgeClass = categoryColors[post.category] ?? "bg-slate-100 text-slate-600";
  return (
    <article className="group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-all duration-200 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}>
          {post.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3 h-3" />
          {post.readingTime} min
        </span>
      </div>

      <Link href={`/blog/${post.slug}`} className="flex-1">
        <h2 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors leading-snug">
          {post.title}
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">{post.description}</p>
      </Link>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
        <span className="text-xs text-slate-400">{formatDate(post.date)}</span>
        <div className="flex items-center gap-2">
          {post.calculadora && (
            <Link
              href={post.calculadora}
              className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-lg hover:bg-blue-100 transition-colors font-medium"
            >
              <Calculator className="w-3 h-3" />
              Calcular
            </Link>
          )}
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors"
          >
            Ler
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
