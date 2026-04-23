import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/reajuste-aluguel");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/reajuste-aluguel" />{children}</>;
}
