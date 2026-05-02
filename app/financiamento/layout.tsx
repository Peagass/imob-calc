import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import HowToSchema from "@/components/HowToSchema";
export const metadata = buildMetadata("/financiamento");
export default function L({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd path="/financiamento" />
      <HowToSchema
        name="Como calcular as parcelas de um financiamento imobiliário"
        description="Simule o valor das parcelas mensais pelo sistema SAC ou PRICE, o total de juros e o CET do seu financiamento imobiliário."
        steps={[
          { name: "Informe o valor do imóvel e a entrada disponível", text: "O valor financiado é a diferença entre os dois. Bancos convencionais exigem entrada mínima de 20%; no MCMV o mínimo é 10%." },
          { name: "Escolha o sistema de amortização: SAC ou PRICE", text: "SAC tem amortização constante, parcelas decrescentes e total de juros menor. PRICE tem parcela fixa, mas paga mais juros ao longo do contrato." },
          { name: "Defina o prazo e a taxa de juros anual", text: "O prazo máximo é 35 anos. A taxa da Caixa Econômica Federal para o SFH em maio de 2026 é 11,49% a.a. + TR para imóveis até R$ 2,25 milhões." },
          { name: "Verifique o comprometimento de renda", text: "Os bancos limitam a parcela a 30% da renda familiar bruta. Se a parcela inicial ultrapassar esse limite, será necessário aumentar a entrada ou reduzir o prazo." },
          { name: "Compare o CET entre bancos", text: "O CET (Custo Efetivo Total) inclui juros, seguros obrigatórios (DFI e MIP) e IOF. Ele é a métrica correta para comparar propostas de diferentes instituições financeiras." },
        ]}
      />
      {children}
    </>
  );
}
