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

  "/amortizacao-extra": [
    {
      q: "Vale mais a pena amortizar reduzindo o prazo ou a parcela?",
      a: "Reduzir o prazo é matematicamente mais vantajoso: você paga menos juros no total porque encurta o tempo em que o saldo devedor fica exposto à taxa. Reduzir a parcela é mais indicado se você precisa de alívio no fluxo de caixa mensal.",
    },
    {
      q: "Posso usar o FGTS para amortização extraordinária?",
      a: "Sim. O FGTS pode ser usado para amortização ou quitação do saldo devedor em financiamentos pelo SFH, a cada 2 anos. O saldo deve ser maior que 10% do valor da prestação e você não pode ter outro financiamento ativo pelo FGTS.",
    },
    {
      q: "Existe valor mínimo para fazer uma amortização extra?",
      a: "Cada banco define seu próprio valor mínimo — geralmente equivalente a uma ou algumas parcelas. Consulte o extrato do financiamento ou o aplicativo do banco para verificar o mínimo aceito antes de solicitar a amortização.",
    },
    {
      q: "A amortização extra reduz automaticamente os juros futuros?",
      a: "Sim. Como os juros são calculados sobre o saldo devedor, qualquer redução no principal diminui os juros de todas as parcelas seguintes. Quanto mais cedo no contrato você amortizar, maior é o impacto na economia total.",
    },
    {
      q: "É melhor amortizar todo mês ou acumular e fazer uma amortização maior?",
      a: "Amortizar com mais frequência é melhor, pois cada dia a menos com saldo devedor alto representa menos juros. Se o banco cobra taxa administrativa por amortização, verifique se o custo compensa — mas em geral não cobra.",
    },
  ],

  "/portabilidade": [
    {
      q: "O que é portabilidade de crédito imobiliário?",
      a: "Portabilidade é a transferência do seu financiamento imobiliário de um banco para outro que ofereça taxa de juros menor. O novo banco quita a dívida com o banco atual e você passa a pagar ao novo banco nas condições negociadas, mantendo o mesmo prazo restante.",
    },
    {
      q: "Quais custos tenho ao fazer portabilidade de financiamento?",
      a: "Os principais custos são: avaliação do imóvel pelo novo banco (R$ 800 a R$ 3.500), novo registro de alienação fiduciária em cartório (0,1% a 0,3% do saldo devedor) e eventual IOF. O novo banco muitas vezes absorve parte desses custos para fechar o negócio.",
    },
    {
      q: "O banco atual pode me oferecer condições melhores para não perder o cliente?",
      a: "Sim, e é uma estratégia válida. Ao receber uma proposta do banco concorrente, apresente ao seu banco atual — muitos fazem contraoferta (renegociação interna) para reter o cliente, sem necessidade de portabilidade formal e com menos burocracia.",
    },
    {
      q: "Posso fazer portabilidade quantas vezes quiser?",
      a: "Sim. Não há limite legal para o número de portabilidades. Você pode migrar sempre que encontrar uma taxa mais vantajosa e os custos da operação compensarem a economia gerada. Analise sempre o breakeven para garantir que vale a pena.",
    },
    {
      q: "Quanto tempo demora o processo de portabilidade?",
      a: "O prazo legal é de até 30 dias úteis após a solicitação ao novo banco, mas na prática pode levar de 45 a 90 dias. Durante o processo você continua pagando ao banco atual normalmente.",
    },
  ],

  "/fgts": [
    {
      q: "Quais as condições para usar o FGTS na compra de imóvel?",
      a: "Para usar o FGTS você precisa: ter no mínimo 3 anos de trabalho sob regime do FGTS (seguidos ou não), não possuir imóvel residencial urbano no município onde trabalha ou mora, e o imóvel deve ser residencial urbano enquadrado no SFH.",
    },
    {
      q: "Posso usar o FGTS de mais de uma conta?",
      a: "Sim. Se você trabalhou em diferentes empresas e tem saldo em múltiplas contas do FGTS, todos os saldos podem ser somados para a compra. Basta informar ao banco todos os números de NIS/PIS vinculados às suas contas.",
    },
    {
      q: "Com que frequência posso usar o FGTS para amortizar o financiamento?",
      a: "Você pode usar o FGTS para amortização a cada 2 anos a partir da data do último uso. Para a compra inicial (entrada), não há carência — você usa o saldo disponível no momento da aquisição.",
    },
    {
      q: "O FGTS pode ser usado em imóvel de qualquer valor?",
      a: "Não. O FGTS só pode ser usado em imóveis enquadrados no SFH, cujo limite de avaliação varia por estado — atualmente R$ 1,5 milhão na maioria das regiões. Imóveis acima desse valor são financiados pelo SFI e não permitem uso do FGTS.",
    },
    {
      q: "O que acontece com o FGTS se eu não usar na compra?",
      a: "O FGTS continua rendendo 3% ao ano mais TR (rendimento abaixo da inflação histórica). Por isso, usar o saldo como entrada no financiamento costuma ser financeiramente mais vantajoso do que deixá-lo na conta — especialmente com taxas de financiamento acima de 8% ao ano.",
    },
  ],

  "/mcmv": [
    {
      q: "Quais são as faixas de renda do Minha Casa Minha Vida?",
      a: "O MCMV tem três faixas: Faixa 1 (renda familiar até R$ 2.640), Faixa 2 (até R$ 4.400) e Faixa 3 (até R$ 8.000). A Faixa 1 recebe o maior subsídio e tem taxas de juros a partir de 4% ao ano. As faixas e valores são atualizados periodicamente pelo governo federal.",
    },
    {
      q: "O MCMV oferece subsídio para todas as faixas?",
      a: "Sim, mas em graus diferentes. A Faixa 1 tem subsídio direto (redução no preço do imóvel) mais expressivo. A Faixa 2 tem subsídio menor. A Faixa 3 não tem subsídio direto, mas se beneficia de taxas de juros mais baixas que as do mercado convencional.",
    },
    {
      q: "Posso usar o FGTS junto com o subsídio do MCMV?",
      a: "Sim. O FGTS pode ser combinado com o subsídio do MCMV para aumentar a entrada e reduzir o valor financiado ou as parcelas. Essa combinação é especialmente poderosa para famílias da Faixa 2 que têm saldo significativo no FGTS.",
    },
    {
      q: "Qual o valor máximo do imóvel no MCMV?",
      a: "O limite varia por município e faixa de renda. Em capitais e regiões metropolitanas, o valor máximo chega a R$ 350 mil para Faixa 2/3. Em municípios menores, o limite é menor. Os valores são revisados pelo governo federal periodicamente.",
    },
    {
      q: "Quem não pode participar do Minha Casa Minha Vida?",
      a: "Não pode participar quem: possui ou já possuiu imóvel residencial financiado pelo SFH em qualquer parte do Brasil, já recebeu subsídio habitacional do governo federal, ou tem renda acima do limite da Faixa 3. Cada CPF pode participar apenas uma vez.",
    },
  ],

  "/poupanca-entrada": [
    {
      q: "Qual o percentual mínimo de entrada para financiamento imobiliário?",
      a: "O mínimo padrão é 20% do valor do imóvel para financiamentos convencionais. No Minha Casa Minha Vida pode ser menor (5% a 10%). Alguns bancos permitem até 10% de entrada para perfis específicos, mas com taxas mais altas.",
    },
    {
      q: "Onde investir para juntar a entrada mais rápido?",
      a: "Para prazos de 2 a 5 anos, LCI/LCA isentos de IR e CDBs de 100%+ do CDI são as melhores opções: rendem mais que a poupança sem risco. Tesouro Selic é seguro e tem liquidez diária. Evite renda variável para um objetivo com prazo definido.",
    },
    {
      q: "Posso usar o FGTS como entrada sem ter poupança própria?",
      a: "Sim, o FGTS pode ser a totalidade da entrada, desde que o valor seja suficiente para cobrir o percentual mínimo exigido pelo banco. Se o saldo for insuficiente, você pode complementar com recursos próprios.",
    },
    {
      q: "Vale a pena dar mais de 20% de entrada?",
      a: "Geralmente sim. Quanto maior a entrada, menor o saldo devedor, menores as parcelas e menos juros no total. Além disso, uma entrada maior pode garantir taxas de juros menores, pois o banco assume menos risco. O impacto é maior nos primeiros anos do financiamento.",
    },
    {
      q: "Qual a diferença de rentabilidade entre poupança e CDB para guardar a entrada?",
      a: "A poupança rende 70% da SELIC quando a taxa básica está acima de 8,5% ao ano. Um CDB de banco sólido a 100% do CDI rende significativamente mais — a diferença pode representar meses de aporte extra ao longo de 3 a 5 anos de acumulação.",
    },
  ],

  "/consorcio": [
    {
      q: "O que é consórcio imobiliário e como funciona?",
      a: "O consórcio é um sistema de compra coletiva: um grupo de pessoas paga parcelas mensais e, por sorteio ou lance, uma é contemplada por mês com a carta de crédito para adquirir o imóvel. Não há juros, mas há taxa de administração (geralmente 15% a 20% do total).",
    },
    {
      q: "Quando o consórcio é mais vantajoso que o financiamento?",
      a: "O consórcio é vantajoso quando você não tem pressa para usar o imóvel — seja para investimento ou compra futura. O custo total costuma ser 30% a 50% menor que um financiamento. Se você precisa do imóvel agora para morar ou evitar aluguel, o financiamento pode compensar.",
    },
    {
      q: "Quais os principais riscos do consórcio imobiliário?",
      a: "Os principais riscos são: ser contemplado apenas no final do grupo (podendo demorar anos), inadimplência do grupo que pode atrasar contemplações, e a administradora não ser autorizada pelo Banco Central. Verifique sempre se a administradora tem autorização do Bacen.",
    },
    {
      q: "Posso usar o FGTS no consórcio imobiliário?",
      a: "Sim. O FGTS pode ser usado para: dar um lance e antecipar a contemplação, amortizar o saldo devedor após ser contemplado, ou quitar as parcelas restantes. As mesmas regras de elegibilidade do financiamento se aplicam.",
    },
    {
      q: "O que é lance no consórcio e como funciona?",
      a: "Lance é uma oferta adicional que você faz para ser contemplado antes do sorteio. O lance vencedor é o maior percentual sobre o saldo devedor do grupo. Existem lances fixos (percentual definido pelo grupo) e lances livres (você oferece o valor que quiser).",
    },
  ],

  "/planta-vs-pronto": [
    {
      q: "Quais os principais riscos de comprar imóvel na planta?",
      a: "Os principais riscos são: atraso na entrega (comum no Brasil, podendo chegar a 2 anos), falência da incorporadora, entrega com especificações diferentes do prometido, e correção pelo INCC durante a obra que pode encarecer significativamente o preço final.",
    },
    {
      q: "Imóvel na planta sempre é mais barato que o pronto?",
      a: "Não necessariamente. O preço na planta é atraente, mas o INCC (Índice Nacional da Construção Civil) corrije o saldo durante toda a obra. Em períodos de INCC alto, o preço final pode ser maior que imóveis prontos equivalentes na mesma região.",
    },
    {
      q: "Como o INCC afeta o preço final do imóvel na planta?",
      a: "O INCC corrige mensalmente o saldo das parcelas da obra. Em um prazo de 36 meses e INCC médio de 6% ao ano, o saldo corrigido fica aproximadamente 19% maior. Por isso, o 'desconto' inicial precisa superar essa correção para o negócio realmente compensar.",
    },
    {
      q: "Qual o prazo médio de entrega de imóvel na planta no Brasil?",
      a: "Contratualmente, entre 24 e 36 meses. Na prática, com a tolerância legal de 180 dias prevista na Lei do Distrato, o prazo real pode chegar a 42 meses (3,5 anos). Atrasos além disso dão direito a indenização ao comprador.",
    },
    {
      q: "Posso financiar imóvel na planta pelo banco desde o início?",
      a: "Não. O financiamento bancário só é liberado após o 'habite-se' (conclusão da obra). Durante a obra, você paga parcelas diretamente à incorporadora. Após a entrega, o saldo restante é financiado pelo banco de sua escolha.",
    },
  ],

  "/distrato": [
    {
      q: "O que é distrato de imóvel na planta?",
      a: "Distrato é a rescisão do contrato de compra e venda de imóvel na planta antes da entrega. A Lei 13.786/2018 (Lei do Distrato) regulamenta as regras de devolução dos valores pagos, limitando as retenções que a incorporadora pode fazer.",
    },
    {
      q: "Qual porcentagem a construtora pode reter no distrato?",
      a: "Pela Lei do Distrato: até 25% dos valores pagos pelo comprador em incorporações normais, ou até 50% em incorporações com patrimônio de afetação. Além disso, pode reter a comissão de corretagem paga e o valor do fundo de reserva se houver.",
    },
    {
      q: "O que é patrimônio de afetação e como afeta o distrato?",
      a: "Patrimônio de afetação é quando os recursos do empreendimento ficam separados do patrimônio geral da incorporadora, protegendo os compradores em caso de falência. O custo é uma retenção maior no distrato (até 50% vs 25%), mas oferece mais segurança durante a obra.",
    },
    {
      q: "Tenho direito a correção monetária nos valores devolvidos?",
      a: "Sim. Os valores a restituir devem ser corrigidos pela mesma taxa e índice previstos no contrato para correção das parcelas. A devolução deve acontecer em parcela única em até 30 dias após a resolução contratual.",
    },
    {
      q: "Em quanto tempo devo receber o dinheiro de volta no distrato?",
      a: "Pela Lei do Distrato, o prazo para devolução é de até 30 dias após a resolução do contrato se o empreendimento não tiver patrimônio de afetação. Para incorporações com patrimônio de afetação, o prazo pode ser de até 180 dias após o prazo original de entrega.",
    },
  ],

  "/custo-mudanca": [
    {
      q: "Qual o custo médio de uma mudança residencial no Brasil?",
      a: "Para uma mudança local (mesma cidade) de um apartamento de 2 quartos, o custo varia entre R$ 800 e R$ 2.500. Para mudanças entre cidades, o preço sobe significativamente dependendo da distância e do volume. Mudanças de casas grandes ou interestaduais podem chegar a R$ 10.000 ou mais.",
    },
    {
      q: "O que está incluído no serviço de mudança completa?",
      a: "O serviço completo inclui desmontagem e montagem de móveis, embalagem de todos os itens com proteção adequada, transporte e desembalagem no destino. O serviço básico inclui apenas transporte dos itens já embalados pelo cliente.",
    },
    {
      q: "Como economizar no frete de mudança?",
      a: "Principais estratégias: fazer a mudança em dia de semana (mais barato que fins de semana), contratar com antecedência, descartar itens que não valem o custo de transporte, fazer parte da embalagem você mesmo, e obter ao menos 3 orçamentos de empresas diferentes.",
    },
    {
      q: "É melhor alugar um caminhão ou contratar uma empresa de mudança?",
      a: "Alugar um caminhão é mais barato se você tem ajuda para carregar (amigos ou familiares) e os itens não precisam de cuidado especial. Uma empresa especializada é mais indicada para móveis delicados, distâncias longas, ou quando você não tem disponibilidade para coordenar.",
    },
    {
      q: "Como funciona o seguro de mudança?",
      a: "O seguro de mudança cobre danos e extravios durante o transporte. Empresas sérias incluem seguro básico no contrato. Para itens de alto valor (obras de arte, equipamentos eletrônicos caros), é recomendado contratar seguro adicional com cobertura específica.",
    },
  ],

  "/comparador-financiamento": [
    {
      q: "Quais os principais fatores para comparar dois financiamentos?",
      a: "Os fatores mais importantes são: CET (Custo Efetivo Total), não apenas a taxa nominal; sistema de amortização (SAC vs PRICE); valor dos seguros obrigatórios (MIP e DFI); e tarifas administrativas. Dois financiamentos com a mesma taxa nominal podem ter CET muito diferente.",
    },
    {
      q: "Como o prazo influencia o custo total do financiamento?",
      a: "Prazos mais longos resultam em parcelas menores, mas o total pago ao banco é muito maior. Um financiamento de R$ 400 mil a 10,5% por 30 anos tem custo total quase 2,3 vezes o valor original. Por 20 anos, o custo cai para cerca de 1,9 vezes.",
    },
    {
      q: "O que é a taxa efetiva e como difere da taxa nominal?",
      a: "A taxa nominal é o percentual de juros puro divulgado pelo banco. A taxa efetiva (ou CET) inclui seguros, tarifas e IOF — representa o custo real anual do crédito. O CET pode ser 1,5 a 2 pontos percentuais maior que a taxa nominal.",
    },
    {
      q: "Qual banco costuma ter as menores taxas de financiamento?",
      a: "As taxas variam constantemente. Caixa Econômica Federal costuma ter taxas competitivas por ser o principal agente do SFH. Bancos digitais e cooperativas de crédito têm surgido com propostas agressivas. Sempre simule em ao menos 3 bancos antes de decidir.",
    },
    {
      q: "Devo usar SAC ou PRICE no financiamento?",
      a: "O SAC é mais vantajoso financeiramente: a parcela inicial é maior, mas o total pago é menor pois os juros caem mais rápido. O PRICE é mais adequado se você precisa de parcela previsível e tem renda que justifica a parcela inicial menor. Para quem consegue pagar o SAC, ele é sempre a melhor escolha.",
    },
  ],

  "/renegociacao-financiamento": [
    {
      q: "O que é renegociação de financiamento imobiliário?",
      a: "Renegociação é a revisão das condições do seu financiamento com o mesmo banco — principalmente a taxa de juros. Diferente da portabilidade, não há mudança de credor, apenas atualização do contrato. Costuma ser mais rápida e com menos custos que a portabilidade.",
    },
    {
      q: "Em quanto tempo a economia da renegociação paga os custos?",
      a: "Depende da redução da taxa e do saldo devedor. Em geral, reduções de 0,5 ponto percentual ou mais em saldos acima de R$ 200 mil têm breakeven em menos de 12 meses. Use a calculadora para encontrar o ponto de equilíbrio exato do seu caso.",
    },
    {
      q: "Quais os custos envolvidos em uma renegociação?",
      a: "A renegociação interna geralmente tem custo baixo ou zero — apenas eventual tarifa administrativa. Se a renegociação implicar novo registro em cartório (comum em portabilidade), há custo de registro (0,1% a 0,3% do saldo) e nova avaliação do imóvel.",
    },
    {
      q: "Qual a diferença entre renegociação e portabilidade?",
      a: "Renegociação ocorre com o mesmo banco, é mais rápida e menos burocrática, mas o banco pode não oferecer a melhor taxa do mercado. Portabilidade migra para outro banco com a melhor taxa, mas tem mais custos e mais trâmites. Use a proposta concorrente como alavanca para a renegociação.",
    },
    {
      q: "Meu banco é obrigado a aceitar uma renegociação?",
      a: "Não. O banco não é obrigado a reduzir a taxa por renegociação. Mas ele tem interesse em não perder o cliente para a concorrência via portabilidade. Apresentar uma proposta formal de outro banco é o argumento mais eficiente para conseguir uma contraoferta.",
    },
  ],

  "/comprar-ou-alugar": [
    {
      q: "Comprar imóvel é sempre melhor investimento do que alugar?",
      a: "Não. Depende do cenário: taxa de juros do financiamento, valorização esperada do imóvel, rendimento que você obteria investindo a entrada e a diferença entre parcela e aluguel. Em períodos de juros altos, alugar e investir a diferença pode ser superior à compra.",
    },
    {
      q: "O que é custo de oportunidade na decisão de comprar ou alugar?",
      a: "Custo de oportunidade é o rendimento que você deixa de obter ao imobilizar capital na entrada do imóvel. Se você usa R$ 150 mil de entrada que renderiam 12% ao ano na renda fixa, esse rendimento é o custo de oportunidade — ele deve ser comparado com os benefícios de ser proprietário.",
    },
    {
      q: "Quando o aluguel é financeiramente mais vantajoso?",
      a: "O aluguel tende a ser melhor quando: a taxa de juros do financiamento é alta, o cap rate do imóvel (aluguel/valor) é baixo (abaixo de 0,4% ao mês), você planeja morar no local por menos de 5 anos, ou tem oportunidades de investimento com retorno superior ao custo do financiamento.",
    },
    {
      q: "Como a taxa SELIC influencia a decisão de comprar ou alugar?",
      a: "SELIC alta aumenta as taxas de financiamento e o custo de oportunidade do capital, favorecendo o aluguel. SELIC baixa reduz o custo do financiamento e o rendimento da renda fixa, tornando a compra relativamente mais atraente. É um dos principais fatores a considerar.",
    },
    {
      q: "Qual a regra prática para decidir entre comprar e alugar?",
      a: "Uma regra popular: se o aluguel mensal for menor que 0,5% do preço de compra, alugar pode ser mais vantajoso. Se for maior que 0,5%, comprar tende a ser melhor. Mas essa regra é simplista — use a calculadora para considerar seu cenário específico de taxa, prazo e renda.",
    },
  ],

  "/tributacao-aluguel": [
    {
      q: "Preciso declarar renda de aluguel no Imposto de Renda?",
      a: "Sim. Toda renda de aluguel deve ser declarada no IR anual. Se você recebe aluguel diretamente (sem administradora), também deve recolher mensalmente o carnê-leão — imposto calculado sobre a renda do mês menos as deduções permitidas.",
    },
    {
      q: "Quais despesas posso deduzir da renda de aluguel?",
      a: "Podem ser deduzidos: IPTU pago pelo proprietário, condomínio pago pelo proprietário, prêmio de seguro contra incêndio e responsabilidade civil, e despesas de conservação e reparos (com documentação). A dedução reduz a base de cálculo do IR.",
    },
    {
      q: "Qual a tabela progressiva do IR para renda de aluguel em 2024?",
      a: "A tabela progressiva do carnê-leão 2024 tem 5 faixas: isento até R$ 2.259,20; 7,5% de R$ 2.259,21 a R$ 2.826,65; 15% de R$ 2.826,66 a R$ 3.751,05; 22,5% de R$ 3.751,06 a R$ 4.664,68; e 27,5% acima de R$ 4.664,68.",
    },
    {
      q: "O que é o carnê-leão e quando sou obrigado a pagar?",
      a: "O carnê-leão é o recolhimento mensal de IR para quem recebe rendimentos de pessoas físicas (incluindo aluguel). É obrigatório quando o aluguel recebido no mês supera a faixa de isenção (R$ 2.259,20 em 2024). O DARF deve ser pago até o último dia útil do mês seguinte.",
    },
    {
      q: "Tenho aluguel em nome de pessoa jurídica — como funciona a tributação?",
      a: "PJ optante do Simples Nacional paga alíquota menor sobre o aluguel, mas dependendo do faturamento e da atividade, pode não ser vantajoso. Aluguel como PF com muitas despesas dedutíveis e renda total elevada pode se beneficiar da tributação exclusiva na fonte em alguns casos. Consulte um contador.",
    },
  ],

  "/rescisao-aluguel": [
    {
      q: "Qual a multa por rescisão antecipada de contrato de aluguel?",
      a: "A Lei do Inquilinato prevê multa proporcional ao tempo restante do contrato — não há valor fixo. Se o contrato tem multa de 3 aluguéis e resta 50% do prazo, a multa é de 1,5 aluguel. A multa máxima não pode exceder o total que seria pago até o fim do contrato.",
    },
    {
      q: "Quando posso sair do aluguel sem pagar multa?",
      a: "Você pode sair sem multa em três situações: após o prazo contratual (contrato vencido); por necessidade de transferência de trabalho do empregador para outra localidade, com aviso prévio de 30 dias; e quando o locador descumprir obrigações contratuais graves.",
    },
    {
      q: "O que acontece se o locador pedir o imóvel antes do prazo?",
      a: "O locador não pode pedir o imóvel durante o prazo contratual sem justa causa — só pode retomar para uso próprio, de familiar de primeiro grau ou para obras aprovadas pela prefeitura. Fora esses casos, deve aguardar o fim do contrato ou negociar a saída.",
    },
    {
      q: "Como funciona a transferência de trabalho como motivo de rescisão?",
      a: "Se o empregador transferir o funcionário para outra cidade, ele pode rescindir sem multa mediante comunicação por escrito ao locador com 30 dias de antecedência. A transferência deve ser comprovada com documento do empregador e só vale para contratos de imóvel residencial.",
    },
    {
      q: "O que é aviso prévio no contrato de aluguel?",
      a: "O aviso prévio é a notificação antecipada de que você pretende deixar o imóvel. Geralmente é de 30 dias e deve ser feito por escrito. Sair sem dar o aviso prévio pode resultar em cobrança adicional equivalente ao período não avisado.",
    },
  ],

  "/quanto-cobrar-aluguel": [
    {
      q: "Como calcular o valor ideal de aluguel para meu imóvel?",
      a: "O valor de mercado é determinado pela oferta e demanda local. Como referência técnica, use o cap rate: o aluguel mensal deve representar entre 0,4% e 0,6% do valor venal do imóvel para ser competitivo e rentável. Compare também com anúncios de imóveis similares na região.",
    },
    {
      q: "O que é cap rate e qual o valor considerado bom no Brasil?",
      a: "Cap rate (taxa de capitalização) é o aluguel anual dividido pelo valor do imóvel. No Brasil, cap rates entre 4% e 6% ao ano são considerados razoáveis para imóveis residenciais. Acima de 6% é excelente; abaixo de 4% é fraco, especialmente quando a SELIC está alta.",
    },
    {
      q: "A vacância afeta muito o retorno do aluguel?",
      a: "Sim, de forma significativa. Um imóvel com cap rate bruto de 6% que fica 2 meses vago por ano tem cap rate efetivo de apenas 5%. Por isso, calcule sempre com uma taxa de vacância realista (10% a 15% é prudente) para não superestimar o retorno.",
    },
    {
      q: "Devo incluir IPTU e condomínio no cálculo do aluguel?",
      a: "Depende do contrato. Se o locatário paga IPTU e condomínio, você deve calcular o aluguel puro sobre o valor do imóvel. Se você (locador) arca com esses custos, eles devem ser considerados na conta do retorno líquido — e podem justificar um aluguel maior.",
    },
    {
      q: "Como a taxa SELIC influencia o valor do aluguel?",
      a: "SELIC alta eleva o custo de oportunidade do capital — se a renda fixa paga 13% ao ano, o aluguel precisa ser competitivo para atrair investidores. Isso pressiona os aluguéis para cima. SELIC baixa reduz a exigência de rentabilidade do imóvel, podendo suavizar os reajustes.",
    },
  ],

  "/seguro-fianca": [
    {
      q: "O que é seguro fiança locatícia?",
      a: "Seguro fiança é uma modalidade de garantia locatícia em que uma seguradora garante o pagamento do aluguel ao locador em caso de inadimplência do inquilino. O inquilino paga um prêmio anual à seguradora (geralmente 1 a 2 aluguéis por ano) em vez de imobilizar capital em caução.",
    },
    {
      q: "Qual a diferença entre seguro fiança, caução e fiador?",
      a: "Caução é um depósito em dinheiro (máximo 3 aluguéis) que o inquilino faz e recupera ao sair. Seguro fiança não imobiliza capital, mas tem custo anual. Fiador é uma pessoa que garante o contrato com seu patrimônio — sem custo financeiro, mas exige alguém disposto a assinar. Cada um tem vantagens dependendo do perfil.",
    },
    {
      q: "Quanto custa o seguro fiança em relação ao aluguel?",
      a: "O prêmio do seguro fiança varia entre 8% e 15% do aluguel anual, dependendo do perfil de crédito do inquilino e da seguradora. Para um aluguel de R$ 2.000, o custo anual fica entre R$ 1.920 e R$ 3.600, pago em parcelas mensais junto com o aluguel.",
    },
    {
      q: "Quem paga o seguro fiança: locador ou inquilino?",
      a: "O custo do seguro fiança é pago pelo inquilino — é ele quem contrata a apólice para garantir sua permanência no imóvel. O beneficiário é o locador, que recebe o pagamento da seguradora em caso de inadimplência do inquilino.",
    },
    {
      q: "O que o seguro fiança cobre além do aluguel não pago?",
      a: "Dependendo da apólice, o seguro fiança pode cobrir também: IPTU e condomínio em atraso, danos ao imóvel, despesas jurídicas de ação de despejo e multas contratuais. Verifique as coberturas específicas antes de contratar — as apólices variam bastante entre seguradoras.",
    },
  ],

  "/estimativa-reforma": [
    {
      q: "Quanto custa em média uma reforma completa por m²?",
      a: "Uma reforma completa (demolição, elétrica, hidráulica, revestimentos e acabamentos) custa entre R$ 1.500 e R$ 4.000 por m² dependendo do padrão dos materiais e da região. Padrão básico: R$ 1.500/m². Padrão médio: R$ 2.200/m². Padrão alto: R$ 3.500+/m².",
    },
    {
      q: "Quais reformas valorizam mais o imóvel?",
      a: "As reformas com melhor ROI na valorização são: banheiro reformado (retorno de 100% a 150% do custo), cozinha atualizada (80% a 130%), pintura geral (200%+ de retorno por ser barata), piso novo e iluminação moderna. Ampliações e adição de cômodos dependem muito da localização.",
    },
    {
      q: "Como orçar uma reforma sem ser surpreendido por custos extras?",
      a: "Adicione sempre uma reserva de 20% a 30% sobre o orçamento para imprevistos (paredes com infiltração oculta, fiação antiga, etc.). Contrate um engenheiro ou arquiteto para visita técnica antes de começar — o custo da consultoria evita surpresas muito maiores durante a obra.",
    },
    {
      q: "Preciso de alvará para reformar meu apartamento?",
      a: "Reformas internas que não alterem a estrutura, fachada ou instalações de gás não exigem alvará na maioria dos municípios. Já obras que envolvam demolição de paredes, mudança de layout de banheiro/cozinha ou alterações na fachada geralmente precisam de projeto aprovado e alvará.",
    },
    {
      q: "Qual a diferença entre reforma e manutenção para fins de IR?",
      a: "Benfeitorias e reformas que aumentem a vida útil ou o valor do imóvel podem ser somadas ao custo de aquisição na hora de calcular o ganho de capital na venda — reduzindo o IR. Mas é necessário ter nota fiscal das despesas. Manutenção rotineira não é dedutível.",
    },
  ],

  "/retorno-reforma": [
    {
      q: "Uma reforma antes da venda sempre aumenta o valor do imóvel?",
      a: "Não necessariamente. O retorno depende muito da localização, do tipo de reforma e do padrão do bairro. Uma reforma de alto padrão em uma região de imóveis simples pode não ser valorizada pelo mercado. A regra geral é: não invista em reforma mais do que 10% do valor do imóvel sem consultar um corretor local.",
    },
    {
      q: "Quais reformas têm o melhor retorno na hora da venda?",
      a: "As de maior retorno são: pintura geral (ROI de 150% a 300%), banheiro reformado (100% a 150%), cozinha atualizada (80% a 130%), pisos trocados (70% a 120%) e limpeza + jardinagem (ROI altíssimo pelo baixo custo). Reformas estruturais raramente têm ROI positivo se o objetivo é venda rápida.",
    },
    {
      q: "Como calcular o ROI de uma reforma antes de vender?",
      a: "ROI da reforma = (valorização esperada do imóvel ÷ custo da reforma) × 100. Se a reforma custa R$ 30.000 e adiciona R$ 45.000 no valor de venda, o ROI é 150%. Compare isso com o custo de oportunidade de deixar o capital na renda fixa pelo tempo da reforma.",
    },
    {
      q: "O custo da reforma pode ser deduzido do ganho de capital?",
      a: "Sim. Benfeitorias com nota fiscal podem ser somadas ao custo de aquisição do imóvel, reduzindo o ganho de capital tributável. Isso é especialmente valioso para imóveis com ganho alto. Por isso, guarde sempre as notas fiscais de materiais e mão de obra.",
    },
    {
      q: "Quanto tempo esperar para vender após uma reforma?",
      a: "Não há prazo obrigatório, mas o mercado imobiliário valoriza imóveis recém-reformados com maior facilidade nos primeiros 12 a 18 meses. Reformas muito antigas já são tratadas como 'estado normal' pelo comprador. Imóveis reformados tendem a vender até 30% mais rápido e por preço maior.",
    },
  ],

  "/lucro-venda": [
    {
      q: "Como calcular o lucro real na venda de um imóvel?",
      a: "Lucro líquido = preço de venda − (custo de aquisição + benfeitorias + corretagem + ITBI original + custos cartorários + IR sobre ganho de capital). Muitos proprietários superestimam o lucro por esquecer os custos de aquisição e o IR, que pode levar 15% do ganho.",
    },
    {
      q: "Quais custos podem ser deduzidos do preço de venda para fins de IR?",
      a: "Podem ser somados ao custo de aquisição: valor pago pelo imóvel, reformas e benfeitorias com nota fiscal, corretagem paga na compra, ITBI, escritura e registro. Esses valores reduzem o ganho de capital e, consequentemente, o IR a pagar.",
    },
    {
      q: "A corretagem de venda (5%) sai do lucro do vendedor?",
      a: "Sim. A comissão da imobiliária ou corretor (geralmente 5% a 6% do valor de venda) é paga pelo vendedor e sai diretamente do valor recebido. Em uma venda de R$ 600 mil, a corretagem consome R$ 30 mil a R$ 36 mil — um custo expressivo que deve estar no cálculo do lucro líquido.",
    },
    {
      q: "Reformas com nota fiscal reduzem o imposto na venda?",
      a: "Sim. Benfeitorias documentadas por nota fiscal são somadas ao custo de aquisição, reduzindo o ganho de capital tributável. Se você vendeu por R$ 600 mil, comprou por R$ 300 mil e tem R$ 50 mil em reformas comprovadas, o ganho tributável é R$ 250 mil, não R$ 300 mil.",
    },
    {
      q: "Qual a diferença entre lucro bruto e lucro líquido na venda?",
      a: "Lucro bruto é o preço de venda menos apenas o custo de compra — ignora todos os custos intermediários. Lucro líquido desconta corretagem, IR sobre ganho de capital, benfeitorias e custos cartorários. O lucro líquido real costuma ser 20% a 40% menor que o bruto.",
    },
  ],

  "/itcmd": [
    {
      q: "O que é ITCMD e quando é cobrado?",
      a: "O ITCMD (Imposto de Transmissão Causa Mortis e Doação) é um tributo estadual cobrado na transferência gratuita de bens — seja por herança (causa mortis) ou por doação em vida. Incide sobre imóveis, veículos, dinheiro e qualquer bem ou direito transmitido gratuitamente.",
    },
    {
      q: "As alíquotas do ITCMD variam por estado?",
      a: "Sim. Cada estado define sua própria alíquota, limitada a 8% pelo Senado Federal. As alíquotas variam de 2% (estados com alíquota única baixa) a 8% (vários estados para heranças de alto valor). Alguns estados têm alíquotas progressivas, outros têm alíquota única.",
    },
    {
      q: "Existe isenção de ITCMD para herdeiros diretos?",
      a: "Depende do estado. Alguns estados concedem isenção para heranças de baixo valor ou para transmissões entre cônjuges/descendentes diretos. São Paulo, por exemplo, isenta heranças de imóveis residenciais de baixo valor quando o herdeiro não tem outro imóvel. Consulte a legislação do seu estado.",
    },
    {
      q: "Como é calculado o ITCMD em imóveis herdados?",
      a: "A base de cálculo é o valor venal do imóvel ou o valor de mercado, dependendo do estado. O ITCMD = valor do imóvel × alíquota do estado. Em estados com alíquota progressiva, o imposto é calculado por faixas, similar ao IR.",
    },
    {
      q: "ITCMD incide sobre imóvel com financiamento?",
      a: "Sim, mas a base de cálculo pode ser o valor do imóvel menos o saldo devedor do financiamento, pois o herdeiro assume a dívida. A forma exata de calcular varia por estado e deve ser confirmada com a Secretaria da Fazenda estadual.",
    },
  ],

  "/doacao-vs-inventario": [
    {
      q: "O que é mais vantajoso: doação em vida ou inventário?",
      a: "Depende do estado e do patrimônio. A doação antecipada pode ter alíquota de ITCMD menor (se o estado não tiver progressividade agressiva), mas paga agora. O inventário adia o imposto, mas pode custar mais com honorários advocatícios, custas processuais e demora. Em geral, doação é vantajosa em estados com alíquotas progressivas e patrimônios menores.",
    },
    {
      q: "Quais os custos do inventário de imóvel no Brasil?",
      a: "O inventário envolve: ITCMD (2% a 8% do valor do patrimônio), honorários do advogado (mínimo de 6% do patrimônio pelo CPC, podendo chegar a 10%), custas judiciais ou cartoriais, e emolumentos do cartório de imóveis para cada transferência. O total pode consumir 15% a 20% do patrimônio.",
    },
    {
      q: "Doação em vida de imóvel tem ITCMD?",
      a: "Sim. A doação é um fato gerador do ITCMD — você paga o imposto no momento da transferência. A alíquota é a mesma que incidiria na herança para o mesmo beneficiário. A vantagem é travar o valor de referência (hoje) antes de eventual valorização futura do imóvel.",
    },
    {
      q: "Posso fazer doação em vida com reserva de usufruto?",
      a: "Sim. Na doação com usufruto, você transfere a propriedade do imóvel ao herdeiro, mas mantém o direito de usá-lo e habitá-lo enquanto viver. Ao falecer, o usufruto se extingue automaticamente sem necessidade de inventário — sem custos adicionais de transmissão.",
    },
    {
      q: "Existe prazo mínimo entre doações para evitar tributação extra?",
      a: "Não há prazo mínimo legal, mas doações sucessivas ao mesmo beneficiário no mesmo ano fiscal podem ser somadas para efeito de cálculo progressivo do ITCMD em alguns estados. Consulte um advogado tributarista para planejar o momento e a sequência das doações.",
    },
  ],

  "/permuta-imovel": [
    {
      q: "O que é permuta de imóvel e como funciona?",
      a: "Permuta é a troca direta de imóveis entre duas partes, com ou sem complementação em dinheiro (chamada torna). É formalizada por escritura pública de permuta e cada parte arca com os custos referentes ao imóvel que está adquirindo: ITBI, registro e cartório.",
    },
    {
      q: "O que é 'torna' na permuta de imóveis?",
      a: "Torna é o valor pago em dinheiro pela parte que recebe o imóvel de maior valor para equilibrar a troca. Se um imóvel vale R$ 500 mil e o outro R$ 400 mil, a torna é de R$ 100 mil — pago por quem recebe o imóvel mais caro.",
    },
    {
      q: "Há incidência de IR na permuta de imóveis?",
      a: "Sim, se houver ganho de capital. Cada parte calcula o ganho de capital sobre o imóvel que entregou: valor recebido (valor do imóvel adquirido + torna) menos o custo de aquisição do imóvel entregue. Se o imóvel entregue foi vendido acima do custo, há IR.",
    },
    {
      q: "A permuta é sempre melhor que vender e comprar separado?",
      a: "Geralmente sim quando ambas as partes querem o imóvel da outra. Evita duas operações de venda independentes, reduzindo corretagem total, custos cartorários e o risco de uma parte vender sem a outra ter adquirido. Mas depende de encontrar um parceiro com imóvel de interesse mútuo.",
    },
    {
      q: "Preciso de escritura pública para fazer uma permuta?",
      a: "Sim. A permuta de imóveis acima de 30 salários mínimos exige escritura pública lavrada em cartório, da mesma forma que uma compra e venda. O custo da escritura é calculado sobre o valor de cada imóvel e fica a cargo de cada parte pelo imóvel que recebe.",
    },
  ],

  "/cap-rate": [
    {
      q: "O que é cap rate imobiliário?",
      a: "Cap rate (taxa de capitalização) é o indicador que mede a rentabilidade de um imóvel para aluguel: aluguel anual líquido ÷ valor do imóvel. Um imóvel de R$ 500 mil que gera R$ 25 mil de aluguel anual tem cap rate de 5%. É a principal métrica para comparar imóveis como investimento.",
    },
    {
      q: "Qual cap rate é considerado bom para imóveis no Brasil?",
      a: "Para imóveis residenciais no Brasil, cap rates entre 4% e 6% ao ano são considerados razoáveis. Acima de 6% é excelente. Abaixo de 4% é fraco, especialmente com a SELIC em patamares elevados. Compare sempre com a taxa de renda fixa de baixo risco para avaliar se o imóvel compensa.",
    },
    {
      q: "Como a vacância afeta o cap rate?",
      a: "A vacância reduz diretamente o aluguel efetivo recebido. Um imóvel com cap rate bruto de 6% e 10% de vacância tem cap rate efetivo de 5,4%. Sempre calcule com uma taxa realista de vacância (entre 5% e 15% dependendo da região e tipo de imóvel) para não superestimar o retorno.",
    },
    {
      q: "Qual a diferença entre cap rate bruto e líquido?",
      a: "Cap rate bruto considera apenas o aluguel sem descontar despesas. Cap rate líquido desconta IPTU, condomínio, manutenção, vacância e imposto de renda — e é o que realmente fica no seu bolso. O cap rate líquido costuma ser 20% a 40% menor que o bruto.",
    },
    {
      q: "Devo comparar o cap rate com a taxa SELIC?",
      a: "Sim. O cap rate líquido deve superar o rendimento de investimentos de baixo risco (como Tesouro Selic ou LCI) para justificar os riscos e a iliquidez do imóvel. Se o cap rate líquido é 4% e a SELIC está em 13%, há um prêmio de risco negativo — o imóvel está caro em relação à renda fixa.",
    },
  ],

  "/fii-vs-imovel": [
    {
      q: "O que são Fundos de Investimento Imobiliário (FIIs)?",
      a: "FIIs são fundos negociados na bolsa que investem em imóveis ou títulos imobiliários. Os cotistas recebem dividendos mensais provenientes dos aluguéis dos imóveis do portfólio. Com cotas a partir de R$ 10 a R$ 100, permitem acesso ao mercado imobiliário com muito menos capital que um imóvel físico.",
    },
    {
      q: "FIIs pagam imposto de renda sobre os dividendos?",
      a: "Os dividendos dos FIIs são isentos de IR para pessoas físicas, desde que o fundo tenha ao menos 50 cotistas e as cotas sejam negociadas em bolsa. Já o ganho de capital na venda das cotas é tributado em 20%. Essa isenção dos dividendos é uma grande vantagem fiscal dos FIIs.",
    },
    {
      q: "Qual a vantagem do imóvel físico em relação aos FIIs?",
      a: "O imóvel físico oferece: maior controle sobre o ativo, possibilidade de uso pessoal, alavancagem via financiamento, e proteção patrimonial mais tangível. Também é menos volátil no curto prazo que cotas de FII, que flutuam diariamente na bolsa.",
    },
    {
      q: "FII é mais líquido que imóvel físico?",
      a: "Muito mais. Cotas de FII podem ser vendidas em segundos durante o horário de pregão da B3. Um imóvel físico pode levar meses a anos para ser vendido. A liquidez dos FIIs é especialmente importante para quem pode precisar acessar o capital rapidamente.",
    },
    {
      q: "Como comparar o retorno de FIIs com o aluguel de imóvel físico?",
      a: "Compare o dividend yield anual do FII (dividendos ÷ preço da cota × 100) com o cap rate líquido do imóvel físico equivalente. Inclua também a valorização das cotas/imóvel no longo prazo. FIIs tendem a ter gestão mais eficiente e diversificação automática do risco.",
    },
  ],

  "/imovel-vs-renda-fixa": [
    {
      q: "Imóvel ou renda fixa: qual rende mais no longo prazo?",
      a: "Historicamente, nos últimos 20 anos, a renda fixa (especialmente o CDI) superou a valorização de imóveis na maioria das cidades brasileiras em termos reais (acima da inflação). Porém, o imóvel para aluguel soma valorização + renda mensal, tornando a comparação mais equilibrada. Depende muito do imóvel específico e do período.",
    },
    {
      q: "O que é custo de oportunidade no investimento imobiliário?",
      a: "É o rendimento que você deixa de obter ao imobilizar capital no imóvel. Se você investe R$ 500 mil em um imóvel que valoriza 5% ao ano, mas poderia ter obtido 13% ao ano na renda fixa, o custo de oportunidade é a diferença de 8 pontos percentuais — um custo invisível, mas real.",
    },
    {
      q: "Como a inflação afeta o rendimento do imóvel vs renda fixa?",
      a: "Imóveis são considerados proteção contra inflação, pois tendem a ser reajustados pelo IGP-M ou IPCA. A renda fixa atrelada ao IPCA (como Tesouro IPCA+) também protege contra inflação. Em períodos de inflação alta, ambos se comportam bem; em deflação, a renda fixa prefixada pode ser superior.",
    },
    {
      q: "Qual o papel da liquidez na escolha entre imóvel e renda fixa?",
      a: "A renda fixa (especialmente LCI, Tesouro Selic) tem alta liquidez — você pode resgatar em dias. O imóvel é ilíquido: pode levar meses ou anos para vender. Se você tem chance de precisar do capital, a liquidez da renda fixa tem valor significativo que deve entrar na comparação.",
    },
    {
      q: "Em que cenário econômico o imóvel supera a renda fixa?",
      a: "O imóvel tende a superar a renda fixa quando: a SELIC está baixa (renda fixa rende pouco), há forte demanda habitacional na região, o imóvel tem cap rate alto, e o prazo de análise é longo (15+ anos). Em cenários de juros altos como o atual, a vantagem da renda fixa é mais evidente.",
    },
  ],

  "/tir-imovel": [
    {
      q: "O que é TIR (Taxa Interna de Retorno) no investimento imobiliário?",
      a: "A TIR é a taxa de desconto que iguala o valor presente dos fluxos de caixa futuros (aluguéis + venda) ao investimento inicial. Em termos práticos, é a taxa de retorno anual real do investimento considerando todos os fluxos ao longo do tempo — mais precisa que o cap rate para comparar investimentos.",
    },
    {
      q: "Como interpretar a TIR de um imóvel para aluguel?",
      a: "Compare a TIR com alternativas de investimento de risco similar. Se a TIR do imóvel é 8% ao ano e a SELIC está em 13%, o imóvel oferece retorno inferior para um investimento muito menos líquido. Se a TIR supera 15% ao ano em um cenário conservador, o investimento pode ser atrativo.",
    },
    {
      q: "A TIR considera inflação e desvalorização do imóvel?",
      a: "Depende de como você monta o fluxo de caixa. Você pode calcular a TIR nominal (sem ajuste de inflação) ou real (descontando inflação). O importante é ser consistente: se os aluguéis projetados são nominais, a venda também deve ser nominal. Use a calculadora para testar diferentes cenários.",
    },
    {
      q: "Qual TIR é considerada boa para imóvel para aluguel no Brasil?",
      a: "Uma TIR acima de 10% ao ano real (acima da inflação) é considerada boa para imóvel residencial. Acima de 15% real é excelente. Abaixo de 6% real é fraco — especialmente quando a renda fixa real oferece 5% a 7% sem os riscos e a iliquidez do imóvel.",
    },
    {
      q: "Como o prazo de saída (venda) afeta a TIR do investimento?",
      a: "O prazo de saída tem impacto enorme. Sair muito cedo pode resultar em TIR baixa (custos de transação não amortizados). Sair muito tarde pode diluir o retorno se o imóvel não valorizar. Em geral, prazos de 8 a 15 anos maximizam a TIR para imóveis residenciais bem localizados.",
    },
  ],

  "/airbnb-vs-aluguel": [
    {
      q: "Airbnb sempre rende mais que aluguel convencional?",
      a: "Não. O Airbnb pode render 2 a 3 vezes mais que o aluguel convencional em alta temporada ou imóveis bem localizados, mas exige muito mais gestão, tem custos maiores e renda variável. Em imóveis sem diferencial turístico ou em regiões de baixa demanda, o aluguel convencional pode ser mais seguro e rentável.",
    },
    {
      q: "Quais custos o Airbnb tem que o aluguel convencional não tem?",
      a: "O Airbnb gera custos adicionais como: taxa da plataforma (3% para anfitriões), limpeza entre hóspedes, mobília e equipamentos completos, maior consumo de água/luz (geralmente inclusos), manutenção mais frequente, e maior gestão de tempo ou custo de administradora (20% a 30% da receita).",
    },
    {
      q: "O que é taxa de ocupação de break-even no Airbnb?",
      a: "É a taxa de ocupação mínima para o Airbnb igualar a renda do aluguel convencional. Se o aluguel convencional seria R$ 3.000 e a diária do Airbnb é R$ 200, você precisa de 15 dias ocupados (50% de ocupação) só para empatar. Acima disso, o Airbnb é superior.",
    },
    {
      q: "Airbnb precisa de CNPJ ou declaração especial?",
      a: "Não é obrigatório CNPJ. A renda do Airbnb por pessoa física é declarada como 'outros rendimentos' no IR, com recolhimento de carnê-leão mensal quando superar o limite de isenção. Alguns municípios exigem licença de hospedagem — consulte a legislação local.",
    },
    {
      q: "Quais os riscos do aluguel por temporada vs aluguel tradicional?",
      a: "Airbnb: sazonalidade (períodos de baixa ocupação), maior depreciação dos móveis, risco de avaliações negativas e danos por hóspedes. Aluguel tradicional: inadimplência, dificuldade de despejo, e limite de reajuste anual. O Airbnb oferece mais flexibilidade, mas menos previsibilidade de renda.",
    },
  ],

  "/fluxo-caixa-imovel": [
    {
      q: "O que é yield líquido de imóvel?",
      a: "Yield líquido é o retorno percentual anual do imóvel após descontar todas as despesas: IPTU, condomínio, manutenção, vacância e IR sobre o aluguel. Enquanto o cap rate bruto considera apenas o aluguel/valor, o yield líquido mostra o que efetivamente sobra para o proprietário.",
    },
    {
      q: "Quais despesas entram no fluxo de caixa de um imóvel alugado?",
      a: "As principais despesas são: IPTU, condomínio (quando pago pelo proprietário), seguro do imóvel, manutenção e reparos (estima-se 0,5% a 1% do valor do imóvel por ano), períodos de vacância, administração imobiliária (8% a 12% do aluguel) e IR mensal (carnê-leão).",
    },
    {
      q: "Como a vacância afeta o fluxo de caixa do imóvel?",
      a: "A vacância é o maior vilão do rendimento: 1 mês vago em 12 representa 8,3% de perda de receita anual. Além disso, durante a vacância você continua pagando condomínio, IPTU e financiamento (se houver). Uma reserva de emergência equivalente a 2-3 meses de aluguel é essencial.",
    },
    {
      q: "Devo declarar todos os aluguéis recebidos no IR?",
      a: "Sim. Todo aluguel recebido deve ser declarado, independente do valor. Se o aluguel mensal superar a faixa de isenção (R$ 2.259,20 em 2024), você deve também recolher o carnê-leão mensalmente — não apenas na declaração anual.",
    },
    {
      q: "O que é reajuste projetado e como ele melhora o fluxo de caixa?",
      a: "O reajuste projetado é o aumento anual estimado do aluguel (geralmente pelo IPCA ou IGP-M). Um aluguel de R$ 2.000 com reajuste de 5% ao ano vira R$ 3.258 em 10 anos. Esse crescimento da receita melhora o yield ao longo do tempo, tornando o investimento mais atrativo no longo prazo.",
    },
  ],

  "/leilao-imovel": [
    {
      q: "Como funciona o leilão de imóvel no Brasil?",
      a: "Imóveis vão a leilão por dívida (execução hipotecária ou judicial) ou por alienação de bens. Na primeira praça, o lance mínimo é o valor de avaliação. Na segunda praça, aceita-se a partir de 50% da avaliação. O arrematante paga o valor do lance mais comissão do leiloeiro (5%) e posteriormente ITBI e cartório.",
    },
    {
      q: "Quais os principais riscos de comprar imóvel em leilão?",
      a: "Os principais riscos são: imóvel ocupado (pode exigir ação de reintegração de posse, levando meses ou anos), dívidas de condomínio e IPTU que o arrematante herda, vícios ocultos sem possibilidade de vistoria prévia, e processos judiciais que podem anular o leilão.",
    },
    {
      q: "O imóvel em leilão pode ter dívidas de condomínio e IPTU?",
      a: "Sim. As dívidas de condomínio têm natureza propter rem — acompanham o imóvel independente de quem seja o dono. O arrematante assume essas dívidas. IPTU em atraso também é herdado. O edital do leilão deve informar os débitos conhecidos — sempre leia com atenção.",
    },
    {
      q: "Preciso pagar ITBI em imóvel arrematado em leilão?",
      a: "Sim. O ITBI incide normalmente sobre a arrematação de imóvel em leilão, calculado sobre o valor do lance. O base de cálculo pode variar por município — alguns usam o maior entre o valor do lance e o valor venal cadastrado. O ITBI deve ser pago antes do registro da carta de arrematação.",
    },
    {
      q: "Qual o valor da comissão do leiloeiro?",
      a: "A comissão do leiloeiro é geralmente de 5% sobre o valor do lance vencedor, paga pelo arrematante além do preço arrematado. Em alguns leilões judiciais, a comissão já está incluída. Verifique sempre no edital se a comissão é 'sobre' ou 'incluída no' valor do lance.",
    },
  ],
};
