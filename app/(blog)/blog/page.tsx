import type { Metadata } from "next";
import Link from "next/link";

import { BlogAuthorByline } from "@/components/blog/author-byline";
import { BlogPostCard } from "@/components/blog/post-card";
import { BlogTagList } from "@/components/blog/tag-list";
import { buttonVariants } from "@/components/ui/button-variants";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: siteConfig.blogDescription,
  alternates: {
    canonical: absoluteUrl("/blog"),
    types: {
      "application/rss+xml": absoluteUrl(siteConfig.links.rss),
    },
  },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: siteConfig.blogDescription,
    url: absoluteUrl("/blog"),
    type: "website",
    images: [absoluteUrl("/opengraph-image")],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${siteConfig.name}`,
    description: siteConfig.blogDescription,
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [latest, ...rest] = posts;

  return (
    <div className="mx-auto w-full max-w-[45rem] px-6 pb-16 pt-14 sm:px-10">
      {latest ? (
        <>
          <div className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>Blog</span>
            <div className="h-px flex-grow bg-border" />
            <time dateTime={latest.date}>{formatPostDate(latest.date)}</time>
            {latest.authors.length > 0 ? (
              <>
                <span aria-hidden="true">·</span>
                <BlogAuthorByline authors={latest.authors} />
              </>
            ) : null}
          </div>

          <Link href={`/blog/${latest.slug}`} className="block">
            <h1 className="mb-3.5 text-[34px] font-bold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-[44px]">
              {latest.title}
            </h1>
            <p className="mb-5 max-w-[560px] text-[19px] leading-[1.45] text-muted-foreground">
              {latest.description}
            </p>
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-2.5">
            <BlogTagList tags={latest.tags} />
            <div className="flex-grow" />
            <Link
              href={`/blog/${latest.slug}`}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Read the post
            </Link>
          </div>

          {/* Hero preview — driven by coverVideo / coverImage frontmatter */}
          {latest.coverVideo ? (
            <Link
              href={`/blog/${latest.slug}`}
              className="block overflow-hidden rounded-lg border border-border"
            >
              <video
                src={latest.coverVideo}
                autoPlay
                muted
                loop
                playsInline
                className="block w-full"
              />
            </Link>
          ) : latest.coverImage ? (
            <Link
              href={`/blog/${latest.slug}`}
              className="block overflow-hidden rounded-lg border border-border"
            >
              <img src={latest.coverImage} alt={latest.title} className="block w-full" />
            </Link>
          ) : null}
        </>
      ) : (
        <div className="rounded-lg border border-border bg-card px-6 py-10 text-muted-foreground">
          The first post is still in draft. Check back soon.
        </div>
      )}

      {rest.length > 0 && (
        <div className="mt-12 flex flex-col gap-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Older posts
          </div>
          {rest.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
