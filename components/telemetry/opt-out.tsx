import { renderInlineCode } from "@/lib/inline-code";
import { OPT_OUT_PATHS } from "@/lib/telemetry-data";

export function OptOut() {
  return (
    <section className="mt-12">
      <h2
        className="text-2xl font-semibold mb-4"
        style={{ color: "var(--ink)" }}
      >
        How to opt out
      </h2>
      <ul
        className="space-y-3 text-[16px] leading-7"
        style={{ color: "var(--ink)" }}
      >
        {OPT_OUT_PATHS.inApp.map((p) => (
          <li key={p.label}>
            <strong>{p.label}.</strong> {renderInlineCode(p.description)}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[13px]" style={{ color: "var(--muted)" }}>
        For locked-down deployments and CI images:{" "}
        {renderInlineCode(OPT_OUT_PATHS.envVar)}
      </p>
    </section>
  );
}
