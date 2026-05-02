"use client";

import { useState, useMemo } from "react";
import { calcularMCMV } from "@/lib/calculators";
import type { MCMVMunicipio } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, CheckCircle, XCircle, Home } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


const MUNICIPIOS: { value: MCMVMunicipio; label: string; desc: string }[] = [
  { value: "capital", label: "Capital ou região metropolitana", desc: "São Paulo, Rio, BH, Fortaleza, Manaus…" },
  { value: "medio",   label: "Cidade média", desc: "Municípios entre 50 mil e 250 mil habitantes" },
  { value: "interior", label: "Interior / pequeno município", desc: "Municípios menores e cidades do interior" },
];

const FAIXA_COR: Record<number, string> = {
  1: "from-emerald-600 to-teal-700",
  2: "from-blue-600 to-indigo-700",
  3: "from-violet-600 to-purple-700",
};

export default function MCMVPage() {
  const [rendaFamiliarBruta, setRendaFamiliarBruta] = useState(3_200);
  const [valorImovel, setValorImovel] = useState(220_000);
  const [fgtsDisponivel, setFgtsDisponivel] = useState(12_000);
  const [tipoMunicipio, setTipoMunicipio] = useState<MCMVMunicipio>("capital");

  const resultado = useMemo(
    () => calcularMCMV({ rendaFamiliarBruta, valorImovel, fgtsDisponivel, tipoMunicipio }),
    [rendaFamiliarBruta, valorImovel, fgtsDisponivel, tipoMunicipio]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Minha Casa Minha Vida</h1>
        <p className="text-slate-500">
          Descubra em qual faixa do programa você se encaixa, o subsídio estimado e a parcela mensal com as taxas preferencias do MCMV.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput
            id="renda"
            label="Renda familiar bruta mensal"
            value={rendaFamiliarBruta}
            onChange={setRendaFamiliarBruta}
            hint="Some a renda de todos os membros da família que vão compor o financiamento"
          />

          <CurrencyInput
            id="imovel"
            label="Valor do imóvel pretendido"
            value={valorImovel}
            onChange={setValorImovel}
          />

          <CurrencyInput
            id="fgts"
            label="FGTS disponível"
            value={fgtsDisponivel}
            onChange={setFgtsDisponivel}
            hint="Pode ser usado como entrada. Consulte o app FGTS para saber seu saldo."
          />

          <div>
            <p className="text-sm font-medium text-slate-600 mb-2">Localização do imóvel</p>
            <div className="space-y-2">
              {MUNICIPIOS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setTipoMunicipio(m.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                    tipoMunicipio === m.value
                      ? "border-blue-400 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <p className={`text-sm font-semibold ${tipoMunicipio === m.value ? "text-blue-700" : "text-slate-800"}`}>
                    {m.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          {resultado.elegivel ? (
            <>
              {/* Faixa */}
              <div className={`bg-gradient-to-br ${FAIXA_COR[resultado.faixa!]} rounded-2xl p-6 text-white`}>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-white/70" />
                  <p className="text-white/70 text-sm">Elegível ao programa</p>
                </div>
                <p className="text-4xl font-bold mb-1">Faixa {resultado.faixa}</p>
                <p className="text-white/80 text-sm">
                  Taxa de juros: {formatPercent(resultado.taxaJurosAnual)} a.a.
                  {resultado.faixa === 1 ? " — taxa mais baixa do programa" : ""}
                </p>
                <p className="text-white/70 text-xs mt-2">
                  Limite do imóvel para sua cidade: {formatCurrency(resultado.limiteImovel)}
                </p>
              </div>

              {/* Cards de resultado */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl border border-slate-100 p-4">
                  <p className="text-xs text-slate-500 mb-1">Parcela estimada</p>
                  <p className="text-xl font-bold text-slate-800">{formatCurrency(resultado.parcelaMensal)}</p>
                  <p className="text-xs text-slate-400 mt-0.5">30 anos · PRICE</p>
                </div>
                <div className={`rounded-2xl border p-4 ${resultado.subsidioEstimado > 0 ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-100"}`}>
                  <p className={`text-xs mb-1 ${resultado.subsidioEstimado > 0 ? "text-emerald-600" : "text-slate-500"}`}>
                    Subsídio estimado
                  </p>
                  <p className={`text-xl font-bold ${resultado.subsidioEstimado > 0 ? "text-emerald-700" : "text-slate-500"}`}>
                    {resultado.subsidioEstimado > 0 ? formatCurrency(resultado.subsidioEstimado) : "—"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {resultado.subsidioEstimado > 0 ? "reduz o valor financiado" : "sem subsídio direto"}
                  </p>
                </div>
              </div>

              {/* Composição */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 text-sm">
                <h3 className="font-semibold text-slate-800">Composição do pagamento</h3>
                <div className="flex justify-between">
                  <span className="text-slate-600">Valor do imóvel</span>
                  <span className="font-semibold">{formatCurrency(valorImovel)}</span>
                </div>
                {resultado.subsidioEstimado > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">− Subsídio estimado</span>
                    <span className="font-semibold text-emerald-700">−{formatCurrency(resultado.subsidioEstimado)}</span>
                  </div>
                )}
                {fgtsDisponivel > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">− FGTS (entrada)</span>
                    <span className="font-semibold text-blue-700">−{formatCurrency(fgtsDisponivel)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-slate-100 pt-2 font-bold">
                  <span className="text-slate-800">Valor financiado</span>
                  <span>{formatCurrency(resultado.valorFinanciado)}</span>
                </div>
                {resultado.entradaPropriaNecessaria > 0 && (
                  <div className="flex justify-between text-amber-700 bg-amber-50 rounded-lg px-3 py-2 -mx-1">
                    <span className="font-medium">Entrada própria mínima</span>
                    <span className="font-bold">{formatCurrency(resultado.entradaPropriaNecessaria)}</span>
                  </div>
                )}
              </div>

              {/* Comparativo de faixas */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <h3 className="font-semibold text-slate-800 mb-3">Faixas do programa</h3>
                <div className="space-y-2 text-xs">
                  {[
                    { faixa: 1, label: "Faixa 1", renda: "até R$ 2.640", juros: "4,00% a.a.", subsidio: "até R$ 47.500" },
                    { faixa: 2, label: "Faixa 2", renda: "R$ 2.640 – R$ 4.400", juros: "4,75% – 7,00% a.a.", subsidio: "até R$ 47.500" },
                    { faixa: 3, label: "Faixa 3", renda: "R$ 4.400 – R$ 8.000", juros: "7,66% a.a.", subsidio: "—" },
                  ].map((f) => (
                    <div key={f.faixa}
                      className={`flex items-center gap-3 p-2.5 rounded-lg ${resultado.faixa === f.faixa ? "bg-blue-50 border border-blue-200" : ""}`}>
                      <span className={`font-bold w-12 shrink-0 ${resultado.faixa === f.faixa ? "text-blue-700" : "text-slate-500"}`}>
                        {f.label}
                      </span>
                      <span className="text-slate-600 flex-1">{f.renda}</span>
                      <span className="text-slate-600">{f.juros}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-rose-800 text-lg mb-2">Fora dos critérios do MCMV</p>
                  <p className="text-sm text-rose-700">{resultado.motivoInelegibilidade}</p>
                  {resultado.faixa && (
                    <p className="text-sm text-rose-600 mt-2">
                      Limite do imóvel para Faixa {resultado.faixa} na sua cidade: {formatCurrency(resultado.limiteImovel)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {resultado.elegivel && resultado.observacoes.length > 0 && (
        <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
          <div className="flex gap-3">
            <Home className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">Condições e exigências do programa</h3>
              <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
                {resultado.observacoes.map((obs) => <li key={obs}>{obs}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          <strong>Simulação educacional.</strong> O subsídio real e as condições exatas são definidos pela Caixa Econômica Federal ou Banco do Brasil após análise de crédito. As regras podem mudar — consulte sempre uma agência ou correspondente credenciado antes de tomar decisões.
        </p>
      </div>

      <section className="mt-10 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">O que é o Minha Casa Minha Vida?</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            O Minha Casa Minha Vida (MCMV) é o principal programa habitacional do governo federal, criado em 2009 e reestruturado em 2023. Ele oferece financiamento imobiliário com <strong>taxas de juros subsidiadas e subsídios diretos</strong> para famílias de baixa e média renda. O programa é operado principalmente pela Caixa Econômica Federal e pelo Banco do Brasil, com recursos do FGTS e do Orçamento Geral da União. Em 2026, o programa prevê a construção de 2 milhões de unidades habitacionais.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Quais são as faixas de renda do MCMV em 2026?</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            O programa tem três faixas, com taxas e subsídios diferentes conforme a renda familiar bruta mensal:
          </p>
          <ul className="text-sm text-slate-600 leading-relaxed space-y-1.5 list-disc list-inside mt-2">
            <li><strong>Faixa 1</strong> — renda até R$ 2.640: taxa de 4,00% a.a., subsídio de até R$ 47.500 e entrada mínima de 10% (pode ser zerada com FGTS).</li>
            <li><strong>Faixa 2</strong> — renda de R$ 2.640 a R$ 4.400: taxa de 4,75% a 7,00% a.a. (varia conforme a renda), subsídio de até R$ 47.500.</li>
            <li><strong>Faixa 3</strong> — renda de R$ 4.400 a R$ 8.000: taxa de 7,66% a.a., sem subsídio direto, mas com acesso ao FGTS na entrada.</li>
          </ul>
          <p className="text-sm text-slate-600 leading-relaxed mt-2">
            O <a href="/fgts" className="text-indigo-600 hover:underline">FGTS pode ser usado como entrada</a> em todas as faixas para reduzir o valor financiado. Após a simulação, confirme condições na Caixa Econômica Federal, pois subsídios variam conforme localização do imóvel e disponibilidade orçamentária.
          </p>
        </div>
      </section>

      <FaqSection path="/mcmv" />
      <RelatedCalculators path="/mcmv" />
    </div>
  );
}
