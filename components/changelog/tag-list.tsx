import { cn } from "@/lib/utils";

type ChangelogTagListProps = {
  tags: string[];
  className?: string;
};

/** Outlined cream-theme tags (the dark blog uses filled chips instead). */
export function ChangelogTagList({ tags, className }: ChangelogTagListProps) {
  if (!tags.length) {
    return null;
  }

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li key={tag}>
          <span className="inline-flex items-center border border-[var(--rule)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}
