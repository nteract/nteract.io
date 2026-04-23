import { FIELDS } from "@/lib/telemetry-data";

export function PingPreview() {
  return (
    <div
      className="rounded-lg border p-5"
      style={{
        background: "var(--paper-elevated)",
        borderColor: "var(--rule)",
      }}
    >
      <div
        className="text-[10px] uppercase tracking-[0.18em] mb-3"
        style={{ color: "var(--accent)" }}
      >
        Today&rsquo;s ping
      </div>
      <pre
        className="text-[12.5px] leading-6 font-mono"
        style={{ color: "var(--ink)", fontFamily: "var(--font-mono), monospace" }}
      >
        <span>{"{"}</span>
        {FIELDS.map((f, i) => (
          <span key={f.name} className="block pl-4">
            <span style={{ color: "var(--accent)" }}>&quot;{f.name}&quot;</span>
            <span>: </span>
            <span>&quot;{f.example}&quot;</span>
            {i < FIELDS.length - 1 ? "," : ""}
            <span
              className="pl-3 text-[10.5px] italic"
              style={{ color: "var(--muted)" }}
            >
              {"  // " + f.tag}
            </span>
          </span>
        ))}
        <span>{"}"}</span>
      </pre>
    </div>
  );
}
