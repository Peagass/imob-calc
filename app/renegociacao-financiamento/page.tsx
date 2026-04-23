"use client";

import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { calcularRenegociacao } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, CheckCircle, XCircle } from "lucide-react";

export default function RenegociacaoFinanciamentoPage() {
  const [saldoDevedor, setSaldoDevedor] = useState(350_000);
  const [taxaAtualAnual, setTaxaAtualAnual] = useState(12.5);
  const [taxaNovaAnual, setTaxaNovaAnual] = useState(10.0);
  const [prazoRestanteMeses, setPrazoRestanteMeses] = useState(180);
  const [sistema, setSistema] = useState<"SAC" | "PRICE">("SAC");
  const [custosRenegociacao, setCustosRenegociacao] = useState(3_000);

  const r = useMemo(() => calcularRenegociacao({
    saldoDevedor, taxaAtualAnual, taxaNovaAnual, prazoRestanteMeses, sistema, custosRenegociacao,
  }), [saldoDevedor, taxaAtualAnual, taxaNovaAnual, prazoRestanteMeses, sistema, custosRenegociacao]);

  const reduzTaxa = taxaNovaAnual < taxaAtualAnual;
  const chartData = r.evolucaoAnual.map((d) => ({ ano: `Ano ${d.ano}`, economiaAcumulada: d.economiaAcumulada }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Renegociação de Financiamento</h1>
        <p className="text-sm text-slate-500 mt-1">Simule a economia real de reduzir a taxa do seu financiamento, descontando os custos de renegociação.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-5">
        {/* Inputs */}
        <div className="md:col-span-1 bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Seu financiamento atual</p>
          <CurrencyInput id="saldo" label="Saldo devedor atual" value={saldoDevedor} onChange={setSaldoDevedor} />

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-slate-500">Taxa atual</span>
              <span className="text-xs font-bold text-slate-700">{formatPercent(taxaAtualAnual)} a.a.</span>
            </div>
            <input type="range" min={6} max={20} step={0.25} value={taxaAtualAnual}
              onChange={(e) => setTaxaAtualAnual(Number(e.target.value))}
              className="w-full accent-rose-500 h-1.5 rounded-full" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-slate-500">Taxa proposta (nova)</span>
              <span className="text-xs font-bold text-emerald-700">{formatPercent(taxaNovaAnual)} a.a.</span>
            </div>
            <input type="range" min={6} max={20} step={0.25} value={taxaNovaAnual}
              onChange={(e) => setTaxaNovaAnual(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 rounded-full" />
          </div>

          {!reduzTaxa && (
            <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
              A taxa nova é maior que a atual — renegociar não faz sentido nesse cenário.
            </p>
          )}

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-slate-500">Prazo restante</span>
              <span className="text-xs font-bold text-slate-700">{prazoRestanteMeses} meses ({Math.round(prazoRestanteMeses / 12)} anos)</span>
            </div>
            <input type="range" min={12} max={360} step={12} value={prazoRestanteMeses}
              onChange={(e) => setPrazoRestanteMeses(Number(e.target.value))}
              className="w-full accent-blue-600 h-1.5 rounded-full" />
          </div>

          <div>
            <p className="text-xs text-slate-500 mb-1.5">Sistema de amortização</p>
            <div className="flex gap-2">
              {(["SAC", "PRICE"] as const).map((s) => (
                <button key={s} onClick={() => setSistema(s)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                    sistema === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-500 border-slate-200"
                  }`}>{s}</button>
              ))}
            </div>
          </div>

          <CurrencyInput id="custos" label="Custos de renegociação (avaliação, cartório)" value={custosRenegociacao} onChange={setCustosRenegociacao} />
        </div>

        {/* Resultados */}
        <div className="md:col-span-2 space-y-4">
          {/* Hero */}
          <div className={`rounded-2xl p-5 text-white ${r.compensaRenegociar ? "bg-gradient-to-br from-emerald-600 to-teal-700" : "bg-gradient-to-br from-rose-600 to-red-700"}`}>
            <div className="flex items-center gap-2 mb-2">
              {r.compensaRenegociar ? <CheckCircle className="w-5 h-5 text-white/70" /> : <XCircle className="w-5 h-5 text-white/70" />}
              <p className="text-white/70 text-sm">{r.compensaRenegociar ? "Renegociação vantajosa" : "Não compensa renegociar"}</p>
            </div>
            <p className="text-3xl font-bold mb-1">
              {r.compensaRenegociar ? formatCurrency(r.economiaLiquida) : formatCurrency(Math.abs(r.economiaLiquida))}
            </p>
            <p className="text-white/80 text-sm">
              {r.compensaRenegociar
                ? `Economia líquida ao longo dos ${prazoRestanteMeses / 12} anos restantes`
                : "Custo de renegociação supera a economia projetada"}
            </p>
          </div>

          {/* 4 KPIs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-400 mb-1">Parcela atual (1ª)</p>
              <p className="text-lg font-bold text-rose-600">{formatCurrency(r.parcelaAtualInicial)}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-400 mb-1">Parcela nova (1ª)</p>
              <p className="text-lg font-bold text-emerald-600">{formatCurrency(r.parcelaNovaInicial)}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-400 mb-1">Economia mensal inicial</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(r.economiaMensalInicial)}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-400 mb-1">Breakeven dos custos</p>
              <p className="text-lg font-bold text-slate-900">
                {r.mesesBreakeven >= 9999 ? "—" : `${r.mesesBreakeven} meses`}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {r.mesesBreakeven < 9999 && r.mesesBreakeven <= prazoRestanteMeses ? "custos recuperados dentro do prazo" : ""}
              </p>
            </div>
          </div>

          {/* Gráfico */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 text-sm mb-1">Economia acumulada líquida ao longo do tempo</h3>
            <p className="text-xs text-slate-400 mb-4">Economia total menos custos de renegociação</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={chartData}>
                <XAxis dataKey="ano" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#94a3b8" }} width={44} />
                <Tooltip formatter={(v) => [formatCurrency(Number(v)), "Economia acumulada"]} />
                <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" />
                <Area type="monotone" dataKey="economiaAcumulada" stroke="#10b981" fill="#d1fae5" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          Use a proposta do banco concorrente como argumento de negociação com o seu banco atual — muitas vezes ele reduz a taxa sem necessidade de portabilidade formal. A renegociação interna tende a ter menos burocracia e custo menor que a portabilidade para outro banco.
        </p>
      </div>
    </div>
  );
}
