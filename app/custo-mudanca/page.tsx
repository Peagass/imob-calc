"use client";

import { useState, useMemo } from "react";
import { calcularCustoMudanca } from "@/lib/calculators";
import type { TipoServico } from "@/lib/calculators";
import { formatCurrency } from "@/lib/format";
import { Info, Truck } from "lucide-react";

const SERVICOS: { value: TipoServico; label: string; desc: string }[] = [
  { value: "somente_caminhao", label: "Só o caminhão", desc: "Você mesmo carrega — motorista incluso" },
  { value: "mao_obra", label: "Caminhão + mão de obra", desc: "Ajudantes carregam e descarregam" },
  { value: "completo", label: "Serviço completo", desc: "Embala, carrega, transporta e desembala" },
];

export default function CustoMudancaPage() {
  const [numComodos, setNumComodos] = useState(3);
  const [distanciaKm, setDistanciaKm] = useState(30);
  const [tipoServico, setTipoServico] = useState<TipoServico>("mao_obra");
  const [andarOrigem, setAndarOrigem] = useState(1);
  const [andarDestino, setAndarDestino] = useState(1);
  const [temElevador, setTemElevador] = useState(true);

  const resultado = useMemo(
    () => calcularCustoMudanca({ numComodos, distanciaKm, tipoServico, andarOrigem, andarDestino, temElevador }),
    [numComodos, distanciaKm, tipoServico, andarOrigem, andarDestino, temElevador]
  );

  const tamanhoLabel: Record<string, string> = {
    pequena: "Pequena (1–2 cômodos)",
    media: "Média (3–4 cômodos)",
    grande: "Grande (5+ cômodos)",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Custo de Mudança</h1>
        <p className="text-slate-500">
          Estime o custo do frete de mudança por número de cômodos, distância e tipo de serviço. Valores médios do mercado brasileiro.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
          {/* Número de cômodos */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Número de cômodos: {numComodos}
            </label>
            <input type="range" min={1} max={10} step={1} value={numComodos}
              onChange={(e) => setNumComodos(Number(e.target.value))}
              className="w-full accent-slate-700" />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1 cômodo</span><span>10 cômodos</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 text-center">
              Tamanho: <strong>{tamanhoLabel[resultado.tamanho]}</strong>
            </p>
          </div>

          {/* Distância */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Distância: {distanciaKm} km
            </label>
            <input type="range" min={1} max={1500} step={10} value={distanciaKm}
              onChange={(e) => setDistanciaKm(Number(e.target.value))}
              className="w-full accent-slate-700" />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Local</span>
              <span className="text-center">Médio (&lt;200km)</span>
              <span>Longa distância</span>
            </div>
          </div>

          {/* Tipo de serviço */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-2">Tipo de serviço</p>
            <div className="space-y-2">
              {SERVICOS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setTipoServico(s.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                    tipoServico === s.value
                      ? "border-slate-600 bg-slate-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <p className={`text-sm font-semibold ${tipoServico === s.value ? "text-slate-900" : "text-slate-700"}`}>{s.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Andares */}
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3 mb-4">
              <input type="checkbox" id="elevador" checked={temElevador}
                onChange={(e) => setTemElevador(e.target.checked)}
                className="w-4 h-4 rounded accent-slate-700" />
              <label htmlFor="elevador" className="text-sm font-medium text-slate-700 cursor-pointer">
                Tem elevador (origem e/ou destino)
              </label>
            </div>

            {!temElevador && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Andar de origem: {andarOrigem}º
                  </label>
                  <input type="range" min={1} max={20} step={1} value={andarOrigem}
                    onChange={(e) => setAndarOrigem(Number(e.target.value))}
                    className="w-full accent-slate-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Andar de destino: {andarDestino}º
                  </label>
                  <input type="range" min={1} max={20} step={1} value={andarDestino}
                    onChange={(e) => setAndarDestino(Number(e.target.value))}
                    className="w-full accent-slate-700" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-5 h-5 text-slate-300" />
              <p className="text-slate-300 text-sm">Estimativa de custo</p>
            </div>
            <p className="text-4xl font-bold mb-2">{formatCurrency(resultado.custoEstimado)}</p>
            <p className="text-slate-300 text-sm">
              Faixa: {formatCurrency(resultado.custoMin)} – {formatCurrency(resultado.custoMax)}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3">
            <h3 className="font-semibold text-slate-800">Detalhamento</h3>
            {resultado.detalhamento.map((item) => (
              <div key={item.item} className="flex justify-between text-sm">
                <span className="text-slate-600">{item.item}</span>
                <span className="font-semibold">{formatCurrency(item.custo)}</span>
              </div>
            ))}
          </div>

          {/* Tabela de referência */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Tabela de referência (mão de obra)</h3>
            <div className="text-xs text-slate-500 space-y-2">
              <div className="grid grid-cols-4 font-semibold text-slate-600 border-b border-slate-100 pb-1 mb-1">
                <span>Tamanho</span><span>Local</span><span>Médio</span><span>Longa</span>
              </div>
              <div className="grid grid-cols-4">
                <span>Pequena</span><span>R$800–1.5k</span><span>R$1.8–3.5k</span><span>R$3–6k</span>
              </div>
              <div className="grid grid-cols-4">
                <span>Média</span><span>R$1.8–3.2k</span><span>R$3.5–6k</span><span>R$6–11k</span>
              </div>
              <div className="grid grid-cols-4">
                <span>Grande</span><span>R$3.5–6k</span><span>R$6–12k</span><span>R$11–20k</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Dicas para economizar na mudança</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li>Peça pelo menos 3 orçamentos — os preços variam bastante entre empresas.</li>
              <li>Mudanças no meio da semana costumam ser 15–25% mais baratas que aos finais de semana.</li>
              <li>Desmontar móveis antes economiza horas de trabalho dos ajudantes.</li>
              <li>Venda ou doe o que não vai usar — menos volume = frete menor.</li>
              <li>Verifique se a empresa tem seguro contra danos — exija antes de contratar.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
