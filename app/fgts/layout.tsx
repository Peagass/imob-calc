import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/fgts");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/fgts" />{children}</>;
}
