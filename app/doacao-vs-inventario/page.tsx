"use client";

import { useState, useMemo } from "react";
import {
  calcularDoacaoVsInventario,
  ITCMD_UFS,
  type DoacaoVsInventarioInput,
} from "@/lib/calculators";
import { formatCurrency } from "@/lib/format";
import CurrencyInput from "@/components/CurrencyInput";
import { CheckCircle2, Circle, ChevronDown, ChevronUp, TrendingDown, Scale, AlertTriangle } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import RelatedCalculators from "@/components/RelatedCalculators";


// ─── helpers ───────────────────────────────────────────────────────────────

interface SliderRowProps {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}

function SliderRow({ label, hint, value, min, max, step, onChange }: SliderRowProps) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1">
        <label className="text-xs font-medium text-slate-600">{label}</label>
        <span className="text-xs font-bold text-slate-800">{value.toFixed(1)}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-violet-600"
      />
      <p className="text-[10px] text-slate-400 mt-0.5">{hint}</p>
    </div>
  );
}

interface CostRowProps {
  label: string;
  valor: number;
  obrigatorio: boolean;
  nota: string;
  accent?: string;
}

function CostRow({ label, valor, obrigatorio, nota, accent = "text-slate-900" }: CostRowProps) {
  return (
    <div className="py-2.5 border-b border-slate-100 last:border-0">
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-start gap-1.5 min-w-0">
          {obrigatorio
            ? <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
            : <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />}
          <span className="text-sm text-slate-700 leading-snug">{label}</span>
        </div>
        <span className={`text-sm font-semibold shrink-0 ${accent}`}>{formatCurrency(valor)}</span>
      </div>
      <p className="text-[10px] text-slate-400 mt-0.5 ml-5">{nota}</p>
    </div>
  );
}

// ─── component ─────────────────────────────────────────────────────────────

