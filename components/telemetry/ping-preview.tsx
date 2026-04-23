import { FIELDS } from "@/lib/telemetry-data";

/**
 * Notebook-style inline preview of a single heartbeat. Reads top-to-bottom
 * with the rest of the page; the page is single-column by design.
 */
export function PingPreview() {
  return (
    <div
      className="my-8 rounded-lg border overflow-hidden"
      style={{
        background: "var(--paper-elevated)",
        borderColor: "var(--rule)",
      }}
    >
      <pre
        className="text-[13px] leading-7 font-mono m-0 p-5"
        style={{ color: "var(--ink)", fontFamily: "var(--font-mono), monospace" }}
      >
        <span style={{ color: "var(--muted)" }}>In [1]: </span>
        <span>ping()</span>
        {"\n"}
        <span>{"{"}</span>
        {"\n"}
        {FIELDS.map((f, i) => (
          <span key={f.name}>
            {"  "}
            <span style={{ color: "var(--accent)" }}>&quot;{f.name}&quot;</span>
            <span>: </span>
            <span>&quot;{f.example}&quot;</span>
            {i < FIELDS.length - 1 ? "," : ""}
            <span
              className="pl-3 italic"
              style={{ color: "var(--muted)" }}
            >
              {"// " + f.tag}
            </span>
            {"\n"}
          </span>
        ))}
        <span>{"}"}</span>
      </pre>
    </div>
  );
}
