import type { PlaceholderData } from "fumadocs-core/mdx-plugins/remark-llms.runtime";

import { renderInlineCode } from "@/lib/inline-code";
import {
  EMISSION_GATES,
  FIELDS,
  NEVER_SENT,
  RETENTION,
} from "@/lib/telemetry-data";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details
      className="group border-t py-4"
      style={{ borderColor: "var(--rule)" }}
    >
      <summary
        className="cursor-pointer list-none flex items-center justify-between text-base font-semibold"
        style={{ color: "var(--ink)" }}
      >
        <span>{title}</span>
        <span
          className="transition-transform group-open:rotate-45"
          style={{ color: "var(--accent)" }}
          aria-hidden
        >
          +
        </span>
      </summary>
      <div className="pt-4 text-[15px] leading-7" style={{ color: "var(--ink)" }}>
        {children}
      </div>
    </details>
  );
}

export function Receipt() {
  return (
    <div className="mt-10">
      <Section title="Exactly what's sent">
        <table className="w-full text-left text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--rule)" }}>
              <th className="py-2 pr-3">Field</th>
              <th className="py-2 pr-3">Example</th>
              <th className="py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {FIELDS.map((f) => (
              <tr key={f.name} style={{ borderBottom: "1px solid var(--rule)" }}>
                <td className="py-2 pr-3 font-mono">{f.name}</td>
                <td className="py-2 pr-3 font-mono text-xs">{f.example}</td>
                <td className="py-2">{renderInlineCode(f.description)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="What is never sent or stored">
        <ul className="list-disc pl-5 space-y-2">
          {NEVER_SENT.map((line) => (
            <li key={line}>{renderInlineCode(line)}</li>
          ))}
        </ul>
      </Section>

      <Section title="When a ping is suppressed">
        <table className="w-full text-left text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--rule)" }}>
              <th className="py-2 pr-3">Gate</th>
              <th className="py-2">Trigger</th>
            </tr>
          </thead>
          <tbody>
            {EMISSION_GATES.map((g) => (
              <tr key={g.name} style={{ borderBottom: "1px solid var(--rule)" }}>
                <td className="py-2 pr-3 font-medium">{g.name}</td>
                <td className="py-2">{renderInlineCode(g.trigger)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Retention and schema evolution">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Raw pings</strong>: kept for {RETENTION.rawPingDays} days, then
            deleted by a nightly cleanup job.
          </li>
          <li>
            <strong>Daily aggregate counts</strong>: kept {RETENTION.aggregatesKept}.
            No <code>install_id</code>; just counts grouped by{" "}
            {RETENTION.rollupKeys.map((k, i) => (
              <span key={k}>
                <code>{k}</code>
                {i < RETENTION.rollupKeys.length - 1 ? ", " : ""}
              </span>
            ))}.
          </li>
          <li>
            New fields may be added over time (additive only). Any field removal is a
            breaking change that gets a new route version (<code>/v2/ping</code>).
          </li>
        </ul>
      </Section>
    </div>
  );
}

Receipt.toMarkdown = (_data: PlaceholderData): string => {
  const lines: string[] = [];

  lines.push("## Exactly what's sent", "");
  lines.push("| Field | Example | Description |", "|---|---|---|");
  for (const f of FIELDS) {
    lines.push(`| ${f.name} | \`${f.example}\` | ${f.description} |`);
  }

  lines.push("", "## What is never sent or stored", "");
  for (const n of NEVER_SENT) lines.push(`- ${n}`);

  lines.push("", "## When a ping is suppressed", "");
  lines.push("| Gate | Trigger |", "|---|---|");
  for (const g of EMISSION_GATES) {
    lines.push(`| ${g.name} | ${g.trigger} |`);
  }

  lines.push("", "## Retention and schema evolution", "");
  lines.push(
    `- **Raw pings**: kept for ${RETENTION.rawPingDays} days, then deleted by a nightly cleanup job.`,
  );
  lines.push(
    `- **Daily aggregate counts**: kept ${RETENTION.aggregatesKept}. No \`install_id\`; just counts grouped by ${RETENTION.rollupKeys.map((k) => "`" + k + "`").join(", ")}.`,
  );
  lines.push(
    "- New fields may be added over time (additive only). Any field removal is a breaking change that gets a new route version (`/v2/ping`).",
  );

  return lines.join("\n");
};
