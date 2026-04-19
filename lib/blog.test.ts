// @vitest-environment node

import { describe, expect, it } from "vitest";

import { formatPostAsMarkdown, getAllPosts, getAllSlugs, getPostBySlug } from "@/lib/blog";

describe("blog content utilities", () => {
  it("returns published posts in reverse chronological order by default", async () => {
    const posts = await getAllPosts();

    expect(posts.map((post) => post.slug)).toEqual(["security", "nteract-2.0"]);
    expect(posts.every((post) => post.published)).toBe(true);
  });

  it("can include unpublished posts when requested", async () => {
    const posts = await getAllPosts({ includeUnpublished: true });
    const slugs = await getAllSlugs({ includeUnpublished: true });

    expect(slugs).toContain("nteract-2.0");
  });

  it("hides unpublished posts from default lookups", async () => {
    const post = await getPostBySlug("nteract-2.0");

    expect(post).not.toBeNull();
    expect(post?.published).toBe(true);
  });

  it("formats a post as markdown with title, blockquote, metadata, link, and body", async () => {
    const post = await getPostBySlug("security");
    expect(post).not.toBeNull();

    const md = formatPostAsMarkdown(post!);

    expect(md.startsWith("# Securing Notebooks\n")).toBe(true);
    expect(md).toContain("> Remote Code Execution is the Feature. Lock it down.");
    expect(md).toMatch(/\*Published April 7, 2026 \u00b7 tags: security, architecture\*/);
    expect(md).toContain("[Original post](https://nteract.io/blog/security)");
    expect(md).toContain("\n---\n");
    expect(md).toContain(post!.content.trim());
  });

  it("omits the tags segment when a post has no tags", async () => {
    const post = await getPostBySlug("security");
    expect(post).not.toBeNull();

    const md = formatPostAsMarkdown({ ...post!, tags: [] });

    expect(md).toMatch(/\*Published April 7, 2026\*/);
    expect(md).not.toContain("tags:");
  });
});
