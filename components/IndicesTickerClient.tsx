"use client";

export interface IndiceTicker {
  nome: string;
  valor: string;
  periodo: string;
  variacao: string | null;
  positivo: boolean | null;
}

export default function IndicesTickerClient({ indices }: { indices: IndiceTicker[] }) {
  const items = [...indices, ...indices];

  return (
    <div className="bg-slate-900 border-b border-slate-800/60 h-8 flex items-center overflow-hidden select-none">
      {/* Label fixo */}
      <div className="shrink-0 bg-blue-700 h-full px-3.5 flex items-center z-10 shadow-[2px_0_8px_rgba(0,0,0,0.4)]">
        <span className="text-white text-[9px] font-black uppercase tracking-[0.15em] whitespace-nowrap">
          Índices
        </span>
      </div>

      {/* Faixa deslizante */}
      <div className="flex-1 overflow-hidden relative">
        <div className="flex ticker-track whitespace-nowrap will-change-transform">
          {items.map((ind, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 px-5 border-r border-slate-700/40 shrink-0"
            >
              <span className="text-slate-400 text-[10px] font-semibold tracking-wide">
                {ind.nome}
              </span>
              <span className="text-white text-[11px] font-bold tabular-nums">
                {ind.valor}
              </span>
              <span className="text-slate-500 text-[9px] font-medium">
                {ind.periodo}
              </span>
              {ind.variacao !== null && (
                <span
                  className={`text-[10px] font-bold tabular-nums ${
                    ind.positivo === true
                      ? "text-emerald-400"
                      : ind.positivo === false
                      ? "text-rose-400"
                      : "text-slate-400"
                  }`}
                >
                  {ind.variacao}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
