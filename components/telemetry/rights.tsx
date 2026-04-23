import { ERASE_ENDPOINT_SHAPE, RETENTION } from "@/lib/telemetry-data";

type Right = {
  title: string;
  body: React.ReactNode;
};

const RIGHTS: Right[] = [
  {
    title: "Access",
    body: (
      <p>
        Open <strong>Settings &rarr; Privacy</strong> to see your install ID, last
        ping times, and current setting.
      </p>
    ),
  },
  {
    title: "Rectify",
    body: (
      <p>
        There&rsquo;s nothing to rectify. The six fields are facts about your build,
        not profile data.
      </p>
    ),
  },
  {
    title: "Erase",
    body: (
      <p>
        Rotate your install ID from <strong>Settings &rarr; Privacy</strong>. Old
        rows become unlinkable and age out at {RETENTION.rawPingDays} days. To
        delete them immediately, call the server-side erasure endpoint (
        <code>{ERASE_ENDPOINT_SHAPE}</code>) or email{" "}
        <a href="mailto:privacy@nteract.io">privacy@nteract.io</a> with your install
        ID.
      </p>
    ),
  },
  {
    title: "Object / withdraw",
    body: (
      <p>Flip the setting off, any time. No penalty, no features lost.</p>
    ),
  },
];

function RightSection({ title, children }: { title: string; children: React.ReactNode }) {
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
