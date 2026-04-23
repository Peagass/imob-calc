"use client";

import { useState, useMemo } from "react";
import { calcularQuantoCobrarAluguel } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, TrendingUp } from "lucide-react";
import type { IndiceAcumulado } from "@/lib/indices";

interface Props {
  selic: IndiceAcumulado;
}

export default function QuantoCobrarCalc({ selic }: Props) {
  const [valorImovel, setValorImovel] = useState(500_000);
  const [retornoDesejadoAnual, setRetornoDesejadoAnual] = useState(
    selic.erro ? 6.0 : Math.max(4.0, selic.valor * 0.5)
  );
  const [despesasAnuaisProprietario, setDespesasAnuaisProprietario] = useState(8_400);
  const [vacanciaPercentual, setVacanciaPercentual] = useState(8);

  const resultado = useMemo(
    () => calcularQuantoCobrarAluguel({ valorImovel, retornoDesejadoAnual, despesasAnuaisProprietario, vacanciaPercentual }),
    [valorImovel, retornoDesejadoAnual, despesasAnuaisProprietario, vacanciaPercentual]
  );

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput id="valor-imovel" label="Valor do imóvel"
            value={valorImovel} onChange={setValorImovel} />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Retorno líquido desejado: {formatPercent(retornoDesejadoAnual)} a.a.
            </label>
            <input type="range" min={3} max={15} step={0.25} value={retornoDesejadoAnual}
              onChange={(e) => setRetornoDesejadoAnual(Number(e.target.value))}
              className="w-full accent-amber-500" />
            {!selic.erro && (
              <p className="text-xs text-slate-400 mt-1">
                Selic atual: {selic.valor.toFixed(2)}% a.a. — meta de retorno acima disso faz sentido para justificar o risco do imóvel.
              </p>
            )}
          </div>

          <CurrencyInput id="despesas" label="Despesas anuais do proprietário"
            value={despesasAnuaisProprietario} onChange={setDespesasAnuaisProprietario}
            hint="IPTU + condomínio + seguro + manutenção (parte do proprietário)" />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Vacância estimada: {vacanciaPercentual}%
              <span className="text-slate-400 font-normal ml-1">(~{Math.round(vacanciaPercentual * 12 / 100)} meses/ano)</span>
            </label>
            <input type="range" min={0} max={30} step={1} value={vacanciaPercentual}
              onChange={(e) => setVacanciaPercentual(Number(e.target.value))}
              className="w-full accent-amber-500" />
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
            <p className="text-amber-100 text-sm mb-1">Aluguel recomendado</p>
            <p className="text-4xl font-bold mb-1">{formatCurrency(resultado.aluguelRecomendado)}</p>
            <p className="text-amber-200 text-sm">
              Inclui 10% de margem de negociação sobre o alvo de {formatCurrency(resultado.aluguelAlvo)}/mês
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">Aluguel mínimo</p>
              <p className="text-lg font-bold text-slate-800">{formatCurrency(resultado.aluguelMinimo)}</p>
              <p className="text-xs text-slate-400 mt-0.5">Só cobre as despesas</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-xs text-amber-600 mb-1">Cap Rate resultante</p>
              <p className="text-lg font-bold text-amber-700">
                {formatPercent(resultado.capRateResultante, 2)}
              </p>
              <p className="text-xs text-amber-600 mt-0.5">líquido a.a.</p>
            </div>
          </div>

          {/* Comparação com mercado */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Referências de mercado</h3>
            <div className="space-y-2.5">
              {resultado.comparacaoMercado.map((ref) => (
                <div key={ref.referencia} className="text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">{ref.referencia}</span>
                    <span className="font-semibold">{formatPercent(ref.capRate, 1)} a.a.</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>≈ {formatCurrency(ref.aluguel)}/mês</span>
                  </div>
                </div>
              ))}
              {!selic.erro && (
                <div className="text-sm border-t border-slate-100 pt-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Selic (renda fixa)</span>
                    <span className="font-semibold text-blue-700">{formatPercent(selic.valor, 2)} a.a.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <TrendingUp className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Como definir o aluguel ideal</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li>Pesquise o preço de imóveis similares na mesma região — o mercado dita o teto realista.</li>
              <li>Cap rate residencial saudável no Brasil fica em torno de 5–7% líquido a.a.</li>
              <li>Aluguel muito acima do mercado aumenta a vacância — o custo de ficar vago destrói o retorno.</li>
              <li>Considere ajuste anual pelo IPCA ou IGP-M — garante que o retorno real se mantenha ao longo do tempo.</li>
              <li>Para imóvel financiado, o aluguel idealmente deve cobrir a parcela integralmente (fluxo de caixa positivo).</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          O cap rate de referência para cada cidade é uma estimativa histórica e pode variar. O valor final do aluguel deve ser validado com pesquisa de mercado local.
        </p>
      </div>
    </div>
  );
}
