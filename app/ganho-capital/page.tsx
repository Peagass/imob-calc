"use client";

import { useState, useMemo } from "react";
import { calcularGanhoCapital } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, CheckCircle, AlertTriangle } from "lucide-react";

export default function GanhoCapitalPage() {
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");

  const [valorAquisicao, setValorAquisicao] = useState(300_000);
  const [valorMelhorias, setValorMelhorias] = useState(0);
  const [valorVenda, setValorVenda] = useState(600_000);
  const [despesasVenda, setDespesasVenda] = useState(0);
  const [anoMesAquisicao, setAnoMesAquisicao] = useState("2015-01");
  const [anoMesVenda, setAnoMesVenda] = useState(`${currentYear}-${currentMonth}`);
  const [isUnicoImovel, setIsUnicoImovel] = useState(false);
  const [semVenda5Anos, setSemVenda5Anos] = useState(false);
  const [valorReinvestimento, setValorReinvestimento] = useState(0);

  const resultado = useMemo(
    () =>
      calcularGanhoCapital({
        valorAquisicao,
        valorMelhorias,
        valorVenda,
        despesasVenda,
        anoMesAquisicao,
        anoMesVenda,
        isUnicoImovelResidencial: isUnicoImovel,
        semVendaNos5Anos: semVenda5Anos,
        valorReinvestimento,
      }),
    [valorAquisicao, valorMelhorias, valorVenda, despesasVenda, anoMesAquisicao, anoMesVenda, isUnicoImovel, semVenda5Anos, valorReinvestimento]
  );

  const isento = resultado.situacaoIsencao !== "tributavel";
  const anos = Math.floor(resultado.mesesPosse / 12);
  const mesesRestantes = resultado.mesesPosse % 12;

  const mensagensIsencao: Record<string, { texto: string; detalhe: string }> = {
    isento_unico_imovel: {
      texto: "Isento — único imóvel até R$ 440 mil",
      detalhe: "Venda do único imóvel residencial por até R$ 440.000, sem outra venda nos últimos 5 anos.",
    },
    isento_pre_1969: {
      texto: "Isento — imóvel adquirido antes de 1969",
      detalhe: "Imóveis adquiridos antes de 1969 são totalmente isentos de ganho de capital.",
    },
    sem_ganho: {
      texto: "Sem ganho de capital",
      detalhe: "O custo de aquisição ajustado é maior ou igual ao valor de venda.",
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-rose-600 uppercase tracking-wide">Venda</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Ganho de Capital e IR na Venda</h1>
        <p className="text-slate-500">
          Calcule o imposto de renda devido na venda do imóvel, com isenções e fatores de redução por tempo de posse.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Data de aquisição</label>
              <input
                type="month"
                value={anoMesAquisicao}
                onChange={(e) => setAnoMesAquisicao(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-slate-800 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Data de venda</label>
              <input
                type="month"
                value={anoMesVenda}
                onChange={(e) => setAnoMesVenda(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-slate-800 bg-white"
              />
            </div>
          </div>

          {resultado.mesesPosse > 0 && (
            <p className="text-xs text-slate-500 -mt-2">
              Tempo de posse: <strong>{anos} ano{anos !== 1 ? "s" : ""}{mesesRestantes > 0 ? ` e ${mesesRestantes} mês${mesesRestantes !== 1 ? "es" : ""}` : ""}</strong>
            </p>
          )}

          <CurrencyInput id="aquisicao" label="Valor de aquisição" value={valorAquisicao} onChange={setValorAquisicao} hint="Valor pago na compra (conforme escritura)" />
          <CurrencyInput id="melhorias" label="Melhorias e benfeitorias" value={valorMelhorias} onChange={setValorMelhorias} hint="Reformas com nota fiscal (aumentam o custo de aquisição)" />
          <CurrencyInput id="venda" label="Valor de venda" value={valorVenda} onChange={setValorVenda} />
          <CurrencyInput id="despesas" label="Despesas da venda" value={despesasVenda} onChange={setDespesasVenda} hint="Corretagem paga pelo vendedor, laudêmios, etc." />

          <div className="border-t border-slate-100 pt-4 space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Isenções</p>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isUnicoImovel}
                onChange={(e) => setIsUnicoImovel(e.target.checked)}
                className="w-4 h-4 rounded accent-rose-500"
              />
              <span className="text-sm text-slate-700">É imóvel residencial e é o único que possuo</span>
            </label>

            {isUnicoImovel && (
              <label className="flex items-center gap-3 cursor-pointer ml-7">
                <input
                  type="checkbox"
                  checked={semVenda5Anos}
                  onChange={(e) => setSemVenda5Anos(e.target.checked)}
                  className="w-4 h-4 rounded accent-rose-500"
                />
                <span className="text-sm text-slate-700">Não vendi nenhum imóvel nos últimos 5 anos</span>
              </label>
            )}

            {isUnicoImovel && (
              <CurrencyInput
                id="reinvestimento"
                label="Valor a reinvestir em outro imóvel residencial (em 180 dias)"
                value={valorReinvestimento}
                onChange={setValorReinvestimento}
                hint="Reduz o ganho tributável proporcionalmente ao valor reinvestido"
              />
            )}
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          {isento ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-800 text-lg">{mensagensIsencao[resultado.situacaoIsencao]?.texto}</p>
                  <p className="text-sm text-emerald-700 mt-1">{mensagensIsencao[resultado.situacaoIsencao]?.detalhe}</p>
                  <p className="text-2xl font-bold text-emerald-700 mt-4">IR devido: {formatCurrency(0)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-rose-600 to-red-700 rounded-2xl p-6 text-white">
              <p className="text-rose-200 text-sm mb-1">IR a pagar (GCAP)</p>
              <p className="text-4xl font-bold mb-2">{formatCurrency(resultado.irDevido)}</p>
              <p className="text-rose-200 text-sm">
                Alíquota efetiva: {formatPercent(resultado.aliquotaEfetiva)} sobre o ganho bruto
              </p>
              <p className="text-rose-300 text-xs mt-2">
                Prazo: último dia útil do mês seguinte à venda (DARF código 4600)
              </p>
            </div>
          )}

          {/* Detalhamento do ganho */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 text-sm">
            <h3 className="font-semibold text-slate-800">Detalhamento do ganho</h3>
            <div className="flex justify-between">
              <span className="text-slate-600">Valor de venda</span>
              <span className="font-semibold">{formatCurrency(valorVenda)}</span>
            </div>
            {despesasVenda > 0 && (
              <div className="flex justify-between text-rose-600">
                <span>− Despesas da venda</span>
                <span>− {formatCurrency(despesasVenda)}</span>
              </div>
            )}
            <div className="flex justify-between text-rose-600">
              <span>− Custo de aquisição ajustado</span>
              <span>− {formatCurrency(resultado.custoAquisicaoAjustado)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2 font-semibold">
              <span className="text-slate-700">= Ganho de capital bruto</span>
              <span className="text-slate-900">{formatCurrency(resultado.ganhoCapitalBruto)}</span>
            </div>

            {resultado.situacaoIsencao === "tributavel" && (resultado.fr1 < 1 || resultado.fr2 < 1 || resultado.reducaoReinvestimento > 0) && (
              <>
                {resultado.fr1 < 1 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Redução FR1 (posse pré-nov/2005)</span>
                    <span>− {formatPercent((1 - resultado.fr1) * 100, 1)}</span>
                  </div>
                )}
                {resultado.fr2 < 1 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Redução FR2 (posse pós-nov/2005)</span>
                    <span>− {formatPercent((1 - resultado.fr2) * 100, 1)}</span>
                  </div>
                )}
                {resultado.reducaoReinvestimento > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Redução por reinvestimento</span>
                    <span>− {formatCurrency(resultado.reducaoReinvestimento)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-slate-100 pt-2 font-bold">
                  <span className="text-slate-700">= Ganho tributável</span>
                  <span className="text-slate-900">{formatCurrency(resultado.ganhoTributavel)}</span>
                </div>
              </>
            )}
          </div>

          {/* Detalhamento do IR por faixas */}
          {resultado.detalhamentoIR.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-800 mb-3">IR por faixas progressivas</h3>
              <div className="space-y-2">
                {resultado.detalhamentoIR.map((d) => (
                  <div key={d.faixa} className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-slate-700">{d.faixa}</span>
                      <span className="ml-2 text-xs text-slate-400">({formatPercent(d.aliquota, 1)})</span>
                    </div>
                    <span className="font-semibold text-slate-900">{formatCurrency(d.imposto)}</span>
                  </div>
                ))}
                <div className="border-t border-slate-100 pt-2 flex justify-between font-bold">
                  <span className="text-slate-700">Total IR</span>
                  <span className="text-rose-700">{formatCurrency(resultado.irDevido)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Alerta */}
          {resultado.situacaoIsencao === "tributavel" && resultado.irDevido > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                O GCAP (programa da Receita Federal) é obrigatório para declarar e pagar o IR sobre ganho de capital. O pagamento via DARF deve ser feito até o último dia útil do mês seguinte à venda.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">O que isso significa?</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li><strong>Ganho de capital</strong> é a diferença entre o preço de venda e o custo de aquisição (incluindo melhorias com nota fiscal).</li>
              <li><strong>Alíquotas progressivas:</strong> 15% até R$ 5M, 17,5% de R$ 5M a R$ 10M, 20% de R$ 10M a R$ 30M, 22,5% acima de R$ 30M.</li>
              <li><strong>Fator de Redução (FR)</strong>: imóveis com posse anterior a novembro/2005 têm o ganho tributável reduzido em 0,5% por mês de posse anterior à essa data. Após nov/2005, a redução é de 0,35% por mês.</li>
              <li><strong>Isenção do único imóvel:</strong> venda por até R$ 440 mil, sem outra venda nos 5 anos anteriores — totalmente isento.</li>
              <li><strong>Reinvestimento:</strong> se reinvestir o valor da venda em outro imóvel residencial em até 180 dias, o ganho proporcional ao valor reinvestido fica isento.</li>
              <li>Este cálculo é educacional. Use o programa <strong>GCAP da Receita Federal</strong> para apurar e pagar o imposto corretamente.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
