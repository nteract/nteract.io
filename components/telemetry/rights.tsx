import type { PlaceholderData } from "fumadocs-core/mdx-plugins/remark-llms.runtime";

import { ERASE_ENDPOINT_SHAPE, RETENTION } from "@/lib/telemetry-data";

type RightEntry = {
  title: string;
  body: React.ReactNode;
  bodyMarkdown: string;
};

const RIGHTS: RightEntry[] = [
  {
    title: "Access",
    body: (
      <p>
        Open <strong>Settings &rarr; Privacy</strong> to see your install ID, last
        ping times, and current setting.
      </p>
    ),
    bodyMarkdown:
      "Open **Settings → Privacy** to see your install ID, last ping times, and current setting.",
  },
  {
    title: "Rectify",
    body: (
      <p>
        There&rsquo;s nothing to rectify. The six fields are facts about your build,
        not profile data.
      </p>
    ),
    bodyMarkdown:
      "There's nothing to rectify. The six fields are facts about your build, not profile data.",
  },
  {
    title: "Erase",
    body: (
      <>
        <p>
          Rotate your install ID from <strong>Settings &rarr; Privacy</strong>. Old
          rows become unlinkable and age out at {RETENTION.rawPingDays} days.
        </p>
        <p className="mt-3">
          To delete them immediately, call the server-side erasure endpoint:
        </p>
        <pre
          className="mt-2 overflow-x-auto rounded-lg border p-3 text-[13px] font-mono"
          style={{
            borderColor: "var(--rule)",
            background: "var(--paper-elevated)",
            color: "var(--ink)",
            fontFamily: "var(--font-mono), monospace",
          }}
        >
          <code>{ERASE_ENDPOINT_SHAPE}</code>
        </pre>
        <p className="mt-3">
          Or email <a href="mailto:privacy@nteract.io">privacy@nteract.io</a> with
          your install ID.
        </p>
      </>
    ),
    bodyMarkdown: [
      `Rotate your install ID from **Settings → Privacy**. Old rows become unlinkable and age out at ${RETENTION.rawPingDays} days.`,
      "",
      "To delete them immediately, call the server-side erasure endpoint:",
      "",
      "```",
      ERASE_ENDPOINT_SHAPE,
      "```",
      "",
      "Or email [privacy@nteract.io](mailto:privacy@nteract.io) with your install ID.",
    ].join("\n"),
  },
  {
    title: "Object / withdraw",
    body: <p>Flip the setting off, any time. No penalty, no features lost.</p>,
    bodyMarkdown: "Flip the setting off, any time. No penalty, no features lost.",
  },
];

function RightSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-t py-4" style={{ borderColor: "var(--rule)" }}>
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

export function Rights() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--ink)" }}>
        Your rights
      </h2>
      <div>
        {RIGHTS.map((r) => (
          <RightSection key={r.title} title={r.title}>
            {r.body}
          </RightSection>
        ))}
      </div>
    </section>
  );
}

Rights.toMarkdown = (_data: PlaceholderData): string => {
  const lines = ["## Your rights", ""];
  for (const r of RIGHTS) {
    lines.push(`### ${r.title}`, "", r.bodyMarkdown, "");
  }
  return lines.join("\n").trimEnd();
};
