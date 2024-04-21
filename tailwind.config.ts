import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#C6C6C6",
      },
      fontFamily: {
        ms_sans_serif: ["var(--font-ms_sans_serif)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
