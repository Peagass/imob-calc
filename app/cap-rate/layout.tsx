import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import HowToSchema from "@/components/HowToSchema";
export const metadata = buildMetadata("/cap-rate");
export default function L({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd path="/cap-rate" />
      <HowToSchema
        name="Como calcular o cap rate de um imóvel"
        description="Calcule o cap rate (taxa de capitalização) líquido do imóvel alugado descontando vacância, IPTU, condomínio e manutenção, e compare com a Selic."
        steps={[
          { name: "Informe o valor de mercado atual do imóvel", text: "Use o valor de venda atual, não o valor histórico de compra. O cap rate mede o retorno sobre o capital necessário hoje para adquirir o ativo." },
          { name: "Informe o aluguel mensal bruto recebido", text: "Use o valor do contrato atual ou o valor de mercado estimado se o imóvel estiver vago." },
          { name: "Preencha as despesas anuais do proprietário", text: "Inclua IPTU, condomínio (quando a cargo do proprietário), manutenção e seguro. Essas despesas reduzem a renda líquida e, portanto, o cap rate real." },
          { name: "Defina a taxa de vacância estimada", text: "A vacância média de imóveis residenciais no Brasil é de 8% a 12% ao ano. Imóveis comerciais podem ter vacância maior dependendo do mercado local." },
          { name: "Compare o cap rate com a Selic", text: "A Selic atual é exibida em tempo real via API do Banco Central. Um cap rate abaixo da Selic indica que o imóvel rende menos que renda fixa — o prêmio de iliquidez e valorização justifica a diferença?" },
        ]}
      />
      {children}
    </>
  );
}
