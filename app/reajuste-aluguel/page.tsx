import { buscarIndicesReajuste } from "@/lib/indices";
import ReajusteCalc from "./ReajusteCalc";
import { ExternalLink } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";

export const revalidate = 21600; // revalida a cada 6 horas

export default async function ReajusteAluguelPage() {
  const indices = await buscarIndicesReajuste();

  // Referência de data baseada no índice com menor erro
  const refDate =
    (!indices.ipca.erro && indices.ipca.referencia) ||
    (!indices.igpm.erro && indices.igpm.referencia) ||
    "—";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Aluguel</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Reajuste de Aluguel</h1>
        <p className="text-slate-500">
          Calcule o novo valor do aluguel por IGP-M, IPCA ou qualquer índice. Saiba se o reajuste proposto está correto.
        </p>

        {/* Badge de fonte */}
        <div className="mt-3 inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-500">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Índices acumulados 12 meses · Ref. {refDate} · Fonte: BCB/SGS
          <a
            href="https://www.bcb.gov.br/estabilidadefinanceira/sgs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <ReajusteCalc indices={indices} />
      <FaqSection path="/reajuste-aluguel" />
      <RelatedCalculators path="/reajuste-aluguel" />
    </div>
  );
}
