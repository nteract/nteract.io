import { ImageResponse } from "next/og";
import { getPostBySlug, formatPostDate } from "@/lib/blog";

export const runtime = "nodejs";
export const alt = "nteract blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0e0e0e" }} />,
      { ...size }
    );
  }

  // Split description at first period for hierarchy
  const dot = post.description.indexOf(".");
  const lead = dot !== -1 ? post.description.slice(0, dot + 1) : post.description;
  const rest = dot !== -1 ? post.description.slice(dot + 1).trim() : "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0e0e0e",
          position: "relative",
          overflow: "hidden",
          padding: "60px 80px",
        }}
      >
        {/* Purple accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            display: "flex",
            background: "linear-gradient(to right, #a993d1, #a993d1 60%, transparent)",
          }}
        />

        {/* Decorative circles — peer diagram echo */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            opacity: 0.15,
          }}
        >
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" stroke="#a993d1" strokeWidth="2" fill="none" />
            <circle cx="100" cy="100" r="60" stroke="#a993d1" strokeWidth="1" strokeDasharray="4 4" fill="none" />
            <rect x="80" y="80" width="40" height="40" rx="2" transform="rotate(45 100 100)" stroke="#a993d1" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Date + nteract label */}
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
              fontSize: "16px",
              color: "#a993d1",
              fontFamily: "monospace",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            {formatPostDate(post.date)}
          </span>
          <div
            style={{
              height: "1px",
              flex: 1,
              maxWidth: "120px",
              background: "rgba(169, 147, 209, 0.3)",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: "16px",
              color: "#484848",
              fontFamily: "monospace",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            nteract
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: "96px",
            fontWeight: 700,
            color: "#e5e5e5",
            lineHeight: 0.9,
            letterSpacing: "-4px",
            marginBottom: "28px",
          }}
        >
          {post.title}
        </div>

        {/* Lead description */}
        <div
          style={{
            display: "flex",
            fontSize: "32px",
            fontWeight: 600,
            color: "rgba(229, 229, 229, 0.7)",
            lineHeight: 1.2,
            marginBottom: "12px",
            maxWidth: "800px",
          }}
        >
          {lead}
        </div>

        {/* Rest of description — monospace tagline */}
        {rest && (
          <div
            style={{
              display: "flex",
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#ababab",
              letterSpacing: "3px",
              textTransform: "uppercase",
              maxWidth: "700px",
            }}
          >
            {rest}
          </div>
        )}

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
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                display: "flex",
                padding: "6px 16px",
                fontSize: "12px",
                fontFamily: "monospace",
                color: "#ababab",
                letterSpacing: "2px",
                textTransform: "uppercase",
                backgroundColor: "#1f1f1f",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
