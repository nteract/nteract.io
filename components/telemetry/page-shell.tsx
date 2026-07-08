import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site-shell";

export function PageShell({ children }: { children: ReactNode }) {
  // The header sits outside .cream-page: the cream scope restyles every <a>
  // (accent color + underline), which would repaint the site nav.
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <div className="cream-page flex-1">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
          {children}
        </div>
      </div>
    </div>
  );
}
