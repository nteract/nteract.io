import type { ComponentPropsWithoutRef } from "react";

import Link from "next/link";
import type { MDXComponents } from "mdx/types";

import { cn } from "@/lib/utils";

function MdxLink({
  href = "",
  className,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const linkClassName = cn(
    "font-medium text-gray-900 underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent",
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
          "scroll-mt-24 text-3xl font-semibold tracking-tight text-gray-900",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "scroll-mt-24 text-2xl font-semibold tracking-tight text-gray-900",
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          "scroll-mt-24 text-xl font-semibold tracking-tight text-gray-900",
          className
        )}
        {...props}
      />
    ),
    img: ({ alt = "", className, ...props }) => (
      <img
        alt={alt}
        className={cn(
          "my-10 rounded-2xl border border-black/5 shadow-sm",
          className
        )}
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
          className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[0.9em] font-medium text-gray-900"
          {...props}
        />
      );
    },
    pre: ({ className, ...props }) => (
      <pre className={cn("overflow-x-auto", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "border-l-2 border-accent/50 pl-5 text-gray-600",
          className
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr className={cn("border-black/10", className)} {...props} />
    ),
    ...components,
  };
}
