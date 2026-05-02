import { faqs } from "@/lib/faq";

interface Props {
  path: string;
}

export default function FaqSection({ path }: Props) {
  const items = faqs[path];
  if (!items?.length) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Perguntas frequentes</h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <details key={i} open={i === 0} className="group bg-white border border-slate-100 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-sm font-medium text-slate-800 list-none select-none">
              {item.q}
              <svg
                className="w-4 h-4 text-slate-400 shrink-0 ml-3 transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
