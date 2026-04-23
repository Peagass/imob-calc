"use client";

import { useState, useMemo } from "react";
import { calcularPortabilidade } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, CheckCircle, XCircle } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


export default function PortabilidadePage() {
  const [saldoDevedor, setSaldoDevedor] = useState(350_000);
  const [prazoRestante, setPrazoRestante] = useState(240);
  const [taxaAtual, setTaxaAtual] = useState(12.0);
  const [taxaNova, setTaxaNova] = useState(9.5);
  const [custos, setCustos] = useState(3_000);

  const resultado = useMemo(
    () => calcularPortabilidade({ saldoDevedor, prazoRestanteMeses: prazoRestante, taxaAtualAnual: taxaAtual, taxaNovaAnual: taxaNova, custosPortabilidade: custos }),
    [saldoDevedor, prazoRestante, taxaAtual, taxaNova, custos]
  );

  const taxaMenorQue = taxaNova < taxaAtual;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Portabilidade de Financiamento</h1>
        <p className="text-slate-500">
          Vale a pena mudar de banco? Compare sua taxa atual com a oferta do novo banco e veja a economia real após os custos da portabilidade.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput id="saldo" label="Saldo devedor atual" value={saldoDevedor} onChange={setSaldoDevedor}
            hint="Consulte seu extrato de financiamento ou aplicativo do banco" />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Prazo restante: {prazoRestante} meses ({(prazoRestante / 12).toFixed(0)} anos)
            </label>
            <input type="range" min={12} max={420} step={12} value={prazoRestante}
              onChange={(e) => setPrazoRestante(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Taxas de juros</p>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                Taxa atual: {formatPercent(taxaAtual)} a.a.
              </label>
              <input type="range" min={5} max={18} step={0.25} value={taxaAtual}
                onChange={(e) => setTaxaAtual(Number(e.target.value))} className="w-full accent-slate-400" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-600">
                  Taxa proposta pelo novo banco: {formatPercent(taxaNova)} a.a.
                </label>
                {!taxaMenorQue && (
                  <span className="text-xs text-rose-500 font-medium">acima da atual</span>
                )}
              </div>
              <input type="range" min={5} max={18} step={0.25} value={taxaNova}
                onChange={(e) => setTaxaNova(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>

            {/* Comparação visual de taxas */}
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-end gap-4 justify-center">
                <div className="text-center">
                  <div className="text-xs text-slate-500 mb-1">Banco atual</div>
                  <div className="text-2xl font-bold text-slate-700">{formatPercent(taxaAtual)}</div>
                </div>
                <div className="text-slate-300 text-2xl mb-1">→</div>
                <div className="text-center">
                  <div className="text-xs text-slate-500 mb-1">Novo banco</div>
                  <div className={`text-2xl font-bold ${taxaMenorQue ? "text-emerald-600" : "text-rose-500"}`}>
                    {formatPercent(taxaNova)}
                  </div>
                </div>
                <div className={`text-center font-bold text-sm mb-0.5 ${taxaMenorQue ? "text-emerald-600" : "text-rose-500"}`}>
                  {taxaMenorQue ? `−${formatPercent(taxaAtual - taxaNova)} a.a.` : `+${formatPercent(taxaNova - taxaAtual)} a.a.`}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <CurrencyInput id="custos" label="Custos estimados da portabilidade"
              value={custos} onChange={setCustos}
              hint="Avaliação bancária (~R$ 1–3,5k) + registro cartório (~R$ 1–2k)" />
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          {/* Veredicto */}
          {taxaMenorQue ? (
            <div className={`rounded-2xl p-6 ${resultado.valeAPena ? "bg-gradient-to-br from-emerald-600 to-teal-700 text-white" : "bg-gradient-to-br from-amber-500 to-orange-600 text-white"}`}>
              <div className="flex items-center gap-2 mb-2">
                {resultado.valeAPena
                  ? <CheckCircle className="w-5 h-5 text-emerald-200" />
                  : <XCircle className="w-5 h-5 text-amber-200" />}
                <span className="font-semibold text-sm text-white/80">
                  {resultado.valeAPena ? "Vale a pena portar" : "Custos superam a economia"}
                </span>
              </div>
              <p className="text-4xl font-bold mb-1">{formatCurrency(Math.abs(resultado.economiaLiquida))}</p>
              <p className="text-white/80 text-sm">
                {resultado.valeAPena ? "de economia líquida ao longo do contrato" : "de prejuízo líquido após os custos"}
              </p>
              {resultado.mesesParaEquilibrio !== null && resultado.valeAPena && (
                <p className="text-white/70 text-xs mt-2">
                  Ponto de equilíbrio em {resultado.mesesParaEquilibrio} meses ({(resultado.mesesParaEquilibrio / 12).toFixed(1)} anos)
                </p>
              )}
            </div>
          ) : (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span className="font-semibold text-rose-800">Taxa maior — não faz sentido</span>
              </div>
              <p className="text-sm text-rose-700">A taxa proposta pelo novo banco é maior que a atual. A portabilidade só faz sentido quando a nova taxa é menor.</p>
            </div>
          )}

          {/* Comparativo de parcelas */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">Parcela atual</p>
              <p className="text-xl font-bold text-slate-700">{formatCurrency(resultado.parcelaAtual)}</p>
              <p className="text-xs text-slate-400">no banco atual</p>
            </div>
            <div className={`rounded-2xl border p-4 ${taxaMenorQue ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
              <p className={`text-xs mb-1 ${taxaMenorQue ? "text-emerald-600" : "text-rose-500"}`}>Nova parcela</p>
              <p className={`text-xl font-bold ${taxaMenorQue ? "text-emerald-700" : "text-rose-600"}`}>{formatCurrency(resultado.parcelaNova)}</p>
              <p className={`text-xs ${taxaMenorQue ? "text-emerald-600" : "text-rose-500"}`}>
                {taxaMenorQue ? `−${formatCurrency(resultado.economiaMensal)}/mês` : `+${formatCurrency(-resultado.economiaMensal)}/mês`}
              </p>
            </div>
          </div>

          {/* Detalhamento financeiro */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 text-sm">
            <h3 className="font-semibold text-slate-800">Comparativo total do contrato</h3>
            <div className="flex justify-between">
              <span className="text-slate-600">Total pago (banco atual)</span>
              <span className="font-semibold">{formatCurrency(resultado.totalPagoAtual)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Total pago (novo banco + custos)</span>
              <span className="font-semibold">{formatCurrency(resultado.totalPagoNovo)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Economia bruta em parcelas</span>
              <span className={`font-semibold ${resultado.economiaTotal >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
                {resultado.economiaTotal >= 0 ? "+" : ""}{formatCurrency(resultado.economiaTotal)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Custos da portabilidade</span>
              <span className="font-semibold text-rose-500">−{formatCurrency(custos)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2 font-bold">
              <span className="text-slate-700">Economia líquida</span>
              <span className={resultado.economiaLiquida >= 0 ? "text-emerald-700" : "text-rose-600"}>
                {resultado.economiaLiquida >= 0 ? "+" : ""}{formatCurrency(resultado.economiaLiquida)}
              </span>
            </div>
          </div>

          {/* Ponto de equilíbrio visual */}
          {resultado.mesesParaEquilibrio !== null && taxaMenorQue && (
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Ponto de equilíbrio</p>
              <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-emerald-400 rounded-full"
                  style={{ width: `${Math.min(100, (resultado.mesesParaEquilibrio / prazoRestante) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-1.5">
                <span>Hoje</span>
                <span className="text-emerald-600 font-medium">
                  {resultado.mesesParaEquilibrio}m ({(resultado.mesesParaEquilibrio / 12).toFixed(1)}a)
                </span>
                <span>{prazoRestante}m</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">O que isso significa?</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li>A <strong>portabilidade</strong> é um direito garantido pelo Banco Central (Resolução 4.292/2013). O banco atual não pode impedir ou cobrar taxa de saída.</li>
              <li>O novo banco deve oferecer as mesmas condições de prazo e valor financiado, apenas com a nova taxa.</li>
              <li><strong>Custos típicos</strong>: avaliação do imóvel pelo novo banco (R$ 800–3.500), averbação da alienação fiduciária no cartório (R$ 1.000–2.000), possível IOF.</li>
              <li>Quanto maior o saldo devedor e o tempo restante, maior a economia potencial — portabilidade no início do contrato tem mais impacto.</li>
              <li>Leve a proposta do novo banco ao seu banco atual — muitas vezes eles contraofertam uma taxa melhor sem precisar da portabilidade.</li>
            </ul>
          </div>
        </div>
      </div>

      <FaqSection path="/portabilidade" />
      <RelatedCalculators path="/portabilidade" />
    </div>
  );
}
