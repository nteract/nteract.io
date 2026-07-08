import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogAuthorByline } from "@/components/blog/author-byline";
import { BlogTagList } from "@/components/blog/tag-list";
import { Prose } from "@/components/prose";
import { formatAuthorNames } from "@/lib/authors";
import { formatPostDate, getAllSlugs, getPostBySlug } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const isDev = process.env.NODE_ENV === "development";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllSlugs({ includeUnpublished: isDev });
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, { includeUnpublished: isDev });

  if (!post) {
    return {};
  }

  const canonical = absoluteUrl(`/blog/${post.slug}`);
  const authorNames = formatAuthorNames(post.authors);
  const authors = post.authors.map((author) => ({
    name: author.name,
    url: author.url,
  }));

  return {
    title: post.title,
    description: post.description,
    authors: authors.length > 0 ? authors : undefined,
    creator: authorNames || undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: "article",
      publishedTime: post.date,
      authors: authorNames
        ? post.authors.map((author) => author.name)
        : undefined,
      tags: post.tags,
      images: [post.ogImage ?? absoluteUrl("/opengraph-image")],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.ogImage ?? absoluteUrl("/opengraph-image")],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, { includeUnpublished: isDev });

  if (!post) {
    notFound();
  }

  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <div className="mx-auto w-full max-w-[42.5rem] px-6 pb-16 pt-14 sm:px-10">
      <article>
        {/* Article Header */}
        <header className="mb-9">
          <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <Link
              href="/blog"
              className="text-foreground transition-colors hover:text-muted-foreground"
            >
              ← Blog
            </Link>
            <div className="h-px flex-grow bg-border" />
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {post.authors.length > 0 ? (
              <>
                <span aria-hidden="true">·</span>
                <BlogAuthorByline authors={post.authors} />
              </>
            ) : null}
          </div>

          <h1 className="mb-3 text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[40px]">
            {post.title}
          </h1>

          <p className="mb-6 text-lg leading-normal text-muted-foreground">
            {post.description}
          </p>

          <BlogTagList tags={post.tags} />
        </header>

        {/* Cover image */}
        {post.coverImage ? (
          <section className="mb-12">
            <div className="overflow-hidden rounded-lg border border-border">
              <img
                alt={post.title}
                className="block w-full"
                src={post.coverImage}
              />
            </div>
          </section>
        ) : null}

        {/* Body Prose */}
        <Prose>
          <Content />
        </Prose>

        {/* Post footer */}
        <div className="mt-14 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em]">
          <Link
            href="/blog"
            className="text-foreground transition-colors hover:text-muted-foreground"
          >
            ← All posts
          </Link>
          <div className="h-px flex-grow bg-border" />
        </div>
      </article>
    </div>
  );
}
