"use client";

import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { calcularAmortizacaoExtra } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, Zap } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


export default function AmortizacaoExtraPage() {
  const [saldoDevedor, setSaldoDevedor] = useState(400_000);
  const [taxaAnual, setTaxaAnual] = useState(10.5);
  const [prazoRestante, setPrazoRestante] = useState(300); // meses
  const [sistema, setSistema] = useState<"SAC" | "PRICE">("SAC");
  const [tipoExtra, setTipoExtra] = useState<"mensal" | "unico">("mensal");
  const [valorExtra, setValorExtra] = useState(500);
  const [modalidadeUnico, setModalidadeUnico] = useState<"reduzir_prazo" | "reduzir_parcela">("reduzir_prazo");

  const resultado = useMemo(
    () => calcularAmortizacaoExtra({ saldoDevedor, taxaAnual, prazoRestanteMeses: prazoRestante, sistema, tipoExtra, valorExtra, modalidadeUnico }),
    [saldoDevedor, taxaAnual, prazoRestante, sistema, tipoExtra, valorExtra, modalidadeUnico]
  );

  const prazoOriginalAnos = (prazoRestante / 12).toFixed(1);
  const prazoNovoAnos = (resultado.prazoNovo / 12).toFixed(1);

  // Gráfico: saldo devedor ao longo do tempo (sample a cada 12 meses)
  const dadosGrafico = useMemo(() => {
    const taxa = taxaAnual / 100 / 12;
    const pontos: { ano: number; Original: number; "Com extra": number }[] = [];
    let sOrig = saldoDevedor;
    let sExtra = saldoDevedor;
    const parcelaOrig = sistema === "PRICE"
      ? saldoDevedor * (taxa * Math.pow(1 + taxa, prazoRestante)) / (Math.pow(1 + taxa, prazoRestante) - 1)
      : saldoDevedor / prazoRestante;

    for (let ano = 0; ano <= Math.ceil(prazoRestante / 12); ano++) {
      pontos.push({ ano, Original: Math.max(0, Math.round(sOrig)), "Com extra": Math.max(0, Math.round(sExtra)) });
      for (let m = 0; m < 12; m++) {
        if (sOrig > 0) {
          const j = sOrig * taxa;
          sOrig -= sistema === "PRICE" ? parcelaOrig - j : parcelaOrig;
          sOrig = Math.max(0, sOrig);
        }
        if (sExtra > 0 && tipoExtra === "mensal") {
          const j = sExtra * taxa;
          const amort = sistema === "PRICE" ? parcelaOrig - j + valorExtra : parcelaOrig + valorExtra;
          sExtra -= amort;
          sExtra = Math.max(0, sExtra);
        } else if (sExtra > 0 && tipoExtra === "unico") {
          if (ano === 0 && m === 0) sExtra = Math.max(0, sExtra - valorExtra);
          const j = sExtra * taxa;
          sExtra -= sistema === "PRICE" ? parcelaOrig - j : parcelaOrig;
          sExtra = Math.max(0, sExtra);
        }
      }
    }
    return pontos.filter((p) => p.Original > 0 || p["Com extra"] > 0 || p.ano === 0);
  }, [saldoDevedor, taxaAnual, prazoRestante, sistema, tipoExtra, valorExtra]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Amortização Extraordinária</h1>
        <p className="text-slate-500">
          Descubra quanto você economiza de juros e quantos meses antecipa o fim do financiamento pagando um valor a mais.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput id="saldo" label="Saldo devedor atual" value={saldoDevedor} onChange={setSaldoDevedor} />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Taxa de juros: {formatPercent(taxaAnual)} a.a.
            </label>
            <input type="range" min={4} max={18} step={0.25} value={taxaAnual}
              onChange={(e) => setTaxaAnual(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Prazo restante: {prazoRestante} meses ({prazoOriginalAnos} anos)
            </label>
            <input type="range" min={12} max={420} step={12} value={prazoRestante}
              onChange={(e) => setPrazoRestante(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Sistema de amortização</label>
            <div className="grid grid-cols-2 gap-2">
              {(["SAC", "PRICE"] as const).map((s) => (
                <button key={s} onClick={() => setSistema(s)}
                  className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${sistema === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <label className="block text-sm font-medium text-slate-600 mb-2">Tipo de amortização extra</label>
            <div className="grid grid-cols-2 gap-2">
              {([["mensal", "Extra mensal"], ["unico", "Valor único"]] as const).map(([v, l]) => (
                <button key={v} onClick={() => setTipoExtra(v)}
                  className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${tipoExtra === v ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <CurrencyInput
            id="extra"
            label={tipoExtra === "mensal" ? "Valor extra por mês" : "Valor da amortização única"}
            value={valorExtra}
            onChange={setValorExtra}
            hint={tipoExtra === "mensal" ? "Será aplicado todo mês além da parcela normal" : "Aplicado imediatamente ao saldo devedor"}
          />

          {tipoExtra === "unico" && (
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Com o valor, prefiro</label>
              <div className="grid grid-cols-2 gap-2">
                {([["reduzir_prazo", "Terminar antes"], ["reduzir_parcela", "Pagar menos"]] as const).map(([v, l]) => (
                  <button key={v} onClick={() => setModalidadeUnico(v)}
                    className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${modalidadeUnico === v ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-300" />
              <p className="text-blue-200 text-sm">Economia total</p>
            </div>
            <p className="text-4xl font-bold mb-1">{formatCurrency(resultado.totalEconomizado)}</p>
            <p className="text-blue-200 text-sm">
              {formatCurrency(resultado.jurosEconomizados)} em juros
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-500 mb-1">Prazo original</p>
              <p className="text-xl font-bold text-slate-700">{prazoRestante} meses</p>
              <p className="text-xs text-slate-400">{prazoOriginalAnos} anos</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
              <p className="text-xs text-emerald-600 mb-1 font-semibold">Novo prazo</p>
              <p className="text-xl font-bold text-emerald-700">{resultado.prazoNovo} meses</p>
              <p className="text-xs text-emerald-600">{prazoNovoAnos} anos · {resultado.mesesEconomizados}m a menos</p>
            </div>
          </div>

          {resultado.parcelaNova !== null && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl border border-slate-100 p-4">
                <p className="text-xs text-slate-500 mb-1">Parcela atual</p>
                <p className="text-xl font-bold text-slate-700">{formatCurrency(resultado.parcelaAtual)}</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <p className="text-xs text-emerald-600 mb-1 font-semibold">Nova parcela</p>
                <p className="text-xl font-bold text-emerald-700">{formatCurrency(resultado.parcelaNova)}</p>
                <p className="text-xs text-emerald-600">−{formatCurrency(resultado.parcelaAtual - resultado.parcelaNova)}/mês</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Total pago sem extra</span>
              <span className="font-semibold">{formatCurrency(resultado.totalPagoOriginal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Total pago com extra</span>
              <span className="font-semibold">{formatCurrency(resultado.totalPagoNovo)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2 text-emerald-700 font-bold">
              <span>Economia total</span>
              <span>{formatCurrency(resultado.totalEconomizado)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-800 mb-1">Evolução do saldo devedor</h3>
        <p className="text-sm text-slate-400 mb-5">Comparação entre pagar normalmente e com amortização extra</p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={dadosGrafico}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="ano" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => `${v}a`} />
            <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip formatter={(v) => formatCurrency(Number(v))} labelFormatter={(l) => `Ano ${l}`} />
            <Legend />
            <Area type="monotone" dataKey="Original" stroke="#94a3b8" fill="#f1f5f9" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="Com extra" stroke="#3b82f6" fill="#dbeafe" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">O que isso significa?</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li>Amortizações extras reduzem o saldo devedor, sobre o qual incidem os juros — o efeito é exponencial quanto mais cedo ocorre.</li>
              <li><strong>Reduzir prazo</strong> economiza mais juros. <strong>Reduzir parcela</strong> melhora o fluxo de caixa mensal.</li>
              <li>No SAC, a amortização extra é aplicada diretamente ao principal, reduzindo todas as parcelas seguintes.</li>
              <li>No PRICE, a amortização extra reduz o saldo e encurta o prazo (mesma parcela, menos meses).</li>
              <li>Verifique no contrato se há incidência de IOF sobre amortizações extraordinárias — alguns contratos antigos têm essa cláusula.</li>
            </ul>
          </div>
        </div>
      </div>

      <FaqSection path="/amortizacao-extra" />
      <RelatedCalculators path="/amortizacao-extra" />
    </div>
  );
}
