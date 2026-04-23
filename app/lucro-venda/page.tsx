"use client";

import { useState, useMemo } from "react";
import { calcularLucroVenda } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, TrendingUp, TrendingDown } from "lucide-react";

export default function LucroVendaPage() {
  const [valorCompra, setValorCompra] = useState(400_000);
  const [custoAquisicao, setCustoAquisicao] = useState(16_000);
  const [valorMelhorias, setValorMelhorias] = useState(30_000);
  const [valorVenda, setValorVenda] = useState(600_000);
  const [percentualCorretagem, setPercentualCorretagem] = useState(6);
  const [outrosCustosVenda, setOutrosCustosVenda] = useState(0);

  const resultado = useMemo(
    () => calcularLucroVenda({ valorCompra, custoAquisicao, valorMelhorias, valorVenda, percentualCorretagem, outrosCustosVenda }),
    [valorCompra, custoAquisicao, valorMelhorias, valorVenda, percentualCorretagem, outrosCustosVenda]
  );

  const positivo = resultado.lucroLiquido >= 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">Venda</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Lucro Líquido na Venda</h1>
        <p className="text-slate-500">
          Calcule o lucro real após deduzir todos os custos: aquisição, melhorias, corretagem e outros encargos.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Custo de aquisição</p>

          <CurrencyInput id="valor-compra" label="Valor de compra" value={valorCompra} onChange={setValorCompra} />
          <CurrencyInput id="custo-aqq" label="Custos na compra (ITBI + cartório + avaliação)"
            value={custoAquisicao} onChange={setCustoAquisicao}
            hint="Tipicamente 3–5% do valor do imóvel" />
          <CurrencyInput id="melhorias" label="Reformas e melhorias com nota fiscal"
            value={valorMelhorias} onChange={setValorMelhorias}
            hint="Comprovados por nota fiscal — reduzem o ganho de capital" />

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Venda</p>
            <div className="space-y-4">
              <CurrencyInput id="valor-venda" label="Valor de venda" value={valorVenda} onChange={setValorVenda} />

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Corretagem do vendedor: {percentualCorretagem}%
                </label>
                <input type="range" min={0} max={8} step={0.5} value={percentualCorretagem}
                  onChange={(e) => setPercentualCorretagem(Number(e.target.value))}
                  className="w-full accent-violet-600" />
                <p className="text-xs text-slate-400 mt-1">
                  Padrão de mercado: 6% (CRECI). Negociável conforme o imóvel.
                </p>
              </div>

              <CurrencyInput id="outros" label="Outros custos de venda"
                value={outrosCustosVenda} onChange={setOutrosCustosVenda}
                hint="Documentação extra, IPTU atrasado, etc." />
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className={`rounded-2xl p-6 text-white ${positivo ? "bg-gradient-to-br from-emerald-600 to-teal-700" : "bg-gradient-to-br from-rose-500 to-red-600"}`}>
            <div className="flex items-center gap-2 mb-2">
              {positivo
                ? <TrendingUp className="w-5 h-5 text-emerald-200" />
                : <TrendingDown className="w-5 h-5 text-rose-200" />}
              <p className={`text-sm font-medium ${positivo ? "text-emerald-100" : "text-rose-100"}`}>
                {positivo ? "Lucro líquido na venda" : "Prejuízo líquido na venda"}
              </p>
            </div>
            <p className="text-4xl font-bold mb-1">{formatCurrency(Math.abs(resultado.lucroLiquido))}</p>
            <p className={`text-sm ${positivo ? "text-emerald-200" : "text-rose-200"}`}>
              ROI: {formatPercent(resultado.roi, 1)} sobre o custo total investido
            </p>
          </div>

          {/* Detalhamento */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-2.5">
            <h3 className="font-semibold text-slate-800 mb-3">Demonstrativo</h3>
            {resultado.detalhamento.map((item) => {
              const isPositive = item.valor > 0;
              return (
                <div key={item.item} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">{item.item}</span>
                  <span className={`font-semibold ${isPositive ? "text-emerald-700" : "text-slate-900"}`}>
                    {isPositive ? "+" : ""}{formatCurrency(item.valor)}
                  </span>
                </div>
              );
            })}
            <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-base">
              <span className={positivo ? "text-emerald-700" : "text-rose-600"}>Lucro líquido</span>
              <span className={positivo ? "text-emerald-700" : "text-rose-600"}>
                {formatCurrency(resultado.lucroLiquido)}
              </span>
            </div>
          </div>

          {/* Resumo percentual */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-xs text-slate-500 mb-1">Custo total investido</p>
              <p className="text-lg font-bold text-slate-800">{formatCurrency(resultado.custoTotal)}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-xs text-slate-500 mb-1">ROI sobre custo</p>
              <p className={`text-lg font-bold ${positivo ? "text-emerald-700" : "text-rose-600"}`}>
                {formatPercent(resultado.roi, 1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">O que este cálculo não inclui</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li><strong>Imposto de Renda (Ganho de Capital):</strong> use a calculadora de Ganho de Capital para calcular o IR devido — ele reduz ainda mais o lucro líquido.</li>
              <li><strong>Correção monetária:</strong> o custo de aquisição de imóveis comprados antes de 1996 pode ser corrigido pelo BTN/ORTN.</li>
              <li><strong>Custo de oportunidade:</strong> considere quanto o capital investido renderia em renda fixa no mesmo período.</li>
              <li>Guarde todas as notas fiscais de reforma — elas aumentam o custo de aquisição e reduzem o imposto.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
