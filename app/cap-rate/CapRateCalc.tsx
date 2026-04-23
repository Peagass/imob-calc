"use client";

import { useState, useMemo } from "react";
import { calcularCapRate } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import { type IndiceAcumulado } from "@/lib/indices";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, TrendingUp, TrendingDown, Minus } from "lucide-react";

// Benchmarks estáticos que não dependem de API pública e são relativamente estáveis
const BENCHMARKS_ESTATICOS = [
  { label: "Tesouro IPCA+5%", valor: 10.5 },
  { label: "FII médio (DY)", valor: 8.5 },
  { label: "Poupança", valor: 6.17 },
];

interface Props {
  selic: IndiceAcumulado;
}

export default function CapRateCalc({ selic }: Props) {
  const [valorImovel, setValorImovel] = useState(500_000);
  const [aluguelMensal, setAluguelMensal] = useState(2_500);
  const [despesasMensais, setDespesasMensais] = useState(500);
  const [vacancia, setVacancia] = useState(8);

  const resultado = useMemo(
    () => calcularCapRate({ valorImovel, aluguelMensal, despesasMensais, vacanciaPercentual: vacancia }),
    [valorImovel, aluguelMensal, despesasMensais, vacancia]
  );

  const selicValor = selic.erro ? null : selic.valor;
  const diferenca = selicValor !== null ? resultado.capRateLiquido - selicValor : null;
  const DifIcon = diferenca === null ? Minus : diferenca > 0.5 ? TrendingUp : diferenca < -0.5 ? TrendingDown : Minus;
  const difCor = diferenca === null ? "text-slate-400" : diferenca > 0.5 ? "text-emerald-600" : diferenca < -0.5 ? "text-rose-600" : "text-slate-500";

  const benchmarks = [
    ...(selicValor !== null ? [{ label: `Selic (${selic.referencia})`, valor: selicValor, destaque: true }] : []),
    ...BENCHMARKS_ESTATICOS.map((b) => ({ ...b, destaque: false })),
  ];

  const maxBenchmark = Math.max(...benchmarks.map((b) => b.valor), resultado.capRateLiquido, 12);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
        <CurrencyInput id="valor-imovel" label="Valor do imóvel" value={valorImovel} onChange={setValorImovel} />
        <CurrencyInput id="aluguel" label="Aluguel mensal recebido" value={aluguelMensal} onChange={setAluguelMensal} />
        <CurrencyInput
          id="despesas"
          label="Despesas mensais a cargo do proprietário"
          value={despesasMensais}
          onChange={setDespesasMensais}
          hint="IPTU ÷ 12, manutenção, seguro, administradora"
        />

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">
            Vacância estimada: {vacancia}% (~{Math.round((vacancia / 100) * 12 * 10) / 10} meses/ano)
          </label>
          <input
            type="range" min={0} max={25} step={1}
            value={vacancia} onChange={(e) => setVacancia(Number(e.target.value))}
            className="w-full accent-violet-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0% (nunca vaga)</span>
            <span>25% (3 meses/ano)</span>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Receita bruta anual</span>
            <span className="font-semibold">{formatCurrency(resultado.receitaAnualBruta)}</span>
          </div>
          <div className="flex justify-between text-rose-600">
            <span>− Perda por vacância</span>
            <span className="font-semibold">− {formatCurrency(resultado.perdaVacancia)}</span>
          </div>
          <div className="flex justify-between text-rose-600">
            <span>− Despesas anuais</span>
            <span className="font-semibold">− {formatCurrency(resultado.despesasAnuais)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2 text-emerald-700 font-bold">
            <span>= Receita líquida anual</span>
            <span>{formatCurrency(resultado.receitaAnualLiquida)}</span>
          </div>
        </div>
      </div>

      {/* Resultado */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 text-center">
            <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Cap Rate Bruto</p>
            <p className="text-3xl font-bold text-slate-700">{formatPercent(resultado.capRateBruto)}</p>
            <p className="text-xs text-slate-400 mt-1">sem descontar despesas</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
            <p className="text-xs text-emerald-700 mb-2 uppercase tracking-wide font-semibold">Cap Rate Líquido</p>
            <p className="text-3xl font-bold text-emerald-700">{formatPercent(resultado.capRateLiquido)}</p>
            <p className="text-xs text-emerald-600 mt-1">retorno real</p>
          </div>
        </div>

        {/* Comparação com Selic */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-slate-700">
              Vs. Selic {selicValor !== null ? `(${formatPercent(selicValor)} · ${selic.referencia})` : "(indisponível)"}
            </p>
            {diferenca !== null && (
              <div className={`flex items-center gap-1 font-bold ${difCor}`}>
                <DifIcon className="w-4 h-4" />
                <span>{diferenca > 0 ? "+" : ""}{formatPercent(Math.abs(diferenca))}</span>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-400">
            {diferenca === null
              ? "Selic indisponível no momento."
              : diferenca > 0.5
              ? "O imóvel supera a taxa básica de juros — bom retorno."
              : diferenca < -0.5
              ? "A Selic está mais rentável do que o aluguel neste cenário."
              : "Rentabilidade próxima da Selic — considere liquidez e valorização."}
          </p>
        </div>

        {/* Payback */}
        <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-5 text-white">
          <p className="text-violet-200 text-sm mb-1">Tempo para recuperar o investimento</p>
          <p className="text-4xl font-bold">
            {isFinite(resultado.paybackAnos) ? `${resultado.paybackAnos.toFixed(1)} anos` : "∞"}
          </p>
          <p className="text-violet-200 text-xs mt-2">
            Considerando apenas a receita líquida de aluguel, sem contar valorização do imóvel.
          </p>
        </div>

        {/* Benchmarks */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Comparativo com outras aplicações</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-emerald-600 w-28 shrink-0">Imóvel (líquido)</span>
              <div className="flex-1 bg-slate-100 rounded-full h-2.5">
                <div className="bg-emerald-500 h-2.5 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (resultado.capRateLiquido / maxBenchmark) * 100)}%` }} />
              </div>
              <span className="text-sm font-bold text-slate-900 w-14 text-right shrink-0">
                {formatPercent(resultado.capRateLiquido)}
              </span>
            </div>
            {benchmarks.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <span className={`text-xs font-medium w-28 shrink-0 ${b.destaque ? "text-blue-600 font-semibold" : "text-slate-500"}`}>
                  {b.label}
                </span>
                <div className="flex-1 bg-slate-100 rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${b.destaque ? "bg-blue-300" : "bg-slate-300"}`}
                    style={{ width: `${Math.min(100, (b.valor / maxBenchmark) * 100)}%` }} />
                </div>
                <span className="text-sm font-semibold text-slate-600 w-14 text-right shrink-0">
                  {formatPercent(b.valor)}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Tesouro e FII são estimativas. Selic via BCB/SGS.
          </p>
        </div>
      </div>

      <div className="md:col-span-2 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">O que isso significa?</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li><strong>Cap Rate bruto</strong>: aluguel anual ÷ valor do imóvel. Ignora custos reais — útil só para comparar imóveis entre si.</li>
              <li><strong>Cap Rate líquido</strong>: desconta despesas do proprietário e períodos vagos. É o retorno real do seu dinheiro.</li>
              <li><strong>Vacância</strong> é um dos maiores vilões do retorno. Um imóvel que fica 2 meses vago por ano tem vacância de ~17%.</li>
              <li>O Cap Rate não considera a <strong>valorização do imóvel</strong>, que pode ser o retorno mais relevante no longo prazo.</li>
              <li>Despesas típicas do proprietário: IPTU, seguro incêndio, taxa de administração (8–10% do aluguel), manutenção estrutural.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
