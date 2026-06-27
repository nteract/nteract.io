import { cn } from "@/lib/utils";

interface VideoProps {
  src: string;
  /** Short caption rendered beneath the frame. */
  caption?: string;
  /** Optional still shown before the clip loads. */
  poster?: string;
  className?: string;
}

/**
 * Looping, muted, autoplaying clip for inline product demos — the motion
 * equivalent of an image in the prose. Framed to match the changelog hero
 * video: a bordered box on the page rule. Controls stay available so a
 * reader can pause or scrub.
 */
export function Video({ src, caption, poster, className }: VideoProps) {
  return (
    <figure className={cn("my-10", className)}>
      <div className="overflow-hidden border border-[var(--rule)]">
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          className="w-full"
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
