import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/imovel-vs-renda-fixa");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/imovel-vs-renda-fixa" />{children}</>;
}
