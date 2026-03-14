import { Logo } from "@/components/logo";
import { DownloadButtons } from "@/components/home/download-buttons";
import { Container } from "@/components/site-shell";
import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <Container className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Logo className="mx-auto mb-8 h-32 w-32 sm:h-40 sm:w-40" />

        <p className="mb-2 text-sm uppercase tracking-[0.35em] text-gray-400">
          Native interactive notebooks
        </p>
        <h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          {siteConfig.name}
        </h1>
        <p className="mx-auto mb-8 max-w-md text-base text-gray-500 sm:text-lg">
          Fast to launch. Agent ready. Humans welcome.
        </p>

        <DownloadButtons />

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <a
            href={siteConfig.links.github}
            className="transition-colors hover:text-gray-900"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <a
            href={siteConfig.links.releases}
            className="transition-colors hover:text-gray-900"
            rel="noreferrer"
            target="_blank"
          >
            All Releases
          </a>
        </div>
      </div>
    </Container>
  );
}
