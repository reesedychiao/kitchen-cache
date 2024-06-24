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
        sacramento: ["Sacramento", "sans-serif"],
        comfortaa: ["Comfortaa", "sans-serif"],
      },
      colors: {
        customOrange: "#d66102",
        customBlue: "#285f7b",
      },
    },
  },
  plugins: [],
};
export default config;
