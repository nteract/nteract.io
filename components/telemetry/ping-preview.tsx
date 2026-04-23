"use client";

import { useEffect, useState } from "react";

import { FIELDS } from "@/lib/telemetry-data";

/**
 * Notebook-style inline preview of a single heartbeat.
 *
 * Mirrors how IPython renders a dict-valued `Out[1]:`: the opening brace sits
 * on the same line as the prompt and the body indents to column 9 so it
 * visually hangs under the 8-character `Out[1]: ` prompt. Field descriptions
 * live in the Receipt accordion below.
 *
 * On mount, the preview swaps in a fresh UUIDv4 for `install_id`, detects the
 * visitor's platform from the user agent, and pins the channel to `stable`.
 * Server-rendered HTML uses the static example values from `telemetry-data`
 * so there's no hydration flash.
 */

function detectPlatform(): string | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mac")) return "macos";
  if (ua.includes("win")) return "windows";
  if (ua.includes("linux")) return "linux";
  return null;
}

function makeInstallId(): string | null {
  if (typeof crypto === "undefined" || !crypto.randomUUID) return null;
  return crypto.randomUUID();
}

export function PingPreview() {
  const indent = "        "; // 8 spaces, width of "In [1]: " / "Out[1]: "
  const keyPad = indent + "  ";

  const [overrides, setOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    const next: Record<string, string> = { channel: "stable" };
    const id = makeInstallId();
    if (id) next.install_id = id;
    const p = detectPlatform();
    if (p) next.platform = p;
    setOverrides(next);
  }, []);

  return (
    <div
      className="my-8 rounded-lg border overflow-hidden"
      style={{
        background: "var(--paper-elevated)",
        borderColor: "var(--rule)",
      }}
    >
      <pre
        className="text-[13px] leading-7 font-mono m-0 p-5 overflow-x-auto"
        style={{
          color: "var(--ink)",
          fontFamily: "var(--font-mono), monospace",
        }}
      >
        <span style={{ color: "var(--muted)" }}>In [1]: </span>
        <span>ping()</span>
        {"\n"}
        <span style={{ color: "var(--muted)" }}>Out[1]: </span>
        <span>{"{"}</span>
        {"\n"}
        {FIELDS.map((f, i) => {
          const value = overrides[f.name] ?? f.example;
          return (
            <span key={f.name}>
              {keyPad}
              <span style={{ color: "var(--accent)" }}>&quot;{f.name}&quot;</span>
              <span>: </span>
              <span>&quot;{value}&quot;</span>
              {i < FIELDS.length - 1 ? "," : ""}
              {"\n"}
            </span>
          );
        })}
        {indent}
        <span>{"}"}</span>
      </pre>
    </div>
  );
}
