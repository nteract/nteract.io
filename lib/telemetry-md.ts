import { _markdown } from "@/content/telemetry.mdx";
import { renderPlaceholder } from "fumadocs-core/mdx-plugins/remark-llms.runtime";
import {
  EMISSION_GATES,
  ERASE_ENDPOINT_SHAPE,
  FIELDS,
  NEVER_SENT,
  OPT_OUT_PATHS,
  RETENTION,
} from "@/lib/telemetry-data";

/**
 * Resolve the remarkLLMs markdown export from telemetry.mdx,
 * replacing component placeholders with their static markdown form.
 *
 * Shared by /telemetry/raw.md and /telemetry/llms.txt routes.
 */
export function resolveTelemetryMarkdown(): Promise<string> {
  return renderPlaceholder(_markdown, {
    PingPreview() {
      const lines = ["```", "{"];
      for (const f of FIELDS) {
        lines.push(`  "${f.name}": "${f.example}",`);
      }
      lines.push("}", "```");
      return lines.join("\n");
    },

    Rights() {
      const lines = [
        "## Your rights",
        "",
        "### Access",
        "",
        "Open **Settings → Privacy** to see your install ID, last ping times, and current setting.",
        "",
        "### Rectify",
        "",
        "There's nothing to rectify. The six fields are facts about your build, not profile data.",
        "",
        "### Erase",
        "",
        `Rotate your install ID from **Settings → Privacy**. Old rows become unlinkable and age out at ${RETENTION.rawPingDays} days. To delete them immediately, call the server-side erasure endpoint (\`${ERASE_ENDPOINT_SHAPE}\`) or email [privacy@nteract.io](mailto:privacy@nteract.io) with your install ID.`,
        "",
        "### Object / withdraw",
        "",
        "Flip the setting off, any time. No penalty, no features lost.",
      ];
      return lines.join("\n");
    },

    OptOut() {
      const lines = [
        "## How to opt out",
        "",
        ...OPT_OUT_PATHS.inApp.map((p) => `- **${p.label}.** ${p.description}`),
        "",
        `For locked-down deployments and CI images: ${OPT_OUT_PATHS.envVar}`,
      ];
      return lines.join("\n");
    },

    Receipt() {
      const lines: string[] = [];

      // Fields table
      lines.push("## Exactly what's sent", "");
      lines.push("| Field | Example | Description |", "|---|---|---|");
      for (const f of FIELDS) {
        lines.push(`| ${f.name} | \`${f.example}\` | ${f.description} |`);
      }

      // Never sent
      lines.push("", "## What is never sent or stored", "");
      for (const n of NEVER_SENT) lines.push(`- ${n}`);

      // Emission gates
      lines.push("", "## When a ping is suppressed", "");
      lines.push("| Gate | Trigger |", "|---|---|");
      for (const g of EMISSION_GATES) {
        lines.push(`| ${g.name} | ${g.trigger} |`);
      }

      // Retention
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
    },
  });
}
