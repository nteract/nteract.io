import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Link from "next/link";

import { ChangelogFeedEntry } from "@/components/changelog/changelog-feed-entry";
import { ChangelogGrid, ChangelogMain } from "@/components/changelog/layout";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { getAllEntries, shouldShowDrafts } from "@/lib/changelog";
import { absoluteUrl, siteConfig } from "@/lib/site";

// Rendered at request time so the draft gate can read the request host.
// Production (nteract.io) hides drafts; dev and preview deployments show them.
export const dynamic = "force-dynamic";

const description =
  "Local-first notebooks, built from the ground up for mingling with agents. Here's how it gets better, release by release.";

// Handcrafted generic changelog card. Intentionally not a per-release image:
// the index represents the whole changelog, so it keeps its own card.
const ogImage = "https://img.runt.run/2026/06/08/a633578f00f5.png";

export const metadata: Metadata = {
  title: "Changelog",
  description,
  alternates: {
    canonical: absoluteUrl("/changelog"),
    types: {
      "application/rss+xml": absoluteUrl("/changelog/feed.xml"),
    },
  },
  openGraph: {
    title: `Changelog | ${siteConfig.name}`,
    description,
    url: absoluteUrl("/changelog"),
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `Changelog | ${siteConfig.name}`,
    description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function ChangelogPage() {
  const host = (await headers()).get("host");
  const entries = await getAllEntries({
    includeUnpublished: shouldShowDrafts(host),
  });

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader active="changelog" />

      <ChangelogMain>
        <header className="mb-11">
          <ChangelogGrid className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>Changelog</span>
            <div className="flex flex-1 items-center gap-3">
              <div className="h-px flex-grow bg-border" />
              <Link
                href="/changelog/print"
                className="transition-colors hover:text-foreground"
              >
                Print
              </Link>
              <a
                href="/changelog/feed.xml"
                className="transition-colors hover:text-foreground"
              >
                RSS
              </a>
            </div>
          </ChangelogGrid>

          <ChangelogGrid>
            <div className="md:col-start-2">
              <h1 className="mb-3 text-[40px] font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-[56px]">
                Changelog
              </h1>
              <p className="max-w-[42rem] text-[17px] leading-[1.55] text-muted-foreground">
                {description}
              </p>
            </div>
          </ChangelogGrid>
        </header>

        {entries.length > 0 ? (
          <div>
            {entries.map((entry) => (
              <ChangelogFeedEntry key={entry.version} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card px-6 py-10 text-muted-foreground">
            The first release notes are still in draft. Check back soon.
          </div>
        )}
      </ChangelogMain>

      <SiteFooter />
    </div>
  );
}
