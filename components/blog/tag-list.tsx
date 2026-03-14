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
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li key={tag}>
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-neutral-400">
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}
