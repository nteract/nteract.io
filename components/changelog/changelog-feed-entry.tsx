import Link from "next/link";

import { ChangelogTagList } from "@/components/changelog/tag-list";
import { formatEntryDate, type ChangelogEntrySummary } from "@/lib/changelog";

type ChangelogFeedEntryProps = {
  entry: ChangelogEntrySummary;
};

/**
 * One release in the scrolling feed: version and date in a left rail; title,
 * summary, highlights, and hero on the right. The narrative body and the
 * exhaustive technical changelog stay on the per-version page, which the
 * version, title, and release-notes link all point at — keeping the index
 * payload small.
 */
export function ChangelogFeedEntry({ entry }: ChangelogFeedEntryProps) {
  const href = `/changelog/${entry.version}`;

  return (
    <article
      id={`v${entry.version}`}
      className="scroll-mt-24 border-t border-border py-9 md:grid md:grid-cols-[140px_1fr] md:gap-7"
    >
      {/* Left rail — version + date */}
      <div className="mb-5 flex flex-row items-baseline gap-4 md:mb-0 md:flex-col md:items-start md:gap-2">
        <Link
          href={href}
          className="font-mono text-[32px] font-semibold tracking-[-0.02em] text-foreground transition-colors hover:text-muted-foreground"
        >
          {entry.version}
        </Link>
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

        <p className="max-w-[42rem] text-[15px] leading-[1.55] text-muted-foreground">
          {entry.summary}
        </p>

        {entry.highlights.length > 0 ? (
          <ul className="mt-1 flex max-w-[42rem] flex-col gap-[7px]">
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

        <div className="mt-3 flex flex-wrap items-center gap-5">
          <ChangelogTagList tags={entry.tags} />
          <Link
            href={href}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Release notes →
          </Link>
        </div>
      </div>
    </article>
  );
}
