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
        background: "#0a0d1f",
        foreground: "#e8edf5",
        accent: {
          DEFAULT: "#e8a943",
          glow: "rgba(232, 169, 67, 0.45)",
        },
        cyan: {
          DEFAULT: "#00d4ff",
          glow: "rgba(0, 212, 255, 0.4)",
        },
        muted: {
          DEFAULT: "#141828",
          foreground: "#7a8499",
        },
        border: "#1e2336",
        card: {
          DEFAULT: "#0f1326",
          foreground: "#e8edf5",
        },
        input: "#1e2336",
        ring: "#e8a943",
        primary: {
          DEFAULT: "#e8a943",
          foreground: "#0a0d1f",
        },
        secondary: {
          DEFAULT: "#141828",
          foreground: "#e8edf5",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#fafafa",
        },
        popover: {
          DEFAULT: "#0f1326",
          foreground: "#e8edf5",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
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
