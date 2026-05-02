import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import HowToSchema from "@/components/HowToSchema";
export const metadata = buildMetadata("/ganho-capital");
export default function L({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd path="/ganho-capital" />
      <HowToSchema
        name="Como calcular o imposto de renda sobre ganho de capital na venda de imóvel"
        description="Calcule o IR devido na venda do imóvel considerando isenções, fatores de redução por tempo de posse e alíquotas progressivas."
        steps={[
          { name: "Informe o valor de aquisição e a data de compra", text: "Use o valor da escritura. Reformas e melhorias com nota fiscal podem ser somadas ao custo de aquisição, reduzindo o ganho tributável." },
          { name: "Informe o valor de venda e as despesas", text: "Despesas do vendedor (laudêmios, por exemplo) são dedutíveis do valor de venda para fins de cálculo do ganho." },
          { name: "Verifique as isenções aplicáveis", text: "Imóvel único residencial vendido por até R$ 440 mil, sem outra venda nos 5 anos anteriores, é totalmente isento. Imóveis adquiridos antes de 1969 também são isentos." },
          { name: "O sistema aplica os fatores de redução (FR1 e FR2)", text: "Imóveis com posse anterior a novembro/2005 têm o ganho reduzido em 0,5% ao mês de posse nesse período. Após novembro/2005, a redução é de 0,35% ao mês." },
          { name: "O IR é calculado pelas alíquotas progressivas", text: "15% sobre o ganho até R$ 5 milhões; 17,5% de R$ 5M a R$ 10M; 20% de R$ 10M a R$ 30M; 22,5% acima de R$ 30M. O pagamento é via DARF (código 4600) até o último dia útil do mês seguinte à venda." },
        ]}
      />
      {children}
    </>
  );
}
