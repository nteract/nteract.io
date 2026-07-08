import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ChangelogTagList } from "@/components/changelog/tag-list";
import { RuntimeStatusDot } from "@/components/elements/runtime-status-dot";
import { Prose } from "@/components/prose";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import {
  formatEntryDate,
  resolveVersionParam,
  shouldShowDrafts,
} from "@/lib/changelog";
import { absoluteUrl } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader active="changelog" />

      <main className="mx-auto w-full max-w-[45rem] flex-1 px-6 pb-[72px] pt-16 sm:px-10">
        <article>
          {/* Header */}
          <header className="mb-10">
            <div className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <Link
                href="/changelog"
                className="text-foreground transition-colors hover:text-muted-foreground"
              >
                ← Changelog
              </Link>
              <div className="h-px flex-grow bg-border" />
              <time dateTime={entry.date}>{formatEntryDate(entry)}</time>
            </div>

            <div className="mb-4 flex items-center gap-4">
              <span className="font-mono text-[32px] font-semibold tracking-[-0.02em] text-foreground">
                {entry.version}
              </span>
              <RuntimeStatusDot
                status={entry.published ? "ready" : "executing"}
                showLabel
                label={entry.published ? "shipped" : "in progress"}
              />
            </div>

            <h1 className="mb-3 text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[40px]">
              {entry.title}
            </h1>

            <p className="mb-6 max-w-[560px] text-lg leading-normal text-muted-foreground">
              {entry.summary}
            </p>

            <ChangelogTagList tags={entry.tags} />
          </header>

          {/* Hero */}
          {entry.heroVideo ? (
            <section className="mb-12">
              <div className="overflow-hidden rounded-lg border border-border">
                <video
                  src={entry.heroVideo}
                  poster={entry.heroVideoPoster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="block w-full"
                />
              </div>
            </section>
          ) : entry.heroImage ? (
            <section className="mb-12">
              <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-card">
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
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold tracking-[-0.02em]">
                Highlights
              </h2>
              <ul className="flex flex-col gap-2.5">
                {entry.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2.5 text-[15.5px] leading-normal"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-[5px] w-[5px] shrink-0 rounded-[1px] bg-foreground"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Body — narrative + full technical changelog */}
          <Prose>
            <Content />
          </Prose>

          {/* Footer */}
          <div className="mt-14 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em]">
            <Link
              href="/changelog"
              className="text-foreground transition-colors hover:text-muted-foreground"
            >
              ← All releases
            </Link>
            <div className="h-px flex-grow bg-border" />
            {entry.githubReleaseUrl ? (
              <a
                href={entry.githubReleaseUrl}
                className="text-muted-foreground transition-colors hover:text-foreground"
                rel="noreferrer"
                target="_blank"
              >
                GitHub release →
              </a>
            ) : null}
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
