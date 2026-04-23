"use client";

import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";
import { calcularTIRImovel } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, TrendingUp, TrendingDown } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


function Slider({ label, value, display, min, max, step, onChange, accent = "accent-teal-600" }: {
  label: string; value: number; display: string;
  min: number; max: number; step: number;
  onChange: (v: number) => void; accent?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-baseline">
        <span className="text-xs text-slate-500 leading-tight">{label}</span>
        <span className="text-xs font-bold text-slate-700 ml-2 shrink-0">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-1.5 rounded-full ${accent}`} />
    </div>
  );
}

export default function TIRImovelPage() {
  const [valorImovel, setValorImovel] = useState(500_000);
  const [entradaPercentual, setEntradaPercentual] = useState(20);
  const [taxaFinanciamentoAnual, setTaxaFinanciamentoAnual] = useState(11.5);
  const [prazoFinanciamentoMeses, setPrazoFinanciamentoMeses] = useState(240);
  const [sistemaAmortizacao, setSistemaAmortizacao] = useState<"PRICE" | "SAC">("SAC");
  const [custosCompraPercentual, setCustosCompraPercentual] = useState(4);
  const [aluguelMensal, setAluguelMensal] = useState(2_500);
  const [reajusteAluguelAnual, setReajusteAluguelAnual] = useState(5);
  const [despesasMensais, setDespesasMensais] = useState(400);
  const [vacanciaPercentual, setVacanciaPercentual] = useState(8);
  const [valorizacaoAnual, setValorizacaoAnual] = useState(4);
  const [horizonteAnos, setHorizonteAnos] = useState(10);
  const [percentualCorretagem, setPercentualCorretagem] = useState(6);

  const r = useMemo(
    () => calcularTIRImovel({
      valorImovel, entradaPercentual, taxaFinanciamentoAnual, prazoFinanciamentoMeses,
      sistemaAmortizacao, custosCompraPercentual, aluguelMensal, reajusteAluguelAnual,
      despesasMensais, vacanciaPercentual, valorizacaoAnual, horizonteAnos, percentualCorretagem,
    }),
    [valorImovel, entradaPercentual, taxaFinanciamentoAnual, prazoFinanciamentoMeses,
      sistemaAmortizacao, custosCompraPercentual, aluguelMensal, reajusteAluguelAnual,
      despesasMensais, vacanciaPercentual, valorizacaoAnual, horizonteAnos, percentualCorretagem]
  );

  const tirPositiva = r.tirAnual > 0;
  const parcelaVaria = sistemaAmortizacao === "SAC";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header compacto */}
      <div className="mb-6">
        <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">Investimento</span>
        <h1 className="text-2xl font-bold text-slate-900 mt-0.5">TIR do Investimento Imobiliário</h1>
        <p className="text-sm text-slate-500 mt-1">
          Taxa Interna de Retorno com parcelas {sistemaAmortizacao} e aluguel reajustado {formatPercent(reajusteAluguelAnual)} a.a.
        </p>
      </div>

      {/* Inputs em 3 colunas */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">

          {/* Coluna 1 — Imóvel */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Imóvel</p>
            <CurrencyInput id="valor" label="Valor do imóvel" value={valorImovel} onChange={setValorImovel} />
            <Slider label="Entrada" value={entradaPercentual} display={`${entradaPercentual}% · ${formatCurrency(valorImovel * entradaPercentual / 100)}`}
              min={0} max={100} step={5} onChange={setEntradaPercentual} />
            <Slider label="Custos de compra (ITBI + cartório)" value={custosCompraPercentual} display={`${formatPercent(custosCompraPercentual)}`}
              min={2} max={8} step={0.5} onChange={setCustosCompraPercentual} />
          </div>

          {/* Coluna 2 — Financiamento + Receita */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Financiamento</p>
            {/* SAC / PRICE */}
            <div>
              <div className="flex gap-2 mb-1">
                {(["SAC", "PRICE"] as const).map((s) => (
                  <button key={s} onClick={() => setSistemaAmortizacao(s)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                      sistemaAmortizacao === s
                        ? "bg-teal-600 text-white border-teal-600"
                        : "bg-white text-slate-500 border-slate-200 hover:border-teal-300"
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400">
                {sistemaAmortizacao === "SAC" ? "Parcela cai mês a mês" : "Parcela fixa durante todo o prazo"}
              </p>
            </div>
            <Slider label="Taxa de juros" value={taxaFinanciamentoAnual} display={`${formatPercent(taxaFinanciamentoAnual)} a.a.`}
              min={6} max={18} step={0.25} onChange={setTaxaFinanciamentoAnual} />
            <Slider label="Prazo" value={prazoFinanciamentoMeses} display={`${prazoFinanciamentoMeses / 12} anos`}
              min={60} max={360} step={12} onChange={setPrazoFinanciamentoMeses} />

            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-1">Receita & Despesas</p>
            <CurrencyInput id="aluguel" label="Aluguel mensal inicial" value={aluguelMensal} onChange={setAluguelMensal} />
            <Slider label="Reajuste anual do aluguel (IGPM/IPCA)" value={reajusteAluguelAnual}
              display={`${formatPercent(reajusteAluguelAnual)} a.a.`}
              min={0} max={15} step={0.5} onChange={setReajusteAluguelAnual} />
          </div>

          {/* Coluna 3 — Despesas + Saída */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Despesas & Saída</p>
            <CurrencyInput id="despesas" label="Despesas mensais (IPTU, condomínio)" value={despesasMensais} onChange={setDespesasMensais} />
            <Slider label="Vacância" value={vacanciaPercentual} display={`${formatPercent(vacanciaPercentual)} do tempo`}
              min={0} max={30} step={1} onChange={setVacanciaPercentual} />

            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-1">Venda</p>
            <Slider label="Valorização do imóvel" value={valorizacaoAnual} display={`${formatPercent(valorizacaoAnual)} a.a.`}
              min={-2} max={15} step={0.5} onChange={setValorizacaoAnual} />
            <Slider label="Horizonte de saída" value={horizonteAnos} display={`${horizonteAnos} anos`}
              min={3} max={20} step={1} onChange={setHorizonteAnos} />
            <Slider label="Corretagem na venda" value={percentualCorretagem} display={`${formatPercent(percentualCorretagem)}`}
              min={3} max={8} step={0.5} onChange={setPercentualCorretagem} />
          </div>
        </div>
      </div>

      {/* Resultados: hero TIR + 4 KPI cards em linha */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-5">
        {/* TIR — hero */}
        <div className={`col-span-2 md:col-span-1 rounded-2xl p-5 text-white flex flex-col justify-between ${
          tirPositiva ? "bg-gradient-to-br from-teal-600 to-emerald-700" : "bg-gradient-to-br from-rose-600 to-red-700"
        }`}>
          <div className="flex items-center gap-1.5 mb-3">
            {tirPositiva ? <TrendingUp className="w-4 h-4 text-white/70" /> : <TrendingDown className="w-4 h-4 text-white/70" />}
            <p className="text-white/70 text-xs">TIR do investimento</p>
          </div>
          <div>
            <p className="text-3xl font-bold leading-none">{formatPercent(r.tirAnual, 1)}</p>
            <p className="text-white/70 text-xs mt-1">ao ano · {horizonteAnos} anos</p>
          </div>
          <p className="text-white/60 text-xs mt-3">
            Venda: {formatCurrency(r.valorVendaFinal)}
          </p>
        </div>

        {/* KPI: capital */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col justify-between">
          <p className="text-xs text-slate-400 mb-1">Capital inicial</p>
          <p className="text-lg font-bold text-slate-900">{formatCurrency(r.entradaTotal)}</p>
          <p className="text-[10px] text-slate-400 mt-1">entrada + ITBI + cartório</p>
        </div>

        {/* KPI: aluguel */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col justify-between">
          <p className="text-xs text-slate-400 mb-1">Total aluguel recebido</p>
          <p className="text-lg font-bold text-slate-900">{formatCurrency(r.totalRecebidoAluguel)}</p>
          <p className="text-[10px] text-slate-400 mt-1">
            {formatCurrency(r.aluguelAno1 / 12)} → {formatCurrency(r.aluguelUltimoAno / 12)}/mês
          </p>
        </div>

        {/* KPI: banco */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col justify-between">
          <p className="text-xs text-slate-400 mb-1">Total pago ao banco</p>
          <p className="text-lg font-bold text-slate-900">{formatCurrency(r.totalPagoFinanciamento)}</p>
          <p className="text-[10px] text-slate-400 mt-1">
            {parcelaVaria
              ? `${formatCurrency(r.parcelaInicial)} → ${formatCurrency(r.parcelaFinal)}/mês`
              : `${formatCurrency(r.parcelaInicial)}/mês fixo`}
          </p>
        </div>

        {/* KPI: CF mensal */}
        <div className={`rounded-2xl border p-4 flex flex-col justify-between ${
          r.cashFlowMedioMensal >= 0 ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"
        }`}>
          <p className={`text-xs mb-1 ${r.cashFlowMedioMensal >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            CF médio — 1º ano
          </p>
          <p className={`text-lg font-bold ${r.cashFlowMedioMensal >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
            {formatCurrency(r.cashFlowMedioMensal)}
          </p>
          <p className={`text-[10px] mt-1 ${r.cashFlowMedioMensal >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
            {r.cashFlowMedioMensal >= 0 ? "fluxo positivo" : "aporte necessário/mês"}
          </p>
        </div>
      </div>

      {/* Gráfico largura total */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Evolução do patrimônio e fluxo acumulado</h3>
            <p className="text-xs text-slate-400">Patrimônio líquido (imóvel − saldo devedor + CF) vs. fluxo de caixa acumulado</p>
          </div>
          <div className="flex gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-teal-600 inline-block rounded" /> Patrimônio</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-orange-400 inline-block rounded" /> Fluxo acum.</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={r.evolucaoCashFlow}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="ano" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => `Ano ${v}`} />
            <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#94a3b8" }} width={48} />
            <Tooltip
              formatter={(v, name) => [
                formatCurrency(Number(v)),
                name === "saldo" ? "Patrimônio líquido" : "Fluxo acumulado",
              ]}
              labelFormatter={(l) => `Ano ${l}`}
            />
            <ReferenceLine y={0} stroke="#cbd5e1" strokeDasharray="4 4" />
            <Line type="monotone" dataKey="cfAcumulado" name="cfAcumulado" stroke="#fb923c" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="saldo" name="saldo" stroke="#0d9488" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          TIR calculada sobre fluxos de caixa anuais reais: saída inicial (ano 0), diferença entre aluguel reajustado e parcela {sistemaAmortizacao} a cada ano, e receita líquida da venda no ano {horizonteAnos}. Não inclui IR sobre ganho de capital nem tributação do aluguel.
        </p>
      </div>

      <FaqSection path="/tir-imovel" />
      <RelatedCalculators path="/tir-imovel" />
    </div>
  );
}
