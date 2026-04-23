"use client";

import { useState, useMemo } from "react";
import { calcularDistrato } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, AlertTriangle, Scale } from "lucide-react";

export default function DistratoPage() {
  const [totalPago, setTotalPago] = useState(120_000);
  const [corretagem, setCorretagem] = useState(18_000);
  const [sati, setSati] = useState(3_000);
  const [patrimonioAfetacao, setPatrimonioAfetacao] = useState(false);
  const [correcaoINPC, setCorrecaoINPC] = useState(15);

  const resultado = useMemo(
    () => calcularDistrato({ totalPago, corretagem, sati, patrimonioAfetacao, correcaoINPC }),
    [totalPago, corretagem, sati, patrimonioAfetacao, correcaoINPC]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Distrato de Imóvel na Planta</h1>
        <p className="text-slate-500">
          Calcule quanto você vai receber de volta ao desfazer a compra de um imóvel na planta, com base na Lei 13.786/2018.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput
            id="totalPago"
            label="Total já pago (sinal + parcelas da obra)"
            value={totalPago}
            onChange={setTotalPago}
            hint="Soma de todos os valores pagos até hoje ao incorporador"
          />
          <CurrencyInput
            id="corretagem"
            label="Corretagem paga na compra"
            value={corretagem}
            onChange={setCorretagem}
            hint="Pode ser retida pela incorporadora conforme o contrato"
          />
          <CurrencyInput
            id="sati"
            label="SATI — Assessoria Técnico-Imobiliária"
            value={sati}
            onChange={setSati}
            hint="Se houver, pode ser retido. Verifique no contrato."
          />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Correção pelo INPC acumulada: {formatPercent(correcaoINPC)}
            </label>
            <input type="range" min={0} max={50} step={1} value={correcaoINPC}
              onChange={(e) => setCorrecaoINPC(Number(e.target.value))}
              className="w-full accent-blue-600" />
            <p className="text-xs text-slate-400 mt-1">Aplica sobre o valor a receber — conforme previsto em contrato</p>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={patrimonioAfetacao}
                onChange={(e) => setPatrimonioAfetacao(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-blue-600"
              />
              <div>
                <p className="text-sm font-medium text-slate-700">Empreendimento com Patrimônio de Afetação (RET)</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Aumenta a multa de 25% para 50%. Consulte o contrato ou o cartório de imóveis.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-5 h-5 text-white/70" />
              <p className="text-white/70 text-sm">Valor a receber (sem correção)</p>
            </div>
            <p className="text-4xl font-bold mb-1">{formatCurrency(resultado.valorAReceber)}</p>
            <p className="text-white/80 text-sm">
              Com INPC de {formatPercent(correcaoINPC)}: {formatCurrency(resultado.valorCorrigido)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">Total pago</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(totalPago)}</p>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
              <p className="text-xs text-rose-600 mb-1">Total retido</p>
              <p className="text-lg font-bold text-rose-700">{formatCurrency(resultado.totalRetido)}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Detalhamento do que é retido</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">
                  Multa legal ({resultado.percentualMulta}% do total pago)
                </span>
                <span className="font-bold text-rose-600">{formatCurrency(resultado.valorMulta)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Corretagem retida</span>
                <span className="font-bold text-rose-600">{formatCurrency(resultado.corretagemRetida)}</span>
              </div>
              {resultado.satiRetido > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">SATI retido</span>
                  <span className="font-bold text-rose-600">{formatCurrency(resultado.satiRetido)}</span>
                </div>
              )}
              <div className="border-t border-slate-100 pt-3 flex justify-between text-sm font-semibold">
                <span className="text-slate-700">Prazo de recebimento</span>
                <span className="text-slate-900">{resultado.prazoRecebimento} dias</span>
              </div>
              <p className="text-xs text-slate-400">
                {patrimonioAfetacao
                  ? "Após assinatura do distrato (imóvel com patrimônio de afetação)"
                  : "Após a revenda da unidade pela incorporadora"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-5">
        <h3 className="font-semibold text-slate-800 mb-3">O que diz a Lei 13.786/2018</h3>
        <ul className="space-y-2">
          {resultado.observacoes.map((obs) => (
            <li key={obs} className="flex gap-2 text-sm text-slate-600">
              <span className="text-slate-400 shrink-0 mt-0.5">→</span>
              {obs}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Antes de assinar o distrato</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li>Verifique se a incorporadora cumpriu os prazos — em caso de atraso, você pode ter direito à rescisão <strong>sem multa</strong>.</li>
              <li>Consulte um advogado especializado antes de assinar qualquer documento de distrato. Assinar sem negociar pode reduzir o valor a receber.</li>
              <li>A Resolução BACEN e o STJ têm limitado cobranças abusivas — multas superiores a 25% em casos sem PA têm sido contestadas com sucesso.</li>
              <li>Guarde todos os comprovantes de pagamento — eles são a base para calcular o valor a ser devolvido.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          Cálculo baseado na Lei 13.786/2018 (Lei do Distrato). Os valores são estimativas — o contrato de compra e venda e o regulamento específico da incorporadora prevalecem. Consulte um advogado especializado em direito imobiliário.
        </p>
      </div>
    </div>
  );
}
