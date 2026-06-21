import type { Metadata } from "next";
import Link from "next/link";

import { DownloadButtons } from "@/components/home/download-buttons";
import { CommandBlock, InlineCode, PageHero, StepCard } from "@/components/product/page-primitives";
import { Container, SiteFooter, SiteHeader } from "@/components/site-shell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Install nteract",
  description:
    "Get the nteract desktop app for macOS, Windows, and Linux — or install the CLI and daemon on any Linux or macOS machine with one command.",
};

async function getStableVersion(): Promise<string | null> {
  try {
    const res = await fetch(siteConfig.stableManifestUrl, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const manifest = (await res.json()) as { version?: string };
    return manifest.version ?? null;
  } catch {
    return null;
  }
}

const INSTALL_CMD = ["curl -fsSL https://sh.nteract.io | bash"];

export default async function InstallPage() {
  const version = await getStableVersion();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <SiteHeader />

      <main>
        <Container className="py-16 sm:py-24">
          <PageHero
            eyebrow="Install"
            title="Install nteract"
            subtitle={
              <>
                The desktop app for the machine in front of you. One command for
                every other machine you own.
              </>
            }
          />

          <div className="mx-auto mt-12 grid max-w-4xl gap-6">
            <StepCard eyebrow="01" title="Desktop app">
              <p>
                macOS (Apple silicon or Intel), Windows, and Linux. The app
                bundles everything: the notebook, the <InlineCode>runt</InlineCode>{" "}
                CLI, and the <InlineCode>runtimed</InlineCode> daemon, kept up to
                date automatically.
              </p>
              <DownloadButtons version={version} />
            </StepCard>

            <StepCard eyebrow="02" title="One command — Linux & macOS">
              <CommandBlock commands={INSTALL_CMD} />
              <p>
                Installs the app (the AppImage on Linux; the signed bundle in{" "}
                <InlineCode>~/Applications</InlineCode> on macOS) plus{" "}
                <InlineCode>runt</InlineCode>, <InlineCode>runtimed</InlineCode>,
                and <InlineCode>nteract-mcp</InlineCode>, links the commands
                into <InlineCode>~/.local/bin</InlineCode>, and sets up the
                per-user daemon service (systemd on Linux, launchd on macOS).
                Everything is per-user — no root, no system package manager.
                Re-run the same command to upgrade.
              </p>
            </StepCard>

            <StepCard eyebrow="03" title="Channels">
              <p>
                Stable is the default everywhere above. The{" "}
                <Link
                  href="/nightly"
                  className="font-medium text-teal-700 underline decoration-teal-700/30 underline-offset-4 hover:text-teal-900"
                >
                  nightly channel
                </Link>{" "}
                installs side-by-side with channel-suffixed commands
                (<InlineCode>runt-nightly</InlineCode>,{" "}
                <InlineCode>nteract-nightly</InlineCode>), so you can run both.
                Agents have their own setup — see{" "}
                <Link
                  href="/agents"
                  className="font-medium text-teal-700 underline decoration-teal-700/30 underline-offset-4 hover:text-teal-900"
                >
                  nteract for agents
                </Link>
                .
              </p>
            </StepCard>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
