"use client";

import { useState, useMemo } from "react";
import { calcularTributacaoAluguel } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, AlertTriangle } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


export default function TributacaoAluguelPage() {
  const [aluguelMensal, setAluguelMensal] = useState(3_000);
  const [condominioLandlord, setCondominioLandlord] = useState(0);
  const [iptuMensal, setIptuMensal] = useState(200);
  const [outrasDeducoes, setOutrasDeducoes] = useState(0);
  const [outrasRendas, setOutrasRendas] = useState(0);

  const resultado = useMemo(
    () => calcularTributacaoAluguel({ aluguelMensal, condominioLandlord, iptuMensal, outrasDeducoes, outrasRendas }),
    [aluguelMensal, condominioLandlord, iptuMensal, outrasDeducoes, outrasRendas]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Aluguel</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Tributação do Aluguel</h1>
        <p className="text-slate-500">
          Calcule o IR mensal (carnê-leão) sobre renda de aluguel para pessoa física com as deduções permitidas pela Receita Federal.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput id="aluguel" label="Aluguel mensal bruto" value={aluguelMensal} onChange={setAluguelMensal} />

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-4">Deduções permitidas</p>
            <div className="space-y-4">
              <CurrencyInput
                id="condominio"
                label="Condomínio pago pelo proprietário"
                value={condominioLandlord}
                onChange={setCondominioLandlord}
                hint="Só deduz se o contrato responsabiliza o proprietário"
              />
              <CurrencyInput
                id="iptu"
                label="IPTU mensal (valor anual ÷ 12)"
                value={iptuMensal}
                onChange={setIptuMensal}
                hint="Dedutível quando o proprietário paga o IPTU"
              />
              <CurrencyInput
                id="outras"
                label="Outras deduções (seguro incêndio, etc.)"
                value={outrasDeducoes}
                onChange={setOutrasDeducoes}
                hint="Despesas de cobrança, seguro do imóvel pago pelo locador"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <CurrencyInput
              id="outrasRendas"
              label="Outras rendas tributáveis no mês"
              value={outrasRendas}
              onChange={setOutrasRendas}
              hint="Salário, pró-labore, outras fontes — para calcular a alíquota marginal corretamente"
            />
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl p-6 text-white">
            <p className="text-amber-100 text-sm mb-1">IR mensal (carnê-leão)</p>
            <p className="text-4xl font-bold mb-1">{formatCurrency(resultado.irMensal)}</p>
            <p className="text-amber-200 text-sm">
              Alíquota marginal: {resultado.faixaTabela} · Efetiva sobre o bruto: {formatPercent(resultado.aliquotaEfetiva, 1)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">Base de cálculo</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(resultado.baseCalculo)}</p>
              <p className="text-xs text-slate-400 mt-1">Após deduções de {formatCurrency(resultado.totalDeducoes)}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">IR anual estimado</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(resultado.irAnual)}</p>
              <p className="text-xs text-slate-400 mt-1">DARF mensal até dia 31</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 col-span-2">
              <p className="text-xs text-emerald-600 mb-1">Rendimento líquido mensal</p>
              <p className="text-2xl font-bold text-emerald-700">{formatCurrency(resultado.rendimentoLiquidoMensal)}</p>
              <p className="text-xs text-emerald-600 mt-1">
                Aluguel bruto − IR = {formatCurrency(aluguelMensal)} − {formatCurrency(resultado.irMensal)}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Detalhamento por faixa — tabela progressiva</h3>
            <div className="space-y-2">
              {resultado.detalheFaixas.map((f) => (
                <div key={f.faixa} className="flex justify-between text-sm">
                  <span className={`${f.imposto < 0 ? "text-emerald-600 font-medium" : "text-slate-600"}`}>
                    {f.faixa}{f.aliquota > 0 ? ` · ${f.aliquota.toFixed(1)}%` : ""}
                  </span>
                  <span className={`font-medium ${f.imposto < 0 ? "text-emerald-600" : f.imposto === 0 ? "text-slate-400" : "text-slate-800"}`}>
                    {f.imposto < 0 ? `−${formatCurrency(Math.abs(f.imposto))}` : formatCurrency(f.imposto)}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">Tabela IRPF 2026 — valores mensais para carnê-leão</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Obrigações do locador pessoa física</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li>O carnê-leão deve ser pago via DARF até o último dia útil do mês seguinte ao recebimento.</li>
              <li>Rendimentos de aluguel não sofrem retenção na fonte — o locador é responsável pelo recolhimento.</li>
              <li>Na declaração anual, informe os rendimentos de aluguel na ficha "Rendimentos Tributáveis Recebidos de PF".</li>
              <li>Deduções permitidas: IPTU, condomínio, seguro contra incêndio — somente quando pagos pelo locador.</li>
              <li>Despesas de reforma e manutenção <strong>não são dedutíveis</strong> do carnê-leão (apenas do ganho de capital na venda).</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          Cálculo baseado na tabela progressiva do IRPF 2024 para carnê-leão (Instrução Normativa RFB). Confirme sempre os valores vigentes no site da Receita Federal antes de emitir o DARF.
        </p>
      </div>

      <FaqSection path="/tributacao-aluguel" />
      <RelatedCalculators path="/tributacao-aluguel" />
    </div>
  );
}
