"use client";

import { useState } from "react";
import { UvIcon, CondaIcon, PixiIcon } from "@/components/icons/runtime-icons";
import { cn } from "@/lib/utils";

type EnvId = "uv" | "conda" | "pixi";

interface EnvPickerProps {
  uvText?: string;
  condaText?: string;
  pixiText?: string;
}

const brandColors: Record<EnvId, { text: string; bg: string; ring: string; icon: string }> = {
  uv: {
    text: "text-fuchsia-400",
    bg: "bg-fuchsia-500/20",
    ring: "ring-fuchsia-500",
    icon: "text-fuchsia-400",
  },
  conda: {
    text: "text-green-400",
    bg: "bg-green-500/20",
    ring: "ring-green-500",
    icon: "text-green-400",
  },
  pixi: {
    text: "text-yellow-400",
    bg: "bg-yellow-500/20",
    ring: "ring-yellow-500",
    icon: "text-yellow-400",
  },
};

const icons: Record<EnvId, React.ComponentType<{ className?: string }>> = {
  uv: UvIcon,
  conda: CondaIcon,
  pixi: PixiIcon,
};

const envIds: EnvId[] = ["uv", "conda", "pixi"];

export function EnvPicker({
  uvText = "PyPI packages, managed by uv.",
  condaText = "Public and private channels.",
  pixiText = "Multi-language package management.",
}: EnvPickerProps) {
  const [selected, setSelected] = useState<EnvId>("conda");
  const colors = brandColors[selected];
  const textMap: Record<EnvId, string> = { uv: uvText, conda: condaText, pixi: pixiText };
  const text = textMap[selected];

  return (
    <div className="not-prose my-10">
      <div className="flex items-center justify-center gap-6">
        {envIds.map((id) => {
          const c = brandColors[id];
          const isSelected = selected === id;
          const Icon = icons[id];

          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelected(id)}
              className={cn(
                "flex flex-col items-center gap-3 transition-all",
                "cursor-pointer",
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center rounded-2xl p-4 transition-all",
                  isSelected
                    ? [c.bg, "ring-2", c.ring, "ring-offset-2 ring-offset-[#0e0e0e]"]
                    : "bg-[#1f1f1f]",
                )}
              >
                <Icon
                  className={cn(
                    "h-10 w-10 transition-colors",
                    isSelected ? c.icon : "text-[#ababab]",
                  )}
                />
              </div>
              <span
                className={cn(
                  "font-headline text-sm font-bold tracking-tight transition-colors",
                  isSelected ? c.text : "text-[#ababab]",
                )}
              >
                {id}
              </span>
            </button>
          );
        })}
      </div>

      <p className={cn("mt-4 text-center text-sm transition-colors", colors.text)}>
        {text}
      </p>
    </div>
  );
}
