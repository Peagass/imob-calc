import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/comprar-ou-alugar");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/comprar-ou-alugar" />{children}</>;
}
