import { describe, expect, it } from "vitest";

import { renderTelemetryMarkdown } from "@/lib/telemetry-markdown";

describe("renderTelemetryMarkdown", () => {
  it("includes the six fields in a table", () => {
    const md = renderTelemetryMarkdown();
    expect(md).toMatch(/\| install_id \|/);
    expect(md).toMatch(/\| source \|/);
    expect(md).toMatch(/\| version \|/);
    expect(md).toMatch(/\| channel \|/);
    expect(md).toMatch(/\| platform \|/);
    expect(md).toMatch(/\| arch \|/);
  });

  it("names the ingest endpoint", () => {
    const md = renderTelemetryMarkdown();
    expect(md).toContain("https://telemetry.runtimed.com/v1/ping");
  });

  it("lists the user rights", () => {
    const md = renderTelemetryMarkdown();
    expect(md).toMatch(/## Your rights/);
    expect(md).toMatch(/Access/);
    expect(md).toMatch(/Erase/);
    expect(md).toMatch(/Object/);
  });

  it("points at the NumFOCUS privacy policy", () => {
    expect(renderTelemetryMarkdown()).toContain(
      "https://numfocus.org/privacy-policy",
    );
  });

  it("documents the consent-recorded gate", () => {
    expect(renderTelemetryMarkdown()).toMatch(/Consent not recorded/);
  });
});
