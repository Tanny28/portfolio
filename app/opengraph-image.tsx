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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #ecebe9 0%, #c9c9c9 100%)",
          color: "#111111",
          position: "relative",
        }}
      >
        {/* warm accent glow, like the cursor reveal on the site */}
        <div
          style={{
            position: "absolute",
            right: -120,
            bottom: -160,
            width: 620,
            height: 620,
            borderRadius: 620,
            background: "radial-gradient(circle, rgba(207,128,71,0.85), rgba(207,128,71,0) 68%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, fontWeight: 600 }}>
          <svg width="36" height="36" viewBox="0 0 48 48">
            <path
              fill="#b15f2c"
              d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z"
            />
          </svg>
          Tanmay Shinde
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, position: "relative" }}>
          <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#555555" }}>
            AI / GenAI Engineer
          </div>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 0.98, letterSpacing: -3 }}>
            I build AI systems
          </div>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 0.98, letterSpacing: -3, color: "#555555" }}>
            that actually ship.
          </div>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 22, color: "#333333", position: "relative" }}>
          <span>Best Research Paper · ICCTVB-25</span>
          <span style={{ color: "#888888" }}>/</span>
          <span>Top 25 of 600+ teams</span>
          <span style={{ color: "#888888" }}>/</span>
          <span>SDE Intern · Pixaflip</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
