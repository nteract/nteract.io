import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { Container, SiteFooter, SiteHeader } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Use nteract with agents",
  description:
    "Install nteract's agent plugins for Claude Code and Codex so agents can work in live notebooks instead of throwaway scripts.",
};

const claudeCommands = [
  "/plugin marketplace add nteract/agent-plugins",
  "/plugin install nteract@nteract       # stable",
  "/plugin install nightly@nteract       # nightly",
];

const codexCommands = [
  "codex plugin marketplace add nteract/agent-plugins",
  "# Then run /plugin in Codex and enable nteract or nightly",
];

function CommandBlock({ commands }: { commands: string[] }) {
  return (
    <pre className="overflow-x-auto rounded-2xl border border-black/10 bg-slate-950 px-5 py-4 text-sm leading-7 text-slate-100 shadow-sm">
      <code>{commands.join("\n")}</code>
    </pre>
  );
}

function StepCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-teal-600">
        {eyebrow}
      </p>
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-950">
        {title}
      </h2>
      <div className="space-y-4 text-[16px] leading-7 text-gray-700">{children}</div>
    </section>
  );
}

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <SiteHeader />

      <main>
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">
              Agents
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-6xl">
              Use nteract as your agent notebook
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              nteract plugins let Claude Code and Codex run exploratory Python in
              a live notebook instead of hiding work in one-off shell commands.
              The notebook keeps state, captures rich outputs, and stays available
              for humans to inspect, edit, and save.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6">
            <StepCard eyebrow="01" title="Choose the stable or nightly plugin">
              <p>
                Install from the generated plugin marketplace at{" "}
                <a
                  href="https://github.com/nteract/agent-plugins"
                  className="font-medium text-teal-700 underline decoration-teal-700/30 underline-offset-4 hover:text-teal-900"
                  rel="noreferrer"
                  target="_blank"
                >
                  nteract/agent-plugins
                </a>
                . The repository is produced by the nteract release pipeline, so
                the source of truth for changes remains the main nteract repo.
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-gray-950">nteract</strong>: the stable
                  plugin channel for normal use.
                </li>
                <li>
                  <strong className="text-gray-950">nightly</strong>: early
                  access to the latest runtime and notebook tools.
                </li>
              </ul>
            </StepCard>

            <StepCard eyebrow="02" title="Install in Claude Code">
              <CommandBlock commands={claudeCommands} />
              <p>
                Claude Code pins plugins at install time. To install a known
                release, add <code className="rounded bg-gray-100 px-1 py-0.5">--ref vX.Y.Z</code>{" "}
                to the install command.
              </p>
            </StepCard>

            <StepCard eyebrow="03" title="Install in Codex">
              <CommandBlock commands={codexCommands} />
              <p>
                After registering the marketplace, start or restart Codex, run{" "}
                <code className="rounded bg-gray-100 px-1 py-0.5">/plugin</code>,
                pick the nteract marketplace, and enable the stable or nightly
                plugin. Codex resolves the platform-specific sidecar bundled with
                the plugin.
              </p>
            </StepCard>

            <StepCard eyebrow="04" title="What agents get">
              <ul className="list-disc space-y-2 pl-6">
                <li>Create or connect to notebook-backed Python sessions.</li>
                <li>Run code repeatedly while preserving variables and imports.</li>
                <li>Add dependencies before or during exploratory work.</li>
                <li>Inspect cells and outputs instead of reconstructing shell logs.</li>
                <li>Save the resulting notebook when the exploration is worth keeping.</li>
              </ul>
              <p>
                In practice, this gives an agent a durable scratchpad that you can
                open in nteract, review, and continue working on yourself.
              </p>
            </StepCard>

            <StepCard eyebrow="05" title="Troubleshooting">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  If notebook tools do not appear, restart the agent after changing
                  plugin or marketplace settings.
                </li>
                <li>
                  If the stable channel is not enough, install the nightly plugin
                  and try the same workflow there.
                </li>
                <li>
                  If the agent reports runtime issues, open nteract locally and run{" "}
                  <code className="rounded bg-gray-100 px-1 py-0.5">runt doctor</code>{" "}
                  or <code className="rounded bg-gray-100 px-1 py-0.5">runt-nightly doctor</code>.
                </li>
              </ul>
            </StepCard>
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-teal-200 bg-teal-50 p-6 text-gray-800">
            <h2 className="text-xl font-bold tracking-tight text-gray-950">
              Want the desktop app too?
            </h2>
            <p className="mt-3 leading-7">
              Install nteract from the homepage when you want the full native
              notebook interface alongside the agent plugin. The plugin makes the
              agent workflow available; the app gives you a friendly place to see
              and continue the notebook work.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex rounded-full bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Download nteract
            </Link>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
