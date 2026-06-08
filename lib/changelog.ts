import { promises as fs } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const CHANGELOG_DIRECTORY = path.join(process.cwd(), "content/changelog");

export type ChangelogFrontmatter = {
  /** Clean display version, e.g. "2.5.1" or a grouped "2.4". Also the slug/filename. */
  version: string;
  /** ISO timestamp of the (latest) stable release in this entry. Drives sort + display. */
  date: string;
  /** Exact versions this entry represents. Patch URLs in here redirect to {version}. */
  coversVersions: string[];
  /** Human headline. The payload, not "v2.5.1 Released". */
  title: string;
  /** One-sentence summary aimed at a notebook user. Feed subtitle + meta description. */
  summary: string;
  /** 2-4 scannable bullets rendered on the feed card. */
  highlights: string[];
  tags: string[];
  /** Optional human date range for grouped entries, e.g. "May 2–14, 2026". */
  dateLabel?: string;
  heroImage?: string;
  heroVideo?: string;
  /** Canonical GitHub release this entry points at. */
  githubReleaseUrl?: string;
  published: boolean;
};

export type ChangelogEntrySummary = ChangelogFrontmatter & {
  slug: string;
};

export type ChangelogEntry = ChangelogEntrySummary & {
  content: string;
};

type ChangelogQueryOptions = {
  includeUnpublished?: boolean;
};

function assertString(
  value: unknown,
  field: keyof ChangelogFrontmatter,
  fileName: string,
) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(
      `Expected "${field}" to be a non-empty string in ${fileName}`,
    );
  }

  return value.trim();
}

function normalizeDate(value: unknown, fileName: string) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }

  return assertString(value, "date", fileName);
}

function normalizeStringArray(
  value: unknown,
  field: keyof ChangelogFrontmatter,
  fileName: string,
) {
  if (value == null) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((entry) => assertString(entry, field, fileName));
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
  }

  throw new Error(
    `Expected "${field}" to be a string or string[] in ${fileName}`,
  );
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function parseFrontmatter(fileName: string, data: Record<string, unknown>) {
  const version = assertString(data.version, "version", fileName);
  const date = normalizeDate(data.date, fileName);
  const coversVersionsRaw = normalizeStringArray(
    data.coversVersions,
    "coversVersions",
    fileName,
  );
  const coversVersions =
    coversVersionsRaw.length > 0 ? coversVersionsRaw : [version];
  const title = assertString(data.title, "title", fileName);
  const summary = assertString(data.summary, "summary", fileName);
  const highlights = normalizeStringArray(
    data.highlights,
    "highlights",
    fileName,
  );
  const tags = normalizeStringArray(data.tags, "tags", fileName);
  const dateLabel = optionalString(data.dateLabel);
  const heroImage = optionalString(data.heroImage);
  const heroVideo = optionalString(data.heroVideo);
  const githubReleaseUrl = optionalString(data.githubReleaseUrl);
  const published =
    data.published === undefined ? true : Boolean(data.published);

  return {
    version,
    date,
    coversVersions,
    title,
    summary,
    highlights,
    tags,
    dateLabel,
    heroImage,
    heroVideo,
    githubReleaseUrl,
    published,
  } satisfies ChangelogFrontmatter;
}

function toSlug(fileName: string) {
  return fileName.replace(/\.mdx?$/, "");
}

/** Newest first by release date, version as a stable tiebreaker. */
function compareEntries(
  left: ChangelogEntrySummary,
  right: ChangelogEntrySummary,
) {
  const byDate = new Date(right.date).getTime() - new Date(left.date).getTime();
  if (byDate !== 0) {
    return byDate;
  }
  return compareVersionsDescending(left.version, right.version);
}

function compareVersionsDescending(left: string, right: string) {
  const leftParts = left.split(".").map((part) => Number.parseInt(part, 10));
  const rightParts = right.split(".").map((part) => Number.parseInt(part, 10));
  const length = Math.max(leftParts.length, rightParts.length);

  for (let index = 0; index < length; index += 1) {
    const leftValue = leftParts[index] ?? 0;
    const rightValue = rightParts[index] ?? 0;
    if (leftValue !== rightValue) {
      return rightValue - leftValue;
    }
  }

  return 0;
}

let entriesPromise: Promise<ChangelogEntry[]> | undefined;

