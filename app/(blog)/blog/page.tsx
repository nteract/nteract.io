import type { Metadata } from "next";
import Link from "next/link";

import { BlogPostCard } from "@/components/blog/post-card";
import { BlogTagList } from "@/components/blog/tag-list";
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
    <div className="px-6 pb-24 pt-12 md:px-12">
      <section className="mx-auto max-w-4xl">
        {latest ? (
          <>
            <div className="mb-6 flex items-center gap-4">
              <Link
                href="/"
                className="font-mono text-[11px] uppercase tracking-widest text-[#a993d1] transition-colors hover:text-on-surface"
              >
                ← Home
              </Link>
              <div className="h-px flex-grow bg-outline-variant/20" />
              <time
                dateTime={latest.date}
                className="font-mono text-xs uppercase tracking-widest text-secondary"
              >
                {formatPostDate(latest.date)}
              </time>
              <div className="h-px w-4 bg-outline-variant/20" />
              <a
                href={siteConfig.links.rss}
                className="font-mono text-[11px] uppercase tracking-widest text-outline-variant transition-colors hover:text-on-surface"
              >
                RSS
              </a>
            </div>

            <Link href={`/blog/${latest.slug}`} className="group block">
              <h1
                className={`mb-6 font-headline font-bold leading-[0.9] tracking-tighter text-on-surface transition-colors group-hover:text-secondary ${latest.coverVideo || latest.coverImage ? "text-6xl md:text-8xl" : "text-4xl md:text-5xl"}`}
              >
                {latest.title}
              </h1>

              {(() => {
                const dot = latest.description.indexOf(".");
                if (dot === -1) {
                  return (
                    <p className="mb-6 max-w-2xl text-xl leading-snug text-on-surface/60">
                      {latest.description}
                    </p>
                  );
                }
                const lead = latest.description.slice(0, dot + 1);
                const rest2 = latest.description.slice(dot + 1).trim();
                return (
                  <div className="mb-6 max-w-2xl space-y-2">
                    <p
                      className={`font-headline font-semibold tracking-tight text-on-surface/80 ${latest.coverVideo || latest.coverImage ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}
                    >
                      {lead}
                    </p>
                    {rest2 && (
                      <p className="font-mono text-xs uppercase tracking-[0.25em] text-on-surface-variant">
                        {rest2}
                      </p>
                    )}
                  </div>
                );
              })()}

              <div className="flex flex-wrap items-center gap-6">
                <BlogTagList tags={latest.tags} />
                <span className="font-mono text-[11px] uppercase tracking-widest text-secondary transition-colors group-hover:text-on-surface">
                  Read the post →
                </span>
              </div>
            </Link>

            {/* Hero preview — driven by coverVideo / coverImage frontmatter */}
            {latest.coverVideo ? (
              <Link
                href={`/blog/${latest.slug}`}
                className="mt-10 block overflow-hidden"
              >
                <video
                  src={latest.coverVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full"
                />
              </Link>
            ) : latest.coverImage ? (
              <Link
                href={`/blog/${latest.slug}`}
                className="mt-10 block overflow-hidden"
              >
                <img
                  src={latest.coverImage}
                  alt={latest.title}
                  className="w-full"
                />
              </Link>
            ) : null}
          </>
        ) : (
          <div className="bg-surface-container-low px-6 py-10 text-on-surface-variant">
            The first post is still in draft. Check back soon.
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-16 space-y-4">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-outline-variant">
                Older posts
              </span>
              <div className="h-px flex-grow bg-outline-variant/20" />
            </div>
            {rest.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
