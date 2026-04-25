"use client";

import { useState, useMemo } from "react";
import { calcularFundoReserva } from "@/lib/calculators";
import { formatCurrency } from "@/lib/format";
import { Info, Vault, AlertTriangle, CheckCircle } from "lucide-react";
import CurrencyInput from "@/components/CurrencyInput";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import RelatedGuides from "@/components/RelatedGuides";

export default function FundoReservaPage() {
  const [despesaMensal,    setDespesaMensal]    = useState(45_000);
  const [percentualFundo,  setPercentualFundo]  = useState(5);
  const [saldoAtual,       setSaldoAtual]       = useState(30_000);
  const [rendimentoAnual,  setRendimentoAnual]  = useState(6.5);
  const [valorObra,        setValorObra]        = useState(120_000);
  const [prazoObra,        setPrazoObra]        = useState(24);

  const resultado = useMemo(
    () => calcularFundoReserva({ despesaMensal, percentualFundo, saldoAtual, rendimentoAnual, valorObra, prazoObra }),
    [despesaMensal, percentualFundo, saldoAtual, rendimentoAnual, valorObra, prazoObra]
  );

  const maxSaldo = Math.max(...resultado.saldoProjetado.map(p => p.saldo), valorObra);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Custos</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Fundo de Reserva do Condomínio</h1>
        <p className="text-slate-500">
          Planeje o fundo de reserva para obras futuras. Veja em quantos meses o saldo atingirá a meta e se o percentual atual é suficiente.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput id="despesa" label="Despesa mensal do condomínio" value={despesaMensal} onChange={setDespesaMensal} />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">% destinado ao fundo de reserva: {percentualFundo}%</label>
            <input type="range" min={1} max={20} step={0.5} value={percentualFundo}
              onChange={e => setPercentualFundo(Number(e.target.value))}
              className="w-full accent-green-600" />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1%</span><span className="text-slate-500">Mínimo usual: 5%</span><span>20%</span>
            </div>
          </div>

          <CurrencyInput id="saldo" label="Saldo atual do fundo" value={saldoAtual} onChange={setSaldoAtual} />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Rendimento anual do fundo: {rendimentoAnual.toFixed(1)}%</label>
            <input type="range" min={0} max={15} step={0.5} value={rendimentoAnual}
              onChange={e => setRendimentoAnual(Number(e.target.value))}
              className="w-full accent-green-600" />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0%</span><span className="text-slate-500">Poupança ~6%</span><span>15%</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-4">
            <p className="text-sm font-semibold text-slate-700">Obra planejada</p>
            <CurrencyInput id="obra" label="Valor estimado da obra" value={valorObra} onChange={setValorObra} />
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Prazo desejado: {prazoObra} meses</label>
              <input type="range" min={6} max={120} step={6} value={prazoObra}
                onChange={e => setPrazoObra(Number(e.target.value))}
                className="w-full accent-green-600" />
              <div className="flex justify-between text-xs text-slate-400 mt-1"><span>6 meses</span><span>10 anos</span></div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          <div className={`rounded-2xl p-6 text-white ${resultado.atingeNoPrazo ? "bg-gradient-to-br from-green-600 to-emerald-700" : "bg-gradient-to-br from-amber-600 to-orange-700"}`}>
            <div className="flex items-center gap-2 mb-3">
              <Vault className="w-5 h-5 opacity-80" />
              <p className="opacity-80 text-sm">Aporte mensal atual</p>
            </div>
            <p className="text-4xl font-bold mb-1">{formatCurrency(resultado.aporteMensal)}</p>
            <p className="opacity-80 text-sm">{percentualFundo}% de {formatCurrency(despesaMensal)}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-2xl border p-4 ${resultado.atingeNoPrazo ? "bg-green-50 border-green-100" : "bg-amber-50 border-amber-100"}`}>
              <div className="flex items-center gap-1.5 mb-1">
                {resultado.atingeNoPrazo
                  ? <CheckCircle className="w-4 h-4 text-green-600" />
                  : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                <p className={`text-xs font-medium ${resultado.atingeNoPrazo ? "text-green-600" : "text-amber-600"}`}>
                  {resultado.atingeNoPrazo ? "Meta atingida no prazo" : "Fundo insuficiente"}
                </p>
              </div>
              <p className={`text-xl font-bold ${resultado.atingeNoPrazo ? "text-green-700" : "text-amber-700"}`}>
                {resultado.mesesParaAtingir > 360 ? "360+ meses" : `${resultado.mesesParaAtingir} meses`}
              </p>
              <p className={`text-xs mt-1 ${resultado.atingeNoPrazo ? "text-green-600" : "text-amber-600"}`}>para atingir {formatCurrency(valorObra)}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">% necessário para o prazo</p>
              <p className="text-xl font-bold text-slate-900">{resultado.percentualNecessario.toFixed(1)}%</p>
              <p className="text-xs text-slate-400 mt-1">
                {resultado.atingeNoPrazo ? "Percentual atual é suficiente" : `Aumentar para cobrir em ${prazoObra} meses`}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">Saldo mínimo recomendado</p>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(resultado.saldoMinRecomendado)}</p>
              <p className="text-xs text-slate-400 mt-1">2 meses de despesas</p>
            </div>

            <div className={`rounded-2xl border p-4 ${saldoAtual >= resultado.saldoMinRecomendado ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}>
              <p className={`text-xs mb-1 font-medium ${saldoAtual >= resultado.saldoMinRecomendado ? "text-green-600" : "text-red-600"}`}>Saldo atual</p>
              <p className={`text-xl font-bold ${saldoAtual >= resultado.saldoMinRecomendado ? "text-green-700" : "text-red-700"}`}>{formatCurrency(saldoAtual)}</p>
              <p className={`text-xs mt-1 ${saldoAtual >= resultado.saldoMinRecomendado ? "text-green-600" : "text-red-600"}`}>
                {saldoAtual >= resultado.saldoMinRecomendado ? "Acima do mínimo" : "Abaixo do mínimo"}
              </p>
            </div>
          </div>

          {/* Projeção simplificada */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Projeção do saldo</h3>
            <div className="space-y-2">
              {resultado.saldoProjetado.slice(0, 8).map(p => (
                <div key={p.mes} className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-16 shrink-0">{p.mes === 0 ? "Hoje" : `${p.mes}m`}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${p.saldo >= valorObra ? "bg-green-500" : "bg-green-300"}`}
                      style={{ width: `${maxSaldo > 0 ? Math.min((p.saldo / maxSaldo) * 100, 100) : 0}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-700 w-24 text-right shrink-0">{formatCurrency(p.saldo)}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 pt-1 border-t border-slate-100">
                <span className="text-xs text-green-600 w-16 shrink-0 font-medium">Meta</span>
                <div className="flex-1 h-2 bg-green-100 rounded-full">
                  <div className="h-full w-full bg-green-400 rounded-full" />
                </div>
                <span className="text-xs font-bold text-green-700 w-24 text-right shrink-0">{formatCurrency(valorObra)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-green-50 border border-green-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900 mb-2">Boas práticas para o fundo de reserva</h3>
            <ul className="text-sm text-green-800 space-y-1.5 list-disc list-inside">
              <li>O mínimo legal é definido pela convenção — na prática, recomenda-se entre 5% e 10% das despesas mensais.</li>
              <li>Invista o fundo em CDB, Tesouro Direto ou poupança — nunca em conta corrente sem rendimento.</li>
              <li>Prédios com mais de 10 anos devem aportar mais: a necessidade de manutenção estrutural aumenta com a idade.</li>
              <li>Toda movimentação do fundo deve ser aprovada em assembleia e prestada em contas anualmente.</li>
            </ul>
          </div>
        </div>
      </div>

      <FaqSection path="/fundo-reserva-condominio" />
      <RelatedCalculators path="/fundo-reserva-condominio" />
      <RelatedGuides path="/fundo-reserva-condominio" />
    </div>
  );
}
