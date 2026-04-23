"use client";

import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";
import { calcularAirbnb } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


export default function AirbnbPage() {
  const [diaria, setDiaria] = useState(350);
  const [ocupacao, setOcupacao] = useState(65);
  const [taxaPlataforma, setTaxaPlataforma] = useState(14);
  const [custosOp, setCustosOp] = useState(600);
  const [aluguelConvencional, setAluguelConvencional] = useState(2_500);
  const [despesasFixas, setDespesasFixas] = useState(400);

  const resultado = useMemo(
    () => calcularAirbnb({ diaria, ocupacaoPercentual: ocupacao, taxaPlataforma, custosOperacionaisMensais: custosOp, aluguelConvencional, despesasFixasMensais: despesasFixas }),
    [diaria, ocupacao, taxaPlataforma, custosOp, aluguelConvencional, despesasFixas]
  );

  const corMelhor = resultado.melhor === "airbnb" ? "from-rose-500 to-pink-600" : resultado.melhor === "aluguel" ? "from-emerald-600 to-teal-700" : "from-slate-600 to-slate-700";

  const dadosBarras = [
    { name: "Airbnb", valor: Math.max(0, resultado.receitaLiquidaMensal), fill: "#f43f5e" },
    { name: "Aluguel", valor: Math.max(0, resultado.aluguelLiquidoMensal), fill: "#10b981" },
  ];

  // Sensibilidade: renda líquida do Airbnb para diferentes taxas de ocupação
  const sensibilidade = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((ocp) => {
    const r = calcularAirbnb({ diaria, ocupacaoPercentual: ocp, taxaPlataforma, custosOperacionaisMensais: custosOp, aluguelConvencional, despesasFixasMensais: despesasFixas });
    return { ocp: `${ocp}%`, Airbnb: Math.round(r.receitaLiquidaMensal), Aluguel: Math.round(r.aluguelLiquidoMensal) };
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-rose-500 uppercase tracking-wide">Investimento</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Airbnb vs. Aluguel Convencional</h1>
        <p className="text-slate-500">
          Compare a receita de temporada com o aluguel fixo e descubra qual estratégia rende mais para o seu imóvel.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Airbnb / Temporada</p>

          <CurrencyInput id="diaria" label="Diária média" value={diaria} onChange={setDiaria}
            hint="Considere a média ponderada entre alta e baixa temporada" />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Taxa de ocupação: {ocupacao}% (~{Math.round(30 * ocupacao / 100)} dias/mês)
            </label>
            <input type="range" min={0} max={100} step={5} value={ocupacao}
              onChange={(e) => setOcupacao(Number(e.target.value))} className="w-full accent-rose-500" />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0% (vazio)</span>
              <span>100% (sempre ocupado)</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Taxa da plataforma: {taxaPlataforma}%
            </label>
            <input type="range" min={3} max={20} step={1} value={taxaPlataforma}
              onChange={(e) => setTaxaPlataforma(Number(e.target.value))} className="w-full accent-rose-500" />
            <p className="text-xs text-slate-400 mt-1">Airbnb cobra ~14–16% do anfitrião. Booking cobra ~15%. Direto = 0%.</p>
          </div>

          <CurrencyInput id="custos-op" label="Custos operacionais mensais"
            value={custosOp} onChange={setCustosOp}
            hint="Limpeza, amenities, reposição de itens, manutenção extra" />

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Aluguel Convencional</p>
            <div className="space-y-4">
              <CurrencyInput id="aluguel" label="Aluguel mensal equivalente" value={aluguelConvencional} onChange={setAluguelConvencional} />
              <CurrencyInput id="despesas" label="Despesas fixas mensais do proprietário"
                value={despesasFixas} onChange={setDespesasFixas}
                hint="IPTU/12, condomínio, seguro — pagos em ambos os cenários" />
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className={`bg-gradient-to-br ${corMelhor} rounded-2xl p-6 text-white`}>
            <p className="text-white/70 text-sm mb-2">Estratégia mais rentável</p>
            <p className="text-3xl font-bold capitalize mb-1">
              {resultado.melhor === "airbnb" ? "Airbnb / Temporada" : resultado.melhor === "aluguel" ? "Aluguel Convencional" : "Empate"}
            </p>
            {resultado.melhor !== "empate" && (
              <p className="text-white/80 text-sm">
                {formatCurrency(Math.abs(resultado.diferencaMensal))}/mês a mais ({formatCurrency(Math.abs(resultado.diferencaAnual))}/ano)
              </p>
            )}
          </div>

          {/* Comparativo mensal */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
              <p className="text-xs text-rose-600 font-semibold mb-2 uppercase tracking-wide">Airbnb</p>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(resultado.receitaLiquidaMensal)}</p>
              <p className="text-xs text-slate-400 mt-1">líquido/mês</p>
              <div className="mt-2 pt-2 border-t border-rose-100 text-xs text-slate-500 space-y-0.5">
                <div className="flex justify-between">
                  <span>Receita bruta</span>
                  <span>{formatCurrency(resultado.receitaBrutaMensal)}</span>
                </div>
                <div className="flex justify-between text-rose-500">
                  <span>− Taxa plataforma</span>
                  <span>−{formatCurrency(resultado.receitaBrutaMensal - resultado.receitaAposTaxaMensal)}</span>
                </div>
                <div className="flex justify-between text-rose-500">
                  <span>− Custos operac.</span>
                  <span>−{formatCurrency(custosOp)}</span>
                </div>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
              <p className="text-xs text-emerald-600 font-semibold mb-2 uppercase tracking-wide">Aluguel</p>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(resultado.aluguelLiquidoMensal)}</p>
              <p className="text-xs text-slate-400 mt-1">líquido/mês</p>
              <div className="mt-2 pt-2 border-t border-emerald-100 text-xs text-slate-500 space-y-0.5">
                <div className="flex justify-between">
                  <span>Aluguel bruto</span>
                  <span>{formatCurrency(aluguelConvencional)}</span>
                </div>
                <div className="flex justify-between text-rose-500">
                  <span>− Despesas fixas</span>
                  <span>−{formatCurrency(despesasFixas)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estável / previsível</span>
                  <span>✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Break-even de ocupação */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-1">Ocupação mínima para superar o aluguel</h3>
            <div className="flex items-end gap-2 mt-3">
              <span className="text-3xl font-bold text-rose-600">{formatPercent(resultado.ocupacaoBreakeven, 0)}</span>
              <span className="text-slate-500 text-sm mb-1">
                ≈ {Math.round(30 * resultado.ocupacaoBreakeven / 100)} dias/mês
              </span>
            </div>
            <div className="mt-3 h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-rose-400 rounded-full transition-all"
                style={{ width: `${Math.min(100, resultado.ocupacaoBreakeven)}%` }} />
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0%</span>
              <span className="text-rose-500 font-medium">{formatPercent(resultado.ocupacaoBreakeven, 0)}</span>
              <span>100%</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {ocupacao >= resultado.ocupacaoBreakeven
                ? `Com ${ocupacao}% de ocupação, o Airbnb é mais rentável.`
                : `Com ${ocupacao}% de ocupação, ainda abaixo do break-even — o aluguel convencional rende mais.`}
            </p>
          </div>
        </div>
      </div>

      {/* Gráfico de sensibilidade */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-800 mb-1">Receita líquida por taxa de ocupação</h3>
        <p className="text-sm text-slate-400 mb-5">Airbnb vs. aluguel conforme a ocupação varia</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={sensibilidade} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="ocp" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip formatter={(v) => formatCurrency(Number(v))} />
            <ReferenceLine y={0} stroke="#e2e8f0" />
            <Bar dataKey="Airbnb" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Aluguel" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">O que este cálculo não considera</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li><strong>Desgaste acelerado</strong>: imóveis de temporada sofrem mais desgaste — considere um custo de manutenção maior.</li>
              <li><strong>Imposto de renda</strong>: receitas do Airbnb são tributadas como pessoa física (carnê-leão) — consulte um contador.</li>
              <li><strong>Sazonalidade</strong>: a ocupação varia muito entre meses. Use a média anual realista para a sua região.</li>
              <li><strong>Gestão</strong>: temporada exige mais tempo ou uma empresa gestora (custo adicional de 20–30% da receita).</li>
              <li><strong>Previsibilidade</strong>: o aluguel convencional tem renda garantida e protegida pela Lei do Inquilinato.</li>
            </ul>
          </div>
        </div>
      </div>

      <FaqSection path="/airbnb-vs-aluguel" />
      <RelatedCalculators path="/airbnb-vs-aluguel" />
    </div>
  );
}
