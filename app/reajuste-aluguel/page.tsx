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
      <section className="mt-10 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Como funciona o reajuste de aluguel no Brasil?</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pela Lei do Inquilinato (Lei 8.245/91), o aluguel só pode ser reajustado uma vez por ano, na data de aniversário do contrato, pelo índice previsto na cláusula de reajuste. O locador não pode aplicar um índice diferente do contratado — nem reajustar antes do prazo anual. O cálculo usa a variação acumulada do índice nos <strong>12 meses imediatamente anteriores</strong> ao aniversário do contrato, não o índice do mês corrente.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">IGP-M ou IPCA: qual índice usar no contrato de aluguel?</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            O <strong>IGP-M</strong> (FGV) foi durante décadas o índice padrão dos contratos de aluguel. Ele é mais volátil — em 2020 chegou a 23% em 12 meses — e pode gerar reajustes muito acima da inflação sentida pelo inquilino. O <strong>IPCA</strong> (IBGE), que mede a inflação ao consumidor, é mais estável e vem sendo adotado em contratos novos como alternativa mais equilibrada para ambas as partes. Contratos novos podem usar qualquer índice oficial. A calculadora acima exibe automaticamente o acumulado mais recente de ambos via API do Banco Central do Brasil (série BCB/SGS), garantindo sempre o valor correto. Para saber como o reajuste afeta o IR sobre o aluguel, veja a <a href="/tributacao-aluguel" className="text-indigo-600 hover:underline">calculadora de tributação de aluguel</a>.
          </p>
        </div>
      </section>

      <FaqSection path="/reajuste-aluguel" />
      <RelatedCalculators path="/reajuste-aluguel" />
    </div>
  );
}
