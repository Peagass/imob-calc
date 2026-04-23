"use client";

import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";
import { calcularTIRImovel } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, TrendingUp, TrendingDown } from "lucide-react";

export default function TIRImovelPage() {
  const [valorImovel, setValorImovel] = useState(500_000);
  const [entradaPercentual, setEntradaPercentual] = useState(20);
  const [taxaFinanciamentoAnual, setTaxaFinanciamentoAnual] = useState(11.5);
  const [prazoFinanciamentoMeses, setPrazoFinanciamentoMeses] = useState(240);
  const [custosCompraPercentual, setCustosCompraPercentual] = useState(4);
  const [aluguelMensal, setAluguelMensal] = useState(2_500);
  const [despesasMensais, setDespesasMensais] = useState(400);
  const [vacanciaPercentual, setVacanciaPercentual] = useState(8);
  const [valorizacaoAnual, setValorizacaoAnual] = useState(4);
  const [horizonteAnos, setHorizonteAnos] = useState(10);
  const [percentualCorretagem, setPercentualCorretagem] = useState(6);

  const resultado = useMemo(
    () => calcularTIRImovel({
      valorImovel, entradaPercentual, taxaFinanciamentoAnual, prazoFinanciamentoMeses,
      custosCompraPercentual, aluguelMensal, despesasMensais, vacanciaPercentual,
      valorizacaoAnual, horizonteAnos, percentualCorretagem,
    }),
    [valorImovel, entradaPercentual, taxaFinanciamentoAnual, prazoFinanciamentoMeses,
      custosCompraPercentual, aluguelMensal, despesasMensais, vacanciaPercentual,
      valorizacaoAnual, horizonteAnos, percentualCorretagem]
  );

  const tirPositiva = resultado.tirAnual > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">Investimento</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">TIR do Investimento Imobiliário</h1>
        <p className="text-slate-500">
          Taxa Interna de Retorno real do imóvel, considerando o fluxo de caixa completo: entrada, parcelas do financiamento, aluguel e venda no horizonte desejado.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput id="valor" label="Valor do imóvel" value={valorImovel} onChange={setValorImovel} />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Entrada: {entradaPercentual}% ({formatCurrency(valorImovel * entradaPercentual / 100)})
            </label>
            <input type="range" min={0} max={100} step={5} value={entradaPercentual}
              onChange={(e) => setEntradaPercentual(Number(e.target.value))}
              className="w-full accent-teal-600" />
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-4">Financiamento</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Taxa de juros: {formatPercent(taxaFinanciamentoAnual)} a.a.
                </label>
                <input type="range" min={6} max={18} step={0.25} value={taxaFinanciamentoAnual}
                  onChange={(e) => setTaxaFinanciamentoAnual(Number(e.target.value))}
                  className="w-full accent-teal-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Prazo: {prazoFinanciamentoMeses} meses ({prazoFinanciamentoMeses / 12} anos)
                </label>
                <input type="range" min={60} max={360} step={12} value={prazoFinanciamentoMeses}
                  onChange={(e) => setPrazoFinanciamentoMeses(Number(e.target.value))}
                  className="w-full accent-teal-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Custos de compra (ITBI + cartório): {formatPercent(custosCompraPercentual)}
                </label>
                <input type="range" min={2} max={8} step={0.5} value={custosCompraPercentual}
                  onChange={(e) => setCustosCompraPercentual(Number(e.target.value))}
                  className="w-full accent-teal-600" />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-4">Receita e despesas</p>
            <div className="space-y-4">
              <CurrencyInput id="aluguel" label="Aluguel mensal (bruto)" value={aluguelMensal} onChange={setAluguelMensal} />
              <CurrencyInput id="despesas" label="Despesas mensais (IPTU, condomínio, manutenção)"
                value={despesasMensais} onChange={setDespesasMensais} />
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Vacância: {formatPercent(vacanciaPercentual)} do tempo sem inquilino
                </label>
                <input type="range" min={0} max={30} step={1} value={vacanciaPercentual}
                  onChange={(e) => setVacanciaPercentual(Number(e.target.value))}
                  className="w-full accent-teal-600" />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-4">Saída do investimento</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Valorização: {formatPercent(valorizacaoAnual)} a.a.
                </label>
                <input type="range" min={-2} max={15} step={0.5} value={valorizacaoAnual}
                  onChange={(e) => setValorizacaoAnual(Number(e.target.value))}
                  className="w-full accent-teal-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Horizonte: {horizonteAnos} anos
                </label>
                <input type="range" min={3} max={20} step={1} value={horizonteAnos}
                  onChange={(e) => setHorizonteAnos(Number(e.target.value))}
                  className="w-full accent-teal-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Corretagem na venda: {formatPercent(percentualCorretagem)}
                </label>
                <input type="range" min={3} max={8} step={0.5} value={percentualCorretagem}
                  onChange={(e) => setPercentualCorretagem(Number(e.target.value))}
                  className="w-full accent-teal-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className={`rounded-2xl p-6 text-white ${tirPositiva
            ? "bg-gradient-to-br from-teal-600 to-emerald-700"
            : "bg-gradient-to-br from-rose-600 to-red-700"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {tirPositiva
                ? <TrendingUp className="w-5 h-5 text-white/70" />
                : <TrendingDown className="w-5 h-5 text-white/70" />
              }
              <p className="text-white/70 text-sm">TIR do investimento</p>
            </div>
            <p className="text-4xl font-bold mb-1">{formatPercent(resultado.tirAnual, 1)} a.a.</p>
            <p className="text-white/80 text-sm">
              Em {horizonteAnos} anos · Venda estimada: {formatCurrency(resultado.valorVendaFinal)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">Capital inicial (entrada + custos)</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(resultado.entradaTotal)}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">Total recebido em aluguel</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(resultado.totalRecebidoAluguel)}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">Total pago ao banco</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(resultado.totalPagoFinanciamento)}</p>
            </div>
            <div className={`rounded-2xl border p-4 ${resultado.cashFlowMedioMensal >= 0
              ? "bg-emerald-50 border-emerald-100"
              : "bg-rose-50 border-rose-100"
            }`}>
              <p className={`text-xs mb-1 ${resultado.cashFlowMedioMensal >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                Fluxo mensal médio
              </p>
              <p className={`text-lg font-bold ${resultado.cashFlowMedioMensal >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                {formatCurrency(resultado.cashFlowMedioMensal)}
              </p>
              <p className={`text-xs mt-1 ${resultado.cashFlowMedioMensal >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                {resultado.cashFlowMedioMensal >= 0 ? "Fluxo positivo" : "Aporte mensal necessário"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-800 mb-1">Evolução do patrimônio e fluxo acumulado</h3>
        <p className="text-sm text-slate-400 mb-5">Patrimônio líquido (imóvel − saldo devedor + CF) vs. fluxo de caixa acumulado</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={resultado.evolucaoCashFlow}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="ano" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => `Ano ${v}`} />
            <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip
              formatter={(v, name) => [formatCurrency(Number(v)), name === "saldo" ? "Patrimônio líquido" : "Fluxo acumulado"]}
              labelFormatter={(l) => `Ano ${l}`}
            />
            <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" />
            <Line type="monotone" dataKey="cfAcumulado" name="cfAcumulado" stroke="#f97316" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="saldo" name="saldo" stroke="#0d9488" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-teal-600 inline-block" /> Patrimônio líquido</span>
          <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-orange-500 inline-block" /> Fluxo acumulado</span>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          A TIR é calculada sobre o fluxo de caixa mensal real: saída de entrada e custos no mês 0, diferença entre aluguel líquido e parcela do financiamento a cada mês, e valor de venda no mês final. Não considera IR sobre ganho de capital na venda nem tributação de aluguel — use as calculadoras específicas para esses valores.
        </p>
      </div>
    </div>
  );
}
