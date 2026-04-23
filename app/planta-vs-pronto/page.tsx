"use client";

import { useState, useMemo } from "react";
import { calcularPlantaVsPronto } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


export default function PlantaVsProntoPage() {
  const [valorNaPlanta, setValorNaPlanta] = useState(600_000);
  const [valorPronto, setValorPronto] = useState(680_000);
  const [percentualSinal, setPercentualSinal] = useState(10);
  const [percentualParcelas, setPercentualParcelas] = useState(20);
  const [prazoObrasMeses, setPrazoObrasMeses] = useState(36);
  const [inccAnual, setInccAnual] = useState(6.5);
  const [taxaFinanciamentoAnual, setTaxaFinanciamentoAnual] = useState(11.5);
  const [prazoFinanciamentoMeses, setPrazoFinanciamentoMeses] = useState(240);
  const [atrasoMeses, setAtrasoMeses] = useState(9);
  const [aluguelMensalAtual, setAluguelMensalAtual] = useState(2_500);
  const [pagaAluguelDuranteObra, setPagaAluguelDuranteObra] = useState(true);
  const [custoCompraPercentual, setCustoCompraPercentual] = useState(4);

  const r = useMemo(
    () => calcularPlantaVsPronto({
      valorNaPlanta, valorPronto, percentualSinal, percentualParcelas,
      prazoObrasMeses, inccAnual, taxaFinanciamentoAnual, prazoFinanciamentoMeses,
      atrasoMeses, aluguelMensalAtual, pagaAluguelDuranteObra, custoCompraPercentual,
    }),
    [valorNaPlanta, valorPronto, percentualSinal, percentualParcelas,
      prazoObrasMeses, inccAnual, taxaFinanciamentoAnual, prazoFinanciamentoMeses,
      atrasoMeses, aluguelMensalAtual, pagaAluguelDuranteObra, custoCompraPercentual]
  );

  const plantaMelhor = r.vantagem === "planta";
  const semelhante = r.vantagem === "semelhante";

  const Row = ({ label, value, accent }: { label: string; value: string; accent?: string }) => (
    <div className="flex justify-between items-baseline py-1.5 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-500">{label}</span>
      <span className={`text-sm font-semibold ${accent ?? "text-slate-800"}`}>{value}</span>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Imóvel na Planta vs. Pronto</h1>
        <p className="text-slate-500">
          Comparação do custo total real de cada opção — incluindo pré-entrega, aluguel durante a obra e o financiamento pós-chaves.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          {/* Planta */}
          <div className="border-b border-slate-100 pb-5">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-4">Imóvel na planta</p>
            <div className="space-y-4">
              <CurrencyInput id="valorPlanta" label="Preço na planta (tabela da incorporadora)" value={valorNaPlanta} onChange={setValorNaPlanta} />
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Sinal: {percentualSinal}% ({formatCurrency(valorNaPlanta * percentualSinal / 100)})
                </label>
                <input type="range" min={5} max={30} step={1} value={percentualSinal}
                  onChange={(e) => setPercentualSinal(Number(e.target.value))}
                  className="w-full accent-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Parcelas durante obra: {percentualParcelas}% ({formatCurrency(valorNaPlanta * percentualParcelas / 100)})
                </label>
                <input type="range" min={0} max={50} step={5} value={percentualParcelas}
                  onChange={(e) => setPercentualParcelas(Number(e.target.value))}
                  className="w-full accent-blue-600" />
                <p className="text-xs text-slate-400 mt-1">
                  Chaves: {Math.max(0, 100 - percentualSinal - percentualParcelas)}% a financiar
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Prazo de obra: {prazoObrasMeses} meses
                </label>
                <input type="range" min={12} max={72} step={6} value={prazoObrasMeses}
                  onChange={(e) => setPrazoObrasMeses(Number(e.target.value))}
                  className="w-full accent-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  INCC anual (correção durante obra): {formatPercent(inccAnual)} a.a.
                </label>
                <input type="range" min={2} max={15} step={0.5} value={inccAnual}
                  onChange={(e) => setInccAnual(Number(e.target.value))}
                  className="w-full accent-blue-600" />
              </div>
            </div>
          </div>

          {/* Pronto */}
          <div className="border-b border-slate-100 pb-5">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-4">Imóvel pronto equivalente</p>
            <CurrencyInput id="valorPronto" label="Preço do imóvel pronto" value={valorPronto} onChange={setValorPronto} />
          </div>

          {/* Financiamento */}
          <div className="border-b border-slate-100 pb-5">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-4">Financiamento (ambos)</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Taxa de juros: {formatPercent(taxaFinanciamentoAnual)} a.a.
                </label>
                <input type="range" min={6} max={18} step={0.25} value={taxaFinanciamentoAnual}
                  onChange={(e) => setTaxaFinanciamentoAnual(Number(e.target.value))}
                  className="w-full accent-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Prazo do financiamento: {prazoFinanciamentoMeses} meses
                </label>
                <input type="range" min={60} max={360} step={12} value={prazoFinanciamentoMeses}
                  onChange={(e) => setPrazoFinanciamentoMeses(Number(e.target.value))}
                  className="w-full accent-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Custos de compra (ITBI + cartório): {formatPercent(custoCompraPercentual)}
                </label>
                <input type="range" min={2} max={8} step={0.5} value={custoCompraPercentual}
                  onChange={(e) => setCustoCompraPercentual(Number(e.target.value))}
                  className="w-full accent-blue-600" />
              </div>
            </div>
          </div>

          {/* Aluguel durante a espera */}
          <div>
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">Aluguel durante a espera</p>
            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <div
                onClick={() => setPagaAluguelDuranteObra(!pagaAluguelDuranteObra)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  pagaAluguelDuranteObra ? "bg-blue-600" : "bg-slate-200"
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  pagaAluguelDuranteObra ? "translate-x-6" : "translate-x-1"
                }`} />
              </div>
              <span className="text-sm text-slate-700">Pago aluguel enquanto aguardo as chaves</span>
            </label>
            {pagaAluguelDuranteObra && (
              <div className="space-y-4">
                <CurrencyInput id="aluguel" label="Aluguel mensal atual" value={aluguelMensalAtual} onChange={setAluguelMensalAtual} />
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Atraso estimado: {atrasoMeses} meses
                  </label>
                  <input type="range" min={0} max={24} step={1} value={atrasoMeses}
                    onChange={(e) => setAtrasoMeses(Number(e.target.value))}
                    className="w-full accent-blue-600" />
                  <p className="text-xs text-slate-400 mt-1">Média nacional de atrasos: 8–12 meses</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          {/* Veredito */}
          <div className={`rounded-2xl p-6 text-white ${
            semelhante ? "bg-gradient-to-br from-slate-600 to-slate-700"
            : plantaMelhor ? "bg-gradient-to-br from-emerald-600 to-teal-700"
            : "bg-gradient-to-br from-blue-600 to-indigo-700"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-white/70" />
              <p className="text-white/70 text-sm">Menor custo total da operação</p>
            </div>
            <p className="text-3xl font-bold mb-1">
              {semelhante ? "Semelhante" : plantaMelhor ? "Na planta" : "Pronto"}
            </p>
            {!semelhante && (
              <p className="text-white/80 text-sm">
                {formatCurrency(Math.abs(r.economiaPlanta))} de diferença no custo total
              </p>
            )}
            <p className="text-white/60 text-xs mt-2">Comparação inclui pré-entrega + aluguel + financiamento pós-chaves</p>
          </div>

          {/* Detalhamento lado a lado */}
          <div className="grid grid-cols-2 gap-3">
            {/* Planta */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">Planta</p>
              <Row label="Sinal" value={formatCurrency(r.sinalPago)} />
              <Row label="Parcelas obra" value={formatCurrency(r.parcelasObra)} />
              <Row label="Correção INCC" value={`+${formatCurrency(r.correcaoINCC)}`} accent="text-amber-600" />
              {pagaAluguelDuranteObra && (
                <>
                  <Row label={`Aluguel obra (${prazoObrasMeses}m)`} value={formatCurrency(r.custoAluguelObra)} accent="text-rose-500" />
                  {atrasoMeses > 0 && (
                    <Row label={`Aluguel atraso (${atrasoMeses}m)`} value={formatCurrency(r.custoAtraso)} accent="text-rose-500" />
                  )}
                </>
              )}
              <Row label={`Financiamento (${prazoFinanciamentoMeses}m)`} value={formatCurrency(r.totalFinanciamentoPlanta)} />
              <Row label="Juros totais" value={formatCurrency(r.totalJurosPlanta)} accent="text-rose-500" />
              <Row label="ITBI + cartório" value={formatCurrency(r.custoCompraPlanta)} />
              <div className="mt-3 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-700">Total real</span>
                  <span className="text-base font-bold text-slate-900">{formatCurrency(r.totalPlanta)}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Parcela pós-chaves: {formatCurrency(r.parcelaPlanta)}/mês</p>
              </div>
            </div>

            {/* Pronto */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">Pronto</p>
              <Row label="Entrada" value={formatCurrency(r.entradaPronto)} />
              <Row label={`Financiamento (${prazoFinanciamentoMeses}m)`} value={formatCurrency(r.totalFinanciamentoPronto)} />
              <Row label="Juros totais" value={formatCurrency(r.totalJurosPronto)} accent="text-rose-500" />
              <Row label="ITBI + cartório" value={formatCurrency(r.custoCompraPronto)} />
              <div className="mt-3 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-700">Total real</span>
                  <span className="text-base font-bold text-slate-900">{formatCurrency(r.totalPronto)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 rounded-lg px-2 py-1.5 mt-2">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Disponível imediatamente</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Parcela: {formatCurrency(r.parcelaPronto)}/mês</p>
              </div>
            </div>
          </div>

          {/* Observações */}
          {r.observacoes.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-800 mb-3">Observações</h3>
              <ul className="space-y-2">
                {r.observacoes.map((obs) => (
                  <li key={obs} className="flex gap-2 text-sm text-slate-600">
                    <span className="text-slate-400 shrink-0 mt-0.5">→</span>
                    {obs}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Riscos */}
      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Riscos do imóvel na planta</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li><strong>Atraso na entrega</strong> — a média nacional é de 8–12 meses além do prazo contratual. Durante esse tempo, você paga aluguel e parcelas simultaneamente.</li>
              <li><strong>Correção pelo INCC</strong> — em anos de alta inflação da construção civil, o custo final do imóvel pode superar o do pronto equivalente.</li>
              <li><strong>Risco de incorporadora</strong> — prefira empreendimentos com patrimônio de afetação (RET). Em caso de falência, o dinheiro fica segregado.</li>
              <li><strong>Mudança de projeto</strong> — especificações podem ser alteradas pela incorporadora. Leia o memorial descritivo e o contrato com atenção.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          Ambas as opções usam a mesma taxa de juros e prazo de financiamento, tornando a comparação justa. A diferença de preço entre o imóvel na planta e o pronto equivalente é o ponto de partida — o INCC e o aluguel durante a obra determinam se o desconto inicial se sustenta.
        </p>
      </div>

      <FaqSection path="/planta-vs-pronto" />
      <RelatedCalculators path="/planta-vs-pronto" />
    </div>
  );
}
