import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Lato"],
      },
      backgroundImage: {
        hero: "url('/bg-img.png')",
      },
      colors: {
        primary: "#65A78E",
        accent: "#E39E18",
      },
    },
  },
  plugins: [],
};
export default config;
