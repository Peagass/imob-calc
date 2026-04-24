"use client";

import { useState, useMemo } from "react";
import { calcularEstimativaReforma } from "@/lib/calculators";
import type { PadraoReforma, TipoReforma } from "@/lib/calculators";
import { formatCurrency } from "@/lib/format";
import { Info, Hammer } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


const TIPOS: { value: TipoReforma; label: string; desc: string }[] = [
  { value: "pintura", label: "Pintura", desc: "Apenas paredes e teto" },
  { value: "acabamento", label: "Acabamento e pisos", desc: "Revestimentos, pisos, louças e metais" },
  { value: "completa", label: "Reforma completa", desc: "Estrutura, elétrica, hidráulica + acabamento" },
];

const PADROES: { value: PadraoReforma; label: string; desc: string }[] = [
  { value: "simples", label: "Simples / Econômico", desc: "Materiais básicos, mão de obra local" },
  { value: "medio", label: "Médio Padrão", desc: "Materiais intermediários, acabamento cuidado" },
  { value: "alto", label: "Alto Padrão", desc: "Materiais premium, acabamento impecável" },
];

export default function EstimativaReformaPage() {
  const [areaM2, setAreaM2] = useState(80);
  const [tipo, setTipo] = useState<TipoReforma>("acabamento");
  const [padrao, setPadrao] = useState<PadraoReforma>("medio");
  const [incluiAreaExterna, setIncluiAreaExterna] = useState(false);
  const [areaExternaM2, setAreaExternaM2] = useState(20);

  const resultado = useMemo(
    () => calcularEstimativaReforma({ areaM2, tipo, padrao, incluiAreaExterna, areaExternaM2 }),
    [areaM2, tipo, padrao, incluiAreaExterna, areaExternaM2]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Reforma</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Estimativa de Reforma</h1>
        <p className="text-slate-500">
          Estime o custo da sua reforma por m², tipo e padrão. Valores baseados em médias nacionais de 2025/2026.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
          {/* Tipo */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-2">Tipo de reforma</p>
            <div className="space-y-2">
              {TIPOS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTipo(t.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                    tipo === t.value
                      ? "border-orange-400 bg-orange-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <p className={`text-sm font-semibold ${tipo === t.value ? "text-orange-700" : "text-slate-800"}`}>{t.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Padrão */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-2">Padrão de acabamento</p>
            <div className="grid grid-cols-3 gap-2">
              {PADROES.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPadrao(p.value)}
                  className={`px-3 py-2.5 rounded-xl border text-center transition-all ${
                    padrao === p.value
                      ? "border-orange-400 bg-orange-50 text-orange-700"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <p className="text-xs font-semibold leading-snug">{p.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Área */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Área total: {areaM2} m²
            </label>
            <input type="range" min={20} max={500} step={5} value={areaM2}
              onChange={(e) => setAreaM2(Number(e.target.value))}
              className="w-full accent-orange-500" />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>20 m²</span><span>500 m²</span>
            </div>
          </div>

          {/* Área externa */}
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3 mb-3">
              <input type="checkbox" id="areaExterna" checked={incluiAreaExterna}
                onChange={(e) => setIncluiAreaExterna(e.target.checked)}
                className="w-4 h-4 rounded accent-orange-500" />
              <label htmlFor="areaExterna" className="text-sm font-medium text-slate-700 cursor-pointer">
                Incluir área externa / varanda
              </label>
            </div>
            {incluiAreaExterna && (
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Área externa: {areaExternaM2} m²
                </label>
                <input type="range" min={5} max={200} step={5} value={areaExternaM2}
                  onChange={(e) => setAreaExternaM2(Number(e.target.value))}
                  className="w-full accent-orange-500" />
              </div>
            )}
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-6 text-white">
            <p className="text-orange-100 text-sm mb-1">Estimativa total</p>
            <p className="text-4xl font-bold mb-1">{formatCurrency(resultado.custoTotal)}</p>
            <p className="text-orange-200 text-sm">
              Faixa: {formatCurrency(resultado.custoMin)} – {formatCurrency(resultado.custoMax)}
            </p>
            <p className="text-orange-200 text-sm mt-1">
              Custo médio: {formatCurrency(resultado.custoM2)}/m²
            </p>
          </div>

          {/* Detalhamento */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3">
            <h3 className="font-semibold text-slate-800">Detalhamento por item</h3>
            {resultado.detalhamento.map((item) => (
              <div key={item.item} className="flex justify-between items-center text-sm">
                <span className="text-slate-600">{item.item}</span>
                <div className="text-right">
                  <span className="font-semibold text-slate-900">{formatCurrency(item.custo)}</span>
                  <div className="h-1.5 bg-slate-100 rounded-full mt-1 w-32">
                    <div
                      className="h-full bg-orange-400 rounded-full"
                      style={{ width: `${resultado.custoTotal > 0 ? Math.min(100, (item.custo / resultado.custoTotal) * 100) : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contexto */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Custo/m² por padrão (referência)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Pintura simples</span>
                <span className="text-slate-700">R$ 25–45/m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Acabamento médio</span>
                <span className="text-slate-700">R$ 800–1.300/m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Reforma completa alto padrão</span>
                <span className="text-slate-700">R$ 3.800–7.000/m²</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Hammer className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Como obter um orçamento preciso</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li>Peça pelo menos 3 orçamentos de construtoras ou profissionais autônomos.</li>
              <li>Valores variam muito por região — cidades do interior costumam ser 20–40% mais baratas.</li>
              <li>Projetos com planta e memorial descritivo evitam surpresas e cobranças extras.</li>
              <li>Imprevistos são comuns — reserve 15–20% a mais do orçamento.</li>
              <li>Solicite nota fiscal para todas as compras — essencial para abatimento no Ganho de Capital.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          <strong>Estimativa educacional.</strong> Os valores são médias nacionais de 2025/2026 (referência: SINAPI/jan.2026 e Lar Pontual Engenharia) e podem variar significativamente por região, disponibilidade de mão de obra e flutuação de materiais. Sempre obtenha orçamentos de profissionais locais.
        </p>
      </div>

      <FaqSection path="/estimativa-reforma" />
      <RelatedCalculators path="/estimativa-reforma" />
    </div>
  );
}
