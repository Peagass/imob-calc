"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { calcularComprarOuAlugar } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, TrendingUp, Home, DollarSign } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


export default function ComprarOuAlugarPage() {
  const [valorImovel, setValorImovel] = useState(500_000);
  const [entrada, setEntrada] = useState(100_000);
  const [taxaFinanciamento, setTaxaFinanciamento] = useState(10.5);
  const [prazoAnos, setPrazoAnos] = useState(30);
  const [aluguelMensal, setAluguelMensal] = useState(2_500);
  const [reajusteAluguel, setReajusteAluguel] = useState(4.62); // IPCA médio histórico
  const [valorizacaoImovel, setValorizacaoImovel] = useState(5.0);
  const [rendimentoInvestimento, setRendimentoInvestimento] = useState(11.0);
  const [anos, setAnos] = useState(20);

  const resultado = useMemo(
    () =>
      calcularComprarOuAlugar({
        valorImovel,
        entrada,
        taxaFinanciamentoAnual: taxaFinanciamento,
        prazoFinanciamentoAnos: prazoAnos,
        aluguelMensal,
        reajusteAluguelAnual: reajusteAluguel,
        valorizacaoImovelAnual: valorizacaoImovel,
        rendimentoInvestimentoAnual: rendimentoInvestimento,
        anos,
      }),
    [valorImovel, entrada, taxaFinanciamento, prazoAnos, aluguelMensal, reajusteAluguel, valorizacaoImovel, rendimentoInvestimento, anos]
  );

  const corResultado = resultado.melhorOpcao === "comprar" ? "text-blue-700" : resultado.melhorOpcao === "alugar" ? "text-emerald-700" : "text-slate-700";
  const bgResultado = resultado.melhorOpcao === "comprar" ? "from-blue-600 to-indigo-700" : resultado.melhorOpcao === "alugar" ? "from-emerald-600 to-teal-700" : "from-slate-600 to-slate-700";

  const dadosGrafico = resultado.evolucao.map((e) => ({
    Ano: e.ano,
    "Patrimônio (Compra)": Math.round(e.patrimonioCompra),
    "Patrimônio (Aluguel)": Math.round(e.patrimonioAluguel),
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Decisão</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Comprar ou Alugar?</h1>
        <p className="text-slate-500">
          Comparação financeira real dos dois caminhos considerando juros, valorização e custo de oportunidade.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Imóvel</p>
          <CurrencyInput id="valor-imovel" label="Valor do imóvel" value={valorImovel} onChange={setValorImovel} />
          <CurrencyInput id="entrada" label={`Entrada (${formatPercent((entrada / valorImovel) * 100, 1)})`} value={entrada} onChange={setEntrada} />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Taxa de financiamento: {formatPercent(taxaFinanciamento)} a.a.</label>
            <input type="range" min={6} max={16} step={0.25} value={taxaFinanciamento} onChange={(e) => setTaxaFinanciamento(Number(e.target.value))} className="w-full accent-emerald-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Valorização do imóvel: {formatPercent(valorizacaoImovel)} a.a.</label>
            <input type="range" min={0} max={15} step={0.5} value={valorizacaoImovel} onChange={(e) => setValorizacaoImovel(Number(e.target.value))} className="w-full accent-emerald-600" />
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Aluguel</p>
            <div className="space-y-4">
              <CurrencyInput id="aluguel" label="Aluguel mensal equivalente" value={aluguelMensal} onChange={setAluguelMensal} />
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Reajuste anual: {formatPercent(reajusteAluguel)} a.a.</label>
                <input type="range" min={0} max={15} step={0.5} value={reajusteAluguel} onChange={(e) => setReajusteAluguel(Number(e.target.value))} className="w-full accent-emerald-600" />
                <p className="text-xs text-slate-400 mt-1">IPCA médio histórico: ~4,6%</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Cenário</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Rendimento do investimento: {formatPercent(rendimentoInvestimento)} a.a.</label>
                <input type="range" min={5} max={16} step={0.5} value={rendimentoInvestimento} onChange={(e) => setRendimentoInvestimento(Number(e.target.value))} className="w-full accent-emerald-600" />
                <p className="text-xs text-slate-400 mt-1">Tesouro Selic/IPCA+: ~11–13% a.a. hoje</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Horizonte de análise: {anos} anos</label>
                <input type="range" min={5} max={35} step={1} value={anos} onChange={(e) => setAnos(Number(e.target.value))} className="w-full accent-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className={`bg-gradient-to-br ${bgResultado} rounded-2xl p-6 text-white`}>
            <p className="text-white/70 text-sm mb-2">Em {anos} anos, a melhor opção financeira é:</p>
            <p className="text-3xl font-bold mb-1 capitalize">
              {resultado.melhorOpcao === "comprar" ? "Comprar" : resultado.melhorOpcao === "alugar" ? "Alugar" : "Empate"}
            </p>
            <p className="text-white/80 text-sm">
              Diferença de patrimônio: <strong>{formatCurrency(resultado.diferencaFinal)}</strong>
            </p>
            {resultado.pontoEquilibrio && (
              <p className="text-white/70 text-xs mt-2">
                Comprar supera alugar a partir do <strong>ano {resultado.pontoEquilibrio}</strong>
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Home className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-blue-600 uppercase">Comprar</span>
              </div>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(resultado.patrimonioFinalCompra)}</p>
              <p className="text-xs text-slate-500 mt-1">Patrimônio em {anos} anos</p>
              <p className="text-xs text-slate-400">Total pago: {formatCurrency(resultado.totalPagoFinanciamento)}</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-600 uppercase">Alugar</span>
              </div>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(resultado.patrimonioFinalAluguel)}</p>
              <p className="text-xs text-slate-500 mt-1">Patrimônio em {anos} anos</p>
              <p className="text-xs text-slate-400">Total em aluguel: {formatCurrency(resultado.totalPagoAluguel)}</p>
            </div>
          </div>

          {/* Gráfico */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Evolução do patrimônio</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="Ano" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => `${v}a`} />
                <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} labelFormatter={(l) => `Ano ${l}`} />
                <Legend />
                {resultado.pontoEquilibrio && (
                  <ReferenceLine x={resultado.pontoEquilibrio} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: `Equilíbrio`, fill: "#f59e0b", fontSize: 11 }} />
                )}
                <Line type="monotone" dataKey="Patrimônio (Compra)" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Patrimônio (Aluguel)" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Educação */}
      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Como funciona este cálculo?</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li><strong>Cenário compra:</strong> você paga as parcelas do financiamento. Patrimônio = valor do imóvel (com valorização) menos saldo devedor.</li>
              <li><strong>Cenário aluguel:</strong> você investe a entrada que não gastou. A diferença entre a parcela e o aluguel também é investida todo mês.</li>
              <li>O resultado depende muito da taxa de rendimento do investimento e da valorização do imóvel — mude os sliders para ver como os cenários se invertem.</li>
              <li>Fatores não financeiros (segurança, liberdade de reformar, localização) também importam na decisão.</li>
            </ul>
          </div>
        </div>
      </div>

      <FaqSection path="/comprar-ou-alugar" />
      <RelatedCalculators path="/comprar-ou-alugar" />
    </div>
  );
}
