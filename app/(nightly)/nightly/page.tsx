import Image from "next/image";
import { NightlyDownloads } from "./downloads";
import { Fireflies } from "./fireflies";

const MANIFEST_URL =
  "https://github.com/nteract/desktop/releases/download/nightly-latest/latest.json";

interface NightlyManifest {
  version: string;
  notes: string;
  pub_date: string;
  platforms: {
    "darwin-aarch64"?: { url: string; signature: string };
    "linux-x86_64"?: { url: string; signature: string };
    "windows-x86_64"?: { url: string; signature: string };
  };
}

async function getManifest(): Promise<NightlyManifest | null> {
  try {
    const res = await fetch(MANIFEST_URL, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// Star decorations positioned around the page
const stars = [
  { x: 10, y: 8, size: 2, opacity: 0.85 },
  { x: 25, y: 15, size: 1.5, opacity: 0.55 },
  { x: 40, y: 5, size: 1, opacity: 0.45 },
  { x: 55, y: 12, size: 1.8, opacity: 0.6 },
  { x: 70, y: 8, size: 1.2, opacity: 0.5 },
  { x: 85, y: 18, size: 2, opacity: 0.75 },
  { x: 92, y: 10, size: 1.5, opacity: 0.55 },
  { x: 15, y: 35, size: 1.2, opacity: 0.5 },
  { x: 30, y: 42, size: 1.8, opacity: 0.62 },
  { x: 78, y: 38, size: 1.5, opacity: 0.58 },
  { x: 88, y: 45, size: 2, opacity: 0.72 },
  { x: 8, y: 65, size: 1.8, opacity: 0.6 },
  { x: 22, y: 72, size: 1.2, opacity: 0.5 },
  { x: 45, y: 68, size: 1.5, opacity: 0.56 },
  { x: 75, y: 70, size: 1, opacity: 0.4 },
  { x: 90, y: 62, size: 2, opacity: 0.7 },
  { x: 35, y: 88, size: 1.5, opacity: 0.55 },
  { x: 60, y: 92, size: 2, opacity: 0.7 },
  { x: 82, y: 85, size: 1.2, opacity: 0.48 },
];

// 4-pointed sparkle stars
const sparkles = [
  { x: 18, y: 28, size: 16, opacity: 0.8 },
  { x: 75, y: 55, size: 24, opacity: 0.8 },
  { x: 45, y: 78, size: 14, opacity: 0.8 },
];

function Sparkle({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-8 -8 16 16"
      fill="white"
      fillOpacity={opacity}
    >
      <path d="M0 -6L1.5 -1.5L6 0L1.5 1.5L0 6L-1.5 1.5L-6 0L-1.5 -1.5Z" />
    </svg>
  );
}

// Construct direct download URLs from the version
// The manifest URLs point to .tar.gz (for auto-update), but we want .dmg for direct download
function getDownloadUrl(version: string, platform: "macos" | "windows" | "linux"): string {
  const base = `https://github.com/nteract/desktop/releases/download/v${version}`;
  switch (platform) {
    case "macos":
      return `${base}/nteract-nightly-darwin-arm64.dmg`;
    case "windows":
      return `${base}/nteract-nightly-windows-x64.exe`;
    case "linux":
      return `${base}/nteract-nightly-linux-x64.AppImage`;
  }
}

export default async function NightlyPage() {
  const manifest = await getManifest();

  const downloads = manifest
    ? [
        {
          platform: "macOS",
          platformKey: "darwin-aarch64" as const,
          url: getDownloadUrl(manifest.version, "macos"),
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.079 5.999l.239 .012c1.43 .097 3.434 1.013 4.508 2.586a1 1 0 0 1 -.344 1.44c-.05 .028 -.372 .158 -.497 .217a4.15 4.15 0 0 0 -.722 .431c-.614 .461 -.948 1.009 -.942 1.694c.01 .885 .339 1.454 .907 1.846c.208 .143 .436 .253 .666 .33c.126 .043 .426 .116 .444 .122a1 1 0 0 1 .662 .942c0 2.621 -3.04 6.381 -5.286 6.381c-.79 0 -1.272 -.091 -1.983 -.315l-.098 -.031c-.463 -.146 -.702 -.192 -1.133 -.192c-.52 0 -.863 .06 -1.518 .237l-.197 .053c-.575 .153 -.964 .226 -1.5 .248c-2.749 0 -5.285 -5.093 -5.285 -9.072c0 -3.87 1.786 -6.92 5.286 -6.92c.297 0 .598 .045 .909 .128c.403 .107 .774 .26 1.296 .508c.787 .374 .948 .44 1.009 .44h.016c.03 -.003 .128 -.047 1.056 -.457c1.061 -.467 1.864 -.685 2.746 -.616l-.24 -.012z" />
              <path d="M14 1a1 1 0 0 1 1 1a3 3 0 0 1 -3 3a1 1 0 0 1 -1 -1a3 3 0 0 1 3 -3z" />
            </svg>
          ),
        },
        {
          platform: "Windows",
          platformKey: "windows-x86_64" as const,
          url: getDownloadUrl(manifest.version, "windows"),
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 13v5c0 1.57 -1.248 2.832 -2.715 2.923l-.113 .003l-.042 .018a1 1 0 0 1 -.336 .056l-.118 -.008l-4.676 -.585v-7.407zm-10 0v7.157l-5.3 -.662c-1.514 -.151 -2.7 -1.383 -2.7 -2.895v-3.6zm0 -9.158v7.158h-8v-3.6c0 -1.454 1.096 -2.648 2.505 -2.87zm10 2.058v5.1h-8v-7.409l4.717 -.589c1.759 -.145 3.283 1.189 3.283 2.898" />
            </svg>
          ),
        },
        {
          platform: "Linux",
          platformKey: "linux-x86_64" as const,
          url: getDownloadUrl(manifest.version, "linux"),
          icon: (
            <svg
              className="w-5 h-5"
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
      ]
    : [];

  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #141f52 0%, #0a1238 50%, #050a1a 100%)",
      }}
    >
      {/* Star decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size * 2,
              height: star.size * 2,
              opacity: star.opacity,
            }}
          />
        ))}
        {sparkles.map((sparkle, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Sparkle size={sparkle.size} opacity={sparkle.opacity} />
          </div>
        ))}
      </div>

      {/* Fireflies */}
      <Fireflies />

      <div className="relative max-w-2xl mx-auto text-center z-10">
        {/* Nightly Logo */}
        <Image
          src="/nightly.svg"
          alt="nteract Nightly"
          width={160}
          height={160}
          className="mx-auto mb-8"
          priority
        />

        {/* Title */}
        <p className="text-sm uppercase tracking-widest text-white/60 mb-2">
          After dark
        </p>
        <h1 className="text-5xl font-bold text-white mb-1">nteract Nightly</h1>

        {/* Version badge */}
        {manifest && (
          <p className="text-sm text-white/50 mb-6">
            {manifest.version} &middot;{" "}
            {new Date(manifest.pub_date).toLocaleDateString()}
          </p>
        )}

        {/* Warning */}
        <p className="text-sm text-white/80 mb-8 max-w-md mx-auto">
          Fresh builds, served daily. May contain{" "}
          <span className="text-lime-300">bugs</span>.
          <br className="hidden sm:block" />
          For the less adventurous,{" "}
          <a href="/" className="underline hover:text-white">
            seek the light
          </a>
          .
        </p>

        {manifest ? (
          <NightlyDownloads downloads={downloads} />
        ) : (
          <p className="text-white/70">
            Unable to fetch nightly releases. Check{" "}
            <a
              href="https://github.com/nteract/desktop/releases"
              className="underline hover:text-white"
            >
              GitHub Releases
            </a>
            .
          </p>
        )}

        {/* Links */}
        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-white/50">
          <a href="/" className="hover:text-white transition-colors">
            Stable Release
          </a>
          <a
            href="https://github.com/nteract/desktop"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://github.com/nteract/desktop/releases"
            className="hover:text-white transition-colors"
          >
            All Releases
          </a>
        </div>
      </div>

      {/* Footer Quote */}
      <footer className="relative mt-24 pb-8 text-center z-10">
        <p className="text-sm text-white/40 italic max-w-md mx-auto">
          "The best way to predict the future is to invent it."
        </p>
        <p className="text-xs text-white/40 mt-1">— Alan Kay</p>
      </footer>
    </main>
  );
}
