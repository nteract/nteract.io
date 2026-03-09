"use client";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

const RELEASE_BASE =
  "https://github.com/nteract/desktop/releases/latest/download";

const downloads = [
  {
    platform: "macOS",
    file: "nteract-stable-darwin-arm64.dmg",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.079 5.999l.239 .012c1.43 .097 3.434 1.013 4.508 2.586a1 1 0 0 1 -.344 1.44c-.05 .028 -.372 .158 -.497 .217a4.15 4.15 0 0 0 -.722 .431c-.614 .461 -.948 1.009 -.942 1.694c.01 .885 .339 1.454 .907 1.846c.208 .143 .436 .253 .666 .33c.126 .043 .426 .116 .444 .122a1 1 0 0 1 .662 .942c0 2.621 -3.04 6.381 -5.286 6.381c-.79 0 -1.272 -.091 -1.983 -.315l-.098 -.031c-.463 -.146 -.702 -.192 -1.133 -.192c-.52 0 -.863 .06 -1.518 .237l-.197 .053c-.575 .153 -.964 .226 -1.5 .248c-2.749 0 -5.285 -5.093 -5.285 -9.072c0 -3.87 1.786 -6.92 5.286 -6.92c.297 0 .598 .045 .909 .128c.403 .107 .774 .26 1.296 .508c.787 .374 .948 .44 1.009 .44h.016c.03 -.003 .128 -.047 1.056 -.457c1.061 -.467 1.864 -.685 2.746 -.616l-.24 -.012z" />
        <path d="M14 1a1 1 0 0 1 1 1a3 3 0 0 1 -3 3a1 1 0 0 1 -1 -1a3 3 0 0 1 3 -3z" />
      </svg>
    ),
  },
  {
    platform: "Windows",
    file: "nteract-stable-windows-x64.exe",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 13v5c0 1.57 -1.248 2.832 -2.715 2.923l-.113 .003l-.042 .018a1 1 0 0 1 -.336 .056l-.118 -.008l-4.676 -.585v-7.407zm-10 0v7.157l-5.3 -.662c-1.514 -.151 -2.7 -1.383 -2.7 -2.895v-3.6zm0 -9.158v7.158h-8v-3.6c0 -1.454 1.096 -2.648 2.505 -2.87zm10 2.058v5.1h-8v-7.409l4.717 -.589c1.759 -.145 3.283 1.189 3.283 2.898" />
      </svg>
    ),
  },
  {
    platform: "Linux",
    file: "nteract-stable-linux-x64.AppImage",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 7l5 5l-5 5" />
        <path d="M12 19l7 0" />
      </svg>
    ),
  },
];

function detectPlatform(): string {
  if (typeof window === "undefined") return "macOS";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "Windows";
  if (ua.includes("linux")) return "Linux";
  return "macOS";
}

export default function Home() {
  const platform = detectPlatform();
  const primaryDownload = downloads.find((d) => d.platform === platform) || downloads[0];
  const otherDownloads = downloads.filter((d) => d.platform !== platform);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <Logo className="w-40 h-40 mx-auto mb-8" />

        {/* Title */}
        <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
          Native interactive notebooks
        </p>
        <h1 className="text-5xl font-bold text-gray-900 mb-3">nteract</h1>
        <p className="text-base text-gray-500 mb-8 max-w-md mx-auto">
          Fast to launch. Agent ready. Humans welcome.
        </p>

        {/* Primary Download Button */}
        <a
          href={`${RELEASE_BASE}/${primaryDownload.file}`}
          className={cn(
            "inline-flex items-center gap-3 px-8 py-4 rounded-lg",
            "bg-accent/90 text-white text-lg font-medium",
            "hover:bg-accent transition-colors",
            "shadow-lg hover:shadow-xl"
          )}
        >
          {primaryDownload.icon}
          Download for {primaryDownload.platform}
        </a>

        {/* Other platforms */}
        <div className="mt-6 flex items-center justify-center gap-4">
          {otherDownloads.map((download) => (
            <a
              key={download.platform}
              href={`${RELEASE_BASE}/${download.file}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {download.icon}
              {download.platform}
            </a>
          ))}
        </div>

        {/* Links */}
        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-gray-500">
          <a
            href="https://github.com/nteract/desktop"
            className="hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://github.com/nteract/desktop/releases"
            className="hover:text-gray-900 transition-colors"
          >
            All Releases
          </a>
        </div>
      </div>

      {/* Footer Quote */}
      <footer className="mt-24 pb-8 text-center">
        <p className="text-sm text-gray-400 italic max-w-md mx-auto">
          "The purpose of computing is insight, not numbers."
        </p>
        <p className="text-xs text-gray-400 mt-1">— Richard Hamming</p>
      </footer>
    </main>
  );
}
