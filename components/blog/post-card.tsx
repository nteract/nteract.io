import Link from "next/link";

import { BlogTagList } from "@/components/blog/tag-list";
import { formatPostDate, type BlogPostSummary } from "@/lib/blog";

type BlogPostCardProps = {
  post: BlogPostSummary;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group relative bg-surface-container-low p-6 pl-8 transition-all hover:bg-surface-container">
      {/* Teal rail accent on hover */}
      <div className="absolute bottom-6 left-0 top-6 w-1 bg-transparent transition-all group-hover:bg-tertiary" />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <time
          dateTime={post.date}
          className="font-mono text-[11px] uppercase tracking-widest text-secondary"
        >
          {formatPostDate(post.date)}
        </time>
        {post.tags.length > 0 ? (
          <span
            className="h-1 w-1 bg-outline-variant"
            aria-hidden="true"
          />
        ) : null}
        <BlogTagList tags={post.tags} />
      </div>

      <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface">
        <Link
          href={`/blog/${post.slug}`}
          className="transition-colors group-hover:text-primary"
        >
          {post.title}
        </Link>
      </h2>

      <p className="mt-3 text-base leading-7 text-on-surface-variant">
        {post.description}
      </p>
    </article>
  );
}
