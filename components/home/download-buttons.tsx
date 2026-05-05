"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type PlatformKey = "macos-arm64" | "macos-x64" | "windows" | "linux";

type PlatformMeta = {
  key: PlatformKey;
  label: string;
  shortLabel: string;
  file: string;
  icon: ReactNode;
};

const LINUX_INSTALL_CMD = "curl -fsSL https://sh.nteract.io | bash";
const FALLBACK_RELEASES_URL = "https://github.com/nteract/desktop/releases";

const AppleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.079 5.999l.239 .012c1.43 .097 3.434 1.013 4.508 2.586a1 1 0 0 1 -.344 1.44c-.05 .028 -.372 .158 -.497 .217a4.15 4.15 0 0 0 -.722 .431c-.614 .461 -.948 1.009 -.942 1.694c.01 .885 .339 1.454 .907 1.846c.208 .143 .436 .253 .666 .33c.126 .043 .426 .116 .444 .122a1 1 0 0 1 .662 .942c0 2.621 -3.04 6.381 -5.286 6.381c-.79 0 -1.272 -.091 -1.983 -.315l-.098 -.031c-.463 -.146 -.702 -.192 -1.133 -.192c-.52 0 -.863 .06 -1.518 .237l-.197 .053c-.575 .153 -.964 .226 -1.5 .248c-2.749 0 -5.285 -5.093 -5.285 -9.072c0 -3.87 1.786 -6.92 5.286 -6.92c.297 0 .598 .045 .909 .128c.403 .107 .774 .26 1.296 .508c.787 .374 .948 .44 1.009 .44h.016c.03 -.003 .128 -.047 1.056 -.457c1.061 -.467 1.864 -.685 2.746 -.616l-.24 -.012z" />
    <path d="M14 1a1 1 0 0 1 1 1a3 3 0 0 1 -3 3a1 1 0 0 1 -1 -1a3 3 0 0 1 3 -3z" />
  </svg>
);

const WindowsIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 13v5c0 1.57 -1.248 2.832 -2.715 2.923l-.113 .003l-.042 .018a1 1 0 0 1 -.336 .056l-.118 -.008l-4.676 -.585v-7.407zm-10 0v7.157l-5.3 -.662c-1.514 -.151 -2.7 -1.383 -2.7 -2.895v-3.6zm0 -9.158v7.158h-8v-3.6c0 -1.454 1.096 -2.648 2.505 -2.87zm10 2.058v5.1h-8v-7.409l4.717 -.589c1.759 -.145 3.283 1.189 3.283 2.898" />
  </svg>
);

const LinuxIcon = () => (
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
);

const platforms: Record<PlatformKey, PlatformMeta> = {
  "macos-arm64": {
    key: "macos-arm64",
    label: "macOS (Apple Silicon)",
    shortLabel: "macOS (Apple Silicon)",
    file: "nteract-stable-darwin-arm64.dmg",
    icon: <AppleIcon />,
  },
  "macos-x64": {
    key: "macos-x64",
    label: "macOS (Intel)",
    shortLabel: "macOS (Intel)",
    file: "nteract-stable-darwin-x64.dmg",
    icon: <AppleIcon />,
  },
  windows: {
    key: "windows",
    label: "Windows",
    shortLabel: "Windows",
    file: "nteract-stable-windows-x64.exe",
    icon: <WindowsIcon />,
  },
  linux: {
    key: "linux",
    label: "Linux",
    shortLabel: "Linux",
    file: "nteract-stable-linux-x64.AppImage",
    icon: <LinuxIcon />,
  },
};

// Synchronous first guess from the UA string. macOS defaults to Apple Silicon
// and is refined asynchronously via UA client hints when available.
function detectPlatformSync(): PlatformKey {
  if (typeof navigator === "undefined") {
    return "macos-arm64";
  }

  const ua = navigator.userAgent.toLowerCase();

  if (ua.includes("windows")) return "windows";
  if (ua.includes("android")) return "linux";
  if (ua.includes("linux")) return "linux";
  if (ua.includes("mac")) {
    // Safari and Chrome on Intel macs still advertise "Intel Mac OS X" even on
    // Apple Silicon, so we can't rely on this string alone. Refinement happens
    // client-side through `navigator.userAgentData` when the browser supports it.
    return "macos-arm64";
  }

  return "macos-arm64";
}

type UADataLike = {
  platform?: string;
  getHighEntropyValues?: (
    hints: string[],
  ) => Promise<{ architecture?: string }>;
};

function getDownloadUrl(version: string, file: string): string {
  return `https://github.com/nteract/desktop/releases/download/v${version}/${file}`;
}

export function DownloadButtons({ version }: { version: string | null }) {
  const [platform, setPlatform] = useState<PlatformKey>(detectPlatformSync);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Refine macOS architecture via UA client hints. Only Chromium-based
    // browsers currently expose this, so Safari users stay on the arm64
    // default (correct for the vast majority of Apple Silicon Macs).
    if (platform !== "macos-arm64") return;
    const uaData = (navigator as unknown as { userAgentData?: UADataLike })
      .userAgentData;
    if (!uaData?.getHighEntropyValues) return;

    let cancelled = false;
    uaData
      .getHighEntropyValues(["architecture"])
      .then((values) => {
        if (cancelled) return;
        if (values.architecture === "x86") setPlatform("macos-x64");
      })
      .catch(() => {
        /* ignore — keep the default */
      });

    return () => {
      cancelled = true;
    };
  }, [platform]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const primary = platforms[platform];
  const secondaryKeys = useMemo(
    () =>
      (Object.keys(platforms) as PlatformKey[]).filter(
        (key) => key !== platform,
      ),
    [platform],
  );

  const primaryUrl = version
    ? getDownloadUrl(version, primary.file)
    : FALLBACK_RELEASES_URL;

  const onCopyLinuxCommand = async () => {
    try {
      await navigator.clipboard.writeText(LINUX_INSTALL_CMD);
      setCopied(true);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return (
    <>
      {platform === "linux" ? (
        <LinuxInstallCommand copied={copied} onCopy={onCopyLinuxCommand} />
      ) : (
        <a
          href={primaryUrl}
          className={cn(
            "inline-flex items-center gap-3 rounded-lg px-8 py-4",
            "bg-accent/90 text-lg font-medium text-white shadow-lg transition-all",
            "hover:-translate-y-0.5 hover:bg-accent hover:shadow-xl",
          )}
        >
          {primary.icon}
          Download for {primary.label}
        </a>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        {secondaryKeys.map((key) => {
          const meta = platforms[key];
          const href = version
            ? getDownloadUrl(version, meta.file)
            : FALLBACK_RELEASES_URL;
          return (
            <a
              key={key}
              href={href}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              {meta.icon}
              {meta.shortLabel}
            </a>
          );
        })}
      </div>
    </>
  );
}

function LinuxInstallCommand({
  copied,
  onCopy,
}: {
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-stretch gap-2">
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg bg-gray-900 px-4 py-3 text-left",
          "font-mono text-sm text-gray-100 shadow-lg",
        )}
      >
        <span className="select-none text-gray-500">$</span>
        <code className="flex-1 overflow-x-auto whitespace-nowrap">
          {LINUX_INSTALL_CMD}
        </code>
        <button
          type="button"
          onClick={onCopy}
          className={cn(
            "shrink-0 rounded-md px-2 py-1 text-xs font-medium transition-colors",
            "bg-gray-800 text-gray-200 hover:bg-gray-700",
          )}
          aria-label="Copy install command"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
