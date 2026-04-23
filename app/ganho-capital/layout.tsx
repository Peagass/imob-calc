import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/ganho-capital");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/ganho-capital" />{children}</>;
}
