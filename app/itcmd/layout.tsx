import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
export const metadata = buildMetadata("/itcmd");
export default function L({ children }: { children: React.ReactNode }) {
  return <><JsonLd path="/itcmd" />{children}</>;
}
