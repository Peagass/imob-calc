"use client";

import { useState, useMemo } from "react";
import { calcularITCMD, ITCMD_UFS } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, Scale } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


export default function ITCMDPage() {
  const [valorBem, setValorBem] = useState(500_000);
  const [uf, setUf] = useState("SP");
  const [tipoTransmissao, setTipoTransmissao] = useState<"heranca" | "doacao">("heranca");

  const resultado = useMemo(
    () => calcularITCMD({ valorBem, uf, tipoTransmissao }),
    [valorBem, uf, tipoTransmissao]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">Venda & Herança</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">ITCMD — Imposto sobre Herança e Doação</h1>
        <p className="text-slate-500">
          Calcule o ITCMD (Imposto de Transmissão Causa Mortis e Doação) por estado. As alíquotas variam de 1% a 8% conforme a UF e o valor do bem.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          {/* Tipo */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-2">Tipo de transmissão</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTipoTransmissao("heranca")}
                className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                  tipoTransmissao === "heranca"
                    ? "border-violet-400 bg-violet-50 text-violet-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                Herança
                <p className="text-xs font-normal text-slate-400 mt-0.5">Causa mortis</p>
              </button>
              <button
                onClick={() => setTipoTransmissao("doacao")}
                className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                  tipoTransmissao === "doacao"
                    ? "border-violet-400 bg-violet-50 text-violet-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                Doação
                <p className="text-xs font-normal text-slate-400 mt-0.5">Em vida</p>
              </button>
            </div>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Estado (UF)</label>
            <select
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              {ITCMD_UFS.map((s) => (
                <option key={s.uf} value={s.uf}>{s.nome} ({s.uf})</option>
              ))}
            </select>
          </div>

          {/* Valor do bem */}
          <CurrencyInput id="valor" label="Valor do bem" value={valorBem} onChange={setValorBem}
            hint="Para imóveis: use o valor venal ou de avaliação exigido pelo estado" />

          {/* Info estado atual */}
          {resultado.observacao && (
            <div className="bg-violet-50 border border-violet-100 rounded-xl p-3">
              <p className="text-xs text-violet-700">{resultado.observacao}</p>
            </div>
          )}
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-6 text-white">
            <p className="text-violet-100 text-sm mb-1">ITCMD a recolher</p>
            <p className="text-4xl font-bold mb-2">{formatCurrency(resultado.impostoDevido)}</p>
            <p className="text-violet-200 text-sm">
              Alíquota efetiva: {formatPercent(resultado.aliquotaEfetiva, 2)} sobre {formatCurrency(resultado.baseCalculo)}
            </p>
          </div>

          {/* Faixas aplicadas */}
          {resultado.faixasAplicadas.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3">
              <h3 className="font-semibold text-slate-800">Cálculo detalhado</h3>
              {resultado.faixasAplicadas.map((f) => (
                <div key={f.faixa} className="text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">{f.faixa}</span>
                    <span className="text-slate-500">{f.aliquota}%</span>
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-xs text-slate-400">Base: {formatCurrency(f.base)}</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(f.imposto)}</span>
                  </div>
                  {resultado.faixasAplicadas.length > 1 && (
                    <div className="h-1 bg-slate-100 rounded-full mt-1.5">
                      <div className="h-full bg-violet-400 rounded-full"
                        style={{ width: `${(f.base / resultado.baseCalculo) * 100}%` }} />
                    </div>
                  )}
                </div>
              ))}
              <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-violet-700">
                <span>Total</span>
                <span>{formatCurrency(resultado.impostoDevido)}</span>
              </div>
            </div>
          )}

          {/* Comparativo entre estados */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Comparativo — outros estados</h3>
            <div className="space-y-2 text-sm max-h-48 overflow-y-auto pr-1">
              {ITCMD_UFS.filter((s) => s.uf !== uf).slice(0, 8).map((s) => {
                const r = calcularITCMD({ valorBem, uf: s.uf, tipoTransmissao });
                return (
                  <div key={s.uf} className="flex justify-between items-center">
                    <span className="text-slate-600">{s.nome}</span>
                    <div className="text-right">
                      <span className="font-semibold text-slate-900">{formatCurrency(r.impostoDevido)}</span>
                      <span className="text-xs text-slate-400 ml-1">({formatPercent(r.aliquotaEfetiva, 1)})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Scale className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">O que é o ITCMD e quem paga</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li>O ITCMD é um imposto <strong>estadual</strong> cobrado sobre a transferência de bens por herança ou doação.</li>
              <li>O STF fixou que a alíquota máxima é <strong>8%</strong> — estados que ultrapassarem esse limite podem ser questionados judicialmente.</li>
              <li>Na herança, o imposto é recolhido no inventário. Na doação, no momento da transferência.</li>
              <li>Alguns estados concedem isenção para heranças de baixo valor ou para filhos e cônjuges — consulte a legislação estadual.</li>
              <li>Há uma proposta de progressividade federal em tramitação que pode elevar as alíquotas máximas nos próximos anos.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          <strong>Valores aproximados.</strong> As alíquotas e faixas são baseadas na legislação de 2024/2025 e podem ter sido atualizadas. Consulte a Secretaria da Fazenda do seu estado ou um advogado especializado antes de recolher o imposto.
        </p>
      </div>

      <FaqSection path="/itcmd" />
      <RelatedCalculators path="/itcmd" />
    </div>
  );
}
