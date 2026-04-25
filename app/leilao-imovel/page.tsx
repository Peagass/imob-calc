"use client";

import { useState, useMemo } from "react";
import { calcularLeilaoImovel } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, AlertTriangle, Gavel, Scale, Clock } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


const ITBI_OPCOES = [1.5, 2.0, 2.5, 3.0, 3.5, 4.0];

const SITUACOES_OCUPACAO = [
  { label: "Acordada", meses: 3, desc: "Ocupante coopera — 1 a 6 meses" },
  { label: "Judicial simples", meses: 12, desc: "Imissão na posse — 6 a 18 meses" },
  { label: "Judicial complexa", meses: 20, desc: "Resistência / recursos — 18 a 36 meses" },
] as const;

export default function LeilaoImovelPage() {
  const [valorArremate, setValorArremate] = useState(280_000);
  const [valorAvaliacaoImovel, setValorAvaliacaoImovel] = useState(500_000);
  const [aliquotaITBI, setAliquotaITBI] = useState(2.0);
  const [percentualComissaoLeiloeiro, setPercentualComissaoLeiloeiro] = useState(5);
  const [dividasCondominioIptu, setDividasCondominioIptu] = useState(8_000);
  const [custoEstimadoReforma, setCustoEstimadoReforma] = useState(40_000);
  const [custosCartorio, setCustosCartorio] = useState(5_000);

  // Ocupação
  const [imovelOcupado, setImovelOcupado] = useState(false);
  const [situacaoOcupacao, setSituacaoOcupacao] = useState(1); // índice de SITUACOES_OCUPACAO
  const [custosJuridicosDesocupacao, setCustosJuridicosDesocupacao] = useState(8_000);
  const [aluguelAlternativoMensal, setAluguelAlternativoMensal] = useState(2_000);

  const mesesDesocupacao = SITUACOES_OCUPACAO[situacaoOcupacao].meses;

  const resultado = useMemo(
    () => calcularLeilaoImovel({
      valorArremate, valorAvaliacaoImovel, aliquotaITBI, percentualComissaoLeiloeiro,
      dividasCondominioIptu, custoEstimadoReforma, custosCartorio,
      imovelOcupado, custosJuridicosDesocupacao, mesesDesocupacao, aluguelAlternativoMensal,
    }),
    [valorArremate, valorAvaliacaoImovel, aliquotaITBI, percentualComissaoLeiloeiro,
      dividasCondominioIptu, custoEstimadoReforma, custosCartorio,
      imovelOcupado, custosJuridicosDesocupacao, mesesDesocupacao, aluguelAlternativoMensal]
  );

  const desconto = valorAvaliacaoImovel > 0
    ? ((valorAvaliacaoImovel - valorArremate) / valorAvaliacaoImovel) * 100 : 0;
  const lucrativo = resultado.lucroEstimado > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Calculadora de Leilão de Imóvel</h1>
        <p className="text-slate-500">
          Calcule o custo total do arremate incluindo ITBI, comissão do leiloeiro, dívidas assumidas, reforma e cartório.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-5">
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
              <label className="block text-sm font-medium text-slate-600 mb-1.5">ITBI: {aliquotaITBI}%</label>
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

          {/* Toggle imóvel ocupado */}
          <div className={`rounded-2xl border-2 transition-colors overflow-hidden ${
            imovelOcupado ? "border-orange-300 bg-orange-50" : "border-slate-200 bg-white"
          }`}>
            <button
              onClick={() => setImovelOcupado((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <Scale className={`w-5 h-5 ${imovelOcupado ? "text-orange-600" : "text-slate-400"}`} />
                <div className="text-left">
                  <p className={`text-sm font-semibold ${imovelOcupado ? "text-orange-800" : "text-slate-700"}`}>
                    Imóvel ocupado
                  </p>
                  <p className="text-xs text-slate-500">Inclui custos de desocupação no total</p>
                </div>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${
                imovelOcupado ? "bg-orange-500" : "bg-slate-300"
              }`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  imovelOcupado ? "translate-x-5" : "translate-x-0"
                }`} />
              </div>
            </button>

            {imovelOcupado && (
              <div className="px-5 pb-5 space-y-4 border-t border-orange-200">
                {/* Situação do ocupante */}
                <div className="pt-4">
                  <p className="text-sm font-medium text-slate-700 mb-2">Situação do ocupante</p>
                  <div className="grid grid-cols-3 gap-2">
                    {SITUACOES_OCUPACAO.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setSituacaoOcupacao(i)}
                        className={`px-3 py-2.5 rounded-xl border text-left transition-all ${
                          situacaoOcupacao === i
                            ? "border-orange-400 bg-orange-100 text-orange-800"
                            : "border-slate-200 text-slate-600 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <p className="text-xs font-semibold">{s.label}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{s.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tempo estimado */}
                <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-orange-200">
                  <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">Tempo estimado de desocupação</p>
                    <p className="text-sm font-bold text-orange-700">{mesesDesocupacao} meses</p>
                  </div>
                </div>

                <CurrencyInput
                  id="juridico"
                  label="Honorários advocatícios (imissão na posse)"
                  value={custosJuridicosDesocupacao}
                  onChange={setCustosJuridicosDesocupacao}
                  hint="Estimativa típica: R$ 5.000–R$ 15.000 dependendo da complexidade"
                />
                <CurrencyInput
                  id="aluguel-alt"
                  label="Aluguel alternativo por mês"
                  value={aluguelAlternativoMensal}
                  onChange={setAluguelAlternativoMensal}
                  hint="Custo de morar em outro lugar enquanto aguarda a desocupação"
                />

                <div className="bg-orange-100 rounded-xl px-4 py-3 flex justify-between items-center">
                  <p className="text-sm text-orange-800 font-medium">Custo total de desocupação</p>
                  <p className="text-sm font-bold text-orange-700">{formatCurrency(resultado.custoDesocupacaoTotal)}</p>
                </div>
              </div>
            )}
          </div>
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
            {imovelOcupado && (
              <p className="text-white/60 text-xs mt-2">
                Inclui {formatCurrency(resultado.custoDesocupacaoTotal)} de desocupação ({mesesDesocupacao} meses)
              </p>
            )}
          </div>

          {/* Composição do custo */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-2.5">
            <h3 className="font-semibold text-slate-800 mb-1">Composição do custo total</h3>
            {resultado.detalhamento.map((item) => (
              <div key={item.item} className={`flex justify-between text-sm ${
                item.item.includes("posse") || item.item.includes("alternativo")
                  ? "text-orange-700"
                  : ""
              }`}>
                <span className={item.item.includes("posse") || item.item.includes("alternativo") ? "text-orange-600" : "text-slate-600"}>
                  {item.item}
                </span>
                <span className={`font-semibold ${item.item.includes("posse") || item.item.includes("alternativo") ? "text-orange-700" : "text-slate-900"}`}>
                  {formatCurrency(item.valor)}
                </span>
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

          {/* Info desocupação */}
          {imovelOcupado && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
              <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" /> Sobre a desocupação
              </p>
              <ul className="space-y-1.5 text-xs text-orange-800">
                <li className="flex gap-1.5"><span className="shrink-0">›</span> <strong>Ex-proprietário (devedor):</strong> ação de imissão na posse — prazo típico de 6 a 12 meses.</li>
                <li className="flex gap-1.5"><span className="shrink-0">›</span> <strong>Inquilino com contrato:</strong> pode exigir prazo mínimo de 90 dias + ação de despejo se resistir.</li>
                <li className="flex gap-1.5"><span className="shrink-0">›</span> <strong>Invasor / ocupante irregular:</strong> processo pode ser mais rápido (reintegração de posse), mas imprevisível.</li>
                <li className="flex gap-1.5"><span className="shrink-0">›</span> O imóvel <strong>não pode ser reformado ou vendido</strong> enquanto houver ocupante.</li>
              </ul>
            </div>
          )}
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
          <strong>Cálculo educacional.</strong> O lucro estimado assume que o imóvel será vendido pelo valor de avaliação, sem desconto. Prazos de desocupação são estimativas — consulte um advogado especializado em direito imobiliário antes de arrematar.
        </p>
      </div>

      <FaqSection path="/leilao-imovel" />
      <RelatedCalculators path="/leilao-imovel" />
    </div>
  );
}
