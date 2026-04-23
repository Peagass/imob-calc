import { buscarSelic } from "@/lib/indices";
import CapRateCalc from "./CapRateCalc";
import { ExternalLink } from "lucide-react";

export const revalidate = 21600; // revalida a cada 6 horas

export default async function CapRatePage() {
  const selic = await buscarSelic();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">Investimento</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Cap Rate — Rentabilidade do Aluguel</h1>
        <p className="text-slate-500">
          Calcule o retorno real do imóvel alugado e compare com outras aplicações financeiras.
        </p>

        {!selic.erro && (
          <div className="mt-3 inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-500">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Selic: {selic.valor.toFixed(2)}% a.a. · Ref. {selic.referencia} · Fonte: BCB/SGS série 432
            <a
              href="https://www.bcb.gov.br/estabilidadefinanceira/sgs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>

      <CapRateCalc selic={selic} />
    </div>
  );
}
