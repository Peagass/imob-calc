import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/fii-vs-imovel");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/fii-vs-imovel" />{children}</>;
}
