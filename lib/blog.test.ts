// @vitest-environment node

import { describe, expect, it } from "vitest";

import { getAllPosts, getAllSlugs, getPostBySlug } from "@/lib/blog";

describe("blog content utilities", () => {
  it("returns published posts in reverse chronological order by default", async () => {
    const posts = await getAllPosts();

    expect(posts.map((post) => post.slug)).toEqual([
      "welcome-to-the-new-nteract-blog",
    ]);
    expect(posts.every((post) => post.published)).toBe(true);
  });

  it("can include unpublished posts when requested", async () => {
    const posts = await getAllPosts({ includeUnpublished: true });
    const slugs = await getAllSlugs({ includeUnpublished: true });
    const draft = await getPostBySlug("draft-agent-ready-notebooks", {
      includeUnpublished: true,
    });

    expect(posts).toHaveLength(2);
    expect(slugs).toContain("welcome-to-the-new-nteract-blog");
    expect(slugs).toContain("draft-agent-ready-notebooks");
    expect(draft?.published).toBe(false);
  });

  it("hides unpublished posts from default lookups", async () => {
    const draft = await getPostBySlug("draft-agent-ready-notebooks");

    expect(draft).toBeNull();
  });
});
