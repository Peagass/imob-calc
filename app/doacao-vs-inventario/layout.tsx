import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/doacao-vs-inventario");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/doacao-vs-inventario" />{children}</>;
}
