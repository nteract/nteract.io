# /telemetry Page Implementation Plan (nteract.io)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a trust-forward `/telemetry` page on nteract.io with a pinned JSON receipt, collapsible transparency accordions, a plain-language "Your rights" section, and a raw-markdown sibling so LLMs and agents can fetch it too.

**Architecture:** Add Source Serif 4 as a new `--font-page-serif` CSS variable alongside the existing Space Grotesk / Inter / JetBrains Mono. Introduce a `.cream-page` opt-in class that scopes a parchment palette (background, ink, rule, accent, muted). The telemetry page is a new top-level route under `app/telemetry/` with a React component tree (hero, ping-preview sidebar, receipt accordion, rights, contact, footer). A typed `lib/telemetry-data.ts` module is the single source of truth for the six fields, emission gates, and retention policy; both the HTML page and the raw Markdown route render from it. Middleware, vercel.json, sitemap, and llms.txt are extended to include the new route.

**Tech Stack:** Next.js 15 (App Router), React 18, Tailwind CSS 3, Vitest, `next/font/google`, existing middleware-based markdown-sibling mechanism.

**Repo:** `~/code/src/github.com/nteract/nteract.io`

**Spec:** See the design doc in the desktop repo: `docs/superpowers/specs/2026-04-23-telemetry-ui-and-docs-design.md`

---

## File Structure

Files created:

- `app/telemetry/page.tsx`: the React page component.
- `app/telemetry/opengraph-image.tsx`: OG image (matches blog post pattern).
- `app/telemetry/raw.md/route.ts`: the raw-markdown sibling.
- `app/telemetry/layout.tsx`: optional layout wrapper to scope the `.cream-page` class and set page-specific metadata.
- `components/telemetry/ping-preview.tsx`: the pinned JSON card.
- `components/telemetry/receipt.tsx`: the `<details>`-based accordion.
- `components/telemetry/rights.tsx`: the "Your rights" grid.
- `components/telemetry/page-shell.tsx`: shared shell that wraps children with the cream palette and scoped styles.
- `lib/telemetry-data.ts`: typed source of truth for fields, gates, retention.
- `lib/telemetry-data.test.ts`: unit tests verifying the constants.
- `lib/telemetry-markdown.ts`: renderer that serializes `telemetry-data` into the raw-markdown output used by `/telemetry/raw.md`.
- `lib/telemetry-markdown.test.ts`: snapshot tests for the serializer.

Files modified:

- `app/layout.tsx`: add Source Serif 4 font, wire `--font-page-serif` to body class.
- `app/globals.css`: add the `.cream-page` scoped palette block.
- `middleware.ts`: extend matcher + `rewriteTarget()` for `/telemetry`.
- `vercel.json`: add `Vary: Accept` header for `/telemetry`.
- `app/sitemap.ts`: include `/telemetry`.
- `app/llms.txt/route.ts`: add a `/telemetry` link in the reference section.

Each `components/telemetry/*.tsx` file has one responsibility. `lib/telemetry-data.ts` is a small data module with no React dependency so it can be imported by both the page and the Markdown renderer.

---

## Task 1: Add Source Serif 4 as --font-page-serif

**Files:**
- Modify: `app/layout.tsx`

This sets up the font token that the `/telemetry` page uses. Space Grotesk, Inter, and JetBrains Mono stay the defaults for the rest of the site; Source Serif 4 opts in via `.cream-page`.

- [ ] **Step 1: Edit `app/layout.tsx` to import `Source_Serif_4`**

Add the import to the existing font imports at the top:

```ts
import { Space_Grotesk, Inter, JetBrains_Mono, Geist, Source_Serif_4 } from "next/font/google";
```

- [ ] **Step 2: Declare the font constant**

Just below the existing `jetbrainsMono` declaration:

```ts
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-page-serif",
  display: "swap",
});
```

- [ ] **Step 3: Apply the CSS variable to `<body>` className**

Change this line:

```tsx
<body
  className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} min-h-screen font-body antialiased`}
>
```

To include `sourceSerif.variable`:

```tsx
<body
  className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${sourceSerif.variable} min-h-screen font-body antialiased`}
>
```

- [ ] **Step 4: Verify the build still compiles**

```bash
pnpm run build
```

