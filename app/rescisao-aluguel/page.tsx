"use client";

import { useState, useMemo } from "react";
import { calcularRescisao } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, CheckCircle, Scale } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


export default function RescisaoPage() {
  const [aluguelMensal, setAluguelMensal] = useState(2_500);
  const [prazoTotal, setPrazoTotal] = useState(30);
  const [mesesCumpridos, setMesesCumpridos] = useState(8);
  const [mesesMulta, setMesesMulta] = useState(3);
  const [transferencia, setTransferencia] = useState(false);

  const prazoTotalMeses = prazoTotal;
  const mesesCumpridosAdj = Math.min(mesesCumpridos, prazoTotalMeses);

  const resultado = useMemo(
    () => calcularRescisao({ aluguelMensal, mesesMultaContratual: mesesMulta, prazoTotalMeses, mesesCumpridos: mesesCumpridosAdj, motivoTransferencia: transferencia }),
    [aluguelMensal, mesesMulta, prazoTotalMeses, mesesCumpridosAdj, transferencia]
  );

  const progressoContrato = Math.min(100, resultado.percentualCumprido);
  const mesesRestantes = resultado.mesesRestantes;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Aluguel</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Multa por Rescisão Antecipada</h1>
        <p className="text-slate-500">
          Calcule a multa proporcional de acordo com a Lei do Inquilinato (Lei 8.245/91). Saiba exatamente o que você deve pagar para sair do contrato.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput id="aluguel" label="Valor do aluguel mensal" value={aluguelMensal} onChange={setAluguelMensal} />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Prazo total do contrato: {prazoTotal} meses ({(prazoTotal / 12).toFixed(1)} ano{prazoTotal !== 12 ? "s" : ""})
            </label>
            <input type="range" min={12} max={60} step={6} value={prazoTotal}
              onChange={(e) => { setPrazoTotal(Number(e.target.value)); if (mesesCumpridos > Number(e.target.value)) setMesesCumpridos(Number(e.target.value)); }}
              className="w-full accent-amber-500" />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>12 meses</span>
              <span>60 meses (5 anos)</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Meses já cumpridos: {mesesCumpridosAdj} meses
            </label>
            <input type="range" min={0} max={prazoTotalMeses} step={1} value={mesesCumpridosAdj}
              onChange={(e) => setMesesCumpridos(Number(e.target.value))}
              className="w-full accent-amber-500" />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0 meses</span>
              <span>{prazoTotalMeses} meses</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Multa contratual: {mesesMulta} {mesesMulta === 1 ? "mês" : "meses"} de aluguel
            </label>
            <input type="range" min={1} max={6} step={1} value={mesesMulta}
              onChange={(e) => setMesesMulta(Number(e.target.value))}
              className="w-full accent-amber-500" />
            <p className="text-xs text-slate-400 mt-1">
              O padrão da Lei do Inquilinato é 3 meses. Verifique o que está no seu contrato.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-start gap-3">
              <input type="checkbox" id="transferencia" checked={transferencia}
                onChange={(e) => setTransferencia(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded accent-amber-500 shrink-0" />
              <label htmlFor="transferencia" className="text-sm text-slate-700 cursor-pointer">
                Estou sendo transferido pelo meu empregador para outra cidade
                <span className="block text-xs text-slate-400 mt-0.5">
                  Art. 4º, §único da Lei 8.245/91 — isento de multa com 30 dias de aviso prévio escrito
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          {resultado.isento ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-800 text-lg">
                    {mesesRestantes === 0 ? "Contrato encerrado — sem multa" : "Isento de multa"}
                  </p>
                  <p className="text-sm text-emerald-700 mt-1">
                    {transferencia
                      ? "Transferência pelo empregador isenta a multa (Art. 4º, §único). Notifique o proprietário por escrito com ao menos 30 dias de antecedência."
                      : "O contrato já foi cumprido integralmente. Não há multa por rescisão."}
                  </p>
                  <p className="text-3xl font-bold text-emerald-700 mt-4">{formatCurrency(0)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
              <p className="text-amber-100 text-sm mb-1">Multa proporcional a pagar</p>
              <p className="text-4xl font-bold mb-2">{formatCurrency(resultado.multaProporcional)}</p>
              <p className="text-amber-200 text-sm">
                Calculada sobre {mesesRestantes} {mesesRestantes === 1 ? "mês restante" : "meses restantes"} de contrato
              </p>
            </div>
          )}

          {/* Progresso do contrato */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Progresso do contrato</h3>
            <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full transition-all"
                style={{ width: `${progressoContrato}%` }} />
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span className="text-amber-600 font-semibold">{mesesCumpridosAdj} meses cumpridos ({formatPercent(progressoContrato, 0)})</span>
              <span className="text-slate-400">{mesesRestantes} meses restantes</span>
            </div>
          </div>

          {/* Detalhamento da multa */}
          {!resultado.isento && (
            <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 text-sm">
              <h3 className="font-semibold text-slate-800">Como a multa é calculada</h3>
              <div className="flex justify-between">
                <span className="text-slate-600">Multa contratual cheia ({mesesMulta}× aluguel)</span>
                <span className="font-semibold">{formatCurrency(resultado.multaCheia)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">× Proporção restante ({mesesRestantes}/{prazoTotalMeses})</span>
                <span className="font-semibold">{formatPercent((mesesRestantes / prazoTotalMeses) * 100, 1)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2 font-bold text-amber-700">
                <span>= Multa proporcional</span>
                <span>{formatCurrency(resultado.multaProporcional)}</span>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500 mt-1">
                Fórmula (Art. 4º Lei 8.245/91):<br />
                <span className="font-mono text-slate-700">
                  Multa = {mesesMulta} × {formatCurrency(aluguelMensal)} × ({mesesRestantes} / {prazoTotalMeses}) = {formatCurrency(resultado.multaProporcional)}
                </span>
              </div>
            </div>
          )}

          {/* Dica: cenários */}
          {!resultado.isento && (
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-800 mb-3">Se você esperar mais…</h3>
              <div className="space-y-2">
                {[3, 6, 12].filter((m) => mesesCumpridosAdj + m <= prazoTotalMeses).map((m) => {
                  const r = calcularRescisao({ aluguelMensal, mesesMultaContratual: mesesMulta, prazoTotalMeses, mesesCumpridos: mesesCumpridosAdj + m, motivoTransferencia: false });
                  return (
                    <div key={m} className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">+ {m} {m === 1 ? "mês" : "meses"} ({mesesCumpridosAdj + m}m cumpridos)</span>
                      <span className="font-semibold text-slate-900">{formatCurrency(r.multaProporcional)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Scale className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Entendendo a Lei do Inquilinato (Art. 4º)</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li>Durante o prazo contratual, o locatário pode devolver o imóvel pagando a <strong>multa proporcional ao tempo restante</strong>.</li>
              <li>A multa máxima é estabelecida em contrato — o padrão mais comum é 3 meses de aluguel.</li>
              <li><strong>Isenção por transferência de trabalho</strong>: se o empregador transferir o funcionário para outra cidade, a multa é dispensada com 30 dias de aviso escrito.</li>
              <li>Após o <strong>término do prazo</strong>, o contrato passa a ser por tempo indeterminado e o locatário pode sair com 30 dias de aviso — sem multa.</li>
              <li>Se o <strong>proprietário</strong> rescindir sem motivo legal durante o prazo fixo, ele deve indenizar o locatário.</li>
              <li>Reformas estruturais urgentes ou uso próprio do imóvel são motivos legais para o proprietário pedir o imóvel — mas o locatário tem prazo para desocupar.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          <strong>Importante:</strong> este cálculo é educacional. Situações específicas (contratos atípicos, cláusulas especiais, imóveis comerciais) podem ter regras diferentes. Consulte um advogado em caso de disputa.
        </p>
      </div>

      <FaqSection path="/rescisao-aluguel" />
      <RelatedCalculators path="/rescisao-aluguel" />
    </div>
  );
}
