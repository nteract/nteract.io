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

export type SiteNavKey = "install" | "agents" | "blog" | "changelog";

const navLinks = [
  { key: "install", href: "/install", label: "Install" },
  { key: "agents", href: "/agents", label: "Agents" },
  { key: "blog", href: "/blog", label: "Blog" },
  { key: "changelog", href: "/changelog", label: "Changelog" },
  { key: "github", href: siteConfig.links.github, label: "GitHub", external: true },
] as const;

interface SiteHeaderProps {
  /** Which nav item the current page lives under. */
  active?: SiteNavKey;
}

/**
 * Mono Ledger header: mono wordmark, a hairline rule, and mono uppercase nav.
 * The active page carries a 2px underline. Colors route through the Elements
 * tokens, so the same header works on the light and Ink surfaces. The logo
 * mark keeps its black strokes on both — the pastel quadrants carry the
 * contrast, and white strokes turn to mush at 22px.
 */
export function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex min-h-[52px] w-full max-w-5xl flex-wrap items-center gap-x-6 gap-y-1 px-5 py-2 sm:flex-nowrap sm:px-7 sm:py-0">
        <Link href="/" className="flex shrink-0 items-center gap-[9px]">
          <Logo className="h-[22px] w-[22px]" />
          <span className="font-mono text-[13px] font-semibold tracking-[0.04em] text-foreground">
            nteract
          </span>
        </Link>
        <div className="hidden h-px flex-grow bg-border sm:block" />
        <nav className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.14em] sm:gap-[22px]">
          {navLinks.map((link) => {
            const isActive = "key" in link && link.key === active;
            const className = cn(
              "transition-colors",
              isActive
                ? "text-foreground underline decoration-2 underline-offset-[6px]"
                : "text-muted-foreground hover:text-foreground",
            );

            if ("external" in link && link.external) {
              return (
                <a
                  key={link.key}
                  href={link.href}
                  className={className}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              );
            }

            return (
              <Link key={link.key} href={link.href} className={className}>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-8 py-10 text-sm text-muted-foreground sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-md space-y-2">
          <p className="italic">{siteConfig.quote.body}</p>
          <p className="text-xs">— {siteConfig.quote.author}</p>
        </div>

        <div className="space-y-3 sm:text-right">
          <div className="flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.14em] sm:justify-end">
            <Link href="/agents" className="transition-colors hover:text-foreground">
              Agents
            </Link>
            <Link
              href="/changelog"
              className="transition-colors hover:text-foreground"
            >
              Changelog
            </Link>
            <Link href="/blog" className="transition-colors hover:text-foreground">
              Blog
            </Link>
            <Link
              href="/telemetry"
              className="transition-colors hover:text-foreground"
            >
              Telemetry
            </Link>
            <a
              href={siteConfig.links.rss}
              className="transition-colors hover:text-foreground"
            >
              RSS
            </a>
            <a
              href={siteConfig.links.github}
              className="transition-colors hover:text-foreground"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em]">
            Native interactive notebooks for humans and agents.
          </p>
        </div>
      </Container>
    </footer>
  );
}
