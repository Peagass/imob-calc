"use client";

import { useState, useMemo } from "react";
import { calcularQuantoPossoFinanciar } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, CheckCircle, AlertCircle } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";

export default function QuantoPossoFinanciarPage() {
  const [rendaFamiliar, setRendaFamiliar] = useState(10_000);
  const [entradaDisponivel, setEntradaDisponivel] = useState(80_000);
  const [taxaAnual, setTaxaAnual] = useState(10.5);
  const [prazoAnos, setPrazoAnos] = useState(30);
  const [percentualComprometimento, setPercentualComprometimento] = useState(30);

  const resultado = useMemo(
    () =>
      calcularQuantoPossoFinanciar({
        rendaFamiliar,
        entradaDisponivel,
        taxaAnual,
        prazoMeses: prazoAnos * 12,
        percentualComprometimento,
      }),
    [rendaFamiliar, entradaDisponivel, taxaAnual, prazoAnos, percentualComprometimento]
  );

  const entradaPercentual = resultado.poderDeCompraTotal > 0
    ? (entradaDisponivel / resultado.poderDeCompraTotal) * 100
    : 0;
  const entradaSuficiente = entradaPercentual >= 20;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Quanto Posso Financiar?</h1>
        <p className="text-slate-500">
          Informe sua renda e a entrada disponível para descobrir seu poder de compra real.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput
            id="renda"
            label="Renda familiar bruta mensal"
            value={rendaFamiliar}
            onChange={setRendaFamiliar}
            hint="Some todas as rendas do grupo familiar comprovadas"
          />

          <CurrencyInput
            id="entrada"
            label="Entrada disponível"
            value={entradaDisponivel}
            onChange={setEntradaDisponivel}
            hint="Inclua FGTS disponível para saque + reservas"
          />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Taxa de juros: {formatPercent(taxaAnual)} a.a.
            </label>
            <input
              type="range"
              min={6}
              max={16}
              step={0.25}
              value={taxaAnual}
              onChange={(e) => setTaxaAnual(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>6% (FGTS/MCMV)</span>
              <span>16% (mercado livre)</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Prazo: {prazoAnos} anos
            </label>
            <input
              type="range"
              min={5}
              max={35}
              step={1}
              value={prazoAnos}
              onChange={(e) => setPrazoAnos(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>5 anos</span>
              <span>35 anos</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Comprometimento de renda: {percentualComprometimento}%
            </label>
            <input
              type="range"
              min={20}
              max={35}
              step={5}
              value={percentualComprometimento}
              onChange={(e) => setPercentualComprometimento(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>20% (conservador)</span>
              <span>35% (limite CEF)</span>
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          {/* Poder de compra */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
            <p className="text-blue-200 text-sm mb-1">Seu poder de compra total</p>
            <p className="text-4xl font-bold mb-3">{formatCurrency(resultado.poderDeCompraTotal)}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-300 text-xs mb-0.5">Máximo financiado</p>
                <p className="font-bold">{formatCurrency(resultado.valorMaximoFinanciado)}</p>
              </div>
              <div>
                <p className="text-blue-300 text-xs mb-0.5">Sua entrada</p>
                <p className="font-bold">{formatCurrency(entradaDisponivel)}</p>
              </div>
            </div>
          </div>

          {/* Parcela e renda */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">Parcela máxima</p>
              <p className="text-2xl font-bold text-slate-900">{formatCurrency(resultado.parcelaMaxima)}</p>
              <p className="text-xs text-slate-400 mt-0.5">{percentualComprometimento}% da sua renda</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">LTV do financiamento</p>
              <p className="text-2xl font-bold text-slate-900">{formatPercent(resultado.ltvMaximo, 1)}</p>
              <p className="text-xs text-slate-400 mt-0.5">do valor do imóvel financiado</p>
            </div>
          </div>

          {/* Análise da entrada */}
          <div className={`rounded-2xl p-5 border ${entradaSuficiente ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
            <div className="flex items-start gap-3">
              {entradaSuficiente
                ? <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              }
              <div>
                <p className={`font-semibold text-sm ${entradaSuficiente ? "text-emerald-800" : "text-rose-800"}`}>
                  {entradaSuficiente ? "Entrada suficiente" : "Entrada abaixo do mínimo recomendado"}
                </p>
                <p className={`text-xs mt-1 ${entradaSuficiente ? "text-emerald-700" : "text-rose-700"}`}>
                  Sua entrada representa {formatPercent(entradaPercentual, 1)} do poder de compra.
                  {!entradaSuficiente && ` Faltam ${formatCurrency(resultado.entradaNecessaria - entradaDisponivel)} para atingir os 20% recomendados.`}
                </p>
              </div>
            </div>
          </div>

          {/* Barra visual da composição */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Composição do poder de compra</h3>
            <div className="h-8 rounded-full overflow-hidden flex">
              <div
                className="bg-blue-500 h-full transition-all"
                style={{ width: `${Math.min(100, resultado.ltvMaximo)}%` }}
              />
              <div
                className="bg-indigo-200 h-full transition-all"
                style={{ width: `${Math.max(0, 100 - resultado.ltvMaximo)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full inline-block" /> Financiado: {formatPercent(resultado.ltvMaximo, 1)}</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-indigo-200 rounded-full inline-block" /> Entrada: {formatPercent(100 - resultado.ltvMaximo, 1)}</span>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 text-sm">
              <div className="flex justify-between mb-1.5">
                <span className="text-slate-600">Renda mínima para esta parcela</span>
                <span className="font-semibold">{formatCurrency(resultado.rendaNecessaria)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Entrada mínima recomendada (20%)</span>
                <span className="font-semibold">{formatCurrency(resultado.entradaNecessaria)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">O que isso significa?</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li>Os bancos exigem que <strong>a parcela não ultrapasse 30% da renda bruta familiar</strong>. Caixa Econômica Federal permite até 35%.</li>
              <li>A maioria dos bancos financia no máximo <strong>80% do valor do imóvel</strong>. Para FGTS e MCMV pode chegar a 90%.</li>
              <li>A renda considerada deve ser comprovada em documentos (holerites, IR, extratos bancários). Renda informal precisa de análise individual.</li>
              <li>Além da parcela, reserve uma <strong>reserva de emergência</strong> e considere os custos de compra (ITBI, cartório, mudança).</li>
              <li>Com FGTS, você pode usar o saldo como entrada e ainda abater parcelas — consulte as regras de elegibilidade.</li>
            </ul>
          </div>
        </div>
      </div>

      <FaqSection path="/quanto-posso-financiar" />
      <RelatedCalculators path="/quanto-posso-financiar" />
    </div>
  );
}
