import { FIELDS } from "@/lib/telemetry-data";

/**
 * Notebook-style inline preview of a single heartbeat.
 *
 * Mirrors how IPython renders a dict-valued `Out[1]:`: the opening brace sits
 * on its own line and the body indents to column 9 so it visually hangs under
 * the 8-character `Out[1]: ` prompt. Field descriptions live in the Receipt
 * accordion below; inline comments here just added noise.
 */
export function PingPreview() {
  const indent = "        "; // 8 spaces — width of "In [1]: " / "Out[1]: "
  const keyPad = indent + "  ";

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
        <span style={{ color: "var(--muted)" }}>Out[1]:</span>
        {"\n"}
        {indent}
        <span>{"{"}</span>
        {"\n"}
        {FIELDS.map((f, i) => (
          <span key={f.name}>
            {keyPad}
            <span style={{ color: "var(--accent)" }}>&quot;{f.name}&quot;</span>
            <span>: </span>
            <span>&quot;{f.example}&quot;</span>
            {i < FIELDS.length - 1 ? "," : ""}
            {"\n"}
          </span>
        ))}
        {indent}
        <span>{"}"}</span>
      </pre>
    </div>
  );
}
