import type { Metadata } from "next";
import Link from "next/link";

import { BlogPostCard } from "@/components/blog/post-card";
import { getAllPosts } from "@/lib/blog";
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

  return (
    <div className="px-6 pb-24 pt-32 md:px-12">
      <section className="mx-auto max-w-4xl">
        {/* Back to home — peripheral */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-outline-variant transition-colors hover:text-on-surface"
        >
          <span aria-hidden="true">←</span>
          nteract
        </Link>

        <div className="mb-24 mt-16">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-secondary">
              Local-first writing
            </span>
            <div className="h-px flex-grow bg-outline-variant/20" />
          </div>

          <h1 className="mb-8 font-headline text-6xl font-bold leading-[0.9] tracking-tighter text-on-surface md:text-8xl">
            Notes from the nteract team
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-on-surface/70">
            {siteConfig.blogDescription}
          </p>

          <div className="mt-8">
            <a
              href={siteConfig.links.rss}
              className="font-mono text-xs uppercase tracking-widest text-outline-variant transition-colors hover:text-tertiary"
            >
              Subscribe via RSS
            </a>
          </div>
        </div>

        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => <BlogPostCard key={post.slug} post={post} />)
          ) : (
            <div className="bg-surface-container-low px-6 py-10 text-on-surface-variant">
              The first post is still in draft. Check back soon.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
