import { getAllPosts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const revalidate = 300;

async function getStableVersion(): Promise<string | null> {
  try {
    const res = await fetch(siteConfig.stableManifestUrl, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const manifest = await res.json();
    return manifest.version ?? null;
  } catch {
    return null;
  }
}

export async function GET() {
  const [posts, version] = await Promise.all([
    getAllPosts(),
    getStableVersion(),
  ]);

  const downloadsLine = version
    ? `- [Latest releases](${siteConfig.links.releases}) for macOS, Windows, and Linux. Current stable: v${version}.`
    : `- [Latest releases](${siteConfig.links.releases}) for macOS, Windows, and Linux.`;

  const lines = [
    `# ${siteConfig.name}`,
    "",
    "> Native interactive notebooks. Fast to launch, agent ready, humans welcome.",
    "",
    "nteract is a desktop notebook app for macOS, Windows, and Linux. Open a `.ipynb` file, a kernel starts, you're running code. No browser, no server to manage.",
    "",
    "## Downloads",
    "",
    downloadsLine,
    `- [Source on GitHub](${siteConfig.links.github})`,
    `- [Telemetry policy](${siteConfig.url}/telemetry): what nteract sends, what it never sends, and how to opt out.`,
    "",
    "## Blog",
    "",
    ...posts.map(
      (post) =>
        `- [${post.title}](${absoluteUrl(`/blog/${post.slug}/raw.md`)}): ${post.description}`,
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
