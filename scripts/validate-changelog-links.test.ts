// @vitest-environment node

import { describe, expect, it } from "vitest";

import {
  extractDetailsBlocks,
  extractTechnicalChangelogLinks,
  getTechnicalChangelogConfig,
  parseCompareLinkHeader,
  parseFrontmatter,
  resolveCommitInRange,
} from "./validate-changelog-links.mjs";

describe("technical changelog link validation helpers", () => {
  it("reads technical changelog metadata from frontmatter", () => {
    const parsed = parseFrontmatter(`---
technicalChangelog:
  repo: nteract/nteract
  baseTag: v2.5.1-stable.202605261941
  releaseTag: v2.6.0-stable.202606251403
---

Body
`);

    expect(getTechnicalChangelogConfig(parsed.data, "2.6.mdx")).toEqual({
      repo: "nteract/nteract",
      baseTag: "v2.5.1-stable.202605261941",
      releaseTag: "v2.6.0-stable.202606251403",
    });
  });

  it("extracts GitHub commit and PR links only from details blocks", () => {
    const content = `
Outside details ([bad](https://github.com/nteract/nteract/commit/deadbeef)).

<details>
<summary>Selected commits</summary>

- add contextual outline tree ([db4b61a](https://github.com/nteract/nteract/commit/db4b61ac))
- character-granular comments ([#3791](https://github.com/nteract/nteract/pull/3791))
- unrelated repo ([abc1234](https://github.com/example/example/commit/abc1234))

</details>
`;

    expect(extractDetailsBlocks(content)).toHaveLength(1);
    expect(
      extractTechnicalChangelogLinks(content, "nteract/nteract"),
    ).toMatchObject([
      { kind: "commit", target: "db4b61ac", line: 7 },
      { kind: "pull", target: "3791", line: 8 },
    ]);
  });

  it("parses GitHub pagination links", () => {
    expect(
      parseCompareLinkHeader(
        '<https://api.github.com/page/2>; rel="next", <https://api.github.com/page/10>; rel="last"',
      ),
    ).toEqual({
      next: "https://api.github.com/page/2",
      last: "https://api.github.com/page/10",
    });
  });

  it("resolves short commit hashes against the range set", () => {
    const shas = [
      "db4b61ac11111111111111111111111111111111",
      "db4b61af22222222222222222222222222222222",
      "f07b528633333333333333333333333333333333",
    ];

    expect(resolveCommitInRange("f07b5286", shas)).toEqual({
      status: "in-range",
      sha: "f07b528633333333333333333333333333333333",
    });
    expect(resolveCommitInRange("db4b61a", shas)).toEqual({
      status: "ambiguous",
      matches: [
        "db4b61ac11111111111111111111111111111111",
        "db4b61af22222222222222222222222222222222",
      ],
    });
    expect(resolveCommitInRange("fffffff", shas)).toEqual({
      status: "out-of-range",
    });
  });
});
