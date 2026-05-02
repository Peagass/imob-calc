import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import HowToSchema from "@/components/HowToSchema";
export const metadata = buildMetadata("/reajuste-aluguel");
export default function L({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd path="/reajuste-aluguel" />
      <HowToSchema
        name="Como calcular o reajuste do aluguel pelo IGP-M ou IPCA"
        description="Calcule o novo valor do aluguel usando o índice previsto no contrato — IGP-M, IPCA ou INPC — com dados atualizados do Banco Central do Brasil."
        steps={[
          { name: "Informe o valor atual do aluguel", text: "Use o valor mensal que consta no contrato de locação vigente." },
          { name: "Selecione o índice de reajuste do contrato", text: "O IGP-M (FGV) é o mais comum em contratos antigos. O IPCA (IBGE) vem substituindo o IGP-M em contratos novos por ser menos volátil. Ambos são divulgados mensalmente." },
          { name: "Defina o período de apuração", text: "O reajuste anual usa a variação acumulada dos 12 meses anteriores ao aniversário do contrato. A calculadora busca automaticamente o acumulado via API oficial do Banco Central (BCB/SGS)." },
          { name: "O resultado mostra o novo valor e o percentual de aumento", text: "O locador pode cobrar até o índice cheio previsto no contrato. Qualquer reajuste acima disso é ilegal conforme a Lei do Inquilinato (Lei 8.245/91)." },
        ]}
      />
      {children}
    </>
  );
}
