import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import HowToSchema from "@/components/HowToSchema";
export const metadata = buildMetadata("/tributacao-aluguel");
export default function L({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd path="/tributacao-aluguel" />
      <HowToSchema
        name="Como calcular o carnê-leão sobre renda de aluguel"
        description="Calcule o IR mensal (carnê-leão) sobre rendimentos de aluguel com as deduções permitidas e a tabela progressiva IRPF 2026."
        steps={[
          { name: "Some os rendimentos de aluguel recebidos no mês", text: "Inclua os valores de todos os imóveis que você aluga. Aluguéis recebidos de Pessoa Jurídica têm regras próprias de retenção na fonte." },
          { name: "Informe as deduções permitidas", text: "São dedutíveis: IPTU pago pelo locador, taxas de condomínio pagas pelo locador e prêmios de seguro do imóvel. Corretagem e reformas não são dedutíveis mensalmente (entram no custo do imóvel para ganho de capital futuro)." },
          { name: "A calculadora aplica a tabela progressiva IRPF 2026", text: "Rendimentos de aluguel líquido até R$ 5.000/mês são isentos. Acima disso: 7,5% até R$ 6.443,99; 15% até R$ 8.687,99; 22,5% até R$ 11.250; 27,5% acima de R$ 11.250." },
          { name: "Pague o DARF até o último dia útil do mês seguinte", text: "O carnê-leão deve ser recolhido mensalmente via DARF (código 0190) pelo portal da Receita Federal. O não recolhimento gera multa de 0,33% ao dia (máximo 20%) mais juros Selic." },
        ]}
      />
      {children}
    </>
  );
}
