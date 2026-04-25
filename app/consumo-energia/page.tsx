"use client";

import { useState, useMemo } from "react";
import { calcularConsumoEnergia } from "@/lib/calculators";
import type { BandeiraTarifaria } from "@/lib/calculators";
import { formatCurrency } from "@/lib/format";
import { Info, Plug, Zap } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import RelatedGuides from "@/components/RelatedGuides";

const BANDEIRAS: { value: BandeiraTarifaria; label: string; cor: string; extra: string }[] = [
  { value: "verde",     label: "Verde",      cor: "bg-green-100 text-green-700 border-green-200",  extra: "Sem adicional" },
  { value: "amarela",   label: "Amarela",    cor: "bg-yellow-100 text-yellow-700 border-yellow-200", extra: "+R$ 0,01874/kWh" },
  { value: "vermelha1", label: "Vermelha 1", cor: "bg-red-100 text-red-600 border-red-200",        extra: "+R$ 0,03971/kWh" },
  { value: "vermelha2", label: "Vermelha 2", cor: "bg-red-200 text-red-800 border-red-300",        extra: "+R$ 0,09492/kWh" },
];

export default function ConsumoEnergiaPage() {
  const [tarifaKwh,       setTarifaKwh]       = useState(0.75);
  const [bandeira,        setBandeira]        = useState<BandeiraTarifaria>("verde");
  const [numAr,           setNumAr]           = useState(1);
  const [btuAr,           setBtuAr]           = useState(12000);
  const [horasAr,         setHorasAr]         = useState(6);
  const [numChuveiro,     setNumChuveiro]     = useState(2);
  const [potenciaChuveiro, setPotenciaChuveiro] = useState(5500);
  const [minutosChuveiro, setMinutosChuveiro] = useState(10);
  const [tipoGeladeira,   setTipoGeladeira]   = useState<"simples"|"duplex"|"side"|"nenhuma">("duplex");
  const [ciclosMaquina,   setCiclosMaquina]   = useState(3);
  const [temSecadora,     setTemSecadora]     = useState(false);
  const [horasTV,         setHorasTV]         = useState(4);
  const [numTV,           setNumTV]           = useState(2);
  const [temMicroondas,   setTemMicroondas]   = useState(true);
  const [temComputador,   setTemComputador]   = useState(true);
  const [horasComputador, setHorasComputador] = useState(4);
  const [numComodos,      setNumComodos]      = useState(4);
  const [tipoIluminacao,  setTipoIluminacao]  = useState<"led"|"fluorescente"|"incandescente">("led");

  const resultado = useMemo(() => calcularConsumoEnergia({
    tarifaKwh, bandeira, numAr, btuAr, horasAr, numChuveiro, potenciaChuveiro, minutosChuveiro,
    tipoGeladeira, ciclosMaquina, temSecadora, horasTV, numTV, temMicroondas, temComputador,
    horasComputador, numComodos, tipoIluminacao,
  }), [tarifaKwh, bandeira, numAr, btuAr, horasAr, numChuveiro, potenciaChuveiro, minutosChuveiro,
    tipoGeladeira, ciclosMaquina, temSecadora, horasTV, numTV, temMicroondas, temComputador,
    horasComputador, numComodos, tipoIluminacao]);

  const comparacaoColor = resultado.comparacaoMedia > 20 ? "text-red-600" : resultado.comparacaoMedia > 0 ? "text-amber-600" : "text-green-600";
  const comparacaoText  = resultado.comparacaoMedia > 0
    ? `${resultado.comparacaoMedia.toFixed(0)}% acima da média brasileira (160 kWh/mês)`
    : `${Math.abs(resultado.comparacaoMedia).toFixed(0)}% abaixo da média brasileira (160 kWh/mês)`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Custos</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Consumo de Energia Elétrica</h1>
        <p className="text-slate-500">
          Estime o consumo em kWh e o valor da sua conta de luz por aparelho. Descubra quais itens mais pesam na fatura.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">

          {/* Tarifa */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Tarifa de energia: R$ {tarifaKwh.toFixed(2)}/kWh</label>
            <input type="range" min={0.40} max={1.20} step={0.01} value={tarifaKwh}
              onChange={e => setTarifaKwh(Number(e.target.value))}
              className="w-full accent-green-600" />
            <p className="text-xs text-slate-400 mt-1">Veja na sua conta de energia ou use a média da sua distribuidora</p>
          </div>

          {/* Bandeira */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-2">Bandeira tarifária</p>
            <div className="grid grid-cols-2 gap-2">
              {BANDEIRAS.map(b => (
                <button key={b.value} onClick={() => setBandeira(b.value)}
                  className={`px-3 py-2 rounded-xl border text-sm font-medium transition-all ${bandeira === b.value ? b.cor + " border-opacity-100" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                  {b.label}
                  <span className="block text-xs font-normal opacity-70">{b.extra}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Ar-condicionado */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Ar-condicionado</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Quantidade: {numAr}</label>
                <input type="range" min={0} max={5} step={1} value={numAr}
                  onChange={e => setNumAr(Number(e.target.value))} className="w-full accent-green-600" />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Horas/dia: {horasAr}h</label>
                <input type="range" min={0} max={16} step={1} value={horasAr}
                  onChange={e => setHorasAr(Number(e.target.value))} className="w-full accent-green-600" />
              </div>
            </div>
            {numAr > 0 && (
              <div className="mt-3">
                <p className="text-sm text-slate-600 mb-2">Capacidade (BTU)</p>
                <div className="flex gap-2">
                  {[9000, 12000, 18000, 24000].map(b => (
                    <button key={b} onClick={() => setBtuAr(b)}
                      className={`flex-1 py-1.5 text-xs rounded-lg border transition-all ${btuAr === b ? "border-green-500 bg-green-50 text-green-700 font-medium" : "border-slate-200 text-slate-600"}`}>
                      {b >= 1000 ? `${b / 1000}k` : b}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chuveiro */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Chuveiro elétrico</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Pessoas: {numChuveiro}</label>
                <input type="range" min={0} max={8} step={1} value={numChuveiro}
                  onChange={e => setNumChuveiro(Number(e.target.value))} className="w-full accent-green-600" />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Min/banho: {minutosChuveiro}</label>
                <input type="range" min={3} max={25} step={1} value={minutosChuveiro}
                  onChange={e => setMinutosChuveiro(Number(e.target.value))} className="w-full accent-green-600" />
              </div>
            </div>
            {numChuveiro > 0 && (
              <div className="mt-3 flex gap-2">
                {[{ w: 5500, label: "5.500W" }, { w: 7500, label: "7.500W" }].map(opt => (
                  <button key={opt.w} onClick={() => setPotenciaChuveiro(opt.w)}
                    className={`flex-1 py-1.5 text-xs rounded-lg border transition-all ${potenciaChuveiro === opt.w ? "border-green-500 bg-green-50 text-green-700 font-medium" : "border-slate-200 text-slate-600"}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Outros */}
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Outros aparelhos</p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-slate-600 mb-1.5">Geladeira</p>
                <select value={tipoGeladeira} onChange={e => setTipoGeladeira(e.target.value as typeof tipoGeladeira)}
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-green-400">
                  <option value="nenhuma">Nenhuma</option>
                  <option value="simples">1 porta (~35 kWh/mês)</option>
                  <option value="duplex">2 portas (~50 kWh/mês)</option>
                  <option value="side">Side-by-side (~70 kWh/mês)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Cômodos: {numComodos}</label>
                <input type="range" min={1} max={10} step={1} value={numComodos}
                  onChange={e => setNumComodos(Number(e.target.value))} className="w-full accent-green-600" />
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-600 mb-1.5">Iluminação</p>
              <div className="flex gap-2">
                {[{ v: "led", l: "LED" }, { v: "fluorescente", l: "Fluorescente" }, { v: "incandescente", l: "Incandescente" }].map(opt => (
                  <button key={opt.v} onClick={() => setTipoIluminacao(opt.v as typeof tipoIluminacao)}
                    className={`flex-1 py-1.5 text-xs rounded-lg border transition-all ${tipoIluminacao === opt.v ? "border-green-500 bg-green-50 text-green-700 font-medium" : "border-slate-200 text-slate-600"}`}>
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">TV: {numTV} · {horasTV}h/dia</label>
                <input type="range" min={0} max={5} step={1} value={numTV}
                  onChange={e => setNumTV(Number(e.target.value))} className="w-full accent-green-600" />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Lavar: {ciclosMaquina}×/sem</label>
                <input type="range" min={0} max={14} step={1} value={ciclosMaquina}
                  onChange={e => setCiclosMaquina(Number(e.target.value))} className="w-full accent-green-600" />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                { id: "micro", label: "Micro-ondas", val: temMicroondas, set: setTemMicroondas },
                { id: "comp",  label: "Computador",  val: temComputador, set: setTemComputador },
                { id: "sec",   label: "Secadora",    val: temSecadora,   set: setTemSecadora },
              ].map(item => (
                <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={item.val} onChange={e => item.set(e.target.checked)}
                    className="w-4 h-4 rounded accent-green-600" />
                  <span className="text-sm text-slate-700">{item.label}</span>
                </label>
              ))}
              {temComputador && (
                <div className="w-full">
                  <label className="block text-sm text-slate-600 mb-1.5">Horas/dia computador: {horasComputador}h</label>
                  <input type="range" min={1} max={16} step={1} value={horasComputador}
                    onChange={e => setHorasComputador(Number(e.target.value))} className="w-full accent-green-600" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Plug className="w-5 h-5 text-green-200" />
              <p className="text-green-200 text-sm">Estimativa da conta de luz</p>
            </div>
            <p className="text-4xl font-bold mb-1">{formatCurrency(resultado.custoTotal)}/mês</p>
            <p className="text-green-200 text-sm">{resultado.kwhMes} kWh/mês</p>
            {resultado.additivoBandeira > 0 && (
              <p className="text-green-200 text-sm mt-1">Inclui {formatCurrency(resultado.additivoBandeira)} de adicional de bandeira</p>
            )}
          </div>

          <div className={`rounded-xl px-4 py-3 border text-sm font-medium ${comparacaoColor} ${resultado.comparacaoMedia > 20 ? "bg-red-50 border-red-100" : resultado.comparacaoMedia > 0 ? "bg-amber-50 border-amber-100" : "bg-green-50 border-green-100"}`}>
            <Zap className="w-4 h-4 inline mr-1.5 -mt-0.5" />
            {comparacaoText}
          </div>

          {/* Breakdown por aparelho */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Consumo por aparelho</h3>
            <div className="space-y-2.5">
              {resultado.itens.sort((a, b) => b.kwhMes - a.kwhMes).map(item => (
                <div key={item.item}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{item.item}</span>
                    <span className="text-slate-700 font-medium">{item.kwhMes} kWh · {formatCurrency(item.custoMes)}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${item.percentual}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-green-50 border border-green-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900 mb-2">Dicas para reduzir a conta de luz</h3>
            <ul className="text-sm text-green-800 space-y-1.5 list-disc list-inside">
              <li>Troque o ar-condicionado convencional por um inverter — economiza 35–60% no consumo do aparelho.</li>
              <li>Reduza o banho de 15 para 8 minutos com chuveiro de 5.500W: economiza ~60 kWh/mês para 2 pessoas.</li>
              <li>Substitua lâmpadas incandescentes por LED — mesma luminosidade com 85% menos consumo.</li>
              <li>A geladeira responde por 10–20% da conta: mantenha-a longe do fogão e com borracha vedante em bom estado.</li>
              <li>Lave roupas com água fria e com a máquina cheia — a temperatura não impacta o consumo, mas a quantidade impacta.</li>
            </ul>
          </div>
        </div>
      </div>

      <FaqSection path="/consumo-energia" />
      <RelatedCalculators path="/consumo-energia" />
      <RelatedGuides path="/consumo-energia" />
    </div>
  );
}
