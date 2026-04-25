"use client";

import { useState, useMemo } from "react";
import { calcularRateioCondominio } from "@/lib/calculators";
import type { CriterioRateio } from "@/lib/calculators";
import { formatCurrency } from "@/lib/format";
import { Info, Divide } from "lucide-react";
import CurrencyInput from "@/components/CurrencyInput";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import RelatedGuides from "@/components/RelatedGuides";

const CRITERIOS: { value: CriterioRateio; label: string; desc: string }[] = [
  { value: "igualitario", label: "Igualitário",     desc: "Todos pagam o mesmo valor" },
  { value: "fracao",      label: "Fração ideal",    desc: "Proporcional à fração do terreno" },
  { value: "area",        label: "Área privativa",  desc: "Proporcional à área do apartamento" },
  { value: "misto",       label: "Misto",            desc: "Parte igualitário, parte por fração" },
];

export default function RateioCondominioPage() {
  const [despesaTotal,   setDespesaTotal]   = useState(45_000);
  const [numUnidades,    setNumUnidades]    = useState(60);
  const [criterio,       setCriterio]       = useState<CriterioRateio>("igualitario");
  const [areaUnidade,    setAreaUnidade]    = useState(75);
  const [areaMedia,      setAreaMedia]      = useState(70);
  const [fracaoIdeal,    setFracaoIdeal]    = useState(1.8);
  const [proporcaoMisto, setProporcaoMisto] = useState(50);

  const resultado = useMemo(
    () => calcularRateioCondominio({ despesaTotal, numUnidades, criterio, areaUnidade, areaMedia, fracaoIdeal, proporcaoMisto }),
    [despesaTotal, numUnidades, criterio, areaUnidade, areaMedia, fracaoIdeal, proporcaoMisto]
  );

  const variacaoColor = resultado.variacaoVsIgualitario > 0 ? "text-red-600" : resultado.variacaoVsIgualitario < 0 ? "text-green-600" : "text-slate-500";
  const variacaoSinal = resultado.variacaoVsIgualitario > 0 ? "+" : "";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Custos</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Rateio de Condomínio por Unidade</h1>
        <p className="text-slate-500">
          Calcule quanto sua unidade paga de acordo com o critério adotado pelo condomínio e compare os diferentes modelos.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput id="despesa" label="Despesa total do condomínio/mês" value={despesaTotal} onChange={setDespesaTotal} />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Número de unidades: {numUnidades}</label>
            <input type="range" min={10} max={500} step={5} value={numUnidades}
              onChange={e => setNumUnidades(Number(e.target.value))}
              className="w-full accent-green-600" />
            <div className="flex justify-between text-xs text-slate-400 mt-1"><span>10</span><span>500</span></div>
          </div>

          {/* Critério */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-2">Critério de rateio</p>
            <div className="space-y-2">
              {CRITERIOS.map(c => (
                <button key={c.value} onClick={() => setCriterio(c.value)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl border transition-all ${criterio === c.value ? "border-green-500 bg-green-50" : "border-slate-200 hover:border-slate-300"}`}>
                  <p className={`text-sm font-semibold ${criterio === c.value ? "text-green-700" : "text-slate-700"}`}>{c.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{c.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Dados da sua unidade */}
          <div className="border-t border-slate-100 pt-4 space-y-4">
            <p className="text-sm font-medium text-slate-700">Dados da sua unidade</p>

            {(criterio === "fracao" || criterio === "misto") && (
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Fração ideal da unidade: {fracaoIdeal.toFixed(2)}%</label>
                <input type="range" min={0.5} max={10} step={0.1} value={fracaoIdeal}
                  onChange={e => setFracaoIdeal(Number(e.target.value))}
                  className="w-full accent-green-600" />
                <div className="flex justify-between text-xs text-slate-400 mt-1"><span>0,5%</span><span>10%</span></div>
                <p className="text-xs text-slate-400 mt-1">Encontre na escritura ou na convenção do condomínio</p>
              </div>
            )}

            {(criterio === "area") && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1.5">Sua área: {areaUnidade} m²</label>
                  <input type="range" min={20} max={400} step={5} value={areaUnidade}
                    onChange={e => setAreaUnidade(Number(e.target.value))}
                    className="w-full accent-green-600" />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1.5">Área média: {areaMedia} m²</label>
                  <input type="range" min={20} max={400} step={5} value={areaMedia}
                    onChange={e => setAreaMedia(Number(e.target.value))}
                    className="w-full accent-green-600" />
                </div>
              </div>
            )}

            {criterio === "misto" && (
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Peso da fração ideal no rateio: {proporcaoMisto}%</label>
                <input type="range" min={10} max={90} step={10} value={proporcaoMisto}
                  onChange={e => setProporcaoMisto(Number(e.target.value))}
                  className="w-full accent-green-600" />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>10% fração</span><span>50/50</span><span>90% fração</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Divide className="w-5 h-5 text-green-200" />
              <p className="text-green-200 text-sm">Taxa mensal da sua unidade</p>
            </div>
            <p className="text-4xl font-bold mb-1">{formatCurrency(resultado.valorFinal)}</p>
            <p className="text-green-200 text-sm">{resultado.percentualDaDespesa.toFixed(2)}% da despesa total do condomínio</p>
            <p className={`text-sm mt-1 font-medium ${resultado.variacaoVsIgualitario === 0 ? "text-green-200" : resultado.variacaoVsIgualitario > 0 ? "text-red-300" : "text-emerald-200"}`}>
              {criterio !== "igualitario" ? `${variacaoSinal}${resultado.variacaoVsIgualitario.toFixed(1)}% vs. rateio igualitário` : "Critério igualitário selecionado"}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Comparativo de critérios</h3>
            <div className="space-y-3">
              {[
                { label: "Igualitário",    valor: resultado.igualitario,  desc: `${despesaTotal > 0 ? ((resultado.igualitario / despesaTotal) * 100).toFixed(2) : 0}% da despesa` },
                { label: "Fração ideal",   valor: resultado.porFracao,    desc: `${fracaoIdeal.toFixed(2)}% × despesa total` },
                { label: "Área privativa", valor: resultado.porArea,      desc: `${areaMedia > 0 ? (areaUnidade / areaMedia).toFixed(2) : 1}× a taxa igualitária` },
                { label: "Misto",          valor: resultado.misto,        desc: `${proporcaoMisto}% fração + ${100 - proporcaoMisto}% igualitário` },
              ].map(row => (
                <div key={row.label} className={`flex justify-between items-start py-2 px-3 rounded-lg ${criterio === row.label.toLowerCase().replace(" ideal","").replace(" privativa","").replace(" ","") ? "bg-green-50" : ""}`}>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{row.label}</p>
                    <p className="text-xs text-slate-400">{row.desc}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{formatCurrency(row.valor)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-2">Custo anual da unidade</h3>
            <p className="text-2xl font-bold text-slate-900">{formatCurrency(resultado.valorFinal * 12)}</p>
            <p className="text-xs text-slate-400 mt-1">Taxa mensal × 12 meses (sem reajuste)</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-green-50 border border-green-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900 mb-2">Como funciona o rateio</h3>
            <ul className="text-sm text-green-800 space-y-1.5 list-disc list-inside">
              <li><strong>Igualitário:</strong> cada unidade paga o mesmo — independente do tamanho. Mais simples, mas pode ser injusto para apartamentos menores.</li>
              <li><strong>Fração ideal:</strong> cada unidade paga sua proporção do terreno. Coberturas e duplex costumam ter fração maior.</li>
              <li><strong>Área privativa:</strong> proporcional à área do apartamento em relação à média do condomínio.</li>
              <li><strong>Misto:</strong> combinação de igualitário e fração ideal — o mais usado em condomínios modernos.</li>
            </ul>
          </div>
        </div>
      </div>

      <FaqSection path="/rateio-condominio" />
      <RelatedCalculators path="/rateio-condominio" />
      <RelatedGuides path="/rateio-condominio" />
    </div>
  );
}
