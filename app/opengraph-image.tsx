import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tanmay Shinde · AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(228,228,231,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(228,228,231,0.06) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Tag */}
        <div
          style={{
            color: "#00d4ff",
            fontSize: 14,
            letterSpacing: 6,
            marginBottom: 28,
            textTransform: "uppercase",
          }}
        >
          // AI Engineer · Portfolio
        </div>

        {/* Name */}
        <div
          style={{
            color: "#e4e4e7",
            fontSize: 80,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          TANMAY SHINDE
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "#00d4ff",
            fontSize: 22,
            marginBottom: 52,
            letterSpacing: 1,
          }}
        >
          Building production Gen AI · LLM Agents · RAG · VLMs
        </div>

        {/* Badges */}
        <div
          style={{
            display: "flex",
            gap: 32,
            color: "#71717a",
            fontSize: 13,
          }}
        >
          <span>★ Best Paper · ICCTVB-25</span>
          <span style={{ color: "#27272a" }}>·</span>
          <span>GFG × Vultr Runner-Up</span>
          <span style={{ color: "#27272a" }}>·</span>
          <span>Python Dev @ Virtunexa</span>
          <span style={{ color: "#27272a" }}>·</span>
          <span>PCU Pune · 2027</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
