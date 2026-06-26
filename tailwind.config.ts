import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#071A2F",
        gold: "#B58B2A",
        ivory: "#F7F3EA"
      }
    }
  },
  plugins: []
};

export default config;
