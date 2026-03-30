import { getAllPosts } from "@/lib/blog";

export default async function OGPreviewPage() {
  const posts = await getAllPosts();

  const pages = [
    { label: "Home", src: "/opengraph-image" },
    { label: "Nightly", src: "/nightly/opengraph-image-1iuth5" },
    ...posts.map((post) => ({
      label: post.title,
      src: `/api/og?slug=${post.slug}`,
    })),
  ];

  return (
    <div className="px-6 pb-24 pt-12 md:px-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 font-headline text-3xl font-bold text-on-surface">
          OG Image Preview
        </h1>
        <p className="mb-12 text-sm text-on-surface-variant">
          1200 x 630 — how they look when shared on social media.
        </p>

        <div className="space-y-16">
          {pages.map((page) => (
            <div key={page.src}>
              <div className="mb-3 flex items-center gap-4">
                <span className="font-headline text-sm font-semibold text-on-surface">
                  {page.label}
                </span>
                <div className="h-px flex-grow bg-outline-variant/20" />
                <a
                  href={page.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-widest text-outline-variant transition-colors hover:text-on-surface"
                >
                  Open →
                </a>
              </div>
              <div className="overflow-hidden rounded-lg border border-outline-variant/20">
                <img
                  src={page.src}
                  alt={`OG image for ${page.label}`}
                  className="block w-full"
                  style={{ aspectRatio: "1200 / 630" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
