import { cva } from "class-variance-authority"

/**
 * Elements button recipe. Lives outside the client component so server
 * components can style plain <a>/<Link> elements as buttons via
 * buttonVariants().
 */
export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium outline-none transition-colors select-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[color-mix(in_srgb,var(--primary)_88%,var(--background))]",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
      },
      size: {
        default: "h-9 px-4",
        sm: "h-8 px-3.5 text-[0.8rem]",
        lg: "h-10 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
