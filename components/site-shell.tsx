import Link from "next/link";
import type { HTMLAttributes } from "react";

import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: siteConfig.links.github, label: "GitHub", external: true },
  { href: siteConfig.links.releases, label: "Releases", external: true },
] as const;

function SiteNavLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    "text-sm font-medium text-gray-500 transition-colors hover:text-gray-900";

  if (external) {
    return (
      <a
        href={href}
        className={className}
        rel="noreferrer"
        target="_blank"
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-black/5 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-gray-900 transition-opacity hover:opacity-80"
        >
          <Logo className="h-9 w-9" />
          <span className="text-base font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          {navLinks.map((link) => (
            <SiteNavLink key={link.href} {...link} />
          ))}
        </nav>
      </Container>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-gray-50/80">
      <Container className="flex flex-col gap-8 py-10 text-sm text-gray-500 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-md space-y-2">
          <p className="italic text-gray-400">{siteConfig.quote.body}</p>
          <p className="text-xs text-gray-400">— {siteConfig.quote.author}</p>
        </div>

        <div className="space-y-2 sm:text-right">
          <div className="flex flex-wrap gap-4 sm:justify-end">
            <Link href="/blog" className="transition-colors hover:text-gray-900">
              Blog
            </Link>
            <a
              href={siteConfig.links.rss}
              className="transition-colors hover:text-gray-900"
            >
              RSS
            </a>
            <a
              href={siteConfig.links.github}
              className="transition-colors hover:text-gray-900"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </div>
          <p className="text-xs text-gray-400">
            Native interactive notebooks for humans and agents.
          </p>
        </div>
      </Container>
    </footer>
  );
}
