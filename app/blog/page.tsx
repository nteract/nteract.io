import type { Metadata } from "next";
import Link from "next/link";

import { BlogPostCard } from "@/components/blog/post-card";
import { Container } from "@/components/site-shell";
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
    <Container className="py-16 sm:py-20">
      <section className="mx-auto max-w-3xl">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-gray-400">
            Local-first writing
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Notes from the nteract team
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {siteConfig.blogDescription}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <a
              href={siteConfig.links.rss}
              className="transition-colors hover:text-gray-900"
            >
              Subscribe via RSS
            </a>
            <Link href="/" className="transition-colors hover:text-gray-900">
              Back to downloads
            </Link>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => <BlogPostCard key={post.slug} post={post} />)
          ) : (
            <div className="rounded-2xl border border-dashed border-black/10 bg-gray-50 px-6 py-10 text-gray-500">
              The first post is still in draft. Check back soon.
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}
