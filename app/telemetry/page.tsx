import { PageShell } from "@/components/telemetry/page-shell";
import { PingPreview } from "@/components/telemetry/ping-preview";
import { Receipt } from "@/components/telemetry/receipt";
import { Rights } from "@/components/telemetry/rights";
import { OPT_OUT_PATHS } from "@/lib/telemetry-data";

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

        <h1
          className="text-[44px] leading-[1.05] font-normal mb-8"
          style={{ color: "var(--ink)" }}
        >
          A light ping, and why we ask.
        </h1>

        <div
          className="space-y-5 text-[17px] leading-8"
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
            One anonymous daily heartbeat tells funders that real people are using
            nteract. The ping is evidence of use, not funding.
          </p>
        </div>

        <PingPreview />

        <p
          className="text-[17px] leading-8"
          style={{ color: "var(--ink)" }}
        >
          If you&rsquo;d rather not, flip it off. No penalty. No degraded features.
        </p>

        <Rights />

        <section className="mt-12">
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
          <p className="mt-4 text-[13px]" style={{ color: "var(--muted)" }}>
            For locked-down deployments and CI images: {OPT_OUT_PATHS.envVar}
          </p>
        </section>

        <Receipt />

        <section
          className="mt-16 pt-8 border-t text-[15px] leading-7"
          style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--ink)" }}>
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
            covers NumFOCUS services (its website, event registration, etc.), not
            sponsored projects. This page is how <em>nteract</em> handles your data.
          </p>
        </section>

        <section
          className="mt-10 pt-8 border-t text-[15px] leading-7"
          style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--ink)" }}>
            Contact
          </h2>
          <p>
            Privacy questions:{" "}
            <a href="mailto:privacy@nteract.io">privacy@nteract.io</a>.
          </p>
          <p className="mt-3" style={{ color: "var(--muted)" }}>
            Source:{" "}
            <a
              href="https://github.com/nteract/desktop"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/nteract/desktop
            </a>
            .
          </p>
        </section>
      </article>
    </PageShell>
  );
}
