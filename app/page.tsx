import Link from "next/link";

import { Logo } from "@/components/logo";
import { DownloadButtons } from "@/components/home/download-buttons";
import { siteConfig } from "@/lib/site";

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

export default async function Home() {
  const version = await getStableVersion();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <Link
          href="/changelog"
          className="group mb-10 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-1.5 pr-4 text-sm shadow-sm transition hover:border-gray-300 hover:shadow"
        >
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-white">
            New
          </span>
          <span className="font-medium text-gray-700 transition-colors group-hover:text-gray-900">
            nteract 2.5 is out
          </span>
          <span className="text-gray-400 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>

        <Logo className="w-40 h-40 mx-auto mb-8" />

        <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
          Native interactive notebooks
        </p>
        <h1 className="text-5xl font-bold text-gray-900 mb-3">
          {siteConfig.name}
        </h1>
        <p className="text-base text-gray-500 mb-8 max-w-md mx-auto">
          Fast to launch. Agent ready. Humans welcome.
        </p>

        <DownloadButtons version={version} />

        <div className="mt-12">
          <Link
            href="/agents"
            className="group inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            <span className="text-base">🤖</span>
            <span>
              <span className="font-medium text-gray-700 group-hover:text-gray-900">
                Using agents?
              </span>{" "}
              Install the plugins
            </span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

      </div>

      <footer className="mt-24 pb-8 text-center">
        <div className="flex items-center justify-center gap-6 text-sm text-gray-400 mb-8">
          <Link
            href="/blog"
            className="hover:text-gray-600 transition-colors"
          >
            Blog
          </Link>
          <a
            href={siteConfig.links.github}
            className="hover:text-gray-600 transition-colors"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </div>
        <p className="text-sm text-gray-400 italic max-w-md mx-auto">
          "The purpose of computing is insight, not numbers."
        </p>
        <p className="text-xs text-gray-400 mt-1">— Richard Hamming</p>
      </footer>
    </main>
  );
}
