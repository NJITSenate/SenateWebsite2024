import starlightPlugin from "@astrojs/starlight-tailwind";
import colors from "tailwindcss/colors";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
	theme: {
    extend: {
      colors: {
        accent: {
          50: "#f1f7fd",
          100: "#e0edf9",
          200: "#c9e0f4",
          300: "#a3cded",
          400: "#77b1e3",
          500: "#5796da",
          600: "#437bcd",
          700: "#3969bc",
          800: "#345699",
          900: "#2e497a",
          950: "#233251",
        },
        gray: colors.zinc,
      },
    },
  },
  plugins: [starlightPlugin()],
};
