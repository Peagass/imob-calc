import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/custos-compra");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/custos-compra" />{children}</>;
}
