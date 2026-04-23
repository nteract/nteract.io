import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderInlineCode } from "@/lib/inline-code";

describe("renderInlineCode", () => {
  it("wraps backtick-quoted spans in <code>", () => {
    render(<p>{renderInlineCode("One of `app`, `daemon`, or `mcp`.")}</p>);
    const codes = screen.getAllByText(/^(app|daemon|mcp)$/);
    expect(codes).toHaveLength(3);
    for (const c of codes) expect(c.tagName).toBe("CODE");
  });

  it("leaves text without backticks alone", () => {
    render(<p>{renderInlineCode("no code here")}</p>);
    expect(screen.getByText("no code here").tagName).toBe("P");
  });

  it("handles multi-word code spans", () => {
    render(<p>{renderInlineCode("set `RUNTIMED_DEV=1` to opt out")}</p>);
    const code = screen.getByText("RUNTIMED_DEV=1");
    expect(code.tagName).toBe("CODE");
  });

  it("leaves a single stray backtick untouched", () => {
    render(<p data-testid="line">{renderInlineCode("weird `text")}</p>);
    expect(screen.getByTestId("line").textContent).toBe("weird `text");
  });
});
