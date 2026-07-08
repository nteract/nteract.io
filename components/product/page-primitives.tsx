import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Eyebrow label for product pages: the mono ledger label (11px uppercase,
 * wide tracking) shared with the site header and the blog/changelog meta rows.
 */
export function ProductEyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * Ledger hero for product pages: mono meta row (label · rule · detail), a big
 * tight headline, and a muted subtitle. The agents page and install share
 * this shape.
 */
export function PageHero({
  eyebrow,
  detail,
  title,
  subtitle,
}: {
  eyebrow: string;
  detail?: string;
  title: ReactNode;
  subtitle: ReactNode;
}) {
  return (
    <div>
      <div className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        <span>{eyebrow}</span>
        <div className="h-px flex-grow bg-border" />
        {detail ? <span>{detail}</span> : null}
      </div>
      <h1 className="mb-4 text-[40px] font-extrabold leading-[0.98] tracking-[-0.04em] text-foreground sm:text-[56px]">
        {title}
      </h1>
      <p className="mb-12 max-w-[600px] text-lg leading-[1.55] text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}

/**
 * Titled card for install/agents flows: mono eyebrow + title + body on the
 * bordered card surface.
 */
export function StepCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="mb-4 text-2xl font-bold tracking-[-0.02em] text-foreground">
        {title}
      </h2>
      <div className="space-y-4 text-[15.5px] leading-7 text-foreground">
        {children}
      </div>
    </section>
  );
}

/**
 * Dark command block for shell commands. Ink surface regardless of the page
 * theme, matching the design's install cards.
 */
export function CommandBlock({ commands }: { commands: string[] }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-[oklch(0.13_0_0)] p-4 font-mono text-[12.5px] leading-[1.8] text-[oklch(0.93_0_0)]">
      <code>{commands.join("\n")}</code>
    </pre>
  );
}

/**
 * Inline code chip for command names and file paths in body copy.
 */
export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-px font-mono text-[0.9em]">
      {children}
    </code>
  );
}
