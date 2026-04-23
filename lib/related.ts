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
};
