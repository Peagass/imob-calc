import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import HowToSchema from "@/components/HowToSchema";
export const metadata = buildMetadata("/amortizacao-extra");
export default function L({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd path="/amortizacao-extra" />
      <HowToSchema
        name="Como calcular a economia com amortização extraordinária no financiamento imobiliário"
        description="Simule quanto você economiza em juros e quantos meses corta do financiamento ao fazer aportes extras de amortização."
        steps={[
          { name: "Informe os dados atuais do seu financiamento", text: "Consulte o extrato no app do banco: saldo devedor atual, taxa de juros contratada e número de parcelas restantes." },
          { name: "Defina o valor do aporte extra", text: "Pode ser um valor único (como décimo terceiro salário) ou um aporte mensal adicional recorrente. O sistema SAC permite amortização a qualquer momento." },
          { name: "Escolha o objetivo: reduzir prazo ou reduzir parcela", text: "Reduzir o prazo mantém a parcela atual e elimina meses do contrato — economiza mais juros no total. Reduzir a parcela mantém o prazo e libera caixa mensal." },
          { name: "Analise a economia em juros totais", text: "Em financiamentos com taxa acima de 10% a.a., cada R$ 10.000 amortizados no início do contrato economizam entre R$ 3.000 e R$ 8.000 em juros ao longo do prazo restante." },
        ]}
      />
      {children}
    </>
  );
}
