"use client";

import { useMemo } from "react";

type Platform = "mac" | "other";

function detectPlatform(): Platform {
  if (typeof window === "undefined") return "mac";
  return /mac|iphone|ipad|ipod/i.test(navigator.userAgent) ? "mac" : "other";
}

const modifiers: Record<Platform, Record<string, string>> = {
  mac: { mod: "⌘", alt: "⌥", shift: "⇧", ctrl: "⌃" },
  other: { mod: "Ctrl", alt: "Alt", shift: "Shift", ctrl: "Ctrl" },
};

/**
 * Platform-aware keyboard shortcut display.
 *
 * Usage in MDX:
 *   <Kbd>mod+S</Kbd>    → ⌘S on Mac, Ctrl+S elsewhere
 *   <Kbd>mod+shift+P</Kbd> → ⌘⇧P on Mac, Ctrl+Shift+P elsewhere
 */
export function Kbd({ children }: { children: string }) {
  const platform = useMemo(detectPlatform, []);
  const map = modifiers[platform];
  const isMac = platform === "mac";

  const parts = children.split("+").map((k) => k.trim().toLowerCase());

  const rendered = parts
    .map((part) => map[part] ?? part.toUpperCase())
    .join(isMac ? "" : "+");

  return (
    <kbd className="inline-block font-mono text-[0.85em] tracking-wide">
      {rendered}
    </kbd>
  );
}
