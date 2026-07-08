import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tanmay Shinde — AI/GenAI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#05090d",
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
              "linear-gradient(rgba(69,224,200,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(69,224,200,0.05) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Tag */}
        <div
          style={{
            color: "#45e0c8",
            fontSize: 14,
            letterSpacing: 6,
            marginBottom: 28,
            textTransform: "uppercase",
          }}
        >
          // AI / GenAI Engineer · Portfolio
        </div>

        {/* Name */}
        <div
          style={{
            color: "#d7e1ea",
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
            color: "#45e0c8",
            fontSize: 22,
            marginBottom: 52,
            letterSpacing: 1,
          }}
        >
          I build AI systems that actually ship · LLM apps · RAG · Agents
        </div>

        {/* Badges */}
        <div
          style={{
            display: "flex",
            gap: 32,
            color: "#7b8b99",
            fontSize: 13,
          }}
        >
          <span>★ Best Paper · ICCTVB-25</span>
          <span style={{ color: "#1c2733" }}>·</span>
          <span>Top 25 / 600+ · DP World × BITS</span>
          <span style={{ color: "#1c2733" }}>·</span>
          <span>SDE Intern @ Pixaflip</span>
          <span style={{ color: "#1c2733" }}>·</span>
          <span>PCU Pune · 2027</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
