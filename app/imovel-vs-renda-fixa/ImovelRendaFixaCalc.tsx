"use client";

import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { calcularImovelVsRendaFixa } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info } from "lucide-react";
import type { IndiceAcumulado } from "@/lib/indices";

interface Props {
  selic: IndiceAcumulado;
}

export default function ImovelRendaFixaCalc({ selic }: Props) {
  const selicDefault = selic.erro ? 14.75 : selic.valor;

  const [valorImovel, setValorImovel] = useState(500_000);
  const [tipoCompra, setTipoCompra] = useState<"avista" | "financiado">("avista");
  const [entrada, setEntrada] = useState(150_000);
  const [taxaFinanciamento, setTaxaFinanciamento] = useState(11.0);
  const [prazoFinanciamento, setPrazoFinanciamento] = useState(240);
  const [aluguelMensalEstimado, setAluguelMensalEstimado] = useState(2_500);
  const [valorizacaoAnual, setValorizacaoAnual] = useState(5.0);
  const [despesasAnuaisImovel, setDespesasAnuaisImovel] = useState(8_400);
  const [vacanciaPercentual, setVacanciaPercentual] = useState(8);
  const [taxaRendaFixa, setTaxaRendaFixa] = useState(selicDefault * 0.90); // CDI ~90% Selic
  const [horizonte, setHorizonte] = useState(10);

  const resultado = useMemo(
    () => calcularImovelVsRendaFixa({
      valorImovel, tipoCompra, entrada, taxaFinanciamento, prazoFinanciamento,
      aluguelMensalEstimado, valorizacaoAnual, despesasAnuaisImovel, vacanciaPercentual,
      taxaRendaFixa, horizonte,
    }),
    [valorImovel, tipoCompra, entrada, taxaFinanciamento, prazoFinanciamento,
      aluguelMensalEstimado, valorizacaoAnual, despesasAnuaisImovel, vacanciaPercentual,
      taxaRendaFixa, horizonte]
  );

  const corMelhor = resultado.melhor === "imovel"
    ? "from-emerald-600 to-teal-700"
    : resultado.melhor === "renda_fixa"
    ? "from-blue-600 to-indigo-700"
    : "from-slate-600 to-slate-700";

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          {/* Tipo de compra */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-2">Forma de compra</p>
            <div className="grid grid-cols-2 gap-2">
              {(["avista", "financiado"] as const).map((t) => (
                <button key={t} onClick={() => setTipoCompra(t)}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    tipoCompra === t ? "border-emerald-400 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}>
                  {t === "avista" ? "À vista" : "Financiado"}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              {tipoCompra === "avista"
                ? "Investe o valor total no imóvel vs. o mesmo valor em renda fixa."
                : "Investe a entrada no imóvel (com alavancagem) vs. a entrada em renda fixa."}
            </p>
          </div>

          <CurrencyInput id="valor-imovel" label="Valor do imóvel" value={valorImovel} onChange={setValorImovel} />

          {tipoCompra === "financiado" && (
            <>
              <CurrencyInput id="entrada" label="Entrada disponível"
                value={entrada} onChange={setEntrada}
                hint="Capital que você vai colocar agora — base da comparação" />
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Taxa de financiamento: {formatPercent(taxaFinanciamento)} a.a.
                </label>
                <input type="range" min={6} max={18} step={0.25} value={taxaFinanciamento}
                  onChange={(e) => setTaxaFinanciamento(Number(e.target.value))}
                  className="w-full accent-emerald-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Prazo do financiamento: {prazoFinanciamento} meses ({(prazoFinanciamento / 12).toFixed(0)} anos)
                </label>
                <input type="range" min={60} max={420} step={12} value={prazoFinanciamento}
                  onChange={(e) => setPrazoFinanciamento(Number(e.target.value))}
                  className="w-full accent-emerald-600" />
              </div>
            </>
          )}

          <div className="border-t border-slate-100 pt-4 space-y-4">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Imóvel para aluguel</p>
            <CurrencyInput id="aluguel" label="Aluguel mensal estimado"
              value={aluguelMensalEstimado} onChange={setAluguelMensalEstimado} />
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                Valorização anual do imóvel: {formatPercent(valorizacaoAnual)} a.a.
              </label>
              <input type="range" min={0} max={15} step={0.5} value={valorizacaoAnual}
                onChange={(e) => setValorizacaoAnual(Number(e.target.value))}
                className="w-full accent-emerald-600" />
            </div>
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
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-4">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Renda fixa</p>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                Taxa da renda fixa: {formatPercent(taxaRendaFixa)} a.a.
              </label>
              <input type="range" min={4} max={20} step={0.25} value={taxaRendaFixa}
                onChange={(e) => setTaxaRendaFixa(Number(e.target.value))}
                className="w-full accent-blue-600" />
              {!selic.erro && (
                <div className="flex gap-2 mt-1.5 flex-wrap">
                  {[{ label: "CDI (90% Selic)", v: selicDefault * 0.90 }, { label: "Selic", v: selicDefault }, { label: "IPCA+6%", v: 6 }].map((opt) => (
                    <button key={opt.label} onClick={() => setTaxaRendaFixa(parseFloat(opt.v.toFixed(2)))}
                      className="text-xs px-2.5 py-1 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors">
                      {opt.label} ({formatPercent(opt.v, 1)})
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Horizonte: {horizonte} anos
            </label>
            <input type="range" min={3} max={30} step={1} value={horizonte}
              onChange={(e) => setHorizonte(Number(e.target.value))}
              className="w-full accent-slate-600" />
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className={`bg-gradient-to-br ${corMelhor} rounded-2xl p-6 text-white`}>
            <p className="text-white/70 text-sm mb-2">Mais rentável em {horizonte} anos</p>
            <p className="text-3xl font-bold">
              {resultado.melhor === "imovel" ? "Imóvel" : resultado.melhor === "renda_fixa" ? "Renda Fixa" : "Empate"}
            </p>
            {resultado.melhor !== "empate" && (
              <p className="text-white/80 text-sm mt-1">
                {formatCurrency(resultado.diferenca)} a mais no patrimônio final
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
              <p className="text-xs text-emerald-600 font-semibold mb-2 uppercase tracking-wide">Imóvel</p>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(resultado.patrimonioFinalImovel)}</p>
              <p className="text-xs text-slate-400 mt-1">{formatPercent(resultado.retornoImovelAA, 1)} a.a.</p>
              <div className="mt-2 pt-2 border-t border-emerald-100 text-xs text-slate-500 space-y-0.5">
                <div className="flex justify-between">
                  <span>Valorização</span><span>{formatCurrency(resultado.valorizacaoTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Renda aluguel</span><span>{formatCurrency(resultado.rendaAluguelTotalLiquida)}</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <p className="text-xs text-blue-600 font-semibold mb-2 uppercase tracking-wide">Renda Fixa</p>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(resultado.patrimonioFinalRendaFixa)}</p>
              <p className="text-xs text-slate-400 mt-1">{formatPercent(resultado.retornoRendaFixaAA, 1)} a.a.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-800 mb-1">Evolução patrimonial</h3>
        <p className="text-sm text-slate-400 mb-5">Equity do imóvel + renda acumulada vs. patrimônio em renda fixa</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={resultado.evolucao}>
            <defs>
              <linearGradient id="imovelGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="rfGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="ano" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => `${v}a`} />
            <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip formatter={(v) => formatCurrency(Number(v))} labelFormatter={(l) => `Ano ${l}`} />
            <Legend />
            <Area type="monotone" dataKey="imovel" name="Imóvel" stroke="#059669" fill="url(#imovelGrad2)" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="rendaFixa" name="Renda Fixa" stroke="#2563eb" fill="url(#rfGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">O que esta simulação não considera</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li><strong>IR sobre renda fixa:</strong> 15–22,5% sobre os rendimentos (varia com prazo). Reduza a taxa para comparação justa.</li>
              <li><strong>ITBI + custos de aquisição:</strong> 4–6% do imóvel — não incluídos aqui. Isso favorece a renda fixa.</li>
              <li><strong>IR sobre aluguel:</strong> tributado na tabela progressiva do IRPF (até 27,5%).</li>
              <li><strong>IR sobre ganho de capital:</strong> 15–22,5% na venda do imóvel.</li>
              <li><strong>Liquidez:</strong> renda fixa pode ser resgatada a qualquer momento; imóvel não.</li>
              <li>Use como ponto de partida — uma análise completa exige um planejamento tributário personalizado.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
