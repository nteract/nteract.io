import type { Viewport } from "next";
import type { ReactNode } from "react";

import { SiteFooter, SiteHeader } from "@/components/site-shell";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader active="blog" />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
