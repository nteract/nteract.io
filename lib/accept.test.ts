import { describe, expect, it } from "vitest";

import { prefersMarkdown } from "@/lib/accept";

describe("prefersMarkdown", () => {
  it("returns true for the WebFetch Accept header", () => {
    expect(prefersMarkdown("text/markdown, text/html, */*")).toBe(true);
  });

  it("returns false for a typical Chrome Accept header", () => {
    expect(
      prefersMarkdown(
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      ),
    ).toBe(false);
  });

  it("returns false for the curl default", () => {
    expect(prefersMarkdown("*/*")).toBe(false);
  });

  it("respects q values when markdown q exceeds html q", () => {
    expect(prefersMarkdown("text/html;q=0.5, text/markdown;q=0.9")).toBe(true);
  });

  it("breaks ties in favor of markdown when both are listed without q", () => {
    expect(prefersMarkdown("text/html, text/markdown")).toBe(true);
  });

  it("returns false for null", () => {
    expect(prefersMarkdown(null)).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(prefersMarkdown("")).toBe(false);
  });

  it("returns false when only html is listed", () => {
    expect(prefersMarkdown("text/html")).toBe(false);
  });

  it("ignores extra parameters and whitespace", () => {
    expect(
      prefersMarkdown("  text/markdown ;  q=0.95  , text/html ; q=0.5 "),
    ).toBe(true);
  });
});
