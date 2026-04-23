import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/fluxo-caixa-imovel");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/fluxo-caixa-imovel" />{children}</>;
}
