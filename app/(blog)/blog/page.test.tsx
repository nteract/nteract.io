import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("@/lib/blog", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/blog")>();

  return {
    ...actual,
    getAllPosts: vi.fn(),
  };
});

import { getAllPosts } from "@/lib/blog";

import BlogPage from "./page";

describe("BlogPage", () => {
  it("renders the latest post as hero", async () => {
    vi.mocked(getAllPosts).mockResolvedValue([
      {
        slug: "shipping-a-local-first-blog",
        title: "Shipping a local-first blog",
        description: "A lightweight MDX workflow.",
        date: "2026-03-10",
        published: true,
        tags: ["MDX"],
      },
    ]);

    render(await BlogPage());

    expect(
      screen.getByRole("heading", { name: "Shipping a local-first blog" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Shipping a local-first blog/ })
    ).toHaveAttribute("href", "/blog/shipping-a-local-first-blog");
    expect(screen.getByText("RSS")).toBeInTheDocument();
    expect(screen.getByText("Read the post →")).toBeInTheDocument();
  });

  it("shows the empty state when no posts are published", async () => {
    vi.mocked(getAllPosts).mockResolvedValue([]);

    render(await BlogPage());

    expect(
      screen.getByText("The first post is still in draft. Check back soon.")
    ).toBeInTheDocument();
  });
});
