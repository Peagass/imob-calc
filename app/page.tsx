import Link from "next/link";
import {
  Calculator, TrendingUp, ArrowLeftRight, BarChart3, Percent, Home, PiggyBank,
  Zap, RefreshCw, Palmtree, Scale, Truck, Landmark, Target, Shield, Hammer,
  Wrench, Receipt, FileText, LineChart, PieChart, Gavel, Building2, Coins, ArrowRightLeft,
  GitMerge, TrendingDown, Undo2, SlidersHorizontal, RefreshCcw, Wallet, Repeat,
} from "lucide-react";

const categorias = [
  {
    titulo: "Compra",
    cor: "blue",
    items: [
      {
        href: "/custos-compra",
        icon: Calculator,
        titulo: "Custos Totais da Compra",
        descricao: "ITBI, escritura, registro e avaliação bancária — o valor real que você vai desembolsar.",
        destaque: true,
      },
      {
        href: "/mcmv",
        icon: Building2,
        titulo: "Minha Casa Minha Vida",
        descricao: "Descubra sua faixa, o subsídio estimado e a parcela com as taxas preferenciais do programa federal.",
      },
      {
        href: "/financiamento",
        icon: BarChart3,
        titulo: "Simulador de Financiamento",
        descricao: "Compare SAC vs. PRICE, parcelas mês a mês e total de juros no contrato.",
      },
      {
        href: "/poupanca-entrada",
        icon: Coins,
        titulo: "Poupança para a Entrada",
        descricao: "Quanto guardar por mês para juntar a entrada no prazo desejado? Com gráfico de evolução.",
      },
      {
        href: "/quanto-posso-financiar",
        icon: PiggyBank,
        titulo: "Quanto Posso Financiar?",
        descricao: "Informe sua renda e entrada disponível para descobrir seu poder de compra real.",
      },
      {
        href: "/planta-vs-pronto",
        icon: GitMerge,
        titulo: "Imóvel na Planta vs. Pronto",
        descricao: "Compare custo total, risco de atraso e correção pelo INCC para decidir qual opção compensa.",
      },
      {
        href: "/fgts",
        icon: Landmark,
        titulo: "Simulador de FGTS",
        descricao: "Projete o saldo do seu FGTS e descubra quanto pode usar como entrada na compra do imóvel.",
      },
      {
        href: "/amortizacao-extra",
        icon: Zap,
        titulo: "Amortização Extraordinária",
        descricao: "Pague um valor a mais por mês ou uma parcela única e veja quanto economiza de juros e tempo.",
      },
      {
        href: "/portabilidade",
        icon: RefreshCw,
        titulo: "Portabilidade de Financiamento",
        descricao: "Vale a pena mudar de banco? Calcule a economia real após os custos da portabilidade.",
      },
      {
        href: "/consorcio",
        icon: ArrowRightLeft,
        titulo: "Consórcio vs. Financiamento",
        descricao: "Compare o custo total de cada modalidade: sem juros no consórcio vs. acesso imediato no financiamento.",
      },
      {
        href: "/comparador-financiamento",
        icon: SlidersHorizontal,
        titulo: "Comparador de Financiamentos",
        descricao: "Compare dois bancos lado a lado — taxas, sistemas SAC/PRICE e custo total real do contrato.",
      },
      {
        href: "/renegociacao-financiamento",
        icon: RefreshCcw,
        titulo: "Renegociação de Financiamento",
        descricao: "Calcule a economia real de reduzir sua taxa atual, descontando os custos de renegociação e breakeven.",
      },
      {
        href: "/distrato",
        icon: Undo2,
        titulo: "Distrato de Imóvel na Planta",
        descricao: "Calcule quanto você vai receber de volta ao desfazer a compra — com base na Lei 13.786/2018.",
      },
      {
        href: "/custo-mudanca",
        icon: Truck,
        titulo: "Custo de Mudança",
        descricao: "Estime o frete por cômodos, distância e tipo de serviço — com tabela de preços do mercado.",
      },
    ],
  },
  {
    titulo: "Aluguel",
    cor: "amber",
    items: [
      {
        href: "/comprar-ou-alugar",
        icon: ArrowLeftRight,
        titulo: "Comprar ou Alugar?",
        descricao: "Comparativo patrimonial dos dois caminhos considerando juros, valorização e custo de oportunidade.",
        destaque: true,
      },
      {
        href: "/reajuste-aluguel",
        icon: TrendingUp,
        titulo: "Reajuste de Aluguel",
        descricao: "Calcule o novo valor pelo IGP-M, IPCA ou qualquer índice — dados atualizados do Banco Central.",
      },
      {
        href: "/tributacao-aluguel",
        icon: Receipt,
        titulo: "Tributação do Aluguel (Carnê-Leão)",
        descricao: "Calcule o IR mensal sobre renda de aluguel com as deduções de IPTU, condomínio e seguro.",
      },
      {
        href: "/rescisao-aluguel",
        icon: Scale,
        titulo: "Multa por Rescisão Antecipada",
        descricao: "Calcule a multa proporcional conforme a Lei do Inquilinato, com isenção por transferência de trabalho.",
      },
      {
        href: "/quanto-cobrar-aluguel",
        icon: Target,
        titulo: "Quanto Cobrar de Aluguel?",
        descricao: "Defina o aluguel mínimo para atingir seu retorno alvo, com benchmarks de cap rate ao vivo.",
      },
      {
        href: "/fluxo-caixa-imovel",
        icon: Wallet,
        titulo: "Fluxo de Caixa do Proprietário",
        descricao: "Visão anual de receitas, despesas e IR do imóvel alugado, com reajuste projetado e yield líquido.",
      },
      {
        href: "/seguro-fianca",
        icon: Shield,
        titulo: "Seguro Fiança vs. Caução vs. Fiador",
        descricao: "Compare o custo real de cada modalidade de garantia locatícia e escolha a mais vantajosa.",
      },
    ],
  },
  {
    titulo: "Reforma",
    cor: "orange",
    items: [
      {
        href: "/estimativa-reforma",
        icon: Hammer,
        titulo: "Estimativa de Reforma",
        descricao: "Estime o custo por m², tipo de obra e padrão — de pintura até reforma completa.",
        destaque: true,
      },
      {
        href: "/retorno-reforma",
        icon: Wrench,
        titulo: "Retorno da Reforma antes da Venda",
        descricao: "Vale a pena reformar antes de vender? Calcule o ROI da obra vs. o custo de oportunidade.",
      },
    ],
  },
  {
    titulo: "Venda & Herança",
    cor: "violet",
    items: [
      {
        href: "/ganho-capital",
        icon: Home,
        titulo: "Ganho de Capital e IR na Venda",
        descricao: "Imposto devido na venda com isenções, fatores de redução e reinvestimento.",
        destaque: true,
      },
      {
        href: "/lucro-venda",
        icon: Receipt,
        titulo: "Lucro Líquido na Venda",
        descricao: "Calcule o lucro real após deduzir compra, melhorias, corretagem e outros custos.",
      },
      {
        href: "/itcmd",
        icon: FileText,
        titulo: "ITCMD — Herança e Doação",
        descricao: "Calcule o imposto estadual sobre transmissão de imóveis por herança ou doação em todos os estados.",
      },
      {
        href: "/permuta-imovel",
        icon: Repeat,
        titulo: "Permuta de Imóvel",
        descricao: "Calcule a torna, ITBI, IR e custos totais da permuta. Compare com vender e comprar separado.",
      },
    ],
  },
  {
    titulo: "Investimento",
    cor: "teal",
    items: [
      {
        href: "/imovel-vs-renda-fixa",
        icon: LineChart,
        titulo: "Imóvel vs. Renda Fixa",
        descricao: "Compare o retorno do imóvel para aluguel com o mesmo capital investido em CDI/Selic.",
        destaque: true,
      },
      {
        href: "/tir-imovel",
        icon: TrendingDown,
        titulo: "TIR do Investimento Imobiliário",
        descricao: "Taxa Interna de Retorno real do imóvel, considerando financiamento, aluguel e venda no horizonte definido.",
      },
      {
        href: "/cap-rate",
        icon: Percent,
        titulo: "Cap Rate — Rentabilidade",
        descricao: "Retorno real do imóvel alugado com desconto de vacância e despesas, comparado à Selic ao vivo.",
      },
      {
        href: "/fii-vs-imovel",
        icon: PieChart,
        titulo: "FII vs. Imóvel Físico",
        descricao: "Dividend yield de FIIs vs. aluguel direto: qual cresce mais o patrimônio no mesmo horizonte?",
      },
      {
        href: "/airbnb-vs-aluguel",
        icon: Palmtree,
        titulo: "Airbnb vs. Aluguel Convencional",
        descricao: "Compare receita de temporada com aluguel fixo. Inclui break-even de ocupação e análise de sensibilidade.",
      },
      {
        href: "/leilao-imovel",
        icon: Gavel,
        titulo: "Leilão de Imóvel",
        descricao: "Calcule o custo real do arremate: ITBI, comissão, dívidas assumidas, reforma e cartório.",
      },
    ],
  },
];

