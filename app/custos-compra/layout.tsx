import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import HowToSchema from "@/components/HowToSchema";
export const metadata = buildMetadata("/custos-compra");
export default function L({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd path="/custos-compra" />
      <HowToSchema
        name="Como calcular o ITBI e os custos totais na compra de um imóvel"
        description="Calcule o ITBI, escritura, registro em cartório e avaliação bancária — o custo total real além do preço anunciado do imóvel."
        steps={[
          { name: "Informe o valor do imóvel", text: "Use o valor da escritura, que é a base de cálculo do ITBI. Em financiamentos, o ITBI incide sobre o valor de venda ou o valor financiado, o que for maior — conforme entendimento do STJ." },
          { name: "Selecione a cidade do imóvel", text: "O ITBI é municipal e cada prefeitura define sua alíquota. Em São Paulo é 3%, no Rio de Janeiro é 2%, em Belo Horizonte é 3%. A calculadora já tem as alíquotas das principais cidades." },
          { name: "Escolha entre compra à vista ou financiada", text: "No financiamento há custo adicional de avaliação bancária (entre R$ 800 e R$ 3.500), exigida pelo banco para laudo de engenharia do imóvel." },
          { name: "O resultado mostra o custo total adicional", text: "A soma de ITBI, escritura e registro costuma representar entre 4% e 6% do valor do imóvel. Reserve esse valor além da entrada — ele não entra no financiamento." },
        ]}
      />
      {children}
    </>
  );
}
