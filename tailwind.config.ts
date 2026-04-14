import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        canvas: "#141414",
        panel: "#191919",
        line: "#2a2a2a",
        text: {
          DEFAULT: "#f3f3f2",
          muted: "#a3a3a3",
          soft: "#7a7a7a",
        },
      },
      maxWidth: {
        content: "42rem",
      },
      letterSpacing: {
        quiet: "-0.02em",
      },
    },
  },
  plugins: [],
};
export default config;
