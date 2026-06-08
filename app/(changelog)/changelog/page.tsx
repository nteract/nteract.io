import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

import { ChangelogFeedEntry } from "@/components/changelog/changelog-feed-entry";
import { getAllEntries, shouldShowDrafts } from "@/lib/changelog";
import { absoluteUrl, siteConfig } from "@/lib/site";

// Rendered at request time so the draft gate can read the request host.
// Production (nteract.io) hides drafts; dev and preview deployments show them.
export const dynamic = "force-dynamic";

const description =
  "Every nteract stable release, in human terms. What changed, why it matters, and what to try next.";

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
    images: [absoluteUrl("/opengraph-image")],
  },
  twitter: {
    card: "summary_large_image",
    title: `Changelog | ${siteConfig.name}`,
    description,
  },
};

export default async function ChangelogPage() {
  const host = (await headers()).get("host");
  const entries = await getAllEntries({
    includeUnpublished: shouldShowDrafts(host),
  });

  const rendered = await Promise.all(
    entries.map(async (entry) => {
      const { default: Content } = await import(
        `@/content/changelog/${entry.version}.mdx`
      );
      return { entry, Content };
    }),
  );

  return (
    <div className="px-6 pb-24 pt-12 md:px-12">
      <section className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent)] transition-colors hover:text-[var(--ink)]"
          >
            ← Home
          </Link>
          <div className="h-px flex-grow bg-[var(--rule)]" />
          <Link
            href="/changelog/print"
            className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent)] transition-colors hover:text-[var(--ink)]"
          >
            Print
          </Link>
          <a
            href="/changelog/feed.xml"
            className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
          >
            RSS
          </a>
        </div>

        <h1 className="text-[var(--ink)]">Changelog</h1>

        <p className="mb-16 max-w-2xl text-xl leading-snug text-[var(--muted)]">
          A local AI-native notebook workspace where humans and agents
          collaborate through the same live document and runtime. Here is how it
          gets better, release by release.
        </p>

        {rendered.length > 0 ? (
          <div className="space-y-12">
            {rendered.map(({ entry, Content }) => (
              <ChangelogFeedEntry key={entry.version} entry={entry}>
                <Content />
              </ChangelogFeedEntry>
            ))}
          </div>
        ) : (
          <div className="border border-[var(--rule)] bg-[var(--paper-elevated)] px-6 py-10 text-[var(--muted)]">
            The first release notes are still in draft. Check back soon.
          </div>
        )}
      </section>
    </div>
  );
}
