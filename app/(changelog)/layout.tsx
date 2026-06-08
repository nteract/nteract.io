import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  themeColor: "#faf8f3",
};

export default function ChangelogLayout({
  children,
}: {
  children: ReactNode;
}) {
  // cream-page sets the paper background, ink text, serif headings, and the
  // scoped --paper/--ink/--accent/--rule/--muted vars the changelog styles use.
  return (
    <div className="cream-page relative min-h-screen">
      <main className="relative">{children}</main>
    </div>
  );
}
