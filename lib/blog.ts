import { promises as fs } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const BLOG_DIRECTORY = path.join(process.cwd(), "content/blog");

export type BlogPostFrontmatter = {
  title: string;
  description: string;
  date: string;
  published: boolean;
  tags: string[];
  coverImage?: string;
};

export type BlogPostSummary = BlogPostFrontmatter & {
  slug: string;
};

export type BlogPost = BlogPostSummary & {
  content: string;
};

type BlogQueryOptions = {
  includeUnpublished?: boolean;
};

function assertString(
  value: unknown,
  field: keyof BlogPostFrontmatter,
  fileName: string
) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Expected "${field}" to be a non-empty string in ${fileName}`);
  }

  return value.trim();
}

function normalizeDate(value: unknown, fileName: string) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  return assertString(value, "date", fileName);
}

function normalizeTags(value: unknown, fileName: string) {
  if (value == null) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((entry) => assertString(entry, "tags", fileName));
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  throw new Error(`Expected "tags" to be a string or string[] in ${fileName}`);
}

function parseFrontmatter(fileName: string, data: Record<string, unknown>) {
  const title = assertString(data.title, "title", fileName);
  const description = assertString(data.description, "description", fileName);
  const date = normalizeDate(data.date, fileName);
  const published = data.published === undefined ? true : Boolean(data.published);
  const tags = normalizeTags(data.tags, fileName);
  const coverImage =
    typeof data.coverImage === "string" && data.coverImage.trim().length > 0
      ? data.coverImage.trim()
      : undefined;

  return {
    title,
    description,
    date,
    published,
    tags,
    coverImage,
  } satisfies BlogPostFrontmatter;
}

function toSlug(fileName: string) {
  return fileName.replace(/\.mdx?$/, "");
}

function compareByDateDescending(left: BlogPostSummary, right: BlogPostSummary) {
  return new Date(right.date).getTime() - new Date(left.date).getTime();
}

let postsPromise: Promise<BlogPost[]> | undefined;

function readAllPostsFromDisk(): Promise<BlogPost[]> {
  postsPromise ??= (async () => {
    const entries = await fs.readdir(BLOG_DIRECTORY, { withFileTypes: true });
    const mdxFiles = entries
      .filter((entry) => entry.isFile() && /\.mdx?$/.test(entry.name))
      .map((entry) => entry.name);

    const posts = await Promise.all(
      mdxFiles.map(async (fileName) => {
        const filePath = path.join(BLOG_DIRECTORY, fileName);
        const source = await fs.readFile(filePath, "utf8");
        const { content, data } = matter(source);
        const frontmatter = parseFrontmatter(
          fileName,
          data as Record<string, unknown>
        );

        return {
          slug: toSlug(fileName),
          content,
          ...frontmatter,
        } satisfies BlogPost;
      })
    );

    return posts.sort(compareByDateDescending);
  })();

  return postsPromise;
}

export async function getAllPosts(
  options: BlogQueryOptions = {}
): Promise<BlogPostSummary[]> {
  const posts = await readAllPostsFromDisk();
  const includeUnpublished = options.includeUnpublished ?? false;

  return posts
    .filter((post) => includeUnpublished || post.published)
    .map(({ content, ...post }) => post);
}

export async function getAllSlugs(options: BlogQueryOptions = {}) {
  const posts = await getAllPosts(options);
  return posts.map((post) => post.slug);
}

export async function getPostBySlug(
  slug: string,
  options: BlogQueryOptions = {}
) {
  const posts = await readAllPostsFromDisk();
  const includeUnpublished = options.includeUnpublished ?? false;
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    return null;
  }

  if (!includeUnpublished && !post.published) {
    return null;
  }

  return post;
}

const postDateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function formatPostDate(value: string) {
  return postDateFormatter.format(new Date(value));
}
