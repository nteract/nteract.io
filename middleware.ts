import { NextResponse, type NextRequest } from "next/server";

import { prefersMarkdown } from "@/lib/accept";

export const config = {
  matcher: ["/", "/blog", "/blog/:slug", "/telemetry"],
};

function rewriteTarget(pathname: string): string | null {
  if (pathname === "/" || pathname === "/blog") {
    return "/llms.txt";
  }
  if (pathname === "/telemetry") {
    return "/telemetry/raw.md";
  }
  if (pathname.startsWith("/blog/")) {
    return `/blog/${pathname.slice("/blog/".length)}/raw.md`;
  }
  return null;
}

export function middleware(request: NextRequest) {
  const wantsMarkdown =
    request.method === "GET" &&
    prefersMarkdown(request.headers.get("accept"));

  const target = wantsMarkdown
    ? rewriteTarget(request.nextUrl.pathname)
    : null;

  let response: NextResponse;
  if (target) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    response = NextResponse.rewrite(url);
  } else {
    response = NextResponse.next();
  }

  response.headers.set("Vary", "Accept");
  return response;
}
