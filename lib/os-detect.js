export type Platform = "macOS" | "Linux" | "Windows";

export function detectPlatform(ctx: Context<*>): Platform {
  if (ctx.req && ctx.req.headers) {
    // Server side
    const ua = ctx.req.headers["user-agent"];
    if (/Windows/.test(ua)) {
      return "Windows";
    } else if (/Linux/.test(ua)) {
      return "Linux";
    }
    return "macOS";

    // Client side
  } else if (navigator.platform) {
    if (/Win/.test(navigator.platform)) {
      platform = "Windows";
    } else if (/Linux/.test(navigator.platform)) {
      platform = "Linux";
    }
    // Else keep macOS default
  }
}
