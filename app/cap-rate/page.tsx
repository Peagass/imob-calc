import { buscarSelic } from "@/lib/indices";
import CapRateCalc from "./CapRateCalc";
import { ExternalLink } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";

export const revalidate = 21600; // revalida a cada 6 horas

export default async function CapRatePage() {
  const selic = await buscarSelic();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">Investimento</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Calculadora de Cap Rate Imobiliário</h1>
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
      <section className="mt-10 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">O que é cap rate imobiliário?</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Cap rate (taxa de capitalização) é a principal métrica de rentabilidade de imóveis para renda. Ele expressa a relação entre a renda líquida anual do imóvel e o seu valor de mercado atual. <strong>Cap rate = (aluguel anual líquido ÷ valor de mercado) × 100</strong>. Se um imóvel vale R$ 800.000 e gera R$ 40.000 por ano de aluguel líquido (descontados IPTU, condomínio, vacância e manutenção), o cap rate é 5% ao ano. O cálculo usa o valor de mercado atual — não o preço de compra histórico — para refletir o retorno sobre o capital necessário hoje para adquirir o ativo.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Qual é um bom cap rate para imóvel no Brasil?</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            No Brasil, cap rates residenciais nas grandes capitais costumam ficar entre <strong>4% e 6% ao ano</strong>. Imóveis comerciais (salas, galpões logísticos) podem atingir 7% a 9%. Com a Selic em 14,50% a.a. em maio de 2026, a maioria dos imóveis residenciais rende menos que a renda fixa em termos de cap rate puro. O imóvel se justifica pelo potencial de <strong>valorização patrimonial</strong> (ganho de capital futuro), pela proteção contra inflação e pelo efeito de alavancagem do financiamento. Use a calculadora para comparar seu cap rate com a Selic em tempo real e avalie se o prêmio de iliquidez faz sentido no seu caso.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Cap rate vs. outras métricas de retorno imobiliário</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            O cap rate mede apenas a renda — não considera valorização futura nem alavancagem do financiamento. Para uma análise completa, use também: a <a href="/imovel-vs-renda-fixa" className="text-indigo-600 hover:underline">comparação imóvel vs. renda fixa</a> (que inclui valorização e CDI), a <a href="/tir-imovel" className="text-indigo-600 hover:underline">TIR do investimento imobiliário</a> (que pondera o fluxo de caixa completo incluindo venda futura) ou a <a href="/fii-vs-imovel" className="text-indigo-600 hover:underline">comparação com fundos imobiliários</a> (FIIs têm liquidez diária e isenção de IR nos dividendos para pessoa física).
          </p>
        </div>
      </section>

      <FaqSection path="/cap-rate" />
      <RelatedCalculators path="/cap-rate" />
    </div>
  );
}
