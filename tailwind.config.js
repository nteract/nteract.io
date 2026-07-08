/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      colors: {
        accent: "rgb(var(--accent) / <alpha-value>)",
        // nteract Elements semantic tokens (light/.dark via CSS vars)
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        border: "var(--border)",
        ring: "var(--ring)",
        // Monolith grayscale, still consumed by the blog's dark diagram
        // islands (socket-diagram, peekaboo, env-picker) and the OG images.
        surface: {
          DEFAULT: "#0e0e0e",
          dim: "#0e0e0e",
          bright: "#2c2c2c",
          container: {
            lowest: "#000000",
            low: "#131313",
            DEFAULT: "#191919",
            high: "#1f1f1f",
            highest: "#262626",
          },
          variant: "#262626",
        },
        "on-surface": {
          DEFAULT: "#e5e5e5",
          variant: "#ababab",
        },
        secondary: {
          DEFAULT: "#a993d1",
          dim: "#a993d1",
          container: "#443167",
        },
        tertiary: {
          DEFAULT: "#8ef4e9",
          dim: "#71d7cd",
          container: "#7fe6db",
        },
        outline: {
          DEFAULT: "#757575",
          variant: "#484848",
        },
      },
      fontFamily: {
        headline: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      borderRadius: {
        none: "0px",
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
    },
  },
  plugins: [],
};
