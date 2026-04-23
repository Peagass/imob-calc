import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/rescisao-aluguel");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/rescisao-aluguel" />{children}</>;
}
