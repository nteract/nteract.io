import type { ComponentPropsWithoutRef } from "react";

import Link from "next/link";
import type { MDXComponents } from "mdx/types";

import { BlogCTA } from "@/components/blog/cta";
import { EnvPicker } from "@/components/blog/env-picker";
import { Kbd } from "@/components/kbd";
import { LightboxImage } from "@/components/blog/lightbox-image";
import { Peekaboo } from "@/components/blog/peekaboo";
import { cn } from "@/lib/utils";

function MdxLink({
  href = "",
  className,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const linkClassName = cn(
    "font-medium underline underline-offset-4 transition-colors",
    className
  );

  if (href.startsWith("/")) {
    return <Link href={href} className={linkClassName} {...props} />;
  }

  if (href.startsWith("#")) {
    return <a href={href} className={linkClassName} {...props} />;
  }

  if (!href.startsWith("http")) {
    return <a href={href} className={linkClassName} {...props} />;
  }

  return (
    <a
      href={href}
      className={linkClassName}
      rel="noreferrer"
      target="_blank"
      {...props}
    />
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: MdxLink,
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "scroll-mt-24 font-headline text-3xl font-bold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "scroll-mt-24 font-headline text-2xl font-bold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          "scroll-mt-24 font-headline text-xl font-bold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    img: ({ alt = "", className, ...props }) => (
      <img
        alt={alt}
        className={cn("my-10", className)}
        loading="lazy"
        {...props}
      />
    ),
    code: ({ className, ...props }) => {
      if (className) {
        return <code className={className} {...props} />;
      }

      return (
        <code
          className="px-1.5 py-0.5 text-[0.9em] font-medium font-mono"
          {...props}
        />
      );
    },
    pre: ({ className, ...props }) => (
      <pre className={cn("overflow-x-auto", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote className={cn("pl-5", className)} {...props} />
    ),
    hr: ({ className, ...props }) => (
      <hr className={cn("border-outline-variant/20", className)} {...props} />
    ),
    BlogCTA,
    EnvPicker,
    Kbd,
    LightboxImage,
    Peekaboo,
    ...components,
  };
}
