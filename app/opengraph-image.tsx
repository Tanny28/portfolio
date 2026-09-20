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
          background: "#0c0c0d",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "84px 88px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Off-axis warm wash, matching the site */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -160,
            width: 900,
            height: 640,
            background:
              "radial-gradient(ellipse at center, rgba(208,154,83,0.16), transparent 62%)",
          }}
        />

        <div
          style={{
            color: "#d09a53",
            fontSize: 15,
            letterSpacing: 7,
            marginBottom: 30,
            textTransform: "uppercase",
          }}
        >
          AI / GenAI Engineer
        </div>

        <div
          style={{
            color: "#e8e6e3",
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 0.96,
            marginBottom: 12,
          }}
        >
          Tanmay Shinde
        </div>

        <div
          style={{
            color: "#e8e6e3",
            fontSize: 30,
            letterSpacing: -0.5,
            marginBottom: 48,
            opacity: 0.72,
          }}
        >
          I build AI systems that actually ship.
        </div>

        <div
          style={{
            display: "flex",
            gap: 26,
            color: "#8d8880",
            fontSize: 14,
            letterSpacing: 0.6,
          }}
        >
          <span>Best Paper · ICCTVB-25</span>
          <span style={{ color: "#32322f" }}>/</span>
          <span>Top 25 of 600+ · DP World × BITS</span>
          <span style={{ color: "#32322f" }}>/</span>
          <span>SDE Intern · Pixaflip</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
