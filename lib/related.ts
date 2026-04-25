export interface RelatedCalc {
  href: string;
  label: string;
  desc: string;
}

export const related: Record<string, RelatedCalc[]> = {
  "/financiamento": [
    { href: "/quanto-posso-financiar", label: "Quanto Posso Financiar?", desc: "Descubra o valor máximo pela sua renda" },
    { href: "/amortizacao-extra", label: "Amortização Extraordinária", desc: "Simule parcelas extras e economize juros" },
    { href: "/portabilidade", label: "Portabilidade", desc: "Veja se vale a pena mudar de banco" },
    { href: "/comparador-financiamento", label: "Comparador de Financiamentos", desc: "Compare dois bancos lado a lado" },
  ],
  "/custos-compra": [
    { href: "/financiamento", label: "Simulador de Financiamento", desc: "Simule parcelas SAC e PRICE" },
    { href: "/poupanca-entrada", label: "Poupança para a Entrada", desc: "Calcule quanto guardar por mês" },
    { href: "/fgts", label: "Simulador de FGTS", desc: "Projete seu saldo na data da compra" },
    { href: "/lucro-venda", label: "Lucro Líquido na Venda", desc: "Calcule o lucro real após todos os custos" },
  ],
  "/reajuste-aluguel": [
    { href: "/tributacao-aluguel", label: "Tributação do Aluguel", desc: "Calcule o carnê-leão mensal sobre aluguéis" },
    { href: "/rescisao-aluguel", label: "Rescisão de Aluguel", desc: "Calcule multa por saída antecipada" },
    { href: "/quanto-cobrar-aluguel", label: "Quanto Cobrar de Aluguel?", desc: "Defina o valor ideal pelo cap rate" },
    { href: "/seguro-fianca", label: "Seguro Fiança vs Caução", desc: "Compare as garantias locatícias" },
  ],
  "/ganho-capital": [
    { href: "/lucro-venda", label: "Lucro Líquido na Venda", desc: "Calcule o lucro real após IR e custos" },
    { href: "/itcmd", label: "Calculadora de ITCMD", desc: "Simule herança e doação de imóvel" },
    { href: "/doacao-vs-inventario", label: "Doação vs Inventário", desc: "Compare os custos de transmissão do bem" },
    { href: "/permuta-imovel", label: "Permuta de Imóvel", desc: "Calcule torna e IR na troca de imóveis" },
  ],
  "/quanto-posso-financiar": [
    { href: "/financiamento", label: "Simulador de Financiamento", desc: "Simule parcelas SAC e PRICE com sua taxa" },
    { href: "/poupanca-entrada", label: "Poupança para a Entrada", desc: "Calcule quanto guardar por mês" },
    { href: "/mcmv", label: "Minha Casa Minha Vida", desc: "Veja seu subsídio e faixa de renda" },
    { href: "/custos-compra", label: "Custos de Compra", desc: "Inclua ITBI e cartório no orçamento total" },
  ],
  "/amortizacao-extra": [
    { href: "/financiamento", label: "Simulador de Financiamento", desc: "Simule parcelas SAC e PRICE" },
    { href: "/portabilidade", label: "Portabilidade", desc: "Veja se vale mudar de banco" },
    { href: "/comparador-financiamento", label: "Comparador de Financiamentos", desc: "Compare dois bancos lado a lado" },
    { href: "/renegociacao-financiamento", label: "Renegociação de Financiamento", desc: "Negocie uma taxa menor com seu banco" },
  ],
  "/portabilidade": [
    { href: "/financiamento", label: "Simulador de Financiamento", desc: "Simule parcelas SAC e PRICE" },
    { href: "/amortizacao-extra", label: "Amortização Extraordinária", desc: "Simule parcelas extras e economize juros" },
    { href: "/renegociacao-financiamento", label: "Renegociação de Financiamento", desc: "Negocie uma taxa menor com seu banco" },
    { href: "/comparador-financiamento", label: "Comparador de Financiamentos", desc: "Compare dois bancos lado a lado" },
  ],
  "/fgts": [
    { href: "/financiamento", label: "Simulador de Financiamento", desc: "Simule parcelas com e sem FGTS" },
    { href: "/custos-compra", label: "Custos de Compra", desc: "Calcule ITBI, escritura e registro" },
    { href: "/quanto-posso-financiar", label: "Quanto Posso Financiar?", desc: "Descubra o valor máximo pela sua renda" },
    { href: "/poupanca-entrada", label: "Poupança para a Entrada", desc: "Complemente o FGTS com poupança própria" },
  ],
  "/mcmv": [
    { href: "/financiamento", label: "Simulador de Financiamento", desc: "Simule parcelas SAC e PRICE" },
    { href: "/fgts", label: "Simulador de FGTS", desc: "Some o FGTS ao subsídio do MCMV" },
    { href: "/custos-compra", label: "Custos de Compra", desc: "Calcule ITBI e custos cartorários" },
    { href: "/quanto-posso-financiar", label: "Quanto Posso Financiar?", desc: "Veja o valor máximo pela sua renda" },
  ],
  "/poupanca-entrada": [
    { href: "/fgts", label: "Simulador de FGTS", desc: "Combine FGTS com sua poupança" },
    { href: "/financiamento", label: "Simulador de Financiamento", desc: "Simule as parcelas após juntar a entrada" },
    { href: "/quanto-posso-financiar", label: "Quanto Posso Financiar?", desc: "Descubra o imóvel que você pode comprar" },
    { href: "/comprar-ou-alugar", label: "Comprar ou Alugar?", desc: "Veja se vale a pena esperar juntar mais" },
  ],
  "/consorcio": [
    { href: "/financiamento", label: "Simulador de Financiamento", desc: "Compare com parcelas do financiamento" },
    { href: "/comparador-financiamento", label: "Comparador de Financiamentos", desc: "Compare dois bancos lado a lado" },
    { href: "/amortizacao-extra", label: "Amortização Extraordinária", desc: "Simule economia com pagamentos extras" },
    { href: "/quanto-posso-financiar", label: "Quanto Posso Financiar?", desc: "Veja o limite pelo financiamento" },
  ],
  "/planta-vs-pronto": [
    { href: "/custos-compra", label: "Custos de Compra", desc: "Calcule ITBI e cartório para cada opção" },
    { href: "/distrato", label: "Distrato de Imóvel na Planta", desc: "Saiba quanto recuperar se desistir" },
    { href: "/financiamento", label: "Simulador de Financiamento", desc: "Compare as parcelas de cada cenário" },
    { href: "/fgts", label: "Simulador de FGTS", desc: "Projete o saldo para a data de entrega" },
  ],
  "/distrato": [
    { href: "/planta-vs-pronto", label: "Planta vs Pronto", desc: "Compare os custos antes de comprar" },
    { href: "/custos-compra", label: "Custos de Compra", desc: "Veja todos os custos de uma nova compra" },
    { href: "/lucro-venda", label: "Lucro Líquido na Venda", desc: "Calcule o resultado real de uma venda" },
    { href: "/financiamento", label: "Simulador de Financiamento", desc: "Simule o novo financiamento após o distrato" },
  ],
  "/custo-mudanca": [
    { href: "/custos-compra", label: "Custos de Compra", desc: "Inclua a mudança no orçamento total" },
    { href: "/estimativa-reforma", label: "Estimativa de Reforma", desc: "Estime o custo de reformar antes de mudar" },
    { href: "/comprar-ou-alugar", label: "Comprar ou Alugar?", desc: "Veja o custo total da decisão" },
    { href: "/financiamento", label: "Simulador de Financiamento", desc: "Simule as parcelas do novo imóvel" },
  ],
  "/comparador-financiamento": [
    { href: "/financiamento", label: "Simulador de Financiamento", desc: "Simule parcelas SAC e PRICE" },
    { href: "/portabilidade", label: "Portabilidade", desc: "Migre para o banco mais barato" },
    { href: "/renegociacao-financiamento", label: "Renegociação de Financiamento", desc: "Negocie uma taxa menor com seu banco" },
    { href: "/amortizacao-extra", label: "Amortização Extraordinária", desc: "Simule parcelas extras e economize juros" },
  ],
  "/renegociacao-financiamento": [
    { href: "/portabilidade", label: "Portabilidade", desc: "Compare com a migração para outro banco" },
    { href: "/comparador-financiamento", label: "Comparador de Financiamentos", desc: "Compare dois bancos lado a lado" },
    { href: "/amortizacao-extra", label: "Amortização Extraordinária", desc: "Combine com pagamentos extras" },
    { href: "/financiamento", label: "Simulador de Financiamento", desc: "Simule o novo cenário com taxa menor" },
  ],
  "/comprar-ou-alugar": [
    { href: "/financiamento", label: "Simulador de Financiamento", desc: "Simule as parcelas do financiamento" },
    { href: "/imovel-vs-renda-fixa", label: "Imóvel vs Renda Fixa", desc: "Compare o retorno dos dois caminhos" },
    { href: "/poupanca-entrada", label: "Poupança para a Entrada", desc: "Calcule quanto guardar por mês" },
    { href: "/reajuste-aluguel", label: "Reajuste de Aluguel", desc: "Projete o custo futuro do aluguel" },
  ],
  "/tributacao-aluguel": [
    { href: "/reajuste-aluguel", label: "Reajuste de Aluguel", desc: "Calcule o novo valor pelo IPCA ou IGP-M" },
    { href: "/fluxo-caixa-imovel", label: "Fluxo de Caixa do Imóvel", desc: "Veja o yield líquido após IR" },
    { href: "/rescisao-aluguel", label: "Rescisão de Aluguel", desc: "Calcule multa por saída antecipada" },
    { href: "/quanto-cobrar-aluguel", label: "Quanto Cobrar de Aluguel?", desc: "Defina o valor ideal pelo cap rate" },
  ],
  "/rescisao-aluguel": [
    { href: "/reajuste-aluguel", label: "Reajuste de Aluguel", desc: "Calcule o novo valor pelo IPCA ou IGP-M" },
    { href: "/tributacao-aluguel", label: "Tributação do Aluguel", desc: "Calcule o carnê-leão sobre aluguéis" },
    { href: "/seguro-fianca", label: "Seguro Fiança vs Caução", desc: "Compare as garantias locatícias" },
    { href: "/quanto-cobrar-aluguel", label: "Quanto Cobrar de Aluguel?", desc: "Defina o valor ideal pelo cap rate" },
  ],
  "/quanto-cobrar-aluguel": [
    { href: "/cap-rate", label: "Cap Rate Imobiliário", desc: "Calcule a rentabilidade líquida do imóvel" },
    { href: "/tributacao-aluguel", label: "Tributação do Aluguel", desc: "Veja o IR sobre a renda mensal" },
    { href: "/fluxo-caixa-imovel", label: "Fluxo de Caixa do Imóvel", desc: "Projete receitas e despesas anuais" },
    { href: "/reajuste-aluguel", label: "Reajuste de Aluguel", desc: "Calcule o reajuste pelo índice correto" },
  ],
  "/seguro-fianca": [
    { href: "/rescisao-aluguel", label: "Rescisão de Aluguel", desc: "Calcule multa por saída antecipada" },
    { href: "/reajuste-aluguel", label: "Reajuste de Aluguel", desc: "Calcule o novo valor pelo IPCA ou IGP-M" },
    { href: "/quanto-cobrar-aluguel", label: "Quanto Cobrar de Aluguel?", desc: "Defina o valor ideal pelo cap rate" },
    { href: "/tributacao-aluguel", label: "Tributação do Aluguel", desc: "Calcule o carnê-leão sobre aluguéis" },
  ],
  "/estimativa-reforma": [
    { href: "/retorno-reforma", label: "Retorno da Reforma", desc: "Veja se a reforma compensa antes da venda" },
    { href: "/custos-compra", label: "Custos de Compra", desc: "Some reforma ao orçamento total de compra" },
    { href: "/lucro-venda", label: "Lucro Líquido na Venda", desc: "Calcule o lucro após reforma e venda" },
    { href: "/custo-mudanca", label: "Custo de Mudança", desc: "Estime o frete antes de reformar" },
  ],
  "/retorno-reforma": [
    { href: "/estimativa-reforma", label: "Estimativa de Reforma", desc: "Calcule o custo detalhado da reforma" },
    { href: "/lucro-venda", label: "Lucro Líquido na Venda", desc: "Calcule o lucro real após a reforma" },
    { href: "/ganho-capital", label: "Ganho de Capital", desc: "Calcule o IR sobre a venda" },
    { href: "/custos-compra", label: "Custos de Compra", desc: "Some todos os custos da operação" },
  ],
  "/lucro-venda": [
    { href: "/ganho-capital", label: "Ganho de Capital", desc: "Calcule o IR sobre o lucro da venda" },
    { href: "/retorno-reforma", label: "Retorno da Reforma", desc: "Veja se reformar antes compensa" },
    { href: "/permuta-imovel", label: "Permuta de Imóvel", desc: "Compare com a troca direta de imóveis" },
    { href: "/itcmd", label: "Calculadora de ITCMD", desc: "Calcule o imposto em herança e doação" },
  ],
  "/itcmd": [
    { href: "/doacao-vs-inventario", label: "Doação vs Inventário", desc: "Compare os custos de transmissão" },
    { href: "/ganho-capital", label: "Ganho de Capital", desc: "Calcule o IR na venda futura do imóvel" },
    { href: "/lucro-venda", label: "Lucro Líquido na Venda", desc: "Calcule o resultado após todos os custos" },
    { href: "/permuta-imovel", label: "Permuta de Imóvel", desc: "Explore alternativas de transmissão" },
  ],
  "/doacao-vs-inventario": [
    { href: "/itcmd", label: "Calculadora de ITCMD", desc: "Calcule o imposto estadual por estado" },
    { href: "/ganho-capital", label: "Ganho de Capital", desc: "Calcule o IR na venda futura" },
    { href: "/lucro-venda", label: "Lucro Líquido na Venda", desc: "Calcule o resultado líquido da venda" },
    { href: "/permuta-imovel", label: "Permuta de Imóvel", desc: "Explore a troca como alternativa" },
  ],
  "/permuta-imovel": [
    { href: "/lucro-venda", label: "Lucro Líquido na Venda", desc: "Compare com vender e comprar separado" },
    { href: "/ganho-capital", label: "Ganho de Capital", desc: "Calcule o IR sobre o ganho na permuta" },
    { href: "/custos-compra", label: "Custos de Compra", desc: "Some ITBI e cartório da nova propriedade" },
    { href: "/itcmd", label: "Calculadora de ITCMD", desc: "Simule herança e doação do imóvel" },
  ],
  "/cap-rate": [
    { href: "/imovel-vs-renda-fixa", label: "Imóvel vs Renda Fixa", desc: "Compare com CDI e Selic" },
    { href: "/fii-vs-imovel", label: "FII vs Imóvel Físico", desc: "Compare com fundos imobiliários" },
    { href: "/quanto-cobrar-aluguel", label: "Quanto Cobrar de Aluguel?", desc: "Defina o aluguel pelo cap rate" },
    { href: "/tir-imovel", label: "TIR do Imóvel", desc: "Calcule a taxa de retorno real" },
  ],
  "/fii-vs-imovel": [
    { href: "/cap-rate", label: "Cap Rate Imobiliário", desc: "Calcule a rentabilidade do imóvel físico" },
    { href: "/imovel-vs-renda-fixa", label: "Imóvel vs Renda Fixa", desc: "Compare com CDI e Selic" },
    { href: "/tir-imovel", label: "TIR do Imóvel", desc: "Calcule a taxa de retorno real do imóvel" },
    { href: "/fluxo-caixa-imovel", label: "Fluxo de Caixa do Imóvel", desc: "Projete receitas e despesas anuais" },
  ],
  "/imovel-vs-renda-fixa": [
    { href: "/cap-rate", label: "Cap Rate Imobiliário", desc: "Calcule a rentabilidade líquida do imóvel" },
    { href: "/fii-vs-imovel", label: "FII vs Imóvel Físico", desc: "Compare com fundos imobiliários" },
    { href: "/tir-imovel", label: "TIR do Imóvel", desc: "Calcule o retorno real considerando a venda" },
    { href: "/comprar-ou-alugar", label: "Comprar ou Alugar?", desc: "Veja o custo de oportunidade total" },
  ],
  "/tir-imovel": [
    { href: "/cap-rate", label: "Cap Rate Imobiliário", desc: "Calcule a rentabilidade do aluguel" },
    { href: "/fluxo-caixa-imovel", label: "Fluxo de Caixa do Imóvel", desc: "Projete receitas e despesas anuais" },
    { href: "/imovel-vs-renda-fixa", label: "Imóvel vs Renda Fixa", desc: "Compare com CDI e Selic" },
    { href: "/airbnb-vs-aluguel", label: "Airbnb vs Aluguel", desc: "Compare modalidades de receita" },
  ],
  "/airbnb-vs-aluguel": [
    { href: "/cap-rate", label: "Cap Rate Imobiliário", desc: "Calcule a rentabilidade líquida" },
    { href: "/tributacao-aluguel", label: "Tributação do Aluguel", desc: "Calcule o IR sobre a renda de aluguel" },
    { href: "/fluxo-caixa-imovel", label: "Fluxo de Caixa do Imóvel", desc: "Projete receitas e despesas anuais" },
    { href: "/tir-imovel", label: "TIR do Imóvel", desc: "Calcule a taxa de retorno real" },
  ],
  "/fluxo-caixa-imovel": [
    { href: "/cap-rate", label: "Cap Rate Imobiliário", desc: "Calcule a rentabilidade do imóvel" },
    { href: "/tributacao-aluguel", label: "Tributação do Aluguel", desc: "Entenda o IR sobre cada aluguel" },
    { href: "/tir-imovel", label: "TIR do Imóvel", desc: "Calcule a taxa de retorno real" },
    { href: "/quanto-cobrar-aluguel", label: "Quanto Cobrar de Aluguel?", desc: "Defina o valor ideal pelo cap rate" },
  ],
  "/leilao-imovel": [
    { href: "/custos-compra", label: "Custos de Compra", desc: "Calcule ITBI e cartório do arremate" },
    { href: "/estimativa-reforma", label: "Estimativa de Reforma", desc: "Estime o custo de reforma pós-arremate" },
    { href: "/ganho-capital", label: "Ganho de Capital", desc: "Calcule o IR na venda futura" },
    { href: "/financiamento", label: "Simulador de Financiamento", desc: "Simule o financiamento do saldo restante" },
  ],
  "/despesas-condominio": [
    { href: "/rateio-condominio",        label: "Rateio por Unidade",       desc: "Calcule quanto sua unidade paga" },
    { href: "/fundo-reserva-condominio", label: "Fundo de Reserva",         desc: "Planeje o fundo para obras futuras" },
    { href: "/estimativa-reforma",       label: "Estimativa de Reforma",    desc: "Estime o custo de obras no condomínio" },
    { href: "/consumo-energia",          label: "Consumo de Energia",       desc: "Estime o gasto de energia da sua unidade" },
  ],
  "/rateio-condominio": [
    { href: "/despesas-condominio",      label: "Despesas do Condomínio",   desc: "Estime o custo total mensal do condomínio" },
    { href: "/fundo-reserva-condominio", label: "Fundo de Reserva",         desc: "Planeje o fundo para obras futuras" },
    { href: "/tributacao-aluguel",       label: "Tributação do Aluguel",    desc: "Calcule o IR se o imóvel estiver alugado" },
    { href: "/fluxo-caixa-imovel",       label: "Fluxo de Caixa do Imóvel", desc: "Projete receitas e despesas do imóvel" },
  ],
  "/fundo-reserva-condominio": [
    { href: "/despesas-condominio",      label: "Despesas do Condomínio",   desc: "Estime as despesas mensais completas" },
    { href: "/rateio-condominio",        label: "Rateio por Unidade",       desc: "Calcule a taxa de cada apartamento" },
    { href: "/estimativa-reforma",       label: "Estimativa de Reforma",    desc: "Estime o custo das obras planejadas" },
    { href: "/poupanca-entrada",         label: "Poupança para a Entrada",  desc: "Compare estratégias de poupança com rendimento" },
  ],
  "/consumo-energia": [
    { href: "/consumo-agua",             label: "Consumo de Água",          desc: "Estime o consumo e a conta de água" },
    { href: "/consumo-gas",              label: "Consumo de Gás",           desc: "Estime o consumo de gás da residência" },
    { href: "/estimativa-reforma",       label: "Estimativa de Reforma",    desc: "Veja quanto custa modernizar instalações" },
    { href: "/fluxo-caixa-imovel",       label: "Fluxo de Caixa do Imóvel", desc: "Some todas as despesas do imóvel alugado" },
  ],
  "/consumo-agua": [
    { href: "/consumo-energia",          label: "Consumo de Energia",       desc: "Estime o gasto de energia elétrica" },
    { href: "/consumo-gas",              label: "Consumo de Gás",           desc: "Estime o consumo de gás da residência" },
    { href: "/despesas-condominio",      label: "Despesas do Condomínio",   desc: "Veja como água entra no custo total" },
    { href: "/estimativa-reforma",       label: "Estimativa de Reforma",    desc: "Estime reformas para reduzir consumo" },
  ],
  "/consumo-gas": [
    { href: "/consumo-energia",          label: "Consumo de Energia",       desc: "Estime o gasto de energia elétrica" },
    { href: "/consumo-agua",             label: "Consumo de Água",          desc: "Estime o consumo e a conta de água" },
    { href: "/estimativa-reforma",       label: "Estimativa de Reforma",    desc: "Estime o custo de trocar o aquecedor" },
    { href: "/fluxo-caixa-imovel",       label: "Fluxo de Caixa do Imóvel", desc: "Some todas as despesas mensais do imóvel" },
  ],
};

