import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/renegociacao-financiamento");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/renegociacao-financiamento" />{children}</>;
}
