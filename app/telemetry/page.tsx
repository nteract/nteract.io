import { PageShell } from "@/components/telemetry/page-shell";

import Content from "@/content/telemetry.mdx";

export default function TelemetryPage() {
  return (
    <PageShell>
      <article className="max-w-[62ch] mx-auto prose-telemetry">
        <Content />
      </article>
    </PageShell>
  );
}
