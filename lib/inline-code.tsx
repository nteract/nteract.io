import { Fragment, type ReactNode } from "react";

/**
 * Render a plain string with `backtick`-quoted spans as inline <code>.
 *
 * Used for the telemetry data tables where descriptions and gate triggers
 * contain literal identifiers ({@literal `app`}, {@literal `RUNTIMED_DEV=1`},
 * etc.) that should render as code in HTML but stay as literal backticks in
 * the Markdown sibling.
 */
export function renderInlineCode(text: string): ReactNode {
  const parts = text.split(/(`[^`]+`)/);
  return (
    <>
      {parts.map((part, i) => {
        if (part.length > 1 && part.startsWith("`") && part.endsWith("`")) {
          return <code key={i}>{part.slice(1, -1)}</code>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
