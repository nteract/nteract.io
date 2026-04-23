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
