import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogTagList } from "@/components/blog/tag-list";
import { Prose } from "@/components/prose";
import { formatPostDate, getAllSlugs, getPostBySlug } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const canonical = absoluteUrl(`/blog/${post.slug}`);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      images: [absoluteUrl("/opengraph-image")],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <div className="px-6 pb-24 pt-12 md:px-12">
      <article className="mx-auto max-w-4xl">
        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6 flex items-center gap-4">
            <time
              dateTime={post.date}
              className="font-mono text-xs uppercase tracking-widest text-secondary"
            >
              {formatPostDate(post.date)}
            </time>
            <div className="h-px flex-grow bg-outline-variant/20" />
          </div>

          <h1 className="mb-6 font-headline text-6xl font-bold leading-[0.9] tracking-tighter text-on-surface md:text-8xl">
            {post.title}
          </h1>

          <p className="mb-6 max-w-2xl text-lg leading-relaxed text-on-surface/70">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <BlogTagList tags={post.tags} />
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-outline-variant transition-colors hover:text-on-surface"
            >
              <span aria-hidden="true">←</span>
              All posts
            </Link>
          </div>
        </header>

        {/* Cover image */}
        {post.coverImage ? (
          <section className="mb-16">
            <div className="aspect-video w-full overflow-hidden bg-surface-container-low">
              <img
                alt={post.title}
                className="h-full w-full object-cover"
                src={post.coverImage}
              />
            </div>
          </section>
        ) : null}

        {/* Body Prose */}
        <Prose className="prose-invert mx-auto max-w-2xl">
          <Content />
        </Prose>
      </article>
    </div>
  );
}
