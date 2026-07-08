import Link from "next/link";

import { NotebookCompositionTicks } from "@/components/elements/notebook-composition-ticks";
import { formatPostDate, type BlogPostSummary } from "@/lib/blog";

type BlogPostCardProps = {
  post: BlogPostSummary;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-5 px-[22px] transition-colors hover:border-ring"
    >
      <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <NotebookCompositionTicks
          composition={post.composition}
          className="w-[60px]"
        />
      </div>
      <span className="text-lg font-semibold tracking-[-0.01em] text-foreground">
        {post.title}
      </span>
      <span className="text-[15px] leading-[1.55] text-muted-foreground">
        {post.description}
      </span>
    </Link>
  );
}
