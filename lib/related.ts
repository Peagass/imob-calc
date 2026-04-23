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
};
