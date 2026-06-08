import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

import {
  formatEntryDate,
  getAllEntries,
  shouldShowDrafts,
} from "@/lib/changelog";

// Request-time so the draft gate sees the host, same as the rest of the section.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Changelog (print)",
  robots: { index: false, follow: false },
};

export default async function ChangelogPrintPage() {
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
    <div className="changelog-print">
      <div className="print-hint">
        Print or save as PDF with Cmd/Ctrl+P. One release per page, the technical
        changelog is omitted, and line spacing is loose so you can edit between
        the lines. <Link href="/changelog">← back to the changelog</Link>
      </div>

      {rendered.map(({ entry, Content }) => (
        <article key={entry.version} className="print-entry">
          <div className="print-entry__eyebrow">
            nteract {entry.version} · {formatEntryDate(entry)}
          </div>
          <h1>{entry.title}</h1>
          <p className="print-entry__summary">{entry.summary}</p>

          {entry.highlights.length > 0 ? (
            <ul className="print-entry__highlights">
              {entry.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          ) : null}

          <div className="cl-print-body">
            <Content />
          </div>
        </article>
      ))}
    </div>
  );
}
