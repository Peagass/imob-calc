import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/fundo-reserva-condominio");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/fundo-reserva-condominio" />{children}</>;
}
