import type { ReactNode } from "react";

import Link from "next/link";

import { ChangelogTagList } from "@/components/changelog/tag-list";
import { RuntimeStatusDot } from "@/components/elements/runtime-status-dot";
import { Prose } from "@/components/prose";
import { formatEntryDate, type ChangelogEntrySummary } from "@/lib/changelog";

type ChangelogFeedEntryProps = {
  entry: ChangelogEntrySummary;
  /** The entry's MDX body, rendered inline in the feed. */
  children?: ReactNode;
};

/**
 * One release rendered in full inline in the scrolling feed: version, shipped
 * state, and date in a left rail, the whole story on the right (highlights,
 * hero, and the MDX body, whose exhaustive technical changelog stays inside
 * its collapsed disclosure). The version and title link to the shareable
 * per-version page.
 */
export function ChangelogFeedEntry({ entry, children }: ChangelogFeedEntryProps) {
  const href = `/changelog/${entry.version}`;

  return (
    <article
      id={`v${entry.version}`}
      className="scroll-mt-24 border-t border-border py-9 md:grid md:grid-cols-[140px_1fr] md:gap-7"
    >
      {/* Left rail — version + release state + date */}
      <div className="mb-5 flex flex-row items-baseline gap-4 md:mb-0 md:flex-col md:items-start md:gap-2">
        <Link
          href={href}
          className="font-mono text-[32px] font-semibold tracking-[-0.02em] text-foreground transition-colors hover:text-muted-foreground"
        >
          {entry.version}
        </Link>
        <RuntimeStatusDot
          status={entry.published ? "ready" : "executing"}
          showLabel
          label={entry.published ? "shipped" : "in progress"}
        />
        <time
          dateTime={entry.date}
          className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground"
        >
          {formatEntryDate(entry)}
        </time>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        <Link href={href} className="block">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-foreground">
            {entry.title}
          </h2>
        </Link>

        <p className="text-[15px] leading-[1.55] text-muted-foreground">
          {entry.summary}
        </p>

        {entry.highlights.length > 0 ? (
          <ul className="mt-1 flex flex-col gap-[7px]">
            {entry.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-2.5 text-[14.5px] leading-[1.45] text-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-[1px] bg-foreground"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {/* Hero — driven by heroVideo / heroImage frontmatter */}
        {entry.heroVideo ? (
          <div className="mt-2 overflow-hidden rounded-lg border border-border">
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
        ) : entry.heroImage ? (
          <div className="mt-2 overflow-hidden rounded-lg border border-border">
            <img src={entry.heroImage} alt={entry.title} className="block w-full" />
          </div>
        ) : null}

        {/* Full body, rendered inline */}
        {children ? <Prose className="mt-2">{children}</Prose> : null}

        <div className="mt-3 flex flex-wrap items-center gap-5">
          <ChangelogTagList tags={entry.tags} />
          <Link
            href={href}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Permalink →
          </Link>
        </div>
      </div>
    </article>
  );
}
