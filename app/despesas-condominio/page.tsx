"use client";

import { useState, useMemo } from "react";
import { calcularDespesasCondominio } from "@/lib/calculators";
import type { PadraoCondominio, LocalizacaoCondominio } from "@/lib/calculators";
import { formatCurrency } from "@/lib/format";
import { Info, LayoutGrid, Users } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import RelatedGuides from "@/components/RelatedGuides";

const PADROES: { value: PadraoCondominio; label: string; desc: string }[] = [
  { value: "economico", label: "Econômico",  desc: "Portaria digital, sem amenidades" },
  { value: "medio",     label: "Médio",      desc: "Salão de festas, jardim básico" },
  { value: "alto",      label: "Alto padrão", desc: "Piscina, academia, portaria 24h" },
  { value: "luxo",      label: "Luxo",       desc: "Todas as amenidades, acabamento premium" },
];

const LOCAIS: { value: LocalizacaoCondominio; label: string }[] = [
  { value: "interior",  label: "Interior" },
  { value: "capital",   label: "Capital / cidade grande" },
  { value: "metropole", label: "Metrópole (SP, RJ, BH)" },
];

export default function DespesasCondominioPage() {
  const [numUnidades,    setNumUnidades]    = useState(60);
  const [numPortarias,   setNumPortarias]   = useState(1);
  const [padrao,         setPadrao]         = useState<PadraoCondominio>("medio");
  const [localizacao,    setLocalizacao]    = useState<LocalizacaoCondominio>("capital");
  const [portaria24h,    setPortaria24h]    = useState(true);
  const [temElevador,    setTemElevador]    = useState(true);
  const [numElevadores,  setNumElevadores]  = useState(2);
  const [temPiscina,     setTemPiscina]     = useState(false);
  const [temAcademia,    setTemAcademia]    = useState(false);
  const [temSalaoFestas, setTemSalaoFestas] = useState(true);
  const [temQuadra,      setTemQuadra]      = useState(false);
  const [temJardim,      setTemJardim]      = useState(true);

  const resultado = useMemo(
    () => calcularDespesasCondominio({ numUnidades, numPortarias, padrao, localizacao, portaria24h, temElevador, numElevadores, temPiscina, temAcademia, temSalaoFestas, temQuadra, temJardim }),
    [numUnidades, numPortarias, padrao, localizacao, portaria24h, temElevador, numElevadores, temPiscina, temAcademia, temSalaoFestas, temQuadra, temJardim]
  );

  const maxItem = Math.max(...resultado.itemsDespesa.map(i => i.valor));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Custos</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Despesas do Condomínio</h1>
        <p className="text-slate-500">
          Estime o custo mensal total de operar um condomínio e a taxa média por unidade, por padrão e localização.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">

          {/* Unidades e torres */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Unidades: {numUnidades}</label>
              <input type="range" min={10} max={500} step={10} value={numUnidades}
                onChange={e => setNumUnidades(Number(e.target.value))}
                className="w-full accent-green-600" />
              <div className="flex justify-between text-xs text-slate-400 mt-1"><span>10</span><span>500</span></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Portarias: {numPortarias}</label>
              <input type="range" min={1} max={4} step={1} value={numPortarias}
                onChange={e => setNumPortarias(Number(e.target.value))}
                className="w-full accent-green-600" />
              <div className="flex justify-between text-xs text-slate-400 mt-1"><span>1</span><span>4</span></div>
            </div>
          </div>

          {/* Padrão */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-2">Padrão do condomínio</p>
            <div className="grid grid-cols-2 gap-2">
              {PADROES.map(p => (
                <button key={p.value} onClick={() => setPadrao(p.value)}
                  className={`text-left px-3 py-2.5 rounded-xl border transition-all ${padrao === p.value ? "border-green-500 bg-green-50" : "border-slate-200 hover:border-slate-300"}`}>
                  <p className={`text-sm font-semibold ${padrao === p.value ? "text-green-700" : "text-slate-700"}`}>{p.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Localização */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Localização</label>
            <div className="flex gap-2 flex-wrap">
              {LOCAIS.map(l => (
                <button key={l.value} onClick={() => setLocalizacao(l.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${localizacao === l.value ? "border-green-500 bg-green-50 text-green-700 font-medium" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-sm font-medium text-slate-600 mb-3">Estrutura e amenidades</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "portaria", label: "Portaria 24h", val: portaria24h, set: setPortaria24h },
                { id: "jardim",   label: "Jardim",       val: temJardim,   set: setTemJardim },
                { id: "salao",    label: "Salão de festas", val: temSalaoFestas, set: setTemSalaoFestas },
                { id: "quadra",   label: "Quadra",       val: temQuadra,   set: setTemQuadra },
                { id: "piscina",  label: "Piscina",      val: temPiscina,  set: setTemPiscina },
                { id: "academia", label: "Academia",     val: temAcademia, set: setTemAcademia },
              ].map(item => (
                <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={item.val} onChange={e => item.set(e.target.checked)}
                    className="w-4 h-4 rounded accent-green-600" />
                  <span className="text-sm text-slate-700">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Elevadores */}
          <div className="border-t border-slate-100 pt-4">
            <label className="flex items-center gap-2 cursor-pointer mb-3">
              <input type="checkbox" checked={temElevador} onChange={e => setTemElevador(e.target.checked)}
                className="w-4 h-4 rounded accent-green-600" />
              <span className="text-sm font-medium text-slate-700">Tem elevador(es)</span>
            </label>
            {temElevador && (
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Número de elevadores: {numElevadores}</label>
                <input type="range" min={1} max={8} step={1} value={numElevadores}
                  onChange={e => setNumElevadores(Number(e.target.value))}
                  className="w-full accent-green-600" />
                <div className="flex justify-between text-xs text-slate-400 mt-1"><span>1</span><span>8</span></div>
              </div>
            )}
          </div>
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <LayoutGrid className="w-5 h-5 text-green-200" />
              <p className="text-green-200 text-sm">Taxa média estimada por unidade</p>
            </div>
            <p className="text-4xl font-bold mb-1">{formatCurrency(resultado.taxaMedia)}/mês</p>
            <p className="text-green-200 text-sm">Faixa: {formatCurrency(resultado.taxaMin)} – {formatCurrency(resultado.taxaMax)}</p>
            <p className="text-green-200 text-sm mt-1">Total do condomínio: {formatCurrency(resultado.totalMensal)}/mês</p>
          </div>

          {/* Funcionários */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-slate-500" />
              <h3 className="font-semibold text-slate-800">Funcionários estimados</h3>
            </div>
            <div className="space-y-2">
              {resultado.funcionarios.map(f => (
                <div key={f.funcao} className="flex justify-between text-sm">
                  <span className="text-slate-600">{f.funcao} <span className="text-slate-400">× {f.quantidade}</span></span>
                  <span className="font-medium text-slate-800">{formatCurrency(f.custoTotal)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm border-t border-slate-100 pt-2 mt-1">
                <span className="font-semibold text-slate-700">Total folha</span>
                <span className="font-bold text-slate-900">{formatCurrency(resultado.folhaPagamento)}</span>
              </div>
            </div>
          </div>

          {/* Breakdown de despesas */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Composição das despesas</h3>
            <div className="space-y-2.5">
              {resultado.itemsDespesa.map(item => (
                <div key={item.categoria}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{item.categoria}</span>
                    <span className="text-slate-700 font-medium">{formatCurrency(item.valor)} · {item.percentual.toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${maxItem > 0 ? (item.valor / maxItem) * 100 : 0}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-green-50 border border-green-100 rounded-2xl p-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900 mb-2">Como usar esta estimativa</h3>
            <ul className="text-sm text-green-800 space-y-1.5 list-disc list-inside">
              <li>Os valores são estimativas baseadas em médias de mercado de 2025/2026 — confirme sempre com a administradora.</li>
              <li><strong>Econômico:</strong> sem porteiro — considera portaria digital, interfone ou acesso gerenciado pelos próprios moradores, como é comum nesses empreendimentos.</li>
              <li><strong>Escala 12×36:</strong> portaria 24h exige 4 porteiros por posto (cada um trabalha 12h e folga 36h, cobrindo dia e noite todos os dias da semana sem deixar o posto descoberto).</li>
              <li>Condomínios alto padrão e luxo incluem vigilante/segurança separado do porteiro, com escala própria.</li>
              <li>Encargos sociais considerados: ~72% sobre o salário-base (INSS patronal, FGTS, férias, 13º salário).</li>
              <li>Salários variam por convenção coletiva de cada município — metrópoles tendem a ser 20–40% mais altos.</li>
            </ul>
          </div>
        </div>
      </div>

      <FaqSection path="/despesas-condominio" />
      <RelatedCalculators path="/despesas-condominio" />
      <RelatedGuides path="/despesas-condominio" />
    </div>
  );
}
