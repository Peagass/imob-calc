import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/poupanca-entrada");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/poupanca-entrada" />{children}</>;
}
