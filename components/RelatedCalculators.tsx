import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { related } from "@/lib/related";

interface Props {
  path: string;
}

export default function RelatedCalculators({ path }: Props) {
  const items = related[path];
  if (!items?.length) return null;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-slate-900 mb-3">Calculadoras relacionadas</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-start justify-between gap-3 bg-white border border-slate-100 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50 transition-colors group"
          >
            <div>
              <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700">{item.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
