import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ProseProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "div";
};

export function Prose({
  as: Component = "article",
  className,
  ...props
}: ProseProps) {
  return <Component className={cn("nteract-prose", className)} {...props} />;
}
