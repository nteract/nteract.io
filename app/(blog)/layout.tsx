import type { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-surface text-on-surface selection:bg-primary/30">
      <main className="relative">{children}</main>
    </div>
  );
}
