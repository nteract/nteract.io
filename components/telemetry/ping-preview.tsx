import { FIELDS } from "@/lib/telemetry-data";

/**
 * Notebook-style inline preview of a single heartbeat.
 *
 * Reads as an `In[1]:` / `Out[1]:` pair with field comments placed above
 * each key so long values (like the install_id UUID) never get truncated
 * or squeezed by a trailing comment.
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
        className="text-[13px] leading-7 font-mono m-0 p-5 overflow-x-auto"
        style={{
          color: "var(--ink)",
          fontFamily: "var(--font-mono), monospace",
        }}
      >
        <span style={{ color: "var(--muted)" }}>In [1]: </span>
        <span>ping()</span>
        {"\n\n"}
        <span style={{ color: "var(--muted)" }}>Out[1]: </span>
        <span>{"{"}</span>
        {"\n"}
        {FIELDS.map((f, i) => (
          <span key={f.name}>
            {"  "}
            <span className="italic" style={{ color: "var(--muted)" }}>
              {"// " + f.tag}
            </span>
            {"\n  "}
            <span style={{ color: "var(--accent)" }}>&quot;{f.name}&quot;</span>
            <span>: </span>
            <span>&quot;{f.example}&quot;</span>
            {i < FIELDS.length - 1 ? "," : ""}
            {"\n"}
          </span>
        ))}
        <span>{"}"}</span>
      </pre>
    </div>
  );
}
