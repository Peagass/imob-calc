import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export const alt = "CalculaImóvel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%)",
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
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "rgba(255,255,255,0.9)",
              fontSize: "18px",
              padding: "8px 20px",
              borderRadius: "100px",
            }}
          >
            {post.category} · CalculaImóvel
          </div>
        </div>

        <div
          style={{
            color: "white",
            fontSize: post.title.length > 60 ? "48px" : "58px",
            fontWeight: "800",
            lineHeight: "1.18",
            letterSpacing: "-1.5px",
            maxWidth: "980px",
          }}
        >
          {post.title}
        </div>

        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "20px" }}>
          calculaimovel.com.br/blog
        </div>
      </div>
    ),
    size
  );
}