const corMap: Record<string, { badge: string; destaqueCard: string; hover: string }> = {
  blue:   { badge: "bg-blue-50 text-blue-700",     destaqueCard: "border-blue-200 bg-blue-50/40",    hover: "group-hover:text-blue-700" },
  amber:  { badge: "bg-amber-50 text-amber-700",    destaqueCard: "border-amber-200 bg-amber-50/40",   hover: "group-hover:text-amber-700" },
  orange: { badge: "bg-orange-50 text-orange-700",  destaqueCard: "border-orange-200 bg-orange-50/40", hover: "group-hover:text-orange-700" },
  violet: { badge: "bg-violet-50 text-violet-700",  destaqueCard: "border-violet-200 bg-violet-50/40", hover: "group-hover:text-violet-700" },
  teal:   { badge: "bg-teal-50 text-teal-700",      destaqueCard: "border-teal-200 bg-teal-50/40",     hover: "group-hover:text-teal-700" },
};

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-14">
        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
          33 calculadoras · 100% gratuito
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
          Calculadoras para cada<br />
          <span className="text-blue-600">decisão imobiliária</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Ferramentas práticas para brasileiros que querem entender os números antes de comprar, vender ou alugar.
        </p>
      </div>

      {/* Categorias */}
      <div className="space-y-10">
        {categorias.map((cat) => {
          const cores = corMap[cat.cor];
          return (
            <div key={cat.titulo}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide shrink-0 ${cores.badge}`}>
                  {cat.titulo}
                </span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {cat.items.map((c) => {
                  const Icon = c.icon;
                  return (
                    <Link
                      key={c.href}
                      href={c.href}
                      className={`group relative bg-white rounded-2xl border p-5 hover:shadow-md transition-all duration-200 ${
                        c.destaque ? `md:col-span-2 ${cores.destaqueCard}` : "border-slate-100"
                      }`}
                    >
                      {c.destaque && (
                        <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          Mais usado
                        </span>
                      )}
                      <div className="flex items-start gap-4">
                        <div className="bg-slate-50 p-2.5 rounded-xl shrink-0 group-hover:bg-white transition-colors">
                          <Icon className="w-5 h-5 text-slate-500" strokeWidth={1.8} />
                        </div>
                        <div>
                          <h2 className={`text-base font-bold text-slate-900 mb-1 transition-colors ${cores.hover}`}>
                            {c.titulo}
                          </h2>
                          <p className="text-slate-500 text-sm leading-relaxed">{c.descricao}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Índices atualizados automaticamente</h2>
        <p className="text-blue-100 text-sm max-w-md mx-auto">
          Selic, IGP-M, IPCA e INPC são atualizados periodicamente. Os valores podem conter defasagem ou erros — sempre confirme antes de tomar decisões.
        </p>
      </div>
    </div>
  );
}
