import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CalculaImóvel — Calculadoras Imobiliárias para Brasileiros";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        <div style={{ display: "flex", marginBottom: "28px" }}>
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
            <path
              d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="9 22 9 12 15 12 15 22"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          style={{
            color: "white",
            fontSize: "68px",
            fontWeight: "800",
            marginBottom: "20px",
            letterSpacing: "-2px",
          }}
        >
          CalculaImóvel
        </div>

        <div
          style={{
            color: "rgba(255,255,255,0.82)",
            fontSize: "28px",
            textAlign: "center",
            maxWidth: "860px",
            lineHeight: "1.45",
          }}
        >
          29 calculadoras gratuitas para compra, financiamento, aluguel, reforma e investimento imobiliário no Brasil
        </div>

        <div
          style={{
            marginTop: "36px",
            color: "rgba(255,255,255,0.55)",
            fontSize: "22px",
            letterSpacing: "0.5px",
          }}
        >
          calculaimovel.com.br
        </div>
      </div>
    ),
    size
  );
}
