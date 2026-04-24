import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://calculaimovel.com.br";

// Your AdSense publisher ID — set via env var after approval
// https://www.google.com/adsense → Account → Account information → Publisher ID
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

// Ad slot IDs from your AdSense account → Ads → By ad unit
export const ADSENSE_SLOT_HORIZONTAL = process.env.NEXT_PUBLIC_AD_SLOT_HORIZONTAL ?? "";
export const ADSENSE_SLOT_RECTANGLE = process.env.NEXT_PUBLIC_AD_SLOT_RECTANGLE ?? "";

export interface PageMeta {
  title: string;
  description: string;
}

export const pages: Record<string, PageMeta> = {
  "/": {
    title: "CalculaImóvel — Calculadoras Imobiliárias para Brasileiros",
    description:
      "29 calculadoras gratuitas para compra, financiamento, aluguel, reforma e investimento imobiliário no Brasil. Dados atualizados do Banco Central.",
  },
  "/custos-compra": {
    title: "Calculadora de Custos de Compra de Imóvel | ITBI, Escritura e Registro",
    description:
      "Calcule ITBI, escritura, registro e avaliação bancária. Descubra o custo total real da compra do imóvel — não apenas o preço anunciado. Atualizado 2026.",
  },
  "/financiamento": {
    title: "Simulador de Financiamento Imobiliário SAC e PRICE",
    description:
      "Compare SAC vs PRICE com tabelas de parcelas mês a mês, total de juros pago e amortização. Simule diferentes taxas, prazos e valores de entrada.",
  },
  "/quanto-posso-financiar": {
    title: "Quanto Posso Financiar? Calculadora de Poder de Compra Imobiliário",
    description:
      "Descubra quanto de imóvel você pode financiar com sua renda e entrada disponível. Calcula a parcela máxima pelo comprometimento de 30% da renda.",
  },
  "/amortizacao-extra": {
    title: "Calculadora de Amortização Extraordinária | Economize Juros no Financiamento",
    description:
      "Simule quanto você economiza em juros e quantos meses corta do financiamento pagando parcelas extras mensais ou um valor único de amortização.",
  },
  "/portabilidade": {
    title: "Portabilidade de Financiamento Imobiliário | Vale a Pena Mudar de Banco?",
    description:
      "Calcule a economia real da portabilidade de crédito imobiliário, descontando custos de transferência, avaliação e registro do novo contrato.",
  },
  "/fgts": {
    title: "Simulador de FGTS para Compra de Imóvel | Projeção de Saldo",
    description:
      "Projete o saldo do FGTS na data da compra e descubra quanto pode usar como entrada, amortização de parcelas ou quitação do financiamento.",
  },
  "/custo-mudanca": {
    title: "Calculadora de Custo de Mudança | Estimativa de Frete por Cômodos",
    description:
      "Estime o custo do frete de mudança por número de cômodos, distância e tipo de serviço (completo, básico, carga). Preços de mercado 2026.",
  },
  "/mcmv": {
    title: "Simulador Minha Casa Minha Vida 2026 | Faixa, Subsídio e Parcela",
    description:
      "Descubra sua faixa de renda no MCMV, o subsídio estimado e a parcela com as taxas preferenciais do programa habitacional federal em 2026.",
  },
  "/poupanca-entrada": {
    title: "Calculadora de Poupança para Entrada de Imóvel | Quanto Guardar por Mês",
    description:
      "Calcule o aporte mensal necessário para juntar a entrada do imóvel no prazo desejado. Compare rendimentos: poupança, CDB, LCI/LCA e Tesouro.",
  },
  "/consorcio": {
    title: "Consórcio vs Financiamento Imobiliário | Comparativo de Custo Total",
    description:
      "Compare o custo total de consórcio e financiamento imobiliário: economia no consórcio vs acesso imediato no financiamento. Simule seu cenário.",
  },
  "/planta-vs-pronto": {
    title: "Imóvel na Planta vs Pronto | Calculadora de Custo e Risco",
    description:
      "Compare custo total de imóvel na planta (com correção INCC e risco de atraso) versus um imóvel pronto equivalente. Inclui cenário de atraso.",
  },
  "/distrato": {
    title: "Calculadora de Distrato de Imóvel na Planta | Lei 13.786/2018",
    description:
      "Calcule quanto você vai receber de volta ao desfazer a compra de um imóvel na planta, com base na Lei do Distrato. Inclui patrimônio de afetação.",
  },
  "/comprar-ou-alugar": {
    title: "Comprar ou Alugar Imóvel? | Comparativo Patrimonial",
    description:
      "Compare os dois caminhos considerando valorização do imóvel, juros do financiamento, rendimento do investimento e custo de oportunidade do capital.",
  },
  "/reajuste-aluguel": {
    title: "Calculadora de Reajuste de Aluguel | IGP-M, IPCA e INPC Atualizados",
    description:
      "Calcule o novo valor do aluguel pelo IGP-M, IPCA, INPC ou índice personalizado. Dados atualizados automaticamente do Banco Central do Brasil.",
  },
  "/tributacao-aluguel": {
    title: "Calculadora de Tributação do Aluguel | Carnê-Leão IRPF 2026",
    description:
      "Calcule o IR mensal (carnê-leão) sobre renda de aluguel com deduções de IPTU, condomínio e seguro. Tabela progressiva IRPF 2026 — inclui isenção até R$ 5.000.",
  },
  "/rescisao-aluguel": {
    title: "Calculadora de Multa por Rescisão Antecipada de Aluguel | Lei do Inquilinato",
    description:
      "Calcule a multa de rescisão proporcional ao tempo restante do contrato, com isenção automática por transferência de trabalho conforme a Lei 8.245/91.",
  },
  "/quanto-cobrar-aluguel": {
    title: "Quanto Cobrar de Aluguel? | Calculadora de Cap Rate e Retorno",
    description:
      "Defina o aluguel mínimo para atingir seu retorno alvo. Compara com benchmarks de cap rate ao vivo e taxa Selic do Banco Central.",
  },
  "/seguro-fianca": {
    title: "Seguro Fiança vs Caução vs Fiador | Comparativo de Garantias Locatícias",
    description:
      "Compare o custo real de seguro fiança, caução em dinheiro, título de capitalização e fiador. Descubra a garantia mais vantajosa para locador e inquilino.",
  },
  "/estimativa-reforma": {
    title: "Calculadora de Estimativa de Reforma de Imóvel | Custo por m²",
    description:
      "Estime o custo de reforma por cômodo, tipo de obra (pintura, acabamento, completa) e padrão de material. Inclui área externa e serviços de instalação.",
  },
  "/retorno-reforma": {
    title: "Calculadora de Retorno da Reforma antes da Venda | ROI da Obra",
    description:
      "Vale a pena reformar antes de vender? Calcule o ROI da reforma comparado com o custo de oportunidade de manter o capital investido.",
  },
  "/ganho-capital": {
    title: "Calculadora de Ganho de Capital na Venda de Imóvel | IR 2026",
    description:
      "Calcule o IR sobre ganho de capital na venda do imóvel com isenções (imóvel único até R$ 440k, reinvestimento), fatores de redução e DARF.",
  },
  "/lucro-venda": {
    title: "Calculadora de Lucro Líquido na Venda de Imóvel",
    description:
      "Calcule o lucro real da venda do imóvel após deduzir custo de compra, reformas e melhorias, corretagem, ITBI original e IR sobre ganho de capital.",
  },
  "/itcmd": {
    title: "Calculadora de ITCMD | Herança e Doação de Imóvel em Todos os Estados",
    description:
      "Calcule o ITCMD sobre imóveis herdados ou doados em todos os 27 estados brasileiros. Alíquotas estaduais atualizadas e progressividade automática.",
  },
  "/doacao-vs-inventario": {
    title: "Doação em Vida vs Inventário | Compare Custos Totais de Transmissão de Bens",
    description:
      "Compare o custo total de transmitir seu patrimônio por doação agora ou via inventário: ITCMD, honorários advocatícios, custas processuais e emolumentos de cartório.",
  },
  "/imovel-vs-renda-fixa": {
    title: "Imóvel vs Renda Fixa | CDI e Selic vs Aluguel | Comparativo de Retorno",
    description:
      "Compare o retorno total do imóvel para aluguel com o mesmo capital investido em CDI, Selic ou Tesouro ao longo dos anos. Com custo de oportunidade.",
  },
  "/tir-imovel": {
    title: "TIR do Investimento Imobiliário | Taxa Interna de Retorno Real",
    description:
      "Calcule a TIR real do imóvel considerando financiamento, aluguel com vacância, despesas mensais e venda no horizonte definido. Gráfico de fluxo de caixa.",
  },
  "/cap-rate": {
    title: "Cap Rate Imobiliário | Calculadora de Rentabilidade Líquida do Imóvel",
    description:
      "Calcule o cap rate (retorno) real do imóvel alugado com desconto de vacância, IPTU, condomínio e manutenção. Compara com a Selic ao vivo.",
  },
  "/fii-vs-imovel": {
    title: "FII vs Imóvel Físico | Dividendos vs Aluguel | Qual Rende Mais?",
    description:
      "Compare crescimento patrimonial de fundos imobiliários (dividend yield) versus imóvel direto com aluguel no mesmo horizonte de investimento.",
  },
  "/airbnb-vs-aluguel": {
    title: "Airbnb vs Aluguel Convencional | Análise de Receita e Break-even",
    description:
      "Compare receita de temporada (Airbnb) com aluguel fixo. Calcula break-even de ocupação, custos de plataforma e análise de sensibilidade por taxa.",
  },
  "/leilao-imovel": {
    title: "Calculadora de Leilão de Imóvel | Custo Real do Arremate",
    description:
      "Calcule o custo real de comprar imóvel em leilão: valor do arremate, comissão do leiloeiro, ITBI, dívidas condominiais e reforma estimada.",
  },
  "/comparador-financiamento": {
    title: "Comparador de Financiamentos Imobiliários | SAC vs PRICE lado a lado",
    description:
      "Compare dois financiamentos imobiliários — taxas, sistemas de amortização, parcela inicial e custo total real. Descubra qual banco cobra menos.",
  },
  "/renegociacao-financiamento": {
    title: "Simulador de Renegociação de Financiamento | Vale a Pena Reduzir a Taxa?",
    description:
      "Calcule a economia real de reduzir a taxa do seu financiamento imobiliário, descontando os custos de renegociação. Inclui breakeven e gráfico de economia acumulada.",
  },
  "/fluxo-caixa-imovel": {
    title: "Fluxo de Caixa do Proprietário | Yield Líquido do Imóvel Alugado",
    description:
      "Visão anual de receitas, despesas e IR do imóvel alugado com reajuste projetado, vacância e carnê-leão progressivo. Calcule o yield líquido real.",
  },
  "/permuta-imovel": {
    title: "Calculadora de Permuta de Imóvel | Torna e Custos da Operação",
    description:
      "Calcule a torna, ITBI, cartório e IR na permuta de imóveis. Compare com o custo de vender e comprar separado e descubra quanto a permuta economiza.",
  },
  "/noticias": {
    title: "Notícias do Mercado Imobiliário | CalculaImóvel",
    description:
      "Acompanhe as últimas notícias do mercado imobiliário brasileiro: preços, financiamento, Selic, MCMV, aluguel e tendências. Atualizado regularmente.",
  },
};

export function buildMetadata(path: string): Metadata {
  const page = pages[path];
  if (!page) return {};
  const { title, description } = page;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      type: "website",
      locale: "pt_BR",
      siteName: "CalculaImóvel",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
