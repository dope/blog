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
        dark: "#1E1E24",
        light: "#F2F2F2",
        accent: "#FFBD07",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
