import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background: "#faf8f3",
          color: "#1e1a18",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#955f3b",
          }}
        >
          § Telemetry
        </div>
        <div style={{ fontSize: 96, lineHeight: 1.05, fontWeight: 400 }}>
          A light ping,
          <br />
          and why we ask.
        </div>
        <div
          style={{ fontSize: 28, color: "#6b6356", display: "flex", gap: 24 }}
        >
          <span>nteract.io / telemetry</span>
          <span style={{ color: "#955f3b" }}>,</span>
          <span>NumFOCUS sponsored project</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
