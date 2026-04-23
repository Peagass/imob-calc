"use client";

import { useState, useMemo } from "react";
import { calcularFGTS } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, CheckCircle, XCircle, PiggyBank } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


export default function FGTSPage() {
  const [salarioBruto, setSalarioBruto] = useState(6_000);
  const [mesesContribuicao, setMesesContribuicao] = useState(48);
  const [saldoAtual, setSaldoAtual] = useState(18_000);
  const [mesesParaProjetar, setMesesParaProjetar] = useState(36);
  const [usarParaHabitacao, setUsarParaHabitacao] = useState(true);
  const [valorImovelPretendido, setValorImovelPretendido] = useState(400_000);

  const resultado = useMemo(
    () => calcularFGTS({ salarioBruto, mesesContribuicao, saldoAtual, mesesParaProjetar, usarParaHabitacao, valorImovelPretendido }),
    [salarioBruto, mesesContribuicao, saldoAtual, mesesParaProjetar, usarParaHabitacao, valorImovelPretendido]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Simulador de FGTS</h1>
        <p className="text-slate-500">
          Projete o saldo do seu FGTS e descubra quanto pode usar como entrada na compra do seu imóvel.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput id="salario" label="Salário bruto mensal" value={salarioBruto} onChange={setSalarioBruto}
            hint="O depósito mensal é 8% do salário bruto" />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Meses com FGTS acumulado: {mesesContribuicao} meses ({(mesesContribuicao / 12).toFixed(1)} anos)
            </label>
            <input type="range" min={0} max={360} step={6} value={mesesContribuicao}
              onChange={(e) => setMesesContribuicao(Number(e.target.value))}
              className="w-full accent-blue-600" />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0</span><span>30 anos</span>
            </div>
          </div>

          <CurrencyInput id="saldo" label="Saldo atual do FGTS" value={saldoAtual} onChange={setSaldoAtual}
            hint="Consulte pelo app FGTS ou internet banking da Caixa" />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Projetar por: {mesesParaProjetar} meses ({(mesesParaProjetar / 12).toFixed(1)} anos)
            </label>
            <input type="range" min={6} max={120} step={6} value={mesesParaProjetar}
              onChange={(e) => setMesesParaProjetar(Number(e.target.value))}
              className="w-full accent-blue-600" />
          </div>

          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3 mb-3">
              <input type="checkbox" id="habitacao" checked={usarParaHabitacao}
                onChange={(e) => setUsarParaHabitacao(e.target.checked)}
                className="w-4 h-4 rounded accent-blue-600" />
              <label htmlFor="habitacao" className="text-sm font-medium text-slate-700 cursor-pointer">
                Quero usar o FGTS para comprar imóvel
              </label>
            </div>
            {usarParaHabitacao && (
              <CurrencyInput id="imovel" label="Valor do imóvel pretendido"
                value={valorImovelPretendido} onChange={setValorImovelPretendido} />
            )}
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          {/* Saldo projetado */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <PiggyBank className="w-5 h-5 text-blue-200" />
              <p className="text-blue-100 text-sm">Saldo projetado em {mesesParaProjetar} meses</p>
            </div>
            <p className="text-4xl font-bold mb-1">{formatCurrency(resultado.saldoProjetado)}</p>
            <p className="text-blue-200 text-sm">
              Depósitos: {formatCurrency(resultado.totalDepositado)} · Rendimentos: {formatCurrency(resultado.rendimentoTotal)}
            </p>
          </div>

          {/* Depósito mensal */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">Depósito mensal (8%)</p>
              <p className="text-xl font-bold text-slate-800">{formatCurrency(resultado.depositosMensais)}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">Rendimento (3% a.a. + TR)</p>
              <p className="text-xl font-bold text-slate-800">{formatCurrency(resultado.rendimentoTotal)}</p>
            </div>
          </div>

          {/* Elegibilidade para habitação */}
          <div className={`rounded-2xl border p-5 ${resultado.elegibilidadeHabitacao ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
            <div className="flex items-center gap-2 mb-2">
              {resultado.elegibilidadeHabitacao
                ? <CheckCircle className="w-5 h-5 text-emerald-600" />
                : <XCircle className="w-5 h-5 text-amber-500" />}
              <span className={`font-semibold text-sm ${resultado.elegibilidadeHabitacao ? "text-emerald-800" : "text-amber-800"}`}>
                {resultado.elegibilidadeHabitacao ? "Elegível para uso habitacional" : "Ainda não elegível"}
              </span>
            </div>
            <p className={`text-sm ${resultado.elegibilidadeHabitacao ? "text-emerald-700" : "text-amber-700"}`}>
              {resultado.elegibilidadeHabitacao
                ? `Com ${mesesContribuicao + mesesParaProjetar} meses de FGTS, você atende o mínimo de 36 meses.`
                : `São necessários 36 meses de contribuição. Faltam ${Math.max(0, 36 - mesesContribuicao - mesesParaProjetar)} meses.`}
            </p>
          </div>

          {/* Uso para habitação */}
          {usarParaHabitacao && resultado.elegibilidadeHabitacao && (
            <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 text-sm">
              <h3 className="font-semibold text-slate-800">Uso na compra do imóvel</h3>
              <div className="flex justify-between">
                <span className="text-slate-600">Saldo projetado disponível</span>
                <span className="font-semibold">{formatCurrency(resultado.saldoProjetado)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Limite (80% do valor do imóvel)</span>
                <span className="font-semibold">{formatCurrency(valorImovelPretendido * 0.80)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2 font-bold text-blue-700">
                <span>FGTS disponível para uso</span>
                <span>{formatCurrency(resultado.fgtsParaEntrada)}</span>
              </div>
              <p className="text-xs text-slate-400">
                O FGTS pode complementar a entrada e/ou reduzir o saldo financiado — regras do SFH.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Como usar o FGTS na compra de imóvel (SFH)</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li>Mínimo de <strong>3 anos de contribuição</strong> ao FGTS (não precisa ser no mesmo empregador).</li>
              <li>O imóvel deve ser <strong>residencial urbano</strong> e para uso próprio do comprador.</li>
              <li>O comprador não pode ter outro imóvel residencial na mesma cidade ou região metropolitana.</li>
              <li>Limite de uso: até 80% do valor do imóvel, respeitando o teto do SFH (R$ 1,5 milhão em 2024).</li>
              <li>Pode ser usado para entrada, amortização do saldo devedor ou pagamento de até 80% das parcelas.</li>
              <li>O rendimento do FGTS (3% a.a. + TR) costuma ser abaixo da inflação — use-o o quanto antes.</li>
            </ul>
          </div>
        </div>
      </div>

      <FaqSection path="/fgts" />
      <RelatedCalculators path="/fgts" />
    </div>
  );
}
