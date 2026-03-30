import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  themeColor: "#0e0e0e",
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-surface text-on-surface selection:bg-primary/30">
      <main className="relative">{children}</main>
    </div>
  );
}
