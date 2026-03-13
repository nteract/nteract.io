import Link from "next/link";

import { BlogTagList } from "@/components/blog/tag-list";
import { formatPostDate, type BlogPostSummary } from "@/lib/blog";

type BlogPostCardProps = {
  post: BlogPostSummary;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-400">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        {post.tags.length > 0 ? (
          <span className="h-1 w-1 rounded-full bg-gray-300" aria-hidden="true" />
        ) : null}
        <BlogTagList tags={post.tags} />
      </div>

      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
        <Link
          href={`/blog/${post.slug}`}
          className="transition-colors group-hover:text-accent"
        >
          {post.title}
        </Link>
      </h2>

      <p className="mt-3 text-base leading-7 text-gray-600">
        {post.description}
      </p>
    </article>
  );
}
