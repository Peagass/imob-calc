"use client";

import { useState, useMemo } from "react";
import { calcularConsumoGas } from "@/lib/calculators";
import type { TipoFornecimentoGas, TipoAquecedor, UsoForno } from "@/lib/calculators";
import { formatCurrency } from "@/lib/format";
import { Info, Flame } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import RelatedGuides from "@/components/RelatedGuides";

export default function ConsumoGasPage() {
  const [numMoradores,       setNumMoradores]       = useState(3);
  const [tipoFornecimento,   setTipoFornecimento]   = useState<TipoFornecimentoGas>("botijao");
  const [precoUnidade,       setPrecoUnidade]       = useState(130);
  const [temFogao,           setTemFogao]           = useState(true);
  const [numBocas,           setNumBocas]           = useState(4);
  const [refeicoesDia,       setRefeicoesDia]       = useState(2);
  const [tipoAquecedor,      setTipoAquecedor]      = useState<TipoAquecedor>("gas_passagem");
  const [minutosBanhoGas,    setMinutosBanhoGas]    = useState(10);
  const [temSecadoraGas,     setTemSecadoraGas]     = useState(false);
  const [ciclosSecadoraSemana, setCiclosSecadoraSemana] = useState(2);
  const [temForno,           setTemForno]           = useState(false);
  const [usoForno,           setUsoForno]           = useState<UsoForno>("moderado");

  const resultado = useMemo(() => calcularConsumoGas({
    numMoradores, tipoFornecimento, precoUnidade, temFogao, numBocas, refeicoesDia,
    tipoAquecedor, minutosBanhoGas, temSecadoraGas, ciclosSecadoraSemana, temForno, usoForno,
  }), [numMoradores, tipoFornecimento, precoUnidade, temFogao, numBocas, refeicoesDia,
    tipoAquecedor, minutosBanhoGas, temSecadoraGas, ciclosSecadoraSemana, temForno, usoForno]);

  const isBotijao = tipoFornecimento === "botijao";
  const isGN      = tipoFornecimento === "gn";

  const precoLabel = isBotijao ? "Preço do botijão P13" : "Tarifa do gás (R$/m³)";
  const precoDefault = isBotijao ? 130 : isGN ? 4.5 : 6.0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Custos</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Consumo de Gás</h1>
        <p className="text-slate-500">
          Estime o consumo mensal de gás por fogão, aquecedor de água e secadora. Veja quantos botijões P13 por mês e o custo total.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Número de moradores: {numMoradores}</label>
            <input type="range" min={1} max={10} step={1} value={numMoradores}
              onChange={e => setNumMoradores(Number(e.target.value))} className="w-full accent-orange-500" />
            <div className="flex justify-between text-xs text-slate-400 mt-1"><span>1</span><span>10</span></div>
          </div>

          {/* Tipo de fornecimento */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-2">Tipo de fornecimento</p>
            <div className="flex gap-2">
              {[
                { v: "botijao",      l: "Botijão GLP (P13)" },
                { v: "glp_encanado", l: "GLP encanado" },
                { v: "gn",           l: "Gás Natural (GN)" },
              ].map(opt => (
                <button key={opt.v} onClick={() => { setTipoFornecimento(opt.v as TipoFornecimentoGas); setPrecoUnidade(opt.v === "botijao" ? 130 : opt.v === "gn" ? 4.5 : 6.0); }}
                  className={`flex-1 py-2 text-xs rounded-lg border transition-all ${tipoFornecimento === opt.v ? "border-orange-400 bg-orange-50 text-orange-700 font-medium" : "border-slate-200 text-slate-600"}`}>
                  {opt.l}
                </button>
              ))}
            </div>
          </div>

          {/* Preço */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              {precoLabel}: {isBotijao ? `R$ ${precoUnidade.toFixed(0)}` : `R$ ${precoUnidade.toFixed(2)}/m³`}
            </label>
            <input type="range"
              min={isBotijao ? 80 : 2} max={isBotijao ? 200 : 12} step={isBotijao ? 5 : 0.5}
              value={precoUnidade} onChange={e => setPrecoUnidade(Number(e.target.value))}
              className="w-full accent-orange-500" />
          </div>

          {/* Fogão */}
          <div className="border-t border-slate-100 pt-4">
            <label className="flex items-center gap-2 cursor-pointer mb-3">
              <input type="checkbox" checked={temFogao} onChange={e => setTemFogao(e.target.checked)}
                className="w-4 h-4 rounded accent-orange-500" />
              <span className="text-sm font-medium text-slate-700">Fogão a gás</span>
            </label>
            {temFogao && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Bocas</p>
                  <div className="flex gap-2">
                    {[4, 6].map(b => (
                      <button key={b} onClick={() => setNumBocas(b)}
                        className={`flex-1 py-1.5 text-sm rounded-lg border transition-all ${numBocas === b ? "border-orange-400 bg-orange-50 text-orange-700 font-medium" : "border-slate-200 text-slate-600"}`}>
                        {b} bocas
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1.5">Refeições/dia: {refeicoesDia}</label>
                  <input type="range" min={1} max={4} step={1} value={refeicoesDia}
                    onChange={e => setRefeicoesDia(Number(e.target.value))} className="w-full accent-orange-500" />
                </div>
              </div>
            )}
          </div>

          {/* Aquecedor */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-sm font-medium text-slate-600 mb-2">Aquecedor de água</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: "gas_passagem", l: "Passagem a gás" },
                { v: "gas_central",  l: "Central a gás" },
                { v: "eletrico",     l: "Elétrico" },
                { v: "nao_tem",      l: "Sem aquecedor" },
              ].map(opt => (
                <button key={opt.v} onClick={() => setTipoAquecedor(opt.v as TipoAquecedor)}
                  className={`py-2 text-xs rounded-lg border transition-all ${tipoAquecedor === opt.v ? "border-orange-400 bg-orange-50 text-orange-700 font-medium" : "border-slate-200 text-slate-600"}`}>
                  {opt.l}
                </button>
              ))}
            </div>
            {(tipoAquecedor === "gas_passagem" || tipoAquecedor === "gas_central") && (
              <div className="mt-3">
                <label className="block text-sm text-slate-600 mb-1.5">Minutos de banho por pessoa: {minutosBanhoGas} min</label>
                <input type="range" min={3} max={25} step={1} value={minutosBanhoGas}
                  onChange={e => setMinutosBanhoGas(Number(e.target.value))} className="w-full accent-orange-500" />
              </div>
            )}
          </div>

          {/* Outros */}
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={temForno} onChange={e => setTemForno(e.target.checked)}
                className="w-4 h-4 rounded accent-orange-500" />
              <span className="text-sm font-medium text-slate-700">Forno a gás</span>
            </label>
            {temForno && (
              <div className="flex gap-2">
                {[{ v: "raro", l: "Raro" }, { v: "moderado", l: "Moderado" }, { v: "frequente", l: "Frequente" }].map(opt => (
                  <button key={opt.v} onClick={() => setUsoForno(opt.v as UsoForno)}
                    className={`flex-1 py-1.5 text-xs rounded-lg border transition-all ${usoForno === opt.v ? "border-orange-400 bg-orange-50 text-orange-700 font-medium" : "border-slate-200 text-slate-600"}`}>
                    {opt.l}
                  </button>
                ))}
              </div>
            )}

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={temSecadoraGas} onChange={e => setTemSecadoraGas(e.target.checked)}
                className="w-4 h-4 rounded accent-orange-500" />
              <span className="text-sm font-medium text-slate-700">Secadora a gás</span>
            </label>
            {temSecadoraGas && (
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Ciclos/semana: {ciclosSecadoraSemana}</label>
                <input type="range" min={1} max={14} step={1} value={ciclosSecadoraSemana}
                  onChange={e => setCiclosSecadoraSemana(Number(e.target.value))} className="w-full accent-orange-500" />
              </div>
            )}
          </div>
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-orange-200" />
              <p className="text-orange-200 text-sm">Custo estimado por mês</p>
            </div>
            <p className="text-4xl font-bold mb-1">{formatCurrency(resultado.custoMes)}/mês</p>
            <p className="text-orange-200 text-sm">{resultado.consumoM3Mes} m³/mês</p>
          </div>

          {isBotijao && (
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-800 mb-3">Equivalência em botijões</h3>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">{resultado.botijoesMes.toFixed(1)}</p>
                  <p className="text-xs text-slate-500 mt-1">botijões P13/mês</p>
                </div>
                <div className="flex-1 border-l border-slate-100 pl-4 space-y-1.5">
                  <p className="text-sm text-slate-600">{resultado.consumoKgMes.toFixed(1)} kg GLP/mês</p>
                  <p className="text-sm text-slate-600">{resultado.consumoM3Mes} m³/mês</p>
                  <p className="text-sm font-medium text-slate-800">{formatCurrency(resultado.custoMes * 12)}/ano</p>
                </div>
              </div>
            </div>
          )}

          {/* Breakdown */}
          {resultado.itens.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-800 mb-3">Consumo por uso</h3>
              <div className="space-y-2.5">
                {resultado.itens.sort((a, b) => b.m3Mes - a.m3Mes).map(item => (
                  <div key={item.uso}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">{item.uso}</span>
                      <span className="text-slate-700 font-medium">{item.m3Mes} m³ · {formatCurrency(item.custoMes)}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400 rounded-full" style={{ width: `${item.percentual}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resultado.itens.length === 0 && (
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 text-center text-slate-400 text-sm">
              Nenhum aparelho a gás selecionado
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-orange-50 border border-orange-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-orange-900 mb-2">Sobre os valores estimados</h3>
            <ul className="text-sm text-orange-800 space-y-1.5 list-disc list-inside">
              <li>O aquecedor de água costuma responder por 50–70% do consumo de gás residencial — o principal item a controlar.</li>
              <li>Banhos mais curtos são a forma mais eficaz de reduzir o consumo: cada minuto a menos economiza ~0,011 m³ GLP.</li>
              <li>Preços do botijão P13 variam por distribuidora e região — consulte os preços da sua cidade para refinar o cálculo.</li>
              <li>O gás natural tem menor poder calorífico por m³ que o GLP, por isso o consumo em m³ é maior para a mesma energia.</li>
            </ul>
          </div>
        </div>
      </div>

      <FaqSection path="/consumo-gas" />
      <RelatedCalculators path="/consumo-gas" />
      <RelatedGuides path="/consumo-gas" />
    </div>
  );
}
