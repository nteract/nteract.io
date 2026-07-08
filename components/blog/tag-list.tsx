import { cn } from "@/lib/utils";

type BlogTagListProps = {
  tags: string[];
  className?: string;
};

export function BlogTagList({ tags, className }: BlogTagListProps) {
  if (!tags.length) {
    return null;
  }

  return (
    <ul className={cn("flex flex-wrap gap-2.5", className)}>
      {tags.map((tag) => (
        <li key={tag}>
          <span className="inline-flex items-center bg-muted px-3 py-1 font-mono text-[11px] uppercase tracking-[0.05em] text-muted-foreground">
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}
