import type { ReactNode } from "react";

// Pass-through: the changelog index and version pages wrap themselves in the
// Ink (.dark) shell, while /changelog/print stays ink-on-paper for printing.
export default function ChangelogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
