"use client";

import { useState, useMemo } from "react";
import { calcularSeguroFianca } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { Info, CheckCircle, Shield } from "lucide-react";

export default function SeguroFiancaPage() {
  const [aluguelMensal, setAluguelMensal] = useState(2_500);
  const [prazoContrato, setPrazoContrato] = useState(30);
  const [mesesSeguroFianca, setMesesSeguroFianca] = useState(1.2);
  const [mesesCaucao, setMesesCaucao] = useState(3);
  const [taxaInvestimento, setTaxaInvestimento] = useState(13.0);
  const [temFiador, setTemFiador] = useState(false);

  const resultado = useMemo(
    () => calcularSeguroFianca({ aluguelMensal, prazoContrato, mesesSeguroFianca, mesesCaucao, taxaInvestimento, temFiador }),
    [aluguelMensal, prazoContrato, mesesSeguroFianca, mesesCaucao, taxaInvestimento, temFiador]
  );

  const corMelhor: Record<string, string> = {
    seguro_fianca: "from-blue-600 to-indigo-700",
    caucao: "from-emerald-600 to-teal-700",
    fiador: "from-violet-600 to-purple-700",
  };

  const nomeMelhor: Record<string, string> = {
    seguro_fianca: "Seguro Fiança",
    caucao: "Caução em Dinheiro",
    fiador: "Fiador",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Aluguel</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Seguro Fiança vs. Caução vs. Fiador</h1>
        <p className="text-slate-500">
          Compare o custo real de cada modalidade de garantia no aluguel e escolha a mais vantajosa para o seu caso.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <CurrencyInput id="aluguel" label="Aluguel mensal" value={aluguelMensal} onChange={setAluguelMensal} />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Prazo do contrato: {prazoContrato} meses ({(prazoContrato / 12).toFixed(1)} anos)
            </label>
            <input type="range" min={12} max={60} step={6} value={prazoContrato}
              onChange={(e) => setPrazoContrato(Number(e.target.value))}
              className="w-full accent-amber-500" />
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">Seguro Fiança</p>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                Custo anual: {mesesSeguroFianca.toFixed(1)} mês de aluguel
              </label>
              <input type="range" min={0.8} max={2} step={0.1} value={mesesSeguroFianca}
                onChange={(e) => setMesesSeguroFianca(Number(e.target.value))}
                className="w-full accent-blue-600" />
              <p className="text-xs text-slate-400 mt-1">
                Típico: 1.0–1.5 mês/ano. Varia com o perfil do inquilino.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-3">Caução</p>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                Depósito: {mesesCaucao} meses de aluguel (máx. 3 por lei)
              </label>
              <input type="range" min={1} max={3} step={1} value={mesesCaucao}
                onChange={(e) => setMesesCaucao(Number(e.target.value))}
                className="w-full accent-emerald-600" />
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                Taxa de investimento alternativo: {formatPercent(taxaInvestimento)} a.a.
              </label>
              <input type="range" min={6} max={18} step={0.5} value={taxaInvestimento}
                onChange={(e) => setTaxaInvestimento(Number(e.target.value))}
                className="w-full accent-emerald-600" />
              <p className="text-xs text-slate-400 mt-1">
                Rendimento que o depósito teria se investido (CDI/Selic).
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-wide mb-3">Fiador</p>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="fiador" checked={temFiador}
                onChange={(e) => setTemFiador(e.target.checked)}
                className="w-4 h-4 rounded accent-violet-600" />
              <label htmlFor="fiador" className="text-sm text-slate-700 cursor-pointer">
                Tenho um fiador disponível com imóvel quitado
              </label>
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">
          {/* Melhor opção */}
          <div className={`bg-gradient-to-br ${corMelhor[resultado.melhorOpcao]} rounded-2xl p-6 text-white`}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-white/70" />
              <p className="text-white/70 text-sm">Opção mais econômica</p>
            </div>
            <p className="text-3xl font-bold">{nomeMelhor[resultado.melhorOpcao]}</p>
            {resultado.melhorOpcao === "fiador" && !temFiador && (
              <p className="text-white/70 text-sm mt-2">Habilite o fiador acima para incluir na comparação.</p>
            )}
          </div>

          {/* Comparativo */}
          <div className="space-y-3">
            {resultado.comparativo.map((item) => {
              const isAtivo = nomeMelhor[resultado.melhorOpcao] === item.opcao;
              return (
                <div key={item.opcao}
                  className={`bg-white rounded-2xl border p-5 ${isAtivo ? "border-blue-200 bg-blue-50/30" : "border-slate-100"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold text-slate-800">{item.opcao}</p>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Custo inicial</p>
                      <p className="font-bold text-slate-900">{formatCurrency(item.custoInicial)}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-500">Custo real no período ({prazoContrato}m)</span>
                    <span className={`font-bold ${isAtivo ? "text-blue-700" : "text-slate-800"}`}>
                      {formatCurrency(item.custoTotal)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-emerald-600 font-semibold mb-1">Vantagens</p>
                      {item.pros.map((p) => <p key={p} className="text-xs text-slate-600">✓ {p}</p>)}
                    </div>
                    <div>
                      <p className="text-xs text-rose-600 font-semibold mb-1">Desvantagens</p>
                      {item.contras.map((c) => <p key={c} className="text-xs text-slate-600">✗ {c}</p>)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">O que a Lei do Inquilinato diz sobre garantias</h3>
            <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
              <li>Só é permitida <strong>uma modalidade de garantia</strong> por contrato (Art. 37, parágrafo único).</li>
              <li>Caução em dinheiro: <strong>máximo de 3 meses</strong> de aluguel — depósito em conta bloqueada.</li>
              <li>O proprietário não pode exigir mais de uma modalidade de garantia simultaneamente.</li>
              <li>Fiador deve ter imóvel quitado no Brasil e renda comprovada — exigências variam por imobiliária.</li>
              <li>Seguro fiança tem o prêmio renovado anualmente — o custo pode aumentar a cada renovação.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          O custo de oportunidade da caução é o rendimento perdido pelo inquilino ao imobilizar o depósito. Se o proprietário devolver o depósito corrigido pelo mesmo índice, o custo real é menor — verifique o contrato.
        </p>
      </div>
    </div>
  );
}
