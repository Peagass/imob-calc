import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/portabilidade");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/portabilidade" />{children}</>;
}
