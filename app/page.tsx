import Link from "next/link";

import { Logo } from "@/components/logo";
import { DownloadButtons } from "@/components/home/download-buttons";
import { RuntimeStatusDot } from "@/components/elements/runtime-status-dot";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { getAllEntries } from "@/lib/changelog";
import { siteConfig } from "@/lib/site";

async function getStableVersion(): Promise<string | null> {
  try {
    const res = await fetch(siteConfig.stableManifestUrl, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const manifest = await res.json();
    return manifest.version ?? null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const version = await getStableVersion();
  const [latestEntry] = await getAllEntries({ includeUnpublished: false });

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <Link
            href={latestEntry ? `/changelog/${latestEntry.version}` : "/changelog"}
            className="group mb-10 inline-flex items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pl-4 pr-4 text-sm transition-colors hover:border-ring"
          >
            <RuntimeStatusDot status="ready" />
            <span className="font-medium text-foreground">
              {latestEntry ? `nteract ${latestEntry.version} is out` : "See what's new"}
            </span>
            <span className="text-muted-foreground transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>

          <Logo className="mx-auto mb-8 h-40 w-40" />

          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Native interactive notebooks
          </p>
          <h1 className="mb-3 text-5xl font-bold tracking-[-0.03em]">
            {siteConfig.name}
          </h1>
          <p className="mx-auto mb-8 max-w-md text-base text-muted-foreground">
            Fast to launch. Agent ready. Humans welcome.
          </p>

          <DownloadButtons version={version} />

          <div className="mt-12">
            <Link
              href="/agents"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>
                <span className="font-medium text-foreground">
                  Using agents?
                </span>{" "}
                Install the plugins
              </span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
