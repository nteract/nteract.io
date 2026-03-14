import type { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Aurora glow effect */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124, 58, 237, 0.15), rgba(56, 189, 248, 0.05), transparent 70%)",
        }}
      />
      <main className="relative">{children}</main>
    </div>
  );
}
