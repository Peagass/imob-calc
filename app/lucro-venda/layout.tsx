import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/lucro-venda");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/lucro-venda" />{children}</>;
}
