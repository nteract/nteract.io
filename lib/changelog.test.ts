// @vitest-environment node

import { describe, expect, it } from "vitest";

import {
  formatEntryDate,
  getAllEntries,
  getAllVersionParams,
  getEntryByVersion,
  resolveVersionParam,
} from "@/lib/changelog";

// Several tests need every entry regardless of publish state; opt in here.
const all = { includeUnpublished: true } as const;

describe("changelog content utilities", () => {
  it("orders entries newest-first by release date", async () => {
    const entries = await getAllEntries(all);

    expect(entries.map((entry) => entry.version)).toEqual([
      "2.6",
      "2.5",
      "2.4",
      "2.3",
      "2.2",
      "2.1",
    ]);
  });

  it("hides unpublished entries from default lookups", async () => {
    const everything = await getAllEntries(all);
    const published = await getAllEntries();

    // Default lookups only ever surface published entries.
    expect(published.every((entry) => entry.published)).toBe(true);

    const draft = everything.find((entry) => !entry.published);
    if (draft) {
      // A real draft exists: it is absent by default and unfetchable.
      expect(
        published.some((entry) => entry.version === draft.version),
      ).toBe(false);
      expect(await getEntryByVersion(draft.version)).toBeNull();
    } else {
      // Nothing is unpublished right now, so the default set is unfiltered.
      expect(published).toHaveLength(everything.length);
    }
  });

  it("redirects collapsed patch versions to the grouped 2.5 entry", async () => {
    expect(await resolveVersionParam("2.5.0", all)).toEqual({
      kind: "redirect",
      version: "2.5",
    });
    expect(await resolveVersionParam("2.5.1", all)).toEqual({
      kind: "redirect",
      version: "2.5",
    });
  });

  it("redirects a covered patch version to its canonical entry", async () => {
    const resolved = await resolveVersionParam("2.4.1", all);

    expect(resolved).toEqual({ kind: "redirect", version: "2.4" });
  });

  it("resolves a canonical version to its entry", async () => {
    const resolved = await resolveVersionParam("2.4", all);

    expect(resolved?.kind).toBe("canonical");
    expect(resolved?.kind === "canonical" && resolved.entry.version).toBe("2.4");
  });

  it("returns null for an unknown version", async () => {
    expect(await resolveVersionParam("9.9.9", all)).toBeNull();
  });

  it("generates static params for canonical and every covered version", async () => {
    const params = await getAllVersionParams(all);

    // Canonical grouped slug plus the patch versions it absorbs.
    expect(params).toContain("2.4");
    expect(params).toContain("2.4.0");
    expect(params).toContain("2.4.8");
    // Skipped patch numbers never existed, so they are not params.
    expect(params).not.toContain("2.4.3");
  });

  it("prefers an explicit dateLabel over the formatted date", () => {
    // An explicit label wins verbatim, multi-day ranges included.
    expect(
      formatEntryDate({
        date: "2026-05-02T00:00:00Z",
        dateLabel: "May 2–14, 2026",
      }),
    ).toBe("May 2–14, 2026");

    // Without a label, it falls back to a single UTC day.
    expect(formatEntryDate({ date: "2026-05-02T00:00:00Z" })).toBe(
      "May 2, 2026",
    );
  });
});
