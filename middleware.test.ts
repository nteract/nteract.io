import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { middleware } from "@/middleware";

function request(
  path: string,
  init: { method?: string; accept?: string } = {},
): NextRequest {
  const headers = new Headers();
  if (init.accept) headers.set("accept", init.accept);
  return new NextRequest(new URL(`http://localhost:3000${path}`), {
    method: init.method ?? "GET",
    headers,
  });
}

describe("middleware scanner short-circuit", () => {
  const scannerPaths = [
    "/impressum",
    "/Impressum",
    "/IMPRESSUM",
    "/Impressum.html",
    "/impressum.htm",
    "/impressum-datenschutz",
    "/impressum-und-datenschutz",
    "/imprint",
    "/Imprint",
    "/wp-admin",
    "/wp-login.php",
    "/wp-content/plugins/foo",
    "/wordpress",
    "/phpmyadmin",
    "/PhpMyAdmin/",
    "/pma/login.php",
    "/xmlrpc.php",
    "/cgi-bin/test",
    "/.env",
    "/.env.production",
    "/.git/config",
  ];

  for (const path of scannerPaths) {
    it(`returns a bare 404 with X-Robots-Tag: noindex for ${path}`, () => {
      const response = middleware(request(path));
      expect(response.status).toBe(404);
      expect(response.headers.get("x-robots-tag")).toBe("noindex");
    });
  }
});

describe("middleware passthrough for real routes", () => {
  const realPaths = ["/", "/blog", "/blog/nteract-2.0", "/telemetry", "/nightly"];

  for (const path of realPaths) {
    it(`does not return a synthetic 404 for ${path}`, () => {
      const response = middleware(request(path));
      expect(response.headers.get("x-robots-tag")).toBeNull();
    });
  }

  it("does not short-circuit a typo path (lets Next.js render the 404 page)", () => {
    const response = middleware(request("/typo-page"));
    expect(response.headers.get("x-robots-tag")).toBeNull();
  });
});

describe("middleware llms.txt rewrite (preserved)", () => {
  it("rewrites / to /llms.txt when markdown is preferred", () => {
    const response = middleware(
      request("/", { accept: "text/markdown, text/html, */*" }),
    );
    const rewrite = response.headers.get("x-middleware-rewrite");
    expect(rewrite).toContain("/llms.txt");
  });

  it("rewrites /blog/foo to /blog/foo/llms.txt when markdown is preferred", () => {
    const response = middleware(
      request("/blog/nteract-2.0", { accept: "text/markdown" }),
    );
    const rewrite = response.headers.get("x-middleware-rewrite");
    expect(rewrite).toContain("/blog/nteract-2.0/llms.txt");
  });

  it("rewrites /telemetry to /telemetry/llms.txt when markdown is preferred", () => {
    const response = middleware(
      request("/telemetry", { accept: "text/markdown" }),
    );
    const rewrite = response.headers.get("x-middleware-rewrite");
    expect(rewrite).toContain("/telemetry/llms.txt");
  });

  it("sets Vary: Accept on llms.txt-eligible routes", () => {
    const response = middleware(request("/blog"));
    expect(response.headers.get("vary")).toBe("Accept");
  });

  it("does not rewrite when the client prefers html", () => {
    const response = middleware(
      request("/blog", { accept: "text/html,application/xhtml+xml,*/*;q=0.9" }),
    );
    expect(response.headers.get("x-middleware-rewrite")).toBeNull();
  });

  it("does not rewrite on a HEAD request", () => {
    const response = middleware(
      request("/blog", { method: "HEAD", accept: "text/markdown" }),
    );
    expect(response.headers.get("x-middleware-rewrite")).toBeNull();
  });
});
