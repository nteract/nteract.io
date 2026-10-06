"use client";

import { useEffect, useId, useMemo, useState, useSyncExternalStore } from "react";

export type TerminalStep = {
  command: string;
  /** Recorded output only. Use note for an illustrated effect outside the terminal. */
  output?: string;
  note?: string;
};

type TerminalDemoProps = {
  title: string;
  steps: TerminalStep[];
  caption: string;
};

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const reducedMotion = () => window.matchMedia(motionQuery).matches;
const staticOnServer = () => true;

export function TerminalDemo({ title, steps, caption }: TerminalDemoProps) {
  const id = useId();
  const reduced = useSyncExternalStore(subscribeMotion, reducedMotion, staticOnServer);
  const [position, setPosition] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const frames = useMemo(() => steps.flatMap((step, index) => {
    const command = Array.from(step.command);
    const output = step.output?.split("\n") ?? [];
    return [
      ...command.map((_, char) => ({ index, chars: char + 1, lines: 0, note: false, delay: 55 })),
      { index, chars: command.length, lines: 0, note: false, delay: 450 },
      ...output.map((_, line) => ({ index, chars: command.length, lines: line + 1, note: false, delay: 140 })),
      { index, chars: command.length, lines: output.length, note: true, delay: 1000 },
    ];
  }), [steps]);
  const finished = position !== null && position >= frames.length;
  const showStatic = reduced || position === null || finished;
  const frame = position === null ? undefined : frames[position];

  useEffect(() => {
    if (reduced) {
      setPlaying(false);
      return;
    }
    if (!playing || position === null || finished) return;
    const timer = window.setTimeout(() => {
      setPosition(position + 1);
      if (position + 1 >= frames.length) setPlaying(false);
    }, frame?.delay ?? 55);
    return () => window.clearTimeout(timer);
  }, [playing, position, finished, reduced, frame, frames.length]);

  function replay() {
    setPosition(0);
    setPlaying(true);
  }

  function transcript(animated: boolean) {
    return steps.map((step, index) => {
      const complete = !animated || !frame || index < frame.index;
      if (animated && frame && index > frame.index) return null;
      const command = complete ? step.command : Array.from(step.command).slice(0, frame!.chars).join("");
      const output = complete ? step.output : step.output?.split("\n").slice(0, frame!.lines).join("\n");
      return (
        <div key={index} className="mb-5 last:mb-0">
          <div className="text-stone-100"><span className="select-none text-teal-300">$ </span>{command}</div>
          {output && <pre className="!m-0 whitespace-pre-wrap break-words !bg-transparent !p-0 !font-mono !text-[inherit] !leading-[inherit] text-stone-300">{output}</pre>}
          {step.note && (complete || frame?.note) && (
            <div className="mt-3 border-l-2 border-teal-300/60 pl-3 font-sans text-sm leading-6 text-stone-200">
              <span className="block text-xs font-medium uppercase tracking-wider text-teal-300">Illustrated action</span>
              {step.note}
            </div>
          )}
        </div>
      );
    });
  }

  return (
    <figure aria-labelledby={`${id}-title`} className="not-prose my-10 min-w-0">
      <div className="overflow-hidden rounded-lg border border-[var(--rule)] bg-[#181b20] shadow-sm">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-white/10 px-4 py-3 text-xs text-stone-300">
          <span aria-hidden="true" className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-stone-500" /><span className="h-2 w-2 rounded-full bg-stone-500" /><span className="h-2 w-2 rounded-full bg-stone-500" /></span>
          <span id={`${id}-title`} className="font-mono">{title}</span>
          <span className="sm:ml-auto">Illustrative playback</span>
        </div>
        {/* Reserve the full transcript's height; screen readers get stable text below. */}
        <div aria-hidden="true" className="grid p-4 font-mono text-[13px] leading-6 [overflow-wrap:anywhere] sm:p-5 sm:text-sm">
          <div className={`col-start-1 row-start-1 ${showStatic ? "" : "invisible"}`}>{transcript(false)}</div>
          {!showStatic && <div data-testid="terminal-playback" className="col-start-1 row-start-1">{transcript(true)}</div>}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <button type="button" disabled={reduced || steps.length === 0} onClick={() => {
          if (position === null || finished) replay();
          else setPlaying(!playing);
        }} className="min-h-11 rounded border border-[var(--rule)] px-4 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50">
          {playing ? "Pause" : position === null ? "Play demo" : finished ? "Play again" : "Resume"}
        </button>
        <button type="button" disabled={reduced || position === null} onClick={replay} className="min-h-11 rounded px-4 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50">Replay</button>
        <span role="status" className="text-[var(--muted)]">{reduced ? "Static transcript · reduced motion" : playing ? "Playing" : finished ? "Playback complete" : "No commands are executed"}</span>
      </div>
      <figcaption className="mt-2 text-sm leading-6 text-[var(--muted)]">{caption}</figcaption>
      <details className="mt-3 text-sm">
        <summary className="min-h-11 cursor-pointer py-3 underline underline-offset-4">Read the full transcript</summary>
        <div className="rounded bg-[#181b20] p-4 font-mono text-[13px] leading-6 [overflow-wrap:anywhere]">{transcript(false)}</div>
      </details>
    </figure>
  );
}
