import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  "#fdf9ed",
          100: "#faf0cc",
          200: "#f4de95",
          300: "#eec85a",
          400: "#e9b430",
          DEFAULT: "#C9A84C",
          600: "#b08a30",
          700: "#8a6626",
          800: "#714f25",
          900: "#5f4122",
          950: "#362210",
        },
        brown: {
          50:  "#fdf6ec",
          100: "#f9e9cd",
          200: "#f1cf97",
          300: "#e8af60",
          400: "#e09038",
          DEFAULT: "#3D1F0F",
          600: "#7a3d1a",
          700: "#5e2e14",
          800: "#4c2312",
          900: "#3D1F0F",
          950: "#200f06",
        },
        cream: "#FDF6EC",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "'Times New Roman'", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('/hero-bg.jpg')",
      },
    },
  },
  plugins: [],
};
export default config;
