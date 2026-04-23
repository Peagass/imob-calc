"use client";

import { useState, useMemo } from "react";
import { calcularPermuta } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, AlertTriangle, ArrowLeftRight } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


export default function PermutaImovelPage() {
  const [valorA, setValorA] = useState(500_000);
  const [dividaA, setDividaA] = useState(150_000);
  const [valorB, setValorB] = useState(450_000);
  const [dividaB, setDividaB] = useState(0);
  const [itbiPercentual, setItbiPercentual] = useState(3);
  const [cartorioPercentual, setCartorioPercentual] = useState(1);
  const [custoCorretagem, setCustoCorretagem] = useState(0);
  const [ganhoCapitalA, setGanhoCapitalA] = useState(80_000);
  const [isencaoIR, setIsencaoIR] = useState(false);

  const r = useMemo(() => calcularPermuta({
    valorImovelA: valorA, dividaImovelA: dividaA,
    valorImovelB: valorB, dividaImovelB: dividaB,
    itbiPercentual, cartorioPercentual, custoCorretagem,
    ganhoCapitalA, isencaoIR,
  }), [valorA, dividaA, valorB, dividaB, itbiPercentual, cartorioPercentual, custoCorretagem, ganhoCapitalA, isencaoIR]);

  const Row = ({ label, value, accent }: { label: string; value: string; accent?: string }) => (
    <div className="flex justify-between items-baseline py-2 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-500">{label}</span>
      <span className={`text-sm font-bold ${accent ?? "text-slate-800"}`}>{value}</span>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">Venda & Herança</span>
        <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Calculadora de Permuta de Imóvel</h1>
        <p className="text-sm text-slate-500 mt-1">Calcule a torna, os custos da operação e compare com a alternativa de vender e comprar separado.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-5">
        {/* Imóvel A */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">A</span>
            <p className="text-sm font-bold text-slate-700">Seu imóvel</p>
          </div>
          <CurrencyInput id="valorA" label="Valor de mercado" value={valorA} onChange={setValorA} />
          <CurrencyInput id="dividaA" label="Dívida / financiamento em aberto" value={dividaA} onChange={setDividaA} />
          <div className="bg-violet-50 rounded-xl p-3">
            <p className="text-xs text-violet-600">Patrimônio líquido</p>
            <p className="text-lg font-bold text-violet-800">{formatCurrency(r.patrimonioLiquidoA)}</p>
          </div>
          <CurrencyInput id="ganho" label="Ganho de capital estimado (lucro na permuta)" value={ganhoCapitalA} onChange={setGanhoCapitalA} />
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => setIsencaoIR(!isencaoIR)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isencaoIR ? "bg-violet-600" : "bg-slate-200"}`}
            >
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${isencaoIR ? "translate-x-4" : "translate-x-0.5"}`} />
            </div>
            <span className="text-xs text-slate-600">Isenção de IR (único imóvel, ≤ R$ 440k)</span>
          </label>
        </div>

        {/* Seta + torna */}
        <div className="flex flex-col items-center justify-center gap-4">
          <ArrowLeftRight className="w-10 h-10 text-slate-300" />
          <div className={`rounded-2xl p-5 text-center w-full ${r.torna === 0 ? "bg-emerald-50 border border-emerald-100" : "bg-amber-50 border border-amber-100"}`}>
            <p className="text-xs font-semibold text-slate-500 mb-1">Torna</p>
            <p className={`text-2xl font-bold ${r.torna === 0 ? "text-emerald-700" : "text-amber-700"}`}>
              {r.torna === 0 ? "Sem torna" : formatCurrency(r.torna)}
            </p>
            <p className="text-xs text-slate-500 mt-2">{r.quemPagaTorna}</p>
          </div>

          <div className="w-full bg-white rounded-2xl border border-slate-100 p-4 space-y-1">
            <Row label="ITBI" value={formatCurrency(r.custoITBI)} />
            <Row label="Cartório" value={formatCurrency(r.custoCartorio)} />
            {r.custoCorretagem > 0 && <Row label="Corretagem" value={formatCurrency(r.custoCorretagem)} />}
            {r.irGanhoCapital > 0 && <Row label="IR ganho de capital" value={formatCurrency(r.irGanhoCapital)} accent="text-rose-600" />}
            <div className="pt-2 border-t border-slate-100">
              <Row label="Custo total da operação" value={formatCurrency(r.custoTotalTransacao + r.irGanhoCapital)} accent="text-rose-600" />
            </div>
          </div>
        </div>

        {/* Imóvel B */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">B</span>
            <p className="text-sm font-bold text-slate-700">Imóvel desejado</p>
          </div>
          <CurrencyInput id="valorB" label="Valor de mercado" value={valorB} onChange={setValorB} />
          <CurrencyInput id="dividaB" label="Dívida / financiamento em aberto" value={dividaB} onChange={setDividaB} />
          <div className="bg-indigo-50 rounded-xl p-3">
            <p className="text-xs text-indigo-600">Patrimônio líquido</p>
            <p className="text-lg font-bold text-indigo-800">{formatCurrency(r.patrimonioLiquidoB)}</p>
          </div>
        </div>
      </div>

      {/* Custos de transação */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Custos de transação</p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-slate-500">ITBI (sobre menor valor)</span>
              <span className="text-xs font-bold text-slate-700">{formatPercent(itbiPercentual)}</span>
            </div>
            <input type="range" min={1} max={5} step={0.5} value={itbiPercentual}
              onChange={(e) => setItbiPercentual(Number(e.target.value))}
              className="w-full accent-violet-600 h-1.5 rounded-full" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-slate-500">Cartório (sobre ambos)</span>
              <span className="text-xs font-bold text-slate-700">{formatPercent(cartorioPercentual)}</span>
            </div>
            <input type="range" min={0.5} max={3} step={0.1} value={cartorioPercentual}
              onChange={(e) => setCartorioPercentual(Number(e.target.value))}
              className="w-full accent-violet-600 h-1.5 rounded-full" />
          </div>
          <CurrencyInput id="corr" label="Corretagem (se houver)" value={custoCorretagem} onChange={setCustoCorretagem} />
        </div>
      </div>

      {/* Comparativo vs. venda tradicional */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-2xl p-5 text-white mb-4">
        <p className="text-white/70 text-xs mb-2">Economia vs. vender A e comprar B separado</p>
        <p className="text-3xl font-bold mb-1">{formatCurrency(r.economiaVsVendaCompra)}</p>
        <p className="text-white/70 text-sm">
          Custo na venda convencional: {formatCurrency(r.custoEquivalenteVendaCompra)} · Permuta: {formatCurrency(r.custoTotalTransacao)}
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-4">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2 text-sm">Observações importantes</h3>
            <ul className="space-y-1.5">
              {r.observacoes.map((o) => (
                <li key={o} className="text-xs text-amber-800 flex gap-2">
                  <span className="shrink-0">→</span>{o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          A permuta é vantajosa principalmente quando ambas as partes querem o imóvel da outra. Reduz o custo de transação por evitar duas operações de venda independentes. Consulte um advogado imobiliário para redigir a escritura de permuta e verificar as regras de ITBI do seu município.
        </p>
      </div>

      <FaqSection path="/permuta-imovel" />
      <RelatedCalculators path="/permuta-imovel" />
    </div>
  );
}
