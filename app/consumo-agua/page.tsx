"use client";

import { useState, useMemo } from "react";
import { calcularConsumoAgua } from "@/lib/calculators";
import type { TipoChuveiro, TipoDescarga } from "@/lib/calculators";
import { formatCurrency } from "@/lib/format";
import { Info, Droplets } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import RelatedGuides from "@/components/RelatedGuides";

const CLASS_LABEL: Record<string, { label: string; cor: string }> = {
  excelente:  { label: "Excelente — muito abaixo da média",  cor: "text-green-700 bg-green-50 border-green-100" },
  bom:        { label: "Bom — dentro do ideal",              cor: "text-teal-700 bg-teal-50 border-teal-100" },
  medio:      { label: "Moderado — na média brasileira",     cor: "text-amber-700 bg-amber-50 border-amber-100" },
  alto:       { label: "Alto — acima da média",              cor: "text-orange-700 bg-orange-50 border-orange-100" },
  muito_alto: { label: "Muito alto — revise os hábitos",     cor: "text-red-700 bg-red-50 border-red-100" },
};

export default function ConsumoAguaPage() {
  const [numMoradores,        setNumMoradores]        = useState(3);
  const [minutosbanho,        setMinutosbanho]        = useState(10);
  const [tipochuveiro,        setTipochuveiro]        = useState<TipoChuveiro>("normal");
  const [tipodescarga,        setTipodescarga]        = useState<TipoDescarga>("normal");
  const [acionamentosDescarga, setAcionamentosDescarga] = useState(5);
  const [ciclosMaquinaLavar,  setCiclosMaquinaLavar]  = useState(3);
  const [temJardim,           setTemJardim]           = useState(false);
  const [m2jardim,            setM2jardim]            = useState(30);
  const [temPiscina,          setTemPiscina]          = useState(false);
  const [tarifaM3,            setTarifaM3]            = useState(0);

  const resultado = useMemo(() => calcularConsumoAgua({
    numMoradores, minutosbanho, tipochuveiro, tipodescarga, acionamentosDescarga,
    ciclosMaquinaLavar, temJardim, m2jardim, temPiscina, tarifaM3,
  }), [numMoradores, minutosbanho, tipochuveiro, tipodescarga, acionamentosDescarga,
    ciclosMaquinaLavar, temJardim, m2jardim, temPiscina, tarifaM3]);

  const cls = CLASS_LABEL[resultado.classificacao];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Custos</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Consumo de Água</h1>
        <p className="text-slate-500">
          Estime o consumo mensal em m³ com base nos hábitos do domicílio e compare com a média brasileira de 154 litros/pessoa/dia.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Número de moradores: {numMoradores}</label>
            <input type="range" min={1} max={10} step={1} value={numMoradores}
              onChange={e => setNumMoradores(Number(e.target.value))} className="w-full accent-green-600" />
            <div className="flex justify-between text-xs text-slate-400 mt-1"><span>1</span><span>10</span></div>
          </div>

          {/* Banho */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Banho</p>
            <div>
              <p className="text-sm text-slate-600 mb-2">Tipo de chuveiro / banheira</p>
              <div className="flex gap-2">
                {[
                  { v: "economico", l: "Econômico (6L/min)" },
                  { v: "normal",    l: "Normal (12L/min)" },
                  { v: "banheira",  l: "Banheira (200L)" },
                ].map(opt => (
                  <button key={opt.v} onClick={() => setTipochuveiro(opt.v as TipoChuveiro)}
                    className={`flex-1 py-1.5 text-xs rounded-lg border transition-all ${tipochuveiro === opt.v ? "border-green-500 bg-green-50 text-green-700 font-medium" : "border-slate-200 text-slate-600"}`}>
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>
            {tipochuveiro !== "banheira" && (
              <div className="mt-3">
                <label className="block text-sm text-slate-600 mb-1.5">Minutos por banho: {minutosbanho} min</label>
                <input type="range" min={3} max={30} step={1} value={minutosbanho}
                  onChange={e => setMinutosbanho(Number(e.target.value))} className="w-full accent-green-600" />
                <div className="flex justify-between text-xs text-slate-400 mt-1"><span>3 min</span><span>30 min</span></div>
              </div>
            )}
          </div>

          {/* Descarga */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Descarga</p>
            <div className="flex gap-2 mb-3">
              {[
                { v: "economica", l: "Econômica (6L)" },
                { v: "normal",    l: "Normal (9L)" },
              ].map(opt => (
                <button key={opt.v} onClick={() => setTipodescarga(opt.v as TipoDescarga)}
                  className={`flex-1 py-1.5 text-sm rounded-lg border transition-all ${tipodescarga === opt.v ? "border-green-500 bg-green-50 text-green-700 font-medium" : "border-slate-200 text-slate-600"}`}>
                  {opt.l}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1.5">Acionamentos/pessoa/dia: {acionamentosDescarga}</label>
              <input type="range" min={2} max={10} step={1} value={acionamentosDescarga}
                onChange={e => setAcionamentosDescarga(Number(e.target.value))} className="w-full accent-green-600" />
            </div>
          </div>

          {/* Máquina */}
          <div className="border-t border-slate-100 pt-4">
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Ciclos de máquina de lavar por semana: {ciclosMaquinaLavar}</label>
            <input type="range" min={0} max={14} step={1} value={ciclosMaquinaLavar}
              onChange={e => setCiclosMaquinaLavar(Number(e.target.value))} className="w-full accent-green-600" />
          </div>

          {/* Jardim e piscina */}
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={temJardim} onChange={e => setTemJardim(e.target.checked)}
                className="w-4 h-4 rounded accent-green-600" />
              <span className="text-sm font-medium text-slate-700">Tem jardim / área externa</span>
            </label>
            {temJardim && (
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Área do jardim: {m2jardim} m²</label>
                <input type="range" min={5} max={500} step={5} value={m2jardim}
                  onChange={e => setM2jardim(Number(e.target.value))} className="w-full accent-green-600" />
              </div>
            )}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={temPiscina} onChange={e => setTemPiscina(e.target.checked)}
                className="w-4 h-4 rounded accent-green-600" />
              <span className="text-sm font-medium text-slate-700">Tem piscina</span>
            </label>
          </div>

          {/* Tarifa opcional */}
          <div className="border-t border-slate-100 pt-4">
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Tarifa da concessionária (opcional): R$ {tarifaM3.toFixed(2)}/m³</label>
            <input type="range" min={0} max={30} step={0.5} value={tarifaM3}
              onChange={e => setTarifaM3(Number(e.target.value))} className="w-full accent-green-600" />
            <p className="text-xs text-slate-400 mt-1">Deixe em 0 para ver apenas o consumo em m³</p>
          </div>
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-600 to-teal-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Droplets className="w-5 h-5 text-green-200" />
              <p className="text-green-200 text-sm">Consumo estimado</p>
            </div>
            <p className="text-4xl font-bold mb-1">{resultado.m3Mes} m³/mês</p>
            <p className="text-green-200 text-sm">{resultado.litrosPessoa} L/pessoa/dia</p>
            {tarifaM3 > 0 && resultado.custoEstimado > 0 && (
              <p className="text-green-200 text-sm mt-1">Custo estimado: {formatCurrency(resultado.custoEstimado)}/mês</p>
            )}
          </div>

          <div className={`rounded-xl px-4 py-3 border text-sm font-medium ${cls.cor}`}>
            <Droplets className="w-4 h-4 inline mr-1.5 -mt-0.5" />
            {cls.label} · {resultado.comparacaoMedia}
          </div>

          {/* Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Consumo por uso (litros/dia)</h3>
            <div className="space-y-2.5">
              {resultado.itens.sort((a, b) => b.litrosDia - a.litrosDia).map(item => (
                <div key={item.uso}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{item.uso}</span>
                    <span className="text-slate-700 font-medium">{item.litrosDia} L/dia · {item.percentual.toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${item.percentual}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">Consumo diário total</p>
              <p className="text-xl font-bold text-slate-900">{Math.round(resultado.m3Mes * 1000 / 30)} L/dia</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">Consumo anual estimado</p>
              <p className="text-xl font-bold text-slate-900">{Math.round(resultado.m3Mes * 12)} m³/ano</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-teal-50 border border-teal-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-teal-900 mb-2">Como economizar água</h3>
            <ul className="text-sm text-teal-800 space-y-1.5 list-disc list-inside">
              <li>Trocar a descarga de 9L para caixa dual-flush (3L/6L) economiza até 20 litros por pessoa por dia.</li>
              <li>Reduzir o banho de 15 para 8 minutos (chuveiro normal) poupa 84 litros por banho.</li>
              <li>Instalar arejadores nas torneiras reduz o fluxo de 12L/min para 6L/min sem perda de pressão.</li>
              <li>Sempre lave roupas com a máquina completamente cheia — dois ciclos parciais gastam mais que um cheio.</li>
              <li>Cobrir a piscina quando não está em uso reduz a evaporação em até 70%.</li>
            </ul>
          </div>
        </div>
      </div>

      <FaqSection path="/consumo-agua" />
      <RelatedCalculators path="/consumo-agua" />
      <RelatedGuides path="/consumo-agua" />
    </div>
  );
}
