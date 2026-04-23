"use client";

import { useState, useMemo } from "react";
import { calcularLeilaoImovel } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, AlertTriangle, Gavel } from "lucide-react";

const ITBI_OPCOES = [1.5, 2.0, 2.5, 3.0, 3.5, 4.0];

export default function LeilaoImovelPage() {
  const [valorArremate, setValorArremate] = useState(280_000);
  const [valorAvaliacaoImovel, setValorAvaliacaoImovel] = useState(500_000);
  const [aliquotaITBI, setAliquotaITBI] = useState(2.0);
  const [percentualComissaoLeiloeiro, setPercentualComissaoLeiloeiro] = useState(5);
  const [dividasCondominioIptu, setDividasCondominioIptu] = useState(8_000);
  const [custoEstimadoReforma, setCustoEstimadoReforma] = useState(40_000);
  const [custosCartorio, setCustosCartorio] = useState(5_000);

  const resultado = useMemo(
    () => calcularLeilaoImovel({ valorArremate, valorAvaliacaoImovel, aliquotaITBI, percentualComissaoLeiloeiro, dividasCondominioIptu, custoEstimadoReforma, custosCartorio }),
    [valorArremate, valorAvaliacaoImovel, aliquotaITBI, percentualComissaoLeiloeiro, dividasCondominioIptu, custoEstimadoReforma, custosCartorio]
  );

  const desconto = valorAvaliacaoImovel > 0
    ? ((valorAvaliacaoImovel - valorArremate) / valorAvaliacaoImovel) * 100 : 0;

  const lucrativo = resultado.lucroEstimado > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Custo Real de Leilão de Imóvel</h1>
        <p className="text-slate-500">
          Calcule o custo total do arremate incluindo ITBI, comissão do leiloeiro, dívidas assumidas, reforma e cartório.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput id="arremate" label="Valor do arremate (lance vencedor)"
            value={valorArremate} onChange={setValorArremate} />
          <CurrencyInput id="avaliacao" label="Valor de avaliação / mercado"
            value={valorAvaliacaoImovel} onChange={setValorAvaliacaoImovel}
            hint="Valor pelo qual o imóvel foi avaliado pelo leilão — base para estimar o ganho" />

          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs text-slate-500 mb-1">Desconto nominal sobre avaliação</p>
            <p className={`text-2xl font-bold ${desconto >= 20 ? "text-emerald-700" : desconto >= 10 ? "text-amber-600" : "text-rose-600"}`}>
              {formatPercent(desconto, 1)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              ITBI: {aliquotaITBI}%
            </label>
            <div className="flex gap-2 flex-wrap">
              {ITBI_OPCOES.map((v) => (
                <button key={v} onClick={() => setAliquotaITBI(v)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                    aliquotaITBI === v ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}>
                  {v}%
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-1">Varia por município — verifique na prefeitura local.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Comissão do leiloeiro: {percentualComissaoLeiloeiro}%
            </label>
            <input type="range" min={0} max={10} step={0.5} value={percentualComissaoLeiloeiro}
              onChange={(e) => setPercentualComissaoLeiloeiro(Number(e.target.value))}
              className="w-full accent-blue-600" />
            <p className="text-xs text-slate-400 mt-1">Padrão: 5% sobre o arremate. Varia por leiloeiro e edital.</p>
          </div>

          <CurrencyInput id="dividas" label="Dívidas de condomínio + IPTU assumidas"
            value={dividasCondominioIptu} onChange={setDividasCondominioIptu}
            hint="Pesquise na certidão do cartório e na administradora do condomínio" />
          <CurrencyInput id="reforma" label="Custo estimado de reforma"
            value={custoEstimadoReforma} onChange={setCustoEstimadoReforma}
            hint="Imóveis de leilão frequentemente precisam de obras" />
          <CurrencyInput id="cartorio" label="Custos de cartório e transferência"
            value={custosCartorio} onChange={setCustosCartorio} />
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className={`rounded-2xl p-6 text-white ${lucrativo ? "bg-gradient-to-br from-emerald-600 to-teal-700" : "bg-gradient-to-br from-rose-500 to-red-600"}`}>
            <div className="flex items-center gap-2 mb-2">
              <Gavel className="w-5 h-5 text-white/70" />
              <p className="text-white/70 text-sm">
                {lucrativo ? "Potencial de lucro" : "Prejuízo estimado"}
              </p>
            </div>
            <p className="text-4xl font-bold mb-1">{formatCurrency(Math.abs(resultado.lucroEstimado))}</p>
            <p className="text-white/80 text-sm">
              Desconto real: {formatPercent(resultado.descontoRealPercent, 1)} · ROI: {formatPercent(resultado.roi, 1)}
            </p>
          </div>

          {/* Composição do custo */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-2.5">
            <h3 className="font-semibold text-slate-800 mb-1">Composição do custo total</h3>
            {resultado.detalhamento.map((item) => (
              <div key={item.item} className="flex justify-between text-sm">
                <span className="text-slate-600">{item.item}</span>
                <span className="font-semibold text-slate-900">{formatCurrency(item.valor)}</span>
              </div>
            ))}
            <div className="border-t border-slate-100 pt-2 flex justify-between font-bold">
              <span className="text-slate-800">Custo total real</span>
              <span className="text-slate-900">{formatCurrency(resultado.custoTotal)}</span>
            </div>
            <div className="flex justify-between font-bold text-base">
              <span className={lucrativo ? "text-emerald-700" : "text-rose-600"}>
                {lucrativo ? "Potencial de lucro" : "Prejuízo"}
              </span>
              <span className={lucrativo ? "text-emerald-700" : "text-rose-600"}>
                {formatCurrency(resultado.lucroEstimado)}
              </span>
            </div>
          </div>

          {/* Alertas */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Alertas
            </p>
            <ul className="space-y-1.5">
              {resultado.alertas.map((a) => (
                <li key={a} className="text-xs text-amber-800 flex gap-1.5">
                  <span className="shrink-0">⚠</span> {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Gavel className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Checklist antes de arrematar</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li><strong>Matrícula no cartório:</strong> verifique ônus, penhoras e restrições judiciais.</li>
              <li><strong>Certidão negativa de débitos</strong> de IPTU e condomínio — ou confirme quem assume as dívidas.</li>
              <li><strong>Situação do ocupante:</strong> o imóvel está vago, locado ou ocupado pelo ex-proprietário?</li>
              <li><strong>Vistoria:</strong> tente visitar o imóvel antes — muitos leilões permitem visita agendada.</li>
              <li><strong>Ação de imissão na posse:</strong> se houver ocupantes, o processo judicial pode levar meses.</li>
              <li><strong>Leia o edital completo</strong> — condições de pagamento, prazo e responsabilidade por dívidas ficam ali.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          <strong>Cálculo educacional.</strong> O lucro estimado assume que o imóvel será vendido pelo valor de avaliação, sem desconto. Consulte um advogado especializado em direito imobiliário antes de arrematar.
        </p>
      </div>
    </div>
  );
}
