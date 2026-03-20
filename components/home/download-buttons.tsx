"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

type Download = {
  platform: string;
  file?: string;
  href?: string;
  label?: string;
  icon: ReactNode;
};

const downloads: Download[] = [
  {
    platform: "macOS",
    file: "nteract-stable-darwin-arm64.dmg",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.079 5.999l.239 .012c1.43 .097 3.434 1.013 4.508 2.586a1 1 0 0 1 -.344 1.44c-.05 .028 -.372 .158 -.497 .217a4.15 4.15 0 0 0 -.722 .431c-.614 .461 -.948 1.009 -.942 1.694c.01 .885 .339 1.454 .907 1.846c.208 .143 .436 .253 .666 .33c.126 .043 .426 .116 .444 .122a1 1 0 0 1 .662 .942c0 2.621 -3.04 6.381 -5.286 6.381c-.79 0 -1.272 -.091 -1.983 -.315l-.098 -.031c-.463 -.146 -.702 -.192 -1.133 -.192c-.52 0 -.863 .06 -1.518 .237l-.197 .053c-.575 .153 -.964 .226 -1.5 .248c-2.749 0 -5.285 -5.093 -5.285 -9.072c0 -3.87 1.786 -6.92 5.286 -6.92c.297 0 .598 .045 .909 .128c.403 .107 .774 .26 1.296 .508c.787 .374 .948 .44 1.009 .44h.016c.03 -.003 .128 -.047 1.056 -.457c1.061 -.467 1.864 -.685 2.746 -.616l-.24 -.012z" />
        <path d="M14 1a1 1 0 0 1 1 1a3 3 0 0 1 -3 3a1 1 0 0 1 -1 -1a3 3 0 0 1 3 -3z" />
      </svg>
    ),
  },
  {
    platform: "Windows",
    href: "https://github.com/nteract/desktop/issues/375",
    label: "Windows (testers needed)",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 13v5c0 1.57 -1.248 2.832 -2.715 2.923l-.113 .003l-.042 .018a1 1 0 0 1 -.336 .056l-.118 -.008l-4.676 -.585v-7.407zm-10 0v7.157l-5.3 -.662c-1.514 -.151 -2.7 -1.383 -2.7 -2.895v-3.6zm0 -9.158v7.158h-8v-3.6c0 -1.454 1.096 -2.648 2.505 -2.87zm10 2.058v5.1h-8v-7.409l4.717 -.589c1.759 -.145 3.283 1.189 3.283 2.898" />
      </svg>
    ),
  },
  {
    platform: "Linux",
    file: "nteract-stable-linux-x64.AppImage",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 7l5 5l-5 5" />
        <path d="M12 19l7 0" />
      </svg>
    ),
  },
];

function detectPlatform() {
  if (typeof window === "undefined") {
    return "macOS";
  }

  const ua = navigator.userAgent.toLowerCase();

  if (ua.includes("win")) {
    return "Windows";
  }

  if (ua.includes("linux")) {
    return "Linux";
  }

  return "macOS";
}

function getDownloadUrl(version: string, file: string): string {
  return `https://github.com/nteract/desktop/releases/download/v${version}/${file}`;
}

export function DownloadButtons({ version }: { version: string | null }) {
  const platform = useMemo(detectPlatform, []);
  const primaryDownload =
    downloads.find((download) => download.platform === platform) ?? downloads[0];
  const secondaryDownloads = downloads.filter(
    (download) => download.platform !== platform
  );

  const fallbackUrl = "https://github.com/nteract/desktop/releases";

  function resolveUrl(download: Download): string {
    if (download.href) return download.href;
    if (version && download.file) return getDownloadUrl(version, download.file);
    return fallbackUrl;
  }

  return (
    <>
      <a
        href={resolveUrl(primaryDownload)}
        {...(primaryDownload.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn(
          "inline-flex items-center gap-3 rounded-lg px-8 py-4",
          "bg-accent/90 text-lg font-medium text-white shadow-lg transition-all",
          "hover:-translate-y-0.5 hover:bg-accent hover:shadow-xl"
        )}
      >
        {primaryDownload.icon}
        {primaryDownload.label ?? `Download for ${primaryDownload.platform}`}
      </a>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        {secondaryDownloads.map((download) => (
          <a
            key={download.platform}
            href={resolveUrl(download)}
            {...(download.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            {download.icon}
            {download.label ?? download.platform}
          </a>
        ))}
      </div>
    </>
  );
}
