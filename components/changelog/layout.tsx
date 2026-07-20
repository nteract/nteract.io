import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ChangelogMainProps = HTMLAttributes<HTMLElement>;

export function ChangelogMain({ className, ...props }: ChangelogMainProps) {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-5xl flex-1 px-5 pb-[72px] pt-16 sm:px-7",
        className,
      )}
      {...props}
    />
  );
}

type ChangelogGridProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "div" | "header" | "section";
};

export function ChangelogGrid({
  as: Component = "div",
  className,
  ...props
}: ChangelogGridProps) {
  return (
    <Component
      className={cn(
        "md:grid md:grid-cols-[140px_1fr] md:gap-7",
        className,
      )}
      {...props}
    />
  );
}
