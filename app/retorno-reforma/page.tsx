"use client";

import { useState, useMemo } from "react";
import { calcularRetornoReforma } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, CheckCircle, XCircle, Wrench } from "lucide-react";

export default function RetornoReformaPage() {
  const [valorAtualImovel, setValorAtualImovel] = useState(500_000);
  const [custoReforma, setCustoReforma] = useState(60_000);
  const [valorEstimadoAposReforma, setValorEstimadoAposReforma] = useState(620_000);
  const [percentualCorretagem, setPercentualCorretagem] = useState(6);
  const [mesesAteVenda, setMesesAteVenda] = useState(6);
  const [custoOportunidade, setCustoOportunidade] = useState(14.75);

  const resultado = useMemo(
    () => calcularRetornoReforma({ valorAtualImovel, custoReforma, valorEstimadoAposReforma, percentualCorretagem, mesesAteVenda, custoOportunidade }),
    [valorAtualImovel, custoReforma, valorEstimadoAposReforma, percentualCorretagem, mesesAteVenda, custoOportunidade]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Reforma</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Retorno da Reforma antes da Venda</h1>
        <p className="text-slate-500">
          Vale a pena reformar antes de vender? Compare o ganho estimado com o custo da obra e o custo de oportunidade do capital.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput id="valor-atual" label="Valor atual do imóvel (sem reforma)"
            value={valorAtualImovel} onChange={setValorAtualImovel} />
          <CurrencyInput id="custo-reforma" label="Custo estimado da reforma"
            value={custoReforma} onChange={setCustoReforma} />
          <CurrencyInput id="valor-pos" label="Valor estimado após a reforma"
            value={valorEstimadoAposReforma} onChange={setValorEstimadoAposReforma}
            hint="Considere uma avaliação de mercado realista" />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Corretagem do vendedor: {percentualCorretagem}%
            </label>
            <input type="range" min={0} max={8} step={0.5} value={percentualCorretagem}
              onChange={(e) => setPercentualCorretagem(Number(e.target.value))}
              className="w-full accent-orange-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Tempo até vender após reforma: {mesesAteVenda} {mesesAteVenda === 1 ? "mês" : "meses"}
            </label>
            <input type="range" min={1} max={24} step={1} value={mesesAteVenda}
              onChange={(e) => setMesesAteVenda(Number(e.target.value))}
              className="w-full accent-orange-500" />
          </div>

          <div className="border-t border-slate-100 pt-4">
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Custo de oportunidade: {formatPercent(custoOportunidade)} a.a.
            </label>
            <input type="range" min={5} max={20} step={0.25} value={custoOportunidade}
              onChange={(e) => setCustoOportunidade(Number(e.target.value))}
              className="w-full accent-orange-500" />
            <p className="text-xs text-slate-400 mt-1">
              Taxa que o capital da reforma renderia investido (CDI/Selic). Usado para calcular o custo real de imobilizar o dinheiro.
            </p>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          {/* Veredicto */}
          <div className={`rounded-2xl p-6 text-white ${resultado.valeAPena ? "bg-gradient-to-br from-emerald-600 to-teal-700" : "bg-gradient-to-br from-rose-500 to-red-600"}`}>
            <div className="flex items-center gap-2 mb-2">
              {resultado.valeAPena
                ? <CheckCircle className="w-5 h-5 text-emerald-200" />
                : <XCircle className="w-5 h-5 text-rose-200" />}
              <span className="text-sm font-medium text-white/80">
                {resultado.valeAPena ? "Reforma vale a pena" : "Reforma não compensa"}
              </span>
            </div>
            <p className="text-4xl font-bold mb-1">
              {formatCurrency(Math.abs(resultado.ganhoLiquidoVsOportunidade))}
            </p>
            <p className="text-white/80 text-sm">
              {resultado.valeAPena
                ? "de ganho líquido vs. não reformar e investir o capital"
                : "de custo líquido extra vs. vender sem reformar"}
            </p>
          </div>

          {/* Métricas */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 text-sm">
            <h3 className="font-semibold text-slate-800">Análise detalhada</h3>
            <div className="flex justify-between">
              <span className="text-slate-600">Valorização bruta pela reforma</span>
              <span className="font-semibold text-emerald-700">+{formatCurrency(resultado.valorizacaoBruta)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Custo da reforma</span>
              <span className="font-semibold text-rose-600">-{formatCurrency(custoReforma)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">ROI da reforma (bruto)</span>
              <span className={`font-semibold ${resultado.roi >= 0 ? "text-emerald-700" : "text-rose-600"}`}>
                {formatPercent(resultado.roi, 1)}
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2">
              <span className="text-slate-600">Custo de oportunidade ({mesesAteVenda}m)</span>
              <span className="font-semibold text-rose-600">-{formatCurrency(resultado.custoOportunidadeReforma)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className={resultado.ganhoLiquidoVsOportunidade >= 0 ? "text-emerald-700" : "text-rose-600"}>
                Ganho líquido real
              </span>
              <span className={resultado.ganhoLiquidoVsOportunidade >= 0 ? "text-emerald-700" : "text-rose-600"}>
                {formatCurrency(resultado.ganhoLiquidoVsOportunidade)}
              </span>
            </div>
          </div>

          {/* Comparativo sem/com reforma */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-xs text-slate-500 mb-1">Lucro sem reforma</p>
              <p className="text-lg font-bold text-slate-700">
                {formatCurrency(valorAtualImovel * (1 - percentualCorretagem / 100) - valorAtualImovel)}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">(só corretagem)</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
              <p className="text-xs text-emerald-600 mb-1">Lucro com reforma</p>
              <p className="text-lg font-bold text-slate-700">{formatCurrency(resultado.lucroComReforma)}</p>
              <p className="text-xs text-emerald-600 mt-0.5">(após corretagem e obra)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Wrench className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Boas práticas antes de reformar para vender</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li>Reformas de baixo custo e alto impacto visual (pintura, pisos, iluminação) geralmente têm melhor ROI.</li>
              <li>Evite personalizações — reformas neutras agradam mais compradores.</li>
              <li>Uma vistoria de um corretor experiente pode indicar o que realmente impacta o preço.</li>
              <li>Considere o tempo: reformas atrasam a venda — o custo de oportunidade se acumula.</li>
              <li>Guarde todas as notas fiscais — elas reduzem o Ganho de Capital na venda.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          <strong>Importante:</strong> a valorização estimada após a reforma é subjetiva. Consulte um corretor para uma avaliação realista do mercado local. Este cálculo não inclui o IR sobre o Ganho de Capital.
        </p>
      </div>
    </div>
  );
}
