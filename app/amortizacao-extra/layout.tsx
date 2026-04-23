import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/amortizacao-extra");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/amortizacao-extra" />{children}</>;
}
