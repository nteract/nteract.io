import type { ReactNode } from "react";

type BlogInlineCTAProps = {
  href: string;
  children: ReactNode;
  /** Optional lead-in phrase rendered before the link */
  lead?: string;
};

export function BlogInlineCTA({ href, children, lead }: BlogInlineCTAProps) {
  const isExternal =
    href.startsWith("http://") || href.startsWith("https://");

  return (
    <div className="not-prose font-body text-[0.95rem] leading-relaxed text-on-surface-variant/75">
      {lead ? <span>{lead} </span> : null}
      <a
        href={href}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="group inline-flex items-baseline gap-1.5 text-[#cbb5f4] underline decoration-[#a993d1]/40 decoration-from-font underline-offset-[5px] transition-colors hover:decoration-[#cbb5f4]"
      >
        {children}
        <span
          aria-hidden
          className="inline-block translate-y-[1px] transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </a>
    </div>
  );
}
