import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/permuta-imovel");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/permuta-imovel" />{children}</>;
}
