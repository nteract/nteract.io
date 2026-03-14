import Link from "next/link";

import { BlogTagList } from "@/components/blog/tag-list";
import { formatPostDate, type BlogPostSummary } from "@/lib/blog";

type BlogPostCardProps = {
  post: BlogPostSummary;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 pl-8 transition-all hover:-translate-y-0.5 hover:bg-white/[0.08]">
      {/* Purple ribbon accent on hover */}
      <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-purple-500/0 transition-all group-hover:bg-purple-500" />

      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        {post.tags.length > 0 ? (
          <span className="h-1 w-1 rounded-full bg-neutral-600" aria-hidden="true" />
        ) : null}
        <BlogTagList tags={post.tags} />
      </div>

      <h2 className="text-2xl font-semibold tracking-tight text-white">
        <Link
          href={`/blog/${post.slug}`}
          className="transition-colors group-hover:text-purple-400"
        >
          {post.title}
        </Link>
      </h2>

      <p className="mt-3 text-base leading-7 text-neutral-400">
        {post.description}
      </p>
    </article>
  );
}
