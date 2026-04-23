"use client";

import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { calcularCustosCompra } from "@/lib/calculators";
import { cidadesITBI } from "@/lib/itbi-data";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info } from "lucide-react";

const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#f59e0b"];

export default function CustosCompraPage() {
  const [valorImovel, setValorImovel] = useState(500_000);
  const [cidadeSelecionada, setCidadeSelecionada] = useState("São Paulo");
  const [tipoTransacao, setTipoTransacao] = useState<"avista" | "financiado">("financiado");
  const [aliquotaCustom, setAliquotaCustom] = useState<string>("");

  const cidade = cidadesITBI.find((c) => c.cidade === cidadeSelecionada);
  const aliquotaITBI = aliquotaCustom !== "" ? parseFloat(aliquotaCustom) : (cidade?.aliquota ?? 2.0);

  const resultado = useMemo(
    () => calcularCustosCompra({ valorImovel, aliquotaITBI, tipoTransacao }),
    [valorImovel, aliquotaITBI, tipoTransacao]
  );

  const pieData = [
    { name: "ITBI", value: resultado.itbi },
    { name: "Escritura", value: resultado.escritura },
    { name: "Registro", value: resultado.registro },
    resultado.avaliacaoBancaria > 0 && { name: "Avaliação bancária", value: resultado.avaliacaoBancaria },
  ].filter(Boolean) as { name: string; value: number }[];

  const itens = [
    { label: "ITBI", value: resultado.itbi, desc: `Alíquota ${formatPercent(aliquotaITBI)} sobre o valor do imóvel` },
    { label: "Escritura pública", value: resultado.escritura, desc: "Tabela cartorária estadual (estimativa)" },
    { label: "Registro de imóvel", value: resultado.registro, desc: "~60% do valor da escritura (estimativa)" },
    tipoTransacao === "financiado" && { label: "Avaliação bancária", value: resultado.avaliacaoBancaria, desc: "Engenharia de avaliação exigida pelo banco" },
  ].filter(Boolean) as { label: string; value: number; desc: string }[];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Custos Totais da Compra</h1>
        <p className="text-slate-500">
          Descubra quanto você vai pagar além do preço do imóvel: ITBI, cartório e avaliação bancária.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput
            id="valor-imovel"
            label="Valor do imóvel"
            value={valorImovel}
            onChange={setValorImovel}
          />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Cidade</label>
            <select
              value={cidadeSelecionada}
              onChange={(e) => { setCidadeSelecionada(e.target.value); setAliquotaCustom(""); }}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
            >
              {cidadesITBI.map((c) => (
                <option key={`${c.cidade}-${c.uf}`} value={c.cidade}>
                  {c.cidade} — {c.uf} ({c.aliquota}% ITBI)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Alíquota ITBI personalizada (opcional)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={aliquotaCustom}
                onChange={(e) => setAliquotaCustom(e.target.value)}
                placeholder={`Padrão: ${cidade?.aliquota ?? 2}%`}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white pr-10"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Sua prefeitura pode ter uma alíquota diferente da capital.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Tipo de compra</label>
            <div className="grid grid-cols-2 gap-2">
              {(["avista", "financiado"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTipoTransacao(t)}
                  className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    tipoTransacao === t
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                  }`}
                >
                  {t === "avista" ? "À vista" : "Financiado"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
            <p className="text-blue-200 text-sm mb-1">Total de custos adicionais</p>
            <p className="text-4xl font-bold mb-2">{formatCurrency(resultado.total)}</p>
            <p className="text-blue-200 text-sm">
              {formatPercent(resultado.percentualTotal)} do valor do imóvel
            </p>
            <div className="mt-4 pt-4 border-t border-blue-500">
              <p className="text-blue-200 text-xs mb-1">Você vai desembolsar no total:</p>
              <p className="text-2xl font-bold">{formatCurrency(valorImovel + resultado.total)}</p>
            </div>
          </div>

          {/* Detalhamento */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Detalhamento dos custos</h3>
            <div className="space-y-3">
              {itens.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    <span className="text-sm font-bold text-slate-900">{formatCurrency(item.value)}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  {item !== itens[itens.length - 1] && <div className="mt-2 border-b border-slate-50" />}
                </div>
              ))}
            </div>
          </div>

          {/* Gráfico */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Distribuição dos custos</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                <Legend iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Educação */}
      <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">O que isso significa?</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li>
                <strong>ITBI</strong> é um imposto municipal obrigatório pago na transferência de qualquer imóvel. Cada prefeitura define sua alíquota (geralmente entre 2% e 3%).
              </li>
              <li>
                <strong>Escritura pública</strong> é o documento lavrado em cartório que formaliza a compra e venda. Obrigatória para imóveis acima de 30 salários mínimos.
              </li>
              <li>
                <strong>Registro de imóvel</strong> é o ato que torna você oficialmente proprietário perante a lei. Sem ele, o imóvel não é legalmente seu.
              </li>
              {tipoTransacao === "financiado" && (
                <li>
                  <strong>Avaliação bancária</strong> é exigida pelo banco para garantir que o imóvel vale o que você está pagando. Valores variam entre R$ 800 e R$ 3.500.
                </li>
              )}
              <li>
                A corretagem é paga pelo <strong>vendedor</strong>, não pelo comprador — por isso não entra neste cálculo.
              </li>
              <li>
                As estimativas de escritura e registro são médias nacionais. Consulte a tabela do cartório do seu estado para valores exatos.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
