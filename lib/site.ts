export const siteConfig = {
  name: "nteract",
  url: "https://nteract.io",
  description:
    "native interactive notebooks — fast to launch, agent ready, humans welcome.",
  blogDescription:
    "Product notes, technical writing, and release stories from the nteract team.",
  stableManifestUrl:
    "https://github.com/nteract/nteract/releases/download/stable-latest/latest.json",
  links: {
    github: "https://github.com/nteract/nteract",
    releases: "https://github.com/nteract/nteract/releases",
    rss: "/feed.xml",
  },
  quote: {
    body: '"The purpose of computing is insight, not numbers."',
    author: "Richard Hamming",
  },
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
