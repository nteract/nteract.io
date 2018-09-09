// @flow

import "isomorphic-fetch";

const EXTENSIONS = {
  macOS: ".dmg",
  Linux: ".AppImage",
  Windows: ".exe"
};

export function detectPlatform(ctx: Context<*>): Platform {
  if (ctx.req && ctx.req.headers) {
    // Server side
    const ua = ctx.req.headers["user-agent"];
    if (/Windows/.test(ua)) {
      return "Windows";
    } else if (/Linux/.test(ua)) {
      return "Linux";
    }
    // Client side
  } else if (navigator.platform) {
    if (/Win/.test(navigator.platform)) {
      return "Windows";
    } else if (/Linux/.test(navigator.platform)) {
      return "Linux";
    }
  }
  // Else keep macOS default
  return "macOS";
}

export async function getDownloadUrl(platform: Platform): Promise<string> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/nteract/nteract/releases/latest"
    );
    const json = await res.json();

    const asset = json.assets.find(asset => {
      return asset.browser_download_url.endsWith(EXTENSIONS[platform]);
    });

    if (asset && typeof asset.browser_download_url === "string")
      return asset.browser_download_url;
  } catch (e) {
    console.error(e);
  }
  return "https://github.com/nteract/nteract/releases/latest";
}
