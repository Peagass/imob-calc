"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { calcularFinanciamento } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";

export default function FinanciamentoPage() {
  const [valorImovel, setValorImovel] = useState(500_000);
  const [entrada, setEntrada] = useState(100_000);
  const [prazoAnos, setPrazoAnos] = useState(30);
  const [taxaAnual, setTaxaAnual] = useState(10.5);
  const [sistema, setSistema] = useState<"SAC" | "PRICE">("SAC");

  const entradaPercent = valorImovel > 0 ? (entrada / valorImovel) * 100 : 0;
  const prazoMeses = prazoAnos * 12;

  const resultado = useMemo(
    () =>
      calcularFinanciamento({ valorImovel, entrada, prazoMeses, taxaAnual, sistema }),
    [valorImovel, entrada, prazoMeses, taxaAnual, sistema]
  );

  // Amostragem para o gráfico (a cada 6 meses)
  const dadosGrafico = resultado.parcelas
    .filter((p) => p.mes % 6 === 0 || p.mes === 1)
    .map((p) => ({
      mes: `${Math.round(p.mes / 12)}a`,
      Parcela: Math.round(p.parcela),
      Juros: Math.round(p.juros),
      Amortização: Math.round(p.amortizacao),
      "Saldo devedor": Math.round(p.saldoDevedor),
    }));

  const cards = [
    { label: sistema === "SAC" ? "Primeira parcela" : "Parcela fixa", value: formatCurrency(resultado.primeiraParcela), sub: "~30% da renda recomendada: " + formatCurrency(resultado.primeiraParcela / 0.3) },
    { label: "Total financiado", value: formatCurrency(resultado.valorFinanciado), sub: `Entrada: ${formatPercent(entradaPercent, 1)}` },
    { label: "Total de juros", value: formatCurrency(resultado.totalJuros), sub: formatPercent((resultado.totalJuros / resultado.valorFinanciado) * 100, 0) + " sobre o valor financiado" },
    { label: "CET estimado", value: formatPercent(resultado.cet) + " a.a.", sub: "Inclui seguros e IOF estimados" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Simulador de Financiamento</h1>
        <p className="text-slate-500">Compare SAC e PRICE e veja o impacto dos juros ao longo do contrato.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput id="valor-imovel" label="Valor do imóvel" value={valorImovel} onChange={setValorImovel} />
          <CurrencyInput
            id="entrada"
            label={`Entrada (${formatPercent(entradaPercent, 1)})`}
            value={entrada}
            onChange={setEntrada}
            hint="Mínimo de 20% para financiamentos convencionais (10% no MCMV)"
          />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Prazo: {prazoAnos} anos</label>
            <input
              type="range"
              min={5}
              max={35}
              value={prazoAnos}
              onChange={(e) => setPrazoAnos(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>5 anos</span>
              <span>35 anos</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Taxa de juros: {formatPercent(taxaAnual)} a.a.
            </label>
            <input
              type="range"
              min={6}
              max={18}
              step={0.25}
              value={taxaAnual}
              onChange={(e) => setTaxaAnual(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>6% (FGTS/MCMV)</span>
              <span>18% (mercado livre)</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Sistema de amortização</label>
            <div className="grid grid-cols-2 gap-2">
              {(["SAC", "PRICE"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSistema(s)}
                  className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    sistema === s
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {sistema === "SAC"
                ? "SAC: parcelas decrescentes, paga menos juros no total."
                : "PRICE: parcela fixa, começa pagando menos mas paga mais juros."}
            </p>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {cards.map((c) => (
              <div key={c.label} className="bg-white rounded-2xl border border-slate-100 p-4">
                <p className="text-xs text-slate-500 mb-1">{c.label}</p>
                <p className="text-xl font-bold text-slate-900">{c.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{c.sub}</p>
              </div>
            ))}
          </div>

          {/* Resumo total */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-5 text-white">
            <p className="text-indigo-200 text-sm mb-1">Total pago ao banco</p>
            <p className="text-3xl font-bold">{formatCurrency(resultado.totalPago)}</p>
            <p className="text-indigo-200 text-sm mt-2">
              = {formatCurrency(resultado.valorFinanciado)} financiado + {formatCurrency(resultado.totalJuros)} de juros
            </p>
            {sistema === "SAC" && (
              <p className="text-xs text-indigo-300 mt-2">
                Última parcela: {formatCurrency(resultado.ultimaParcela)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-800 mb-1">Evolução das parcelas</h3>
        <p className="text-sm text-slate-400 mb-5">Juros vs. amortização ao longo do contrato</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={dadosGrafico}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#94a3b8" }} />
            <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12, fill: "#94a3b8" }} />
            <Tooltip formatter={(v) => formatCurrency(Number(v))} />
            <Legend />
            <Area type="monotone" dataKey="Amortização" stackId="1" stroke="#6366f1" fill="#e0e7ff" />
            <Area type="monotone" dataKey="Juros" stackId="1" stroke="#f59e0b" fill="#fef3c7" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Educação */}
      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">O que isso significa?</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li><strong>SAC</strong> (Sistema de Amortização Constante): amortização fixa todo mês, juros diminuem. Parcela inicial mais alta, mas total pago é menor.</li>
              <li><strong>PRICE</strong>: parcela fixa, mas nos primeiros anos você paga quase só juros. Total pago é maior que o SAC.</li>
              <li>Os bancos exigem que a parcela caiba em <strong>no máximo 30%</strong> da sua renda familiar.</li>
              <li>O CET (Custo Efetivo Total) inclui taxas, seguros e IOF além dos juros do contrato.</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-10 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">O que é financiamento imobiliário?</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Financiamento imobiliário é um empréstimo de longo prazo concedido por bancos para a compra de imóvel residencial ou comercial. O imóvel fica alienado fiduciariamente à instituição — o banco é o proprietário legal até a quitação total, conforme a Lei 9.514/1997. O prazo máximo é de 35 anos e o valor financiado pode ser de até 80% do valor do imóvel pelo SFH (imóveis até R$ 2,25 milhões em 2026).
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">SAC ou PRICE: qual sistema escolher?</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-2">
            No <strong>SAC</strong> (Sistema de Amortização Constante), a amortização mensal é fixa e os juros caem progressivamente — a parcela diminui com o tempo e o total de juros pago é menor. Na <strong>PRICE</strong>, a parcela é fixa do início ao fim, mas nos primeiros anos ela é quase inteiramente composta de juros, resultando em amortização lenta do saldo devedor e maior custo total. Para quem consegue arcar com a parcela inicial maior, o SAC é quase sempre mais econômico — use a calculadora acima para ver a diferença exata no seu cenário.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Qual a taxa de juros do financiamento imobiliário hoje?</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Em maio de 2026, a Caixa Econômica Federal pratica <strong>11,49% a.a. + TR</strong> para imóveis até R$ 2,25 milhões (SFH) e <strong>12,00% a.a. + TR</strong> acima desse valor (SFI). O Banco Central cortou a Selic para 14,50% a.a. em abril de 2026, mas o repasse ao crédito imobiliário é gradual, com defasagem de cerca de seis meses. Famílias elegíveis ao <a href="/mcmv" className="text-indigo-600 hover:underline">Minha Casa Minha Vida</a> têm acesso a taxas subsidiadas a partir de 4,00% a.a. Se você já tem um financiamento contratado a taxas altas, avalie a <a href="/portabilidade" className="text-indigo-600 hover:underline">portabilidade de crédito</a> para reduzir os juros.
          </p>
        </div>
      </section>

      <FaqSection path="/financiamento" />
      <RelatedCalculators path="/financiamento" />
    </div>
  );
}
