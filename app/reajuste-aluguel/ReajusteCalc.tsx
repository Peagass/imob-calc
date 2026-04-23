"use client";

import { useState, useMemo } from "react";
import { calcularReajusteAluguel } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import { type IndicesReajuste } from "@/lib/indices";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, TrendingUp, AlertCircle } from "lucide-react";

type NomeIndice = "IGP-M" | "IPCA" | "INPC" | "IPCA-E" | "personalizado";

interface Props {
  indices: IndicesReajuste;
}

export default function ReajusteCalc({ indices }: Props) {
  const presets: { nome: NomeIndice; label: string; dado: IndicesReajuste[keyof IndicesReajuste] }[] = [
    { nome: "IGP-M",   label: "IGP-M",   dado: indices.igpm  },
    { nome: "IPCA",    label: "IPCA",    dado: indices.ipca  },
    { nome: "INPC",    label: "INPC",    dado: indices.inpc  },
    { nome: "IPCA-E",  label: "IPCA-E",  dado: indices.ipcae },
  ];

  const [valorAtual, setValorAtual] = useState(2_500);
  const [indice, setIndice] = useState<NomeIndice>("IGP-M");
  const [percentualCustom, setPercentualCustom] = useState("");

  const presetAtivo = presets.find((p) => p.nome === indice);
  const percentualEfetivo =
    indice === "personalizado"
      ? parseFloat(percentualCustom) || 0
      : presetAtivo?.dado.valor ?? 0;

  const resultado = useMemo(
    () => calcularReajusteAluguel({ valorAtual, indice: "IGP-M", percentualAcumulado: percentualEfetivo }),
    [valorAtual, percentualEfetivo]
  );

  const algumErro = Object.values(indices).some((i) => i.erro);

  return (
    <div>
      {algumErro && (
        <div className="mb-6 flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-sm text-rose-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Não foi possível carregar alguns índices da API do Banco Central. Verifique sua conexão ou use o campo personalizado.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
          <CurrencyInput
            id="valor-atual"
            label="Valor atual do aluguel"
            value={valorAtual}
            onChange={setValorAtual}
          />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Índice de reajuste</label>
            <div className="space-y-2">
              {presets.map((p) => (
                <button
                  key={p.nome}
                  onClick={() => setIndice(p.nome)}
                  disabled={p.dado.erro}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                    indice === p.nome
                      ? "bg-amber-50 border-amber-300 text-amber-900"
                      : "bg-white border-slate-200 text-slate-700 hover:border-amber-200"
                  }`}
                >
                  <div>
                    <span className="text-sm font-medium">{p.label}</span>
                    {!p.dado.erro && (
                      <span className="ml-2 text-xs text-slate-400">acum. 12m até {p.dado.referencia}</span>
                    )}
                  </div>
                  {p.dado.erro ? (
                    <span className="text-xs text-rose-400">Indisponível</span>
                  ) : (
                    <span className="text-sm font-bold text-amber-600">{formatPercent(p.dado.valor)}</span>
                  )}
                </button>
              ))}

              <button
                onClick={() => setIndice("personalizado")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
                  indice === "personalizado"
                    ? "bg-amber-50 border-amber-300 text-amber-900"
                    : "bg-white border-slate-200 text-slate-700 hover:border-amber-200"
                }`}
              >
                <span className="text-sm font-medium">Percentual personalizado</span>
                <TrendingUp className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {indice === "personalizado" && (
              <div className="mt-3 relative">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={percentualCustom}
                  onChange={(e) => setPercentualCustom(e.target.value)}
                  placeholder="Ex: 6,50"
                  className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-800 bg-white pr-10"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
              </div>
            )}
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
            <p className="text-amber-100 text-sm mb-1">Novo valor do aluguel</p>
            <p className="text-4xl font-bold mb-2">{formatCurrency(resultado.novoValor)}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-white/20 text-white text-xs font-semibold px-2 py-1 rounded-full">
                +{formatCurrency(resultado.aumento)}/mês
              </span>
              <span className="text-amber-200 text-sm">({formatPercent(resultado.percentualReal)} de reajuste)</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Impacto financeiro</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Aluguel atual</span>
                <span className="font-semibold text-slate-900">{formatCurrency(valorAtual)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Aumento mensal</span>
                <span className="font-semibold text-amber-600">+{formatCurrency(resultado.aumento)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Aumento anual</span>
                <span className="font-semibold text-amber-600">+{formatCurrency(resultado.aumento * 12)}</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-700">Novo aluguel</span>
                <span className="font-bold text-slate-900 text-lg">{formatCurrency(resultado.novoValor)}</span>
              </div>
            </div>
          </div>

          {/* Comparativo de índices */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Comparativo de índices</h3>
            <div className="space-y-3">
              {presets.filter((p) => !p.dado.erro).map((p) => {
                const novoValorIndice = valorAtual * (1 + p.dado.valor / 100);
                return (
                  <div key={p.nome} className="flex items-center gap-3">
                    <span className={`text-xs font-semibold w-16 shrink-0 ${indice === p.nome ? "text-amber-600" : "text-slate-500"}`}>
                      {p.nome}
                    </span>
                    <div className="flex-1 bg-slate-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${indice === p.nome ? "bg-amber-400" : "bg-slate-300"}`}
                        style={{ width: `${Math.min((p.dado.valor / 15) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-900 w-24 text-right shrink-0">
                      {formatCurrency(novoValorIndice)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">O que isso significa?</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li><strong>IGP-M</strong>: calculado pela FGV, historicamente o mais usado em contratos de aluguel, mas vem sendo substituído pelo IPCA.</li>
              <li><strong>IPCA</strong>: calculado pelo IBGE, reflete a inflação "real" das famílias e é o índice oficial do governo.</li>
              <li>A Lei do Inquilinato permite que o índice seja escolhido pelas partes. Verifique qual está no seu contrato.</li>
              <li>O reajuste só pode ocorrer uma vez ao ano, após 12 meses da assinatura ou do último reajuste.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
