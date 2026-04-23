import Link from "next/link";
import type { NewsMeta } from "@/lib/news";
import { ArrowRight, Clock } from "lucide-react";

const categoryColors: Record<string, string> = {
  Mercado:      "bg-blue-50 text-blue-700",
  Legislação:   "bg-violet-50 text-violet-700",
  Financiamento:"bg-emerald-50 text-emerald-700",
  Construção:   "bg-orange-50 text-orange-700",
  Economia:     "bg-amber-50 text-amber-700",
  Investimento: "bg-teal-50 text-teal-700",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NewsCard({ post }: { post: NewsMeta }) {
  const badgeClass = categoryColors[post.category] ?? "bg-slate-100 text-slate-600";
  return (
    <article className="group bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-all duration-200 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}>
          {post.category}
        </span>
        <span className="text-xs text-slate-400">{formatDate(post.date)}</span>
      </div>

      <Link href={`/noticias/${post.slug}`} className="flex-1">
        <h2 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors mb-1.5">
          {post.title}
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{post.description}</p>
      </Link>

      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3 h-3" />
          {post.readingTime} min
        </span>
        <Link
          href={`/noticias/${post.slug}`}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors font-medium"
        >
          Ler
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}
