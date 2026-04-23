"use client";

import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { calcularFluxoCaixaProprietario } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


export default function FluxoCaixaImovelPage() {
  const [aluguelMensal, setAluguelMensal] = useState(3_000);
  const [reajusteAnual, setReajusteAnual] = useState(5);
  const [vacanciaPercentual, setVacanciaPercentual] = useState(8);
  const [iptuAnual, setIptuAnual] = useState(3_600);
  const [condominioMensal, setCondominioMensal] = useState(0);
  const [manutencaoMensal, setManutencaoMensal] = useState(200);
  const [valorImovel, setValorImovel] = useState(500_000);
  const [horizonteAnos, setHorizonteAnos] = useState(10);

  const r = useMemo(() => calcularFluxoCaixaProprietario({
    aluguelMensal, reajusteAnual, vacanciaPercentual, iptuAnual,
    condominioMensal, manutencaoMensal, valorImovel, horizonteAnos,
  }), [aluguelMensal, reajusteAnual, vacanciaPercentual, iptuAnual, condominioMensal, manutencaoMensal, valorImovel, horizonteAnos]);

  const chartData = r.anos.map((a) => ({
    ano: `Ano ${a.ano}`,
    "Aluguel líquido": Math.round(a.aluguelLiquido),
    "Despesas": Math.round(a.despesas),
    "IR": Math.round(a.ir),
    "Resultado": Math.round(a.resultadoLiquido),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Aluguel</span>
        <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Fluxo de Caixa do Proprietário</h1>
        <p className="text-sm text-slate-500 mt-1">Visão anual de receitas, despesas e IR do seu imóvel alugado — com reajuste projetado e yield líquido.</p>
      </div>

      {/* Inputs em 2 colunas */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Receita</p>
            <CurrencyInput id="aluguel" label="Aluguel mensal inicial (bruto)" value={aluguelMensal} onChange={setAluguelMensal} />
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-xs text-slate-500">Reajuste anual do aluguel</span>
                <span className="text-xs font-bold text-slate-700">{formatPercent(reajusteAnual)} a.a.</span>
              </div>
              <input type="range" min={0} max={15} step={0.5} value={reajusteAnual}
                onChange={(e) => setReajusteAnual(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 rounded-full" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-xs text-slate-500">Vacância estimada</span>
                <span className="text-xs font-bold text-slate-700">{formatPercent(vacanciaPercentual)}</span>
              </div>
              <input type="range" min={0} max={30} step={1} value={vacanciaPercentual}
                onChange={(e) => setVacanciaPercentual(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 rounded-full" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Despesas do proprietário</p>
            <CurrencyInput id="iptu" label="IPTU anual" value={iptuAnual} onChange={setIptuAnual} />
            <CurrencyInput id="cond" label="Condomínio mensal (se pago pelo prop.)" value={condominioMensal} onChange={setCondominioMensal} />
            <CurrencyInput id="manut" label="Manutenção mensal estimada" value={manutencaoMensal} onChange={setManutencaoMensal} />
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Referência</p>
            <CurrencyInput id="valor" label="Valor do imóvel (para calcular yield)" value={valorImovel} onChange={setValorImovel} />
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-xs text-slate-500">Horizonte de análise</span>
                <span className="text-xs font-bold text-slate-700">{horizonteAnos} anos</span>
              </div>
              <input type="range" min={1} max={20} step={1} value={horizonteAnos}
                onChange={(e) => setHorizonteAnos(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 rounded-full" />
            </div>
            <div className="bg-amber-50 rounded-xl p-3 mt-2">
              <p className="text-xs text-amber-700 font-semibold">Yield líquido médio</p>
              <p className="text-2xl font-bold text-amber-800">{formatPercent(r.yieldMedioAnual, 2)} a.a.</p>
              <p className="text-xs text-amber-600 mt-0.5">sobre o valor do imóvel</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs do período */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <div className="bg-white rounded-2xl border border-slate-100 p-4">
          <p className="text-xs text-slate-400 mb-1">Total aluguel bruto</p>
          <p className="text-lg font-bold text-slate-900">{formatCurrency(r.totalAluguelBruto)}</p>
          <p className="text-xs text-slate-400 mt-0.5">{horizonteAnos} anos</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-4">
          <p className="text-xs text-slate-400 mb-1">Total despesas</p>
          <p className="text-lg font-bold text-rose-600">{formatCurrency(r.totalDespesas)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-4">
          <p className="text-xs text-slate-400 mb-1">Total IR pago</p>
          <p className="text-lg font-bold text-rose-600">{formatCurrency(r.totalIR)}</p>
          <p className="text-xs text-slate-400 mt-0.5">carnê-leão progressivo</p>
        </div>
        <div className={`rounded-2xl border p-4 ${r.totalLiquido >= 0 ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"}`}>
          <p className={`text-xs mb-1 ${r.totalLiquido >= 0 ? "text-emerald-600" : "text-rose-600"}`}>Resultado líquido total</p>
          <p className={`text-lg font-bold ${r.totalLiquido >= 0 ? "text-emerald-700" : "text-rose-700"}`}>{formatCurrency(r.totalLiquido)}</p>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5">
        <h3 className="font-semibold text-slate-800 text-sm mb-1">Fluxo anual: receita vs. despesas vs. resultado</h3>
        <p className="text-xs text-slate-400 mb-4">Valores anuais em reais, com aluguel crescendo pelo reajuste configurado</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} barSize={14}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="ano" tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10, fill: "#94a3b8" }} width={44} />
            <Tooltip formatter={(v) => formatCurrency(Number(v))} />
            <Legend iconSize={10} />
            <Bar dataKey="Aluguel líquido" fill="#f59e0b" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Despesas" fill="#f87171" radius={[3, 3, 0, 0]} />
            <Bar dataKey="IR" fill="#fb923c" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Resultado" fill="#10b981" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela anual */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-4">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800 text-sm">Detalhamento ano a ano</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                {["Ano", "Aluguel bruto", "Vacância", "Aluguel líquido", "Despesas", "IR", "Resultado", "Yield"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {r.anos.map((a) => (
                <tr key={a.ano} className="hover:bg-slate-50/50">
                  <td className="px-4 py-2 font-semibold text-slate-700">{a.ano}</td>
                  <td className="px-4 py-2 text-slate-600">{formatCurrency(a.aluguelBruto)}</td>
                  <td className="px-4 py-2 text-rose-500">-{formatCurrency(a.perdaVacancia)}</td>
                  <td className="px-4 py-2 text-slate-700">{formatCurrency(a.aluguelLiquido)}</td>
                  <td className="px-4 py-2 text-rose-500">-{formatCurrency(a.despesas)}</td>
                  <td className="px-4 py-2 text-rose-500">-{formatCurrency(a.ir)}</td>
                  <td className={`px-4 py-2 font-bold ${a.resultadoLiquido >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                    {formatCurrency(a.resultadoLiquido)}
                  </td>
                  <td className="px-4 py-2 text-slate-500">{a.yieldAnual.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          IR calculado pela tabela progressiva do carnê-leão (2025). Se você optar pelo desconto simplificado de 20% na declaração anual, o imposto pode ser menor. Para imóveis com condomínio alto pago pelo inquilino, o proprietário pode deduzir esse valor da base de cálculo do carnê-leão.
        </p>
      </div>

      <FaqSection path="/fluxo-caixa-imovel" />
      <RelatedCalculators path="/fluxo-caixa-imovel" />
    </div>
  );
}
