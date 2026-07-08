import { Fragment } from "react";

import type { BlogAuthor } from "@/lib/authors";

type BlogAuthorBylineProps = {
  authors: BlogAuthor[];
  className?: string;
};

/** Author names for the mono meta rows ("April 7, 2026 · Kyle Kelley"). */
export function BlogAuthorByline({
  authors,
  className,
}: BlogAuthorBylineProps) {
  if (authors.length === 0) {
    return null;
  }

  return (
    <span className={className}>
      {authors.map((author, index) => (
        <Fragment key={author.id}>
          {index > 0 ? (index === authors.length - 1 ? " and " : ", ") : null}
          <a
            href={author.url}
            className="transition-colors hover:text-foreground"
          >
            {author.name}
          </a>
        </Fragment>
      ))}
    </span>
  );
}
