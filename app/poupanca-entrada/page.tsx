"use client";

import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { calcularPoupancaEntrada } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, PiggyBank } from "lucide-react";

const OPCOES_RENDIMENTO = [
  { label: "Poupança (~6% a.a.)", valor: 6.0 },
  { label: "CDB 100% CDI líq. (~10% a.a.)", valor: 10.0 },
  { label: "Tesouro Selic líq. (~11% a.a.)", valor: 11.0 },
  { label: "LCI/LCA isenta (~13% a.a.)", valor: 13.0 },
];

export default function PoupancaEntradaPage() {
  const [metaValor, setMetaValor] = useState(80_000);
  const [poupancaAtual, setPoupancaAtual] = useState(10_000);
  const [prazoMeses, setPrazoMeses] = useState(36);
  const [rendimentoAnual, setRendimentoAnual] = useState(11.0);

  const resultado = useMemo(
    () => calcularPoupancaEntrada({ metaValor, poupancaAtual, prazoMeses, rendimentoAnual }),
    [metaValor, poupancaAtual, prazoMeses, rendimentoAnual]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Compra</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Poupança para a Entrada</h1>
        <p className="text-slate-500">
          Quanto você precisa guardar por mês para juntar a entrada do imóvel no prazo desejado?
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput
            id="meta"
            label="Meta de entrada"
            value={metaValor}
            onChange={setMetaValor}
            hint="Valor que você precisa juntar para dar a entrada no imóvel"
          />

          <CurrencyInput
            id="atual"
            label="Já tenho guardado"
            value={poupancaAtual}
            onChange={setPoupancaAtual}
            hint="Saldo atual disponível para investir (ex: FGTS não conta aqui)"
          />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Prazo: {prazoMeses} meses ({(prazoMeses / 12).toFixed(1)} anos)
            </label>
            <input
              type="range" min={6} max={120} step={6} value={prazoMeses}
              onChange={(e) => setPrazoMeses(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>6 meses</span><span>10 anos</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Rendimento anual líquido: {formatPercent(rendimentoAnual)} a.a.
            </label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {OPCOES_RENDIMENTO.map((op) => (
                <button
                  key={op.valor}
                  onClick={() => setRendimentoAnual(op.valor)}
                  className={`text-left px-3 py-2 rounded-xl border text-xs transition-all ${
                    rendimentoAnual === op.valor
                      ? "border-blue-400 bg-blue-50 text-blue-700 font-semibold"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>
            <input
              type="range" min={3} max={18} step={0.25} value={rendimentoAnual}
              onChange={(e) => setRendimentoAnual(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <p className="text-xs text-slate-400 mt-1">
              Use o rendimento <strong>líquido de IR</strong>. LCI/LCA e poupança são isentos; CDB/Tesouro pagam 15–22,5% de IR.
            </p>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <PiggyBank className="w-5 h-5 text-blue-200" />
              <p className="text-blue-100 text-sm">Aporte mensal necessário</p>
            </div>
            <p className="text-4xl font-bold mb-1">{formatCurrency(resultado.aporteMensalNecessario)}</p>
            <p className="text-blue-200 text-sm">por mês durante {prazoMeses} meses</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">Meta</p>
              <p className="text-base font-bold text-slate-800">{formatCurrency(metaValor)}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">Total poupado</p>
              <p className="text-base font-bold text-slate-800">{formatCurrency(resultado.totalAportado)}</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center">
              <p className="text-xs text-emerald-600 mb-1">Rendimentos</p>
              <p className="text-base font-bold text-emerald-700">{formatCurrency(resultado.totalRendimento)}</p>
            </div>
          </div>

          {/* Quanto rende vs. guardar no colchão */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Se guardar sem rendimento (colchão)</h3>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Aporte necessário</span>
              <span className="font-bold text-slate-900">
                {formatCurrency(Math.max(0, (metaValor - poupancaAtual) / prazoMeses))}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-emerald-600 font-medium">Economia mensal investindo</span>
              <span className="font-bold text-emerald-700">
                {formatCurrency(Math.max(0, (metaValor - poupancaAtual) / prazoMeses - resultado.aporteMensalNecessario))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-800 mb-1">Evolução da poupança</h3>
        <p className="text-sm text-slate-400 mb-5">Aportes acumulados vs. saldo com rendimentos</p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={resultado.evolucao}>
            <defs>
              <linearGradient id="saldoGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="aportesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => `${v}m`} />
            <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip
              formatter={(v, name) => [formatCurrency(Number(v)), name === "saldo" ? "Saldo total" : "Aportes"]}
              labelFormatter={(l) => `Mês ${l}`}
            />
            <Area type="monotone" dataKey="aportes" name="aportes" stroke="#94a3b8" fill="url(#aportesGrad)" strokeWidth={1.5} dot={false} />
            <Area type="monotone" dataKey="saldo" name="saldo" stroke="#2563eb" fill="url(#saldoGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Dicas para juntar a entrada mais rápido</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li>LCI e LCA de bancos médios costumam pagar mais que CDB de grandes bancos — e são isentos de IR.</li>
              <li>Automatize o aporte todo mês logo após receber o salário — o que sai primeiro não faz falta.</li>
              <li>O FGTS pode complementar a entrada — use o simulador de FGTS para calcular o saldo na data da compra.</li>
              <li>Evite resgates antecipados em ativos com carência — mantenha uma reserva de emergência separada.</li>
              <li>Revise o aporte anualmente: aumentos de salário devem refletir em aumento do aporte.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
