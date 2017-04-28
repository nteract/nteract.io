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
    // Client side
  } else if (navigator.platform) {
    if (/Win/.test(navigator.platform)) {
      return "Windows";
    } else if (/Linux/.test(navigator.platform)) {
      return "Linux";
      platform = "Linux";
    }
  }
  // Else keep macOS default
  return "macOS";
}
