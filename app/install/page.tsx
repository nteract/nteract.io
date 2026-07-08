import type { Metadata } from "next";
import Link from "next/link";

import { DownloadButtons } from "@/components/home/download-buttons";
import { CommandBlock, InlineCode, PageHero, StepCard } from "@/components/product/page-primitives";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
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

const linkClassName =
  "font-medium text-foreground underline decoration-[color-mix(in_srgb,var(--foreground)_30%,transparent)] underline-offset-4 transition-colors hover:decoration-[var(--foreground)]";

export default async function InstallPage() {
  const version = await getStableVersion();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader active="install" />

      <main className="mx-auto w-full max-w-[47.5rem] flex-1 px-6 pb-[72px] pt-16 sm:px-10">
        <PageHero
          eyebrow="Install"
          detail="macos · windows · linux"
          title="Install nteract"
          subtitle={
            <>
              The desktop app for the machine in front of you. One command for
              every other machine you own.
            </>
          }
        />

        <div className="grid gap-5">
          <StepCard eyebrow="Desktop" title="Desktop app">
            <p>
              macOS (Apple silicon or Intel), Windows, and Linux. The app
              bundles everything: the notebook, the <InlineCode>runt</InlineCode>{" "}
              CLI, and the <InlineCode>runtimed</InlineCode> daemon, kept up to
              date automatically.
            </p>
            <DownloadButtons version={version} />
          </StepCard>

          <StepCard eyebrow="Headless" title="One command — Linux & macOS">
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

          <StepCard eyebrow="Channels" title="Channels">
            <p>
              Stable is the default everywhere above. The{" "}
              <Link href="/nightly" className={linkClassName}>
                nightly channel
              </Link>{" "}
              installs side-by-side with channel-suffixed commands
              (<InlineCode>runt-nightly</InlineCode>,{" "}
              <InlineCode>nteract-nightly</InlineCode>), so you can run both.
              Agents have their own setup — see{" "}
              <Link href="/agents" className={linkClassName}>
                nteract for agents
              </Link>
              .
            </p>
          </StepCard>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
