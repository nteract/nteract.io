import { PageShell } from "@/components/telemetry/page-shell";

import Content from "@/content/telemetry.mdx";

export default function TelemetryPage() {
  return (
    <PageShell>
      <article className="max-w-[62ch] mx-auto">
        <div
          className="text-[11px] tracking-[0.22em] uppercase mb-6"
          style={{ color: "var(--accent)" }}
        >
          § Telemetry
        </div>

        <div
          className="space-y-5 text-[17px] leading-8"
          style={{ color: "var(--ink)" }}
        >
          <Content />
        </div>
      </article>
    </PageShell>
  );
}
