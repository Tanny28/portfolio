import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm graphite base — one gray family, warm-tinted throughout.
        background: "#0c0c0d",
        surface: {
          DEFAULT: "#141415",
          raised: "#1a1a1b",
        },
        foreground: "#e8e6e3",
        // Single accent: oxidized brass. Low saturation (50%), reads as
        // instrument metal rather than neon.
        accent: {
          DEFAULT: "#d09a53",
          muted: "#8a6838",
          glow: "rgba(208, 154, 83, 0.28)",
        },
        muted: {
          DEFAULT: "#141415",
          foreground: "#8d8880",
        },
        border: {
          DEFAULT: "#232322",
          strong: "#32322f",
        },
        card: {
          DEFAULT: "#141415",
          foreground: "#e8e6e3",
        },
        input: "#232322",
        ring: "#d09a53",
        primary: {
          DEFAULT: "#d09a53",
          foreground: "#0c0c0d",
        },
        secondary: {
          DEFAULT: "#1a1a1b",
          foreground: "#e8e6e3",
        },
        destructive: {
          DEFAULT: "#c65f4b",
          foreground: "#f5f3f0",
        },
        popover: {
          DEFAULT: "#141415",
          foreground: "#e8e6e3",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      // Varied radius — tight on inner chips, softer on containers.
      borderRadius: {
        sm: "2px",
        DEFAULT: "3px",
        md: "5px",
        lg: "8px",
        xl: "14px",
      },
      // Named z-scale replaces arbitrary values.
      zIndex: {
        raised: "10",
        sticky: "20",
        nav: "40",
        overlay: "50",
        modal: "60",
      },
      // Tinted shadows carrying the background hue, not flat black.
      boxShadow: {
        lift: "0 1px 2px rgba(8,8,7,0.6), 0 8px 24px -8px rgba(8,8,7,0.8)",
        deep: "0 24px 64px -16px rgba(8,8,7,0.9)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
