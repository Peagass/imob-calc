"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";

interface CalcEntry {
  href: string;
  titulo: string;
  categoria: string;
  keywords: string;
}

const calcIndex: CalcEntry[] = [
  { href: "/custos-compra", titulo: "Custos Totais da Compra", categoria: "Compra", keywords: "itbi escritura registro avaliação bancária taxa cartório quanto custa comprar imóvel impostos" },
  { href: "/financiamento", titulo: "Simulador de Financiamento", categoria: "Compra", keywords: "sac price parcela juros banco crédito imobiliário simulador tabela amortização" },
  { href: "/quanto-posso-financiar", titulo: "Quanto Posso Financiar?", categoria: "Compra", keywords: "poder compra renda limite máximo crédito comprometimento salário" },
  { href: "/amortizacao-extra", titulo: "Amortização Extraordinária", categoria: "Compra", keywords: "pagar a mais adiantar parcela economizar juros quitar mais rápido abater saldo devedor" },
  { href: "/portabilidade", titulo: "Portabilidade de Financiamento", categoria: "Compra", keywords: "mudar banco taxa melhor trocar financiamento reduzir juros transferência" },
  { href: "/fgts", titulo: "Simulador de FGTS", categoria: "Compra", keywords: "saldo fundo garantia tempo serviço usar entrada abatimento compra" },
  { href: "/mcmv", titulo: "Minha Casa Minha Vida", categoria: "Compra", keywords: "subsídio faixa governo habitação popular programa federal caixa econômica" },
  { href: "/poupanca-entrada", titulo: "Poupança para a Entrada", categoria: "Compra", keywords: "juntar dinheiro guardar entrada meta cdb lci lca tesouro prazo objetivo" },
  { href: "/consorcio", titulo: "Consórcio vs. Financiamento", categoria: "Compra", keywords: "carta crédito taxa administração sem juros comparar qual melhor" },
  { href: "/planta-vs-pronto", titulo: "Imóvel na Planta vs. Pronto", categoria: "Compra", keywords: "incc lançamento construção atraso entrega correção risco incorporadora" },
  { href: "/distrato", titulo: "Distrato de Imóvel na Planta", categoria: "Compra", keywords: "desistir cancelar contrato devolver lei 13786 multa restituição" },
  { href: "/custo-mudanca", titulo: "Custo de Mudança", categoria: "Compra", keywords: "frete mudança caminhão transportadora cômodos distância quanto pagar" },
  { href: "/comparador-financiamento", titulo: "Comparador de Financiamentos", categoria: "Compra", keywords: "comparar bancos lado a lado melhor taxa custo total cet" },
  { href: "/renegociacao-financiamento", titulo: "Renegociação de Financiamento", categoria: "Compra", keywords: "reduzir taxa renegociar banco economia breakeven vale a pena" },
  { href: "/comprar-ou-alugar", titulo: "Comprar ou Alugar?", categoria: "Aluguel", keywords: "decisão vale a pena comprar melhor alugar patrimônio custo oportunidade" },
  { href: "/reajuste-aluguel", titulo: "Reajuste de Aluguel", categoria: "Aluguel", keywords: "igpm ipca inpc índice novo valor contrato aniversário atualização reajustar" },
  { href: "/tributacao-aluguel", titulo: "Tributação do Aluguel", categoria: "Aluguel", keywords: "carnê leão imposto renda ir mensal irpf renda aluguel declarar" },
  { href: "/rescisao-aluguel", titulo: "Multa por Rescisão Antecipada", categoria: "Aluguel", keywords: "sair antes contrato multa rescisão proporcional lei inquilinato quebrar" },
  { href: "/quanto-cobrar-aluguel", titulo: "Quanto Cobrar de Aluguel?", categoria: "Aluguel", keywords: "valor aluguel justo retorno cap rate rendimento definir preço cobrar" },
  { href: "/fluxo-caixa-imovel", titulo: "Fluxo de Caixa do Proprietário", categoria: "Aluguel", keywords: "receita despesa yield líquido anual vacância iptu condomínio ir proprietário" },
  { href: "/seguro-fianca", titulo: "Seguro Fiança vs. Caução vs. Fiador", categoria: "Aluguel", keywords: "garantia locatícia caução depósito fiador título capitalização locação" },
  { href: "/estimativa-reforma", titulo: "Estimativa de Reforma", categoria: "Reforma", keywords: "quanto custa reformar obra banheiro cozinha piso pintura acabamento m2" },
  { href: "/retorno-reforma", titulo: "Retorno da Reforma antes da Venda", categoria: "Reforma", keywords: "roi obra venda valorizar reformar antes vender vale a pena custo" },
  { href: "/ganho-capital", titulo: "Ganho de Capital e IR na Venda", categoria: "Venda", keywords: "imposto vender imóvel lucro ir 15% isenção único bem reinvestimento darf" },
  { href: "/lucro-venda", titulo: "Lucro Líquido na Venda", categoria: "Venda", keywords: "lucro real venda corretagem custo compra melhorias quanto sobra" },
  { href: "/itcmd", titulo: "ITCMD — Herança e Doação", categoria: "Herança", keywords: "herança inventário doação imposto estado transmissão morte falecimento" },
  { href: "/doacao-vs-inventario", titulo: "Doação em Vida vs. Inventário", categoria: "Herança", keywords: "planejamento sucessório transmitir patrimônio filhos antes depois morte holding" },
  { href: "/permuta-imovel", titulo: "Permuta de Imóvel", categoria: "Venda", keywords: "trocar imóvel torna troca compra venda simultânea custo imposto" },
  { href: "/cap-rate", titulo: "Cap Rate — Rentabilidade", categoria: "Investimento", keywords: "rentabilidade aluguel retorno investimento imóvel porcentagem renda passiva" },
  { href: "/imovel-vs-renda-fixa", titulo: "Imóvel vs. Renda Fixa", categoria: "Investimento", keywords: "comparar cdi selic tesouro investir aluguel versus aplicação financeira" },
  { href: "/tir-imovel", titulo: "TIR do Investimento Imobiliário", categoria: "Investimento", keywords: "taxa interna retorno fluxo caixa horizonte venda financiamento real" },
  { href: "/fii-vs-imovel", titulo: "FII vs. Imóvel Físico", categoria: "Investimento", keywords: "fundo imobiliário fii dividendo aluguel crescimento patrimônio comparar" },
  { href: "/airbnb-vs-aluguel", titulo: "Airbnb vs. Aluguel Convencional", categoria: "Investimento", keywords: "temporada short stay ocupação diária versus contrato longo prazo breakeven" },
  { href: "/leilao-imovel", titulo: "Leilão de Imóvel", categoria: "Investimento", keywords: "arremate lance custo real comissão leiloeiro dívida condomínio itbi barato" },
  { href: "/despesas-condominio", titulo: "Despesas do Condomínio", categoria: "Condomínio", keywords: "taxa condomínio funcionários síndico manutenção seguro administradora mensal" },
  { href: "/rateio-condominio", titulo: "Rateio por Unidade", categoria: "Condomínio", keywords: "quanto pago fração ideal igualitário área proporcional critério cota parte" },
  { href: "/fundo-reserva-condominio", titulo: "Fundo de Reserva", categoria: "Condomínio", keywords: "reserva obra emergência meses meta planejamento condomínio percentual" },
  { href: "/consumo-energia", titulo: "Consumo de Energia Elétrica", categoria: "Custos", keywords: "conta luz kwh ar condicionado chuveiro geladeira bandeira tarifária" },
  { href: "/consumo-agua", titulo: "Consumo de Água", categoria: "Custos", keywords: "conta água m3 banho descarga máquina lavar hidrômetro média brasileira" },
  { href: "/consumo-gas", titulo: "Consumo de Gás", categoria: "Custos", keywords: "botijão p13 glp gás natural fogão aquecedor quanto dura cilindro" },
];

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function searchCalcs(query: string): CalcEntry[] {
  if (!query.trim()) return [];
  const words = normalize(query).split(/\s+/).filter((w) => w.length >= 2);
  if (!words.length) return [];

  return calcIndex
    .map((item) => {
      const titleNorm = normalize(item.titulo);
      const haystack = normalize(`${item.titulo} ${item.keywords} ${item.categoria}`);
      const score = words.reduce((acc, word) => {
        if (titleNorm.includes(word)) return acc + 4;
        if (normalize(item.categoria).includes(word)) return acc + 2;
        if (haystack.includes(word)) return acc + 1;
        return acc;
      }, 0);
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

const categoriaColor: Record<string, string> = {
  Compra: "bg-blue-50 text-blue-700",
  Aluguel: "bg-amber-50 text-amber-700",
  Reforma: "bg-orange-50 text-orange-700",
  Venda: "bg-violet-50 text-violet-700",
  Herança: "bg-violet-50 text-violet-700",
  Investimento: "bg-teal-50 text-teal-700",
  Condomínio: "bg-green-50 text-green-700",
  Custos: "bg-green-50 text-green-700",
};

export default function SearchCalculadoras() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchCalcs(query);

  const close = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      close();
      setQuery("");
      router.push(href);
    },
    [close, router]
  );

  useEffect(() => {
    setOpen(query.length >= 2);
    setActiveIndex(-1);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      navigate(results[activeIndex].href);
    } else if (e.key === "Escape") {
      close();
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setOpen(true)}
          placeholder="Buscar calculadora... ex: reajuste aluguel, FGTS, leilão"
          className="w-full pl-11 pr-10 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          aria-label="Buscar calculadora"
          aria-expanded={open}
          aria-autocomplete="list"
          role="combobox"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label="Limpar busca"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden z-50">
          {results.length > 0 ? (
            <ul role="listbox">
              {results.map((item, i) => (
                <li key={item.href} role="option" aria-selected={i === activeIndex}>
                  <button
                    onClick={() => navigate(item.href)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between gap-3 transition-colors ${
                      i === activeIndex ? "bg-slate-50" : "hover:bg-slate-50"
                    } ${i > 0 ? "border-t border-slate-100" : ""}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${categoriaColor[item.categoria] ?? "bg-slate-50 text-slate-600"}`}>
                        {item.categoria}
                      </span>
                      <span className="text-sm font-medium text-slate-900 truncate">{item.titulo}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-4 text-sm text-slate-500 text-center">
              Nenhuma calculadora encontrada para &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
