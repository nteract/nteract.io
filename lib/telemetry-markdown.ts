import {
  EMISSION_GATES,
  ENDPOINT,
  ERASE_ENDPOINT_SHAPE,
  FIELDS,
  NEVER_SENT,
  OPT_OUT_PATHS,
  RATE_LIMIT,
  RETENTION,
} from "@/lib/telemetry-data";

export function renderTelemetryMarkdown(): string {
  const lines: string[] = [];

  lines.push("# Telemetry", "");
  lines.push(
    "nteract is a [NumFOCUS](https://numfocus.org/) sponsored project. This page is how *nteract* handles the data your desktop app sends. NumFOCUS's [privacy policy](https://numfocus.org/privacy-policy) covers NumFOCUS services, not sponsored projects.",
    "",
  );
  lines.push(
    "One anonymous daily heartbeat tells funders that real people are using nteract. The ping is evidence of use, not funding.",
    "",
  );
  lines.push("If you'd rather not, flip it off. No penalty, no degraded features.", "");

  lines.push("## What is sent in every ping", "");
  lines.push("| Field | Example | Description |", "|---|---|---|");
  for (const f of FIELDS) {
    lines.push(`| ${f.name} | \`${f.example}\` | ${f.description} |`);
  }
  lines.push("", `The server adds \`received_at\` (unix timestamp) on its side. Endpoint: \`${ENDPOINT}\`. Rate limit: ${RATE_LIMIT}.`, "");

  lines.push("## What is never sent or stored", "");
  for (const n of NEVER_SENT) lines.push(`- ${n}`);
  lines.push("");

  lines.push("## When a ping is suppressed", "");
  lines.push("| Gate | Trigger |", "|---|---|");
  for (const g of EMISSION_GATES) lines.push(`| ${g.name} | ${g.trigger} |`);
  lines.push("");

  lines.push("## Retention", "");
  lines.push(
    `- **Raw pings**: kept for ${RETENTION.rawPingDays} days, then deleted by a nightly cleanup job.`,
  );
  lines.push(
    `- **Daily aggregate counts**: kept ${RETENTION.aggregatesKept}. These contain no \`install_id\`, only counts grouped by ${RETENTION.rollupKeys.map((k) => "`" + k + "`").join(", ")}.`,
  );
  lines.push("");

  lines.push("## How to opt out", "");
  for (const p of OPT_OUT_PATHS.inApp) {
    lines.push(`- **${p.label}.** ${p.description}`);
  }
  lines.push(`- **Environment variable.** ${OPT_OUT_PATHS.envVar}`);
  lines.push("");

  lines.push("## Your rights", "");
  lines.push(
    "- **Access.** Open Settings → Privacy to see your install ID, last ping times, and current setting.",
    "- **Rectify.** There's nothing to rectify. The six fields are facts about your build, not profile data.",
    `- **Erase.** Rotate your install ID from Settings → Privacy, or call the server-side erasure endpoint (\`${ERASE_ENDPOINT_SHAPE}\`). Old rows age out at ${RETENTION.rawPingDays} days regardless.`,
    "- **Object / withdraw.** Flip the setting off, any time. No penalty, no features lost.",
    "",
  );

  lines.push("## Contact", "");
  lines.push(
    "Privacy questions: [privacy@nteract.io](mailto:privacy@nteract.io). Source: [crates/runtimed-client/src/telemetry.rs](https://github.com/nteract/desktop/blob/main/crates/runtimed-client/src/telemetry.rs) (client) and [nteract/telemetry](https://github.com/nteract/telemetry) (server).",
    "",
  );

  lines.push("## Schema evolution", "");
  lines.push(
    "New fields may be added over time (additive only). Any field removal is a breaking change that gets a new route version (`/v2/ping`).",
    "",
  );

  return lines.join("\n");
}