Expected: build succeeds. No type errors.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(fonts): add Source Serif 4 as --font-page-serif"
```

---

## Task 2: Add the .cream-page scoped palette

**Files:**
- Modify: `app/globals.css`

The palette is scoped to `.cream-page` so the rest of the site (which is dark-themed) is unaffected. Values chosen to match the desktop app's cream theme at `src/styles/cream-theme.css`.

- [ ] **Step 1: Append the `.cream-page` block to `app/globals.css`**

Add at the end of the file (after the existing `@layer components { ... }` closing brace):

```css
/* ──────────────────────────────────────
   Cream-page scoped palette. Opt-in via
   className="cream-page" on a page root.
   Matches the desktop app's cream theme.
   ────────────────────────────────────── */
.cream-page {
  --paper: #faf8f3;
  --paper-elevated: #fffdf9;
  --ink: #1e1a18;
  --rule: #d8cec3;
  --accent: #955f3b;
  --muted: #6b6356;

  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-body), system-ui, sans-serif;
}

.cream-page h1,
.cream-page h2,
.cream-page blockquote {
  font-family: var(--font-page-serif), Georgia, serif;
}

.cream-page a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.cream-page a:hover {
  color: var(--ink);
}

.cream-page ::selection {
  background: rgb(149 95 59 / 0.18);
}
```

- [ ] **Step 2: Sanity-check by loading the dev server**

```bash
pnpm run dev
```

Open `http://localhost:3000` and confirm the homepage still looks identical (the block is scoped, should not leak). Kill the dev server with Ctrl-C.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat(css): add .cream-page scoped palette"
```

---

## Task 3: Write `lib/telemetry-data.ts` typed source of truth

**Files:**
- Create: `lib/telemetry-data.ts`
- Create: `lib/telemetry-data.test.ts`

This module is the single source of truth for page content. The HTML page and the Markdown renderer both import from it.

- [ ] **Step 1: Write `lib/telemetry-data.test.ts` first**

```ts
import { describe, expect, it } from "vitest";

import {
  EMISSION_GATES,
  FIELDS,
  NEVER_SENT,
  OPT_OUT_PATHS,
  RETENTION,
} from "@/lib/telemetry-data";

