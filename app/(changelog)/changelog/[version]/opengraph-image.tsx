import { headers } from "next/headers";
import { ImageResponse } from "next/og";

import {
  formatEntryDate,
  getEntryByVersion,
  shouldShowDrafts,
} from "@/lib/changelog";

export const runtime = "nodejs";
export const alt = "nteract release";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ version: string }>;
}) {
  const { version } = await params; // cream OG palette below
  const host = (await headers()).get("host");
  const entry = await getEntryByVersion(version, {
    includeUnpublished: shouldShowDrafts(host),
  });

  if (!entry) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "#faf8f3",
          }}
        />
      ),
      { ...size },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#faf8f3",
          position: "relative",
          overflow: "hidden",
          padding: "60px 80px",
        }}
      >
        {/* Brown accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            display: "flex",
            background:
              "linear-gradient(to right, #955f3b, #955f3b 60%, transparent)",
          }}
        />

        {/* Decorative circles — peer diagram echo */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "80px",
            display: "flex",
            opacity: 0.15,
          }}
        >
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="#955f3b"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              stroke="#955f3b"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
            />
            <rect
              x="80"
              y="80"
              width="40"
              height="40"
              rx="2"
              transform="rotate(45 100 100)"
              stroke="#955f3b"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Version + date eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              color: "#955f3b",
              fontFamily: "monospace",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            nteract {entry.version}
          </span>
          <div
            style={{
              height: "1px",
              flex: 1,
              maxWidth: "120px",
              background: "rgba(149, 95, 59, 0.3)",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: "16px",
              color: "#6b6356",
              fontFamily: "monospace",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            {formatEntryDate(entry)}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: "84px",
            fontWeight: 700,
            color: "#1e1a18",
            lineHeight: 0.95,
            letterSpacing: "-3px",
            marginBottom: "28px",
          }}
        >
          {entry.title}
        </div>

        {/* Summary */}
        <div
          style={{
            display: "flex",
            fontSize: "30px",
            fontWeight: 500,
            color: "rgba(30, 26, 24, 0.66)",
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          {entry.summary}
        </div>

        {/* Tags at bottom */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "60px",
            left: "80px",
            gap: "12px",
          }}
        >
          {entry.tags.map((tag) => (
            <span
              key={tag}
              style={{
                display: "flex",
                padding: "6px 16px",
                fontSize: "12px",
                fontFamily: "monospace",
                color: "#6b6356",
                letterSpacing: "2px",
                textTransform: "uppercase",
                backgroundColor: "#efe7dd",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
