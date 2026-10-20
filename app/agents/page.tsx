import type { Metadata, Viewport } from "next";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { buttonVariants } from "@/components/ui/button-variants";

export const metadata: Metadata = {
  title: "Use nteract with agents",
  description:
    "Install nteract's agent plugins for Claude Code and Codex so agents can work in live notebooks instead of throwaway scripts.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-px font-mono text-[0.9em]">
      {children}
    </code>
  );
}

function InstallCard({
  label,
  children,
  footnote,
}: {
  label: string;
  children: React.ReactNode;
  footnote: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
      </div>
      <pre className="overflow-x-auto bg-[oklch(0.09_0_0)] p-4 font-mono text-[12.5px] leading-[1.8] text-foreground">
        {children}
      </pre>
      <div className="px-4 py-3 text-[13.5px] leading-[1.55] text-muted-foreground">
        {footnote}
      </div>
    </div>
  );
}

export default function AgentsPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteHeader active="agents" />

      <main className="mx-auto w-full max-w-[47.5rem] px-6 pb-[72px] pt-16 sm:px-10">
        <div className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>Agents</span>
          <div className="h-px flex-grow bg-border" />
          <span>claude code · codex</span>
        </div>

        <h1 className="mb-4 text-[40px] font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-[56px]">
          Agents: Show Your Work
        </h1>
        <p className="mb-12 max-w-[600px] text-lg leading-[1.55] text-muted-foreground">
          A live notebook for Claude Code and Codex. State persists. Outputs
          stay rich. Every step is yours to inspect, edit, and keep.
        </p>

        <div className="mb-12 grid gap-5 sm:grid-cols-2">
          <InstallCard
            label="Claude Code"
            footnote={
              <>
                Plugins pin at install time. Add{" "}
                <InlineCode>--ref vX.Y.Z</InlineCode> for a known release.
              </>
            }
          >
            {"/plugin marketplace add nteract/agent-plugins\n/plugin install nteract@nteract\n"}
            <span className="text-muted-foreground"># nightly channel:</span>
            {"\n/plugin install nightly@nteract"}
          </InstallCard>

          <InstallCard
            label="Codex"
            footnote="Restart Codex after changing plugin or marketplace settings."
          >
            {"codex plugin marketplace add \\\n  nteract/agent-plugins\n"}
            <span className="text-muted-foreground">
              {"# then run /plugin in Codex and\n# enable nteract or nightly"}
            </span>
          </InstallCard>
        </div>

        <section
          id="upgrade-codex-plugin"
          className="mb-12 border-t border-border pt-7"
        >
          <h2 className="mb-4 text-2xl font-bold tracking-[-0.02em]">
            Updating the Codex plugin
          </h2>
          <p className="mb-4 text-[15.5px] leading-normal text-muted-foreground">
            The desktop app and agent plugin update separately. If notebook
            calls fail with <InlineCode>unsupported_notebook_target</InlineCode>{" "}
            or “This child does not advertise required notebook_handle routing,”
            an older plugin may be rejecting your updated app. The plugin needs
            updating even if the error says to upgrade the child.
          </p>
          <p className="mb-4 text-[15.5px] leading-normal text-muted-foreground">
            Save your notebook work, then run this in a terminal for the stable
            plugin. For Nightly, replace{" "}
            <InlineCode>nteract@nteract-plugins</InlineCode> with{" "}
            <InlineCode>nightly@nteract-plugins</InlineCode> in both commands.
          </p>
          <InstallCard
            label="Refresh and reinstall"
            footnote={
              <>
                The <InlineCode>&amp;&amp;</InlineCode> operators stop if a step
                fails. If the marketplace clone times out or reports “early
                EOF,” stop before removing the plugin. Follow the{" "}
                <a
                  href="https://github.com/nteract/nteract#upgrade-the-codex-plugin"
                  className="underline underline-offset-4"
                >
                  recovery guide
                </a>{" "}
                for a shallow local checkout or a pinned marketplace.
              </>
            }
          >
            {"codex plugin marketplace upgrade nteract-plugins &&\ncodex plugin remove nteract@nteract-plugins &&\ncodex plugin add nteract@nteract-plugins"}
          </InstallCard>
          <p className="mt-4 text-[15.5px] leading-normal text-muted-foreground">
            Restart Codex and start a fresh session to load the updated plugin
            and tools. Reconnecting the notebook worker alone does not upgrade
            the plugin. Ask the agent to create a notebook and run{" "}
            <InlineCode>1 + 1</InlineCode>; confirm the cell returns{" "}
            <InlineCode>2</InlineCode>.
          </p>
        </section>

        <h2 className="mb-4 text-2xl font-bold tracking-[-0.02em]">
          What agents get
        </h2>
        <ul className="mb-12 flex max-w-[620px] flex-col gap-2.5">
          {[
            "Notebook-backed Python sessions that keep variables and imports between runs.",
            "Dependencies added before or during exploratory work.",
            "Cells and rich outputs to inspect instead of reconstructed shell logs.",
            "A durable scratchpad. Save the notebook when the exploration is worth keeping.",
          ].map((item) => (
            <li
              key={item}
              className="flex gap-2.5 text-[15.5px] leading-normal"
            >
              <span
                aria-hidden="true"
                className="mt-2 h-[5px] w-[5px] shrink-0 rounded-[1px] bg-foreground"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-4 border-t border-border pt-7">
          <Link href="/install" className={buttonVariants()}>
            Download nteract
          </Link>
          <span className="text-[13.5px] text-muted-foreground">
            Tools missing? Check the{" "}
            <a
              href="#upgrade-codex-plugin"
              className="underline underline-offset-4"
            >
              plugin upgrade steps
            </a>{" "}
            or run <InlineCode>nteract doctor</InlineCode>.
          </span>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
