import { Fragment } from "react";

import type { BlogAuthor } from "@/lib/authors";

type BlogAuthorBylineProps = {
  authors: BlogAuthor[];
  className?: string;
};

export function BlogAuthorByline({
  authors,
  className = "font-mono text-xs text-secondary",
}: BlogAuthorBylineProps) {
  if (authors.length === 0) {
    return null;
  }

  return (
    <span className={className}>
      By{" "}
      {authors.map((author, index) => (
        <Fragment key={author.id}>
          {index > 0 ? (index === authors.length - 1 ? " and " : ", ") : null}
          <a
            href={author.url}
            className="transition-colors hover:text-on-surface"
          >
            {author.name}
          </a>
        </Fragment>
      ))}
    </span>
  );
}
