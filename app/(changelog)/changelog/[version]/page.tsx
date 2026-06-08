import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ChangelogTagList } from "@/components/changelog/tag-list";
import { Prose } from "@/components/prose";
import {
  formatEntryDate,
  resolveVersionParam,
  shouldShowDrafts,
} from "@/lib/changelog";
import { absoluteUrl } from "@/lib/site";

type ChangelogVersionPageProps = {
  params: Promise<{
    version: string;
  }>;
};

// Rendered at request time so the draft gate can read the request host.
// Production (nteract.io) serves only published versions; dev and preview
// deployments serve drafts too.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ChangelogVersionPageProps): Promise<Metadata> {
  const { version } = await params;
  const host = (await headers()).get("host");
  const resolved = await resolveVersionParam(version, {
    includeUnpublished: shouldShowDrafts(host),
  });

  if (!resolved || resolved.kind !== "canonical") {
    return {};
  }

  const { entry } = resolved;
  const canonical = absoluteUrl(`/changelog/${entry.version}`);
  const ogImage =
    entry.heroImage ?? absoluteUrl(`/changelog/${entry.version}/opengraph-image`);

  return {
    title: `nteract ${entry.version} — ${entry.title}`,
    description: entry.summary,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `nteract ${entry.version} — ${entry.title}`,
      description: entry.summary,
      url: canonical,
      type: "article",
      publishedTime: entry.date,
      tags: entry.tags,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `nteract ${entry.version} — ${entry.title}`,
      description: entry.summary,
      images: [ogImage],
    },
  };
}

export default async function ChangelogVersionPage({
  params,
}: ChangelogVersionPageProps) {
  const { version } = await params;
  const host = (await headers()).get("host");
  const resolved = await resolveVersionParam(version, {
    includeUnpublished: shouldShowDrafts(host),
  });

  if (!resolved) {
    notFound();
  }

  if (resolved.kind === "redirect") {
    redirect(`/changelog/${resolved.version}`);
  }

  const { entry } = resolved;
  const { default: Content } = await import(
    `@/content/changelog/${entry.version}.mdx`
  );

  return (
    <div className="px-6 pb-24 pt-12 md:px-12">
      <article className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-6 flex items-center gap-4">
            <Link
              href="/changelog"
              className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent)] transition-colors hover:text-[var(--ink)]"
            >
              ← Changelog
            </Link>
            <div className="h-px flex-grow bg-[var(--rule)]" />
            <time
              dateTime={entry.date}
              className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]"
            >
              {formatEntryDate(entry)}
            </time>
          </div>

          <div className="mb-4 font-mono text-sm uppercase tracking-[0.25em] text-[var(--accent)]">
            nteract {entry.version}
          </div>

          <h1 className="text-[var(--ink)]">{entry.title}</h1>

          <p className="mb-6 mt-2 max-w-2xl text-xl leading-snug text-[var(--muted)]">
            {entry.summary}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <ChangelogTagList tags={entry.tags} />
          </div>
        </header>

        {/* Hero */}
        {entry.heroVideo ? (
          <section className="mb-16">
            <div className="overflow-hidden border border-[var(--rule)]">
              <video
                src={entry.heroVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full"
              />
            </div>
          </section>
        ) : entry.heroImage ? (
          <section className="mb-16">
            <div className="aspect-video w-full overflow-hidden border border-[var(--rule)] bg-[var(--paper-elevated)]">
              <img
                alt={entry.title}
                className="h-full w-full object-cover"
                src={entry.heroImage}
              />
            </div>
          </section>
        ) : null}

        {/* Highlights */}
        {entry.highlights.length > 0 ? (
          <section className="mx-auto mb-16 max-w-2xl">
            <h2 className="mb-5 text-2xl text-[var(--ink)]">Highlights</h2>
            <ul className="space-y-3">
              {entry.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-lg text-[var(--ink)]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-[var(--accent)]"
                  />
                  <span className="leading-snug">{highlight}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Body — narrative + full technical changelog */}
        <Prose className="nteract-prose mx-auto max-w-2xl">
          <Content />
        </Prose>

        {/* Footer */}
        <div className="mx-auto mt-16 flex max-w-2xl flex-wrap items-center gap-4">
          <Link
            href="/changelog"
            className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent)] transition-colors hover:text-[var(--ink)]"
          >
            ← All releases
          </Link>
          <div className="h-px flex-grow bg-[var(--rule)]" />
          {entry.githubReleaseUrl ? (
            <a
              href={entry.githubReleaseUrl}
              className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
              rel="noreferrer"
              target="_blank"
            >
              GitHub release →
            </a>
          ) : null}
        </div>
      </article>
    </div>
  );
}
