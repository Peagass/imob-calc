import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { relatedGuides } from "@/lib/related";

interface Props {
  path: string;
}

export default function RelatedGuides({ path }: Props) {
  const items = relatedGuides[path];
  if (!items?.length) return null;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-slate-900 mb-3">Guias relacionados</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-start justify-between gap-3 bg-white border border-slate-100 rounded-xl p-4 hover:border-green-200 hover:bg-green-50 transition-colors group"
          >
            <div className="flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-slate-800 group-hover:text-green-700">{item.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-green-500 shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
