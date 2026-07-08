import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        background: "#05090d",
        foreground: "#d7e1ea",
        accent: {
          DEFAULT: "#45e0c8",
          glow: "rgba(69, 224, 200, 0.35)",
        },
        warn: {
          DEFAULT: "#d9a23f",
          glow: "rgba(217, 162, 63, 0.35)",
        },
        muted: {
          DEFAULT: "#0e161d",
          foreground: "#7b8b99",
        },
        border: "#1c2733",
        card: {
          DEFAULT: "#0b1117",
          foreground: "#d7e1ea",
        },
        input: "#1c2733",
        ring: "#45e0c8",
        primary: {
          DEFAULT: "#45e0c8",
          foreground: "#05090d",
        },
        secondary: {
          DEFAULT: "#0e161d",
          foreground: "#d7e1ea",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#fafafa",
        },
        popover: {
          DEFAULT: "#0b1117",
          foreground: "#d7e1ea",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "0.375rem",
        md: "0.25rem",
        sm: "0.125rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
