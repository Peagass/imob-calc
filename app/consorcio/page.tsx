"use client";

import { useState, useMemo } from "react";
import { calcularConsorcio } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


export default function ConsorcioPage() {
  const [valorCredito, setValorCredito] = useState(400_000);
  const [prazoMeses, setPrazoMeses] = useState(180);
  const [taxaAdminTotal, setTaxaAdminTotal] = useState(20);
  const [fundoReservaAnual, setFundoReservaAnual] = useState(0.5);
  const [lancePercentual, setLancePercentual] = useState(20);
  const [taxaFinanciamentoAnual, setTaxaFinanciamentoAnual] = useState(11.5);
  const [entrada, setEntrada] = useState(80_000);

  const resultado = useMemo(
    () => calcularConsorcio({ valorCredito, prazoMeses, taxaAdminTotal, fundoReservaAnual, lancePercentual, taxaFinanciamentoAnual, entrada }),
    [valorCredito, prazoMeses, taxaAdminTotal, fundoReservaAnual, lancePercentual, taxaFinanciamentoAnual, entrada]
  );

  const consorcioMelhor = resultado.melhor === "consorcio";
  const semelhante = resultado.melhor === "semelhante";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Consórcio vs. Financiamento</h1>
        <p className="text-slate-500">
          Compare o custo total de cada modalidade. O consórcio paga menos no total — mas você espera para ter o imóvel. O financiamento é mais caro — mas você entra na hora.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput id="credito" label="Valor do crédito / imóvel" value={valorCredito} onChange={setValorCredito} />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Prazo: {prazoMeses} meses ({(prazoMeses / 12).toFixed(0)} anos)
            </label>
            <input type="range" min={60} max={240} step={12} value={prazoMeses}
              onChange={(e) => setPrazoMeses(Number(e.target.value))}
              className="w-full accent-blue-600" />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>5 anos</span><span>20 anos</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-4">Consórcio</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Taxa de administração total: {formatPercent(taxaAdminTotal)} sobre o crédito
                </label>
                <input type="range" min={10} max={30} step={0.5} value={taxaAdminTotal}
                  onChange={(e) => setTaxaAdminTotal(Number(e.target.value))}
                  className="w-full accent-slate-700" />
                <p className="text-xs text-slate-400 mt-1">
                  Varia por administradora e prazo. Mercado: 12–25% no total. Verifique no contrato.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Fundo de reserva: {formatPercent(fundoReservaAnual)} a.a.
                </label>
                <input type="range" min={0} max={2} step={0.1} value={fundoReservaAnual}
                  onChange={(e) => setFundoReservaAnual(Number(e.target.value))}
                  className="w-full accent-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Lance ofertado: {lancePercentual}% do crédito ({formatCurrency(valorCredito * lancePercentual / 100)})
                </label>
                <input type="range" min={0} max={50} step={5} value={lancePercentual}
                  onChange={(e) => setLancePercentual(Number(e.target.value))}
                  className="w-full accent-slate-700" />
                <p className="text-xs text-slate-400 mt-1">
                  Lance maior = contemplação mais rápida. Grupos competitivos exigem 20–30%+.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-4">Financiamento</p>
            <div className="space-y-4">
              <CurrencyInput id="entrada" label="Entrada disponível" value={entrada} onChange={setEntrada}
                hint="Para o financiamento. No consórcio, o lance usa esse recurso." />
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Taxa de juros: {formatPercent(taxaFinanciamentoAnual)} a.a.
                </label>
                <input type="range" min={6} max={18} step={0.25} value={taxaFinanciamentoAnual}
                  onChange={(e) => setTaxaFinanciamentoAnual(Number(e.target.value))}
                  className="w-full accent-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          {/* Veredicto */}
          <div className={`rounded-2xl p-6 text-white ${
            semelhante ? "bg-gradient-to-br from-slate-600 to-slate-700"
            : consorcioMelhor ? "bg-gradient-to-br from-emerald-600 to-teal-700"
            : "bg-gradient-to-br from-blue-600 to-indigo-700"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-white/70" />
              <p className="text-white/70 text-sm">Menor custo total</p>
            </div>
            <p className="text-3xl font-bold mb-1">
              {semelhante ? "Semelhante" : consorcioMelhor ? "Consórcio" : "Financiamento"}
            </p>
            {!semelhante && (
              <p className="text-white/80 text-sm">
                {formatCurrency(Math.abs(resultado.economiaConsorcio))} a menos
                ({formatPercent(Math.abs(resultado.economiaPercentual), 1)})
              </p>
            )}
          </div>

          {/* Comparativo lado a lado */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">Consórcio</p>
              <p className="text-xs text-slate-500 mb-0.5">Parcela mensal</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(resultado.parcelaMensalConsorcio)}</p>
              <p className="text-xs text-slate-500 mt-2 mb-0.5">Total pago</p>
              <p className="text-base font-bold text-emerald-700">{formatCurrency(resultado.totalPagoConsorcio)}</p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 rounded-lg px-2 py-1.5">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Contemplação estimada: mês {resultado.mesEstimadoContemplacao}</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">Financiamento</p>
              <p className="text-xs text-slate-500 mb-0.5">Parcela mensal</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(resultado.parcelaMensalFinanciamento)}</p>
              <p className="text-xs text-slate-500 mt-2 mb-0.5">Total pago</p>
              <p className="text-base font-bold text-rose-600">{formatCurrency(resultado.totalPagoFinanciamento)}</p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 rounded-lg px-2 py-1.5">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Imóvel disponível imediatamente</span>
              </div>
            </div>
          </div>

          {/* Análise */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Análise</h3>
            <ul className="space-y-2">
              {resultado.analise.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-slate-600">
                  <span className="text-slate-400 shrink-0 mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Pontos críticos do consórcio</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li><strong>Não há garantia de data de contemplação</strong> — você pode ser o último sorteado e só receber o crédito no final do prazo.</li>
              <li><strong>Lance com recursos próprios</strong> — você usa a entrada (ou o FGTS) para fazer o lance. Se não for contemplado, o lance volta para o grupo.</li>
              <li><strong>Taxa de administração varia muito</strong> — compare propostas de múltiplas administradoras. As taxas ficam no contrato.</li>
              <li>Consórcio <strong>não é investimento</strong> — o crédito corrige pela variação do bem (INCC/IPCA), não rende juros.</li>
              <li>Verifique se a administradora é autorizada pelo Banco Central: <strong>bcb.gov.br/estabilidadefinanceira/busca_entidade_regulada</strong></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          A contemplação estimada é uma aproximação baseada no lance ofertado. O resultado real depende das ofertas dos demais cotistas em cada assembleia. Consulte o regulamento do grupo antes de assinar.
        </p>
      </div>

      <FaqSection path="/consorcio" />
      <RelatedCalculators path="/consorcio" />
    </div>
  );
}
