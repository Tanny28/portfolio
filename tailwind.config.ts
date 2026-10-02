import type { Config } from "tailwindcss";

// Tailwind now only styles the floating AI chat widget; the page itself uses
// app/site.css. Tokens match the site's ink + burnt-orange palette.
const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#f1f0ee",
        accent: {
          DEFAULT: "#cf8047",
          glow: "rgba(207, 128, 71, 0.35)",
        },
        muted: {
          DEFAULT: "#1b1b1b",
          foreground: "#9a9a9a",
        },
        border: "#2a2a2a",
        card: {
          DEFAULT: "#111111",
          foreground: "#f1f0ee",
        },
      },
      fontFamily: {
        sans: ["var(--font-onest)", "system-ui", "sans-serif"],
        mono: ["var(--font-onest)", "system-ui", "sans-serif"],
      },
      // The page scales the root font-size with the viewport; keep the chat's
      // text a fixed, readable size instead of letting it shrink on tablets.
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
