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
        background: "#0a0a0f",
        foreground: "#e4e4e7",
        accent: {
          DEFAULT: "#00d4ff",
          glow: "rgba(0, 212, 255, 0.5)",
        },
        muted: {
          DEFAULT: "#18181b",
          foreground: "#a1a1aa",
        },
        border: "#27272a",
        card: {
          DEFAULT: "#111114",
          foreground: "#e4e4e7",
        },
        input: "#27272a",
        ring: "#00d4ff",
        primary: {
          DEFAULT: "#00d4ff",
          foreground: "#0a0a0f",
        },
        secondary: {
          DEFAULT: "#18181b",
          foreground: "#e4e4e7",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#fafafa",
        },
        popover: {
          DEFAULT: "#111114",
          foreground: "#e4e4e7",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