describe("telemetry-data", () => {
  it("lists the six heartbeat fields", () => {
    expect(FIELDS).toHaveLength(6);
    expect(FIELDS.map((f) => f.name).sort()).toEqual(
      ["arch", "channel", "install_id", "platform", "source", "version"].sort(),
    );
  });

  it("describes what is never sent", () => {
    expect(NEVER_SENT.length).toBeGreaterThan(0);
    expect(NEVER_SENT.join(" ").toLowerCase()).toContain("ip address");
  });

  it("lists emission gates including the new consent gate", () => {
    const names = EMISSION_GATES.map((g) => g.name);
    expect(names).toContain("Consent not recorded");
    expect(names).toContain("Dev mode");
    expect(names).toContain("Throttled");
  });

  it("declares retention periods", () => {
    expect(RETENTION.rawPingDays).toBe(400);
    expect(RETENTION.aggregatesKept).toMatch(/indefinit/i);
  });

  it("lists three in-app opt-out paths plus an env-var escape hatch", () => {
    expect(OPT_OUT_PATHS.inApp).toHaveLength(3);
    expect(OPT_OUT_PATHS.envVar).toMatch(/NTERACT_TELEMETRY_DISABLE/);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
pnpm exec vitest run lib/telemetry-data.test.ts
```

Expected: FAIL. "Cannot find module '@/lib/telemetry-data'".

- [ ] **Step 3: Write `lib/telemetry-data.ts`**

```ts
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
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
pnpm exec vitest run lib/telemetry-data.test.ts
```

Expected: PASS, 5 tests.

- [ ] **Step 5: Commit**

```bash
git add lib/telemetry-data.ts lib/telemetry-data.test.ts
git commit -m "feat(telemetry): add typed telemetry-data source of truth"
```

---

## Task 4: Write `lib/telemetry-markdown.ts` renderer

**Files:**
- Create: `lib/telemetry-markdown.ts`
- Create: `lib/telemetry-markdown.test.ts`

Serializes the typed data into a Markdown string used by the `/telemetry/raw.md` route.

- [ ] **Step 1: Write `lib/telemetry-markdown.test.ts`**

```ts
import { describe, expect, it } from "vitest";

import { renderTelemetryMarkdown } from "@/lib/telemetry-markdown";

describe("renderTelemetryMarkdown", () => {
  it("includes the six fields in a table", () => {
    const md = renderTelemetryMarkdown();
    expect(md).toMatch(/\| install_id \|/);
    expect(md).toMatch(/\| source \|/);
    expect(md).toMatch(/\| version \|/);
    expect(md).toMatch(/\| channel \|/);
    expect(md).toMatch(/\| platform \|/);
    expect(md).toMatch(/\| arch \|/);
  });

  it("names the ingest endpoint", () => {
    const md = renderTelemetryMarkdown();
    expect(md).toContain("https://telemetry.runtimed.com/v1/ping");
  });

  it("lists the user rights", () => {
    const md = renderTelemetryMarkdown();
    expect(md).toMatch(/## Your rights/);
    expect(md).toMatch(/Access/);
    expect(md).toMatch(/Erase/);
    expect(md).toMatch(/Object/);
  });

  it("points at the NumFOCUS privacy policy", () => {
    expect(renderTelemetryMarkdown()).toContain(
      "https://numfocus.org/privacy-policy",
    );
  });

  it("documents the consent-recorded gate", () => {
    expect(renderTelemetryMarkdown()).toMatch(/Consent not recorded/);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
pnpm exec vitest run lib/telemetry-markdown.test.ts
```

Expected: FAIL. Module not found.

- [ ] **Step 3: Write `lib/telemetry-markdown.ts`**

```ts
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
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
pnpm exec vitest run lib/telemetry-markdown.test.ts
```

Expected: PASS, 5 tests.

- [ ] **Step 5: Commit**

```bash
git add lib/telemetry-markdown.ts lib/telemetry-markdown.test.ts
git commit -m "feat(telemetry): add markdown renderer for raw.md sibling"
```

---

## Task 5: Create the raw-markdown route

**Files:**
- Create: `app/telemetry/raw.md/route.ts`

Emits the Markdown via the renderer. Force-static so it's edge-cached.

- [ ] **Step 1: Create the route file**

```ts
import { renderTelemetryMarkdown } from "@/lib/telemetry-markdown";

export const dynamic = "force-static";

export async function GET() {
  return new Response(renderTelemetryMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
```

- [ ] **Step 2: Verify the route responds**

```bash
pnpm run dev
```

In another terminal:

```bash
curl -s http://localhost:3000/telemetry/raw.md | head -20
```

Expected: the rendered Markdown starts with `# Telemetry`.

Kill the dev server.

- [ ] **Step 3: Commit**

```bash
git add app/telemetry/raw.md/route.ts
git commit -m "feat(telemetry): add /telemetry/raw.md route"
```

---

## Task 6: Extend middleware + vercel.json for the new route

**Files:**
- Modify: `middleware.ts`
- Modify: `vercel.json`

Makes Markdown-preferring clients hit `/telemetry/raw.md` when they request `/telemetry`, and keeps caches from cross-pollinating HTML and Markdown responses.

- [ ] **Step 1: Edit `middleware.ts`**

Change the `config.matcher`:

```ts
export const config = {
  matcher: ["/", "/blog", "/blog/:slug", "/telemetry"],
};
```

Add a case in `rewriteTarget()` before the `/blog/` case:

```ts
function rewriteTarget(pathname: string): string | null {
  if (pathname === "/" || pathname === "/blog") {
    return "/llms.txt";
  }
  if (pathname === "/telemetry") {
    return "/telemetry/raw.md";
  }
  if (pathname.startsWith("/blog/")) {
    return `/blog/${pathname.slice("/blog/".length)}/raw.md`;
  }
  return null;
}
```

- [ ] **Step 2: Edit `vercel.json`**

Add the header entry:

```json
{
  "headers": [
    {
      "source": "/",
      "headers": [{ "key": "Vary", "value": "Accept" }]
    },
    {
      "source": "/blog",
      "headers": [{ "key": "Vary", "value": "Accept" }]
    },
    {
      "source": "/blog/:slug",
      "headers": [{ "key": "Vary", "value": "Accept" }]
    },
    {
      "source": "/telemetry",
      "headers": [{ "key": "Vary", "value": "Accept" }]
    }
  ]
}
```

- [ ] **Step 3: Verify with a curl spoofing the markdown Accept header**

```bash
pnpm run dev
```

```bash
curl -sI -H "Accept: text/markdown, text/html" http://localhost:3000/telemetry
```

Expected: the response contains `vary: Accept` and the body is the rendered Markdown. Kill the dev server.

- [ ] **Step 4: Commit**

```bash
git add middleware.ts vercel.json
git commit -m "feat(telemetry): route markdown clients to /telemetry/raw.md"
```

---

## Task 7: Build the ping preview component

**Files:**
- Create: `components/telemetry/ping-preview.tsx`

Renders the six fields on a darker cream card. No sidebar pinning yet; that happens in the page layout.

- [ ] **Step 1: Create the component**

```tsx
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
```

- [ ] **Step 2: Commit (it compiles because FIELDS is imported from an existing module)**

```bash
pnpm run build
```

Expected: success.

```bash
git add components/telemetry/ping-preview.tsx
git commit -m "feat(telemetry): add PingPreview component"
```

---

## Task 8: Build the Receipt accordion

**Files:**
- Create: `components/telemetry/receipt.tsx`

Uses native `<details>`/`<summary>` for zero-JS accessibility.

- [ ] **Step 1: Create the component**

```tsx
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
                <td className="py-2">{f.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="What is never sent or stored">
        <ul className="list-disc pl-5 space-y-2">
          {NEVER_SENT.map((line) => (
            <li key={line}>{line}</li>
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
                <td className="py-2">{g.trigger}</td>
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
```

- [ ] **Step 2: Commit**

```bash
git add components/telemetry/receipt.tsx
git commit -m "feat(telemetry): add Receipt accordion component"
```

---

## Task 9: Build the Rights grid

**Files:**
- Create: `components/telemetry/rights.tsx`

- [ ] **Step 1: Create the component**

```tsx
type Right = {
  title: string;
  body: React.ReactNode;
};

const RIGHTS: Right[] = [
  {
    title: "Access",
    body: (
      <>
        Open <strong>Settings &rarr; Privacy</strong> to see your install ID, last
        ping times, and current setting.
      </>
    ),
  },
  {
    title: "Rectify",
    body: (
      <>
        There&rsquo;s nothing to rectify. The six fields are facts about your build,
        not profile data.
      </>
    ),
  },
  {
    title: "Erase",
    body: (
      <>
        Rotate your install ID from <strong>Settings &rarr; Privacy</strong>. Old
        rows become unlinkable and age out at 400 days. To delete them immediately,
        email the address below with your install ID; we run a{" "}
        <code>DELETE</code> against the raw pings table.
      </>
    ),
  },
  {
    title: "Object / withdraw",
    body: (
      <>Flip the setting off, any time. No penalty, no features lost.</>
    ),
  },
];

export function Rights() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--ink)" }}>
        Your rights
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {RIGHTS.map((r) => (
          <div
            key={r.title}
            className="rounded-lg border p-4"
            style={{ borderColor: "var(--rule)", background: "var(--paper-elevated)" }}
          >
            <div
              className="text-[11px] uppercase tracking-[0.15em] mb-2"
              style={{ color: "var(--accent)" }}
            >
              {r.title}
            </div>
            <div className="text-[15px] leading-7" style={{ color: "var(--ink)" }}>
              {r.body}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/telemetry/rights.tsx
git commit -m "feat(telemetry): add Rights grid component"
```

---

## Task 10: Build the page shell and page itself

**Files:**
- Create: `app/telemetry/layout.tsx`
- Create: `app/telemetry/page.tsx`
- Create: `components/telemetry/page-shell.tsx`

The shell applies `.cream-page` and the layout. The page composes the pieces.

- [ ] **Step 1: Create `components/telemetry/page-shell.tsx`**

```tsx
import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="cream-page min-h-screen">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/telemetry/layout.tsx`**

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Telemetry",
  description:
    "A light ping, and why we ask. What nteract sends, what it never sends, and how to opt out.",
  openGraph: {
    title: "Telemetry | " + siteConfig.name,
    description:
      "A light ping, and why we ask. What nteract sends, what it never sends, and how to opt out.",
    url: absoluteUrl("/telemetry"),
    type: "article",
  },
};

export default function TelemetryLayout({ children }: { children: ReactNode }) {
  return children;
}
```

- [ ] **Step 3: Create `app/telemetry/page.tsx`**

```tsx
import { PageShell } from "@/components/telemetry/page-shell";
import { PingPreview } from "@/components/telemetry/ping-preview";
import { Receipt } from "@/components/telemetry/receipt";
import { Rights } from "@/components/telemetry/rights";
import { OPT_OUT_PATHS } from "@/lib/telemetry-data";

export default function TelemetryPage() {
  return (
    <PageShell>
      <article>
        <div
          className="text-[11px] tracking-[0.22em] uppercase mb-6"
          style={{ color: "var(--accent)" }}
        >
          § Telemetry
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,_1.7fr)_minmax(0,_1fr)] lg:gap-16">
          {/* Letter column */}
          <div>
            <h1
              className="text-[44px] leading-[1.05] font-normal mb-6"
              style={{ color: "var(--ink)" }}
            >
              A light ping, and why we ask.
            </h1>

            <div
              className="space-y-5 text-[17px] leading-8 max-w-[60ch]"
              style={{ color: "var(--ink)" }}
            >
              <p>
                nteract is maintained under{" "}
                <a href="https://numfocus.org/" target="_blank" rel="noopener noreferrer">
                  NumFOCUS
                </a>
                , a non-profit. We don&rsquo;t sell your data. We never will.
              </p>
              <p>
                One anonymous daily heartbeat tells funders that real people are
                using nteract. The ping is evidence of use, not funding.
              </p>
              <p>
                If you&rsquo;d rather not, flip it off. No penalty. No degraded
                features.
              </p>
            </div>

            <Rights />

            <section className="mt-12 max-w-[60ch]">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "var(--ink)" }}
              >
                How to opt out
              </h2>
              <ul className="space-y-3 text-[16px] leading-7" style={{ color: "var(--ink)" }}>
                {OPT_OUT_PATHS.inApp.map((p) => (
                  <li key={p.label}>
                    <strong>{p.label}.</strong> {p.description}
                  </li>
                ))}
              </ul>
              <p
                className="mt-4 text-[13px]"
                style={{ color: "var(--muted)" }}
              >
                For locked-down deployments and CI images: {OPT_OUT_PATHS.envVar}
              </p>
            </section>

            <Receipt />

            <section
              className="mt-16 pt-8 border-t max-w-[60ch] text-[15px] leading-7"
              style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
            >
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "var(--ink)" }}
              >
                Sponsored project note
              </h2>
              <p>
                nteract is a{" "}
                <a href="https://numfocus.org/" target="_blank" rel="noopener noreferrer">
                  NumFOCUS
                </a>{" "}
                sponsored project. NumFOCUS&rsquo;s own{" "}
                <a
                  href="https://numfocus.org/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  privacy policy
                </a>{" "}
                covers NumFOCUS services (its website, event registration, etc.),
                not sponsored projects. This page is how <em>nteract</em> handles
                your data.
              </p>
            </section>

            <section
              className="mt-10 pt-8 border-t max-w-[60ch] text-[15px] leading-7"
              style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
            >
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "var(--ink)" }}
              >
                Contact
              </h2>
              <p>
                Privacy questions:{" "}
                <a href="mailto:privacy@nteract.io">privacy@nteract.io</a>.
              </p>
              <p className="mt-3" style={{ color: "var(--muted)" }}>
                Source: the client lives in{" "}
                <a
                  href="https://github.com/nteract/desktop/blob/main/crates/runtimed-client/src/telemetry.rs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  crates/runtimed-client/src/telemetry.rs
                </a>
                , the server in{" "}
                <a
                  href="https://github.com/nteract/telemetry"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  nteract/telemetry
                </a>
                .
              </p>
            </section>
          </div>

          {/* Sidebar column */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <PingPreview />
            <nav
              className="mt-6 text-[13px] leading-6"
              style={{ color: "var(--muted)" }}
              aria-label="On this page"
            >
              <div
                className="text-[10px] uppercase tracking-[0.18em] mb-2"
                style={{ color: "var(--accent)" }}
              >
                On this page
              </div>
              <ul className="space-y-1.5">
                <li>Your rights</li>
                <li>How to opt out</li>
                <li>Exactly what&rsquo;s sent</li>
                <li>What is never sent or stored</li>
                <li>When a ping is suppressed</li>
                <li>Retention and schema evolution</li>
              </ul>
            </nav>
          </aside>
        </div>
      </article>
    </PageShell>
  );
}
```

Note: the `§` in the eyebrow is the `§` character. Do not replace it with the literal character if your editor encoding is unreliable; the escape is fine.

- [ ] **Step 4: Visual check**

```bash
pnpm run dev
```

Open `http://localhost:3000/telemetry`. Confirm:
- Cream background, serif headline.
- Ping preview on the right (or below on mobile).
- Accordions expand on click.
- Rights grid reads clearly.
- Links to NumFOCUS, mailto, GitHub resolve.

Kill the dev server.

- [ ] **Step 5: Commit**

```bash
git add app/telemetry/layout.tsx app/telemetry/page.tsx components/telemetry/page-shell.tsx
git commit -m "feat(telemetry): add /telemetry page"
```

---

## Task 11: Add OG image route

**Files:**
- Create: `app/telemetry/opengraph-image.tsx`

Matches the blog pattern so link unfurls look intentional.

- [ ] **Step 1: Create the OG image**

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background: "#faf8f3",
          color: "#1e1a18",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#955f3b",
          }}
        >
          § Telemetry
        </div>
        <div style={{ fontSize: 96, lineHeight: 1.05, fontWeight: 400 }}>
          A light ping,
          <br />
          and why we ask.
        </div>
        <div
          style={{ fontSize: 28, color: "#6b6356", display: "flex", gap: 24 }}
        >
          <span>nteract.io / telemetry</span>
          <span style={{ color: "#955f3b" }}>,</span>
          <span>NumFOCUS sponsored project</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Step 2: Check it renders**

```bash
pnpm run dev
```

Visit `http://localhost:3000/telemetry/opengraph-image` in a browser. Expect a cream-backgrounded image. Kill dev server.

- [ ] **Step 3: Commit**

```bash
git add app/telemetry/opengraph-image.tsx
git commit -m "feat(telemetry): add OG image"
```

---

## Task 12: Register the page in sitemap + llms.txt

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `app/llms.txt/route.ts`

- [ ] **Step 1: Edit `app/sitemap.ts`**

In the returned array, between the `/blog` entry and the posts spread, add:

```ts
{
  url: absoluteUrl("/telemetry"),
  changeFrequency: "yearly",
  priority: 0.6,
},
```

- [ ] **Step 2: Edit `app/llms.txt/route.ts`**

Read the file to find the "Downloads" section (the block that follows it is where the telemetry link goes). After the `- [Source on GitHub](...)` line, add:

```ts
`- [Telemetry policy](${siteConfig.url}/telemetry): what nteract sends, what it never sends, and how to opt out.`,
```

(This assumes there's a line `- [Source on GitHub](${siteConfig.links.github})`. If the structure differs, add the line next to the Source line in the same list.)

- [ ] **Step 3: Verify**

```bash
pnpm run dev
```

```bash
curl -s http://localhost:3000/sitemap.xml | grep telemetry
curl -s http://localhost:3000/llms.txt | grep -i telemetry
```

Both should return a match. Kill dev server.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/llms.txt/route.ts
git commit -m "feat(telemetry): register /telemetry in sitemap and llms.txt"
```

---

## Task 13: Final build + accessibility pass

**Files:**
- None, just verification.

- [ ] **Step 1: Full build**

```bash
pnpm run build
```

Expected: success, no type errors, no unused-locals warnings.

- [ ] **Step 2: Vitest suite**

```bash
pnpm exec vitest run
```

Expected: all tests green, including the two new test files.

- [ ] **Step 3: Accessibility spot-check**

Open the page, tab through with keyboard. Confirm:
- Eyebrow + h1 appear in source order before sidebar.
- Each `<details>` can be opened/closed with Enter/Space.
- Links have visible focus rings.
- The sidebar is a `<nav aria-label="On this page">` element so screen readers announce it.

No automated test needed; manual pass is enough.

- [ ] **Step 4: Final commit if any tweaks were needed**

If issues were found in steps 1-3, fix them with small commits. Otherwise proceed.

---

## Self-Review Summary

- **Source Serif 4 as `--font-page-serif`:** Task 1.
- **`.cream-page` palette:** Task 2.
- **`lib/telemetry-data.ts` typed module + tests:** Task 3.
- **Markdown renderer + tests:** Task 4.
- **`app/telemetry/raw.md` route:** Task 5.
- **Middleware + vercel.json:** Task 6.
- **Components (ping preview, receipt, rights):** Tasks 7, 8, 9.
- **Page + shell + layout:** Task 10.
- **OG image:** Task 11.
- **Sitemap + llms.txt:** Task 12.
- **Build + accessibility verification:** Task 13.

All spec requirements for the nteract.io deliverable are covered.
