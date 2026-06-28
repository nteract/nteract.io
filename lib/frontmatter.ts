import grayMatter from "gray-matter";
import yaml from "js-yaml";

// gray-matter's bundled YAML engine calls js-yaml 3's `safeLoad`, which js-yaml 4
// removed. We pin gray-matter's js-yaml to >=4.2.0 (the DoS-patched line) via a
// pnpm override and hand it a js-yaml 4 parser here. js-yaml 4 `load` is the
// safe-by-default equivalent of 3's `safeLoad`, so frontmatter parsing is unchanged.
const engines = {
  yaml: {
    parse: (input: string) => yaml.load(input) as object,
    stringify: (data: object) => yaml.dump(data),
  },
};

/** Drop-in replacement for `gray-matter`'s default export, on the js-yaml 4 engine. */
export function matter(source: string | Buffer) {
  return grayMatter(source, { engines });
}
