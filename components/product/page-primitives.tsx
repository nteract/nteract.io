import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Eyebrow label for product pages (install, agents, docs). One convention
 * so the product pages stop drifting between tracking-widest, tracking-[0.25em],
 * and tracking-[0.3em]. Uses teal-600 as the text accent (readable on the
 * bg-gray-50 product surface); the --accent token stays for fills.
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
        "text-sm font-semibold uppercase tracking-[0.3em] text-teal-600",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * Centered hero block for product pages: eyebrow + h1 + subtitle. Install
 * and agents share this exact shape; home can adopt it too.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <ProductEyebrow className="mb-4">{eyebrow}</ProductEyebrow>
      <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-6xl">
        {title}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
        {subtitle}
      </p>
    </div>
  );
}

/**
 * Numbered step card for install/agents flows: eyebrow (usually "01", "02"...)
 * + title + body. The rounded-3xl white card on the gray-50 product surface.
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
    <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-teal-600">
        {eyebrow}
      </p>
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-950">
        {title}
      </h2>
      <div className="space-y-4 text-[16px] leading-7 text-gray-700">
        {children}
      </div>
    </section>
  );
}

/**
 * Dark command block for shell commands. Slate-950 bg, slate-100 text.
 */
export function CommandBlock({ commands }: { commands: string[] }) {
  return (
    <pre className="overflow-x-auto rounded-2xl border border-black/10 bg-slate-950 px-5 py-4 text-sm leading-7 text-slate-100 shadow-sm">
      <code>{commands.join("\n")}</code>
    </pre>
  );
}

/**
 * Inline code chip for command names and file paths in body copy.
 */
export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-gray-100 px-1 py-0.5">{children}</code>
  );
}
