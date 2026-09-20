import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0f",
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "2px solid #d09a53",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#d09a53",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
