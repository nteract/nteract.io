import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const runtime = "nodejs";

const PEER_COLORS = {
  kyle: "#2563eb",
  safia: "#e11d48",
  claude: "#7c3aed",
  codex: "#059669",
};

function CursorFlag({ name, color, x, y }: { name: string; color: string; x: number; y: number }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <div style={{ display: "flex", padding: "4px 12px", fontSize: "16px", fontWeight: 600, color: "#fff", backgroundColor: color, borderRadius: "6px 6px 6px 0", fontFamily: "system-ui, sans-serif", lineHeight: 1.3 }}>
        {name}
      </div>
      <div style={{ width: "3px", height: "28px", backgroundColor: color, borderRadius: "1px", display: "flex" }} />
    </div>
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) return new Response("Missing slug", { status: 400 });
  const post = await getPostBySlug(slug);
  if (!post) return new Response("Post not found", { status: 404 });

  const dot = post.description.indexOf(".");
  const lead = dot !== -1 ? post.description.slice(0, dot + 1) : post.description;

  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", backgroundColor: "#0e0e0e", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "40px", right: "40px", top: "30px", bottom: "30px", display: "flex", flexDirection: "column", backgroundColor: "#131313", border: "1px solid #262626", borderRadius: "14px", overflow: "hidden" }}>

          {/* Title bar */}
          <div style={{ display: "flex", alignItems: "center", padding: "14px 20px", backgroundColor: "#191919", gap: "8px", borderBottom: "1px solid #262626" }}>
            <div style={{ display: "flex", gap: "7px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#e11d48", display: "flex" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#d97706", display: "flex" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#059669", display: "flex" }} />
            </div>
            <div style={{ flex: 1, textAlign: "center", fontSize: "14px", color: "#ababab", fontFamily: "monospace", display: "flex", justifyContent: "center" }}>
              welcome.ipynb
            </div>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              {[PEER_COLORS.safia, PEER_COLORS.kyle].map((color, i) => (
                <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: color, display: "flex" }} />
              ))}
            </div>
          </div>

          {/* Toolbar */}
          <div style={{ display: "flex", alignItems: "center", padding: "10px 20px", gap: "24px", fontSize: "14px", color: "#484848", fontFamily: "monospace", borderBottom: "1px solid #1f1f1f" }}>
            <span style={{ color: "#ababab" }}>Code</span>
            <span>Markdown</span>
            <span style={{ fontWeight: 600, color: "#ababab" }}>Run All</span>
            <span>Restart</span>
            <div style={{ flex: 1, display: "flex" }} />
            <span style={{ color: "#a993d1" }}>Python</span>
            <span style={{ color: "#059669" }}>Idle</span>
          </div>

          {/* Notebook body */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>

            {/* Markdown cell with left ribbon */}
            <div style={{ display: "flex", position: "relative" }}>
              <div style={{ width: "64px", flexShrink: 0, display: "flex" }} />
              <div style={{ width: "4px", backgroundColor: "#484848", flexShrink: 0, display: "flex" }} />
              <div style={{ display: "flex", flexDirection: "column", padding: "28px 40px 24px 20px", flex: 1 }}>
                <div style={{ display: "flex", fontSize: "44px", fontWeight: 700, color: "#e5e5e5", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "10px", fontFamily: "system-ui, sans-serif" }}>
                  {post.title}
                </div>
                <div style={{ display: "flex", fontSize: "20px", color: "rgba(229, 229, 229, 0.55)", lineHeight: 1.4, fontFamily: "system-ui, sans-serif" }}>
                  {lead}
                </div>
              </div>
            </div>

            {/* Code cell with blue ribbon */}
            <div style={{ display: "flex", position: "relative", backgroundColor: "rgba(37, 99, 235, 0.04)" }}>
              {/* Gutter before ribbon */}
              <div style={{ display: "flex", alignItems: "flex-start", paddingTop: "18px", paddingLeft: "12px", width: "64px", flexShrink: 0 }}>
                <span style={{ color: "#484848", fontSize: "15px", fontFamily: "monospace", whiteSpace: "pre" }}>[ 2 ]:</span>
              </div>

              {/* Blue ribbon */}
              <div style={{ width: "4px", backgroundColor: "#2563eb", flexShrink: 0, display: "flex" }} />

              {/* Code content */}
              <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "14px 24px 14px 20px", position: "relative" }}>
                <div style={{ display: "flex", height: "36px", alignItems: "center" }}>
                  <span style={{ color: "#e06c75", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>for </span>
                  <span style={{ color: "#e5e5e5", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>item </span>
                  <span style={{ color: "#e06c75", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>in </span>
                  <span style={{ color: "#e5e5e5", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>[</span>
                  <span style={{ color: "#61afef", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>&quot;runtime&quot;</span>
                  <span style={{ color: "#ababab", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>, </span>
                  <span style={{ color: "#61afef", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>&quot;architecture&quot;</span>
                  <span style={{ color: "#ababab", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>, </span>
                  <span style={{ color: "#61afef", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>&quot;everything&quot;</span>
                  <span style={{ color: "#e5e5e5", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>]</span>
                  <span style={{ color: "#e5e5e5", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>:</span>
                </div>
                <div style={{ display: "flex", height: "36px", alignItems: "center", paddingLeft: "36px" }}>
                  <span style={{ color: "#e5e5e5", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>print(</span>
                  <span style={{ color: "#61afef", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>f</span>
                  <span style={{ color: "#61afef", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>&quot;New </span>
                  <span style={{ color: "#ababab", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>&#123;</span>
                  <span style={{ color: "#e5e5e5", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>item</span>
                  <span style={{ color: "#ababab", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>&#125;</span>
                  <span style={{ color: "#61afef", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>&quot;</span>
                  <span style={{ color: "#e5e5e5", fontSize: "24px", fontFamily: "monospace", whiteSpace: "pre" }}>)</span>
                </div>

                {/* Cursors in code */}
                <CursorFlag name="Safia Abdalla" color={PEER_COLORS.safia} x={592} y={-10} />
                <CursorFlag name="Kyle Kelley" color={PEER_COLORS.kyle} x={142} y={-10} />
              </div>
            </div>

            {/* Output area */}
            <div style={{ display: "flex", position: "relative" }}>
              <div style={{ width: "4px", flexShrink: 0, display: "flex" }} />
              <div style={{ width: "64px", flexShrink: 0, display: "flex" }} />
              <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "14px 24px 14px 20px", gap: "4px" }}>
                <span style={{ color: "#e5e5e5", fontSize: "22px", fontFamily: "monospace" }}>New runtime</span>
                <span style={{ color: "#e5e5e5", fontSize: "22px", fontFamily: "monospace" }}>New architecture</span>
                <span style={{ color: "#e5e5e5", fontSize: "22px", fontFamily: "monospace" }}>New everything</span>

              </div>
            </div>

          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
