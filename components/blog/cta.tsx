"use client";

import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/site";

type Platform = "macOS" | "Windows" | "Linux";

function detectPlatform(): Platform {
  if (typeof window === "undefined") return "macOS";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "Windows";
  if (ua.includes("linux")) return "Linux";
  return "macOS";
}

const platformFiles: Record<Platform, string | null> = {
  macOS: "nteract-stable-darwin-arm64.dmg",
  Windows: null, // not yet code-signed
  Linux: "nteract-stable-linux-x64.AppImage",
};

function getDownloadUrl(version: string, file: string): string {
  return `https://github.com/nteract/desktop/releases/download/v${version}/${file}`;
}

export function BlogCTA() {
  const platform = useMemo(detectPlatform, []);
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    fetch(siteConfig.stableManifestUrl)
      .then((r) => (r.ok ? r.json() : null))
      .then((m) => setVersion(m?.version ?? null))
      .catch(() => {});
  }, []);

  const file = platformFiles[platform];
  const href =
    file && version
      ? getDownloadUrl(version, file)
      : siteConfig.links.releases;

  const label =
    platform === "Windows"
      ? "Windows (testers needed)"
      : `Download for ${platform}`;

  return (
    <div className="not-prose mt-16 flex flex-wrap items-center gap-4">
      <a
        href={href}
        {...(platform === "Windows" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="inline-flex items-center gap-2 bg-[#94ccff] px-8 py-4 font-headline font-bold transition-all hover:opacity-90 no-underline"
        style={{ color: "#00446a" }}
      >
        {label}
      </a>
      <a
        href="https://github.com/nteract/desktop"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-[#484848] px-8 py-4 font-headline font-bold transition-colors hover:bg-[#131313] no-underline"
        style={{ color: "#e5e5e5" }}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
        Star on GitHub
      </a>
    </div>
  );
}
