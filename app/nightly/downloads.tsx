"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Download {
  platform: string;
  platformKey: string;
  url: string | undefined;
  icon: ReactNode;
}

function detectPlatform(): string {
  if (typeof window === "undefined") return "macOS";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "Windows";
  if (ua.includes("linux")) return "Linux";
  return "macOS";
}

export function NightlyDownloads({ downloads }: { downloads: Download[] }) {
  const platform = detectPlatform();
  const primaryDownload =
    downloads.find((d) => d.platform === platform) || downloads[0];
  const otherDownloads = downloads.filter((d) => d.platform !== platform);

  if (!primaryDownload?.url) {
    return (
      <p className="text-white/70">
        No downloads available for your platform.
      </p>
    );
  }

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .shimmer-button {
          background: linear-gradient(
            90deg,
            #0a0a0a 0%,
            #0a0a0a 40%,
            #2a2a3a 50%,
            #0a0a0a 60%,
            #0a0a0a 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        .shimmer-button:hover {
          background: linear-gradient(
            90deg,
            #1a1a1a 0%,
            #1a1a1a 40%,
            #3a3a4a 50%,
            #1a1a1a 60%,
            #1a1a1a 100%
          );
          background-size: 200% 100%;
        }
      `}</style>
      {/* Primary Download Button */}
      <a
        href={primaryDownload.url}
        className={cn(
          "shimmer-button",
          "inline-flex items-center gap-3 px-8 py-4 rounded-xl",
          "text-white text-lg font-medium",
          "shadow-lg hover:shadow-xl",
          "border border-white/10",
          "transition-shadow"
        )}
      >
        {primaryDownload.icon}
        Download for {primaryDownload.platform}
      </a>

      {/* Other platforms */}
      <div className="mt-6 flex items-center justify-center gap-4">
        {otherDownloads.map(
          (download) =>
            download.url && (
              <a
                key={download.platform}
                href={download.url}
                className="inline-flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white transition-colors"
              >
                {download.icon}
                {download.platform}
              </a>
            )
        )}
      </div>
    </>
  );
}
