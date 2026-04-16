// @vitest-environment node

import { describe, expect, it } from "vitest";

import { getAllPosts, getAllSlugs, getPostBySlug } from "@/lib/blog";

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
});
