import { NextResponse, type NextRequest } from "next/server";

import { prefersMarkdown } from "@/lib/accept";

export const config = {
  matcher: ["/((?!_next/|api/).*)"],
};

const SCANNER_PATTERNS: readonly RegExp[] = [
  /^\/impressum/i,
  /^\/imprint/i,
  /^\/wp-/i,
  /^\/wordpress/i,
  /^\/phpmyadmin/i,
  /^\/pma\//i,
  /^\/xmlrpc\.php/i,
  /^\/cgi-bin/i,
  /^\/\.env/i,
  /^\/\.git/i,
];

function isScannerProbe(pathname: string): boolean {
  return SCANNER_PATTERNS.some((re) => re.test(pathname));
}

function llmsRewriteTarget(pathname: string): string | null {
  if (pathname === "/" || pathname === "/blog") {
    return "/llms.txt";
  }
  if (pathname === "/telemetry") {
    return "/telemetry/llms.txt";
  }
  if (pathname.startsWith("/blog/")) {
    return `/blog/${pathname.slice("/blog/".length)}/llms.txt`;
  }
  return null;
}

function isLlmsCandidate(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname === "/blog" ||
    pathname === "/telemetry" ||
    pathname.startsWith("/blog/")
  );
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (isScannerProbe(pathname)) {
    return new NextResponse(null, {
      status: 404,
      headers: { "X-Robots-Tag": "noindex" },
    });
  }

  if (!isLlmsCandidate(pathname)) {
    return NextResponse.next();
  }

  const wantsMarkdown =
    request.method === "GET" && prefersMarkdown(request.headers.get("accept"));

  const target = wantsMarkdown ? llmsRewriteTarget(pathname) : null;

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
