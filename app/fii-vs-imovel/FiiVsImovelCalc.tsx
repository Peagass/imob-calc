"use client";

import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { calcularFiiVsImovel } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, RefreshCw, TrendingUp } from "lucide-react";
import type { IndiceAcumulado } from "@/lib/indices";

interface Props { selic: IndiceAcumulado }

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        onClick={() => onChange(!on)}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${on ? "bg-violet-600" : "bg-slate-200"}`}
      >
        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
      </div>
      <span className="text-xs text-slate-600">{label}</span>
    </label>
  );
}

function SliderField({ label, value, display, min, max, step, onChange, accent = "accent-violet-600" }: {
  label: string; value: number; display: string; min: number; max: number; step: number;
  onChange: (v: number) => void; accent?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span className="text-xs text-slate-500">{label}</span>
        <span className="text-xs font-bold text-slate-700">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full ${accent} h-1.5 rounded-full`} />
    </div>
  );
}

export default function FiiVsImovelCalc({ selic }: Props) {
  const [valorInvestimento, setValorInvestimento] = useState(500_000);
  const [horizonte, setHorizonte] = useState(20);

  // FII
  const [dividendYieldFII, setDividendYieldFII] = useState(9.5);
  const [valorizacaoFII, setValorizacaoFII] = useState(3.0);
  const [irFII, setIrFII] = useState(0);
  const [reinvestirDividendosFII, setReinvestirDividendosFII] = useState(true);

  // Imóvel
  const [aluguelMensal, setAluguelMensal] = useState(2_500);
  const [reajusteAluguelAnual, setReajusteAluguelAnual] = useState(5);
  const [despesasAnuaisImovel, setDespesasAnuaisImovel] = useState(8_400);
  const [vacanciaPercentual, setVacanciaPercentual] = useState(8);
  const [valorizacaoImovel, setValorizacaoImovel] = useState(5.0);
  const [reinvestirRendaImovel, setReinvestirRendaImovel] = useState(false);
  const [taxaReinvestimento, setTaxaReinvestimento] = useState(
    selic.erro ? 14.75 : selic.valor
  );

  const r = useMemo(
    () => calcularFiiVsImovel({
      valorInvestimento, dividendYieldFII, valorizacaoFII, reinvestirDividendosFII,
      aluguelMensal, reajusteAluguelAnual, despesasAnuaisImovel, vacanciaPercentual,
      valorizacaoImovel, horizonte, irFII, reinvestirRendaImovel, taxaReinvestimento,
    }),
    [valorInvestimento, dividendYieldFII, valorizacaoFII, reinvestirDividendosFII,
     aluguelMensal, reajusteAluguelAnual, despesasAnuaisImovel, vacanciaPercentual,
     valorizacaoImovel, horizonte, irFII, reinvestirRendaImovel, taxaReinvestimento]
  );

  const corMelhor =
    r.melhor === "fii" ? "from-violet-600 to-purple-700" :
    r.melhor === "imovel" ? "from-emerald-600 to-teal-700" :
    "from-slate-600 to-slate-700";

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-5">
        {/* ── INPUTS ── */}
        <div className="space-y-4">
          {/* Geral */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Geral</p>
            <CurrencyInput id="investimento" label="Capital disponível"
              value={valorInvestimento} onChange={setValorInvestimento}
              hint="Mesmo valor aplicado nos dois cenários" />
            <SliderField label="Horizonte de análise" value={horizonte}
              display={`${horizonte} anos`} min={3} max={30} step={1}
              onChange={setHorizonte} />
          </div>

          {/* FII */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
            <p className="text-[10px] font-bold text-violet-500 uppercase tracking-widest">FII</p>
            <SliderField label="Dividend yield" value={dividendYieldFII}
              display={`${formatPercent(dividendYieldFII)} a.a.`} min={4} max={18} step={0.5}
              onChange={setDividendYieldFII} />
            <p className="text-[10px] text-slate-400 -mt-2">Média histórica: 8–11% a.a. · Consulte B3 ou FIIs.com.br</p>
            <SliderField label="Valorização das cotas" value={valorizacaoFII}
              display={`${formatPercent(valorizacaoFII)} a.a.`} min={-5} max={15} step={0.5}
              onChange={setValorizacaoFII} />

            <div>
              <p className="text-xs text-slate-500 mb-1.5">IR sobre dividendos</p>
              <div className="flex gap-2">
                {[0, 15, 20].map((v) => (
                  <button key={v} onClick={() => setIrFII(v)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                      irFII === v ? "bg-violet-600 text-white border-violet-600" : "bg-white text-slate-500 border-slate-200"
                    }`}>
                    {v === 0 ? "0% (isento)" : `${v}%`}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">PF isento hoje (≥50 cotistas). Pode mudar com reforma tributária.</p>
            </div>

            <Toggle
              on={reinvestirDividendosFII}
              onChange={setReinvestirDividendosFII}
              label={reinvestirDividendosFII
                ? "Reinvestir DY em novas cotas (juros compostos)"
                : "Usar DY como renda mensal (não reinvestir)"}
            />
            {!reinvestirDividendosFII && (
              <p className="text-[10px] text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                Sem reinvestimento, o patrimônio final é cotas + dividendos acumulados como caixa.
              </p>
            )}
          </div>

          {/* Imóvel */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Imóvel Físico</p>
            <CurrencyInput id="aluguel" label="Aluguel mensal inicial"
              value={aluguelMensal} onChange={setAluguelMensal} />
            <SliderField label="Reajuste anual do aluguel" value={reajusteAluguelAnual}
              display={`${formatPercent(reajusteAluguelAnual)} a.a.`} min={0} max={15} step={0.5}
              onChange={setReajusteAluguelAnual} accent="accent-emerald-600" />
            <CurrencyInput id="despesas" label="Despesas anuais (IPTU + manutenção + seguro)"
              value={despesasAnuaisImovel} onChange={setDespesasAnuaisImovel} />
            <SliderField label="Vacância estimada" value={vacanciaPercentual}
              display={`${formatPercent(vacanciaPercentual)}`} min={0} max={30} step={1}
              onChange={setVacanciaPercentual} accent="accent-emerald-600" />
            <SliderField label="Valorização anual do imóvel" value={valorizacaoImovel}
              display={`${formatPercent(valorizacaoImovel)} a.a.`} min={0} max={15} step={0.5}
              onChange={setValorizacaoImovel} accent="accent-emerald-600" />

            <Toggle
              on={reinvestirRendaImovel}
              onChange={setReinvestirRendaImovel}
              label={reinvestirRendaImovel
                ? "Reinvestir renda do aluguel (aplicar em renda fixa)"
                : "Renda do aluguel acumulada como caixa"}
            />
            {reinvestirRendaImovel && (
              <SliderField label="Taxa de reinvestimento da renda" value={taxaReinvestimento}
                display={`${formatPercent(taxaReinvestimento)} a.a.`} min={5} max={20} step={0.25}
                onChange={setTaxaReinvestimento} accent="accent-emerald-600" />
            )}
          </div>
        </div>

        {/* ── RESULTADOS ── */}
        <div className="space-y-4">
          {/* Hero */}
          <div className={`bg-gradient-to-br ${corMelhor} rounded-2xl p-5 text-white`}>
            <p className="text-white/70 text-sm mb-1">Mais rentável em {horizonte} anos</p>
            <p className="text-3xl font-bold">
              {r.melhor === "fii" ? "FII" : r.melhor === "imovel" ? "Imóvel Físico" : "Empate"}
            </p>
            {r.melhor !== "empate" && (
              <p className="text-white/80 text-sm mt-1">
                {formatCurrency(r.diferenca)} a mais no patrimônio final
              </p>
            )}
          </div>

          {/* Premissas */}
          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Premissas aplicadas</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
              <div className="flex items-start gap-1.5">
                <span className={reinvestirDividendosFII ? "text-emerald-500" : "text-amber-500"}>
                  {reinvestirDividendosFII ? "✓" : "○"}
                </span>
                <span className="text-slate-600">
                  FII: DY {reinvestirDividendosFII ? "reinvestidos em cotas" : "sacados como renda"}
                </span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-emerald-500">✓</span>
                <span className="text-slate-600">FII: IR {irFII}% sobre dividendos</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-emerald-500">✓</span>
                <span className="text-slate-600">Imóvel: reajuste {formatPercent(reajusteAluguelAnual)}/ano</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-emerald-500">✓</span>
                <span className="text-slate-600">Imóvel: IR carnê-leão progressivo</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className={reinvestirRendaImovel ? "text-emerald-500" : "text-amber-500"}>
                  {reinvestirRendaImovel ? "✓" : "○"}
                </span>
                <span className="text-slate-600">
                  Imóvel: renda {reinvestirRendaImovel ? `aplicada a ${formatPercent(taxaReinvestimento)}/a` : "acumulada sem rendimento"}
                </span>
              </div>
            </div>
          </div>

          {/* Cards FII vs Imóvel */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-violet-600 uppercase tracking-widest mb-2">FII</p>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(r.patrimonioFinalFII)}</p>
              <p className="text-xs text-slate-400 mt-0.5">{formatPercent(r.retornoFIIAA, 1)} a.a.</p>
              <div className="mt-3 pt-2 border-t border-violet-100 space-y-1 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Valorização cotas</span>
                  <span>{formatCurrency(r.valorizacaoCotasFII)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{reinvestirDividendosFII ? "DY reinvestidos" : "DY como caixa"}</span>
                  <span>{formatCurrency(r.dividendosTotaisFII)}</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Imóvel</p>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(r.patrimonioFinalImovel)}</p>
              <p className="text-xs text-slate-400 mt-0.5">{formatPercent(r.retornoImovelAA, 1)} a.a.</p>
              <div className="mt-3 pt-2 border-t border-emerald-100 space-y-1 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Valorização</span>
                  <span>{formatCurrency(r.valorizacaoImovelTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Renda líquida (c/ IR)</span>
                  <span>{formatCurrency(r.rendaAluguelLiquidaTotal)}</span>
                </div>
                <div className="flex justify-between text-rose-500">
                  <span>IR pago (carnê-leão)</span>
                  <span>-{formatCurrency(r.irAluguelTotal)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gráfico */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-slate-800 text-sm">Evolução patrimonial</h3>
              <div className="flex items-center gap-3 text-[10px] text-slate-500">
                {reinvestirDividendosFII
                  ? <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3 text-violet-500" /> DY reinvestido</span>
                  : <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3 text-amber-500" /> DY como renda</span>
                }
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Patrimônio acumulado ao longo de {horizonte} anos
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={r.evolucao}>
                <defs>
                  <linearGradient id="fiiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="imovelGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="ano" tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(v) => `${v}a`} />
                <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10, fill: "#94a3b8" }} width={44} />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} labelFormatter={(l) => `Ano ${l}`} />
                <Legend iconSize={10} />
                <Area type="monotone" dataKey="fii" name="FII" stroke="#7c3aed" fill="url(#fiiGrad)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="imovel" name="Imóvel" stroke="#059669" fill="url(#imovelGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-800 space-y-1">
          <p><strong>FII:</strong> dividendos calculados sobre o patrimônio em cotas mês a mês. Se reinvestidos, compram novas cotas e geram efeito de juros compostos. Se sacados, ficam como caixa sem rendimento adicional.</p>
          <p><strong>Imóvel:</strong> IR calculado pela tabela progressiva do carnê-leão (2025) sobre a renda líquida mensal após dedução das despesas. Não considera ITBI e custos de aquisição (~5% do valor).</p>
          <p><strong>Reforma tributária:</strong> a isenção de IR sobre dividendos de FII pode mudar — use o botão de 15% ou 20% para simular cenários futuros.</p>
        </div>
      </div>
    </div>
  );
}
