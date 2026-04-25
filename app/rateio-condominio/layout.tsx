import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/rateio-condominio");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/rateio-condominio" />{children}</>;
}
