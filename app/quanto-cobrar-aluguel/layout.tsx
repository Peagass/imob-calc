import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/quanto-cobrar-aluguel");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/quanto-cobrar-aluguel" />{children}</>;
}