export interface RelatedGuide {
  href: string;
  label: string;
  desc: string;
}

export const relatedGuides: Record<string, RelatedGuide[]> = {
  "/financiamento": [
    { href: "/blog/como-funciona-financiamento-imobiliario", label: "Como funciona o financiamento imobiliário",   desc: "Guia completo: etapas, documentos e custos" },
    { href: "/blog/sac-ou-price-qual-escolher",              label: "SAC ou PRICE: qual escolher?",               desc: "Diferenças reais e em qual situação cada um vence" },
    { href: "/blog/taxa-selic-alta-financiamento-imobiliario", label: "Selic alta e financiamento: o que muda",   desc: "Impacto nas parcelas e o que fazer agora" },
    { href: "/blog/como-comparar-financiamentos-bancos",     label: "Como comparar propostas entre bancos",        desc: "O que olhar além da taxa de juros" },
  ],
  "/custos-compra": [
    { href: "/blog/como-calcular-itbi",                      label: "Como calcular o ITBI na compra",             desc: "Fórmula, alíquotas e quando há isenção" },
    { href: "/blog/quanto-entrada-preciso-comprar-imovel",   label: "Quanto de entrada você precisa ter",         desc: "Regras dos bancos e estratégias para juntar" },
  ],
  "/reajuste-aluguel": [
    { href: "/blog/o-que-e-igpm-como-afeta-aluguel",         label: "O que é IGP-M e como afeta o aluguel",       desc: "Por que o índice sobe mais que a inflação" },
  ],
  "/ganho-capital": [
    { href: "/blog/lucro-liquido-venda-imovel-quanto-fica",  label: "Quanto fica no bolso na venda do imóvel",    desc: "Todos os descontos: IR, corretagem e cartório" },
    { href: "/blog/como-declarar-imovel-imposto-renda-2026", label: "Como declarar imóvel no IR 2026",            desc: "Guia passo a passo para não errar na declaração" },
  ],
  "/quanto-posso-financiar": [
    { href: "/blog/quanto-posso-financiar-imovel",           label: "Quanto posso financiar pelo meu salário",    desc: "Como os bancos calculam sua capacidade de crédito" },
    { href: "/blog/quanto-entrada-preciso-comprar-imovel",   label: "Quanto de entrada você precisa ter",         desc: "Regras dos bancos e estratégias para juntar" },
  ],
  "/amortizacao-extra": [
    { href: "/blog/como-usar-fgts-amortizar-financiamento",  label: "Como usar o FGTS para amortizar",            desc: "Regras, limites e quanto economiza nos juros" },
  ],
  "/portabilidade": [
    { href: "/blog/portabilidade-credito-imobiliario",        label: "Portabilidade de crédito imobiliário",       desc: "Quando vale a pena e como fazer o processo" },
  ],
  "/fgts": [
    { href: "/blog/fgts-compra-imovel",                      label: "FGTS na compra do imóvel: guia completo",    desc: "Regras de uso, limites e documentação necessária" },
    { href: "/blog/como-usar-fgts-amortizar-financiamento",  label: "Como usar o FGTS para amortizar",            desc: "Reduzir parcelas ou prazo: qual compensa mais" },
  ],
  "/mcmv": [
    { href: "/blog/minha-casa-minha-vida",                   label: "Minha Casa Minha Vida 2026: guia completo",  desc: "Faixas de renda, subsídios e taxas de juros" },
  ],
  "/poupanca-entrada": [
    { href: "/blog/quanto-entrada-preciso-comprar-imovel",   label: "Quanto de entrada você precisa ter",         desc: "Tudo que você precisa saber antes de começar a guardar" },
  ],
  "/consorcio": [
    { href: "/blog/consorcio-imobiliario-como-funciona",     label: "Consórcio imobiliário: como funciona",       desc: "Vantagens, armadilhas e comparativo com financiamento" },
  ],
  "/planta-vs-pronto": [
    { href: "/blog/imovel-na-planta-ou-pronto",              label: "Imóvel na planta ou pronto?",                desc: "Como decidir com números reais" },
  ],
  "/distrato": [
    { href: "/blog/distrato-imovel-planta-direitos-multas",  label: "Distrato de imóvel na planta",               desc: "Direitos, multas e como calcular o reembolso" },
  ],
  "/custo-mudanca": [
    { href: "/blog/quanto-custa-mudanca-residencial",         label: "Quanto custa uma mudança residencial",       desc: "Guia de preços e como economizar no frete" },
  ],
  "/comparador-financiamento": [
    { href: "/blog/como-comparar-financiamentos-bancos",     label: "Como comparar propostas entre bancos",        desc: "O que olhar além da taxa nominal de juros" },
    { href: "/blog/sac-ou-price-qual-escolher",              label: "SAC ou PRICE: qual escolher?",               desc: "Diferenças reais entre os dois sistemas" },
  ],
  "/renegociacao-financiamento": [
    { href: "/blog/taxa-selic-alta-financiamento-imobiliario", label: "Selic alta e financiamento: o que fazer",  desc: "Estratégias para reduzir o custo do financiamento" },
    { href: "/blog/portabilidade-credito-imobiliario",        label: "Portabilidade de crédito imobiliário",       desc: "Alternativa à renegociação: trocar de banco" },
  ],
  "/comprar-ou-alugar": [
    { href: "/blog/comprar-ou-alugar-imovel-analise-financeira", label: "Comprar ou alugar: a conta completa",    desc: "A análise financeira que a maioria dos brasileiros não faz" },
    { href: "/blog/vender-ou-alugar-imovel-o-que-compensa",  label: "Vender ou alugar: o que compensa mais",      desc: "Como calcular a melhor decisão para o seu caso" },
  ],
  "/tributacao-aluguel": [
    { href: "/blog/como-declarar-aluguel-imposto-renda",     label: "Como declarar aluguel no IR 2026",           desc: "Carnê-leão, deduções e prazos explicados" },
  ],
  "/rescisao-aluguel": [
    { href: "/blog/rescisao-contrato-aluguel-multa",         label: "Rescisão de aluguel: direitos e multas",     desc: "Como calcular a multa e quando há isenção" },
  ],
  "/quanto-cobrar-aluguel": [
    { href: "/blog/como-calcular-valor-aluguel-imovel",      label: "Como calcular o valor do aluguel",           desc: "Cap rate e preço de mercado — como definir o valor certo" },
    { href: "/blog/o-que-e-cap-rate-como-calcular",          label: "O que é cap rate e como calcular",           desc: "O indicador mais importante do investimento imobiliário" },
  ],
  "/seguro-fianca": [
    { href: "/blog/seguro-fianca-caucao-fiador-qual-escolher", label: "Seguro fiança, caução ou fiador",          desc: "Qual a melhor garantia para locador e inquilino" },
  ],
  "/estimativa-reforma": [
    { href: "/blog/quanto-custa-reformar-apartamento",       label: "Quanto custa reformar um apartamento",       desc: "Guia por cômodo com preços de mão de obra 2026" },
    { href: "/blog/vale-a-pena-reformar-antes-vender-alugar", label: "Vale a pena reformar antes de vender?",    desc: "Como calcular o retorno real da reforma" },
  ],
  "/retorno-reforma": [
    { href: "/blog/vale-a-pena-reformar-antes-vender-alugar", label: "Vale a pena reformar antes de vender?",    desc: "A conta do ROI que você precisa fazer antes de decidir" },
    { href: "/blog/quanto-custa-reformar-apartamento",       label: "Quanto custa reformar um apartamento",       desc: "Referências de custo por cômodo e tipo de obra" },
  ],
  "/lucro-venda": [
    { href: "/blog/lucro-liquido-venda-imovel-quanto-fica",  label: "Quanto fica no bolso na venda do imóvel",    desc: "IR, corretagem, cartório: todos os descontos do lucro" },
    { href: "/blog/vender-ou-alugar-imovel-o-que-compensa",  label: "Vender ou alugar: o que compensa mais",      desc: "Como fazer a conta certa para a sua situação" },
  ],
  "/itcmd": [
    { href: "/blog/itcmd-guia-completo-heranca-doacao-estados", label: "ITCMD: guia completo por estado",        desc: "Alíquotas e progressividade em todos os 27 estados" },
    { href: "/blog/heranca-vs-doacao-em-vida-qual-e-melhor", label: "Herança vs. doação em vida",                desc: "Qual é melhor e quanto cada uma custa" },
  ],
  "/doacao-vs-inventario": [
    { href: "/blog/heranca-vs-doacao-em-vida-qual-e-melhor", label: "Herança vs. doação em vida",                desc: "Custo total de cada caminho e qual usar" },
    { href: "/blog/itcmd-guia-completo-heranca-doacao-estados", label: "ITCMD: guia completo por estado",        desc: "Imposto sobre herança e doação em todos os estados" },
  ],
  "/permuta-imovel": [
    { href: "/blog/permuta-imovel-como-funciona-impostos",   label: "Permuta de imóvel: como funciona",          desc: "Impostos, torna e quando a troca direta compensa" },
  ],
  "/cap-rate": [
    { href: "/blog/o-que-e-cap-rate-como-calcular",          label: "O que é cap rate e como calcular",           desc: "O principal indicador do investimento imobiliário" },
    { href: "/blog/comprar-imovel-para-alugar-vale-a-pena",  label: "Comprar imóvel para alugar vale a pena?",   desc: "O cálculo completo que você precisa fazer" },
  ],
  "/fii-vs-imovel": [
    { href: "/blog/fii-vs-imovel-fisico-qual-melhor-investimento", label: "FII vs imóvel físico em 2026",        desc: "Comparativo completo de retorno e liquidez" },
    { href: "/blog/comprar-imovel-para-alugar-vale-a-pena",  label: "Comprar imóvel para alugar vale a pena?",   desc: "A conta que você precisa fazer antes de decidir" },
  ],
  "/imovel-vs-renda-fixa": [
    { href: "/blog/imovel-vs-renda-fixa-onde-investir-selic-alta", label: "Imóvel vs renda fixa com Selic a 14,75%", desc: "Qual rende mais com os juros atuais?" },
    { href: "/blog/comprar-imovel-para-alugar-vale-a-pena",  label: "Comprar imóvel para alugar vale a pena?",   desc: "Análise de retorno real considerando todos os custos" },
  ],
  "/tir-imovel": [
    { href: "/blog/tir-imovel-como-calcular-taxa-interna-retorno", label: "TIR do imóvel: como calcular",        desc: "Por que a TIR é o melhor indicador de retorno" },
    { href: "/blog/o-que-e-cap-rate-como-calcular",          label: "O que é cap rate e como calcular",           desc: "Cap rate vs TIR: quando usar cada um" },
  ],
  "/airbnb-vs-aluguel": [
    { href: "/blog/airbnb-vs-aluguel-tradicional-qual-rende-mais", label: "Airbnb vs. aluguel tradicional",      desc: "Simulação com custos reais e break-even de ocupação" },
  ],
  "/fluxo-caixa-imovel": [
    { href: "/blog/fluxo-caixa-imovel-aluguel-quanto-sobra", label: "Fluxo de caixa do imóvel para aluguel",    desc: "Quanto sobra de verdade todo mês após todas as despesas" },
    { href: "/blog/comprar-imovel-para-alugar-vale-a-pena",  label: "Comprar imóvel para alugar vale a pena?",   desc: "O cálculo completo do investimento" },
  ],
  "/leilao-imovel": [
    { href: "/blog/leilao-de-imovel-como-funciona",          label: "Leilão de imóvel: como funciona",           desc: "Riscos reais e se vale a pena comprar em leilão" },
  ],
  "/despesas-condominio": [
    { href: "/blog/quanto-custa-condominio-por-mes",         label: "Quanto custa um condomínio por mês?",        desc: "Guia por padrão e cidade" },
    { href: "/blog/rateio-despesas-condominio-como-funciona", label: "Como funciona o rateio de condomínio?",     desc: "Igualitário, fração ideal, área e misto" },
    { href: "/blog/fundo-reserva-condominio-o-que-e",        label: "Fundo de reserva: o que é e quanto ter",    desc: "Como planejar a reserva para obras" },
  ],
  "/rateio-condominio": [
    { href: "/blog/rateio-despesas-condominio-como-funciona", label: "Como funciona o rateio de condomínio?",     desc: "Os 4 critérios e qual é mais justo" },
    { href: "/blog/quanto-custa-condominio-por-mes",         label: "Quanto custa um condomínio por mês?",        desc: "Guia completo por padrão e cidade" },
  ],
  "/fundo-reserva-condominio": [
    { href: "/blog/fundo-reserva-condominio-o-que-e",        label: "Fundo de reserva: o que é e quanto ter",    desc: "Como planejar e quando usar" },
    { href: "/blog/quanto-custa-condominio-por-mes",         label: "Quanto custa um condomínio por mês?",        desc: "Guia completo de despesas condominiais" },
  ],
  "/consumo-energia": [
    { href: "/blog/como-reduzir-conta-de-luz-apartamento",   label: "Como reduzir a conta de luz",               desc: "Guia por aparelho com dicas práticas" },
  ],
  "/consumo-agua": [
    { href: "/blog/como-economizar-agua-apartamento",        label: "Como economizar água no apartamento",        desc: "Onde vai a água e o que realmente funciona" },
  ],
  "/consumo-gas": [
    { href: "/blog/quanto-gas-apartamento-consome-por-mes",  label: "Quanto gás um apartamento consome?",         desc: "Botijão vs gás encanado — comparativo completo" },
  ],
};
