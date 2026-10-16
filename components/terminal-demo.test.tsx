import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TerminalDemo } from "./terminal-demo";

function motion(matches: boolean) {
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    matches, addEventListener: vi.fn(), removeEventListener: vi.fn(),
  })));
}
const props = {
  title: "Example terminal",
  caption: "Recorded help, illustrated launch.",
  steps: [{ command: "help", output: "Usage: example" }, { command: "open", note: "Illustrated only" }],
};

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("terminal playback", () => {
  it("plays in order, pauses, resumes, completes, and replays", () => {
    motion(false);
    vi.useFakeTimers();
    render(<TerminalDemo {...props} />);
    fireEvent.click(screen.getByRole("button", { name: "Play demo" }));
    expect(screen.getByTestId("terminal-playback")).toHaveTextContent("$ h");
    expect(screen.getByTestId("terminal-playback")).not.toHaveTextContent("Usage:");
    act(() => { vi.advanceTimersByTime(55); });
    fireEvent.click(screen.getByRole("button", { name: "Pause" }));
    const paused = screen.getByTestId("terminal-playback").textContent;
    act(() => { vi.advanceTimersByTime(5000); });
    expect(screen.getByTestId("terminal-playback").textContent).toBe(paused);
    fireEvent.click(screen.getByRole("button", { name: "Resume" }));
    for (let i = 0; i < 20; i++) act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByRole("status")).toHaveTextContent("Playback complete");
    fireEvent.click(screen.getByRole("button", { name: "Replay" }));
    expect(screen.getByTestId("terminal-playback")).toHaveTextContent("$ h");
    expect(screen.getByTestId("terminal-playback")).not.toHaveTextContent("Illustrated only");
  });

  it("keeps a readable full transcript with reduced motion and never starts timers", () => {
    motion(true);
    vi.useFakeTimers();
    render(<TerminalDemo {...props} />);
    expect(screen.getByRole("button", { name: "Play demo" })).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("Static transcript");
    expect(screen.queryByTestId("terminal-playback")).toBeNull();
    expect(vi.getTimerCount()).toBe(0);
    const details = screen.getByText("Read the full transcript").closest("details")!;
    expect(details).toHaveTextContent("Usage: example");
    expect(details).toHaveTextContent("Illustrated only");
  });

  it("cancels its playback timer on unmount", () => {
    motion(false);
    vi.useFakeTimers();
    const { unmount } = render(<TerminalDemo {...props} />);
    fireEvent.click(screen.getByRole("button", { name: "Play demo" }));
    expect(vi.getTimerCount()).toBe(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
