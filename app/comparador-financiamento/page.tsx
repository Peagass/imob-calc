"use client";

import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { calcularComparadorFinanciamento } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, Trophy } from "lucide-react";

function SliderField({ label, value, display, min, max, step, onChange }: {
  label: string; value: number; display: string; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span className="text-xs text-slate-500">{label}</span>
        <span className="text-xs font-bold text-slate-700">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-600 h-1.5 rounded-full" />
    </div>
  );
}

export default function ComparadorFinanciamentoPage() {
  const [valorImovel, setValorImovel] = useState(500_000);
  const [entradaPercentual, setEntradaPercentual] = useState(20);

  const [nomeA, setNomeA] = useState("Banco A");
  const [taxaA, setTaxaA] = useState(10.5);
  const [prazoA, setPrazoA] = useState(240);
  const [sistemaA, setSistemaA] = useState<"SAC" | "PRICE">("SAC");

  const [nomeB, setNomeB] = useState("Banco B");
  const [taxaB, setTaxaB] = useState(11.5);
  const [prazoB, setPrazoB] = useState(240);
  const [sistemaB, setSistemaB] = useState<"SAC" | "PRICE">("PRICE");

  const r = useMemo(() => calcularComparadorFinanciamento({
    valorImovel, entradaPercentual,
    opcaoA: { nome: nomeA, taxaAnual: taxaA, prazoMeses: prazoA, sistema: sistemaA },
    opcaoB: { nome: nomeB, taxaAnual: taxaB, prazoMeses: prazoB, sistema: sistemaB },
  }), [valorImovel, entradaPercentual, nomeA, taxaA, prazoA, sistemaA, nomeB, taxaB, prazoB, sistemaB]);

  const vencedor = r.vantagem;
  const chartData = r.a.evolucaoAnual.map((item, i) => ({
    ano: `Ano ${item.ano}`,
    [nomeA]: item.saldo,
    [nomeB]: r.b.evolucaoAnual[i]?.saldo ?? 0,
  })).filter((_, i) => i % 2 === 1 || i === r.a.evolucaoAnual.length - 1);

  const OpcaoCard = ({ label, nome, taxa, prazo, sistema, setSistema, res, ganhou }: {
    label: string; nome: string; taxa: number; prazo: number;
    sistema: "SAC" | "PRICE"; setSistema: (s: "SAC" | "PRICE") => void;
    res: typeof r.a; ganhou: boolean;
  }) => (
    <div className={`rounded-2xl border p-5 space-y-3 ${ganhou ? "border-blue-300 bg-blue-50/30" : "border-slate-100 bg-white"}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-800">{nome}</span>
        {ganhou && vencedor !== "igual" && (
          <span className="flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
            <Trophy className="w-3 h-3" /> Mais barato
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {(["SAC", "PRICE"] as const).map((s) => (
          <button key={s} onClick={() => setSistema(s)}
            className={`flex-1 py-1 text-xs font-bold rounded-lg border transition-colors ${
              sistema === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-500 border-slate-200"
            }`}>{s}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-slate-400">Parcela inicial</p>
          <p className="font-bold text-slate-900">{formatCurrency(res.parcelaInicial)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">{sistema === "SAC" ? "Parcela final" : "Parcela fixa"}</p>
          <p className="font-bold text-slate-900">{formatCurrency(res.parcelaFinal)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Total de juros</p>
          <p className="font-bold text-rose-600">{formatCurrency(res.totalJuros)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Total pago</p>
          <p className="font-bold text-slate-900">{formatCurrency(res.totalPago)}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Comparador de Financiamentos</h1>
        <p className="text-sm text-slate-500 mt-1">Compare dois financiamentos lado a lado — taxas, sistemas de amortização e custo total real.</p>
      </div>

      {/* Imóvel */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Imóvel</p>
        <div className="grid md:grid-cols-2 gap-6">
          <CurrencyInput id="valor" label="Valor do imóvel" value={valorImovel} onChange={setValorImovel} />
          <SliderField label="Entrada" value={entradaPercentual}
            display={`${entradaPercentual}% · ${formatCurrency(valorImovel * entradaPercentual / 100)}`}
            min={5} max={80} step={5} onChange={setEntradaPercentual} />
        </div>
        <p className="text-xs text-slate-400 mt-3">Valor financiado: <strong className="text-slate-700">{formatCurrency(r.valorFinanciado)}</strong></p>
      </div>

      {/* Duas opções lado a lado */}
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        {/* Banco A */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">A</span>
            <input value={nomeA} onChange={(e) => setNomeA(e.target.value)}
              className="text-sm font-semibold text-slate-800 bg-transparent border-b border-slate-200 focus:outline-none focus:border-blue-400 w-full" />
          </div>
          <SliderField label="Taxa de juros" value={taxaA} display={`${formatPercent(taxaA)} a.a.`} min={6} max={20} step={0.25} onChange={setTaxaA} />
          <SliderField label="Prazo" value={prazoA} display={`${prazoA / 12} anos`} min={60} max={360} step={12} onChange={setPrazoA} />
          <div>
            <p className="text-xs text-slate-500 mb-1.5">Sistema</p>
            <div className="flex gap-2">
              {(["SAC", "PRICE"] as const).map((s) => (
                <button key={s} onClick={() => setSistemaA(s)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                    sistemaA === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-500 border-slate-200"
                  }`}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Banco B */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">B</span>
            <input value={nomeB} onChange={(e) => setNomeB(e.target.value)}
              className="text-sm font-semibold text-slate-800 bg-transparent border-b border-slate-200 focus:outline-none focus:border-indigo-400 w-full" />
          </div>
          <SliderField label="Taxa de juros" value={taxaB} display={`${formatPercent(taxaB)} a.a.`} min={6} max={20} step={0.25} onChange={setTaxaB} />
          <SliderField label="Prazo" value={prazoB} display={`${prazoB / 12} anos`} min={60} max={360} step={12} onChange={setPrazoB} />
          <div>
            <p className="text-xs text-slate-500 mb-1.5">Sistema</p>
            <div className="flex gap-2">
              {(["SAC", "PRICE"] as const).map((s) => (
                <button key={s} onClick={() => setSistemaB(s)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                    sistemaB === s ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-500 border-slate-200"
                  }`}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resultado comparativo */}
      <div className={`rounded-2xl p-5 mb-5 text-white ${
        vencedor === "igual" ? "bg-gradient-to-r from-slate-600 to-slate-700"
        : "bg-gradient-to-r from-blue-600 to-indigo-700"
      }`}>
        <p className="text-white/70 text-xs mb-1">Resultado</p>
        {vencedor === "igual"
          ? <p className="text-2xl font-bold">Custo equivalente entre as duas opções</p>
          : <>
              <p className="text-2xl font-bold">{vencedor === "A" ? nomeA : nomeB} é mais barato</p>
              <p className="text-white/80 text-sm mt-1">
                Economia de <strong>{formatCurrency(Math.abs(r.economiaTotal))}</strong> no total pago ao longo do financiamento
              </p>
            </>
        }
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <OpcaoCard label="A" nome={nomeA} taxa={taxaA} prazo={prazoA} sistema={sistemaA} setSistema={setSistemaA}
          res={r.a} ganhou={vencedor === "A"} />
        <OpcaoCard label="B" nome={nomeB} taxa={taxaB} prazo={prazoB} sistema={sistemaB} setSistema={setSistemaB}
          res={r.b} ganhou={vencedor === "B"} />
      </div>

      {/* Gráfico saldo devedor */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-4">
        <h3 className="font-semibold text-slate-800 text-sm mb-1">Saldo devedor ao longo do tempo</h3>
        <p className="text-xs text-slate-400 mb-4">Quanto ainda resta a pagar em cada ano</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <XAxis dataKey="ano" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#94a3b8" }} width={48} />
            <Tooltip formatter={(v) => formatCurrency(Number(v))} />
            <Legend />
            <Bar dataKey={nomeA} fill="#2563eb" radius={[4, 4, 0, 0]} />
            <Bar dataKey={nomeB} fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          No SAC a parcela começa maior mas cai mês a mês, resultando em menos juros totais. No PRICE a parcela é fixa e previsível, mas o saldo devedor cai mais devagar no início. Além da taxa e do sistema, negocie também seguros (MIP e DFI) que podem adicionar 0,3–0,8% ao custo efetivo.
        </p>
      </div>
    </div>
  );
}