export default function DoacaoVsInventarioPage() {
  const [valorPatrimonio, setValorPatrimonio] = useState(600_000);
  const [uf, setUf] = useState("SP");
  const [modalidade, setModalidade] = useState<"judicial" | "extrajudicial">("extrajudicial");
  const [showParams, setShowParams] = useState(false);

  // parâmetros ajustáveis
  const [percEmolumentosDoacao, setPercEmolumentosDoacao] = useState(0.8);
  const [percHonorariosDoacao, setPercHonorariosDoacao] = useState(1.5);
  const [percRegistroImoveis, setPercRegistroImoveis] = useState(0.5);
  const [percCustasInventario, setPercCustasInventario] = useState(1.5);
  const [percHonorariosInventario, setPercHonorariosInventario] = useState(
    modalidade === "judicial" ? 8 : 3
  );

  const handleModalidade = (m: "judicial" | "extrajudicial") => {
    setModalidade(m);
    setPercHonorariosInventario(m === "judicial" ? 8 : 3);
  };

  const input: DoacaoVsInventarioInput = {
    valorPatrimonio,
    uf,
    modalidadeInventario: modalidade,
    percEmolumentosDoacao,
    percHonorariosDoacao,
    percCustasInventario,
    percHonorariosInventario,
    percRegistroImoveis,
  };

  const r = useMemo(() => calcularDoacaoVsInventario(input), [
    valorPatrimonio, uf, modalidade,
    percEmolumentosDoacao, percHonorariosDoacao,
    percCustasInventario, percHonorariosInventario,
    percRegistroImoveis,
  ]);

  const doacaoCheaper = r.economiaComDoacao > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">Venda &amp; Herança</span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Doação em Vida vs. Inventário</h1>
        <p className="text-slate-500 max-w-2xl">
          Compare o custo total de transmitir o patrimônio por doação agora ou via inventário depois do falecimento —
          incluindo ITCMD, honorários advocatícios, custas processuais e registro de imóveis.
        </p>
      </div>

      <div className="grid md:grid-cols-[340px_1fr] gap-6">
        {/* ── INPUTS ── */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
            <CurrencyInput
              id="patrimonio"
              label="Valor total do patrimônio"
              value={valorPatrimonio}
              onChange={setValorPatrimonio}
              hint="Soma de imóveis, investimentos e demais bens a transferir"
            />

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Estado (UF)</label>
              <select
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                {ITCMD_UFS.map((s) => (
                  <option key={s.uf} value={s.uf}>{s.nome} ({s.uf})</option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Modalidade do inventário</p>
              <div className="grid grid-cols-2 gap-2">
                {(["extrajudicial", "judicial"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => handleModalidade(m)}
                    className={`px-3 py-3 rounded-xl border text-sm font-semibold transition-all text-left ${
                      modalidade === m
                        ? "border-violet-400 bg-violet-50 text-violet-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {m === "extrajudicial" ? "Extrajudicial" : "Judicial"}
                    <p className="text-[10px] font-normal text-slate-400 mt-0.5">
                      {m === "extrajudicial" ? "Cartório — herdeiros concordam" : "Via TJ — com litígio ou menor"}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Parâmetros ajustáveis */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <button
              onClick={() => setShowParams((v) => !v)}
              className="w-full flex items-center justify-between px-6 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>Ajustar percentuais</span>
              {showParams ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showParams && (
              <div className="px-6 pb-6 space-y-5 border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-400">
                  Os percentuais variam por estado, cartório e complexidade. Ajuste conforme o caso real.
                </p>
                <p className="text-[11px] font-semibold text-violet-700 uppercase tracking-wide">Doação em vida</p>
                <SliderRow
                  label="Emolumentos (escritura de doação)"
                  hint="Tabela estadual do cartório — tipicamente 0,5%–1,5%"
                  value={percEmolumentosDoacao}
                  min={0.1} max={2} step={0.1}
                  onChange={setPercEmolumentosDoacao}
                />
                <SliderRow
                  label="Honorários advocatícios (doação)"
                  hint="Opcional mas recomendado — geralmente 1%–3%"
                  value={percHonorariosDoacao}
                  min={0} max={5} step={0.5}
                  onChange={setPercHonorariosDoacao}
                />

                <p className="text-[11px] font-semibold text-violet-700 uppercase tracking-wide pt-1">Inventário</p>
                <SliderRow
                  label={modalidade === "judicial" ? "Custas processuais (TJ)" : "Emolumentos (cartório — inventário)"}
                  hint="Tabela estadual — tipicamente 1%–2% do monte-mor"
                  value={percCustasInventario}
                  min={0.5} max={4} step={0.25}
                  onChange={setPercCustasInventario}
                />
                <SliderRow
                  label="Honorários advocatícios (inventário)"
                  hint={modalidade === "judicial" ? "OAB: 6%–10% judicial" : "OAB: ~3% extrajudicial"}
                  value={percHonorariosInventario}
                  min={1} max={12} step={0.5}
                  onChange={setPercHonorariosInventario}
                />

                <p className="text-[11px] font-semibold text-violet-700 uppercase tracking-wide pt-1">Ambos</p>
                <SliderRow
                  label="Registro de Imóveis"
                  hint="Emolumentos de transferência — tipicamente 0,3%–1%"
                  value={percRegistroImoveis}
                  min={0.1} max={2} step={0.1}
                  onChange={setPercRegistroImoveis}
                />
              </div>
            )}
          </div>
        </div>

        {/* ── RESULTS ── */}
        <div className="space-y-4">
          {/* Economia banner */}
          {doacaoCheaper ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4 flex items-center gap-3">
              <TrendingDown className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-emerald-800">
                  Doação em vida economiza <span className="text-emerald-700">{formatCurrency(r.economiaComDoacao)}</span>
                  {" "}({r.percentualEconomia.toFixed(1)}% a menos)
                </p>
                <p className="text-xs text-emerald-600 mt-0.5">
                  Comparado com inventário {modalidade} — considerando os percentuais configurados
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-sm text-amber-800">
                Com os parâmetros atuais, as opções têm custo semelhante ou o inventário sai mais barato. Ajuste os percentuais conforme o caso real.
              </p>
            </div>
          )}

          {/* Comparison cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Doação */}
            <div className="bg-white rounded-2xl border-2 border-emerald-200 overflow-hidden">
              <div className="bg-emerald-600 px-5 py-3">
                <p className="text-xs font-semibold text-emerald-100 uppercase tracking-wide">Doação em Vida</p>
                <p className="text-2xl font-bold text-white mt-0.5">{formatCurrency(r.doacao.total)}</p>
              </div>
              <div className="px-5 py-3">
                {r.doacao.itens.map((item) => (
                  <CostRow key={item.label} {...item} />
                ))}
                <div className="pt-2 flex justify-between font-bold text-emerald-700 text-sm">
                  <span>Total</span>
                  <span>{formatCurrency(r.doacao.total)}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  {(r.doacao.total / valorPatrimonio * 100).toFixed(1)}% do patrimônio
                </p>
              </div>
            </div>

            {/* Inventário */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden">
              <div className="bg-slate-700 px-5 py-3">
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  Inventário {modalidade === "judicial" ? "Judicial" : "Extrajudicial"}
                </p>
                <p className="text-2xl font-bold text-white mt-0.5">{formatCurrency(r.inventario.total)}</p>
              </div>
              <div className="px-5 py-3">
                {r.inventario.itens.map((item) => (
                  <CostRow key={item.label} {...item} />
                ))}
                <div className="pt-2 flex justify-between font-bold text-slate-700 text-sm">
                  <span>Total</span>
                  <span>{formatCurrency(r.inventario.total)}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  {(r.inventario.total / valorPatrimonio * 100).toFixed(1)}% do patrimônio
                </p>
              </div>
            </div>
          </div>

          {/* Nota ITCMD */}
          <div className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 text-xs text-violet-700">
            <strong>ITCMD:</strong> o imposto é obrigatório em ambos os cenários.
            Em {uf}, a alíquota efetiva para {formatCurrency(valorPatrimonio)} é{" "}
            <strong>{r.aliquotaEfetivaITCMD.toFixed(2)}%</strong> = {formatCurrency(r.itcmd)}.
            A diferença real entre doação e inventário está nos honorários, custas e emolumentos.
          </div>

          {/* Legenda */}
          <div className="flex gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-400" /> Custo obrigatório
            </span>
            <span className="flex items-center gap-1.5">
              <Circle className="w-3.5 h-3.5 text-slate-300" /> Recomendado / opcional
            </span>
          </div>
        </div>
      </div>

      {/* Quando usar cada opção */}
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
          <h3 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
            <Scale className="w-4 h-4" /> Quando a doação em vida faz sentido
          </h3>
          <ul className="text-sm text-emerald-800 space-y-1.5 list-disc list-inside">
            <li>Patrimônio elevado — economia nos honorários do inventário é maior</li>
            <li>Família sem conflitos — processo simples de formalizar</li>
            <li>Doador quer preservar usufruto (pode continuar usando o bem)</li>
            <li>Planejamento tributário antecipado — ITCMD pode aumentar nos próximos anos</li>
            <li>Evitar bloqueio de bens em inventário moroso (pode levar anos)</li>
          </ul>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Scale className="w-4 h-4" /> Quando o inventário pode ser preferível
          </h3>
          <ul className="text-sm text-slate-700 space-y-1.5 list-disc list-inside">
            <li>Doador ainda precisa do bem para sua subsistência</li>
            <li>Há incerteza sobre os herdeiros ou situação patrimonial futura</li>
            <li>Testamento permite distribuição personalizada (não possível na doação simples)</li>
            <li>Patrimônio pequeno — diferença de custo entre as opções é irrelevante</li>
            <li>Questões fiscais complexas que exigem estruturação antes da doação</li>
          </ul>
        </div>
      </div>

      {/* Inventário extrajudicial — requisitos */}
      {modalidade === "extrajudicial" && (
        <div className="mt-4 bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <h3 className="font-semibold text-amber-900 mb-2">Inventário extrajudicial — requisitos obrigatórios</h3>
          <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
            <li>Todos os herdeiros devem ser maiores e capazes</li>
            <li>Não pode haver litígio entre herdeiros</li>
            <li>Não pode haver testamento (salvo se já homologado judicialmente)</li>
            <li>Todos devem estar de acordo com a partilha proposta</li>
            <li>Obrigatória a presença de advogado — é exigência do artigo 610 do CPC</li>
          </ul>
          <p className="text-xs text-amber-700 mt-2">
            Se qualquer uma das condições acima não for atendida, o inventário deverá ser judicial.
          </p>
        </div>
      )}

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <AlertTriangle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          <strong>Valores estimados.</strong> Os percentuais de emolumentos e custas variam por estado e por cartório.
          Honorários advocatícios são negociáveis e dependem da complexidade do caso.
          Consulte um advogado especializado em direito de família e sucessões para uma estimativa precisa.
        </p>
      </div>

      <FaqSection path="/doacao-vs-inventario" />
      <RelatedCalculators path="/doacao-vs-inventario" />
    </div>
  );
}
