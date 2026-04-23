import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="cream-page min-h-screen">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
        {children}
      </div>
    </div>
  );
}
