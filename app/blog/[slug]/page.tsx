import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogTagList } from "@/components/blog/tag-list";
import { Prose } from "@/components/prose";
import { Container } from "@/components/site-shell";
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
    <Container className="py-16 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          <span aria-hidden="true">←</span>
          Back to blog
        </Link>

        <header className="mt-8 border-b border-black/5 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            {post.description}
          </p>
          <BlogTagList tags={post.tags} className="mt-6" />
        </header>

        {post.coverImage ? (
          <img
            alt={post.title}
            className="mt-10 rounded-3xl border border-black/5 shadow-sm"
            src={post.coverImage}
          />
        ) : null}

        <Prose className="mt-10">
          <Content />
        </Prose>
      </article>
    </Container>
  );
}
