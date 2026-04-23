import { buscarSelic } from "@/lib/indices";
import ImovelRendaFixaCalc from "./ImovelRendaFixaCalc";
import { ExternalLink } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";

export const revalidate = 21600;

export default async function ImovelVsRendaFixaPage() {
  const selic = await buscarSelic();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">Investimento</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Imóvel vs. Renda Fixa</h1>
        <p className="text-slate-500">
          Compare comprar um imóvel para alugar com investir o mesmo capital em renda fixa (CDI/Selic). Qual cresce mais o seu patrimônio?
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

      <ImovelRendaFixaCalc selic={selic} />
      <FaqSection path="/imovel-vs-renda-fixa" />
      <RelatedCalculators path="/imovel-vs-renda-fixa" />
    </div>
  );
}
