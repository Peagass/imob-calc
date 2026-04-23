import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/planta-vs-pronto");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/planta-vs-pronto" />{children}</>;
}
