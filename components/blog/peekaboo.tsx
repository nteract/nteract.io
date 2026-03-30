"use client";

import { useState } from "react";

interface PeekabooProps {
  src: string;
  alt: string;
  peekHeight?: number;
  revealHeight?: number;
  hint?: string;
}

export function Peekaboo({
  src,
  alt,
  peekHeight = 300,
  revealHeight = 900,
  hint = "hover to inspect",
}: PeekabooProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="not-prose group my-10 w-full md:w-[calc(100%+8.5rem)] md:-ml-[4.25rem]"
    >
      <div
        className="relative cursor-pointer overflow-hidden transition-[max-height] duration-500 ease-out"
        style={{ maxHeight: open ? revealHeight : peekHeight }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <img
          src={src}
          alt={alt}
          className="block max-w-full"
          style={{ margin: "0 auto" }}
          draggable={false}
        />

        {/* Bottom fade + hint */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pb-3 pointer-events-none transition-opacity duration-300"
          style={{
            height: 60,
            opacity: open ? 0 : 1,
            background: "linear-gradient(to top, #0e0e0e 0%, transparent 100%)",
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#484848]">
            {hint}
          </span>
        </div>
      </div>
    </div>
  );
}