function readAllEntriesFromDisk(): Promise<ChangelogEntry[]> {
  entriesPromise ??= (async () => {
    const dirEntries = await fs.readdir(CHANGELOG_DIRECTORY, {
      withFileTypes: true,
    });
    const mdxFiles = dirEntries
      .filter(
        (entry) =>
          entry.isFile() &&
          /\.mdx?$/.test(entry.name) &&
          !entry.name.startsWith("_"),
      )
      .map((entry) => entry.name);

    const entries = await Promise.all(
      mdxFiles.map(async (fileName) => {
        const filePath = path.join(CHANGELOG_DIRECTORY, fileName);
        const source = await fs.readFile(filePath, "utf8");
        const { content, data } = matter(source);
        const frontmatter = parseFrontmatter(
          fileName,
          data as Record<string, unknown>,
        );

        return {
          slug: toSlug(fileName),
          content,
          ...frontmatter,
        } satisfies ChangelogEntry;
      }),
    );

    return entries.sort(compareEntries);
  })();

  return entriesPromise;
}

export async function getAllEntries(
  options: ChangelogQueryOptions = {},
): Promise<ChangelogEntrySummary[]> {
  const entries = await readAllEntriesFromDisk();
  const includeUnpublished = options.includeUnpublished ?? false;

  return entries
    .filter((entry) => includeUnpublished || entry.published)
    .map(({ content, ...entry }) => entry);
}

export async function getEntryByVersion(
  version: string,
  options: ChangelogQueryOptions = {},
): Promise<ChangelogEntry | null> {
  const entries = await readAllEntriesFromDisk();
  const includeUnpublished = options.includeUnpublished ?? false;
  const entry = entries.find((candidate) => candidate.version === version);

  if (!entry) {
    return null;
  }

  if (!includeUnpublished && !entry.published) {
    return null;
  }

  return entry;
}

/**
 * Resolve a URL segment to either the canonical entry or a redirect target.
 * Canonical hit: `/changelog/2.4` -> render. Covered patch: `/changelog/2.4.1`
 * -> redirect to `/changelog/2.4`. Unknown -> null (404).
 */
export async function resolveVersionParam(
  param: string,
  options: ChangelogQueryOptions = {},
): Promise<
  | { kind: "canonical"; entry: ChangelogEntry }
  | { kind: "redirect"; version: string }
  | null
> {
  const entries = await readAllEntriesFromDisk();
  const includeUnpublished = options.includeUnpublished ?? false;
  const visible = entries.filter(
    (entry) => includeUnpublished || entry.published,
  );

  const canonical = visible.find((entry) => entry.version === param);
  if (canonical) {
    return { kind: "canonical", entry: canonical };
  }

  const covering = visible.find((entry) =>
    entry.coversVersions.includes(param),
  );
  if (covering) {
    return { kind: "redirect", version: covering.version };
  }

  return null;
}

/**
 * Every URL segment the `[version]` route should statically generate: each
 * canonical entry plus every covered patch version (which renders a redirect).
 */
export async function getAllVersionParams(
  options: ChangelogQueryOptions = {},
): Promise<string[]> {
  const entries = await getAllEntries(options);
  const params = new Set<string>();

  for (const entry of entries) {
    params.add(entry.version);
    for (const covered of entry.coversVersions) {
      params.add(covered);
    }
  }

  return [...params];
}

const PRODUCTION_HOSTS = new Set(["nteract.io", "www.nteract.io"]);

/**
 * Whether draft entries (published: false) should be visible for a request.
 * Visible in local dev and anywhere that is not the production domain (so
 * Vercel preview deployments at *.vercel.app show the unseasoned backfill),
 * hidden on nteract.io. Gated on the request host rather than VERCEL_ENV,
 * which this project does not expose to app code.
 */
export function shouldShowDrafts(host?: string | null): boolean {
  if (process.env.NODE_ENV === "development") {
    return true;
  }
  if (!host) {
    return false;
  }
  return !PRODUCTION_HOSTS.has(host.split(":")[0].toLowerCase());
}

const dayFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** Single-day display, or the entry's `dateLabel` range when present. */
export function formatEntryDate(entry: {
  date: string;
  dateLabel?: string;
}): string {
  return entry.dateLabel ?? dayFormatter.format(new Date(entry.date));
}
