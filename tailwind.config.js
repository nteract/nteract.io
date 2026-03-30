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
        // Monolith design system
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
        primary: {
          DEFAULT: "#94ccff",
          dim: "#73bfff",
          container: "#004b74",
        },
        "on-primary": {
          DEFAULT: "#00446a",
          container: "#a9d5ff",
        },
        secondary: {
          DEFAULT: "#a993d1",
          dim: "#a993d1",
          container: "#443167",
        },
        "on-secondary": {
          DEFAULT: "#28144a",
          container: "#cbb5f4",
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
      },
    },
  },
  plugins: [],
};
