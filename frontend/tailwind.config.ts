import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#1a1a2e",
        surface: "#16213e",
        primary: "#0f3460",
        accent: "#f55575",
        "text-main": "#eee",
        "text-muted": "#a0a0b0",
        border: "#2a2a4a",
        success: "#4ade80",
        warning: "#fbbf24",
      },
      borderRadius: {
        DEFAULT: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
