import { buscarSelic } from "@/lib/indices";
import FiiVsImovelCalc from "./FiiVsImovelCalc";
import { ExternalLink } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";

export const revalidate = 21600;

export default async function FiiVsImovelPage() {
  const selic = await buscarSelic();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">Investimento</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">FII vs. Imóvel Físico</h1>
        <p className="text-slate-500">
          Compare o retorno de um Fundo de Investimento Imobiliário com a compra de um imóvel físico para aluguel no mesmo horizonte de tempo.
        </p>

        {!selic.erro && (
          <div className="mt-3 inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-500">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Selic: {selic.valor.toFixed(2)}% a.a. · Ref. {selic.referencia} · Fonte: BCB/SGS
            <a href="https://www.bcb.gov.br/estabilidadefinanceira/sgs" target="_blank" rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700">
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>

      <FiiVsImovelCalc selic={selic} />
      <FaqSection path="/fii-vs-imovel" />
      <RelatedCalculators path="/fii-vs-imovel" />
    </div>
  );
}
