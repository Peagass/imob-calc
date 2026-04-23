"use client";

import { useState, useMemo } from "react";
import { calcularPlantaVsPronto } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, AlertTriangle, CheckCircle, Clock } from "lucide-react";

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
  const [custoCompraPercentual, setCustoCompraPercentual] = useState(4);

  const resultado = useMemo(
    () => calcularPlantaVsPronto({
      valorNaPlanta, valorPronto, percentualSinal, percentualParcelas,
      prazoObrasMeses, inccAnual, taxaFinanciamentoAnual, prazoFinanciamentoMeses,
      atrasoMeses, aluguelMensalAtual, custoCompraPercentual,
    }),
    [valorNaPlanta, valorPronto, percentualSinal, percentualParcelas,
      prazoObrasMeses, inccAnual, taxaFinanciamentoAnual, prazoFinanciamentoMeses,
      atrasoMeses, aluguelMensalAtual, custoCompraPercentual]
  );

  const plantaMelhor = resultado.vantagem === "planta";
  const semelhante = resultado.vantagem === "semelhante";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Imóvel na Planta vs. Pronto</h1>
        <p className="text-slate-500">
          Compare o custo total de comprar na planta (com correção pelo INCC e risco de atraso) versus um imóvel pronto equivalente.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <div className="border-b border-slate-100 pb-4">
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
                  Chaves: {100 - percentualSinal - percentualParcelas}% a financiar
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

          <div className="border-b border-slate-100 pb-4">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-4">Imóvel pronto equivalente</p>
            <CurrencyInput id="valorPronto" label="Preço do imóvel pronto" value={valorPronto} onChange={setValorPronto} />
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-4">Financiamento e cenário de atraso</p>
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
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Atraso estimado: {atrasoMeses} meses
                </label>
                <input type="range" min={0} max={24} step={1} value={atrasoMeses}
                  onChange={(e) => setAtrasoMeses(Number(e.target.value))}
                  className="w-full accent-blue-600" />
                <p className="text-xs text-slate-400 mt-1">Média nacional de atrasos: 8–12 meses</p>
              </div>
              <CurrencyInput id="aluguel" label="Aluguel mensal pago durante a espera"
                value={aluguelMensalAtual} onChange={setAluguelMensalAtual} />
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className={`rounded-2xl p-6 text-white ${
            semelhante ? "bg-gradient-to-br from-slate-600 to-slate-700"
            : plantaMelhor ? "bg-gradient-to-br from-emerald-600 to-teal-700"
            : "bg-gradient-to-br from-blue-600 to-indigo-700"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-white/70" />
              <p className="text-white/70 text-sm">Menor custo total</p>
            </div>
            <p className="text-3xl font-bold mb-1">
              {semelhante ? "Semelhante" : plantaMelhor ? "Na planta" : "Pronto"}
            </p>
            {!semelhante && (
              <p className="text-white/80 text-sm">
                {formatCurrency(Math.abs(resultado.economiaPlanta))} de diferença no total pago
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Planta (sem atraso)</p>
              <p className="text-xs text-slate-500 mb-0.5">Sinal + parcelas obra</p>
              <p className="text-sm font-bold text-slate-800">{formatCurrency(resultado.sinalPago + resultado.parcelasObra)}</p>
              <p className="text-xs text-slate-500 mt-2 mb-0.5">Correção INCC</p>
              <p className="text-sm font-bold text-amber-600">+{formatCurrency(resultado.correcaoINCC)}</p>
              <p className="text-xs text-slate-500 mt-2 mb-0.5">Total (até as chaves)</p>
              <p className="text-base font-bold text-emerald-700">{formatCurrency(resultado.totalPagoNaPlanta)}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Pronto</p>
              <p className="text-xs text-slate-500 mb-0.5">Entrada</p>
              <p className="text-sm font-bold text-slate-800">{formatCurrency(resultado.entradaPronto)}</p>
              <p className="text-xs text-slate-500 mt-2 mb-0.5">Total com juros</p>
              <p className="text-base font-bold text-rose-600">{formatCurrency(resultado.totalPagoPronto)}</p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 rounded-lg px-2 py-1.5">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Disponível imediatamente</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <p className="text-sm font-semibold text-amber-900">Com atraso de {atrasoMeses} meses</p>
            </div>
            <p className="text-xs text-amber-800 mb-2">
              Custo do aluguel durante o atraso: {formatCurrency(resultado.custoAtraso)}
            </p>
            <p className="text-sm font-bold text-amber-900">
              Total planta + atraso: {formatCurrency(resultado.totalComAtraso)}
            </p>
          </div>

          {resultado.observacoes.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-800 mb-3">Observações</h3>
              <ul className="space-y-2">
                {resultado.observacoes.map((obs) => (
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
          O total pago considera o custo nominal até as chaves, sem projetar valorização futura. Para análise de retorno sobre investimento, use a calculadora de TIR do Imóvel.
        </p>
      </div>
    </div>
  );
}
