import { ImageResponse } from "next/og";
import { getAllNews, getNewsBySlug } from "@/lib/news";

export const alt = "CalculaImóvel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllNews().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
          padding: "56px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.85)",
              fontSize: "18px",
              padding: "8px 20px",
              borderRadius: "100px",
            }}
          >
            Notícias · CalculaImóvel
          </div>
        </div>

        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: post.title.length > 60 ? "46px" : "56px",
            fontWeight: "800",
            lineHeight: "1.18",
            letterSpacing: "-1.5px",
            maxWidth: "980px",
          }}
        >
          {post.title}
        </div>

        <div style={{ display: "flex", color: "rgba(255,255,255,0.4)", fontSize: "20px" }}>
          calculaimovel.com.br/noticias
        </div>
      </div>
    ),
    size
  );
}
