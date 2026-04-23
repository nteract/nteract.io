/**
 * Typed source of truth for the /telemetry page and its raw-markdown sibling.
 *
 * Keep this file in sync with the Rust emitter at
 * `crates/runtimed-client/src/telemetry.rs` in the desktop repo, and with the
 * ingest schema at `docs/telemetry-schema.md` in the telemetry repo.
 *
 * Changes here drive both the HTML page render and the Markdown export.
 */

export type HeartbeatField = {
  name: string;
  example: string;
  description: string;
  /** Short hover tag (a single word or phrase) for the preview card. */
  tag: string;
};

export const FIELDS: HeartbeatField[] = [
  {
    name: "install_id",
    example: "550e8400-e29b-41d4-a716-446655440000",
    description:
      "Opaque UUIDv4 generated on first run. Not derived from any identifying data.",
    tag: "random on first run",
  },
  {
    name: "source",
    example: "app",
    description:
      "Which process sent the ping. One of `app`, `daemon`, or `mcp`.",
    tag: "app | daemon | mcp",
  },
  {
    name: "version",
    example: "2.2.1",
    description: "Release version of the build that sent the ping.",
    tag: "release version",
  },
  {
    name: "channel",
    example: "nightly",
    description: "Release channel: `stable` or `nightly`.",
    tag: "stable | nightly",
  },
  {
    name: "platform",
    example: "macos",
    description: "Operating system family: `macos`, `linux`, or `windows`.",
    tag: "OS family",
  },
  {
    name: "arch",
    example: "arm64",
    description: "CPU architecture: `arm64` or `x86_64`.",
    tag: "CPU",
  },
];

export const NEVER_SENT: string[] = [
  "Hostname, username, home directory, or any filesystem path.",
  "Notebook contents, cell outputs, kernel names, or environment details.",
  "Dependency names or versions (Python, Node, R, system packages).",
  "Hardware identifiers (MAC address, serial number, disk UUID).",
  "Client IP address at rest. Cloudflare observes it briefly for rate limiting; the database does not store it.",
  "User-Agent or any HTTP header beyond Content-Type.",
];

export type EmissionGate = {
  name: string;
  trigger: string;
};

export const EMISSION_GATES: EmissionGate[] = [
  {
    name: "Dev mode",
    trigger: "`RUNTIMED_DEV=1` or `RUNTIMED_WORKSPACE_PATH` is set",
  },
  { name: "CI", trigger: "`CI` environment variable is set" },
  {
    name: "Kill switch",
    trigger: "`NTERACT_TELEMETRY_DISABLE` environment variable is set",
  },
  { name: "Disabled", trigger: "`telemetry_enabled = false` in settings" },
  {
    name: "Consent not recorded",
    trigger:
      "`telemetry_consent_recorded = false` (user has not pressed either onboarding button)",
  },
  {
    name: "Not onboarded",
    trigger: "`onboarding_completed = false` (fresh install before first-run screen)",
  },
  {
    name: "Unsupported host",
    trigger: "Platform or architecture not in the server's enum",
  },
  {
    name: "Throttled",
    trigger: "Last ping for this source was less than 20 hours ago",
  },
];

export type Retention = {
  rawPingDays: number;
  aggregatesKept: string;
  rollupKeys: string[];
};

export const RETENTION: Retention = {
  rawPingDays: 400,
  aggregatesKept: "indefinitely",
  rollupKeys: ["day", "source", "version", "channel", "platform", "arch"],
};

export type OptOutPath = {
  label: string;
  description: string;
};

export const OPT_OUT_PATHS: {
  inApp: OptOutPath[];
  envVar: string;
} = {
  inApp: [
    {
      label: "Onboarding choice",
      description:
        "Press “Opt out of metrics, continue” on the final onboarding screen.",
    },
    {
      label: "Settings → Privacy",
      description:
        "Flip the telemetry switch off any time. Rotate your install ID or request erasure from here too.",
    },
    {
      label: "CLI",
      description: "Run `runt config telemetry disable`. Check status with `runt config telemetry status`.",
    },
  ],
  envVar:
    "Set `NTERACT_TELEMETRY_DISABLE=1` for locked-down deployments and CI images.",
};

export const ENDPOINT = "https://telemetry.runtimed.com/v1/ping";
export const ERASE_ENDPOINT_SHAPE = "DELETE /v1/install/{install_id}";
export const RATE_LIMIT = "60 req/min per client IP at the Cloudflare edge";
