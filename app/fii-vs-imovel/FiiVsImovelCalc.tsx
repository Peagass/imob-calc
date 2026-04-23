"use client";

import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { calcularFiiVsImovel } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info } from "lucide-react";
import type { IndiceAcumulado } from "@/lib/indices";

interface Props {
  selic: IndiceAcumulado;
}

export default function FiiVsImovelCalc({ selic }: Props) {
  const [valorInvestimento, setValorInvestimento] = useState(500_000);
  const [dividendYieldFII, setDividendYieldFII] = useState(9.5);
  const [valorizacaoFII, setValorizacaoFII] = useState(3.0);
  const [aluguelMensal, setAluguelMensal] = useState(2_500);
  const [despesasAnuaisImovel, setDespesasAnuaisImovel] = useState(8_400);
  const [vacanciaPercentual, setVacanciaPercentual] = useState(8);
  const [valorizacaoImovel, setValorizacaoImovel] = useState(5.0);
  const [horizonte, setHorizonte] = useState(10);
  const [irFII, setIrFII] = useState(0); // PF isento atualmente

  const resultado = useMemo(
    () => calcularFiiVsImovel({ valorInvestimento, dividendYieldFII, valorizacaoFII, aluguelMensal, despesasAnuaisImovel, vacanciaPercentual, valorizacaoImovel, horizonte, irFII }),
    [valorInvestimento, dividendYieldFII, valorizacaoFII, aluguelMensal, despesasAnuaisImovel, vacanciaPercentual, valorizacaoImovel, horizonte, irFII]
  );

  const corMelhor = resultado.melhor === "fii" ? "from-violet-600 to-purple-700" : resultado.melhor === "imovel" ? "from-emerald-600 to-teal-700" : "from-slate-600 to-slate-700";

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput id="investimento" label="Capital disponível para investir"
            value={valorInvestimento} onChange={setValorInvestimento}
            hint="Mesmo valor aplicado em ambos os cenários" />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Horizonte: {horizonte} anos
            </label>
            <input type="range" min={3} max={30} step={1} value={horizonte}
              onChange={(e) => setHorizonte(Number(e.target.value))}
              className="w-full accent-violet-600" />
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-wide mb-4">FII</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Dividend yield: {formatPercent(dividendYieldFII)} a.a.
                </label>
                <input type="range" min={4} max={18} step={0.5} value={dividendYieldFII}
                  onChange={(e) => setDividendYieldFII(Number(e.target.value))}
                  className="w-full accent-violet-600" />
                <p className="text-xs text-slate-400 mt-1">
                  Média histórica dos FIIs: 8–11% a.a. Consulte fundos no site B3 ou FIIs.com.br.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Valorização das cotas: {formatPercent(valorizacaoFII)} a.a.
                </label>
                <input type="range" min={-5} max={15} step={0.5} value={valorizacaoFII}
                  onChange={(e) => setValorizacaoFII(Number(e.target.value))}
                  className="w-full accent-violet-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  IR sobre dividendos: {irFII}%
                </label>
                <div className="flex gap-2">
                  {[0, 15, 20].map((v) => (
                    <button key={v} onClick={() => setIrFII(v)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                        irFII === v ? "border-violet-500 bg-violet-50 text-violet-700" : "border-slate-200 text-slate-600"
                      }`}>
                      {v}%{v === 0 ? " (isento)" : ""}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-1">PF com mais de 50 cotistas e 100+ cotistas: isento. Pode mudar com reforma tributária.</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-4">Imóvel Físico</p>
            <div className="space-y-4">
              <CurrencyInput id="aluguel" label="Aluguel mensal estimado"
                value={aluguelMensal} onChange={setAluguelMensal} />
              <CurrencyInput id="despesas" label="Despesas anuais do proprietário"
                value={despesasAnuaisImovel} onChange={setDespesasAnuaisImovel}
                hint="IPTU + condomínio + manutenção + seguro" />
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Vacância: {vacanciaPercentual}%
                </label>
                <input type="range" min={0} max={30} step={1} value={vacanciaPercentual}
                  onChange={(e) => setVacanciaPercentual(Number(e.target.value))}
                  className="w-full accent-emerald-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Valorização anual: {formatPercent(valorizacaoImovel)} a.a.
                </label>
                <input type="range" min={0} max={15} step={0.5} value={valorizacaoImovel}
                  onChange={(e) => setValorizacaoImovel(Number(e.target.value))}
                  className="w-full accent-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className={`bg-gradient-to-br ${corMelhor} rounded-2xl p-6 text-white`}>
            <p className="text-white/70 text-sm mb-2">Mais rentável em {horizonte} anos</p>
            <p className="text-3xl font-bold capitalize">
              {resultado.melhor === "fii" ? "FII" : resultado.melhor === "imovel" ? "Imóvel Físico" : "Empate"}
            </p>
            {resultado.melhor !== "empate" && (
              <p className="text-white/80 text-sm mt-1">
                {formatCurrency(resultado.diferenca)} a mais no patrimônio final
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4">
              <p className="text-xs text-violet-600 font-semibold mb-2 uppercase tracking-wide">FII</p>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(resultado.patrimonioFinalFII)}</p>
              <p className="text-xs text-slate-400 mt-1">
                {formatPercent(resultado.retornoFIIAA, 1)} a.a.
              </p>
              <div className="mt-2 pt-2 border-t border-violet-100 text-xs text-slate-500 space-y-0.5">
                <div className="flex justify-between">
                  <span>Dividendos</span><span>{formatCurrency(resultado.dividendosTotaisFII)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valorização cotas</span><span>{formatCurrency(resultado.valorizacaoCotasFII)}</span>
                </div>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
              <p className="text-xs text-emerald-600 font-semibold mb-2 uppercase tracking-wide">Imóvel</p>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(resultado.patrimonioFinalImovel)}</p>
              <p className="text-xs text-slate-400 mt-1">
                {formatPercent(resultado.retornoImovelAA, 1)} a.a.
              </p>
              <div className="mt-2 pt-2 border-t border-emerald-100 text-xs text-slate-500 space-y-0.5">
                <div className="flex justify-between">
                  <span>Renda aluguel</span><span>{formatCurrency(resultado.rendaAluguelTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valorização</span><span>{formatCurrency(resultado.valorizacaoImovelTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-800 mb-1">Evolução patrimonial ao longo do tempo</h3>
        <p className="text-sm text-slate-400 mb-5">Patrimônio acumulado com dividendos reinvestidos</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={resultado.evolucao}>
            <defs>
              <linearGradient id="fiiGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="imovelGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="ano" tick={{ fontSize: 11, fill: "#94a3b8" }}
              tickFormatter={(v) => `${v}a`} />
            <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip formatter={(v) => formatCurrency(Number(v))} labelFormatter={(l) => `Ano ${l}`} />
            <Legend />
            <Area type="monotone" dataKey="fii" name="FII" stroke="#7c3aed" fill="url(#fiiGrad)" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="imovel" name="Imóvel" stroke="#059669" fill="url(#imovelGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">FII vs. Imóvel — o que cada um oferece</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li><strong>FII:</strong> liquidez diária, diversificação, gestão profissional, sem burocracia de locação, dividendos mensais isentos de IR (PF).</li>
              <li><strong>Imóvel físico:</strong> ativo tangível, alavancagem via financiamento, personalização, proteção contra inflação local, mais controle.</li>
              <li>Ambos têm riscos: FII sofre com ciclos da B3; imóvel sofre com vacância, inquilinos ruins e custos de manutenção.</li>
              <li>Este cálculo não considera ITBI + custos de aquisição do imóvel físico (tipicamente 4–6% do valor).</li>
              <li>Dividendos do FII podem perder isenção com eventual reforma tributária — cenário a monitorar.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
