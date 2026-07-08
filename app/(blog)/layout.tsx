import type { Viewport } from "next";
import type { ReactNode } from "react";

import { SiteFooter, SiteHeader } from "@/components/site-shell";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

// Ink surface: the blog's graphics (diagram islands, cover videos) are
// composed against the dark palette.
export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dark flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader active="blog" />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
