export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: Record<string, FaqItem[]> = {
  "/financiamento": [
    {
      q: "Qual a diferença entre SAC e PRICE?",
      a: "No SAC (Sistema de Amortização Constante) a amortização é fixa e os juros diminuem a cada mês, resultando em parcelas decrescentes. No PRICE a parcela é fixa, mas nos primeiros anos você paga quase só juros. O SAC tem parcela inicial mais alta, porém o total pago ao longo do contrato é menor.",
    },
    {
      q: "Qual o percentual máximo da renda para financiar um imóvel?",
      a: "Os bancos limitam a parcela a no máximo 30% da renda familiar bruta. Para uma parcela de R$ 3.000, você precisa comprovar renda de pelo menos R$ 10.000 mensais. Alguns bancos aceitam até 35% para perfis específicos.",
    },
    {
      q: "Posso usar o FGTS como entrada no financiamento?",
      a: "Sim. O FGTS pode ser usado como entrada, para amortização de parcelas ou para quitação do saldo devedor em financiamentos pelo SFH (Sistema Financeiro de Habitação). Para isso, o imóvel deve ser residencial, estar dentro do limite de avaliação do SFH e você não pode ter outro imóvel financiado pelo FGTS.",
    },
    {
      q: "O que é o CET (Custo Efetivo Total)?",
      a: "O CET é a taxa que representa o custo real do financiamento, incluindo além dos juros: seguros obrigatórios (MIP e DFI), IOF, tarifas e outras despesas. É o número que você deve comparar entre bancos, não apenas a taxa nominal de juros.",
    },
    {
      q: "Qual o prazo máximo para financiamento imobiliário no Brasil?",
      a: "O prazo máximo é de 35 anos (420 meses) em alguns bancos, mas a maioria trabalha com 30 anos (360 meses). Existe também um limite de idade: a soma da sua idade com o prazo do financiamento geralmente não pode ultrapassar 80 anos e 6 meses.",
    },
  ],
  "/custos-compra": [
    {
      q: "O que é o ITBI e quem paga?",
      a: "O ITBI (Imposto de Transmissão de Bens Imóveis) é um tributo municipal cobrado toda vez que um imóvel muda de dono por compra e venda. O pagamento é sempre responsabilidade do comprador. As alíquotas variam por município, geralmente entre 2% e 3% do valor do imóvel.",
    },
    {
      q: "Quanto custa em média a escritura e o registro de imóvel?",
      a: "O custo da escritura e do registro varia por estado e é calculado em tabela progressiva sobre o valor do imóvel. Em média, a soma dos dois gira entre 1% e 2% do valor do imóvel. Para imóveis financiados, o contrato bancário substitui a escritura pública e é registrado diretamente em cartório.",
    },
    {
      q: "Qual o total de custos extras esperados na compra?",
      a: "Somando ITBI, escritura, registro e avaliação bancária (no caso de financiamento), o total costuma ficar entre 3% e 6% do valor do imóvel. Por isso é fundamental incluir esses custos no orçamento além do valor de compra e da entrada.",
    },
    {
      q: "O ITBI tem desconto para imóveis financiados?",
      a: "Em muitos municípios, a parcela financiada tem alíquota reduzida — em São Paulo, por exemplo, é de 0,5% sobre o valor financiado contra 3% sobre a entrada. Isso pode representar uma economia expressiva. A calculadora já considera essa regra automaticamente.",
    },
    {
      q: "Preciso pagar ITBI em imóvel herdado ou doado?",
      a: "Não. Em herança e doação, o imposto aplicável é o ITCMD (estadual), não o ITBI (municipal). O ITBI incide exclusivamente em transações onerosas, ou seja, quando há compra e venda com pagamento.",
    },
  ],
  "/reajuste-aluguel": [
    {
      q: "Qual índice é mais usado para reajuste de aluguel no Brasil?",
      a: "Historicamente o IGP-M foi o mais comum, mas após sua alta expressiva em 2020-2021, muitos contratos migraram para o IPCA, que tende a ser mais previsível e próximo da inflação oficial. Hoje é comum contratos com IPCA, especialmente em imóveis residenciais.",
    },
    {
      q: "Com que frequência o aluguel pode ser reajustado?",
      a: "A Lei do Inquilinato (Lei 8.245/91) permite reajuste a cada 12 meses. Qualquer cláusula contratual que preveja reajuste em prazo inferior a um ano é nula de pleno direito.",
    },
    {
      q: "O que acontece se o índice de reajuste for negativo?",
      a: "Se o índice acumulado nos 12 meses for negativo, o aluguel não precisa ser reduzido — a lei não obriga o locador a baixar o valor. A redução só ocorre se o contrato expressamente prevê essa possibilidade, o que é incomum.",
    },
    {
      q: "Proprietário e inquilino podem negociar o índice de reajuste?",
      a: "Sim. O contrato pode prever qualquer índice de inflação reconhecido: IGP-M, IPCA, INPC ou outro, desde que acordado por escrito entre as partes. O índice deve estar definido claramente no contrato antes de ser aplicado.",
    },
    {
      q: "Como calcular o reajuste do aluguel manualmente?",
      a: "Multiplique o valor atual pelo fator de reajuste: se o IPCA acumulado nos últimos 12 meses foi de 5%, o fator é 1,05. Novo aluguel = aluguel atual × (1 + variação%). Nossa calculadora busca os índices atualizados automaticamente do Banco Central do Brasil.",
    },
  ],
  "/ganho-capital": [
    {
      q: "Quando a venda de imóvel é isenta de IR?",
      a: "Há duas isenções principais: (1) venda do único imóvel residencial por valor até R$ 440.000, desde que não tenha vendido outro imóvel nos últimos 5 anos; (2) reinvestimento total do valor recebido na compra de outro imóvel residencial no Brasil em até 180 dias da venda.",
    },
    {
      q: "Qual a alíquota de IR sobre ganho de capital imobiliário?",
      a: "A alíquota é progressiva: 15% sobre ganhos até R$ 5 milhões; 17,5% de R$ 5M a R$ 10M; 20% de R$ 10M a R$ 30M; e 22,5% acima de R$ 30M. Para a maioria das transações residenciais, a alíquota efetiva é de 15%.",
    },
    {
      q: "O que pode ser deduzido para reduzir o ganho de capital?",
      a: "Podem ser somados ao custo de aquisição: reformas e benfeitorias comprovadas por nota fiscal, corretagem paga na compra, ITBI e custos cartorários da aquisição original. Quanto maior o custo comprovado, menor o ganho tributável.",
    },
    {
      q: "Qual o prazo para pagar o DARF do IR sobre ganho de capital?",
      a: "O DARF (código 4600) deve ser pago até o último dia útil do mês seguinte à venda. O atraso gera multa de 0,33% ao dia (máximo 20%) mais juros SELIC. O pagamento é obrigatório mesmo antes da declaração anual do IR.",
    },
    {
      q: "Imóvel herdado ou recebido como doação tem ganho de capital na venda?",
      a: "Sim. O custo de aquisição é o valor declarado no inventário ou na escritura de doação. Se o imóvel foi avaliado abaixo do mercado na transferência, o ganho na venda futura pode ser elevado. Em alguns casos, atualizar o valor no momento da herança/doação (pagando mais ITCMD agora) reduz o IR na venda.",
    },
  ],
  "/quanto-posso-financiar": [
    {
      q: "Quanto da minha renda posso comprometer com parcelas?",
      a: "Os bancos limitam a parcela a no máximo 30% da renda bruta familiar. Para calcular sua parcela máxima, multiplique a renda familiar por 0,30. Com renda de R$ 8.000, sua parcela máxima é de R$ 2.400.",
    },
    {
      q: "Posso somar a renda com outra pessoa para financiar mais?",
      a: "Sim. A composição de renda permite somar rendas de cônjuge, companheiro ou familiares. Todos os participantes serão co-proprietários do imóvel e co-devedores do financiamento, o que é levado em conta na aprovação de crédito.",
    },
    {
      q: "O FGTS pode aumentar meu poder de compra?",
      a: "Sim. O saldo do FGTS pode ser usado como entrada, reduzindo o valor financiado. Com uma entrada maior, você precisa de menor parcela mensal — o que permite financiar um imóvel de valor mais alto com a mesma renda.",
    },
    {
      q: "Renda informal conta para financiamento imobiliário?",
      a: "Depende do banco. Autônomos e MEIs podem comprovar renda via extratos bancários, declaração de IR ou carta do contador. Alguns bancos aceitam renda informal, mas costumam exigir maior entrada e podem aplicar taxas mais altas.",
    },
    {
      q: "Qual a diferença entre financiar pelo SFH e pelo SFI?",
      a: "O SFH cobre imóveis até R$ 1,5 milhão com taxas menores e permite uso do FGTS. O SFI não tem limite de valor, mas as taxas são maiores e o FGTS não pode ser utilizado. A maioria dos compradores de primeiro imóvel se enquadra no SFH.",
    },
  ],
};
